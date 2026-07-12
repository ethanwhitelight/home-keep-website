import Accordion from "@/components/ui/Accordion";
import { faqItems } from "@/data/faq";
import { guaranteeCopy } from "@/data/stats";

export default function RiskReversalFaq() {
  return (
    <section className="bg-primary-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6 text-center">
          <h2 className="text-lg font-bold text-primary-950">Our guarantee</h2>
          <p className="mt-2 text-sm text-primary-700">{guaranteeCopy}</p>
        </div>

        <p className="mt-12 text-center text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
          Questions
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold text-primary-950">
          Frequently asked questions
        </h2>
        <div className="mt-6">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
