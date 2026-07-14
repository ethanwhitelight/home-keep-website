// Calculator model. TODO(confirm): retail costs, discounts, and home-size
// multipliers are realistic Utah County estimates — replace with real pilot
// numbers before leaning on them in ads. The math is intentionally simple:
//   retail(freq) × homeSizeMultiplier = modeled retail spend
//   spend × discount = modeled member savings
import type { Tier } from "@/types/tiers";

export interface FrequencyOption {
  label: string;
  /** Annual retail cost at this frequency, for a ~2,000–2,999 sq ft home. */
  annualRetail: number;
}

export interface CalcService {
  id: string;
  name: string;
  discount: number; // member discount fraction (0.15 = 15% off)
  frequencies: FrequencyOption[];
}

export const HOME_SIZE_OPTIONS: {
  id: string;
  label: string;
  multiplier: number;
}[] = [
  { id: "s", label: "Under 2,000 sq ft", multiplier: 0.85 },
  { id: "m", label: "2,000–2,999 sq ft", multiplier: 1.0 },
  { id: "l", label: "3,000–4,499 sq ft", multiplier: 1.2 },
  { id: "xl", label: "4,500+ sq ft", multiplier: 1.4 },
];

export const CALC_SERVICES: CalcService[] = [
  {
    id: "house-cleaning",
    name: "House cleaning",
    discount: 0.15,
    frequencies: [
      { label: "Occasional", annualRetail: 520 },
      { label: "Monthly", annualRetail: 1560 },
      { label: "Bi-weekly", annualRetail: 3380 },
    ],
  },
  {
    id: "lawn-care",
    name: "Lawn care",
    discount: 0.18,
    frequencies: [
      { label: "Occasional", annualRetail: 320 },
      { label: "Bi-weekly", annualRetail: 700 },
      { label: "Weekly", annualRetail: 1150 },
    ],
  },
  {
    id: "pest-control",
    name: "Pest control",
    discount: 0.2,
    frequencies: [
      { label: "Once", annualRetail: 150 },
      { label: "Twice", annualRetail: 270 },
      { label: "3+ / yr", annualRetail: 380 },
    ],
  },
  {
    id: "window-cleaning",
    name: "Window cleaning",
    discount: 0.15,
    frequencies: [
      { label: "Once", annualRetail: 210 },
      { label: "Twice", annualRetail: 380 },
    ],
  },
  {
    id: "gutter-cleaning",
    name: "Gutter cleaning",
    discount: 0.18,
    frequencies: [
      { label: "Once", annualRetail: 190 },
      { label: "Twice", annualRetail: 340 },
    ],
  },
  {
    id: "sprinklers",
    name: "Sprinkler start-up & winterization",
    discount: 0.2,
    frequencies: [{ label: "Yearly", annualRetail: 170 }],
  },
  {
    id: "hvac",
    name: "HVAC tune-ups",
    discount: 0.18,
    frequencies: [
      { label: "Once", annualRetail: 130 },
      { label: "Spring + fall", annualRetail: 240 },
    ],
  },
  {
    id: "carpet-cleaning",
    name: "Carpet cleaning",
    discount: 0.15,
    frequencies: [
      { label: "Once", annualRetail: 220 },
      { label: "Twice", annualRetail: 400 },
    ],
  },
  {
    id: "handyman",
    name: "Handyman",
    discount: 0.15,
    frequencies: [
      { label: "Occasional", annualRetail: 300 },
      { label: "A few times", annualRetail: 750 },
    ],
  },
  {
    id: "junk-removal",
    name: "Junk removal",
    discount: 0.15,
    frequencies: [{ label: "Once", annualRetail: 320 }],
  },
];

/** Annual membership fees by tier, in dollars. TODO(confirm): live pricing. */
export const TIER_FEES: Record<Tier, number> = {
  silver: 99,
  gold: 199,
  platinum: 399,
};

export type Selections = Record<string, number>; // serviceId -> frequency index

export interface CalcResult {
  perService: {
    id: string;
    name: string;
    retail: number;
    member: number;
    savings: number;
  }[];
  estimatedSpend: number;
  estimatedSavings: number;
  serviceCount: number;
  recommendedTier: Tier;
}

export function computeResult(
  selections: Selections,
  homeMultiplier: number,
  heavyUser: boolean,
): CalcResult {
  const perService = CALC_SERVICES.filter(
    (s) => selections[s.id] !== undefined,
  ).map((s) => {
    const freq = s.frequencies[selections[s.id]];
    const retail = Math.round(freq.annualRetail * homeMultiplier);
    const member = Math.round(retail * (1 - s.discount));
    return { id: s.id, name: s.name, retail, member, savings: retail - member };
  });

  const estimatedSpend = perService.reduce((sum, r) => sum + r.retail, 0);
  const estimatedSavings = perService.reduce((sum, r) => sum + r.savings, 0);
  const serviceCount = perService.length;

  let recommendedTier: Tier;
  if (estimatedSpend > 2500 || serviceCount >= 6 || heavyUser) {
    recommendedTier = "platinum";
  } else if (estimatedSpend >= 800 || serviceCount >= 3) {
    recommendedTier = "gold";
  } else {
    recommendedTier = "silver";
  }

  return {
    perService,
    estimatedSpend,
    estimatedSavings,
    serviceCount,
    recommendedTier,
  };
}

/** Accept Utah County-ish ZIPs (84xxx). Loose on purpose — a soft gate. */
export function isServiceableZip(zip: string): boolean {
  return /^84\d{3}$/.test(zip.trim());
}
