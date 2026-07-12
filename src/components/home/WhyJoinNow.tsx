import SavingsBarChart from "@/components/home/SavingsBarChart";
import { sampleYear } from "@/data/stats";

export default function WhyJoinNow() {
  return (
    <section className="bg-primary-50 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
            The math
          </p>
          <h2 className="mt-2 text-3xl font-bold text-primary-950">
            Why join now
          </h2>
          <p className="mt-4 text-lg text-primary-700">
            A typical Utah County homeowner spends ~$
            {sampleYear.typicalSpendLow.toLocaleString()}–$
            {sampleYear.typicalSpendHigh.toLocaleString()}/yr on home
            services.
          </p>
          <p className="mt-3 text-lg text-primary-700">
            On <span className="font-semibold text-primary-900">Gold</span> —
            our most popular plan at $199/yr — members save{" "}
            {sampleYear.memberSavingsPercent}–30% across those jobs and get
            problems handled faster.
          </p>
          <p className="mt-4 text-lg font-semibold text-primary-900">
            Most members recover their entire membership fee with just 1–3
            services a year.
          </p>
        </div>
        <SavingsBarChart />
      </div>
    </section>
  );
}
