import Button from "@/components/ui/Button";

export default function CtaBand() {
  return (
    <section className="bg-accent-500">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary-950 sm:text-4xl">
          Ready to stop overpaying?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-900/80">
          Join Homekeep and get vetted Utah County pros at member pricing —
          before the next repair bill surprises you.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/plans" variant="secondary" size="lg">
            See Membership Plans
          </Button>
          <Button href="/cheat-sheet" variant="ghost" size="lg">
            Get the free cheat sheet
          </Button>
        </div>
      </div>
    </section>
  );
}
