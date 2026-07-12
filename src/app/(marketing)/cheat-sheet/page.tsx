import type { Metadata } from "next";
import CheatSheetOptInForm from "@/components/leads/CheatSheetOptInForm";
import { SEASONAL_TASKS } from "@/data/seasonalTasks";

export const metadata: Metadata = {
  title: "Free Utah Home Maintenance Cheat Sheet",
  description:
    "The 12 things every Utah County homeowner should service each year, and when.",
};

function CheckIcon() {
  return (
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
  );
}

export default function CheatSheetPage() {
  const previewTasks = Array.from(
    new Set(SEASONAL_TASKS.map((task) => task.serviceName)),
  );
  const shown = previewTasks.slice(0, 6);
  const remaining = previewTasks.length - shown.length;

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
          Free download
        </p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-primary-950 sm:text-5xl">
          The Utah home maintenance cheat sheet
        </h1>
        <p className="mt-4 text-lg text-primary-700">
          The things every Utah County homeowner should service each year —
          and exactly when to do them. No membership required.
        </p>

        <ul className="mt-8 space-y-3">
          {shown.map((task) => (
            <li key={task} className="flex gap-3 text-primary-800">
              <CheckIcon />
              <span>{task}</span>
            </li>
          ))}
          {remaining > 0 && (
            <li className="flex gap-3 font-semibold text-primary-500">
              <CheckIcon />
              <span>+ {remaining} more, with the right month for each</span>
            </li>
          )}
        </ul>
      </div>

      <div className="rounded-2xl border border-primary-100 bg-white p-8 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-xl font-bold text-primary-950">
          Get the free checklist
        </h2>
        <p className="mt-2 text-sm text-primary-600">
          Enter your email and we&apos;ll send it straight over.
        </p>
        <div className="mt-6">
          <CheatSheetOptInForm />
        </div>
      </div>
    </div>
  );
}
