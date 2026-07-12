import StarRating from "@/components/ui/StarRating";
import type { Contractor } from "@/types/contractor";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function ContractorCard({ contractor }: { contractor: Contractor }) {
  return (
    <div className="flex flex-col rounded-xl border border-primary-100 bg-white p-5 transition-shadow hover:border-primary-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-800 text-lg font-bold text-accent-200">
          {initials(contractor.name)}
        </div>
        {contractor.vetted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-2.5 py-1 text-xs font-semibold text-accent-700">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m5 13 4 4L19 7" />
            </svg>
            Vetted
          </span>
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold text-primary-950">
        {contractor.name}
      </h3>
      <div className="mt-1 flex items-center gap-2 text-sm text-primary-600">
        <StarRating rating={contractor.rating} />
        <span>({contractor.reviewCount} reviews)</span>
      </div>
      <p className="mt-1 text-sm text-primary-500">
        {contractor.yearsInBusiness} years in business
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {contractor.categories.map((category) => (
          <span
            key={category}
            className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs text-primary-600"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
