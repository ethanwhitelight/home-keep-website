"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { Tier } from "@/types/tiers";

export default function CheckoutButton({ tier }: { tier: Tier }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setPending(true);
    setError(null);

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier }),
    });
    const data = await response.json();

    if (!response.ok || !data.url) {
      setPending(false);
      setError(data.error ?? "Could not start checkout. Please try again.");
      return;
    }

    window.location.href = data.url;
  }

  return (
    <div>
      <Button type="button" onClick={handleClick} disabled={pending}>
        {pending ? "Redirecting…" : `Complete ${tier} membership checkout`}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
