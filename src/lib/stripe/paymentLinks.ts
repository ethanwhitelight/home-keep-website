import type { Tier } from "@/types/tiers";

// Stripe LIVE mode Payment Links — these charge real cards.
const TIER_PAYMENT_LINKS: Record<Tier, string> = {
  silver: "https://buy.stripe.com/8x2dRbgJt09EcKK74o48001",
  gold: "https://buy.stripe.com/14AbJ3ctd6y29yy3Sc48002",
  platinum: "https://buy.stripe.com/5kQ9AV8cX1dIbGG4Wg48000",
};

/**
 * Payment Links don't carry per-purchase metadata the way dynamic Checkout
 * Sessions did, so we pack `${memberId}:${tier}` into client_reference_id —
 * the webhook splits it back out to know who bought and which tier.
 */
export function getPaymentLinkUrl(
  tier: Tier,
  member: { id: string; email?: string | null },
): string {
  const url = new URL(TIER_PAYMENT_LINKS[tier]);
  url.searchParams.set("client_reference_id", `${member.id}:${tier}`);
  if (member.email) url.searchParams.set("prefilled_email", member.email);
  return url.toString();
}
