import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Get the App",
  description:
    "The Homekeep app is coming soon — manage your membership, savings, and service requests on the go.",
};

const features = [
  "Request a vetted pro in a couple taps",
  "Track your yearly savings in real time",
  "Seasonal reminders before things break",
];

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
      className="shrink-0 text-accent-600"
      aria-hidden="true"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default function AppPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
        Coming soon
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
        Get the Homekeep app
      </h1>
      <p className="mt-4 text-lg text-primary-700">
        The mobile app is on the way. For now, your Member Hub works great
        right here in the browser.
      </p>

      <ul className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3 rounded-xl border border-primary-100 bg-white px-4 py-3 text-primary-800"
          >
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <span className="flex h-12 w-40 items-center justify-center rounded-xl bg-primary-950 text-xs font-semibold text-white/80">
          App Store — soon
        </span>
        <span className="flex h-12 w-40 items-center justify-center rounded-xl bg-primary-950 text-xs font-semibold text-white/80">
          Google Play — soon
        </span>
      </div>

      <div className="mt-10">
        <Button href="/plans" size="lg">
          See Membership Plans
        </Button>
      </div>
    </div>
  );
}
