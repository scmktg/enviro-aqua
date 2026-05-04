# Migration Task: Replace 44-Product Fixture with 191-Product Catalogue

You are migrating the Enviro Aqua headless storefront from a 44-product fixture (`lib/catalogue-data.ts`) to a 191-product canonical catalogue (`products.json`, attached). This is a structural migration that touches the data layer, category routing, and Shopify CSV generation. The front-end components must keep working without modification.

## Read these first, in order

1. `types/product.ts` — the `Product` type that everything consumes
2. `types/category.ts` — `Category` and `SubCategory` types
3. `lib/catalogue-data.ts` — the current 44-product fixture (will be replaced)
4. `lib/categories.ts` — the current category structure (needs restructuring)
5. `lib/catalogue.ts` — read APIs over the fixture (read-only paths must keep working)
6. `scripts/build-shopify-csv.py` — Shopify import generator (will need updating)
7. `products.json` — the new 191-product canonical catalogue (provided)

## What the new catalogue contains

`products.json` is an object with three top-level keys: `meta`, `collections`, and `products`. The `products` array has 191 entries. Each product has this shape (relevant fields only — full schema is in the file):

```jsonc
{
  "handle": "uv-water-filter-ultraviolet-sterilisation-2700lph-55w-220v-240v",
  "old_wp_id": 4135,
  "sku": null,                  // many products have null SKUs — see SKU generation below
  "title": "UV Water Filter | Ultraviolet Sterilisation | 2700LPH | 55W | 220V - 240V",
  "collections": ["water-filters", "uv-sterilisers"],
  "main_collection": "water-filters",
  "sub_collection": "uv-sterilisers",
  "product_type": "uv_steriliser",
  "tags": [],
  "vendor": "Enviro Aqua",
  "status": "active",
  "in_stock": true,
  "stock_qty": null,
  "price": { "regular": 385.0, "sale": null, "currency": "AUD" },
  "dimensions_cm": { "length": null, "width": null, "height": null },
  "weight_kg": null,
  "short_description": "55W UV water steriliser ...",
  "description": "## How UV sterilisation works\n\n...",   // markdown with H2/H3 + bullets + bold
  "meta_title": "UV Steriliser 55W Philips, 2700 L/h | Enviro Aqua",
  "meta_description": "55W UV steriliser with Philips lamp ...",
  "specifications": { /* product-type-specific spec object — see below */ },
  "specs_status": "hand_finished",   // one of: hand_finished | verified_high_confidence | extracted_partial | needs_review | needs_manufacturer_data
  "images": ["https://enviroaqua.com.au/wp-content/uploads/..."],
  "featured_image": "https://...",
  "historical_performance": { "clicks": 8, "impressions": 5557, "avg_position": 63.4 },
  "migration_notes": { "hand_finished": true, "duplicate_consolidation_needed": false, ... }
}
```

## Category structure changes (critical)

The current repo has 4 top-level categories: `water-filters`, `commercial-bubblers`, `kitchen-taps`, `bathroom`.

The new catalogue has 5 top-level categories. **You must restructure `lib/categories.ts` and the URL routing accordingly.**

| New top-level | Status | Notes |
|---|---|---|
| `water-filters` | ✅ Exists, needs sub-category renames | 119 products |
| `drinking-bubblers` | 🔄 Rename from `commercial-bubblers` | 9 products |
| `water-pumps` | 🆕 NEW top-level category | 19 products |
| `chemical-dosing-tanks` | 🆕 NEW top-level category | 1 product |
| `bathroom` | ✅ Exists, needs sub-category additions | 43 products (now includes `kitchen-taps` as sub) |
| ~~`commercial-bubblers`~~ | ❌ Renamed | → `drinking-bubblers` |
| ~~`kitchen-taps`~~ | ❌ Demoted | Now a sub-category under `bathroom`, plus `filter-taps` under `water-filters` |

### Sub-category mappings

