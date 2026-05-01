/**
 * TEMPORARY: Hardcoded Shopify credentials.
 *
 * On a fresh clone, copy this to lib/shopify/config.ts and fill in real
 * values. The real config.ts is gitignored to keep the token out of
 * source control. On Vercel, env vars take precedence — this file is
 * only used when env vars are not present.
 *
 * cp lib/shopify/config.ts.example lib/shopify/config.ts
 */

export const SHOPIFY_CONFIG = {
  domain: "your-store.myshopify.com",
  privateToken: "REPLACE_WITH_REAL_TOKEN",
  apiVersion: "2026-01",
};

export function hasHardcodedConfig(): boolean {
  return (
    SHOPIFY_CONFIG.privateToken !== "REPLACE_WITH_REAL_TOKEN" &&
    SHOPIFY_CONFIG.privateToken.startsWith("shpat_") &&
    SHOPIFY_CONFIG.domain.endsWith(".myshopify.com") &&
    !SHOPIFY_CONFIG.domain.includes("[") &&
    !SHOPIFY_CONFIG.domain.includes("(")
  );
}
