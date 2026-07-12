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
            <Logo className="!text-white" />
            <p className="mt-3 max-w-xs text-sm text-primary-300">
              The membership that saves Utah County homeowners more than the fee
              — and handles the hassle of finding trusted pros.
            </p>
            <p className="mt-4 text-sm text-primary-300">
              <a href="mailto:hello@homekeepco.com" className="hover:text-white">
                hello@homekeepco.com
              </a>
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
            &copy; {new Date().getFullYear()} Homekeep. All rights reserved.
          </p>
          <p className="text-xs text-primary-300">Serving Utah County, Utah</p>
        </div>
      </div>
    </footer>
  );
}
