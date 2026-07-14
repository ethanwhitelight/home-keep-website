// Thin, safe wrapper around Meta Pixel. No-ops until a pixel script is added
// to the app (window.fbq). TODO(confirm): install the Meta Pixel base code in
// layout.tsx with the real pixel ID to actually record these events.
type FbqArgs = [string, string, Record<string, unknown>?];

declare global {
  interface Window {
    fbq?: (...args: FbqArgs) => void;
  }
}

export function trackStandard(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, data);
  }
}

export function trackCustom(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", event, data);
  }
}

/** Pull UTM params from the current URL, for lead attribution. */
export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
  ]) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  return out;
}
