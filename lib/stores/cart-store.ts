"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine, CartTotals, AddToCartInput } from "@/types/cart";
import { BUSINESS } from "@/lib/business";

/**
 * Lowest standard-shipping tier from the postage table — used as the
 * display "shipping from" figure. Real shipping is calculated at
 * checkout based on dimensional weight.
 *
 * Derived from `BUSINESS.shipping.standard.tiers` so when you update
 * the rate card in `lib/business.ts` (or replace it with live Shopify
 * rates) this floor moves with it.
 */
const SHIPPING_FROM_PRICE = Math.min(
  ...BUSINESS.shipping.standard.tiers.map((t) => t.price)
);

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  /**
   * The Shopify checkout (cart) ID once the storefront cart has been created.
   * Null until the user adds the first item AND the Shopify create-cart
   * mutation has run.
   */
  shopifyCartId: string | null;

  /** Last sync ISO timestamp — used for optimistic-UI rollback if needed. */
  lastSyncAt: string | null;

  // Actions.
  add: (input: AddToCartInput) => void;
  remove: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;

  open: () => void;
  close: () => void;
  toggle: () => void;

  /**
   * Derived totals. Kept as a method (not a selector) so it's available via
   * `useCart.getState().totals()` in non-React code paths (e.g. checkout
   * route handler).
   */
  totals: () => CartTotals;
}

/**
 * Cart line ID is `${productId}__${variantLabel || 'default'}` — this lets
 * the same product with different variant selections be treated as separate
 * lines, which Shopify also does at the variant level.
 */
function lineIdFor(input: AddToCartInput): string {
  return `${input.id}__${input.variantLabel ?? "default"}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      shopifyCartId: null,
      lastSyncAt: null,

      add: (input) => {
        const id = lineIdFor(input);
        const quantity = input.quantity ?? 1;
        set((state) => {
          const existing = state.lines.find((l) => l.id === id);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.id === id ? { ...l, quantity: l.quantity + quantity } : l
              ),
              isOpen: true,
            };
          }
          const next: CartLine = {
            id,
            productId: input.id,
            slug: input.slug,
            title: input.title,
            sku: input.sku,
            price: input.price,
            image: input.image ?? null,
            quantity,
            variantLabel: input.variantLabel,
          };
          return { lines: [...state.lines, next], isOpen: true };
        });
      },

      remove: (lineId) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.id !== lineId),
        })),

      setQuantity: (lineId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { lines: state.lines.filter((l) => l.id !== lineId) };
          }
          return {
            lines: state.lines.map((l) =>
              l.id === lineId ? { ...l, quantity } : l
            ),
          };
        }),

      clear: () =>
        set({ lines: [], shopifyCartId: null, lastSyncAt: null }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      totals: () => {
        const { lines } = get();
        const subtotal = lines.reduce(
          (sum, l) => sum + l.price * l.quantity,
          0
        );
        const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
        return {
          subtotal,
          shippingFromPrice: SHIPPING_FROM_PRICE,
          total: subtotal,
          itemCount,
        };
      },
    }),
    {
      name: "ea-cart-v1",
      storage: createJSONStorage(() => localStorage),
      // We don't persist `isOpen` — drawer should always start closed on reload.
      partialize: (state) => ({
        lines: state.lines,
        shopifyCartId: state.shopifyCartId,
        lastSyncAt: state.lastSyncAt,
      }),
    }
  )
);

/**
 * Hooks for components that don't need the full store. Selectors
 * automatically subscribe-by-equality so re-renders are scoped.
 */
export const useCartLines = () => useCart((s) => s.lines);
export const useCartIsOpen = () => useCart((s) => s.isOpen);
export const useCartItemCount = () =>
  useCart((s) => s.lines.reduce((sum, l) => sum + l.quantity, 0));
