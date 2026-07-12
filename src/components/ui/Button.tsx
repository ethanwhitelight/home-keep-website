import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent-600 text-white hover:bg-accent-700 focus-visible:outline-accent-700",
  secondary:
    "bg-primary-800 text-white hover:bg-primary-700 focus-visible:outline-primary-900",
  ghost:
    "bg-transparent text-primary-900 hover:bg-primary-50 focus-visible:outline-primary-300",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsLink = CommonProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };
type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className = "", ...rest } = props;
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkProps } = rest as ComponentPropsWithoutRef<
      typeof Link
    >;
    return <Link href={href} className={classes} {...linkProps} />;
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)} />
  );
}
