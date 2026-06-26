import { createClient } from "@/lib/supabase/server";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary-950">Member Hub</h1>
      <p className="mt-2 text-primary-700">
        Signed in as {data.user?.email}.{" "}
        {profile?.tier
          ? `Current tier: ${profile.tier}.`
          : "No active membership yet."}
      </p>
    </div>
  );
}
