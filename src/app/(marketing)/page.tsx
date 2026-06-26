import Hero from "@/components/home/Hero";
import CredibilityRow from "@/components/home/CredibilityRow";
import HowItWorks from "@/components/home/HowItWorks";
import WhyJoinNow from "@/components/home/WhyJoinNow";
import PlanComparisonSection from "@/components/home/PlanComparisonSection";
import RiskReversalFaq from "@/components/home/RiskReversalFaq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityRow />
      <HowItWorks />
      <WhyJoinNow />
      <PlanComparisonSection />
      <RiskReversalFaq />
    </>
  );
}
