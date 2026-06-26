import Link from "next/link";
import Button from "@/components/ui/Button";
import { getPlan } from "@/data/plans";
import { TIER_ORDER, TIER_LABELS, type Tier } from "@/types/tiers";

export default function TierBenefitsPanel({ tier }: { tier: Tier }) {
  const plan = getPlan(tier);
  const tierIndex = TIER_ORDER.indexOf(tier);
  const nextTier = TIER_ORDER[tierIndex + 1];
  const hasConciergeAccess = tier !== "silver";

  return (
    <div className="rounded-xl border border-primary-100 bg-white p-5">
      <h2 className="text-lg font-semibold text-primary-950">
        Your benefits — {TIER_LABELS[tier]}
      </h2>
      <ul className="mt-3 space-y-1.5 text-sm text-primary-700">
        {plan.perks.map((perk) => (
          <li key={perk}>{perk}</li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button href="/plans" variant="secondary" size="md">
          See my benefits
        </Button>
        {hasConciergeAccess && (
          <Button href="mailto:concierge@homekeep.com" variant="ghost" size="md">
            Talk to my concierge
          </Button>
        )}
      </div>

      {nextTier && (
        <p className="mt-4 text-sm text-primary-600">
          Want more? Upgrade to{" "}
          <Link
            href={`/signup?tier=${nextTier}`}
            className="font-semibold text-primary-900 underline"
          >
            {TIER_LABELS[nextTier]}
          </Link>{" "}
          for more services and perks.
        </p>
      )}
    </div>
  );
}
