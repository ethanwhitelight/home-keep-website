import type { ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

export default function Input({ label, id, className = "", ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-primary-800">
        {label}
      </label>
      <input
        id={id}
        className={`mt-1 w-full rounded-lg border border-primary-200 px-3 py-2 text-sm text-primary-950 placeholder:text-primary-300 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 ${className}`}
        {...rest}
      />
    </div>
  );
}
