import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { emailHooks } from "@/lib/email/hooks";
import { getServicesForTier } from "@/data/tiers";
import { TIER_ORDER, type Tier } from "@/types/tiers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { tier, serviceName, propertySize, urgency, notes, photoUrls } = body as {
    tier?: string;
    serviceName?: string;
    propertySize?: string;
    urgency?: string;
    notes?: string;
    photoUrls?: string[];
  };

  if (!tier || !TIER_ORDER.includes(tier as Tier) || !serviceName) {
    return NextResponse.json({ error: "Missing tier or service" }, { status: 400 });
  }

  const availableServiceNames = getServicesForTier(tier as Tier).map(
    (service) => service.serviceName,
  );
  if (!availableServiceNames.includes(serviceName)) {
    return NextResponse.json(
      { error: "Service not available on this tier" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { error } = await supabase.from("service_requests").insert({
    member_id: user.id,
    tier,
    service_name: serviceName,
    property_size: propertySize || null,
    urgency: urgency || null,
    notes: notes || null,
    photo_urls: photoUrls ?? [],
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (user.email) {
    await emailHooks.notifyNewLead({ email: user.email, source: "service-request" });
  }

  return NextResponse.json({ success: true });
}
