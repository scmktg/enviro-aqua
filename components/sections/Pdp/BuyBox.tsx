"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { Price } from "@/components/ui/Price";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CertificationBadges } from "@/components/ui/CertificationBadges";
import { BUSINESS, compactHoursString } from "@/lib/business";
import { useCart } from "@/lib/stores/cart-store";

interface BuyBoxProps {
  product: Product;
}

export function BuyBox({ product }: BuyBoxProps) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const inStock = product.stockStatus === "in_stock";

  // Derive the "from" prices from the rate card so changes in
  // BUSINESS.shipping (or eventually live Shopify rates) propagate
  // here without manual updates.
  const standardFrom = Math.min(
    ...BUSINESS.shipping.standard.tiers.map((t) => t.price)
  );
  const expressFrom = Math.min(
    ...BUSINESS.shipping.express.tiers.map((t) => t.price)
  );
  const returnsWindow = BUSINESS.returns.windowDays;

  const onAdd = () => {
    add({
      id: product.id,
      slug: product.slug,
      title: product.title,
      sku: product.sku,
      price: product.price,
      image: product.images[0] ?? null,
      quantity: qty,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Badge tone="outline">{product.categoryPath[0] ?? "Enviro Aqua"}</Badge>
        {product.facets.application?.includes("commercial") && (
          <Badge tone="brand">Commercial grade</Badge>
        )}
        {product.facets.application?.includes("rental friendly") && (
          <Badge tone="brand">Rental friendly</Badge>
        )}
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
        {product.title}
      </h1>
      <p className="text-sm text-muted tabular mt-2">SKU {product.sku}</p>

      {product.certifications.length > 0 && (
        <CertificationBadges
          certifications={product.certifications}
          className="mt-4"
        />
      )}

      <p className="text-base text-ink/80 mt-5 leading-relaxed">
        {product.shortDescription}
      </p>

      <div className="mt-6 pt-6 border-t border-line">
        <div className="flex items-end justify-between gap-4 mb-1">
          <Price
            amount={product.price}
            compareAt={product.onSale ? product.regularPrice : undefined}
            size="xl"
            showIncTax
          />
          <span className="text-sm text-muted">Same price retail or trade</span>
        </div>

        {/*
          The trust strip sits right above the CTA — this is the position
          the buyer's eye is already in when they hit the button. We
          deliberately repeat shipping + returns here even though they're
          in the footer, because objection-handling near the CTA is what
          drives the conversion lift.
        */}
        <ul className="flex flex-col gap-1.5 text-sm text-ink/80 mt-5 mb-6">
          <li className="flex items-center gap-2">
            <Tick />{" "}
            {inStock
              ? `In stock — same-day dispatch from Wyong NSW (orders before ${BUSINESS.dispatch.cutoffTime})`
              : "Out of stock — call for ETA"}
          </li>
          <li className="flex items-center gap-2">
            <Tick /> Standard shipping from ${standardFrom.toFixed(2)} ·
            Express from ${expressFrom.toFixed(2)}
          </li>
          <li className="flex items-center gap-2">
            <Tick /> Free Click &amp; Collect from our Wyong showroom
          </li>
          <li className="flex items-center gap-2">
            <Tick /> {returnsWindow}-day returns on damaged or faulty product
          </li>
        </ul>

        <div className="flex items-stretch gap-3">
          <div className="inline-flex items-center border border-line rounded-sm">
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              aria-label="Decrease quantity"
              className="w-11 h-12 inline-flex items-center justify-center text-ink hover:bg-mist transition-colors duration-fast"
            >
              −
            </button>
            <span
              className="w-10 text-center text-base tabular"
              aria-live="polite"
              aria-label="Quantity"
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              aria-label="Increase quantity"
              className="w-11 h-12 inline-flex items-center justify-center text-ink hover:bg-mist transition-colors duration-fast"
            >
              +
            </button>
          </div>
          <Button size="lg" block onClick={onAdd} disabled={!inStock}>
            {inStock ? "Add to cart" : "Notify me when in stock"}
          </Button>
        </div>

        <p className="text-xs text-muted mt-4">
          Need help sizing or specifying for a job? Call{" "}
          <a
            href={`tel:${BUSINESS.phone.tel}`}
            className="text-brand hover:text-brand-700 transition-colors duration-fast tabular font-medium"
          >
            {BUSINESS.phone.display}
          </a>{" "}
          — {compactHoursString()} AEST.
        </p>
      </div>
    </div>
  );
}

function Tick() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-4 h-4 text-brand flex-shrink-0"
      aria-hidden
    >
      <path
        d="m3.5 8.5 3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
