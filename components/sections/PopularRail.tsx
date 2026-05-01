import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { Price } from "@/components/ui/Price";

interface PopularRailProps {
  products: Product[];
  /** Headline for the rail — "Most popular for whole-house installs" etc. */
  heading: string;
  /** Subhead explaining why these specific picks. */
  subhead?: string;
}

/**
 * Editorial rail for the category landing page. This is deliberately a
 * different visual rhythm to the PLP grid below it — larger cards,
 * 16:10 aspect ratio (vs square in the grid), horizontal scroll on
 * mobile, side-by-side numbered ranking on desktop.
 *
 * The intent: when a visitor lands on /shop/water-filters, they should
 * see (1) what we sell, (2) what to pick, (3) what most people buy —
 * BEFORE they hit the unfiltered product grid. This rail is (3).
 *
 * No add-to-cart on these cards by design — the rail is a "shortlist
 * for you to consider", clicking through to the PDP is the right next
 * step from here.
 */
export function PopularRail({ products, heading, subhead }: PopularRailProps) {
  if (products.length === 0) return null;

  return (
    <section
      aria-label={heading}
      className="mt-12 lg:mt-16 -mx-4 lg:mx-0"
    >
      <header className="px-4 lg:px-0 mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
            What customers buy first
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          {subhead && (
            <p className="text-sm text-ink/80 mt-1.5 max-w-prose">
              {subhead}
            </p>
          )}
        </div>
      </header>

      <ol className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 px-4 lg:px-0 snap-x snap-mandatory scrollbar-hidden">
        {products.map((product, i) => (
          <li
            key={product.id}
            className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto lg:flex-1 lg:min-w-0 snap-start"
          >
            <Link
              href={`/product/${product.slug}`}
              className="group block h-full"
            >
              <article className="bg-paper border border-line hover:border-ink rounded-sm overflow-hidden transition-colors duration-fast h-full flex flex-col">
                <div className="relative aspect-[4/3] bg-mist">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 320px"
                      className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute top-4 left-4 text-xs tabular bg-paper border border-line text-ink px-2 py-1 rounded-sm"
                  >
                    No. {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-medium tracking-tight leading-snug flex-1 group-hover:text-brand transition-colors duration-fast">
                    {product.title}
                  </h3>
                  <div className="flex items-end justify-between mt-4 pt-4 border-t border-line">
                    <Price amount={product.price} size="md" />
                    <span className="text-sm font-medium text-brand inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast">
                      View
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
