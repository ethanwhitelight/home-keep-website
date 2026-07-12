import ScrollVideoHero from "@/components/home/ScrollVideoHero";
import CredibilityRow from "@/components/home/CredibilityRow";
import FeaturedContractorsRow from "@/components/home/FeaturedContractorsRow";
import HowItWorks from "@/components/home/HowItWorks";
import WhyJoinNow from "@/components/home/WhyJoinNow";
import Testimonials from "@/components/home/Testimonials";
import PlanComparisonSection from "@/components/home/PlanComparisonSection";
import RiskReversalFaq from "@/components/home/RiskReversalFaq";
import CtaBand from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <ScrollVideoHero />
      <CredibilityRow />
      <FeaturedContractorsRow />
      <HowItWorks />
      <WhyJoinNow />
      <Testimonials />
      <PlanComparisonSection />
      <RiskReversalFaq />
      <CtaBand />
    </>
  );
}
