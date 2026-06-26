import type { Tier } from "@/types/tiers";

export type SubscriptionStatus =
  | "active"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "none";

export interface MemberProfile {
  id: string; // = auth.users.id
  email: string;
  tier: Tier | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: SubscriptionStatus;
  createdAt: string;
}
