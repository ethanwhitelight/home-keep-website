# Home Keep

Marketing site + member web app for Home Keep, a home-services membership club for Utah County, Utah. Members pay an annual fee for member-only pricing and priority access to vetted local contractors.

## Stack

Next.js (App Router) + TypeScript, Tailwind CSS, Supabase (Postgres + Auth), Stripe Checkout + Billing, Vercel.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in real values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example` for the full list. You'll need:

- A **Supabase** project (URL, anon key, service role key) — required for auth, member profiles, leads, and the dashboard. Not yet wired to a real project; see `supabase/migrations/` for the schema to apply.
- A **Stripe** account in test mode (secret key, webhook signing secret, one Price ID per membership tier) — required for Checkout and subscription sync.

Until both are configured, the site runs and the marketing pages work, but signup/login and Checkout will not function end-to-end.

To apply the database schema once you have a Supabase project: install the [Supabase CLI](https://supabase.com/docs/guides/cli), run `supabase link`, then `supabase db push` to run everything in `supabase/migrations/`.

To test Stripe locally once you have test-mode keys: run `stripe listen --forward-to localhost:3000/api/stripe/webhook` and use the printed signing secret as `STRIPE_WEBHOOK_SECRET`. In production, enable these events on the webhook endpoint in the Stripe dashboard: `checkout.session.completed`, `checkout.session.expired`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`.

Email sending isn't wired to a real provider yet — see `src/lib/email/hooks.ts` for the stubbed functions and their call sites (`TODO(confirm)` marks where Resend or similar should be plugged in).

## Project structure

```
src/app/(marketing)/   public site: home, plans, contractors, cheat-sheet, app, terms, privacy
src/app/(auth)/        signup, login
src/app/dashboard/     member hub (auth-gated)
src/app/api/           Stripe checkout/webhook, lead capture routes
src/components/        ui/ (primitives), layout/ (nav, footer), and per-feature folders
src/data/              static, hand-edited content: tier/service ladder, plans, contractors, FAQ
src/lib/               Supabase + Stripe clients, email hook stubs
src/types/             shared TypeScript types
supabase/migrations/   SQL schema for profiles, leads, savings_history, service_requests
```

Pricing, the tier/service ladder, contractor listings, and FAQ copy all live in `src/data/` and are meant to be edited directly — look for `TODO(confirm)` comments marking values that are placeholders pending business sign-off.

## Status

Built milestone-by-milestone, committing after each:

- [x] M1 — scaffold, layout, nav, footer, stub routes
- [x] M2 — homepage sections
- [x] M3 — tier/service data model + plan comparison
- [x] M4 — contractor directory
- [x] M5 — Supabase auth
- [x] M6 — Stripe Checkout + webhook
- [x] M7 — member hub + service requests
- [x] M8 — lead magnet + email hooks
- [x] M9 — polish (a11y, SEO, responsive QA)

## Verification

Lighthouse (production build, `npm run build && npm run start`) on `/`, `/plans`, `/contractors`, `/cheat-sheet`: performance 98, accessibility 100, best practices 100, SEO 100 — all above the 90+ target.

Responsive behavior at 360/768/1280px was verified by code review (every layout uses Tailwind's `sm:`/`lg:` breakpoints, the Navbar has a dedicated mobile menu, and the plans table scrolls horizontally on narrow screens) and Lighthouse's mobile-viewport audit, not by visually inspecting a live browser — this environment has no browser/screenshot tool available. Recommend a manual click-through in an actual browser at those widths before launch.
