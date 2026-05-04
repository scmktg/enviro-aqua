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
    return [
      // Preserve authority from the legacy WordPress URL. The old page
      // accumulated ~9k monthly impressions and was indexed both with
      // and without the trailing slash, so handle both.
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
      // Renamed top-level: commercial-bubblers → drinking-bubblers.
      // Preserve SEO equity from the old marketing-page URL and from any
      // category-PLP indexation under /shop/commercial-bubblers/*.
      {
        source: "/commercial-bubblers",
        destination: "/drinking-bubblers",
        permanent: true,
      },
      {
        source: "/shop/commercial-bubblers",
        destination: "/shop/drinking-bubblers",
        permanent: true,
      },
      {
        source: "/shop/commercial-bubblers/:path*",
        destination: "/shop/drinking-bubblers/:path*",
        permanent: true,
      },
      // kitchen-taps demoted from top-level to sub-categories.
      // Old top-level routes redirect to the closest equivalent — filter-taps
      // under water-filters, since that's where the customer was likely
      // headed (RO drinking taps were the bulk of the old kitchen-taps PLP).
      {
        source: "/shop/kitchen-taps",
        destination: "/shop/water-filters/filter-taps",
        permanent: true,
      },
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
        destination: "/shop/bathroom/kitchen-taps",
        permanent: true,
      },
      // water-filters sub-category renames.
      {
        source: "/shop/water-filters/whole-house",
        destination: "/shop/water-filters/whole-house-filters",
        permanent: true,
      },
      {
        source: "/shop/water-filters/under-sink",
        destination: "/shop/water-filters/under-sink-ro-systems",
        permanent: true,
      },
      {
        source: "/shop/water-filters/reverse-osmosis",
        destination: "/shop/water-filters/under-sink-ro-systems",
        permanent: true,
      },
      {
        source: "/shop/water-filters/bench-top",
        destination: "/shop/water-filters/under-sink-ro-systems",
        permanent: true,
      },
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
        destination: "/shop/water-pumps",
        permanent: true,
      },
      // bathroom sub-category renames.
      {
        source: "/shop/bathroom/basins-vanities",
        destination: "/shop/bathroom/vanities-and-basins",
        permanent: true,
      },
      {
        source: "/shop/bathroom/showers-drains",
        destination: "/shop/bathroom/showers-and-fixtures",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