Use these EXACT slugs (do not change them — they're in `products.json` and used by URLs):

**water-filters/**
- `whole-house-filters` (was `whole-house`)
- `under-sink-ro-systems` (was `under-sink` and `reverse-osmosis` — these are now merged because RO is always under-sink in the new catalogue)
- `uv-sterilisers` (was `uv-sterilisation`)
- `shower-filters` (unchanged)
- `replacement-cartridges` (unchanged)
- `filter-taps` 🆕 (RO drinking taps & 3-way mixers — replaces some of old `kitchen-taps`)
- `filter-fittings` (was `fittings-parts`)

**drinking-bubblers/**
- `commercial-bubblers` (was `filtered-bubblers`)
- `water-coolers` (unchanged)
- `bubbler-parts` (unchanged)

**water-pumps/** 🆕
- `12v-caravan-pumps`
- `booster-pumps`
- `pressure-tanks`

**chemical-dosing-tanks/** 🆕
- (no sub-categories — single-product category, treat as flat)

**bathroom/**
- `toilets` (unchanged)
- `bathroom-taps` (unchanged)
- `kitchen-taps` 🆕 (plain kitchen mixers without filter — was top-level)
- `vanities-and-basins` (was `basins-vanities`)
- `showers-and-fixtures` (was `showers-drains`)
- `bathroom-accessories` 🆕

### Bench-top filters

The new catalogue does NOT have a `bench-top` sub-category. Bench-top filters are now classified under `under-sink-ro-systems`. **Do not preserve the old `bench-top` sub-category.** If you find any code references to it, remove them.

## Implementation steps

Do these in order. After each step, verify by running `npm run type-check && npm run build`. Do not move on if either fails.

### Step 1 — Generate the new `lib/catalogue-data.ts`

Write a one-shot Node script (`scripts/migrate-catalogue.ts`, or `.js`) that:

1. Reads `products.json` from the project root
2. Maps each product to the existing `Product` type (`types/product.ts`)
3. Writes `lib/catalogue-data.ts` with the full 191-product `PRODUCTS` array

**Mapping rules:**

| `Product` field | Source from products.json | Fallback |
|---|---|---|
| `id` | `String(old_wp_id)` | required |
| `sku` | `sku` if not null, else `derive_sku(handle, old_wp_id)` (see below) | required |
| `slug` | `handle` | required |
| `title` | `title` | required |
| `primaryCategory` | `main_collection` | required |
| `subCategory` | `sub_collection` if not null, else first item in `collections` after main | required, default to main_collection if no sub |
| `categoryPath` | derived: `[CATEGORY_TITLES[main_collection], CATEGORY_TITLES[sub_collection]]` | both must be human-readable |
| `price` | `price.regular ?? 0` | use 0 for products with null price; mark them as `out_of_stock` |
| `regularPrice` | `price.regular ?? 0` | same |
| `onSale` | `price.sale != null && price.sale < price.regular` | false |
| `stockStatus` | `"out_of_stock"` if `!in_stock` OR price is null/0; else `"in_stock"` | |
| `shortDescription` | `short_description` (truncated to 200 chars if longer) | required |
| `longDescription` | `description` (markdown — keep as-is, the `LongDescription` component already parses it) | required |
| `facets` | derive from `specifications` — see below | `{}` |
| `images` | `images` array | `[]` |
| `tags` | `tags` array, deduplicated | `[]` |
| `certifications` | derive from `specifications.certifications` string — see below | `[]` |
| `kitHint` | `null` for now (not present in new data) | `null` |
| `seoTitle` | `meta_title` | required |
| `seoDescription` | `meta_description` | required |

**SKU generation (for products with null SKU):**
```ts
function deriveSku(handle: string, wpId: number): string {
  // Use main_collection prefix + WP_ID for traceability
  const prefix = mainCollection === 'water-filters' ? 'EA-WF'
              : mainCollection === 'drinking-bubblers' ? 'EA-DB'
              : mainCollection === 'water-pumps' ? 'EA-WP'
              : mainCollection === 'chemical-dosing-tanks' ? 'EA-CT'
              : mainCollection === 'bathroom' ? 'EA-BA'
              : 'EA-XX';
  return `${prefix}-${wpId}`;
}
```

**Facets derivation (from `specifications` object):**

The new `specifications` is product-type-specific. Map relevant fields:
- `specifications.filtration_stages` (e.g. "3-Stage") → `facets.stages` (parse leading digit)
- `specifications.housing_size` (e.g. `'10" x 2.5"'`) → `facets.housing_size`
- `specifications.micron_rating` → `facets.micron`
- `specifications.max_flow_lph` → `facets.flow_rate` (format as `"<n> LPH"`)
- `specifications.filter_media` (string, comma-separated) → `facets.technology` (split on `,` and `+`, trim)
- `specifications.reduces` → `facets.removes` (split on `,`, trim, lowercase)
- Derive `facets.application` from product type:
  - `bubbler`, `water_cooler` → `["commercial"]`
  - if title contains "Bench Top" or "rental" → `["rental friendly"]`
  - Otherwise omit
- `facets.price_band` derived from price:
  - < $30 → `"Under $30"`
  - $30–100 → `"$30 – $100"`
  - $100–300 → `"$100 – $300"`
  - $300–1000 → `"$300 – $1,000"`
  - > $1000 → `"$1,000+"`

**Certifications derivation:**

The `specifications.certifications` field is a comma-separated string like `"WaterMark, WELS"` or `"WELS, AS/NZS 3497"` or null.

Parse it like this:
```ts
function parseCerts(raw: string | null | undefined): Certification[] {
  if (!raw) return [];
  const valid: Certification[] = ["WaterMark", "WELS", "NSF", "AS/NZS 4020", "AS/NZS 3497"];
  return raw.split(",")
    .map(s => s.trim())
    .filter((s): s is Certification => valid.includes(s as Certification));
}
```

### Step 2 — Update `lib/categories.ts`

Rewrite the file from scratch. Use the same `Category` and `SubCategory` types — do NOT change `types/category.ts`.

Critical requirements:
- Five top-level categories in the order listed above
- Each sub-category needs a real `intro`, `heading`, and `decisionLine` (for the DecisionMatrix component). Write them in the same voice as the existing copy in `lib/categories.ts` — short, plumber-grade, no marketing fluff.
- Each top-level needs a `navCta` object pointing to a sensible destination
- Update `PrimaryCategory` type in `types/product.ts` to: `"water-filters" | "drinking-bubblers" | "water-pumps" | "chemical-dosing-tanks" | "bathroom"`

### Step 3 — Update routing references

Find and update:
- `app/commercial-bubblers/page.tsx` → rename folder to `app/drinking-bubblers/page.tsx`, update all internal links from `/shop/commercial-bubblers` to `/shop/drinking-bubblers` and from `/commercial-bubblers` to `/drinking-bubblers`
- `app/sitemap.ts` — update `CATEGORY_PRIORITY` map to include the new categories, drop the old slugs
- `next.config.mjs` — add a permanent redirect from `/commercial-bubblers` to `/drinking-bubblers` (the old URL has SEO equity from existing customers and links)
- `components/sections/Footer.tsx` — update the "Shop" column links
- `components/sections/HomeBubblerSpotlight.tsx` — verify featured slugs still match (3 commercial bubblers should still exist with the same handles in products.json — confirm by handle match, not by reading slug constants)
- `components/sections/HomeFeaturedProducts.tsx` — verify featured SKUs. The current `FEATURED_SKUS` list in `lib/catalogue.ts` references SKUs like `EA-WF-WH-016` that won't exist. **Replace with handle-based lookup** instead of SKU-based.

### Step 4 — Hand-finished products preservation

Twenty products in `products.json` have `migration_notes.hand_finished: true`. These have substantially better long descriptions, full specs, and conversion-focused copy. Preserve their `description` field exactly as-is during migration — do not truncate, summarise, or modify.

### Step 5 — Update `lib/catalogue.ts` getFeaturedProducts and getPopularForCategory

Replace SKU-based featured/popular lists with HANDLE-based ones. New handles:

```ts
const FEATURED_HANDLES = [
  "premium-three-stage-big-blue-whole-house-water-filter-system",
  "5-stage-undersink-home-drinking-ro-water-filter-system-with-3-way-tap",
  "commercial-water-bubbler-filtered-stainless-steel-watermark-certified-square-des",
  "under-sink-water-filter-2-stage-sediment-carbon",
  // Add 2 more — pick from products with hand_finished=true and good GSC traffic
];
```

After loading the catalogue, verify each handle exists. If any don't match, update them — handle generation in products.json is deterministic from title.

Update `POPULAR_BY_CATEGORY` similarly to use handles, not SKUs, and reflect the new category slugs.

### Step 6 — Update `lib/categories.ts` `PrimaryCategory` references

The `categories.ts` file currently types its `slug` field as `PrimaryCategory`. This is fine, just make sure the union in `types/product.ts` is updated FIRST so the type-check passes.

### Step 7 — Shopify CSV generator

Update `scripts/build-shopify-csv.py`:
1. Read products from the regenerated `lib/catalogue-data.ts` (existing parsing logic should work since the shape is unchanged)
2. Update `TYPE_BY_PRIMARY` to include the new top-level categories:
   ```python
   TYPE_BY_PRIMARY = {
       "water-filters": "Water Filter",
       "drinking-bubblers": "Drinking Bubbler",
       "water-pumps": "Water Pump",
       "chemical-dosing-tanks": "Chemical Dosing Tank",
       "bathroom": "Bathroom Fixture",
   }
   ```
3. Update `PRODUCT_CATEGORY` map: existing 44-product entries remain valid where the SKU still exists. For the new ~150 SKUs, set them all to empty string `""` — Shopify accepts blank category and the user can set them in Admin via type-ahead. **Do not invent taxonomy paths.** Add a comment explaining this.
4. Update `VARIANT_GRAMS` similarly: keep existing 44 entries, add a comment block for the remaining 147 saying "weight not yet measured — defaults to 0g, update as products are weighed." Do NOT guess weights for the new products — guessing them would silently undercharge shipping.

### Step 8 — Verification checklist

After all changes, verify ALL of these pass:

```bash
npm run type-check    # No type errors
npm run build         # Builds clean
```

Then manually verify by running `npm run dev` and visiting:
- `/` — homepage loads, no console errors
- `/shop` — all 5 category cards render
- `/shop/water-filters` — PLP shows ~119 products
- `/shop/drinking-bubblers` — PLP shows 9 products (was `/shop/commercial-bubblers`, now redirected)
- `/shop/water-pumps` — NEW page, shows 19 products
- `/shop/water-pumps/12v-caravan-pumps` — sub-category PLP works
- `/shop/bathroom/kitchen-taps` — NEW sub-page
- `/product/uv-water-filter-ultraviolet-sterilisation-2700lph-55w-220v-240v` — PDP renders with full specs
- `/product/3-way-pull-down-spray-tap-kitchen-mixer-in-black-chrome-and-nickel` — PDP shows hand-finished long description
- `/sitemap.xml` — includes all 191 product URLs + 5 category URLs + 19 sub-category URLs

## What to NOT change

- `types/product.ts` `Product` interface (only the `PrimaryCategory` union)
- `types/cart.ts`
- `types/category.ts`
- `types/facet.ts`
- Any component in `components/` — they all consume the `Product` type via the existing fields
- The Shopify integration files in `lib/shopify/`
- The cart store in `lib/stores/cart-store.ts`
- The blog content in `lib/blog/`
- The certifications enum in `types/product.ts`

## Edge cases to handle

1. **Duplicate handles in products.json**: 4 products are flagged with `migration_notes.duplicate_consolidation_needed: true`. Two pairs share base handles, but the file has already disambiguated them with WP_ID suffixes. Treat as separate products. Do not consolidate.

2. **Products with `unusually_long_description: true`**: Three products have descriptions over 5,000 chars. The `LongDescription` component handles them fine — pass through unchanged.

3. **Products missing prices** (14 of them): These are not yet priced. Mark `stockStatus: "out_of_stock"` and set `price: 0`, `regularPrice: 0`. The PDP buy-box will show "Out of stock — call for ETA" which is the correct UX for these.

4. **Bathroom Package products** (12 SKUs starting with "Complete Bathroom Package"): These are bundles with no real specs — their `specifications` object is mostly nulls. Fine — they get a price band facet, nothing else. The PDP will render correctly.

5. **Products with `specs_status: "needs_manufacturer_data"`** (77 products): These have minimal specs. The `SpecsTable` component handles missing fields gracefully (it only renders rows where data exists). Don't add placeholder data — leaving specs empty is the honest UX.

## Output

When done, post a summary in this format:

```
Migration complete.

Products migrated: 191 (was 44)
Top-level categories: 5 (was 4)
Sub-categories: 19 (was 17)
Hand-finished long descriptions preserved: 20

Type-check: PASS
Build: PASS

Files changed:
- types/product.ts (PrimaryCategory union extended)
- lib/catalogue-data.ts (regenerated, 191 products)
- lib/categories.ts (rewritten, 5 categories)
- lib/catalogue.ts (FEATURED_HANDLES + POPULAR_BY_CATEGORY updated)
- app/commercial-bubblers/ → app/drinking-bubblers/ (renamed)
- app/sitemap.ts (priority map updated)
- next.config.mjs (redirect added)
- components/sections/Footer.tsx (links updated)
- scripts/build-shopify-csv.py (new categories + null-safe weights)

Files added:
- scripts/migrate-catalogue.ts (one-shot migration script — kept for re-running if products.json updates)
- (any others)

Manual follow-ups for the merchant:
- 14 products are missing prices and have been marked out-of-stock. Set prices in Shopify Admin and re-import.
- 147 of 191 products have placeholder shipping weight (0g). Measure and update VARIANT_GRAMS in scripts/build-shopify-csv.py as products go through dispatch.
- 161 products have no certifications. Verify and update specifications.certifications in products.json where applicable.
```

## When in doubt

- **Schema mismatch**: If a field in `products.json` doesn't fit cleanly into the existing `Product` type, prefer adding it to `facets` (which is `Record<string, unknown>`-friendly) over modifying the type. The exception is the `PrimaryCategory` union, which MUST be updated.
- **Routing conflicts**: If two categories try to claim the same URL slug, the new catalogue's slug wins (it's the source of truth).
- **Description rendering**: The `LongDescription` component supports `## Heading`, `### Subheading`, `- bullet`, and `**bold**`. The new descriptions use these. If any descriptions render oddly on PDPs, do NOT modify the descriptions — fix the `LongDescription` parser instead.
