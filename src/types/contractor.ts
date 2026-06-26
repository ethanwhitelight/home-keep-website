export interface Contractor {
  id: string;
  name: string;
  rating: number; // 0-5
  reviewCount: number;
  yearsInBusiness: number;
  vetted: boolean;
  categories: string[]; // should align with src/data/tiers.ts category strings
}
