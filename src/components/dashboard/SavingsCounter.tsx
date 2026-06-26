import { createClient } from "@/lib/supabase/server";
import { formatCentsAsDollars } from "@/lib/utils/formatCurrency";

export default async function SavingsCounter({ memberId }: { memberId: string }) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("savings_history")
    .select("amount_cents")
    .eq("member_id", memberId);

  const totalCents = (data ?? []).reduce(
    (sum, row) => sum + row.amount_cents,
    0,
  );

  return (
    <div className="rounded-xl border border-primary-100 bg-white p-5 text-center">
      <p className="text-sm font-medium text-primary-600">
        This year&apos;s savings
      </p>
      <p className="mt-1 text-3xl font-bold text-accent-600">
        {formatCentsAsDollars(totalCents)}
      </p>
    </div>
  );
}
