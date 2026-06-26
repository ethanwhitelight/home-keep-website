import Badge from "@/components/ui/Badge";
import { partnerLogos, benefitBullets } from "@/data/testimonials-logos";

export default function CredibilityRow() {
  return (
    <section className="border-y border-primary-100 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partnerLogos.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-2 text-primary-400"
              title="Placeholder logo"
            >
              <div className="flex h-10 w-28 items-center justify-center rounded-md bg-primary-50 text-xs font-medium text-primary-500">
                {partner.name}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {benefitBullets.map((bullet) => (
            <div
              key={bullet}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary-50 px-4 py-3 text-center text-sm font-semibold text-primary-800"
            >
              {bullet}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Badge>Vetted by Home Keep</Badge>
        </div>
      </div>
    </section>
  );
}
