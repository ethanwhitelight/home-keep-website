import type { Plan } from "@/types/plan";

export const PLANS: Plan[] = [
  {
    tier: "silver",
    displayName: "Silver",
    priceCents: 9900,
    billingPeriod: "annual",
    perks: [
      "Member pricing on 10 everyday services — lawn, cleaning, gutters, pest, handyman & more",
      "Vetted local pros, so you stop calling around",
      "Self-serve dashboard to request and track every job",
      "Seasonal maintenance reminders so nothing slips",
    ],
  },
  {
    tier: "gold",
    displayName: "Gold",
    priceCents: 19900,
    billingPeriod: "annual",
    mostPopular: true,
    perks: [
      "Everything in Silver, plus 10 seasonal & mechanical services — HVAC, snow removal, plumbing, chimney & more",
      "A concierge who books and coordinates pros for you",
      "A yearly home-planning call to map out the work",
      "Priority scheduling over non-members in busy season",
    ],
  },
  {
    tier: "platinum",
    displayName: "Platinum",
    priceCents: 39900,
    billingPeriod: "annual",
    perks: [
      "Every service in the catalog, including big-ticket — roof, solar, electrical & foundation",
      "A dedicated concierge for anything your home needs",
      "Top-priority scheduling, even at peak season",
      "Proactive whole-home seasonal planning, managed for you",
    ],
  },
];

export function getPlan(tier: Plan["tier"]): Plan {
  const plan = PLANS.find((p) => p.tier === tier);
  if (!plan) throw new Error(`No plan found for tier: ${tier}`);
  return plan;
}
