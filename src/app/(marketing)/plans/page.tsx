import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PlanCards from "@/components/home/PlanCards";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "One simple Homekeep membership at $199/yr — access to vetted, member-priced local pros for Utah County homeowners.",
};

export default function PlansPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="One simple membership"
        description="Every member gets access to vetted local pros at member pricing — all in one membership."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <PlanCards />
      </div>
    </>
  );
}
