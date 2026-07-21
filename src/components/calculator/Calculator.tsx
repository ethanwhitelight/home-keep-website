"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  CALC_SERVICES,
  HOME_SIZE_OPTIONS,
  TIER_FEES,
  computeResult,
  isServiceableZip,
  type Selections,
} from "@/data/calculator";
import { trackCustom, trackStandard, getUtmParams } from "@/lib/analytics/track";

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

// One membership at $199/yr — sourced from the plan data.
const MEMBERSHIP_FEE = TIER_FEES.gold;

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState<string | null>(null);
  const [outOfArea, setOutOfArea] = useState(false);
  const [homeIndex, setHomeIndex] = useState<number | null>(null);
  const [selections, setSelections] = useState<Selections>({});
  const [heavyUser, setHeavyUser] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackCustom("CalculatorStarted");
  }, []);

  const homeMultiplier =
    homeIndex !== null ? HOME_SIZE_OPTIONS[homeIndex].multiplier : 1;
  const result = useMemo(
    () => computeResult(selections, homeMultiplier, heavyUser),
    [selections, homeMultiplier, heavyUser],
  );

  function toggleService(id: string, freqIndex: number) {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[id] === freqIndex) delete next[id];
      else next[id] = freqIndex;
      return next;
    });
  }

  const progress = Math.min(step, 4);

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      {!submitted && !outOfArea && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
            <span>Step {progress} of 4</span>
            <span>{["ZIP", "Home", "Services", "Savings"][progress - 1]}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-100">
            <div
              className="h-full rounded-full bg-accent-500 transition-all duration-300"
              style={{ width: `${(progress / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {outOfArea ? (
        <WaitlistBlock zip={zip} />
      ) : submitted ? (
        <Results
          result={result}
          onReset={() => {
            setSubmitted(false);
            setStep(1);
          }}
        />
      ) : (
        <div className="rounded-2xl border border-primary-100 bg-white p-6 sm:p-8">
          {/* STEP 1 — ZIP */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-primary-950">
                What&apos;s your ZIP code?
              </h2>
              <p className="mt-2 text-sm text-primary-600">
                Currently serving Utah County homeowners only.
              </p>
              <div className="mt-6">
                <Input
                  id="zip"
                  label="ZIP code"
                  inputMode="numeric"
                  autoFocus
                  maxLength={5}
                  placeholder="84604"
                  value={zip}
                  onChange={(e) =>
                    setZip(e.target.value.replace(/\D/g, "").slice(0, 5))
                  }
                />
                {zipError && (
                  <p className="mt-2 text-sm text-red-600">{zipError}</p>
                )}
              </div>
              <Button
                type="button"
                className="mt-6 w-full"
                onClick={() => {
                  if (zip.length !== 5) {
                    setZipError("Enter a 5-digit ZIP code.");
                    return;
                  }
                  setZipError(null);
                  if (!isServiceableZip(zip)) {
                    setOutOfArea(true);
                    return;
                  }
                  setStep(2);
                }}
              >
                Continue
              </Button>
            </div>
          )}

          {/* STEP 2 — HOME SIZE */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-primary-950">
                How big is your home?
              </h2>
              <p className="mt-2 text-sm text-primary-600">
                Helps us estimate typical service costs.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {HOME_SIZE_OPTIONS.map((opt, i) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setHomeIndex(i)}
                    className={`rounded-xl border px-4 py-4 text-left text-sm font-semibold transition-colors ${
                      homeIndex === i
                        ? "border-accent-500 bg-accent-50 text-primary-950"
                        : "border-primary-200 text-primary-800 hover:border-primary-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  disabled={homeIndex === null}
                  onClick={() => setStep(3)}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3 — SERVICES */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-primary-950">
                Which services do you pay for in a typical year?
              </h2>
              <p className="mt-2 text-sm text-primary-600">
                Tap a frequency for each service you use. Skip the rest.
              </p>
              <div className="mt-6 space-y-4">
                {CALC_SERVICES.map((s) => (
                  <div
                    key={s.id}
                    className="border-b border-primary-100 pb-4 last:border-b-0"
                  >
                    <p className="text-sm font-semibold text-primary-900">
                      {s.name}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {s.frequencies.map((f, i) => (
                        <button
                          key={f.label}
                          type="button"
                          onClick={() => toggleService(s.id, i)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                            selections[s.id] === i
                              ? "border-accent-500 bg-accent-500 text-white"
                              : "border-primary-200 text-primary-700 hover:border-primary-300"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl bg-primary-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={heavyUser}
                  onChange={(e) => setHeavyUser(e.target.checked)}
                  className="h-4 w-4 accent-accent-600"
                />
                <span className="text-sm font-medium text-primary-800">
                  I tend to hire out more than the average homeowner.
                </span>
              </label>

              <div className="mt-6 flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  disabled={result.serviceCount === 0}
                  onClick={() => setStep(4)}
                >
                  See my savings
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4 — TEASER + LEAD FORM */}
          {step === 4 && (
            <TeaserForm
              result={result}
              zip={zip}
              homeBucket={
                homeIndex !== null ? HOME_SIZE_OPTIONS[homeIndex].label : ""
              }
              onBack={() => setStep(3)}
              onSubmitted={() => setSubmitted(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}

function TeaserForm({
  result,
  zip,
  homeBucket,
  onBack,
  onSubmitted,
}: {
  result: ReturnType<typeof computeResult>;
  zip: string;
  homeBucket: string;
  onBack: () => void;
  onSubmitted: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sms, setSms] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "calculator",
          name,
          email,
          phone,
          sms_consent: sms,
          zip,
          home_size_bucket: homeBucket,
          selected_services: result.perService.map((s) => s.name).join(", "),
          estimated_annual_spend: result.estimatedSpend,
          estimated_annual_savings: result.estimatedSavings,
          recommended_tier: result.recommendedTier,
          ...getUtmParams(),
        }),
      });
    } catch {
      // Non-blocking: still show the result even if the lead store hiccups.
    }
    setPending(false);
    trackStandard("Lead", { value: result.estimatedSavings, currency: "USD" });
    trackCustom("CalculatorCompleted", {
      recommended_tier: result.recommendedTier,
    });
    onSubmitted();
  }

  return (
    <div>
      <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
        Your estimate
      </p>
      <h2 className="mt-2 text-center text-2xl font-bold text-primary-950 sm:text-3xl">
        Homeowners like you save about{" "}
        <span className="text-accent-600">
          {money(result.estimatedSavings)}/yr
        </span>{" "}
        on home services.
      </h2>

      {/* blurred breakdown */}
      <div className="relative mt-6">
        <div className="pointer-events-none select-none blur-sm">
          <BreakdownTable rows={result.perService} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-primary-950/80 px-4 py-1.5 text-xs font-semibold text-white">
            Unlock your full breakdown ↓
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <p className="text-sm text-primary-700">
          Unlock your full breakdown by service, plus:
        </p>
        <ul className="space-y-1 text-sm text-primary-700">
          <li>• See exactly where your savings come from, service by service</li>
          <li>• Get a copy of your savings report by email</li>
          <li>• Start your Homekeep Membership if it makes sense for you</li>
        </ul>
        <Input
          id="calc-name"
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          id="calc-email"
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="calc-phone"
          label="Phone (recommended)"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label className="flex items-start gap-2 text-sm text-primary-700">
          <input
            type="checkbox"
            checked={sms}
            onChange={(e) => setSms(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-accent-600"
          />
          <span>Text me my savings report and reminders (optional).</span>
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Building your report…" : "Unlock my full breakdown"}
        </Button>
        <p className="text-center text-xs text-primary-500">
          No spam. We use this once to send your report and, if you want, walk
          your numbers on a 10-minute call.
        </p>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-primary-600 hover:text-primary-900"
        >
          ← Edit my services
        </button>
      </div>
    </div>
  );
}

function BreakdownTable({
  rows,
}: {
  rows: ReturnType<typeof computeResult>["perService"];
}) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-primary-200 text-left text-xs uppercase tracking-wide text-primary-500">
          <th className="py-2">Service</th>
          <th className="py-2 text-right">Retail</th>
          <th className="py-2 text-right">Member</th>
          <th className="py-2 text-right">Savings</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} className="border-b border-primary-100">
            <td className="py-2 text-primary-800">{r.name}</td>
            <td className="py-2 text-right text-primary-600">
              {money(r.retail)}
            </td>
            <td className="py-2 text-right text-primary-600">
              {money(r.member)}
            </td>
            <td className="py-2 text-right font-semibold text-accent-700">
              {money(r.savings)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Results({
  result,
  onReset,
}: {
  result: ReturnType<typeof computeResult>;
  onReset: () => void;
}) {
  const net = result.estimatedSavings - MEMBERSHIP_FEE;
  const spendLow = Math.round((result.estimatedSpend * 0.85) / 10) * 10;
  const spendHigh = Math.round((result.estimatedSpend * 1.15) / 10) * 10;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-primary-100 bg-white p-6 text-center sm:p-8">
        <p className="text-sm text-primary-700">
          Based on what you told us, homeowners like you in Utah County usually
          spend about{" "}
          <span className="font-semibold text-primary-950">
            {money(spendLow)}–{money(spendHigh)}/yr
          </span>{" "}
          on home services.
        </p>
        <p className="mt-4 text-lg text-primary-800">
          With typical Homekeep member pricing, you&apos;d save about
        </p>
        <p className="text-4xl font-extrabold text-accent-600">
          {money(result.estimatedSavings)}/yr
        </p>

        <div className="mt-6 rounded-xl bg-primary-50 p-5 text-left">
          <p className="font-bold text-primary-950">
            {net > 0
              ? `That's ${money(net)} more than the $199 membership costs — it pays for itself.`
              : "That's close to the $199 membership — and our guarantee has your back either way."}
          </p>
          <ul className="mt-3 space-y-2">
            {[
              "Every job booked through a pre-vetted local pro at member pricing.",
              "Your dashboard tracks your savings all year.",
              "Backed by our guarantee — if you don't save more than $199, we credit the rest.",
            ].map((b) => (
              <li key={b} className="flex gap-2 text-sm text-primary-700">
                <span className="text-accent-600">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Your return */}
      <div className="rounded-2xl border border-primary-100 bg-white p-6 sm:p-8">
        <h3 className="text-lg font-bold text-primary-950">Your return</h3>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-primary-700">Homekeep Membership</dt>
            <dd className="font-medium text-primary-900">
              {money(MEMBERSHIP_FEE)}/yr
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-primary-700">Your projected savings</dt>
            <dd className="font-medium text-primary-900">
              {money(result.estimatedSavings)}/yr
            </dd>
          </div>
          <div className="flex justify-between border-t border-primary-100 pt-2 text-base font-semibold">
            <dt className="text-primary-900">Net after the fee</dt>
            <dd className={net >= 0 ? "text-accent-700" : "text-primary-900"}>
              {money(net)}/yr
            </dd>
          </div>
        </dl>
      </div>

      {/* full breakdown */}
      <div className="rounded-2xl border border-primary-100 bg-white p-6 sm:p-8">
        <h3 className="text-lg font-bold text-primary-950">
          Your full breakdown
        </h3>
        <div className="mt-4 overflow-x-auto">
          <BreakdownTable rows={result.perService} />
        </div>
        <p className="mt-5 rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm font-medium text-primary-800">
          If you don&apos;t save more than your membership fee in the first 12
          months, we credit the rest.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col items-center gap-3">
        <Button href="/signup?tier=gold" size="lg" className="w-full sm:w-auto">
          Join Homekeep — $199/yr
        </Button>
        <a
          href="/#find-your-plan"
          className="text-sm font-semibold text-primary-700 underline-offset-4 hover:text-primary-900 hover:underline"
        >
          See the membership
        </a>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-primary-500 hover:text-primary-800"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

function WaitlistBlock({ zip }: { zip: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  if (done) {
    return (
      <div className="rounded-2xl border border-primary-100 bg-white p-8 text-center">
        <h2 className="text-2xl font-bold text-primary-950">
          You&apos;re on the list.
        </h2>
        <p className="mt-2 text-primary-700">
          We&apos;ll email you the moment Homekeep reaches your area.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-8">
      <h2 className="text-2xl font-bold text-primary-950">
        We&apos;re not in your area yet.
      </h2>
      <p className="mt-2 text-primary-700">
        Homekeep is starting in Utah County. Join the waitlist and we&apos;ll
        let you know when we reach {zip}.
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          try {
            await fetch("/api/leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                source: "calculator",
                name,
                email,
                zip,
                waitlist: true,
                ...getUtmParams(),
              }),
            });
          } catch {
            // non-blocking
          }
          setPending(false);
          setDone(true);
        }}
      >
        <Input
          id="wl-name"
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          id="wl-email"
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Joining…" : "Join the waitlist"}
        </Button>
      </form>
    </div>
  );
}
