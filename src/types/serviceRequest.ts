import type { Tier } from "@/types/tiers";

export type Urgency = "asap" | "this_week" | "this_month" | "flexible";
export type ServiceRequestStatus =
  | "submitted"
  | "contacted"
  | "scheduled"
  | "completed"
  | "canceled";

export interface ServiceRequest {
  id: string;
  memberId: string;
  tier: Tier;
  serviceName: string;
  propertySize: string | null;
  urgency: Urgency | null;
  notes: string | null;
  photoUrls: string[];
  status: ServiceRequestStatus;
  createdAt: string;
}
