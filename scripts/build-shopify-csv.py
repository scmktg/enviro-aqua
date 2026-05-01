#!/usr/bin/env python3
"""
Generate a Shopify-import-ready CSV from lib/catalogue-data.ts.

Run from the project root:
    python3 scripts/build-shopify-csv.py

Output: shopify-import.csv in the project root.

Why this script:
  Shopify's product import expects a specific CSV format with case-sensitive
  headers, a "first row carries product metadata + first image, subsequent
  rows carry only handle + additional images" structure, and HTML in the
  Body field. We can't just hand-edit a spreadsheet — there are 44 products
  with up to 6 images each, and the slug/SKU pairing must match the site
  exactly so the headless cart can resolve variants.

Output columns match Shopify's 2026 product CSV template, case-sensitive.

Two important fields are populated from explicit per-SKU maps below:

  - PRODUCT_CATEGORY: maps each SKU to a path in Shopify's Standard
    Product Taxonomy (2026-02). Where no exact path exists in the
    taxonomy, we leave the field blank rather than guess — Shopify
    accepts that gracefully and you can set the category in Admin
    using the type-ahead UI which validates against the live tree.

  - VARIANT_GRAMS: an estimated shipping weight in grams per SKU,
    based on real manufacturer specifications for similar products.
    These drive Shopify's tiered shipping calculation, so getting them
    in the right ballpark matters more than getting them perfect.
    Update with measured weights as you have them.
"""

import re
import csv
import os
import sys
from html import escape

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(THIS_DIR)
CATALOGUE_PATH = os.path.join(PROJECT_ROOT, "lib", "catalogue-data.ts")
OUTPUT_PATH = os.path.join(PROJECT_ROOT, "shopify-import.csv")

# Shopify 2026 product CSV columns, in the exact order Shopify exports them.
# Headers are case-sensitive — do not change capitalisation.
SHOPIFY_COLUMNS = [
    "Handle",
    "Title",
    "Body (HTML)",
    "Vendor",
    "Product Category",
    "Type",
    "Tags",
    "Published",
    "Option1 Name",
    "Option1 Value",
    "Option2 Name",
    "Option2 Value",
    "Option3 Name",
    "Option3 Value",
    "Variant SKU",
    "Variant Grams",
    "Variant Inventory Tracker",
    "Variant Inventory Qty",
    "Variant Inventory Policy",
    "Variant Fulfillment Service",
    "Variant Price",
    "Variant Compare At Price",
    "Variant Requires Shipping",
    "Variant Taxable",
    "Variant Barcode",
    "Image Src",
    "Image Position",
    "Image Alt Text",
    "Gift Card",
    "SEO Title",
    "SEO Description",
    "Status",
]

VENDOR = "Enviro Aqua"

# Custom Shopify "Type" string (free text) — distinct from the standard
# taxonomy "Product Category" which is validated against Shopify's tree.
TYPE_BY_PRIMARY = {
    "water-filters": "Water Filter",
    "commercial-bubblers": "Commercial Drinking Bubbler",
    "kitchen-taps": "Kitchen Tap",
    "bathroom": "Bathroom Fixture",
}

