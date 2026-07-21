import Link from "next/link";
import Button from "@/components/ui/Button";
import { heroSavingsHeadline } from "@/data/stats";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary-50 to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary-950 sm:text-5xl">
            Turn random repair bills into predictable member savings.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-700">
            Join Homekeep and get member-only pricing and priority access to
            trusted Utah County home pros.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button href="/plans" size="lg">
              See Membership
            </Button>
            <Link
              href="/cheat-sheet"
              className="text-sm font-semibold text-primary-700 underline-offset-4 hover:text-primary-900 hover:underline"
            >
              Not ready? Get the Free Utah Home Maintenance Cheat Sheet.
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-primary-100 bg-white p-8 shadow-sm">
          <div className="flex h-48 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <span className="text-sm">Hero image placeholder</span>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-primary-600">
              Average member saves
            </p>
            <p className="text-4xl font-bold text-accent-600">
              {heroSavingsHeadline}/yr
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
