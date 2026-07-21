import PlanCards from "@/components/home/PlanCards";
import SectionHeading from "@/components/layout/SectionHeading";

export default function PlanComparisonSection() {
  return (
    <section id="find-your-plan" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Membership"
          title="One simple membership"
          description="Every member gets access to vetted local pros at member pricing. One simple plan for Utah County homeowners."
        />

        <div className="mt-12">
          <PlanCards />
        </div>
      </div>
    </section>
  );
}
