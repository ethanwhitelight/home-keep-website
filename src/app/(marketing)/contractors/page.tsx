import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContractorGrid from "@/components/contractors/ContractorGrid";
import { getContractors } from "@/data/contractors";

export const metadata: Metadata = {
  title: "Vetted Contractors",
  description:
    "Browse Homekeep's network of vetted, member-rated Utah County home service contractors.",
};

export default function ContractorsPage() {
  const contractors = getContractors();

  return (
    <>
      <PageHeader
        eyebrow="The Network"
        title="Vetted contractors"
        description="We only partner with companies that clear a hard bar: a 4.7★+ rating, 3+ years in business, 50+ Google reviews, and current license and insurance."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="sr-only">Our vetted contractors</h2>
        <ContractorGrid contractors={contractors} />
      </div>
    </>
  );
}
