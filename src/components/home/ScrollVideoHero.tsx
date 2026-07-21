import Link from "next/link";
import Button from "@/components/ui/Button";
import { heroStats } from "@/data/stats";

// Static hero (the scroll-scrubbed video intro was removed). Kept in this file
// so the homepage import stays unchanged.
export default function ScrollVideoHero() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
            Utah County Home Services
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-primary-900 sm:text-5xl lg:text-6xl">
            Save more on home services than your membership costs.
          </h1>
          <p className="mt-5 max-w-md text-lg text-primary-700">
            Utah County homeowners get member-only pricing with pre-vetted
            local pros — all in one simple membership.
          </p>
          <p className="mt-5 flex max-w-md items-start gap-2 rounded-xl border border-primary-200 bg-white/70 px-4 py-3 text-sm font-medium text-primary-800">
            <svg
              width="18"
              height="18"
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
            If you don&apos;t save more than your membership fee in the first 12
            months, we credit the rest.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button href="/#find-your-plan" size="lg">
              See membership
            </Button>
            <Button href="/calculator" variant="secondary" size="lg">
              See how much you could save
            </Button>
          </div>
          <Link
            href="/#how-it-works"
            className="mt-4 inline-block text-sm font-semibold text-primary-700 underline-offset-4 hover:text-primary-900 hover:underline"
          >
            How Homekeep works
          </Link>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-primary-200 pt-8">
            {heroStats.map((stat, i) => (
              <div key={stat.label}>
                <p
                  className={`text-2xl font-bold sm:text-3xl ${
                    i === 0 ? "text-accent-600" : "text-primary-900"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-primary-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
