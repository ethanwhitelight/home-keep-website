import Link from "next/link";
import { getRecommendedTasksForMonth } from "@/data/seasonalTasks";
import { getServicesForTier } from "@/data/tiers";
import type { Tier } from "@/types/tiers";

export default function RecommendedTasks({ tier }: { tier: Tier }) {
  const month = new Date().getMonth() + 1;
  const availableServiceNames = new Set(
    getServicesForTier(tier).map((service) => service.serviceName),
  );
  const tasks = getRecommendedTasksForMonth(month).filter((task) =>
    availableServiceNames.has(task.serviceName),
  );

  return (
    <div className="rounded-xl border border-primary-100 bg-white p-5">
      <h2 className="text-lg font-semibold text-primary-950">
        Next recommended tasks
      </h2>
      {tasks.length === 0 ? (
        <p className="mt-2 text-sm text-primary-600">
          Nothing seasonal due right now — check back next month.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {tasks.map((task) => (
            <li
              key={task.serviceName}
              className="flex items-center justify-between rounded-lg bg-primary-50 px-3 py-2 text-sm text-primary-800"
            >
              <span>{task.serviceName}</span>
              <Link
                href={`/dashboard/request?service=${encodeURIComponent(task.serviceName)}`}
                className="text-xs font-semibold text-accent-600 underline"
              >
                Request
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
