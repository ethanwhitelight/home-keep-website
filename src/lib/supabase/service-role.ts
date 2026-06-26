import { createClient } from "@supabase/supabase-js";

// Server-only: bypasses RLS. Never import this from client components or
// expose SUPABASE_SERVICE_ROLE_KEY to the browser.
export function createServiceRoleClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
