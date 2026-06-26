import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ServiceRequestForm from "@/components/leads/ServiceRequestForm";
import { getServicesForTier } from "@/data/tiers";
import type { Tier } from "@/types/tiers";

export default async function RequestServicePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login?redirectTo=/dashboard/request");

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier, subscription_status")
    .eq("id", data.user.id)
    .single();

  if (!profile?.tier || profile.subscription_status !== "active") {
    redirect("/dashboard");
  }

  const tier = profile.tier as Tier;
  const services = getServicesForTier(tier);

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary-950">Request a quote</h1>
      <p className="mt-2 text-primary-700">
        Tell us a bit about the job and a vetted pro will follow up with your{" "}
        {tier} member pricing.
      </p>
      <div className="mt-8 rounded-xl border border-primary-100 bg-white p-6">
        <ServiceRequestForm
          tier={tier}
          services={services}
          defaultService={service}
        />
      </div>
    </div>
  );
}
