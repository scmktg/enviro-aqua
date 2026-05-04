import { isShopifyConfigured, shopifyFetch } from "./client";

/**
 * Live state for a single product variant — the subset of catalogue data
 * that actually changes day-to-day. Editorial content (title, copy, images,
 * facets, SEO) stays in `lib/catalogue-data.ts`; this module owns price and
 * stock so they reflect Shopify in near-real-time.
 *
 * Returned values come from the *first variant* of the product. Our
 * catalogue is single-variant per product (verified against Shopify), so
 * this is unambiguous. If multi-variant products are introduced later,
 * this layer needs a variant selector.
 */
export interface ProductState {
  /** Variant price in AUD as a number — already parsed from Shopify's string. */
  price: number;
  /** Whether Shopify will let a buyer add the variant to a cart right now. */
  available: boolean;
  /** Tracked-inventory count, or `null` if inventory tracking is off or the
   *  Storefront token lacks `unauthenticated_read_product_inventory`. */
  inventoryQuantity: number | null;
}

interface ProductStateResponse {
  product: {
    handle: string;
    variants: {
      nodes: {
        price: { amount: string };
        availableForSale: boolean;
        quantityAvailable: number | null;
      }[];
    };
  } | null;
}

/**
 * Smaller than the checkout's PRODUCT_BY_HANDLE — only the fields needed
 * for the live-state merge. Kept separate so that future schema drift on
 * either side doesn't ripple across the other.
 */
const PRODUCT_STATE_BY_HANDLE = /* GraphQL */ `
  query ProductStateByHandle($handle: String!) {
    product(handle: $handle) {
      handle
      variants(first: 1) {
        nodes {
          price {
            amount
          }
          availableForSale
          quantityAvailable
        }
      }
    }
  }
`;

/**
 * Module-level flag so the inventory-permission warning fires at most once
 * per server process — otherwise a busy PLP would spam the log on every
 * request. Reset on cold-start; that's the right cadence for a "fix your
 * Shopify scopes" message.
 */
let inventoryWarningEmitted = false;

function maybeWarnAboutInventoryPermission(
  slug: string,
  state: ProductState
): void {
  if (inventoryWarningEmitted) return;
  if (state.available && state.inventoryQuantity === null) {
    inventoryWarningEmitted = true;
    console.warn(
      `[shopify] quantityAvailable is null on "${slug}" — check that ` +
        `(1) the Headless storefront has 'unauthenticated_read_product_inventory' ` +
        `permission, and (2) the variant has 'Track quantity' enabled in Shopify ` +
        `Admin. Out-of-stock detection still works via availableForSale, but the ` +
        `low-stock indicator will not appear until both are set.`
    );
  }
}

/**
 * Fetch live price + stock state for one product. Returns null when:
 *   - Shopify isn't configured (dev-without-creds path)
 *   - The product handle doesn't exist in Shopify
 *   - Any network or GraphQL error occurs
 *
 * Errors are logged server-side but never thrown — a Shopify outage must
 * fall back to hardcoded data, not 500 the page.
 */
export async function getProductState(
  slug: string
): Promise<ProductState | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<ProductStateResponse>({
      query: PRODUCT_STATE_BY_HANDLE,
      variables: { handle: slug },
      cache: "force-cache",
      tags: [`product:${slug}`],
      revalidate: 300,
    });

    const variant = data.product?.variants.nodes[0];
    if (!variant) return null;

    const state: ProductState = {
      price: Number(variant.price.amount),
      available: variant.availableForSale,
      inventoryQuantity: variant.quantityAvailable,
    };

    maybeWarnAboutInventoryPermission(slug, state);
    return state;
  } catch (error) {
    console.error(
      `[shopify] getProductState failed for "${slug}" — falling back to hardcoded data:`,
      error
    );
    return null;
  }
}

/**
 * Batch fetch — used by PLPs and home sections. Returns a Map keyed by
 * slug; missing entries mean "no live state available" and the caller
 * should fall back to hardcoded data for that product.
 *
 * Implementation is parallel singles rather than an aliased mega-query
 * because (a) Next caches each one under its own tag (`product:<slug>`),
 * which keeps webhook revalidation surgical, and (b) on warm caches it's
 * a fan-out of cache hits with no extra Shopify round-trips.
 */
export async function getProductStates(
  slugs: string[]
): Promise<Map<string, ProductState>> {
  const result = new Map<string, ProductState>();
  if (slugs.length === 0 || !isShopifyConfigured()) return result;

  const states = await Promise.all(
    slugs.map(async (slug) => [slug, await getProductState(slug)] as const)
  );

  for (const [slug, state] of states) {
    if (state) result.set(slug, state);
  }
  return result;
}
