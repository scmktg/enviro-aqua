import Link from "next/link";
import { getFeaturedProducts } from "@/lib/catalogue";
import { ProductCard } from "./ProductCard";

export function HomeFeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section
      aria-labelledby="featured-heading"
      className="container-site py-20 lg:py-24"
    >
      <div className="flex items-end justify-between gap-8 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            What customers are buying
          </p>
          <h2
            id="featured-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight"
          >
            The systems we ship most often.
          </h2>
        </div>
        <Link
          href="/shop/water-filters"
          className="hidden md:inline-flex text-sm font-medium text-brand hover:text-brand-700 transition-colors duration-fast items-center gap-1.5"
        >
          Shop water filters
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-5">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
