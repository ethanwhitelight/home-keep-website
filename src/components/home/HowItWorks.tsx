const steps = [
  {
    title: "Tell us about your home.",
    description:
      "A few quick questions about your home and what it needs help with.",
    icon: (
      <path d="M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" />
    ),
  },
  {
    title: "Get matched with trusted pros at member pricing.",
    description:
      "We connect you with vetted local pros who already offer member-only rates.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M2 20c0-3 3-5 7-5s7 2 7 5" />
        <path d="m16 11 2 2 4-4" />
      </>
    ),
  },
  {
    title: "We help you plan and manage the work.",
    description:
      "Your dashboard tracks savings, upcoming seasonal tasks, and every job.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-primary-950">
          How it works
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {step.icon}
                </svg>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent-600">
                Step {index + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-primary-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-primary-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
