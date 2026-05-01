import type { Product } from "@/types/product";
import { BUSINESS } from "@/lib/business";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 border border-line rounded-sm bg-mist/40">
        <p className="text-base font-medium mb-2">
          No products match your filters.
        </p>
        <p className="text-sm text-muted">
          Try clearing a filter or two — or call us on{" "}
          {BUSINESS.phone.display} and we&rsquo;ll point you at the right
          system.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 3} />
      ))}
    </div>
  );
}
