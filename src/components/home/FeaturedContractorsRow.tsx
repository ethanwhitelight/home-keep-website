import Link from "next/link";
import ContractorGrid from "@/components/contractors/ContractorGrid";
import SectionHeading from "@/components/layout/SectionHeading";
import { getContractors } from "@/data/contractors";

export default function FeaturedContractorsRow() {
  const contractors = getContractors();

  return (
    <section className="bg-primary-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Network"
          title="Meet a few of our vetted pros"
          description="Every contractor in our network is vetted by Home Keep."
        />
        <div className="mt-10">
          <ContractorGrid contractors={contractors} limit={4} />
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/contractors"
            className="text-sm font-semibold text-primary-700 underline-offset-4 hover:text-primary-900 hover:underline"
          >
            See all vetted contractors →
          </Link>
        </div>
      </div>
    </section>
  );
}
