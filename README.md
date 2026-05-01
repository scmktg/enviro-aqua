# Enviro Aqua

Production e-commerce site for Enviro Aqua — Australian water filter & commercial bubbler specialists. Built on Next.js 15 (App Router) with a Shopify Storefront integration scaffolded for headless cart and checkout.

## Stack

- **Framework:** Next.js 15.0 (App Router, Server Components by default)
- **Styling:** Tailwind CSS 3.4 with a project-specific token theme (no default Tailwind palette)
- **State:** Zustand for cart, persisted to `localStorage`
- **Cart / Checkout:** Shopify Storefront API (scaffolded — drop in credentials to activate)
- **Hosting:** Vercel-ready

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app runs against an in-memory product fixture (`lib/catalogue-data.ts`). Cart and checkout work end-to-end against a stubbed Shopify handoff until you add credentials.

**To wire up real Shopify checkout, follow the step-by-step guide in [`SHOPIFY-INTEGRATION.md`](./SHOPIFY-INTEGRATION.md).** The short version:

1. Create a Shopify store with the same products + handles + SKUs as `lib/catalogue-data.ts`.
2. Generate a Storefront API access token from `Settings → Apps and sales channels → Develop apps`.
3. Set `NEXT_PUBLIC_SHOPIFY_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` in `.env.local`.
4. Cart and checkout instantly route through Shopify's hosted, PCI-compliant checkout — no other code changes.

## Architecture

```
app/                  Next.js App Router routes
  layout.tsx          Root layout (Header, Footer, CartDrawer, OG metadata)
  page.tsx            Homepage — composed from /components/sections/Home*
  shop/[category]/    Category landing pages (also work as PLPs)
  shop/[category]/[subcategory]/   Sub-category PLPs
  product/[slug]/     Product detail pages
  cart/               Full-page cart
  checkout/route.ts   Shopify checkout handoff (POST)
  trade/              Trade & wholesale landing
  shipping/           Shipping & returns
  help/which-filter/  Decision-support landing
  search/             Full search results page
  api/search/route.ts JSON search endpoint
  sitemap.ts          Generated sitemap.xml

components/
  ui/                 Primitive components (Button, Input, Drawer, etc.)
  sections/           Composed sections (Header, Hero, ProductCard, etc.)
  sections/Pdp/       Product detail page sub-components

lib/
  catalogue.ts        Product read API (Shopify swap point)
  catalogue-data.ts   Product fixture (44 SKUs across 4 categories)
  categories.ts       Category structure with SEO copy
  search.ts           In-memory keyword search
  format.ts           Price / title formatters
  seo.ts              JSON-LD generators (Product, BreadcrumbList, Org)
  stores/cart-store.ts  Zustand cart with persistence
  shopify/client.ts   Storefront API GraphQL client
  shopify/checkout.ts Cart → Shopify checkout handoff

types/                TypeScript contracts
styles/tokens.css     Design tokens documented separately from globals
```

## Adding products

Today, products live in `lib/catalogue-data.ts`. To add a product:

1. Append a new entry to `PRODUCTS` matching the `Product` type from `types/product.ts`.
2. Add an entry under the matching `subCategory` in `lib/categories.ts` if it's a new sub-category.
3. The PDP, PLP and sitemap entries auto-generate.

Once Shopify is integrated, `getAllProducts()` etc. will fetch from Shopify and the fixture file becomes redundant.

## Adding a landing or blog page

The brief calls for rapid landing/blog deployment. The pattern:

1. Create `app/{slug}/page.tsx` (e.g. `app/blog/best-whole-house-filters-2026/page.tsx`).
2. Export a `metadata` object with `title`, `description`, and `alternates.canonical`.
3. Import `Breadcrumbs` from `@/components/sections/Breadcrumbs` for the trail.
4. Use the existing UI primitives (`Button`, `Price`, `Badge`) — the design system enforces consistency without thinking about it.
5. The sitemap auto-generates at build time; add high-priority static routes to `app/sitemap.ts` if needed.

## SEO

- Per-page metadata via `generateMetadata`
- Open Graph image generated at build via `app/opengraph-image.tsx`
- JSON-LD Product schema on every PDP
- JSON-LD BreadcrumbList on every PDP and PLP
- JSON-LD Organization on every page (in root layout)
- Sitemap at `/sitemap.xml`, robots at `/robots.txt`
- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<article>`, ordered headings

## Design tokens

Tokens are defined twice for clarity:

- **Tailwind theme** (`tailwind.config.ts`) — generates utility classes
- **CSS variables** (`styles/tokens.css`, `app/globals.css`) — for use inside `style=` props and pseudo-elements

If you change a token, update both. Don't add a colour outside the token system; the palette is intentionally tight.

## Conversion architecture

Three levers, embedded across the site:

1. **Same price retail or trade** — Header ribbon, hero, every PDP, footer, trade page
2. **Certification + Australian compliance** — Filter chips, PDP badges, trust block, footer column
3. **Decision support** — Homepage matrix, every category landing, dedicated `/help/which-filter` page, cart-empty state, search empty state

The repeat CTA pattern on PDPs (Add to cart in the buy box → again after long-form description) is also part of this — buyers who scroll past the spec table are highest-intent.

## Deploying to Vercel

```bash
vercel
```

The site is statically renderable for every product, category, and landing page. Cart/checkout are client-side until Shopify is wired up, then they delegate to Shopify's hosted checkout.

Set the following Vercel env vars:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SHOPIFY_DOMAIN` (when ready)
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` (when ready)
- `NEXT_PUBLIC_SUPPORT_PHONE`

## License

Proprietary — Enviro Aqua Pty Ltd.
