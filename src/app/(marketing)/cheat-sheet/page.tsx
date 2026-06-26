import type { Metadata } from "next";
import CheatSheetHero from "@/components/leads/CheatSheetHero";
import CheatSheetOptInForm from "@/components/leads/CheatSheetOptInForm";

export const metadata: Metadata = {
  title: "Free Utah Home Maintenance Cheat Sheet",
  description:
    "The 12 things every Utah County homeowner should service each year, and when.",
};

export default function CheatSheetPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-950">
          The 12 things every Utah County homeowner should service each year
          (and when)
        </h1>
        <p className="mt-4 text-lg text-primary-700">
          Get the free checklist — no membership required.
        </p>
        <div className="mt-6 flex justify-center">
          <CheatSheetHero />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-sm rounded-2xl border border-primary-100 bg-white p-8">
        <h2 className="text-center text-xl font-bold text-primary-950">
          Or get it right here
        </h2>
        <div className="mt-6">
          <CheatSheetOptInForm />
        </div>
      </div>
    </div>
  );
}
