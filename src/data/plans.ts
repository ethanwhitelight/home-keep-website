import type { Plan } from "@/types/plan";

// TODO(confirm): placeholder pricing/perks pending business sign-off.
export const PLANS: Plan[] = [
  {
    tier: "silver",
    displayName: "Silver",
    priceCents: 9900,
    billingPeriod: "annual",
    perks: ["Member pricing on every Silver service"],
  },
  {
    tier: "gold",
    displayName: "Gold",
    priceCents: 19900,
    billingPeriod: "annual",
    mostPopular: true,
    perks: [
      "Member pricing on every Silver + Gold service",
      "Talk to my concierge",
    ],
  },
  {
    tier: "platinum",
    displayName: "Platinum",
    priceCents: 39900,
    billingPeriod: "annual",
    perks: [
      "Member pricing on every service in the catalog",
      "Talk to my concierge",
      "Priority scheduling",
    ],
  },
];

export function getPlan(tier: Plan["tier"]): Plan {
  const plan = PLANS.find((p) => p.tier === tier);
  if (!plan) throw new Error(`No plan found for tier: ${tier}`);
  return plan;
}
