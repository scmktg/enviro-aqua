import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Slot for a leading icon — receives no styling, expected size 16x16. */
  leadingIcon?: ReactNode;
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, leadingIcon, invalid, type = "text", ...props },
  ref
) {
  return (
    <div className="relative w-full">
      {leadingIcon && (
        <span
          aria-hidden
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        >
          {leadingIcon}
        </span>
      )}
      <input
        ref={ref}
        type={type}
        className={clsx(
          "w-full h-11 bg-paper text-ink placeholder:text-muted rounded-sm border transition-colors duration-fast",
          "focus:outline-none focus:border-brand",
          leadingIcon ? "pl-10 pr-3" : "px-3",
          invalid ? "border-danger" : "border-line",
          className
        )}
        aria-invalid={invalid || undefined}
        {...props}
      />
    </div>
  );
});
