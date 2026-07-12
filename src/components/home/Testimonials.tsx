import { testimonials } from "@/data/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-accent-300"
          aria-hidden="true"
        >
          <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-primary-900 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-300">
            Member stories
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            Homeowners who stopped overpaying
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <Stars rating={t.rating} />
              <blockquote className="mt-4 flex-1 text-primary-100">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-primary-300">
                  {t.location} · {t.tier}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
