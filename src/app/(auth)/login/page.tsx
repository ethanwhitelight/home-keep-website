import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/dashboard");

  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-8 shadow-sm">
      <h1 className="text-center text-2xl font-bold text-primary-950">
        Sign in
      </h1>
      <div className="mt-6">
        <LoginForm redirectTo={redirectTo} />
      </div>
      <p className="mt-6 text-center text-sm text-primary-600">
        Not a member yet?{" "}
        <Link href="/plans" className="font-semibold text-primary-900 underline">
          See membership plans
        </Link>
      </p>
    </div>
  );
}
