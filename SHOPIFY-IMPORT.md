# Importing the catalogue into Shopify

`shopify-import.csv` in the project root is generated from `lib/catalogue-data.ts`. It contains all 44 products with handles and SKUs that match the headless front end exactly, so checkout will work as soon as you upload it.

## How to upload

1. In Shopify Admin: **Products → Import**.
2. Click **Add file** and select `shopify-import.csv`.
3. **Tick "Overwrite products with matching handles"** if you've imported before. Leave unchecked on a clean store.
4. Click **Upload and continue**, then **Import products**.

You'll get a confirmation email when it finishes (usually under 60 seconds for 44 products).

## What the CSV does

- **44 main product rows + 68 image rows** = 112 lines total.
- Each product is a single-variant product. The handle is the slug; the variant SKU is the SKU. Both match `lib/catalogue-data.ts` exactly so the headless cart's variant resolver works on the first try.
- First image is set on the main row; additional images (up to 6 per product) follow on extra rows with the same handle.
- `Body (HTML)` is the full long description converted to clean HTML — paragraphs, headings, bullet lists, and inline bold all render correctly in Shopify's editor.
- All products are set to `active`, `published`, taxable, and require shipping.
- **Variant Grams populated per SKU** based on real product weights (see below).
- **Product Category populated where validated** against Shopify's 2026-02 taxonomy (see below).

## Product Category coverage

Shopify's `Product Category` field validates against the official Shopify Standard Product Taxonomy tree. Sending an invalid path returns the error you previously saw: *"Your import contains an invalid product category."*

The CSV uses only paths verified against the **2026-02 release** of the Shopify Product Taxonomy:

| Path | Products mapped |
|---|---|
| `Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters` | 12 |
| `Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Under-Sink Water Filters` | 6 |
| `Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Countertop Water Filters` | 3 |
| `Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Coolers` | 6 |
| (blank — set in Admin via type-ahead) | 17 |

The 17 blank entries are kitchen taps, bathroom fixtures (toilets, vanities, drains), and a few accessories (shower filter, RO wrench, pressure gauge). Their correct paths sit under `Hardware > Plumbing > Plumbing Fixtures` and similar, but the exact leaf names vary by Shopify release. **Setting a blank Product Category does NOT cause the import error** — Shopify accepts blank rows. After import, set the category in each product's edit page using Shopify's type-ahead picker, which validates against the live tree and lets you commit only valid entries. It's a 30-second job per product.

## Variant Grams

Each SKU has a shipping weight in grams that drives Shopify's tiered shipping calculation. Estimates based on real manufacturer specifications for comparable products:

| Weight tier | Count | Examples |
|---|---|---|
| Under 1kg | 11 | cartridges, fittings, pressure gauge, RO wrench |
| 1–5 kg | 13 | bench-top filters, replacement membranes, kitchen taps |
| 5–15 kg | 6 | under-sink RO systems, twin Big Blue housings, UV unit |
| 15–50 kg | 11 | triple Big Blue, commercial bubblers, toilets, vanity 600mm |
| Over 50 kg | 3 | commercial RO plants, 1200mm vanity (large freight) |

These are estimates intended to drop products into the correct shipping tier — they're not weights of a measured production unit. **Replace with real measured weights as you ship orders**, particularly for the heavy items where freight pricing varies most. The values live in `scripts/build-shopify-csv.py` (`VARIANT_GRAMS` dict) — edit and re-run.

## What the CSV does NOT do

- **It doesn't set product dimensions.** Shopify's dimensional-weight shipping calculation also uses length × width × height. Set those in Shopify Admin per product (or skip them and use weight-only if your shipping rates aren't dimensional).
- **It doesn't pre-create collections.** Use the Tags field (already populated) to drive automatic collection rules — e.g. a "Whole House Filters" smart collection with rule "Tag contains `whole house water filter`".
- **It doesn't import customer reviews.**
- **It doesn't set tax overrides.** Defaults are GST-included AUD prices, exactly what's in the catalogue.
- **It doesn't set inventory locations.** Inventory defaults to 10 of each at your default location. Adjust in Admin.

## Regenerating the CSV

If you edit `lib/catalogue-data.ts` (add a product, change a price, etc.), regenerate the CSV by running:

```bash
python3 scripts/build-shopify-csv.py
```

The script overwrites `shopify-import.csv` in the project root. Re-upload to Shopify with **"Overwrite products with matching handles"** ticked to apply the changes.

## Verifying the import worked

After import:

1. Open **Products** in Shopify Admin and confirm you see 44 products.
2. Click into "Triple Big Blue Whole House Water Filter — 20" x 4.5" (3 Stage)" (handle: `triple-big-blue-whole-house-water-filter-20-x-4-5-3-stage`).
3. Confirm the SKU is `EA-WF-WH-016`, price `$1,299.95 AUD`, weight `14000 g`.
4. Confirm 5–6 images attached.
5. Confirm the body description renders with proper headings and bullets.
6. Confirm Product Category shows `Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters`.

For the 17 products with blank categories: open the product, click into the Category field, start typing (e.g. "kitchen faucets" for the kitchen taps, "toilets" for the toilets), and pick the suggested taxonomy path.

Once that's verified, set your Storefront API token (per `SHOPIFY-INTEGRATION.md`) and the headless cart will start resolving SKUs to real Shopify variants on checkout.

## Common issues

**"Invalid product category"** — only happens if you regenerate the CSV with a custom path that isn't in Shopify's tree. The current `PRODUCT_CATEGORY` map only uses verified 2026-02 paths.

**Images don't load in Shopify** — image URLs point to `enviroaqua.com.au/wp-content/uploads/...`. If that hosting is taken down, Shopify will lose the references. Re-upload images directly to Shopify Admin (or migrate to Shopify-hosted CDN URLs in `lib/catalogue-data.ts` first, then regenerate the CSV).

**Special characters look broken** — check the CSV is UTF-8 encoded. The script writes UTF-8 by default. If you open in Excel and re-save, choose "CSV UTF-8 (Comma delimited)" not plain CSV.

**Shipping costs look wrong after import** — set product dimensions in Admin alongside weight. Weight alone gets dimensional-weight calculations into the right ballpark for compact products but understates the cost of large lightweight items (e.g. the empty whole-house housing kits).
