# Setting up Shipping Zones & Rates in Shopify

Step-by-step guide to recreate the rate structure documented on `/shipping` inside Shopify's Settings → Shipping and delivery.

---

## Background — what Shopify supports natively

Your `/shipping` page advertises shipping by **size tier** (Small / Medium / Large / Extra Large). Shopify's native shipping rates don't have a "size tier" concept — Shopify offers three rate types:

- **Flat rate** — same price regardless of cart contents
- **Price-based** — different price depending on cart subtotal
- **Weight-based** — different price depending on cart weight (this is what you want)

Since the CSV you imported has realistic weights per SKU, the cleanest fix is to **map your size tiers to weight ranges**:

| Size tier | Weight range | Standard | Express |
|---|---|---|---|
| Small | 0 – 2 kg | $10.95 | $14.95 |
| Medium | 2 – 8 kg | $14.95 | $18.95 |
| Large | 8 – 25 kg | $18.95 | $23.95 |
| Extra Large | 25 kg+ | $23.95 | $31.95 |

These weight thresholds match the natural breakpoints in your catalogue:
- Cartridges, fittings, taps → Small
- Bench-top filters, kitchen mixers, RO membranes → Medium
- Whole-house systems, under-sink RO with tank → Large
- Commercial bubblers, toilets, vanities, commercial RO plants → Extra Large

You can refine the bands later. For launch, this matches your published rate card without changing customer pricing.

---

## Prerequisites

Before starting, confirm:

- **Your warehouse location is set.** Settings → Locations should show `6/45 Amsterdam Cct, Wyong NSW 2259` as the primary fulfilment location. If not, add it now and tick "Fulfil online orders from this location".
- **Products have weights.** The CSV you imported populated `Variant Grams` for every product. If you re-imported without that column you'll need to fix it (Products → Bulk edit → enable Weight column → fill in).
- **Default package weight is 0.** Settings → Shipping and delivery → scroll to **Packages** → ensure default custom package weight is `0g`. If it's anything else, Shopify adds it to every product weight, which throws off your tier boundaries.

---

## Step 1 — Open Shipping settings

1. From Shopify Admin, go to **Settings** (gear icon, bottom left).
2. Click **Shipping and delivery** in the left sidebar.

You'll see the **General shipping rates** profile (also called "General profile") — this is the one that applies to all your products by default. We'll add zones and rates to this profile.

---

## Step 2 — Set up the Domestic Australia zone

You probably already have a default Australia zone. Verify or create:

1. In the General profile, find the **Shipping to** section.
2. If "Domestic" or "Australia" already exists, click **Manage rates**.
3. If not, click **Create zone** → name it `Australia` → tick **Australia** in the country list → **Done**.

Inside the Australia zone, **delete any existing rates first** so you start with a clean slate. Click the `…` menu next to each old rate → Remove rate.

---

## Step 3 — Add Standard shipping rates (4 weight tiers)

Inside the Australia zone, click **Add rate**. Repeat the following four times to create all four standard tiers.

### Standard – Small Items ($10.95, 0–2kg)

1. Click **Add rate** → **Use a custom rate**.
2. Set **Rate name** to: `Standard delivery (Small)`
3. Set **Price** to: `10.95`
4. Click **Add conditions** → **Based on item weight**.
5. Set **Minimum weight** to `0 kg` and **Maximum weight** to `2 kg`.
6. (Optional but recommended) Set **Transit time** → choose `Custom` → enter `2-5 business days`.
7. Click **Done**.

### Standard – Medium Items ($14.95, 2–8kg)

1. **Add rate** → **Use a custom rate**.
2. **Rate name**: `Standard delivery (Medium)`
3. **Price**: `14.95`
4. **Add conditions** → **Based on item weight** → **Minimum** `2 kg`, **Maximum** `8 kg`.
5. **Transit time**: `2-5 business days`.
6. **Done**.

### Standard – Large Items ($18.95, 8–25kg)

1. **Add rate** → **Use a custom rate**.
2. **Rate name**: `Standard delivery (Large)`
3. **Price**: `18.95`
4. **Add conditions** → **Based on item weight** → **Minimum** `8 kg`, **Maximum** `25 kg`.
5. **Transit time**: `2-5 business days`.
6. **Done**.

