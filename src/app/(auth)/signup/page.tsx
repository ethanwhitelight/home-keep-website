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
  if (data.user) redirect("/dashboard");

  return (
    <div className="rounded-xl border border-primary-100 bg-white p-8 shadow-sm">
      <h1 className="text-center text-2xl font-bold text-primary-950">
        Create your account
      </h1>
      {tier && (
        <p className="mt-2 text-center text-sm text-primary-600">
          Selected plan: <span className="font-semibold capitalize">{tier}</span>
        </p>
      )}
      <div className="mt-6">
        <SignupForm tier={tier} />
      </div>
      <p className="mt-6 text-center text-sm text-primary-600">
        Already a member?{" "}
        <Link href="/login" className="font-semibold underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
