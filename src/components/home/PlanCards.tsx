import Link from "next/link";
import Button from "@/components/ui/Button";
import { PLANS } from "@/data/plans";
import { formatCentsAsDollars } from "@/lib/utils/formatCurrency";

function CheckIcon() {
  return (
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
  );
}

export default function PlanCards() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PLANS.map((plan) => {
          const featured = plan.mostPopular;
          return (
            <div
              key={plan.tier}
              className={`relative flex flex-col rounded-2xl border bg-white p-6 ${
                featured
                  ? "border-2 border-accent-500 shadow-sm md:-mt-2 md:mb-2"
                  : "border-primary-100"
              }`}
            >
              {featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-primary-950">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-primary-950">
                {plan.displayName}
              </h3>
              <p className="mt-1 min-h-[4rem] text-sm text-primary-600">
                {plan.tagline}
              </p>
              <p className="mt-2">
                <span
                  className={`text-3xl font-extrabold ${
                    featured ? "text-accent-600" : "text-primary-950"
                  }`}
                >
                  {formatCentsAsDollars(plan.priceCents)}
                </span>
                <span className="text-sm font-medium text-primary-500">
                  /yr
                </span>
              </p>
              <p className="mt-1 text-xs text-primary-500">
                Billed annually · cancel anytime
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex gap-2 text-sm text-primary-700"
                  >
                    <CheckIcon />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <Button
                href={`/signup?tier=${plan.tier}`}
                variant={featured ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                Join {plan.displayName}
              </Button>
            </div>
          );
        })}
      </div>

      <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 rounded-xl border border-accent-200 bg-accent-50 px-5 py-3 text-center text-sm font-medium text-primary-800">
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
        If you don&apos;t save more than your membership fee in the first 12
        months, we credit the rest.
      </p>

      <p className="mt-6 text-center text-sm text-primary-600">
        Want the full breakdown?{" "}
        <Link href="/plans" className="font-semibold text-primary-900 underline">
          Compare every service across tiers
        </Link>
        .
      </p>
    </div>
  );
}
