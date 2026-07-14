import ScrollVideoHero from "@/components/home/ScrollVideoHero";
import CredibilityRow from "@/components/home/CredibilityRow";
import FeaturedContractorsRow from "@/components/home/FeaturedContractorsRow";
import HowItWorks from "@/components/home/HowItWorks";
import WhyJoinNow from "@/components/home/WhyJoinNow";
import Testimonials from "@/components/home/Testimonials";
import PlanComparisonSection from "@/components/home/PlanComparisonSection";
import PlanHighlightScroll from "@/components/home/PlanHighlightScroll";
import RiskReversalFaq from "@/components/home/RiskReversalFaq";
import CtaBand from "@/components/home/CtaBand";
import { TIER_ORDER, type Tier } from "@/types/tiers";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  const highlightTier: Tier | undefined = TIER_ORDER.includes(plan as Tier)
    ? (plan as Tier)
    : undefined;

  return (
    <>
      {highlightTier && <PlanHighlightScroll />}
      <ScrollVideoHero />
      <CredibilityRow />
      <FeaturedContractorsRow />
      <HowItWorks />
      <WhyJoinNow />
      <Testimonials />
      <PlanComparisonSection highlightTier={highlightTier} />
      <RiskReversalFaq />
      <CtaBand />
    </>
  );
}
