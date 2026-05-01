# Shopify Integration Guide

This site is built **headless**: the Next.js front end is decoupled from Shopify. Shopify hosts the catalogue, runs the cart, and processes the checkout. The front end queries it via the Storefront API.

When this guide is followed end-to-end, the cart drawer's "Secure checkout" button takes the customer to Shopify's hosted checkout, payment is processed by Shopify Payments (or whichever gateway you configure), and the order lands in your Shopify Admin.

---

## What's already done in the codebase

- `lib/shopify/client.ts` — Storefront GraphQL client with caching, error handling, and dual public/private token support.
- `lib/shopify/checkout.ts` — `createCheckout()` function that resolves SKUs → Shopify variant GIDs and creates a Shopify cart.
- `app/checkout/route.ts` — POST endpoint the cart drawer hits when the user clicks "Secure checkout".
- `lib/stores/cart-store.ts` — Zustand cart that persists to `localStorage` and survives page reloads.

The front end is already wired to call the checkout route. The only thing missing is your Shopify credentials, plus making sure your Shopify product handles match the `slug` field in `lib/catalogue-data.ts`.

---

## Step 1 — Have a Shopify store with your products

If you've already imported the catalogue using `shopify-import.csv` (per `SHOPIFY-IMPORT.md`), you're set. Skip ahead.

If not: create a Shopify store, then run the CSV import — the SKUs and product handles in that file are designed to match what `createCheckout()` looks up.

---

## Step 2 — Install the Headless sales channel

**This is the 2026 canonical way to get Storefront API credentials.** The old "Develop apps" path you may have read about in older tutorials was deprecated for new custom apps on January 1, 2026.

