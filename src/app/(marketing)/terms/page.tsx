import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: "Membership",
    body: "Homekeep memberships are sold on an annual basis and renew automatically unless canceled. TODO(confirm): renewal, refund, and cancellation terms pending legal review.",
  },
  {
    heading: "Member pricing",
    body: "Member rates are negotiated with vetted contractors and apply only to services booked as a Homekeep member in good standing. TODO(confirm): exact terms of the member-pricing agreement with contractors.",
  },
  {
    heading: "Contractor relationship",
    body: "Homekeep vets contractors but does not employ them. Service agreements and payment for completed work are between the member and the contractor. TODO(confirm): liability and dispute-resolution language pending legal review.",
  },
  {
    heading: "Guarantee",
    body: "See the guarantee described on our homepage and plans page. TODO(confirm): final guarantee terms pending a unit-economics review.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary-950">Terms of Service</h1>
      <p className="mt-2 text-sm text-primary-500">
        TODO(confirm): not yet reviewed by counsel — placeholder copy only.
      </p>
      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-semibold text-primary-950">
              {section.heading}
            </h2>
            <p className="mt-2 text-primary-700">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
