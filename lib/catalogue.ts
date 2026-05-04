import type { Product, StockStatus } from "@/types/product";
import type { ProductState } from "./shopify/product-state";
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
 * Featured selection for the homepage. Hand-picked HANDLES (not SKUs) so the
 * curation survives SKU regeneration. The merchant edits product copy and
 * specs in `products.json`; we re-run the migration script to refresh the
 * fixture; handles are deterministic from titles, so they stay stable.
 *
 * Six featured products: the highest-impression hand-finished pieces across
 * the catalogue, chosen for category coverage rather than absolute clicks.
 */
const FEATURED_HANDLES = [
  "premium-three-stage-big-blue-whole-house-water-filter-system", // whole-house hero, hand-finished, 2,978 imp
  "5-stage-undersink-home-drinking-ro-water-filter-system-with-3-way-tap", // residential RO hero, $599.95
  "commercial-water-bubbler-filtered-stainless-steel-watermark-certified-square-des", // commercial flagship, $999.95
  "under-sink-water-filter-2-stage-sediment-carbon", // entry-level under-sink, $99.95
  "under-sink-water-filter-6-stage-reverse-osmosis-system", // hand-finished, 17,639 imp — top of GSC
  "shower-filter-15-stages-includes-extra-cartridge", // hand-finished, 4,132 imp + 28 clicks
];

export function getFeaturedProducts(): Product[] {
  // Preserve order of FEATURED_HANDLES so curation is intentional.
  return FEATURED_HANDLES
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

/**
 * Curated "most popular" picks per category, shown above the full PLP grid
 * on the category landing page. Hand-picked rather than computed because
 * (a) we don't have order data yet, and (b) on a ~200-SKU catalogue the
 * editorial pick beats the long-tail-noise of analytics-driven sorting.
 *
 * Keyed by HANDLE so the curation survives SKU regeneration. When order data
 * is wired up post-launch, this can be swapped for a Shopify Storefront query
 * against best-sellers — the consumer signature (Product[]) doesn't change.
 */
const POPULAR_BY_CATEGORY: Record<string, string[]> = {
  "water-filters": [
    "premium-three-stage-big-blue-whole-house-water-filter-system",
    "5-stage-undersink-home-drinking-ro-water-filter-system-with-3-way-tap",
    "under-sink-water-filter-6-stage-reverse-osmosis-system",
    "shower-filter-15-stages-includes-extra-cartridge",
  ],
  "drinking-bubblers": [
    "commercial-water-bubbler-filtered-stainless-steel-watermark-certified-square-des",
    "filtered-hot-cold-water-cooler-direct-connect",
  ],
  "water-pumps": [
    "ro-water-filter-24v-dc-diaphragm-pump-reverse-osmosis-pressure-booster-pump",
    "single-phase-submersible-clean-water-pump-370w-lift-10m",
  ],
  "chemical-dosing-tanks": [
    "chemical-dosing-tank-with-bunding-available-in-50l-100l-and-200l",
  ],
  bathroom: [
    "toilet-rimless-modern-watermark-ceramic-p-trap-commode-modern-2piece-toilet-wels",
    "115mm-square-tile-insert-100mm-waste-outlet-floor-drain-shower-grate",
  ],
};

export function getPopularForCategory(categorySlug: string): Product[] {
  const slugs = POPULAR_BY_CATEGORY[categorySlug] ?? [];
  return slugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
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
    "whole-house-filters": ["uv-sterilisers", "replacement-cartridges", "filter-fittings"],
    "under-sink-ro-systems": ["filter-taps", "replacement-cartridges"],
    "uv-sterilisers": ["whole-house-filters", "replacement-cartridges"],
    "shower-filters": ["replacement-cartridges"],
    "filter-taps": ["under-sink-ro-systems", "filter-fittings"],
    "filter-fittings": ["replacement-cartridges"],
    "commercial-bubblers": ["bubbler-parts"],
    "water-coolers": ["bubbler-parts"],
    "booster-pumps": ["pressure-tanks", "filter-fittings"],
    "pressure-tanks": ["booster-pumps", "filter-fittings"],
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

/**
 * Merge live Shopify state into a hardcoded Product. When `state` is null
 * (Shopify disabled, product missing, or fetch failed) the product is
 * returned unchanged — graceful degradation keeps the page rendering.
 *
 * Stock derivation matches the brief:
 *   - !availableForSale          → "out_of_stock"  (reliable, doesn't need inventory perm)
 *   - quantity 1–5               → "low_stock"
 *   - otherwise                  → "in_stock"
 *
 * `regularPrice` is preserved from the hardcoded record so the strikethrough
 * keeps working when Shopify discounts a product. `onSale` is recomputed
 * from the live price; if Shopify's price meets-or-exceeds `regularPrice`
 * (e.g. a price increase since the fixture was authored) it cleanly resolves
 * to `false` and no misleading sale badge appears.
 */
export function mergeProductState(
  product: Product,
  state: ProductState | null
): Product {
  if (!state) return product;

  const stockStatus: StockStatus = !state.available
    ? "out_of_stock"
    : state.inventoryQuantity !== null &&
      state.inventoryQuantity >= 1 &&
      state.inventoryQuantity <= 5
    ? "low_stock"
    : "in_stock";

  return {
    ...product,
    price: state.price,
    stockStatus,
    onSale: state.price < product.regularPrice,
  };
}

export function mergeProductStates(
  products: Product[],
  states: Map<string, ProductState>
): Product[] {
  return products.map((p) => mergeProductState(p, states.get(p.slug) ?? null));
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
