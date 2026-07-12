export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-primary-100 bg-primary-50">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-primary-900 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-700">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
