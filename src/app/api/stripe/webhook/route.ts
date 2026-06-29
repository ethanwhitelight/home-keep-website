import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/client";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { emailHooks } from "@/lib/email/hooks";
import type { SubscriptionStatus } from "@/types/member";

function mapStripeStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case "active":
    case "trialing":
      return "active";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
      return "canceled";
    case "incomplete":
    case "incomplete_expired":
      return "incomplete";
    default:
      return "none";
  }
}

function subscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  const subscription = invoice.parent?.subscription_details?.subscription;
  if (!subscription) return null;
  return typeof subscription === "string" ? subscription : subscription.id;
}

// Payment Links don't support custom session metadata, so the signup/checkout
// flow packs `${memberId}:${tier}` into client_reference_id instead.
function parseClientReferenceId(
  clientReferenceId: string | null,
): { memberId: string; tier: string } | null {
  if (!clientReferenceId) return null;
  const [memberId, tier] = clientReferenceId.split(":");
  if (!memberId || !tier) return null;
  return { memberId, tier };
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  const supabase = createServiceRoleClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const parsed = parseClientReferenceId(session.client_reference_id);
      const memberId = parsed?.memberId;
      const tier = parsed?.tier;
      if (memberId) {
        await supabase
          .from("profiles")
          .update({
            stripe_customer_id:
              typeof session.customer === "string"
                ? session.customer
                : session.customer?.id,
            stripe_subscription_id:
              typeof session.subscription === "string"
                ? session.subscription
                : session.subscription?.id,
            tier,
            subscription_status: "active",
          })
          .eq("id", memberId);

        const email = session.customer_details?.email;
        if (email && tier) {
          await emailHooks.notifyNewMember({ email, tier });
        }
      }
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      const parsed = parseClientReferenceId(session.client_reference_id);
      if (email) {
        await supabase.from("leads").insert({
          email,
          source: "signup-abandoned",
          tier: parsed?.tier ?? null,
          member_id: parsed?.memberId ?? null,
        });
        await emailHooks.notifyNewLead({ email, source: "signup-abandoned" });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("profiles")
        .update({ subscription_status: mapStripeStatus(subscription.status) })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("profiles")
        .update({ subscription_status: "canceled" })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = subscriptionIdFromInvoice(invoice);
      if (subscriptionId) {
        await supabase
          .from("profiles")
          .update({ subscription_status: "past_due" })
          .eq("stripe_subscription_id", subscriptionId);
      }
      if (invoice.customer_email) {
        await emailHooks.notifyPaymentFailed({ email: invoice.customer_email });
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
