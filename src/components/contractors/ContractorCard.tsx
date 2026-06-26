import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import type { Contractor } from "@/types/contractor";

export default function ContractorCard({ contractor }: { contractor: Contractor }) {
  return (
    <div className="flex flex-col rounded-xl border border-primary-100 bg-white p-5">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary-50 text-xs font-semibold text-primary-400">
        Logo
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
      {contractor.vetted && (
        <Badge className="mt-4 self-start bg-accent-100 text-accent-700">
          Vetted by Home Keep
        </Badge>
      )}
    </div>
  );
}