### Standard – Extra Large Items ($23.95, 25kg+)

1. **Add rate** → **Use a custom rate**.
2. **Rate name**: `Standard delivery (Extra Large)`
3. **Price**: `23.95`
4. **Add conditions** → **Based on item weight** → **Minimum** `25 kg`, **Maximum** leave blank (means "no upper limit").
5. **Transit time**: `2-5 business days`.
6. **Done**.

---

## Step 4 — Add Express shipping rates (4 weight tiers)

Repeat the same pattern for Express:

| Rate name | Price | Min weight | Max weight | Transit time |
|---|---|---|---|---|
| `Express delivery (Small)` | `14.95` | `0 kg` | `2 kg` | `1-2 business days` |
| `Express delivery (Medium)` | `18.95` | `2 kg` | `8 kg` | `1-2 business days` |
| `Express delivery (Large)` | `23.95` | `8 kg` | `25 kg` | `1-2 business days` |
| `Express delivery (Extra Large)` | `31.95` | `25 kg` | (blank) | `1-2 business days` |

After adding all 8 rates, click **Save** at the top of the page.

---

## Step 5 — Set up Click & Collect (Local Pickup)

Local pickup is **free by default** in Shopify (you can't charge for it) and it surfaces at checkout for customers within range.

1. Still in **Settings → Shipping and delivery**, scroll down to **Local pickup**.
2. Click **Set up** next to your Wyong location (`6/45 Amsterdam Cct, Wyong NSW 2259`).
3. Tick **This location offers local pickup**.
4. **Order ready for pickup**: select `Within 2 hours` from the dropdown (matches what `/shipping` says).
5. **Pickup instructions** — add this text:

   ```
   Click & Collect from our Wyong showroom: 6/45 Amsterdam Cct, Wyong NSW 2259.

   You'll receive an email or SMS when your order is ready (usually within 2 hours during business hours). Bring your order confirmation and photo ID.

   Showroom hours: Mon–Thu 9am–3pm, Fri 9am–2:30pm. Closed weekends and public holidays.

   If you're driving up specifically and want to view the unit before paying, call us first on (02) 8772 8162.
   ```

6. Click **Save**.

That's it for Local Pickup. There is **no postcode restriction option** built into Shopify's local pickup feature — every customer at checkout sees Click & Collect as an option regardless of address. If they choose it, they get the pickup instructions you wrote, and they're responsible for actually showing up at the showroom. This is the standard behaviour and is fine — customers self-select.

> **Note on the postcode-restriction request:** Shopify's *Local Delivery* feature (different from Local Pickup) does support postcode restrictions, but Local Delivery means *you drive the order to them*. For pickup-only, the standard pattern is to make Click & Collect available to everyone and let the pickup instructions do the rest. If you actually want to deliver locally to Central Coast postcodes for free as well, set up Local Delivery as a separate zone (covered in optional Step 7 below).

---

## Step 6 — Test the rates

Before going live, test the rates from the Admin so you don't push broken pricing to customers.

1. Settings → Shipping and delivery → in the General profile, find the **Test rates** button (top right of the rate list, sometimes under a `…` menu).
2. Enter a **destination postcode** (use a Sydney postcode like `2000` to test).
3. Pick a sample product weight (e.g. `5000g` for a medium item).
4. Click **Calculate rates**.

You should see all the rates that apply to a 5kg cart:
- `Standard delivery (Medium) — $14.95 — 2-5 business days`
- `Express delivery (Medium) — $18.95 — 1-2 business days`
- `Click & Collect (Wyong) — Free`

Repeat with a 0.5kg cart, a 12kg cart, and a 30kg cart to confirm each tier triggers correctly.

You can also do a real test by adding a product to your storefront cart, going to checkout, and entering a real address — the same rates will display.

---

## Step 7 — Optional: Free Local Delivery to Central Coast

If you want to *deliver* (not just pickup) to Central Coast postcodes for free — for example, if a customer is local but can't pick up during business hours — you can add this on top:

1. Settings → Shipping and delivery → scroll to **Local delivery** section.
2. Click **Set up** next to your Wyong location.
3. Tick **This location offers local delivery**.
4. **Delivery area**: choose **Specify postal codes**.
5. Paste this list (Central Coast Council postcodes):

   ```
   2250, 2251, 2256, 2257, 2258, 2259, 2260, 2261, 2262, 2263, 2264, 2265
   ```

6. **Delivery rate**: choose **Set delivery price** → **$0.00**.
7. **Order minimum** (optional): set to `$50` or similar to avoid driving across town for a $20 cartridge sale.
8. **Delivery instructions** — add something like:

   ```
   Free local delivery to Central Coast postcodes. Orders placed before 12pm dispatch the same day; orders after 12pm dispatch the next business day.
   ```

9. **Save**.

Customers entering one of those postcodes at checkout will see Local Delivery (free) as an option alongside Standard/Express/Click & Collect.

---

## Step 8 — Optional but recommended: Connect Australia Post for live rates

Setting weight tiers manually means your customers see the same price you've quoted, every time. The downside is it doesn't reflect Australia Post's actual rates, which vary by destination. A whole-house filter to remote WA costs more than the same one to Newcastle.

If you have an Australia Post **MyPost Business** account, you can connect it natively in Shopify (no app required):

1. Get a merchant token from your MyPost Business dashboard: https://auspost.com.au/business/ecommerce/integrate-your-shipping/shopify
2. In Shopify Admin: Settings → Shipping and delivery → scroll to **Carrier accounts** at the bottom.
3. Click **Connect carrier account** → **Australia Post**.
4. Paste your merchant token → **Save**.
5. Back in your shipping zone, **Add rate** → **Use carrier or app to calculate rates** → select **Australia Post**.
6. Tick the services you want to display (e.g. Parcel Post Standard, Express Post).

You can keep your manual flat-rate tiers AND show Australia Post live rates simultaneously — customers will see both sets of options at checkout and pick what suits them.

The trade-off: Australia Post live rates need accurate **dimensions** on every product, not just weight. If you don't have dimensions set, Shopify will use a default package size which can be wildly off. Set dimensions in Shopify Admin per product (or skip live rates for now).

---

## Common issues

**"Customer is seeing too many shipping options at checkout."**
Customers see every rate that matches their cart weight. If you've configured 4 standard + 4 express + Click & Collect + Local Delivery + Australia Post live rates, that's a lot. Consider hiding rates that don't apply or merging tiers. The simplest fix is fewer tiers (e.g. just Small/Large) or removing Australia Post if you've set custom rates.

**"Some products show no shipping rates available at checkout."**
Almost always means the product weight falls outside all your tier ranges. Check that your tiers cover 0g to infinity with no gap. The Extra Large tier should have a blank Maximum field (= no upper limit).

**"Local Pickup isn't showing for some customers."**
Local Pickup is technically "available everywhere" in Shopify but can be hidden by themes that override the checkout. Test in an incognito window with a real Aus address. If it still doesn't show, check Settings → Locations and confirm your Wyong location is set to "Fulfil online orders from this location".

**"Express rates show even for big heavy items."**
That's intentional — express still works for an Extra Large item, it just costs more ($31.95 vs $23.95 standard). If you don't want to offer express on items over 25kg, remove the Extra Large express tier. The customer will then only see standard for those orders.

---

## Quick reference card

After completing this guide, your General shipping profile should contain:

```
Australia (zone)
├── Standard delivery (Small)         $10.95   0–2 kg     2-5 business days
├── Standard delivery (Medium)        $14.95   2–8 kg     2-5 business days
├── Standard delivery (Large)         $18.95   8–25 kg    2-5 business days
├── Standard delivery (Extra Large)   $23.95   25 kg+     2-5 business days
├── Express delivery (Small)          $14.95   0–2 kg     1-2 business days
├── Express delivery (Medium)         $18.95   2–8 kg     1-2 business days
├── Express delivery (Large)          $23.95   8–25 kg    1-2 business days
└── Express delivery (Extra Large)    $31.95   25 kg+     1-2 business days

Local pickup
└── Wyong showroom (free, ready in 2 hours)
```

Optional additions:
- Local Delivery to Central Coast postcodes (free over $50)
- Australia Post carrier-calculated rates (live)
