import type { Metadata } from "next";
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
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-950">
          Vetted contractors
        </h1>
        <p className="mt-3 text-lg text-primary-700">
          Every pro in our network is vetted by Home Keep before they ever
          work with a member.
        </p>
      </div>
      <div className="mt-12">
        <h2 className="sr-only">Our vetted contractors</h2>
        <ContractorGrid contractors={contractors} />
      </div>
    </div>
  );
}
