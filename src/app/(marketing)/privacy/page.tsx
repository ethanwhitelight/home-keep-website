import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: "What we collect",
    body: "Account details (email, password), home/profile information you provide, payment metadata from Stripe (we never see or store your card number), and service request details. TODO(confirm): finalize the full data inventory with legal review.",
  },
  {
    heading: "How we use it",
    body: "To run your membership, match you with vetted contractors, show your savings, and (with your consent) send product and offer emails. We do not sell your data.",
  },
  {
    heading: "Third parties",
    body: "We use Supabase (database/auth) and Stripe (payments) as infrastructure providers, and vetted local contractors receive only what's needed to fulfill a service request. TODO(confirm): full subprocessor list pending legal review.",
  },
  {
    heading: "Your choices",
    body: "You can update or delete your account at any time from your dashboard, or by contacting us. TODO(confirm): data retention and deletion timelines pending legal review.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary-950">Privacy Policy</h1>
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
