import SectionHeading from "@/components/layout/SectionHeading";

const steps = [
  {
    title: "Join",
    description:
      "Become a member and pick the plan that fits your home.",
  },
  {
    title: "Request a service",
    description:
      "Tell us what you need and we match you with a pre-vetted local pro.",
  },
  {
    title: "Pay & save",
    description:
      "Pay the contractor directly at your member rate. Your dashboard tracks how much you've saved.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Simple by design"
          title="How it works"
          description="Homekeep is a yearly membership that saves you money on home services by connecting you with pre-vetted local pros at member-only pricing."
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
        <p className="mx-auto mt-12 max-w-2xl rounded-xl border border-primary-100 bg-primary-50 px-5 py-4 text-center text-sm text-primary-800">
          You pay the contractor directly at your member rate. Homekeep only
          charges a membership fee —{" "}
          <span className="font-semibold text-primary-950">
            we never mark up jobs or take a cut.
          </span>
        </p>
      </div>
    </section>
  );
}
