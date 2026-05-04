/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enviroaqua.com.au",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["zustand"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    // Order is significant — first match wins. Specific exact-match rules
    // are listed before path-pattern catch-alls so we never produce a
    // redirect chain (A → B → C). Every entry below is verified to be a
    // single hop to a route that currently exists.
    //
    // The catalogue has been through three structural shapes:
    //   1. Original 4-top-level fixture (44 products)
    //   2. 5-top-level migration (191 products, briefly live)
    //   3. 3-top-level restructure (this PR — water-filters / bubblers-and-coolers / more)
    //
    // We redirect from any of (1) or (2) URLs to the (3) destination.
    return [
      // === Legacy WordPress URLs (preserved across all migrations) ===
      {
        source: "/whole-house-water-filters-central-coast",
        destination: "/water-filters-central-coast",
        permanent: true,
      },
      {
        source: "/whole-house-water-filters-central-coast/",
        destination: "/water-filters-central-coast",
        permanent: true,
      },

      // === Marketing-page URLs (top-level rename: commercial → drinking → bubblers-and-coolers) ===
      {
        source: "/commercial-bubblers",
        destination: "/bubblers-and-coolers",
        permanent: true,
      },
      {
        source: "/drinking-bubblers",
        destination: "/bubblers-and-coolers",
        permanent: true,
      },

      // === Original-repo /shop/commercial-bubblers/* (4 sub-cats, all renamed) ===
      // Listed BEFORE the catch-all so they hit the new 3-tier slugs directly.
      {
        source: "/shop/commercial-bubblers/filtered-bubblers",
        destination: "/shop/bubblers-and-coolers/commercial-bubblers",
        permanent: true,
      },
      {
        source: "/shop/commercial-bubblers/water-coolers",
        destination: "/shop/bubblers-and-coolers/water-coolers",
        permanent: true,
      },
      {
        source: "/shop/commercial-bubblers/under-counter-chillers",
        destination: "/shop/bubblers-and-coolers/water-coolers",
        permanent: true,
      },
      {
        source: "/shop/commercial-bubblers/bubbler-parts",
        destination: "/shop/bubblers-and-coolers/taps-and-cartridges",
        permanent: true,
      },
      {
        source: "/shop/commercial-bubblers",
        destination: "/shop/bubblers-and-coolers",
        permanent: true,
      },

      // === Previous-migration /shop/drinking-bubblers/* (briefly live, 3 sub-cats) ===
      {
        source: "/shop/drinking-bubblers/bubbler-parts",
        destination: "/shop/bubblers-and-coolers/taps-and-cartridges",
        permanent: true,
      },
      {
        source: "/shop/drinking-bubblers/:slug",
        destination: "/shop/bubblers-and-coolers/:slug",
        permanent: true,
      },
      {
        source: "/shop/drinking-bubblers",
        destination: "/shop/bubblers-and-coolers",
        permanent: true,
      },

      // === Previous-migration /shop/water-pumps/* — absorbed into water-filters ===
      {
        source: "/shop/water-pumps/12v-caravan-pumps",
        destination: "/shop/water-filters/filter-pumps",
        permanent: true,
      },
      {
        source: "/shop/water-pumps/booster-pumps",
        destination: "/shop/water-filters/filter-pumps",
        permanent: true,
      },
      {
        source: "/shop/water-pumps/pressure-tanks",
        destination: "/shop/water-filters/filter-tanks",
        permanent: true,
      },
      {
        source: "/shop/water-pumps",
        destination: "/shop/water-filters/filter-pumps",
        permanent: true,
      },

      // === Previous-migration /shop/chemical-dosing-tanks → /shop/more/dosing-tanks ===
      {
        source: "/shop/chemical-dosing-tanks",
        destination: "/shop/more/dosing-tanks",
        permanent: true,
      },

      // === /shop/bathroom/* → /shop/more/* (rename + 2 sub-cat renames) ===
      // The two renamed sub-cats must be listed before the :slug catch-all.
      {
        source: "/shop/bathroom/basins-vanities",
        destination: "/shop/more/vanities-and-basins",
        permanent: true,
      },
      {
        source: "/shop/bathroom/showers-drains",
        destination: "/shop/more/showers-and-fixtures",
        permanent: true,
      },
      {
        source: "/shop/bathroom/:slug",
        destination: "/shop/more/:slug",
        permanent: true,
      },
      {
        source: "/shop/bathroom",
        destination: "/shop/more",
        permanent: true,
      },

      // === Original-repo /shop/kitchen-taps/* — demoted to sub-categories ===
      {
        source: "/shop/kitchen-taps/ro-3way-taps",
        destination: "/shop/water-filters/filter-taps",
        permanent: true,
      },
      {
        source: "/shop/kitchen-taps/dedicated-ro-taps",
        destination: "/shop/water-filters/filter-taps",
        permanent: true,
      },
      {
        source: "/shop/kitchen-taps/mixer-taps",
        destination: "/shop/more/kitchen-taps",
        permanent: true,
      },
      {
        source: "/shop/kitchen-taps",
        destination: "/shop/water-filters/filter-taps",
        permanent: true,
      },

      // === Within water-filters: previous-migration slugs that no longer exist ===
      // Note: filter-fittings was briefly redirected to replacement-cartridges
      // (when the slug was dissolved); the slug is back as a real category in
      // the catalogue-fixes restructure, so no redirect — let the page render.
      {
        source: "/shop/water-filters/whole-house-filters",
        destination: "/shop/water-filters/whole-house",
        permanent: true,
      },
      {
        source: "/shop/water-filters/under-sink-ro-systems",
        destination: "/shop/water-filters/under-sink",
        permanent: true,
      },

      // === Original-repo water-filters slug renames (still relevant) ===
      {
        source: "/shop/water-filters/uv-sterilisation",
        destination: "/shop/water-filters/uv-sterilisers",
        permanent: true,
      },
      {
        source: "/shop/water-filters/fittings-parts",
        destination: "/shop/water-filters/filter-fittings",
        permanent: true,
      },
      {
        source: "/shop/water-filters/tanks-pumps",
        destination: "/shop/water-filters/filter-tanks",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
