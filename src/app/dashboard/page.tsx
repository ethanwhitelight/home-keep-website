import { createClient } from "@/lib/supabase/server";
import CheckoutButton from "@/components/dashboard/CheckoutButton";
import { TIER_ORDER, type Tier } from "@/types/tiers";

// TODO(M7): build out the full member hub (savings counter, recommended
// tasks, tier benefits panel, service request CTA) on top of this.
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const { data: profile } = data.user
    ? await supabase
        .from("profiles")
        .select("tier, subscription_status")
        .eq("id", data.user.id)
        .single()
    : { data: null };

  const hasActiveMembership = profile?.subscription_status === "active";
  const intendedTierRaw = data.user?.user_metadata?.intended_tier;
  const intendedTier: Tier = TIER_ORDER.includes(intendedTierRaw)
    ? intendedTierRaw
    : "gold";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary-950">Member Hub</h1>
      <p className="mt-2 text-primary-700">
        Signed in as {data.user?.email}.{" "}
        {hasActiveMembership
          ? `Current tier: ${profile?.tier}.`
          : "No active membership yet."}
      </p>

      {!hasActiveMembership && (
        <div className="mt-6 rounded-xl border border-accent-200 bg-accent-50 p-5">
          <p className="text-sm text-primary-800">
            Your account is set up, but checkout hasn&apos;t been completed
            yet.
          </p>
          <div className="mt-3">
            <CheckoutButton tier={intendedTier} />
          </div>
        </div>
      )}
    </div>
  );
}
