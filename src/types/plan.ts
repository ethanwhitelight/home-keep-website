import type { Tier } from "@/types/tiers";

export interface Plan {
  tier: Tier;
  displayName: string;
  tagline: string; // one-line "who it's for"
  priceCents: number;
  billingPeriod: "annual";
  mostPopular?: boolean;
  perks: string[]; // tier-level perks beyond the service list (e.g. concierge access)
}
