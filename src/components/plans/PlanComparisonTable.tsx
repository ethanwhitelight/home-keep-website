import { Fragment } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getServicesByCategory } from "@/data/tiers";
import { PLANS } from "@/data/plans";
import { formatCentsAsDollars } from "@/lib/utils/formatCurrency";
import { TIER_ORDER, tierIncludesService } from "@/types/tiers";
import type { Tier } from "@/types/tiers";

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-auto text-accent-600"
      aria-label="Included"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default function PlanComparisonTable({
  ctaTier = "gold" as Tier,
}: {
  ctaTier?: Tier;
}) {
  const servicesByCategory = getServicesByCategory();

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="w-1/4 p-3 text-left align-bottom" />
            {PLANS.map((plan) => (
              <th key={plan.tier} className="p-3 text-center align-bottom">
                <div
                  className={`rounded-t-xl border border-b-0 p-4 ${
                    plan.mostPopular
                      ? "border-accent-500 bg-white"
                      : "border-primary-100 bg-white"
                  }`}
                >
                  {plan.mostPopular && (
                    <Badge className="mb-2 bg-accent-100 text-accent-700">
                      Most Popular
                    </Badge>
                  )}
                  <p className="text-lg font-bold text-primary-950">
                    {plan.displayName}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-primary-950">
                    {formatCentsAsDollars(plan.priceCents)}
                    <span className="text-sm font-medium text-primary-500">
                      /yr
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-primary-600">
                    TODO(confirm): placeholder pricing
                  </p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from(servicesByCategory.entries()).map(([category, services]) => (
            <Fragment key={category}>
              <tr>
                <td
                  colSpan={PLANS.length + 1}
                  className="bg-primary-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary-600"
                >
                  {category}
                </td>
              </tr>
              {services.map((service) => (
                <tr key={service.serviceName} className="border-b border-primary-100">
                  <td className="px-3 py-2.5 text-sm text-primary-800">
                    {service.serviceName}
                  </td>
                  {TIER_ORDER.map((tier) => (
                    <td key={tier} className="px-3 py-2.5 text-center">
                      {tierIncludesService(tier, service) ? <CheckIcon /> : (
                        <span className="text-primary-200">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}

          <tr>
            <td className="bg-primary-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary-600">
              Perks
            </td>
            {PLANS.map((plan) => (
              <td key={plan.tier} className="bg-primary-50 px-3 py-2 align-top">
                <ul className="space-y-1 text-left text-xs text-primary-700">
                  {plan.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-3" />
            {PLANS.map((plan) => (
              <td key={plan.tier} className="p-3 text-center">
                <Button
                  href={`/signup?tier=${plan.tier}`}
                  variant={plan.tier === ctaTier ? "primary" : "secondary"}
                  className="w-full"
                >
                  Start {plan.displayName} Membership
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="mt-4 text-center text-sm text-primary-500">
        Not sure which tier is right for you?{" "}
        <Link href="/cheat-sheet" className="font-medium underline">
          Get the free home maintenance cheat sheet
        </Link>{" "}
        first.
      </p>
    </div>
  );
}
