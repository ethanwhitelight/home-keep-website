export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold text-primary-950">{title}</h2>
      {description && (
        <p className="mx-auto mt-3 max-w-2xl text-primary-600">{description}</p>
      )}
    </div>
  );
}
