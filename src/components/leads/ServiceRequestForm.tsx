"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import type { Tier, ServiceItem } from "@/types/tiers";

export default function ServiceRequestForm({
  tier,
  services,
  defaultService,
}: {
  tier: Tier;
  services: ServiceItem[];
  defaultService?: string;
}) {
  const router = useRouter();
  const [serviceName, setServiceName] = useState(
    defaultService ?? services[0]?.serviceName ?? "",
  );
  const [propertySize, setPropertySize] = useState("");
  const [urgency, setUrgency] = useState("flexible");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);

    let photoUrls: string[] = [];
    if (photo) {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (userId) {
        const path = `${userId}/${Date.now()}-${photo.name}`;
        const { error: uploadError } = await supabase.storage
          .from("service-request-photos")
          .upload(path, photo);
        if (!uploadError) {
          photoUrls = [path];
        }
      }
    }

    const response = await fetch("/api/service-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tier,
        serviceName,
        propertySize,
        urgency,
        notes,
        photoUrls,
      }),
    });

    setPending(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "Could not submit your request. Please try again.");
      return;
    }

    setSubmitted(true);
    router.refresh();
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-accent-200 bg-accent-50 p-6 text-center">
        <p className="font-semibold text-primary-950">Request submitted.</p>
        <p className="mt-1 text-sm text-primary-700">
          A vetted pro will reach out with your member pricing.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="serviceName" className="block text-sm font-medium text-primary-800">
          Service
        </label>
        <select
          id="serviceName"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-primary-200 px-3 py-2 text-sm text-primary-950 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {services.map((service) => (
            <option key={service.serviceName} value={service.serviceName}>
              {service.serviceName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="propertySize" className="block text-sm font-medium text-primary-800">
          Property size
        </label>
        <select
          id="propertySize"
          value={propertySize}
          onChange={(e) => setPropertySize(e.target.value)}
          className="mt-1 w-full rounded-lg border border-primary-200 px-3 py-2 text-sm text-primary-950 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">Select…</option>
          <option value="under_1500_sqft">Under 1,500 sq ft</option>
          <option value="1500_3000_sqft">1,500–3,000 sq ft</option>
          <option value="over_3000_sqft">Over 3,000 sq ft</option>
        </select>
      </div>

      <div>
        <label htmlFor="urgency" className="block text-sm font-medium text-primary-800">
          Urgency
        </label>
        <select
          id="urgency"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          className="mt-1 w-full rounded-lg border border-primary-200 px-3 py-2 text-sm text-primary-950 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="asap">As soon as possible</option>
          <option value="this_week">This week</option>
          <option value="this_month">This month</option>
          <option value="flexible">I&apos;m flexible</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-primary-800">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-primary-200 px-3 py-2 text-sm text-primary-950 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-primary-800">
          Photo (optional)
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
          className="mt-1 w-full text-sm text-primary-700"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Submitting…" : "Submit request"}
      </Button>
    </form>
  );
}
