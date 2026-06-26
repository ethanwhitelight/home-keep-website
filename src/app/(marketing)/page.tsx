import Hero from "@/components/home/Hero";
import CredibilityRow from "@/components/home/CredibilityRow";
import FeaturedContractorsRow from "@/components/home/FeaturedContractorsRow";
import HowItWorks from "@/components/home/HowItWorks";
import WhyJoinNow from "@/components/home/WhyJoinNow";
import PlanComparisonSection from "@/components/home/PlanComparisonSection";
import RiskReversalFaq from "@/components/home/RiskReversalFaq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityRow />
      <FeaturedContractorsRow />
      <HowItWorks />
      <WhyJoinNow />
      <PlanComparisonSection />
      <RiskReversalFaq />
    </>
  );
}
