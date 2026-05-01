import type { Product } from "./product";

export interface CartLine {
  /** Product variant ID. With Shopify integration this becomes the GID. */
  id: string;
  productId: string;
  slug: string;
  title: string;
  sku: string;
  price: number;
  image: string | null;
  quantity: number;
  /** Optional facet line (e.g. "Matte Black · 1/4" connector"). */
  variantLabel?: string;
}

/**
 * Cart totals. Shipping is intentionally NOT calculated client-side:
 * the real business uses tiered shipping based on item size and weight,
 * which is determined at checkout. Showing a fake flat rate would be
 * misleading. We expose `shippingFromPrice` (a known minimum) for
 * display, and leave the actual figure to checkout.
 */
export interface CartTotals {
  subtotal: number;
  /** Lowest possible shipping cost in AUD. Display-only. */
  shippingFromPrice: number;
  total: number;
  itemCount: number;
}

export type AddToCartInput = Pick<
  Product,
  "id" | "slug" | "title" | "sku" | "price"
> & {
  image?: string | null;
  quantity?: number;
  variantLabel?: string;
};
