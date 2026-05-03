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
    ];
  },
};

export default nextConfig;
