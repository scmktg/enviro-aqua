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
};

export default nextConfig;
