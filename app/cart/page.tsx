"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart, useCartLines } from "@/lib/stores/cart-store";
import { CartLineItem } from "@/components/sections/CartLineItem";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { formatPrice } from "@/lib/format";
import { BUSINESS } from "@/lib/business";
import { getDispatchStatus } from "@/lib/dispatch";

export default function CartPage() {
  const lines = useCartLines();
  const totals = useCart((s) => s.totals)();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = getDispatchStatus();
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");

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
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-6">
        Your cart
      </h1>

      {errorCode === "checkout" && (
        <aside
          role="alert"
          className="mt-6 border-l-2 border-danger bg-danger/5 p-4 max-w-2xl rounded-sm"
        >
          <p className="text-sm font-medium text-danger">
            We couldn&rsquo;t start your checkout.
          </p>
          <p className="text-sm text-ink/85 mt-2 leading-relaxed">
            One of the items in your cart isn&rsquo;t available right now —
            stock may have changed since you added it. Try again, or call us
            on{" "}
            <a
              href={`tel:${BUSINESS.phone.tel}`}
              className="text-brand hover:text-brand-700 underline underline-offset-4 tabular font-medium"
            >
              {BUSINESS.phone.display}
            </a>{" "}
            and we&rsquo;ll sort it out.
          </p>
        </aside>
      )}

      {empty ? (
        <div className="mt-12 max-w-xl">
          <p className="text-base mb-2">Your cart is empty.</p>
          <p className="text-base text-muted mb-6">
            Not sure where to start? The filter finder narrows it down in three
            questions, or browse the full catalogue.
          </p>
          <div className="flex gap-3">
            <ButtonLink href="/help/which-filter">Use the filter finder</ButtonLink>
            <ButtonLink href="/shop" variant="ghost">
              Browse the catalogue
            </ButtonLink>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 mt-10">
          <div>
            <div
              className={`rounded-sm px-5 py-4 border mb-6 ${
                dispatch.beforeCutoff
                  ? "bg-brand-50 border-brand-50"
                  : "bg-mist border-line"
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

            <ul className="divide-y divide-line border-t border-line">
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-32 self-start bg-mist rounded-sm border border-line p-6">
            <h2 className="text-base font-semibold tracking-tight mb-4">
              Order summary
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="tabular">{formatPrice(totals.subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="tabular text-muted text-right">
                  From {formatPrice(totals.shippingFromPrice)}
                  <span className="block text-xs">
                    or free Click &amp; Collect
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-line">
                <dt className="text-base font-semibold">Subtotal</dt>
                <dd>
                  <Price amount={totals.total} size="lg" showIncTax />
                </dd>
              </div>
            </dl>
            <p className="text-xs text-muted mt-3">
              Final shipping is calculated at checkout based on item size and
              your postcode. Local pickup from our Wyong showroom is always
              free.
            </p>
            <Button
              block
              size="lg"
              className="mt-4"
              onClick={onCheckout}
              disabled={submitting}
            >
              {submitting ? "Redirecting…" : "Secure checkout"}
            </Button>
            <p className="text-xs text-muted mt-3 text-center">
              Checkout secured by Shopify · Apple Pay · Google Pay
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
