import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// TODO(M3): replace this placeholder with the shared, data-driven
// PlanComparisonTable component built from src/data/tiers.ts + plans.ts.
const placeholderPlans = [
  {
    tier: "Silver",
    price: 99,
    blurb: "10 everyday essentials",
    popular: false,
  },
  {
    tier: "Gold",
    price: 199,
    blurb: "Silver + 10 seasonal & mechanical services",
    popular: true,
  },
  {
    tier: "Platinum",
    price: 399,
    blurb: "Gold + 10 premium, big-ticket services",
    popular: false,
  },
];

export default function PlanComparisonSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-primary-950">
          Find your plan
        </h2>
        <p className="mt-3 text-center text-primary-600">
          Every tier gets member pricing — higher tiers unlock more services.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {placeholderPlans.map((plan) => (
            <div
              key={plan.tier}
              className={`flex flex-col rounded-2xl border p-6 ${
                plan.popular
                  ? "border-accent-500 bg-white shadow-lg ring-2 ring-accent-500"
                  : "border-primary-100 bg-white"
              }`}
            >
              {plan.popular && (
                <Badge className="mb-3 self-start bg-accent-100 text-accent-700">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-xl font-bold text-primary-950">
                {plan.tier}
              </h3>
              <p className="mt-1 text-3xl font-bold text-primary-950">
                ${plan.price}
                <span className="text-sm font-medium text-primary-500">
                  /yr
                </span>
              </p>
              <p className="mt-2 text-sm text-primary-600">{plan.blurb}</p>
              <span className="mt-1 text-xs text-primary-400">
                TODO(confirm): placeholder pricing
              </span>
              <Button
                href={`/signup?tier=${plan.tier.toLowerCase()}`}
                variant={plan.popular ? "primary" : "secondary"}
                className="mt-6"
              >
                Start {plan.tier} Membership
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/signup?tier=gold" size="lg">
            Start Gold Membership
          </Button>
        </div>
      </div>
    </section>
  );
}
