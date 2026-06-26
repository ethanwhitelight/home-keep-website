import PlanComparisonTable from "@/components/plans/PlanComparisonTable";

export default function PlanComparisonSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-primary-950">
          Find your plan
        </h2>
        <p className="mt-3 text-center text-primary-600">
          Every tier gets member pricing — higher tiers unlock more services.
        </p>

        <div className="mt-12">
          <PlanComparisonTable />
        </div>
      </div>
    </section>
  );
}