1. In Shopify Admin, go to **Apps** (left sidebar) → click **Shopify App Store**.
2. Search for **Headless** (it's a free first-party Shopify app).
3. Click **Install**.
4. After install, you'll be in the **Headless** sales channel page in your Admin.

---

## Step 3 — Create a storefront

1. Inside the Headless channel page, click **Add storefront** (or **Create storefront** if it's your first one).
2. Give it a name like "Next.js Headless Site" so you remember what it's for.
3. Shopify generates the storefront and shows you a credentials page with two tokens:
   - **Public access token** — used for client-side requests
   - **Private access token** — used for server-side requests (cart creation, checkout). Has higher rate limits.

Copy both. The private token is shown only once on this page — if you lose it, you have to rotate it (which invalidates the old one).

---

## Step 4 — Set Storefront API permissions

By default a new storefront has very restrictive permissions. You need to grant the ones our cart needs.

1. Still in the Headless channel, find the storefront you just created and click into it.
2. Find the **Storefront API permissions** section (usually has an "Edit" button).
3. Tick at minimum these permissions:
   - **Read products, variants, and collections**
   - **Read product inventory**
   - **Read and modify checkouts** (sometimes labelled "Write checkouts" — this is the critical one for cart creation)
   - **Read customer tags** (optional, for trade pricing later)
4. Click **Save**.

If you skip this step, you'll get a 401 Unauthorized at checkout — Shopify rejects the request because the token has no permission to create carts.

---

## Step 5 — Configure environment variables

In your project root, copy the template:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your real values:

```bash
# Your *.myshopify.com domain
NEXT_PUBLIC_SHOPIFY_DOMAIN=enviro-aqua.myshopify.com

# PRIVATE token from the Headless channel storefront page
SHOPIFY_STOREFRONT_PRIVATE_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxx

# PUBLIC token from the same page (optional fallback for client-side reads)
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=

SHOPIFY_STOREFRONT_API_VERSION=2026-01

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Notes:
- `NEXT_PUBLIC_SHOPIFY_DOMAIN` is the `*.myshopify.com` domain, **not** your customer-facing domain. The Storefront API only accepts requests against the myshopify.com host.
- `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` has **no `NEXT_PUBLIC_` prefix** — it's a secret and Next.js automatically excludes it from the browser bundle.
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` is optional. The code prefers the private token when both are set.
- For production on Vercel, set the same env vars in **Vercel project settings → Environment Variables** and use your real production site URL.

---

## Step 6 — Restart the dev server

Next.js doesn't hot-reload env vars. After editing `.env.local`:

```bash
# Ctrl+C to stop the dev server if running
npm run dev
```

Watch the boot output for `▲ Next.js 15.5.15 - Environments: .env.local` to confirm it loaded.

---

## Step 7 — Test the checkout flow

1. Open the site, add a product to cart.
2. Open the cart drawer, click **Secure checkout**.
3. You should be redirected to a Shopify hosted checkout page at `your-store.myshopify.com/checkouts/cn/...`.
4. Use Shopify's [Bogus Gateway test card](https://help.shopify.com/en/manual/checkout-settings/test-orders) to complete the flow without spending real money. The test card number is `1`.
5. Confirm the order appears in **Orders** in Shopify Admin.

---

## Troubleshooting

### 401 Unauthorized

The most common error. Three causes:

1. **Wrong storefront permissions.** Go back to Step 4. If "Write checkouts" / "Read and modify checkouts" isn't ticked, cart creation is rejected.

2. **Token is for a different store.** The `NEXT_PUBLIC_SHOPIFY_DOMAIN` value must match the store where you generated the token. Multi-store setups will get 401 if these are mismatched.

3. **Token rotated.** If you regenerated the private token in the Headless channel, the old one is dead. Re-paste the new value into `.env.local` and restart the dev server.

The error message in your terminal logs will print these checks for you. Look for `[checkout] createCheckout failed` then a multi-line message listing what to verify.

### Test the token directly with curl

If you want to skip Next.js and test the token in isolation:

```bash
curl -X POST \
  https://YOUR-STORE.myshopify.com/api/2026-01/graphql.json \
  -H "Content-Type: application/json" \
  -H "Shopify-Storefront-Private-Token: shpat_YOUR_PRIVATE_TOKEN" \
  -d '{"query":"{shop{name}}"}'
```

Replace the placeholders. Expected output:

```json
{"data":{"shop":{"name":"Your Store Name"}}}
```

If you get `{"errors":...}` or HTTP 401 from this curl, the token/domain/permissions setup is wrong — fix that before debugging the website.

### "Shopify product not found for slug X"

The product handle in Shopify doesn't match the `slug` in `lib/catalogue-data.ts`. Two ways to fix:

- Rename the product handle in Shopify Admin (Edit product → Title and description → URL handle field at the bottom).
- Or adjust the slug in `lib/catalogue-data.ts` to match Shopify, then redeploy.

The slug is the source of truth on our side. Re-uploading the CSV should keep them aligned automatically.

### "Shopify variant with SKU X not found"

Means the variant SKU in Shopify doesn't match. Open the product, find the variant, edit the SKU.

### Checkout redirects to `/cart?stub=1`

Env vars aren't loading. Verify `.env.local` is in the project root (next to `package.json`, not inside a subfolder), no quotes around values, and the dev server has been restarted since editing.

### CORS errors

Add your domain (production AND preview) to **Headless channel → storefront → Storefront URLs** so Shopify allows browser-side calls from those origins.

---

## Step 8 — Production deployment

When you deploy to Vercel:

1. In the Vercel dashboard, open your project.
2. Go to **Settings → Environment Variables**.
3. Add each variable. For `Environment`, tick **Production**, **Preview**, and **Development** so all three deploy targets see the values.
4. Use `https://enviroaqua.com.au` for `NEXT_PUBLIC_SITE_URL` in Production.
5. Trigger a redeploy from the Deployments tab. Vercel doesn't automatically pick up env var changes on existing deployments.

---

## Why public + private tokens both exist

Shopify's Storefront API has two access patterns:

| Token | Header | Use case |
|---|---|---|
| Public | `X-Shopify-Storefront-Access-Token` | Browser-side queries (e.g. real-time stock check on a product page). Lower rate limits. Safe in the browser bundle. |
| Private | `Shopify-Storefront-Private-Token` | Server-side queries (e.g. our `/checkout` route). Higher rate limits. Treated as secret — must NOT reach the browser. |

Our cart and checkout flow runs server-side, so the private token is the right tool. The code prefers it when configured. If you only set the public token, the code falls back to using it — checkout still works, you just hit lower rate limits.

---

## Migrating from the legacy "Develop apps" custom-app token

If you previously created a token via the old `Settings → Apps and sales channels → Develop apps` path (this still works for stores that did it before Jan 1 2026), it should also work in our code. Paste it into `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` (the public token slot) and it'll be sent with `X-Shopify-Storefront-Access-Token`.

That said, switching to the Headless channel is recommended:

- Shopify is investing in Headless as the canonical headless path.
- Headless tokens have native support for the private-token + Buyer-IP header convention, which gives better rate limits and bot protection on server-side calls.
- Permissions are managed cleanly in the channel UI — easier to audit which storefront has access to what.

---

## What about webhooks?

Once you're live, set up these Shopify webhooks (Settings → Notifications → Webhooks) to keep the front end in sync:

- `products/update` → POST to `/api/revalidate?tag=product:{handle}` — rebuilds product pages when prices/stock change.
- `inventory_levels/update` → same, to refresh stock badges.
- `products/delete` → triggers full rebuild + cache clear.

These aren't built yet. Add them when you've migrated `lib/catalogue.ts` to live Shopify data — they're meaningless before that. For launch, the local catalogue fixture is fine and updates only require a redeploy.
