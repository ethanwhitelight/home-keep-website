import Link from "next/link";
import { getContractors } from "@/data/contractors";
import { faqItems } from "@/data/faq";
import { PLANS } from "@/data/plans";
import { partnerLogos, benefitBullets } from "@/data/testimonials-logos";
import { sampleYear, withoutVsWith, guaranteeCopy } from "@/data/stats";
import { getServicesForTier } from "@/data/tiers";
import { formatCentsAsDollars } from "@/lib/utils/formatCurrency";

const FOREST = "#3F4A35";
const OLIVE = "#5B6B4F";
const CREAM = "#F7F4EE";
const SAND = "#EFEAE0";
const GOLD = "#B08A4E";
const INK = "#3A3A32";

const serif = "font-[family-name:var(--font-cormorant)]";

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 20v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VariationB() {
  const contractors = getContractors().slice(0, 6);
  const maxSavings = Math.max(withoutVsWith.withoutAmount, withoutVsWith.withAmount);

  return (
    <div className="flex-1" style={{ color: INK, backgroundColor: CREAM }}>
      {/* Header */}
      <header className="border-b border-black/5" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link href="/" className={`flex items-center gap-2 text-xl font-semibold ${serif}`} style={{ color: INK }}>
            <HouseIcon className="h-6 w-6" />
            Home Keep
          </Link>
          <nav className="hidden items-center gap-10 text-sm tracking-wide text-neutral-600 md:flex">
            <a href="#how-it-works" className="hover:text-neutral-900">How it works</a>
            <a href="#plans" className="hover:text-neutral-900">Plans</a>
            <a href="#contractors" className="hover:text-neutral-900">Contractors</a>
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/login" className="hidden text-sm text-neutral-600 hover:text-neutral-900 sm:block">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-sm border px-5 py-2 text-sm tracking-wide transition hover:text-white"
              style={{ borderColor: OLIVE, color: OLIVE }}
            >
              Join Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Utah County · Home Services Membership</p>
        <h1 className={`mt-6 text-4xl leading-tight sm:text-5xl ${serif}`} style={{ color: INK }}>
          Turn random repair bills into
          <br />
          predictable member savings.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-neutral-600">
          Join Home Keep and get member-only pricing and priority access to trusted Utah County
          home pros.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/plans"
            className="px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:brightness-110"
            style={{ backgroundColor: OLIVE }}
          >
            See Membership Plans
          </Link>
          <Link href="/cheat-sheet" className="text-sm text-neutral-500 underline-offset-4 hover:text-neutral-800 hover:underline">
            Not ready? Get the Free Utah Home Maintenance Cheat Sheet.
          </Link>
        </div>
        <div className="relative mx-auto mt-16 aspect-[16/8] max-w-4xl overflow-hidden rounded-sm" style={{ backgroundColor: "#E7E2D6" }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-left text-white">
            <p className={`text-2xl ${serif}`}>Elevated Home Care</p>
            <p className="text-sm text-white/80">Member pricing, vetted pros</p>
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="border-t border-black/5 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-neutral-400">Vetted by Home Keep</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-neutral-400">
            {partnerLogos.map((partner) => (
              <span key={partner.name} className="text-sm tracking-wide">{partner.name}</span>
            ))}
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-10 text-center sm:grid-cols-3">
            {benefitBullets.map((bullet) => (
              <div key={bullet}>
                <p className={`text-lg ${serif}`} style={{ color: FOREST }}>{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-black/5 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className={`text-3xl ${serif}`} style={{ color: INK }}>How it works</h2>
          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-400">Simple by design</div>
          <div className="mt-12 divide-y divide-black/5 text-left">
            {[
              { title: "Tell us about your home.", description: "A few quick questions about your home and what it needs help with." },
              { title: "Get matched with trusted pros at member pricing.", description: "We connect you with vetted local pros who already offer member-only rates." },
              { title: "We help you plan and manage the work.", description: "Your dashboard tracks savings, upcoming seasonal tasks, and every job." },
            ].map((step, i) => (
              <div key={step.title} className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-6">
                <span className={`text-3xl text-neutral-300 ${serif}`}>0{i + 1}</span>
                <div>
                  <p className="font-medium" style={{ color: INK }}>{step.title}</p>
                  <p className="mt-1 text-sm text-neutral-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why join now */}
      <section className="border-t border-black/5 py-20" style={{ backgroundColor: SAND }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className={`text-3xl ${serif}`} style={{ color: INK }}>Why join now</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-neutral-600">
            A typical Utah County homeowner spends ~${sampleYear.typicalSpendLow.toLocaleString()}–$
            {sampleYear.typicalSpendHigh.toLocaleString()}/yr on home services. Members save{" "}
            {sampleYear.memberSavingsPercent}%+ and get problems handled faster.
          </p>
          <div className="mt-12 flex items-end justify-center gap-16">
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-neutral-500">${withoutVsWith.withoutAmount.toLocaleString()}</span>
              <div
                className="w-16 bg-neutral-300"
                style={{ height: `${(withoutVsWith.withoutAmount / maxSavings) * 200}px` }}
              />
              <span className="text-xs uppercase tracking-wide text-neutral-500">{withoutVsWith.withoutLabel}</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm font-medium" style={{ color: FOREST }}>${withoutVsWith.withAmount.toLocaleString()}</span>
              <div className="w-16" style={{ height: `${(withoutVsWith.withAmount / maxSavings) * 200}px`, backgroundColor: GOLD }} />
              <span className="text-xs uppercase tracking-wide" style={{ color: FOREST }}>{withoutVsWith.withLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="border-t border-black/5 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className={`text-center text-3xl ${serif}`} style={{ color: INK }}>Membership Plans</h2>
          <p className="mt-3 text-center text-sm text-neutral-500">
            Every tier gets member pricing — higher tiers unlock more services.
          </p>
          <div className="mt-14 grid gap-px overflow-hidden border border-black/5 bg-black/5 md:grid-cols-3">
            {PLANS.map((plan) => {
              const planServices = getServicesForTier(plan.tier);
              return (
                <div
                  key={plan.tier}
                  className="relative p-8"
                  style={{ backgroundColor: plan.mostPopular ? "#fff" : CREAM }}
                >
                  {plan.mostPopular && (
                    <span className="absolute right-6 top-6 text-xs uppercase tracking-[0.15em]" style={{ color: GOLD }}>
                      Most Popular
                    </span>
                  )}
                  <h3 className={`text-2xl ${serif}`} style={{ color: INK }}>{plan.displayName}</h3>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-3xl font-light" style={{ color: INK }}>
                      {formatCentsAsDollars(plan.priceCents)}
                    </span>
                    <span className="text-sm text-neutral-500">/ year</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">TODO(confirm): placeholder pricing</p>
                  <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                    {planServices.slice(0, 6).map((s) => (
                      <li key={s.serviceName}>— {s.serviceName}</li>
                    ))}
                    <li className="text-xs text-neutral-400">+ {planServices.length - 6} more services</li>
                  </ul>
                  <Link
                    href={`/signup?tier=${plan.tier}`}
                    className="mt-6 inline-block w-full border px-4 py-2.5 text-center text-sm tracking-wide transition hover:text-white"
                    style={{ borderColor: OLIVE, color: OLIVE }}
                  >
                    Start {plan.displayName} Membership
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-neutral-500">
            Not sure which tier is right for you?{" "}
            <Link href="/cheat-sheet" className="underline" style={{ color: OLIVE }}>
              Get the free home maintenance cheat sheet
            </Link>{" "}
            first.
          </p>
        </div>
      </section>

      {/* Contractors */}
      <section id="contractors" className="border-t border-black/5 py-20" style={{ backgroundColor: SAND }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2 className={`text-center text-3xl ${serif}`} style={{ color: INK }}>Meet a few of our vetted pros</h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {contractors.map((c) => (
              <div key={c.id} className="border-b border-black/10 pb-6">
                <p className="font-medium" style={{ color: INK }}>{c.name}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  ★ {c.rating.toFixed(1)} ({c.reviewCount}) · {c.yearsInBusiness} yrs
                </p>
                <p className="mt-2 text-xs uppercase tracking-wide text-neutral-400">
                  {c.categories.join(" · ")}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contractors" className="text-sm underline-offset-4 hover:underline" style={{ color: OLIVE }}>
              See all vetted contractors →
            </Link>
          </div>
        </div>
      </section>

      {/* Risk reversal + FAQ */}
      <section className="border-t border-black/5 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="border border-black/10 p-8 text-center">
            <p className={`text-xl ${serif}`} style={{ color: FOREST }}>Our Guarantee</p>
            <p className="mt-3 text-sm text-neutral-600">{guaranteeCopy}</p>
          </div>
          <h2 className={`mt-16 text-center text-3xl ${serif}`} style={{ color: INK }}>
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-black/10">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between font-medium" style={{ color: INK }}>
                  {item.question}
                  <span className="ml-4 text-neutral-400 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-neutral-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white" style={{ backgroundColor: FOREST }}>
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className={`text-2xl ${serif}`}>Get In Touch</h2>
          <p className="mt-2 text-sm text-white/70">Start your membership today</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-white/80 sm:flex-row sm:gap-10">
            <span>hello@homekeep.com</span>
            <span>Utah County, UT</span>
          </div>
          <div className="mt-10 flex justify-center gap-8 text-xs uppercase tracking-wide text-white/60">
            <Link href="/plans" className="hover:text-white">Plans</Link>
            <Link href="/contractors" className="hover:text-white">Contractors</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
