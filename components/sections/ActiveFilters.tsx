"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const FACET_LABEL_PREFIX: Record<string, string> = {
  technology: "Type",
  removes: "Reduces",
  application: "Use",
  housing_size: "Size",
  stages: "Stages",
  price_band: "Price",
};

/**
 * Active filter chips. Reads the same URL params as the FilterRail and
 * renders a horizontal chip strip with X-to-remove and a "clear all" link.
 *
 * Always-visible state, per the brief — never collapsed behind a "showing
 * filters" panel.
 */
export function ActiveFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const active: { key: string; value: string }[] = [];
  for (const [key, value] of searchParams.entries()) {
    if (key === "sort" || key === "page" || key === "q") continue;
    active.push({ key, value });
  }

  if (active.length === 0) return null;

  const remove = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);
    params.delete(key);
    for (const v of current.filter((v) => v !== value)) {
      params.append(key, v);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    const params = new URLSearchParams();
    const sort = searchParams.get("sort");
    if (sort) params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center flex-wrap gap-2 mb-6">
      {active.map(({ key, value }) => (
        <button
          key={`${key}-${value}`}
          type="button"
          onClick={() => remove(key, value)}
          className="group inline-flex items-center gap-2 h-8 px-3 bg-brand-50 text-brand text-sm rounded-sm border border-brand-50 hover:border-brand transition-colors duration-fast"
        >
          <span className="text-xs uppercase tracking-wider text-brand/70">
            {FACET_LABEL_PREFIX[key] ?? key}
          </span>
          <span className="capitalize">{value}</span>
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="w-3 h-3"
            aria-hidden
          >
            <path
              d="M3 3l6 6M9 3l-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="sr-only">Remove filter</span>
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="text-sm text-muted hover:text-ink underline underline-offset-4 transition-colors duration-fast h-8 px-2"
      >
        Clear all
      </button>
    </div>
  );
}
