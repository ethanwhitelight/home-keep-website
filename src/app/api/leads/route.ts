import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { emailHooks } from "@/lib/email/hooks";

export async function POST(request: NextRequest) {
  const { email, source } = (await request.json()) as {
    email?: string;
    source?: string;
  };

  if (!email || source !== "cheat-sheet") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({ email, source });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await emailHooks.notifyNewLead({ email, source: "cheat-sheet" });

  return NextResponse.json({ success: true });
}
