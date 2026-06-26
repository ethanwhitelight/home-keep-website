import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Logo from "@/components/ui/Logo";
import SignOutButton from "@/components/dashboard/SignOutButton";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  // Defense-in-depth: middleware already redirects unauthenticated requests
  // for /dashboard/*, but this server-side check is the authoritative one.
  if (!data.user) {
    redirect("/login?redirectTo=/dashboard");
  }

  return (
    <>
      <header className="flex items-center justify-between border-b border-primary-100 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="text-sm text-primary-600">{data.user.email}</span>
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 bg-primary-50">{children}</main>
    </>
  );
}
