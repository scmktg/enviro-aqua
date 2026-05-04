"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Price } from "@/components/ui/Price";
import { shortTitle } from "@/lib/format";
import { BUSINESS } from "@/lib/business";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const POPULAR_QUERIES = [
  { label: "Whole house filter", href: "/shop/water-filters/whole-house-filters" },
  { label: "Under sink & RO", href: "/shop/water-filters/under-sink-ro-systems" },
  { label: "UV steriliser", href: "/shop/water-filters/uv-sterilisers" },
  {
    label: "Bubblers for schools",
    href: "/shop/drinking-bubblers/commercial-bubblers",
  },
  {
    label: "Replacement cartridges",
    href: "/shop/water-filters/replacement-cartridges",
  },
];

interface SearchResult {
  id: string;
  sku: string;
  slug: string;
  title: string;
  price: number;
  image: string | null;
  url: string;
}

/**
 * Search overlay. Calls the server-side /api/search endpoint instead of
 * importing the full catalogue into the browser bundle. Debounced 200ms
 * to avoid hammering the endpoint on every keystroke. Latest-wins
 * dispatch: stale fetches are discarded if a newer query has fired,
 * preventing UI flicker from out-of-order responses.
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
      setResults([]);
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  // Debounced search — fires 200ms after the user stops typing.
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const id = ++requestIdRef.current;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}&limit=8`
        );
        if (!res.ok) throw new Error("Search failed");
        const data = (await res.json()) as { results: SearchResult[] };
        // Discard stale responses.
        if (id !== requestIdRef.current) return;
        setResults(data.results);
      } catch {
        if (id !== requestIdRef.current) return;
        setResults([]);
      } finally {
        if (id === requestIdRef.current) setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!open) return null;

  const trimmed = query.trim();

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="bg-paper border-b border-line">
        <div className="container-site h-16 flex items-center gap-4">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="w-5 h-5 text-muted"
            aria-hidden
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="m17 17-3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product, SKU, or contaminant — 'PFAS', 'whole house', 'EA-WF-WH-016'"
            aria-label="Search"
            className="flex-1 h-10 bg-paper text-base text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="text-muted hover:text-ink transition-colors duration-fast text-sm"
          >
            Close
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-paper">
        <div className="container-site py-8">
          {trimmed.length < 2 ? (
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted mb-4">
                Popular searches
              </p>
              <ul className="flex flex-wrap gap-2">
                {POPULAR_QUERIES.map((q) => (
                  <li key={q.label}>
                    <Link
                      href={q.href}
                      onClick={onClose}
                      className="inline-flex items-center px-3 h-9 text-sm bg-mist hover:bg-brand-50 hover:text-brand rounded-sm border border-line hover:border-brand transition-colors duration-fast"
                    >
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : loading && results.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted">
              Searching…
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-base text-ink mb-2">
                No results for &ldquo;{trimmed}&rdquo;
              </p>
              <p className="text-sm text-muted">
                Try a contaminant (&ldquo;fluoride&rdquo;) or a housing size
                (&ldquo;10x2.5&rdquo;), or call us on{" "}
                {BUSINESS.phone.display}.
              </p>
            </div>
          ) : (
            <ul
              className="divide-y divide-line"
              role="listbox"
              aria-busy={loading}
            >
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={product.url}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3 group"
                  >
                    <div className="relative w-14 h-14 bg-mist flex-shrink-0 rounded-sm overflow-hidden">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-contain p-1"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink group-hover:text-brand transition-colors duration-fast truncate">
                        {shortTitle(product.title, 80)}
                      </p>
                      <p className="text-xs text-muted tabular">
                        {product.sku}
                      </p>
                    </div>
                    <Price amount={product.price} size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="bg-ink/40 absolute inset-0 -z-10"
      />
    </div>
  );
}
