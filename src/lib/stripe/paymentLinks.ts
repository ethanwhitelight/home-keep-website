import type { Tier } from "@/types/tiers";

// TODO(confirm): Stripe TEST mode Payment Links — swap for live-mode links before launch.
const TIER_PAYMENT_LINKS: Record<Tier, string> = {
  silver: "https://buy.stripe.com/test_bJe00l78hcCv3RTfWv2go02",
  gold: "https://buy.stripe.com/test_28E00l9gpdGz8895hR2go01",
  platinum: "https://buy.stripe.com/test_fZuaEZ0JTcCv4VX9y72go00",
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
