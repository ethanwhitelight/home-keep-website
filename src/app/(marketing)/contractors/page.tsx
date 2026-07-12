import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContractorGrid from "@/components/contractors/ContractorGrid";
import { getContractors } from "@/data/contractors";

export const metadata: Metadata = {
  title: "Vetted Contractors",
  description:
    "Browse Home Keep's network of vetted, member-rated Utah County home service contractors.",
};

export default function ContractorsPage() {
  const contractors = getContractors();

  return (
    <>
      <PageHeader
        eyebrow="The Network"
        title="Vetted contractors"
        description="Every pro in our network is vetted by Home Keep before they ever work with a member."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="sr-only">Our vetted contractors</h2>
        <ContractorGrid contractors={contractors} />
      </div>
    </>
  );
}
