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
          description="Every Homekeep partner has a 4.7★+ rating, 3+ years in business, 50+ Google reviews, and is licensed and insured."
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
        <p className="mt-6 text-center text-sm text-primary-600">
          Run a home service business and want to join the network?{" "}
          <a
            href="mailto:partners@homekeepco.com?subject=Homekeep%20partner%20application"
            className="font-semibold text-primary-900 underline underline-offset-4"
          >
            Apply to become a Homekeep partner.
          </a>
        </p>
      </div>
    </section>
  );
}
