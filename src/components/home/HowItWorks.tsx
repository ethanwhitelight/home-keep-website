import SectionHeading from "@/components/layout/SectionHeading";

const steps = [
  {
    title: "Tell us about your home.",
    description:
      "A few quick questions about your home and what it needs help with.",
  },
  {
    title: "Get matched with trusted pros at member pricing.",
    description:
      "We connect you with vetted local pros who already offer member-only rates.",
  },
  {
    title: "We help you plan and manage the work.",
    description:
      "Your dashboard tracks savings, upcoming seasonal tasks, and every job.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Simple by design"
          title="How it works"
          description="Three steps from “what does my home need?” to “handled.”"
        />
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-800 text-xl font-bold text-accent-200">
                {index + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-primary-950">
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
