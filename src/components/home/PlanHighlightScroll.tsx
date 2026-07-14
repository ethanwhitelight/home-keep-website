"use client";

import { useEffect } from "react";

// When the homepage is loaded with ?plan=... (e.g. from the calculator),
// smoothly scroll the plans section into view so the highlighted card is seen.
export default function PlanHighlightScroll() {
  useEffect(() => {
    const el = document.getElementById("find-your-plan");
    if (!el) return;
    const t = setTimeout(
      () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
      400,
    );
    return () => clearTimeout(t);
  }, []);

  return null;
}
