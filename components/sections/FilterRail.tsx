"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import type { FacetSummary } from "@/types/facet";

interface FilterRailProps {
  facets: FacetSummary[];
}

/**
 * Filter rail. State is held in the URL as repeated query params
 * (`?technology=Carbon+Block&technology=GAC`). This makes filtered
 * states bookmarkable, shareable, and SSR-renderable.
 *
 * We render <details>/<summary> for native keyboard support and zero JS
 * collapse/expand — the URL update is the only client interaction.
 *
 * Render policy: callers should check `facets.length > 0` before mounting
 * this component, AND adjust the parent grid to single-column when there
 * are no facets. We don't render a "no filters" state because an empty
 * sidebar with reserved layout space looks broken.
 */
export function FilterRail({ facets }: FilterRailProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggle = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.getAll(key);
      if (current.includes(value)) {
        params.delete(key);
        for (const v of current.filter((v) => v !== value)) {
          params.append(key, v);
        }
      } else {
        params.append(key, value);
      }
      // Reset pagination when filters change.
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const isActive = (key: string, value: string) => {
    return searchParams.getAll(key).includes(value);
  };

  if (facets.length === 0) {
    return null;
  }

  return (
    <aside aria-label="Product filters" className="space-y-1">
      <p className="text-xs uppercase tracking-[0.18em] text-muted mb-4 px-1">
        Filter by
      </p>
      {facets.map((facet) => (
        <details
          key={facet.key}
          open
          className="border-b border-line py-3 group"
        >
          <summary className="flex items-center justify-between cursor-pointer list-none px-1 py-1">
            <span className="text-sm font-medium text-ink">{facet.label}</span>
            <svg
              viewBox="0 0 12 12"
              fill="none"
              className="w-3 h-3 text-muted transition-transform duration-fast group-open:rotate-180"
              aria-hidden
            >
              <path
                d="M2 4.5l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <ul className="mt-2 space-y-1.5">
            {facet.values.map(({ value, count }) => {
              const active = isActive(facet.key, value);
              return (
                <li key={value}>
                  <button
                    type="button"
                    onClick={() => toggle(facet.key, value)}
                    aria-pressed={active}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-sm text-sm transition-colors duration-fast text-left ${
                      active
                        ? "bg-brand-50 text-brand"
                        : "text-ink hover:bg-mist"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                          active
                            ? "bg-brand border-brand"
                            : "bg-paper border-line"
                        }`}
                      >
                        {active && (
                          <svg
                            viewBox="0 0 10 10"
                            fill="none"
                            className="w-2.5 h-2.5 text-paper"
                          >
                            <path
                              d="m2 5 2 2 4-4.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="capitalize">{value}</span>
                    </span>
                    <span className="text-xs text-muted tabular">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </aside>
  );
}
