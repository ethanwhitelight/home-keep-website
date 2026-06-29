"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getPaymentLinkUrl } from "@/lib/stripe/paymentLinks";
import { TIER_ORDER, type Tier } from "@/types/tiers";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupForm({ tier }: { tier?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: tier ? { data: { intended_tier: tier } } : undefined,
    });

    setPending(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (!data.session) {
      setCheckEmail(true);
      return;
    }

    if (!tier || !TIER_ORDER.includes(tier as Tier)) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    window.location.href = getPaymentLinkUrl(tier as Tier, {
      id: data.session.user.id,
      email: data.session.user.email,
    });
  }

  if (checkEmail) {
    return (
      <p className="text-sm text-primary-700">
        Check your email to confirm your account, then{" "}
        <a href="/login" className="font-semibold underline">
          sign in
        </a>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