# ---------------------------------------------------------------------------
# Per-SKU Shopify Standard Product Taxonomy paths.
# Verified against Shopify's 2026-02 taxonomy release. Where no exact match
# exists in the official tree, the value is empty string — Shopify accepts
# blank Product Category rows without error, and you can fill the field
# in Admin's type-ahead category picker which validates against the live tree.
#
# Validated paths used here (all confirmed in the 2026-02 release):
#   - Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters
#   - Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Countertop Water Filters
#   - Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Under-Sink Water Filters
#   - Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Coolers
# ---------------------------------------------------------------------------
PRODUCT_CATEGORY = {
    # Whole-house water filters: there's no whole-house-specific taxonomy
    # node, so use the parent "Water Filters" category.
    "EA-WF-WH-016": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",
    "EA-WF-WH-017": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",
    "EA-WF-WH-004": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",
    "EA-WF-WH-005": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",
    "EA-WF-WH-001": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",

    # Under-sink filters — taxonomy 2026-02 has a specific node.
    "EA-WF-US-002": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Under-Sink Water Filters",
    "EA-WF-US-001": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Under-Sink Water Filters",
    "EA-WF-US-003": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Under-Sink Water Filters",

    # Bench-top filters — taxonomy 2026-02 calls these "Countertop Water Filters".
    "EA-WF-BN-001": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Countertop Water Filters",
    "EA-WF-BN-002": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Countertop Water Filters",
    "EA-WF-BN-003": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Countertop Water Filters",

    # Reverse osmosis — under-sink RO units fit the "Under-Sink Water Filters" node.
    # Commercial RO plants don't have a precise taxonomy match; we use the parent.
    "EA-WF-RO-005": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Under-Sink Water Filters",
    "EA-WF-RO-007": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Under-Sink Water Filters",
    "EA-WF-RO-008": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters > Under-Sink Water Filters",
    "EA-WF-RO-010": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",
    "EA-WF-RO-001": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",

    # UV sterilisers — no UV-specific taxonomy; map to the parent water-filter node.
    "EA-WF-UV-010": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",
    "EA-WF-UV-002": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",

    # Shower filter — no shower-filter taxonomy node, leave blank.
    "EA-WF-SF-001": "",

    # Replacement cartridges & filter media — parent water-filters node is correct.
    "EA-WF-CT-003": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",
    "EA-WF-CT-001": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",
    "EA-WF-CT-002": "",  # RO wrench — a tool, not a filter; leave blank
    "EA-WF-CT-032": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Filters",

    # Pressure gauge / pressure switch — plumbing accessories. No exact
    # node, leave blank for Admin to assign.
    "EA-WF-FP-002": "",
    "EA-WF-TP-003": "",

    # Commercial bubblers & water coolers — Water Coolers node exists.
    "EA-CB-BB-001": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Coolers",
    "EA-CB-BB-002": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Coolers",
    "EA-CB-BB-003": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Coolers",
    "EA-CB-WC-002": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Coolers",
    "EA-CB-WC-001": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Coolers",
    "EA-CB-UC-001": "Home & Garden > Kitchen & Dining > Kitchen Appliances > Water Coolers",
    "EA-CB-BR-001": "",  # Replacement bubbler tap — leave blank

    # Kitchen taps — left blank because Shopify's tap-related taxonomy
    # paths sit under Hardware > Plumbing > Plumbing Fixtures, and we
    # haven't verified the exact leaf names against the live tree. Set
    # in Admin (type-ahead validates).
    "EA-KT-T3-001": "",
    "EA-KT-T3-002": "",
    "EA-KT-TD-001": "",
    "EA-KT-TD-002": "",
    "EA-KT-KM-001": "",
    "EA-KT-KM-002": "",

    # Bathroom — same reason; set in Admin.
    "EA-BA-TL-002": "",
    "EA-BA-TL-003": "",
    "EA-BA-BV-001": "",
    "EA-BA-BV-002": "",
    "EA-BA-SD-002": "",
    "EA-BA-TP2-001": "",
}


