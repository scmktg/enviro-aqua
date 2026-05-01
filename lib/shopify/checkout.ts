import type { CartLine } from "@/types/cart";
import { isShopifyConfigured, shopifyFetch } from "./client";

/**
 * Convert our local cart to a Shopify checkout URL.
 *
 * The flow when Shopify is configured:
 *   1. For each line, resolve our SKU → Shopify ProductVariant GID.
 *      The Storefront API does NOT support querying by SKU directly,
 *      so we query the product by handle (which mirrors our slug) and
 *      pick the matching variant by its `sku` field.
 *   2. POST `cartCreate` with the resolved merchandise IDs.
 *   3. Shopify returns `checkoutUrl` — we redirect there.
 *   4. Customer completes payment on Shopify's hosted checkout (PCI safe).
 *   5. Shopify redirects them back on success.
 *
 * When Shopify is NOT configured (i.e. local dev / preview), we return a
 * placeholder URL so the dev experience is "click checkout → see what
 * would happen" rather than a hard error.
 */

interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    } | null;
    userErrors: { field: string[]; message: string }[];
  };
}

interface ProductByHandleResponse {
  product: {
    id: string;
    handle: string;
    variants: {
      nodes: {
        id: string;
        sku: string;
        availableForSale: boolean;
      }[];
    };
  } | null;
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      variants(first: 100) {
        nodes {
          id
          sku
          availableForSale
        }
      }
    }
  }
`;

/**
 * In-memory SKU → variant GID cache, populated on first lookup.
 * Module scope means this persists across requests within the same
 * server runtime instance (Vercel will keep it warm for a few minutes).
 *
 * Cache invalidation: there's no TTL because variant GIDs are stable
 * once issued by Shopify — they don't change when prices, inventory,
 * or even product titles change. The only time the mapping can drift
 * is if a variant is deleted and recreated, which is rare. To force a
 * refresh, restart the server or call `clearVariantCache()` from a
 * server action wired to a webhook (left as an exercise).
 */
const skuToVariantId = new Map<string, string>();

export function clearVariantCache() {
  skuToVariantId.clear();
}

/**
 * Resolve a single line's SKU to its Shopify ProductVariant GID. We
 * query by product handle (= our slug). Slug-handle alignment is the
 * one wiring assumption — if your Shopify product handles differ from
 * the slugs in `lib/catalogue-data.ts`, fix the mismatch by setting
 * the handle in Shopify Admin to match the slug field on the product.
 */
async function resolveVariantId(line: CartLine): Promise<string> {
  const cached = skuToVariantId.get(line.sku);
  if (cached) return cached;

  const data = await shopifyFetch<ProductByHandleResponse>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle: line.slug },
    cache: "force-cache",
    tags: [`product:${line.slug}`],
  });

  if (!data.product) {
    throw new Error(
      `Shopify product not found for slug "${line.slug}". ` +
        `Confirm the product handle in Shopify Admin matches this slug.`
    );
  }

  const variant = data.product.variants.nodes.find(
    (v) => v.sku === line.sku
  );
  if (!variant) {
    throw new Error(
      `Shopify variant with SKU "${line.sku}" not found on product ` +
        `"${line.slug}". Confirm the variant SKU in Shopify Admin.`
    );
  }
  if (!variant.availableForSale) {
    throw new Error(
      `Shopify variant "${line.sku}" is not currently available for sale.`
    );
  }

  skuToVariantId.set(line.sku, variant.id);
  return variant.id;
}

export interface CheckoutHandoffResult {
  checkoutUrl: string;
  cartId: string | null;
  /** When true, Shopify is not configured and the URL is a stub. */
  isStub: boolean;
}

export async function createCheckout(
  lines: CartLine[]
): Promise<CheckoutHandoffResult> {
  if (lines.length === 0) {
    throw new Error("Cannot create checkout from an empty cart.");
  }

  if (!isShopifyConfigured()) {
    return {
      checkoutUrl: "/cart?stub=1",
      cartId: null,
      isStub: true,
    };
  }

  // Resolve every SKU → variant GID in parallel. Failures bubble up so
  // the route handler can return a user-friendly error.
  const resolvedLines = await Promise.all(
    lines.map(async (line) => ({
      merchandiseId: await resolveVariantId(line),
      quantity: line.quantity,
      attributes: [{ key: "sku", value: line.sku }],
    }))
  );

  const data = await shopifyFetch<CartCreateResponse>({
    query: CART_CREATE_MUTATION,
    variables: { input: { lines: resolvedLines } },
    cache: "no-store",
  });

  const cart = data.cartCreate.cart;
  const errors = data.cartCreate.userErrors;

  if (!cart || errors.length > 0) {
    throw new Error(
      `Failed to create Shopify checkout: ${
        errors.map((e) => e.message).join("; ") || "unknown error"
      }`
    );
  }

  return {
    checkoutUrl: cart.checkoutUrl,
    cartId: cart.id,
    isStub: false,
  };
}
