import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { emailHooks } from "@/lib/email/hooks";
import { TIER_ORDER, type Tier } from "@/types/tiers";

type LeadBody = {
  email?: string;
  source?: string;
  // calculator-specific extras (stored in metadata)
  name?: string;
  phone?: string;
  sms_consent?: boolean;
  zip?: string;
  home_size_bucket?: string;
  selected_services?: string;
  estimated_annual_spend?: number;
  estimated_annual_savings?: number;
  recommended_tier?: string;
  waitlist?: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

const ALLOWED_SOURCES = new Set(["cheat-sheet", "calculator"]);

export async function POST(request: NextRequest) {
  const body = (await request.json()) as LeadBody;
  const { email, source } = body;

  if (!email || !source || !ALLOWED_SOURCES.has(source)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const supabase = await createClient();

  if (source === "calculator") {
    const tier =
      body.recommended_tier &&
      TIER_ORDER.includes(body.recommended_tier as Tier)
        ? (body.recommended_tier as Tier)
        : null;

    const { error } = await supabase.from("leads").insert({
      email,
      source: "calculator",
      tier,
      metadata: {
        name: body.name ?? null,
        phone: body.phone ?? null,
        sms_consent: body.sms_consent ?? false,
        zip: body.zip ?? null,
        home_size_bucket: body.home_size_bucket ?? null,
        selected_services: body.selected_services ?? null,
        estimated_annual_spend: body.estimated_annual_spend ?? null,
        estimated_annual_savings: body.estimated_annual_savings ?? null,
        recommended_tier: body.recommended_tier ?? null,
        waitlist: body.waitlist ?? false,
        utm_source: body.utm_source ?? null,
        utm_medium: body.utm_medium ?? null,
        utm_campaign: body.utm_campaign ?? null,
        utm_content: body.utm_content ?? null,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await emailHooks.notifyNewLead({ email, source: "calculator" });
    return NextResponse.json({ success: true });
  }

  // cheat-sheet
  const { error } = await supabase
    .from("leads")
    .insert({ email, source: "cheat-sheet" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await emailHooks.notifyNewLead({ email, source: "cheat-sheet" });
  return NextResponse.json({ success: true });
}