# ---------------------------------------------------------------------------
# Per-SKU shipping weight in grams.
# Estimates based on manufacturer specifications for comparable products
# in each category. Refine with measured weights as orders go out.
#
# Why these matter: Shopify's tiered shipping rates are calculated from
# weight (and dimensions) at checkout. A 0g default would drop every
# product into the lowest tier and undercharge the customer for shipping.
# ---------------------------------------------------------------------------
VARIANT_GRAMS = {
    # ---- Whole-house Big Blue systems ----
    # Triple Big Blue 20" x 4.5" with bracket + 3 cartridges + housings.
    "EA-WF-WH-016": 14000,
    # Deluxe stainless 3-stage Big Blue.
    "EA-WF-WH-017": 17000,
    # Twin-pack 20" x 4.5" replacement sediment cartridges.
    "EA-WF-WH-004": 1200,
    # Twin Big Blue 20" x 4.5" 2-stage.
    "EA-WF-WH-005": 10500,
    # 1-stage sediment 10" x 2.5" (slim-line whole-house).
    "EA-WF-WH-001": 1800,

    # ---- Under-sink filter systems ----
    # Standard 10" x 2.5" universal housing (just the housing).
    "EA-WF-US-002": 700,
    # Under-sink 2-stage sediment + carbon (housings + bracket + cartridges).
    "EA-WF-US-001": 3800,
    # Under-sink 3-stage sediment + carbon + alkaline.
    "EA-WF-US-003": 5200,

    # ---- Bench-top filters ----
    # 2-stage sediment + carbon bench-top.
    "EA-WF-BN-001": 3500,
    # 1-stage sediment.
    "EA-WF-BN-002": 2400,
    # 1-stage carbon.
    "EA-WF-BN-003": 2400,

    # ---- Reverse osmosis ----
    # 5-stage RO with 3-way tap + storage tank.
    "EA-WF-RO-005": 12000,
    # Under-sink RO 4-stage.
    "EA-WF-RO-007": 10500,
    # Under-sink RO 5-stage.
    "EA-WF-RO-008": 11500,
    # Commercial RO 500 LPH (large freight item).
    "EA-WF-RO-010": 95000,
    # Commercial RO desalination plant 1500 LPD (very large freight).
    "EA-WF-RO-001": 140000,

    # ---- UV sterilisers ----
    # Whole-house + UV combo system.
    "EA-WF-UV-010": 16000,
    # Standalone UV unit 25W.
    "EA-WF-UV-002": 4200,

    # ---- Shower filter ----
    # 15-stage shower filter.
    "EA-WF-SF-001": 550,

    # ---- Replacement cartridges & RO consumables ----
    # 75 GPD RO membrane twin pack.
    "EA-WF-CT-003": 800,
    # Inline UF ultrafiltration cartridge.
    "EA-WF-CT-001": 280,
    # RO wrench tool.
    "EA-WF-CT-002": 380,
    # 400 GPD RO membrane.
    "EA-WF-CT-032": 700,

    # ---- Fittings, parts, pumps ----
    # 1/4" pressure gauge.
    "EA-WF-FP-002": 220,
    # 24V high-pressure switch with quick-connects.
    "EA-WF-TP-003": 180,

    # ---- Commercial bubblers & water coolers ----
    # Square stainless filtered bubbler.
    "EA-CB-BB-001": 28000,
    # Round stainless cold filtered bubbler.
    "EA-CB-BB-002": 32000,
    # Rust-free filtered cold bubbler.
    "EA-CB-BB-003": 30000,
    # 3-stage hot/cold/ambient cooler with compressor.
    "EA-CB-WC-002": 36000,
    # Hot/cold direct-connect cooler.
    "EA-CB-WC-001": 34000,
    # Under-counter drinking water chiller.
    "EA-CB-UC-001": 28000,
    # Drinking fountain replacement chrome tap.
    "EA-CB-BR-001": 650,

    # ---- Kitchen taps ----
    # 3-way kitchen mixer for RO (gold).
    "EA-KT-T3-001": 2400,
    # Luxurious 3-way RO tap (matte black/brushed nickel).
    "EA-KT-T3-002": 2200,
    # Premium RO drinking faucet NSF.
    "EA-KT-TD-001": 850,
    # Double-handle RO water filter tap.
    "EA-KT-TD-002": 1100,
    # Pull-down kitchen mixer brushed nickel.
    "EA-KT-KM-001": 2600,
    # Spring-loaded kitchen mixer brushed nickel.
    "EA-KT-KM-002": 3400,

    # ---- Bathroom ----
    # In-wall concealed cistern toilet (cistern + bowl + frame).
    "EA-BA-TL-002": 32000,
    # 2-piece ceramic toilet.
    "EA-BA-TL-003": 42000,
    # 1200mm freestanding vanity with stone basin top — large freight.
    "EA-BA-BV-001": 78000,
    # 600mm freestanding vanity with ceramic basin top.
    "EA-BA-BV-002": 42000,
    # Tile insert floor drain.
    "EA-BA-SD-002": 950,
    # Wall-mounted bath spout & shower mixer chrome.
    "EA-BA-TP2-001": 2000,
}


