import ContractorCard from "@/components/contractors/ContractorCard";
import type { Contractor } from "@/types/contractor";

export default function ContractorGrid({
  contractors,
  limit,
}: {
  contractors: Contractor[];
  limit?: number;
}) {
  const visible = limit ? contractors.slice(0, limit) : contractors;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {visible.map((contractor) => (
        <ContractorCard key={contractor.id} contractor={contractor} />
      ))}
    </div>
  );
}
