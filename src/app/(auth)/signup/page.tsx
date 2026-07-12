import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Your Account",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  // Already signed in: send them to the dashboard, but preserve the tier they
  // just picked so checkout targets the right plan (not the dashboard default).
  if (data.user) {
    redirect(tier ? `/dashboard?tier=${encodeURIComponent(tier)}` : "/dashboard");
  }

  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-8 shadow-sm">
      <h1 className="text-center text-2xl font-bold text-primary-950">
        Create your account
      </h1>
      {tier && (
        <div className="mt-3 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold capitalize text-accent-700">
            {tier} plan selected
          </span>
        </div>
      )}
      <div className="mt-6">
        <SignupForm tier={tier} />
      </div>
      <p className="mt-6 text-center text-sm text-primary-600">
        Already a member?{" "}
        <Link href="/login" className="font-semibold text-primary-900 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
