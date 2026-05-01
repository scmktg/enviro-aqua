import type { Metadata } from "next";
import { searchProducts } from "@/lib/search";
import { getAllProducts } from "@/lib/catalogue";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q}` : "Search",
    robots: { index: false, follow: true },
    alternates: { canonical: "/search" },
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results =
    query.length >= 2
      ? searchProducts(getAllProducts(), query, 60).map((r) => r.product)
      : [];

  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Search", href: "/search" },
        ]}
      />
      <header className="mt-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {query ? `Results for “${query}”` : "Search the catalogue"}
        </h1>
        {query && (
          <p className="text-base text-muted mt-2 tabular">
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>
        )}
      </header>

      <div className="mt-10">
        {query.length < 2 ? (
          <p className="text-base text-muted">
            Open the search bar in the header to look up products by name, SKU
            or contaminant.
          </p>
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </div>
  );
}
