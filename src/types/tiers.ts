export type Tier = "silver" | "gold" | "platinum";

export const TIER_ORDER: Tier[] = ["silver", "gold", "platinum"];

export const TIER_LABELS: Record<Tier, string> = {
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
};

export interface ServiceItem {
  tier: Tier; // the tier at which this service is first unlocked
  serviceName: string;
  category: string;
  recurring: boolean;
}

export function tierRank(tier: Tier): number {
  return TIER_ORDER.indexOf(tier);
}

export function tierIncludesService(tier: Tier, service: ServiceItem): boolean {
  return tierRank(tier) >= tierRank(service.tier);
}
