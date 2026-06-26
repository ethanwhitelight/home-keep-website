import type { Metadata } from "next";
import PlanComparisonTable from "@/components/plans/PlanComparisonTable";

export const metadata: Metadata = {
  title: "Membership Plans",
  description:
    "Compare Home Keep's Silver, Gold, and Platinum membership tiers and find the right level of vetted, member-priced home services.",
};

export default function PlansPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-950">
          Membership plans
        </h1>
        <p className="mt-3 text-lg text-primary-700">
          Every tier gets the same member pricing — higher tiers unlock more
          of the service catalog.
        </p>
      </div>
      <div className="mt-12">
        <PlanComparisonTable />
      </div>
    </div>
  );
}
