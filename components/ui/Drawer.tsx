"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Drawer title — rendered in <h2>. */
  title: string;
  children: ReactNode;
  /** Footer content — sticks to the bottom (e.g. cart total + checkout button). */
  footer?: ReactNode;
  side?: "right" | "left";
  ariaLabelledBy?: string;
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  side = "right",
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    panelRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Lock body scroll while drawer is open. Keep scrollbar gutter so
    // content doesn't shift on close.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={clsx(
        "fixed inset-0 z-50 transition-opacity duration-200",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <button
        type="button"
        aria-label="Close drawer"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className="absolute inset-0 bg-ink/40 cursor-default"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={clsx(
          "absolute top-0 bottom-0 flex flex-col bg-paper shadow-drawer outline-none",
          "w-full sm:w-[420px]",
          side === "right" ? "right-0" : "left-0",
          "transition-transform duration-200",
          open
            ? "translate-x-0"
            : side === "right"
              ? "translate-x-full"
              : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-line">
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 p-2 text-ink hover:text-brand transition-colors duration-fast"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4"
              aria-hidden
            >
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && (
          <div className="border-t border-line bg-paper">{footer}</div>
        )}
      </div>
    </div>
  );
}
