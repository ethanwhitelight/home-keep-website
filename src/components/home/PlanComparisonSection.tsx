import PlanCards from "@/components/home/PlanCards";
import SectionHeading from "@/components/layout/SectionHeading";
import type { Tier } from "@/types/tiers";

export default function PlanComparisonSection({
  highlightTier,
}: {
  highlightTier?: Tier;
}) {
  return (
    <section id="find-your-plan" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Membership"
          title="Find your plan"
          description="Every plan gets access to vetted local pros at member pricing. Most homeowners start with Gold."
        />

        <div className="mt-12">
          <PlanCards highlightTier={highlightTier} />
        </div>
      </div>
    </section>
  );
}