def parse_catalogue(content: str):
    """Walk the TS file and extract one dict per product.

    Strategy: find each `sku:` position as a product anchor; the chunk
    from one sku to the next contains exactly one product's fields.
    Then pull each named field with a targeted regex.
    """
    sku_positions = [m.start() for m in re.finditer(r'sku:\s*"(EA-[A-Z0-9-]+)"', content)]
    if not sku_positions:
        sys.exit("No products found — confirm catalogue-data.ts path.")

    products = []
    for i, start in enumerate(sku_positions):
        end = sku_positions[i + 1] if i + 1 < len(sku_positions) else len(content)
        chunk_start = max(0, start - 200)
        chunk = content[chunk_start:end]

        def find_string(name: str) -> str | None:
            m = re.search(rf'{name}:\s*"((?:[^"\\]|\\.)*)"', chunk)
            return m.group(1) if m else None

        def find_number(name: str) -> float | None:
            m = re.search(rf"{name}:\s*([0-9]+(?:\.[0-9]+)?)", chunk)
            return float(m.group(1)) if m else None

        def find_bool(name: str) -> bool | None:
            m = re.search(rf"{name}:\s*(true|false)", chunk)
            return (m.group(1) == "true") if m else None

        def find_string_array(name: str) -> list[str]:
            m = re.search(rf"{name}:\s*\[([^\]]*)\]", chunk, re.DOTALL)
            if not m:
                return []
            inside = m.group(1)
            return re.findall(r'"((?:[^"\\]|\\.)*)"', inside)

        def find_long_description() -> str:
            m = re.search(r"longDescription:\s*`([^`]*)`", chunk, re.DOTALL)
            return m.group(1) if m else ""

        product = {
            "id": find_string("id"),
            "sku": find_string("sku"),
            "slug": find_string("slug"),
            "title": find_string("title"),
            "primary_category": find_string("primaryCategory"),
            "sub_category": find_string("subCategory"),
            "price": find_number("price"),
            "regular_price": find_number("regularPrice"),
            "on_sale": find_bool("onSale"),
            "stock_status": find_string("stockStatus"),
            "short_description": find_string("shortDescription"),
            "long_description": find_long_description(),
            "images": find_string_array("images"),
            "tags": find_string_array("tags"),
            "seo_title": find_string("seoTitle"),
            "seo_description": find_string("seoDescription"),
        }

        # Unescape escaped chars from TS source.
        for k, v in product.items():
            if isinstance(v, str):
                product[k] = (
                    v.replace('\\"', '"')
                     .replace("\\\\", "\\")
                     .replace("\\n", "\n")
                )

        if not product["sku"] or not product["slug"] or not product["title"]:
            continue
        products.append(product)

    return products


def long_description_to_html(text: str) -> str:
    """Convert the catalogue's markdown-ish long description into HTML
    that Shopify's rich-text editor will render properly."""
    if not text:
        return ""

    blocks = []
    lines = text.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue

        if line.startswith("• ") or line.startswith("- "):
            items = []
            while i < len(lines):
                l = lines[i].strip()
                if l.startswith("• "):
                    items.append(l[2:])
                    i += 1
                elif l.startswith("- "):
                    items.append(l[2:])
                    i += 1
                elif l == "":
                    i += 1
                    break
                else:
                    break
            html_items = "".join(f"<li>{render_inline(item)}</li>" for item in items)
            blocks.append(f"<ul>{html_items}</ul>")
            continue

        if line.startswith("**") and line.endswith("**") and "**" not in line[2:-2]:
            blocks.append(f"<h3>{escape(line[2:-2])}</h3>")
            i += 1
            continue

        blocks.append(f"<p>{render_inline(line)}</p>")
        i += 1

    return "".join(blocks)


def render_inline(text: str) -> str:
    parts = re.split(r"(\*\*[^*]+\*\*)", text)
    out = []
    for p in parts:
        if p.startswith("**") and p.endswith("**"):
            out.append(f"<strong>{escape(p[2:-2])}</strong>")
        else:
            out.append(escape(p))
    return "".join(out)


