import Link from "next/link";
import Logo from "@/components/ui/Logo";

const columns = [
  {
    title: "Home Keep",
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

const socialLinks = ["Facebook", "Instagram", "X"];

export default function Footer() {
  return (
    <footer className="border-t border-primary-100 bg-primary-950 text-primary-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="text-white [&_span]:text-white" />
            <p className="mt-3 max-w-xs text-sm text-primary-300">
              Member-only pricing and vetted local pros for Utah County
              homeowners.
            </p>
            <p className="mt-4 text-sm text-primary-300">
              hello@homekeep.com
              <span className="block text-xs text-primary-300">
                TODO(confirm): real contact details
              </span>
            </p>
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
            &copy; {new Date().getFullYear()} Home Keep. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((label) => (
              <span
                key={label}
                className="text-xs text-primary-300"
                title="TODO(confirm): real social links"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
