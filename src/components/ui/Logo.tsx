import Link from "next/link";

// Homekeep wordmark: a hand-drawn roofline arcing over "Homekeep." in a rounded
// display face. Single-color (currentColor) so it inverts cleanly for the light
// navbar and the dark footer.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Homekeep — home"
      className={`inline-flex items-center text-primary-900 ${className}`}
    >
      <svg
        viewBox="0 0 244 78"
        className="h-9 w-auto"
        fill="none"
        role="img"
        aria-hidden="true"
      >
        {/* roofline gable + ridge stub */}
        <path
          d="M9 46 L112 11 L235 48"
          stroke="currentColor"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M112 14 L115 35"
          stroke="currentColor"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        {/* wordmark */}
        <text
          x="15"
          y="69"
          fill="currentColor"
          style={{
            fontFamily: "var(--font-fredoka), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "44px",
            letterSpacing: "-1.5px",
          }}
        >
          Homekeep.
        </text>
      </svg>
    </Link>
  );
}