def to_shopify_rows(products):
    """Each product becomes 1 main row + (N-1) extra rows for additional images."""
    rows = []
    missing_weights = []
    for p in products:
        handle = p["slug"]
        title = p["title"]
        body_html = long_description_to_html(p["long_description"])
        vendor = VENDOR
        product_type = TYPE_BY_PRIMARY.get(p["primary_category"], "")
        product_category = PRODUCT_CATEGORY.get(p["sku"], "")
        tags = ", ".join(p["tags"])
        published = "TRUE"
        price = f"{p['price']:.2f}" if p["price"] is not None else ""
        compare_at = (
            f"{p['regular_price']:.2f}"
            if p.get("on_sale") and p.get("regular_price") and p["regular_price"] > p["price"]
            else ""
        )
        sku = p["sku"]

        grams = VARIANT_GRAMS.get(sku)
        if grams is None:
            missing_weights.append(sku)
            grams = 0

        images = p["images"] or []
        first_image = images[0] if images else ""
        seo_title = p.get("seo_title") or ""
        seo_desc = p.get("seo_description") or ""

        first_row = {
            "Handle": handle,
            "Title": title,
            "Body (HTML)": body_html,
            "Vendor": vendor,
            "Product Category": product_category,
            "Type": product_type,
            "Tags": tags,
            "Published": published,
            "Option1 Name": "Title",
            "Option1 Value": "Default Title",
            "Option2 Name": "",
            "Option2 Value": "",
            "Option3 Name": "",
            "Option3 Value": "",
            "Variant SKU": sku,
            "Variant Grams": str(grams),
            "Variant Inventory Tracker": "shopify",
            "Variant Inventory Qty": "10",
            "Variant Inventory Policy": "deny",
            "Variant Fulfillment Service": "manual",
            "Variant Price": price,
            "Variant Compare At Price": compare_at,
            "Variant Requires Shipping": "TRUE",
            "Variant Taxable": "TRUE",
            "Variant Barcode": "",
            "Image Src": first_image,
            "Image Position": "1" if first_image else "",
            "Image Alt Text": title if first_image else "",
            "Gift Card": "FALSE",
            "SEO Title": seo_title,
            "SEO Description": seo_desc,
            "Status": "active",
        }
        rows.append(first_row)

        for idx, img in enumerate(images[1:], start=2):
            rows.append({
                "Handle": handle,
                "Title": "",
                "Body (HTML)": "",
                "Vendor": "",
                "Product Category": "",
                "Type": "",
                "Tags": "",
                "Published": "",
                "Option1 Name": "",
                "Option1 Value": "",
                "Option2 Name": "",
                "Option2 Value": "",
                "Option3 Name": "",
                "Option3 Value": "",
                "Variant SKU": "",
                "Variant Grams": "",
                "Variant Inventory Tracker": "",
                "Variant Inventory Qty": "",
                "Variant Inventory Policy": "",
                "Variant Fulfillment Service": "",
                "Variant Price": "",
                "Variant Compare At Price": "",
                "Variant Requires Shipping": "",
                "Variant Taxable": "",
                "Variant Barcode": "",
                "Image Src": img,
                "Image Position": str(idx),
                "Image Alt Text": title,
                "Gift Card": "",
                "SEO Title": "",
                "SEO Description": "",
                "Status": "",
            })

    return rows, missing_weights


def main():
    if not os.path.isfile(CATALOGUE_PATH):
        sys.exit(f"Cannot find catalogue at {CATALOGUE_PATH}")

    with open(CATALOGUE_PATH, encoding="utf-8") as f:
        content = f.read()

    products = parse_catalogue(content)
    print(f"Parsed {len(products)} products from catalogue.")

    rows, missing_weights = to_shopify_rows(products)
    print(f"Building {len(rows)} CSV rows ({len(products)} products + extra image rows).")

    if missing_weights:
        print()
        print("WARNING: weight not specified for these SKUs (defaulted to 0):")
        for sku in missing_weights:
            print(f"  - {sku}")
        print("Add an entry to VARIANT_GRAMS in this script to fix.")

    # Surface category coverage stats.
    blank_categories = [p for p in products if not PRODUCT_CATEGORY.get(p["sku"])]
    print()
    print(f"Product Category coverage: {len(products) - len(blank_categories)}/{len(products)} mapped to taxonomy")
    if blank_categories:
        print("Products with blank category (set in Shopify Admin via type-ahead):")
        for p in blank_categories:
            print(f"  - {p['sku']}: {p['title'][:55]}")

    with open(OUTPUT_PATH, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=SHOPIFY_COLUMNS,
            quoting=csv.QUOTE_MINIMAL,
            lineterminator="\n",
        )
        writer.writeheader()
        for row in rows:
            writer.writerow(row)

    size_kb = os.path.getsize(OUTPUT_PATH) / 1024
    print()
    print(f"Wrote {OUTPUT_PATH} ({size_kb:.1f} KB)")
    print()
    print("Next: in Shopify Admin → Products → Import → upload this file.")
    print("Tick 'Overwrite products with matching handles' if you're re-importing.")


if __name__ == "__main__":
    main()
