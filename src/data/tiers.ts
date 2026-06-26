import type { ServiceItem, Tier } from "@/types/tiers";
import { tierIncludesService } from "@/types/tiers";

// The governing data model for the membership product: tiers are cumulative
// (Gold = Silver's services + its own 10; Platinum = Gold's 20 + its own 10).
// Edit this file to change scope per tier — every tier shares the same
// member discount, so there is no per-service discount field here.
export const SERVICES: ServiceItem[] = [
  // Silver — 10 everyday essentials
  { tier: "silver", serviceName: "Lawn mowing & care", category: "Lawn & Yard", recurring: true },
  { tier: "silver", serviceName: "House cleaning", category: "Cleaning", recurring: true },
  { tier: "silver", serviceName: "Gutter cleaning", category: "Exterior", recurring: true },
  { tier: "silver", serviceName: "Window cleaning", category: "Cleaning", recurring: true },
  { tier: "silver", serviceName: "Pest control", category: "Pest & Exterior", recurring: true },
  { tier: "silver", serviceName: "Handyman (small jobs)", category: "Handyman", recurring: true },
  { tier: "silver", serviceName: "Pressure washing", category: "Exterior", recurring: true },
  { tier: "silver", serviceName: "Carpet cleaning", category: "Cleaning", recurring: true },
  { tier: "silver", serviceName: "Dryer vent cleaning", category: "Mechanical", recurring: true },
  { tier: "silver", serviceName: "Sprinkler start-up & winterization", category: "Lawn & Yard", recurring: true },

  // Gold — Silver + 10 seasonal/mechanical
  { tier: "gold", serviceName: "HVAC tune-ups (spring/fall)", category: "Mechanical", recurring: true },
  { tier: "gold", serviceName: "Air duct cleaning", category: "Mechanical", recurring: true },
  { tier: "gold", serviceName: "Snow removal", category: "Lawn & Yard", recurring: true },
  { tier: "gold", serviceName: "Tree & shrub trimming", category: "Lawn & Yard", recurring: true },
  { tier: "gold", serviceName: "Full landscaping & yard maintenance", category: "Lawn & Yard", recurring: true },
  { tier: "gold", serviceName: "Plumbing maintenance & inspection", category: "Mechanical", recurring: true },
  { tier: "gold", serviceName: "Water softener service", category: "Mechanical", recurring: true },
  { tier: "gold", serviceName: "Chimney sweep", category: "Exterior", recurring: true },
  { tier: "gold", serviceName: "Pool & spa service", category: "Lawn & Yard", recurring: true },
  { tier: "gold", serviceName: "Garage door maintenance", category: "Handyman", recurring: true },

  // Platinum — Gold + 10 premium/big-ticket
  { tier: "platinum", serviceName: "Roof inspection & maintenance", category: "Big-Ticket", recurring: true },
  { tier: "platinum", serviceName: "Solar panel cleaning", category: "Big-Ticket", recurring: true },
  { tier: "platinum", serviceName: "Water heater flush", category: "Mechanical", recurring: true },
  { tier: "platinum", serviceName: "Deck & exterior staining/sealing", category: "Exterior", recurring: true },
  { tier: "platinum", serviceName: "Whole-home seasonal inspection", category: "Big-Ticket", recurring: true },
  { tier: "platinum", serviceName: "Electrical safety inspection", category: "Big-Ticket", recurring: true },
  { tier: "platinum", serviceName: "Appliance maintenance", category: "Mechanical", recurring: true },
  { tier: "platinum", serviceName: "Foundation & crawlspace check", category: "Big-Ticket", recurring: true },
  { tier: "platinum", serviceName: "Concrete & epoxy upkeep", category: "Exterior", recurring: true },
  { tier: "platinum", serviceName: "Holiday light install & removal", category: "Handyman", recurring: true },
];

/** All services available at a given tier, cumulative across lower tiers. */
export function getServicesForTier(tier: Tier): ServiceItem[] {
  return SERVICES.filter((service) => tierIncludesService(tier, service));
}

/** All services grouped by category, in catalog order — used to render the comparison table. */
export function getServicesByCategory(): Map<string, ServiceItem[]> {
  const grouped = new Map<string, ServiceItem[]>();
  for (const service of SERVICES) {
    const list = grouped.get(service.category) ?? [];
    list.push(service);
    grouped.set(service.category, list);
  }
  return grouped;
}
