/**
 * Shopify Storefront API client.
 *
 * In 2026 Shopify deprecated the legacy "Develop apps" path for new custom
 * apps. The current canonical way to get Storefront credentials is via the
 * Headless sales channel, which generates two tokens per storefront:
 *
 *   - Public access token  → used with `X-Shopify-Storefront-Access-Token`.
 *     Designed to be safe in browsers. Lower rate limits.
 *
 *   - Private access token → used with `Shopify-Storefront-Private-Token`.
 *     Treated as a secret. Used for server-side requests. Higher per-shop
 *     rate limits and required for authenticated mutations like cartCreate
 *     when called from a server context.
 *
 * Our checkout flow runs server-side (the `/checkout` route is a Next.js
 * route handler), so we prefer the private token when available and fall
 * back to the public token if only that is configured. This matches
 * Shopify's 2026 server-side recommendations.
 *
 * Configuration (all read from process.env):
 *   - NEXT_PUBLIC_SHOPIFY_DOMAIN              (required)
 *   - SHOPIFY_STOREFRONT_PRIVATE_TOKEN        (preferred, server-only)
 *   - NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN  (fallback, public token)
 *   - SHOPIFY_STOREFRONT_API_VERSION          (default: 2026-01)
 */

import { SHOPIFY_CONFIG, hasHardcodedConfig } from "./config";

/**
 * Normalise the Shopify domain. Strips common copy-paste garbage:
 *   - https:// or http:// prefix
 *   - Trailing slashes
 *   - Surrounding whitespace
 *   - Markdown link wrappers like "[foo.com](http://foo.com)"
 *
 * Returns the bare hostname or null if the value is empty/garbage.
 * Logs a warning so the developer sees what was cleaned (in case the
 * sanitised value isn't what they intended).
 */
function normaliseDomain(raw: string | undefined): string | null {
  if (!raw) return null;
  let value = raw.trim();

  // Markdown auto-link: "[host.com](http://host.com)" → "host.com"
  const mdMatch = value.match(/^\[([^\]]+)\]\([^)]+\)$/);
  if (mdMatch) {
    value = mdMatch[1]!;
    console.warn(
      `[shopify] NEXT_PUBLIC_SHOPIFY_DOMAIN contained markdown link syntax — using "${value}". Fix .env.local to remove the [ ]( ) wrappers.`
    );
  }

  // Strip protocol prefix.
  value = value.replace(/^https?:\/\//, "");
  // Strip trailing slash and path.
  value = value.replace(/\/.*$/, "");

  // After cleaning, must look like a *.myshopify.com hostname.
  if (!/^[a-z0-9-]+\.myshopify\.com$/i.test(value)) {
    console.warn(
      `[shopify] NEXT_PUBLIC_SHOPIFY_DOMAIN doesn't look like a *.myshopify.com host: "${value}"`
    );
    return null;
  }

  return value.toLowerCase();
}

/**
 * Resolve credentials with this precedence:
 *   1. Hardcoded values in lib/shopify/config.ts (if edited from placeholder)
 *   2. Environment variables (.env.local / Vercel env)
 *
 * The hardcoded path is a debugging escape hatch — it lets us bypass
 * .env.local-related issues (clipboard corruption, file encoding, etc.)
 * by putting the credentials directly in TypeScript source where they
 * can only be edited inside the IDE.
 */
const SHOPIFY_DOMAIN = hasHardcodedConfig()
  ? normaliseDomain(SHOPIFY_CONFIG.domain)
  : normaliseDomain(process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN);

const PRIVATE_TOKEN = hasHardcodedConfig()
  ? SHOPIFY_CONFIG.privateToken
  : process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();

// Public token can be used from anywhere; the NEXT_PUBLIC_ prefix lets
// Next.js inline it into client-side JavaScript when needed.
const PUBLIC_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-01";

export class ShopifyNotConfiguredError extends Error {
  constructor() {
    super(
      "Shopify Storefront credentials are not configured. " +
        "Set NEXT_PUBLIC_SHOPIFY_DOMAIN and at least one of " +
        "SHOPIFY_STOREFRONT_PRIVATE_TOKEN (preferred for server) or " +
        "NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN (public)."
    );
    this.name = "ShopifyNotConfiguredError";
  }
}

export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_DOMAIN && (PRIVATE_TOKEN || PUBLIC_TOKEN));
}

export interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  /** RFC 7234 Cache-Control directive applied via Next's fetch caching. */
  cache?: RequestCache;
  /** Tags to revalidate via `revalidateTag()`. */
  tags?: string[];
  /** Buyer's IP if known — passed through to Shopify's Buyer-IP header
   *  for accurate bot/rate-limit handling on server-side requests. */
  buyerIp?: string;
}

/**
 * Build the auth headers for a Storefront API request. Prefer the private
 * token (higher rate limits, designed for server use); fall back to public.
 *
 * Note that the private and public headers are NAMED DIFFERENTLY by
 * Shopify — using the wrong header name with the wrong token type returns
 * 401 Unauthorized.
 */
function buildAuthHeaders(buyerIp: string | undefined): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (PRIVATE_TOKEN) {
    headers["Shopify-Storefront-Private-Token"] = PRIVATE_TOKEN;
    if (buyerIp) {
      // Required header for accurate buyer-side rate limiting & bot
      // protection when using a private token from a server context.
      headers["Shopify-Storefront-Buyer-IP"] = buyerIp;
    }
  } else if (PUBLIC_TOKEN) {
    headers["X-Shopify-Storefront-Access-Token"] = PUBLIC_TOKEN;
  }
  return headers;
}

export async function shopifyFetch<T>(
  options: ShopifyFetchOptions
): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new ShopifyNotConfiguredError();
  }

  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: buildAuthHeaders(options.buyerIp),
      body: JSON.stringify({
        query: options.query,
        variables: options.variables ?? {},
      }),
      cache: options.cache ?? "force-cache",
      next: { tags: options.tags },
    }
  );

  if (!response.ok) {
    // 401 is the most common deployment error and it has a few specific
    // causes — surface them in the message so the developer can fix it
    // without reaching for documentation.
    if (response.status === 401) {
      const usingPrivate = Boolean(PRIVATE_TOKEN);
      throw new Error(
        `Shopify Storefront API 401 Unauthorized. Check that:\n` +
          `  1. The token belongs to the same store as NEXT_PUBLIC_SHOPIFY_DOMAIN ("${SHOPIFY_DOMAIN}")\n` +
          `  2. The Headless channel storefront has these Storefront API permissions: read products, read product inventory, write checkouts, read checkouts\n` +
          `  3. Currently sending the ${usingPrivate ? "PRIVATE" : "PUBLIC"} token via the ${usingPrivate ? "Shopify-Storefront-Private-Token" : "X-Shopify-Storefront-Access-Token"} header\n` +
          `  4. The dev server has been restarted since editing .env.local`
      );
    }
    throw new Error(
      `Shopify Storefront API error: ${response.status} ${response.statusText}`
    );
  }

  const json = (await response.json()) as { data: T; errors?: unknown[] };
  if (json.errors && json.errors.length > 0) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}
