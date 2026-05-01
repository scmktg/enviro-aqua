"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartLine } from "@/types/cart";
import { useCart } from "@/lib/stores/cart-store";
import { Price } from "@/components/ui/Price";
import { shortTitle } from "@/lib/format";

interface CartLineItemProps {
  line: CartLine;
  /** When inside the drawer, links should close it on click. */
  onNavigate?: () => void;
}

export function CartLineItem({ line, onNavigate }: CartLineItemProps) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/product/${line.slug}`}
        onClick={onNavigate}
        className="relative w-20 h-20 flex-shrink-0 bg-mist rounded-sm overflow-hidden"
      >
        {line.image && (
          <Image
            src={line.image}
            alt=""
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        )}
      </Link>
      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${line.slug}`}
          onClick={onNavigate}
          className="block text-sm font-medium text-ink hover:text-brand transition-colors duration-fast"
        >
          {shortTitle(line.title, 64)}
        </Link>
        <p className="text-xs text-muted tabular mt-0.5">{line.sku}</p>
        {line.variantLabel && (
          <p className="text-xs text-muted mt-0.5">{line.variantLabel}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="inline-flex items-center border border-line rounded-sm">
            <button
              type="button"
              onClick={() => setQuantity(line.id, line.quantity - 1)}
              aria-label="Decrease quantity"
              className="w-8 h-8 inline-flex items-center justify-center text-ink hover:bg-mist transition-colors duration-fast"
            >
              −
            </button>
            <span
              className="w-8 text-center text-sm tabular"
              aria-live="polite"
            >
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(line.id, line.quantity + 1)}
              aria-label="Increase quantity"
              className="w-8 h-8 inline-flex items-center justify-center text-ink hover:bg-mist transition-colors duration-fast"
            >
              +
            </button>
          </div>
          <Price amount={line.price * line.quantity} size="sm" />
        </div>

        <button
          type="button"
          onClick={() => remove(line.id)}
          className="text-xs text-muted hover:text-danger transition-colors duration-fast mt-2"
        >
          Remove
        </button>
      </div>
    </li>
  );
}
