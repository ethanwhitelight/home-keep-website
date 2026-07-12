import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CheckoutButton from "@/components/dashboard/CheckoutButton";
import SavingsCounter from "@/components/dashboard/SavingsCounter";
import RecommendedTasks from "@/components/dashboard/RecommendedTasks";
import TierBenefitsPanel from "@/components/dashboard/TierBenefitsPanel";
import Button from "@/components/ui/Button";
import { TIER_ORDER, type Tier } from "@/types/tiers";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier: tierParam } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  // Middleware already redirects unauthenticated users; this guard also narrows
  // `user` to non-null for the rest of the component.
  if (!data.user) redirect("/login");
  const user = data.user;

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier, subscription_status")
    .eq("id", user.id)
    .single();

  const hasActiveMembership = profile?.subscription_status === "active";
  // Priority: tier just clicked (?tier=) > tier chosen at signup (metadata) > gold.
  const metadataTier = user.user_metadata?.intended_tier;
  const intendedTier: Tier = TIER_ORDER.includes(tierParam as Tier)
    ? (tierParam as Tier)
    : TIER_ORDER.includes(metadataTier)
      ? metadataTier
      : "gold";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary-950">Member Hub</h1>
      <p className="mt-2 text-primary-700">
        Signed in as {user.email}.{" "}
        {hasActiveMembership
          ? `Current tier: ${profile?.tier}.`
          : "No active membership yet."}
      </p>

      {!hasActiveMembership ? (
        <div className="mt-6 rounded-xl border border-accent-200 bg-accent-50 p-5">
          <p className="text-sm text-primary-800">
            Your account is set up, but checkout hasn&apos;t been completed
            yet.
          </p>
          <div className="mt-3">
            <CheckoutButton
              tier={intendedTier}
              memberId={user.id}
              email={user.email}
            />
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <SavingsCounter memberId={user.id} />
            <Button href="/dashboard/request" className="w-full">
              Request a quote
            </Button>
          </div>
          <div className="space-y-6 lg:col-span-2">
            <RecommendedTasks tier={profile!.tier as Tier} />
            <TierBenefitsPanel tier={profile!.tier as Tier} />
          </div>
        </div>
      )}
    </div>
  );
}
