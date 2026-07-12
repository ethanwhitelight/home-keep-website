import { partnerLogos, benefitBullets } from "@/data/testimonials-logos";

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

export default function CredibilityRow() {
  return (
    <section className="border-b border-primary-100 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary-400">
          Trusted local pros in our network
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partnerLogos.map((partner) => (
            <span
              key={partner.name}
              className="text-sm font-semibold text-primary-400"
              title="Placeholder partner name"
            >
              {partner.name}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          {benefitBullets.map((bullet) => (
            <div
              key={bullet}
              className="flex items-center justify-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-5 py-2.5 text-center text-sm font-semibold text-primary-800"
            >
              <CheckIcon />
              {bullet}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
