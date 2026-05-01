import type { Product } from "@/types/product";
import { ProductCard } from "@/components/sections/ProductCard";

interface CrossSellProps {
  products: Product[];
  /** The current product — used to tailor heading copy. */
  context: Product;
}

/**
 * Cross-sell with a specific logic per sub-category — driven by the
 * complementary map in `lib/catalogue.ts:getCrossSell`. The headline
 * adapts to context: when buying RO, the heading is "Complete your RO
 * build"; when buying a whole-house, it's "Add to the install".
 *
 * No random "you might also like" — every recommendation is something a
 * plumber would suggest at the counter.
 */
export function CrossSell({ products, context }: CrossSellProps) {
  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="cross-sell-heading"
      className="mt-16 lg:mt-20"
    >
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
            Often bought together
          </p>
          <h2
            id="cross-sell-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            {headlineFor(context)}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} showSku={false} />
        ))}
      </div>
    </section>
  );
}

function headlineFor(product: Product): string {
  switch (product.subCategory) {
    case "reverse-osmosis":
      return "Complete your RO drinking-water build.";
    case "whole-house":
      return "Add to the whole-house install.";
    case "under-sink":
      return "Pair your under-sink filter with the right tap.";
    case "bench-top":
      return "Keep your bench top filter running.";
    case "filtered-bubblers":
    case "water-coolers":
      return "Service parts and accessories.";
    default:
      return "What plumbers buy with this.";
  }
}
