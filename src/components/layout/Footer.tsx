import Link from "next/link";
import Logo from "@/components/ui/Logo";

const columns = [
  {
    title: "Homekeep",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/plans", label: "Plans" },
      { href: "/contractors", label: "Contractors" },
      { href: "/cheat-sheet", label: "Free Cheat Sheet" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign In" },
      { href: "/signup", label: "Join Now" },
      { href: "/app", label: "Get the App" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-primary-100 bg-primary-950 text-primary-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="text-white [&_span]:text-white" />
            <p className="mt-3 max-w-xs text-sm text-primary-300">
              The membership that saves Utah County homeowners more than the fee
              — and handles the hassle of finding trusted pros.
            </p>
            <p className="mt-4 text-sm text-primary-300">
              <a href="mailto:hello@homekeepco.com" className="hover:text-white">
                hello@homekeepco.com
              </a>
            </p>

            <div className="mt-5">
              <p className="text-sm font-semibold text-white">
                Follow Homekeep
              </p>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href="https://instagram.com/homekeepco"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Homekeep on Instagram"
                  className="text-primary-300 transition-colors hover:text-white"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/homekeepco"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Homekeep on Facebook"
                  className="text-primary-300 transition-colors hover:text-white"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.92 8.44-9.94z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-primary-800 pt-6 sm:flex-row">
          <p className="text-xs text-primary-300">
            &copy; {new Date().getFullYear()} Homekeep. All rights reserved.
          </p>
          <p className="text-xs text-primary-300">Serving Utah County, Utah</p>
        </div>
      </div>
    </footer>
  );
}
