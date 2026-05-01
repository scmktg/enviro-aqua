"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/types/product";
import { Price } from "@/components/ui/Price";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/lib/stores/cart-store";
import { shortTitle } from "@/lib/format";

interface ProductCardProps {
  product: Product;
  /** Show the SKU under the title — used on PLPs where tradies search by SKU. */
  showSku?: boolean;
  /** Eager load — true for the first row of LCP cards, false otherwise. */
  priority?: boolean;
}

/**
 * Hover behavior is deliberate: the card swaps from the primary image to
 * the second image (when available). For tradies and DIY buyers, this
 * gives a fast "front + back/detail" preview without leaving the listing
 * page. Falls back to a soft scale on hover when there's only one image.
 *
 * The "Add to cart" button is a quiet inline button rather than a giant
 * primary — the card is the click target for navigation. Power users can
 * cart-from-listing without leaving; everyone else just clicks through.
 */
export function ProductCard({
  product,
  showSku = true,
  priority = false,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const add = useCart((s) => s.add);

  const primary = product.images[0];
  const secondary = product.images[1] ?? primary;
  const displayed = hovered && secondary ? secondary : primary;
  const hasSecondImage = product.images.length > 1;

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      id: product.id,
      slug: product.slug,
      title: product.title,
      sku: product.sku,
      price: product.price,
      image: product.images[0] ?? null,
    });
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block w-full focus:outline-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article className="w-full border border-line bg-paper transition-colors duration-fast hover:border-ink h-full flex flex-col">
        <div className="relative aspect-square bg-mist overflow-hidden">
          {displayed && (
            <Image
              src={displayed}
              alt={`${product.title}`}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className={`object-contain p-6 transition-all duration-300 ${
                hasSecondImage ? "" : "group-hover:scale-[1.03]"
              }`}
              priority={priority}
            />
          )}
          {product.onSale && (
            <span className="absolute top-3 left-3">
              <Badge tone="brand">On Sale</Badge>
            </span>
          )}
          {product.stockStatus === "low_stock" && (
            <span className="absolute top-3 right-3">
              <Badge tone="warning">Low stock</Badge>
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex-1">
            {product.facets.technology &&
              product.facets.technology.length > 0 && (
                <p className="text-xs uppercase tracking-[0.14em] text-muted mb-2">
                  {product.facets.technology.slice(0, 2).join(" · ")}
                </p>
              )}
            <h3 className="text-sm font-medium text-ink leading-snug group-hover:text-brand transition-colors duration-fast break-words">
              {shortTitle(product.title, 80)}
            </h3>
            {showSku && (
              <p className="text-xs text-muted tabular mt-1">
                {product.sku}
              </p>
            )}
          </div>

          <div className="flex items-end justify-between mt-4 pt-4 border-t border-line">
            <Price
              amount={product.price}
              compareAt={product.onSale ? product.regularPrice : undefined}
              size="md"
            />
            <button
              type="button"
              onClick={onAdd}
              className="text-sm font-medium text-brand hover:text-brand-700 transition-colors duration-fast inline-flex items-center gap-1.5 px-2 -mr-2 py-1"
              aria-label={`Add ${shortTitle(product.title, 50)} to cart`}
            >
              Add
              <svg
                viewBox="0 0 14 14"
                fill="none"
                className="w-3.5 h-3.5"
                aria-hidden
              >
                <path
                  d="M2 4h2l1.5 6h7L14 5H4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
