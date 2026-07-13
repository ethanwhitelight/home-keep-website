import Accordion from "@/components/ui/Accordion";
import { faqItems } from "@/data/faq";
import { guaranteeCopy } from "@/data/stats";

export default function RiskReversalFaq() {
  return (
    <section className="bg-primary-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
            Our guarantee
          </p>
          <p className="mt-2 text-xl font-bold text-primary-950">
            {guaranteeCopy}
          </p>
          <ul className="mx-auto mt-5 max-w-md space-y-2 text-left text-sm text-primary-700">
            {[
              "Your dashboard tracks your member savings across all jobs.",
              "If, after 12 months, your total savings are less than your membership fee, we credit the difference toward your next year.",
              "This makes Homekeep designed to pay for itself.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-accent-600"
                  aria-hidden="true"
                >
                  <path d="m5 13 4 4L19 7" />
                </svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>
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
