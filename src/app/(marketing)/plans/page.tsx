import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PlanComparisonTable from "@/components/plans/PlanComparisonTable";

export const metadata: Metadata = {
  title: "Membership Plans",
  description:
    "Compare Homekeep's Silver, Gold, and Platinum membership tiers and find the right level of vetted, member-priced home services.",
};

export default function PlansPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Membership plans"
        description="Every tier gets the same member pricing — higher tiers unlock more of the service catalog."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <PlanComparisonTable />
      </div>
    </>
  );
}
