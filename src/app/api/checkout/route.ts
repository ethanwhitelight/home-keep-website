import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe/client";
import { getStripePriceId } from "@/lib/stripe/plans";
import { TIER_ORDER, type Tier } from "@/types/tiers";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const { tier } = (await request.json()) as { tier?: string };

  if (!tier || !TIER_ORDER.includes(tier as Tier)) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id ?? null;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { member_id: user.id },
    });
    customerId = customer.id;
    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: getStripePriceId(tier as Tier), quantity: 1 }],
    client_reference_id: user.id,
    metadata: { member_id: user.id, tier },
    success_url: `${request.nextUrl.origin}/dashboard?checkout=success`,
    cancel_url: `${request.nextUrl.origin}/plans?checkout=canceled`,
  });

  return NextResponse.json({ url: session.url });
}
