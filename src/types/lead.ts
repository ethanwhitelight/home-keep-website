import type { Tier } from "@/types/tiers";

export type LeadSource = "cheat-sheet" | "service-request" | "signup-abandoned";

export interface Lead {
  id: string;
  email: string;
  source: LeadSource;
  tier?: Tier | null;
  serviceName?: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}
