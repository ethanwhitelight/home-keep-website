import type { Plan } from "@/types/plan";

export const PLANS: Plan[] = [
  {
    tier: "silver",
    displayName: "Silver",
    tagline:
      "Best for: homeowners who just want better prices on a few everyday services a year.",
    priceCents: 9900,
    billingPeriod: "annual",
    perks: [
      "Member pricing on 10 everyday & exterior services — lawn, cleaning, gutters, pest, handyman & more",
      "Pre-vetted local pros, so you stop calling around",
      "Self-serve dashboard to request and track every job",
      "Seasonal maintenance reminders so nothing slips",
    ],
  },
  {
    tier: "gold",
    displayName: "Gold",
    tagline:
      "Best for: families who use 2–5 home services a year and want help planning it.",
    priceCents: 19900,
    billingPeriod: "annual",
    mostPopular: true,
    perks: [
      "Everything in Silver, plus 10 seasonal & mechanical services — HVAC, snow removal, plumbing, chimney & more",
      "A yearly maintenance-planning call to map out the work",
      "Priority responses over non-members in busy season",
    ],
  },
  {
    tier: "platinum",
    displayName: "Platinum",
    tagline:
      "Best for: busy professionals or landlords who want someone to manage everything.",
    priceCents: 39900,
    billingPeriod: "annual",
    perks: [
      "Everything in Gold, plus 10 big-project services — roof, solar, electrical & foundation",
      "A dedicated concierge who coordinates everything",
      "Fastest, top-priority response — even at peak season",
    ],
  },
];

export function getPlan(tier: Plan["tier"]): Plan {
  const plan = PLANS.find((p) => p.tier === tier);
  if (!plan) throw new Error(`No plan found for tier: ${tier}`);
  return plan;
}
