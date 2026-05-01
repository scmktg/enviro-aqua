"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart, useCartLines, useCartIsOpen } from "@/lib/stores/cart-store";
import { Drawer } from "@/components/ui/Drawer";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { CartLineItem } from "./CartLineItem";
import { formatPrice } from "@/lib/format";
import { getDispatchStatus } from "@/lib/dispatch";

export function CartDrawer() {
  const lines = useCartLines();
  const isOpen = useCartIsOpen();
  const close = useCart((s) => s.close);
  const totals = useCart((s) => s.totals)();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = getDispatchStatus();
  const pathname = usePathname();

  // Auto-close the drawer whenever the route changes. This catches the
  // edge case where a Link inside the drawer fires its onClick={close}
  // but the navigation runs in parallel and the drawer is briefly visible
  // overlaid on the destination page during the transition.
  useEffect(() => {
    if (isOpen) close();
    // We deliberately depend only on pathname — running on isOpen too
    // would create a loop. Drawer close is idempotent so calling close()
    // when isOpen is already false is a no-op.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Also keep the drawer suppressed on /cart — adding an item via a
  // cross-sell card from the cart page would normally re-open the drawer
  // (the cart store opens on add() by default), but the user is already
  // viewing the full cart on this page, so an overlay is redundant and
  // visually confusing.
  useEffect(() => {
    if (pathname === "/cart" && isOpen) close();
  }, [pathname, isOpen, close]);

  const onCheckout = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = (await res.json()) as { checkoutUrl: string };
      window.location.href = data.checkoutUrl;
    } catch {
      setSubmitting(false);
    }
  };

  const empty = lines.length === 0;

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      title={
        empty
          ? "Cart"
          : `Cart · ${totals.itemCount} ${totals.itemCount === 1 ? "item" : "items"}`
      }
      footer={
        empty ? null : (
          <div className="px-6 py-5 space-y-4">
            <dl className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <dt className="text-muted">Subtotal</dt>
                <dd className="tabular text-ink">
                  {formatPrice(totals.subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-muted">Shipping</dt>
                <dd className="tabular text-muted text-right">
                  From {formatPrice(totals.shippingFromPrice)}
                  <span className="block text-xs">
                    or free Click &amp; Collect
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-line">
                <dt className="text-base font-semibold">Subtotal</dt>
                <dd>
                  <Price amount={totals.total} size="lg" showIncTax />
                </dd>
              </div>
            </dl>
            <p className="text-xs text-muted">
              Final shipping cost is calculated at checkout based on item
              size and your postcode.
            </p>
            <Button block size="lg" onClick={onCheckout} disabled={submitting}>
              {submitting ? "Redirecting…" : "Secure checkout"}
            </Button>
            <ButtonLink
              href="/cart"
              onClick={close}
              block
              size="lg"
              variant="secondary"
              className="hover:bg-ink/90 hover:text-paper hover:ring-0"
            >
              View full cart
            </ButtonLink>
            <p className="text-xs text-muted text-center">
              Checkout secured by Shopify · Apple Pay · Google Pay
            </p>
          </div>
        )
      }
    >
      {empty ? (
        <div className="px-6 py-16 text-center">
          <p className="text-base font-medium mb-1">Your cart is empty</p>
          <p className="text-sm text-muted mb-6">
            Not sure where to start? The filter finder narrows it down in three
            questions.
          </p>
          <Link
            href="/help/which-filter"
            onClick={close}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-700 transition-colors duration-fast"
          >
            Use the filter finder
            <span aria-hidden>→</span>
          </Link>
        </div>
      ) : (
        <>
          <div
            className={`px-6 py-4 border-b border-line ${
              dispatch.beforeCutoff ? "bg-brand-50" : "bg-mist"
            }`}
          >
            <p className="text-sm flex items-start gap-2">
              <span
                aria-hidden
                className={
                  dispatch.beforeCutoff ? "text-brand" : "text-muted"
                }
              >
                {dispatch.beforeCutoff ? "⏱" : "🕒"}
              </span>
              <span
                className={
                  dispatch.beforeCutoff
                    ? "font-medium text-brand"
                    : "text-ink/85"
                }
              >
                {dispatch.message}
              </span>
            </p>
          </div>
          <ul className="px-6 divide-y divide-line">
            {lines.map((line) => (
              <CartLineItem key={line.id} line={line} onNavigate={close} />
            ))}
          </ul>
        </>
      )}
    </Drawer>
  );
}