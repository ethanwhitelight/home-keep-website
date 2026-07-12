import PlanCards from "@/components/home/PlanCards";
import SectionHeading from "@/components/layout/SectionHeading";

export default function PlanComparisonSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Membership"
          title="Find your plan"
          description="Every tier gets member pricing — higher tiers unlock more services."
        />

        <div className="mt-12">
          <PlanCards />
        </div>
      </div>
    </section>
  );
}
