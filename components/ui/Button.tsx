import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  /** Stretch to fill its container — used inside cart drawer / forms. */
  block?: boolean;
  children: ReactNode;
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    SharedProps {}

interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    SharedProps {
  href: string;
  /** External / mailto / tel — render a plain anchor, not a Next Link. */
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand text-paper hover:bg-brand-700 active:bg-brand-700 disabled:bg-line disabled:text-muted",
  secondary:
    "bg-ink text-paper hover:bg-paper hover:text-ink hover:ring-1 hover:ring-inset hover:ring-ink",
  ghost: "bg-transparent text-ink hover:bg-mist border border-line",
  link: "bg-transparent text-brand hover:text-brand-700 underline underline-offset-4 px-0",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 text-sm px-3",
  md: "h-11 text-sm px-5",
  lg: "h-12 text-base px-6",
};

function buildClasses(
  variant: Variant,
  size: Size,
  block: boolean | undefined,
  className: string | undefined
) {
  return clsx(
    "inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-tight transition-colors duration-fast disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
    variantClasses[variant],
    variant !== "link" && sizeClasses[size],
    block && "w-full",
    className
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", block, className, children, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={buildClasses(variant, size, block, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

/**
 * ButtonLink renders a Next Link (or a plain anchor for external/mailto/tel)
 * styled identically to Button. Use this anywhere a CTA navigates rather
 * than triggering an action — avoids the invalid anchor-wraps-button
 * nesting that browsers handle inconsistently and screen readers announce
 * twice.
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
    {
      variant = "primary",
      size = "md",
      block,
      className,
      children,
      href,
      external,
      ...props
    },
    ref
  ) {
    const cls = buildClasses(variant, size, block, className);

    if (external) {
      return (
        <a ref={ref} href={href} className={cls} {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link ref={ref} href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }
);
