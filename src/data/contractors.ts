import type { Contractor } from "@/types/contractor";

// TODO(confirm): placeholder contractors pending real partner agreements.
// Read through getContractors() so the call sites are agnostic to the
// source — swapping this for a Supabase `contractors` table later only
// requires changing this one function.
const CONTRACTORS: Contractor[] = [
  { id: "wasatch-lawn", name: "Wasatch Lawn Co.", rating: 4.8, reviewCount: 212, yearsInBusiness: 9, vetted: true, categories: ["Lawn & Yard"] },
  { id: "summit-pest", name: "Summit Pest Control", rating: 4.9, reviewCount: 184, yearsInBusiness: 12, vetted: true, categories: ["Pest & Exterior"] },
  { id: "clearwater-cleaning", name: "Clearwater Cleaning", rating: 4.7, reviewCount: 301, yearsInBusiness: 6, vetted: true, categories: ["Cleaning"] },
  { id: "alpine-hvac", name: "Alpine HVAC", rating: 4.9, reviewCount: 156, yearsInBusiness: 15, vetted: true, categories: ["Mechanical"] },
  { id: "timpanogos-plumbing", name: "Timpanogos Plumbing", rating: 4.6, reviewCount: 98, yearsInBusiness: 11, vetted: true, categories: ["Mechanical"] },
  { id: "uv-handyman", name: "Utah Valley Handyman", rating: 4.8, reviewCount: 142, yearsInBusiness: 7, vetted: true, categories: ["Handyman"] },
  { id: "lehi-pressure-wash", name: "Lehi Pressure Wash Pros", rating: 4.7, reviewCount: 87, yearsInBusiness: 5, vetted: true, categories: ["Exterior"] },
  { id: "highland-roofing", name: "Highland Roofing & Solar", rating: 4.9, reviewCount: 119, yearsInBusiness: 18, vetted: true, categories: ["Big-Ticket"] },
  { id: "american-fork-electric", name: "American Fork Electric", rating: 4.8, reviewCount: 76, yearsInBusiness: 13, vetted: true, categories: ["Big-Ticket", "Mechanical"] },
  { id: "saratoga-springs-snow", name: "Saratoga Springs Snow & Yard", rating: 4.6, reviewCount: 64, yearsInBusiness: 4, vetted: true, categories: ["Lawn & Yard"] },
];

export function getContractors(): Contractor[] {
  return CONTRACTORS;
}
