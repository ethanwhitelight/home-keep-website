import { withoutVsWith } from "@/data/stats";

export default function SavingsBarChart() {
  const { withoutLabel, withLabel, withoutAmount, withAmount } =
    withoutVsWith;
  const max = Math.max(withoutAmount, withAmount);
  const savings = withoutAmount - withAmount;

  const bars = [
    { label: withoutLabel, amount: withoutAmount, color: "bg-primary-200" },
    { label: withLabel, amount: withAmount, color: "bg-accent-500" },
  ];

  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-8">
      <div className="flex items-end justify-center gap-10">
        {bars.map((bar) => (
          <div key={bar.label} className="flex flex-col items-center gap-3">
            <span className="text-lg font-bold text-primary-950">
              ${bar.amount.toLocaleString()}
            </span>
            <div
              className={`w-16 rounded-t-md ${bar.color}`}
              style={{ height: `${(bar.amount / max) * 180}px` }}
            />
            <span className="text-sm font-medium text-primary-600">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg bg-accent-50 py-3 text-center">
        <span className="text-sm font-semibold text-accent-700">
          Members save about ${savings.toLocaleString()}/yr on this example
        </span>
      </div>
    </div>
  );
}
