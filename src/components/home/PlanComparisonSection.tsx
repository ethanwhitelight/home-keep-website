import PlanCards from "@/components/home/PlanCards";
import SectionHeading from "@/components/layout/SectionHeading";

export default function PlanComparisonSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Membership"
          title="Find your plan"
          description="Every plan gets access to vetted local pros at member pricing. Most homeowners start with Gold."
        />

        <div className="mt-12">
          <PlanCards />
        </div>
      </div>
    </section>
  );
}
