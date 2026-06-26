import type { Tier } from "@/types/tiers";

// One Stripe Price ID per annual membership tier (Products -> Pricing in
// the Stripe dashboard). Set these in .env.local once Stripe is configured.
const TIER_PRICE_ENV: Record<Tier, string | undefined> = {
  silver: process.env.STRIPE_PRICE_SILVER,
  gold: process.env.STRIPE_PRICE_GOLD,
  platinum: process.env.STRIPE_PRICE_PLATINUM,
};

export function getStripePriceId(tier: Tier): string {
  const priceId = TIER_PRICE_ENV[tier];
  if (!priceId) {
    throw new Error(
      `Missing Stripe price ID for tier "${tier}" — set STRIPE_PRICE_${tier.toUpperCase()} in .env.local`,
    );
  }
  return priceId;
}
