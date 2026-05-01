import type { Product } from "@/types/product";
import { PRODUCTS } from "./catalogue-data";

/**
 * Single source of truth for product reads. When the Shopify Storefront
 * integration is enabled, replace these with `client.product.fetch()` calls
 * (see `lib/shopify/client.ts`). The return shapes do not change.
 *
 * All functions are intentionally synchronous over the in-memory fixture so
 * they're cheap to call repeatedly inside Server Components — the Shopify
 * versions will return promises, and this file is the only thing that needs
 * to be updated to `async` at that point.
 */

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.primaryCategory === category);
}

export function getProductsBySubCategory(
  category: string,
  subCategory: string
): Product[] {
  return PRODUCTS.filter(
    (p) => p.primaryCategory === category && p.subCategory === subCategory
  );
}

/**
 * Featured selection for the homepage. Hand-picked SKUs rather than a
 * sort-by-popularity heuristic — the homepage is a curated landing page,
 * not a top-sellers list.
 */
const FEATURED_SKUS = [
  "EA-WF-WH-016", // Triple Big Blue Whole House — flagship whole-house, $1,299.95
  "EA-WF-RO-005", // 5-Stage RO Under Sink with 3-Way Tap — residential RO hero, $599.95
  "EA-CB-BB-001", // Square WaterMark Bubbler — commercial flagship, $999.95
  "EA-WF-US-001", // Under Sink 2-Stage — entry-level under-sink, $99.95
  "EA-WF-BN-001", // Bench Top 2-Stage — rental-friendly hero, $69.95
  "EA-CB-WC-001", // Hot/Cold Water Cooler — office hero, $499.95
];

export function getFeaturedProducts(): Product[] {
  // Preserve order of FEATURED_SKUS so curation is intentional.
  return FEATURED_SKUS
    .map((sku) => PRODUCTS.find((p) => p.sku === sku))
    .filter((p): p is Product => Boolean(p));
}

/**
 * Curated "most popular" picks per category, shown above the full PLP grid
 * on the category landing page. Hand-picked rather than computed because
 * (a) we don't have order data yet, and (b) on a 100-SKU catalogue the
 * editorial pick beats the long-tail-noise of analytics-driven sorting.
 *
 * When the order data is wired up post-launch, this can be swapped for a
 * Shopify Storefront query against best-sellers — the consumer signature
 * (Product[]) doesn't change.
 */
const POPULAR_BY_CATEGORY: Record<string, string[]> = {
  "water-filters": [
    "EA-WF-WH-016", // Triple Big Blue Whole House
    "EA-WF-RO-005", // 5-Stage RO Under Sink with 3-Way Tap
    "EA-WF-US-001", // Under Sink 2-Stage
    "EA-WF-BN-001", // Bench Top 2-Stage
  ],
  "commercial-bubblers": [
    "EA-CB-BB-001",
    "EA-CB-WC-001",
  ],
  "kitchen-taps": [],
  bathroom: [],
};

export function getPopularForCategory(categorySlug: string): Product[] {
  const skus = POPULAR_BY_CATEGORY[categorySlug] ?? [];
  return skus
    .map((sku) => PRODUCTS.find((p) => p.sku === sku))
    .filter((p): p is Product => Boolean(p));
}

/**
 * Cross-sell logic for the PDP. Rule (in order):
 *  1. If the product has a `kitHint` in copy, surface its sub-category siblings.
 *  2. Match by sub-category first.
 *  3. Else fallback to primary category, excluding the product itself.
 *  4. Always cap to 4 items.
 *
 * The intent: when someone is buying a whole-house system, suggest cartridges
 * and a UV add-on — not bathroom fixtures.
 */
export function getCrossSell(product: Product): Product[] {
  const COMPLEMENTARY: Record<string, string[]> = {
    "reverse-osmosis": ["dedicated-ro-taps", "ro-3way-taps", "replacement-cartridges"],
    "whole-house": ["uv-sterilisation", "replacement-cartridges", "fittings-parts"],
    "under-sink": ["dedicated-ro-taps", "replacement-cartridges"],
    "bench-top": ["replacement-cartridges", "fittings-parts"],
    "filtered-bubblers": ["bubbler-parts"],
    "water-coolers": ["bubbler-parts"],
  };

  const targets = COMPLEMENTARY[product.subCategory] ?? [];
  const seen = new Set<string>([product.id]);
  const picks: Product[] = [];

  // Pull from complementary sub-categories first.
  for (const sub of targets) {
    for (const p of PRODUCTS) {
      if (p.subCategory === sub && !seen.has(p.id)) {
        picks.push(p);
        seen.add(p.id);
        if (picks.length >= 4) return picks;
      }
    }
  }

  // Fill remaining with same sub-category siblings.
  for (const p of PRODUCTS) {
    if (p.subCategory === product.subCategory && !seen.has(p.id)) {
      picks.push(p);
      seen.add(p.id);
      if (picks.length >= 4) return picks;
    }
  }

  return picks;
}

/**
 * Returns unique facet values across a set of products — used to power the
 * filter rail. Only returns facets that have more than one distinct value
 * across the set, since a single-value facet has no filtering utility.
 */
export type { FacetSummary } from "@/types/facet";
import type { FacetSummary } from "@/types/facet";

export function summariseFacets(products: Product[]): FacetSummary[] {
  const config: { key: keyof typeof FACET_LABELS; label: string }[] = [
    { key: "technology", label: FACET_LABELS.technology },
    { key: "removes", label: FACET_LABELS.removes },
    { key: "application", label: FACET_LABELS.application },
    { key: "housing_size", label: FACET_LABELS.housing_size },
    { key: "stages", label: FACET_LABELS.stages },
    { key: "price_band", label: FACET_LABELS.price_band },
  ];

  const summaries: FacetSummary[] = [];

  for (const { key, label } of config) {
    const counts = new Map<string, number>();
    for (const p of products) {
      const raw = p.facets[key];
      if (raw === undefined || raw === null) continue;
      const values = Array.isArray(raw) ? raw : [String(raw)];
      for (const v of values) {
        counts.set(v, (counts.get(v) ?? 0) + 1);
      }
    }
    if (counts.size <= 1) continue; // No filtering value if all products share it.
    summaries.push({
      key,
      label,
      values: Array.from(counts.entries())
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count),
    });
  }

  return summaries;
}

const FACET_LABELS = {
  technology: "Filter Type",
  removes: "Reduces",
  application: "Application",
  housing_size: "Housing Size",
  stages: "Stages",
  price_band: "Price",
} as const;

/**
 * Filter products by an active set of facet selections.
 * Multiple values within a facet are OR; across facets is AND.
 */
export function filterProducts(
  products: Product[],
  active: Record<string, string[]>
): Product[] {
  const activeKeys = Object.keys(active).filter((k) => active[k]?.length);
  if (activeKeys.length === 0) return products;

  return products.filter((p) => {
    return activeKeys.every((key) => {
      const selected = active[key]!;
      const raw = p.facets[key as keyof typeof p.facets];
      if (raw === undefined || raw === null) return false;
      const values = Array.isArray(raw) ? raw : [String(raw)];
      return values.some((v) => selected.includes(v));
    });
  });
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      // We don't have a created_at field; use id as a coarse proxy where
      // newer SKUs (BUNDLE-008 > 0001) sort later. Stable enough for fixture.
      return copy.sort((a, b) => b.id.localeCompare(a.id));
    case "featured":
    default:
      return copy;
  }
}
