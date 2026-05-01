import type { ReactNode } from "react";
import clsx from "clsx";

type BadgeTone =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "outline";

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

const toneClass: Record<BadgeTone, string> = {
  neutral: "bg-mist text-ink border border-line",
  brand: "bg-brand-50 text-brand border border-brand-50",
  success: "bg-[#ecfdf5] text-success border border-[#a7f3d0]",
  warning: "bg-[#fffbeb] text-warning border border-[#fde68a]",
  danger: "bg-[#fef2f2] text-danger border border-[#fecaca]",
  outline: "bg-paper text-ink border border-line",
};

export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-sm px-2 h-6 text-xs font-medium tracking-tight",
        toneClass[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
