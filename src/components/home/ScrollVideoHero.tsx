"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { heroStats } from "@/data/stats";

// Full-screen scroll-scrubbed video intro, followed by the hero content as its
// own readable section. While the tall video track scrolls past, the pinned
// video's currentTime is driven by scroll progress (Apple-style scrubbing);
// once the track ends, the navy hero section scrolls into view.
// Falls back to a single static frame when the user prefers reduced motion,
// and hides the video section entirely if the file is missing.
export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrubbable, setScrubbable] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);
  // Phones get a shorter scroll track so the headline/CTAs aren't buried
  // under nearly 3 screens of video before any pitch appears.
  const [trackHeight, setTrackHeight] = useState("360vh");

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const handleError = () => setVideoMissing(true);
    video.addEventListener("error", handleError);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      return () => video.removeEventListener("error", handleError);
    }

    let enabled = false;

    const updateTrackHeight = () => {
      setTrackHeight(
        window.matchMedia("(max-width: 767px)").matches ? "260vh" : "360vh",
      );
    };
    updateTrackHeight();

    let targetTime = 0;
    let frame = 0;

    const updateTarget = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const target = progress * (video.duration || 0);
      if (Number.isFinite(target)) targetTime = target;
    };

    // Continuous rAF loop that eases the video toward the scroll target.
    // Jumping currentTime directly on each scroll event looks steppy; lerping
    // toward the target (and never issuing a new seek while one is still in
    // flight) keeps the scrub fluid.
    const tick = () => {
      if (!enabled) return;
      if (!video.seeking) {
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.005) {
          // Snap across big jumps (e.g. fast flicks) instead of chasing them.
          const step = Math.abs(diff) > 1.5 ? diff : diff * 0.3;
          video.currentTime = video.currentTime + step;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    const handleReady = () => {
      // Only scrub once we know the clip's duration and it actually has frames.
      if (video.duration && Number.isFinite(video.duration) && !enabled) {
        enabled = true;
        setScrubbable(true);
        updateTarget();
        video.currentTime = targetTime;
        frame = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => updateTarget();

    video.addEventListener("loadedmetadata", handleReady);
    if (video.readyState >= 1) handleReady();
    const onResize = () => {
      updateTrackHeight();
      updateTarget();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      enabled = false;
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadedmetadata", handleReady);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* Full-bleed video intro — no text on top, fully readable footage */}
      {!videoMissing && (
        <section
          ref={sectionRef}
          className="relative bg-primary-950"
          aria-hidden="true"
          // Tall scroll track only when a scrubbable video is loaded; otherwise
          // the intro is a single static viewport.
          style={scrubbable ? { height: trackHeight } : undefined}
        >
          <div className="sticky top-0 h-dvh overflow-hidden">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src="/hero.mp4"
              poster="/hero-poster.svg"
              muted
              playsInline
              preload="auto"
            />
            {/* Soft fade at the bottom so the video hands off into the cream hero */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
          </div>
        </section>
      )}

      {/* Hero content — its own clean, light section, no video behind the text */}
      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
              Utah County Home Services
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-primary-900 sm:text-5xl lg:text-6xl">
              Save more on home services than your membership costs.
            </h1>
            <p className="mt-5 max-w-md text-lg text-primary-700">
              Utah County homeowners get member-only pricing with pre-vetted
              local pros — and more help at every tier.
            </p>
            <p className="mt-5 flex max-w-md items-start gap-2 rounded-xl border border-primary-200 bg-white/70 px-4 py-3 text-sm font-medium text-primary-800">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-accent-600"
                aria-hidden="true"
              >
                <path d="m5 13 4 4L19 7" />
              </svg>
              If you don&apos;t save more than your membership fee in the first
              12 months, we credit the rest.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href="/plans" size="lg">
                See membership plans
              </Button>
              <Link
                href="/#how-it-works"
                className="text-sm font-semibold text-primary-700 underline-offset-4 hover:text-primary-900 hover:underline"
              >
                How Homekeep works
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-primary-200 pt-8">
              {heroStats.map((stat, i) => (
                <div key={stat.label}>
                  <p
                    className={`text-2xl font-bold sm:text-3xl ${
                      i === 0 ? "text-accent-600" : "text-primary-900"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-primary-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
