import Button from "@/components/ui/Button";
import { getPlan } from "@/data/plans";
import { formatCentsAsDollars } from "@/lib/utils/formatCurrency";

const MEMBERSHIP_PERKS = [
  "Access to all vetted local pros at member-only pricing on everyday, seasonal, and big-project services.",
  "Pre-vetted companies only: 4.7★+ rating, 3+ years in business, 50+ Google reviews, licensed and insured.",
  "Self-serve dashboard to request and track every job around your home.",
  "Seasonal maintenance reminders so key tasks don't slip through the cracks.",
  "Priority responses over non-members, especially in busy seasons.",
  "Help planning your home's maintenance so you stop guessing what to do next.",
];

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
  // One membership. Priced from — and checked out through — the existing
  // "gold" plan so the $199 Stripe payment link keeps working unchanged.
  const membership = getPlan("gold");

  return (
    <div>
      <div className="mx-auto max-w-md">
        <div className="flex flex-col rounded-2xl border-2 border-accent-500 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-primary-950">
            Homekeep Membership
          </h3>
          <p className="mt-2">
            <span className="text-3xl font-extrabold text-accent-600">
              {formatCentsAsDollars(membership.priceCents)}
            </span>
            <span className="text-sm font-medium text-primary-500">/yr</span>
          </p>
          <p className="mt-1 text-xs text-primary-500">
            Billed annually · cancel anytime
          </p>

          <ul className="mt-6 flex-1 space-y-3">
            {MEMBERSHIP_PERKS.map((perk) => (
              <li key={perk} className="flex gap-2 text-sm text-primary-700">
                <CheckIcon />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <Button
            href={`/signup?tier=${membership.tier}`}
            variant="primary"
            className="mt-6 w-full"
          >
            Join Homekeep
          </Button>
        </div>
      </div>

      <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 rounded-xl border border-accent-200 bg-accent-50 px-5 py-3 text-center text-sm font-medium text-primary-800">
        <CheckIcon />
        If you don&apos;t save more than your membership fee in the first 12
        months, we credit the rest.
      </p>
    </div>
  );
}
