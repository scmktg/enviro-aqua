import { forwardRef } from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, children, ...props }, ref) {
    return (
      <div className="relative inline-block">
        <select
          ref={ref}
          className={clsx(
            "appearance-none h-10 pl-3 pr-9 text-sm bg-paper text-ink rounded-sm border border-line",
            "focus:outline-none focus:border-brand",
            "transition-colors duration-fast hover:border-ink cursor-pointer",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 12 8"
          fill="none"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-2 text-ink"
        >
          <path
            d="M1 1.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
);
