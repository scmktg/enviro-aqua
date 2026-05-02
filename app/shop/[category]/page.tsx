import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getProductsByCategory,
  summariseFacets,
  filterProducts,
  sortProducts,
  type SortKey,
} from "@/lib/catalogue";
import { getCategory, CATEGORIES } from "@/lib/categories";
import { FilterRail } from "@/components/sections/FilterRail";
import { ActiveFilters } from "@/components/sections/ActiveFilters";
import { SortMenu } from "@/components/sections/SortMenu";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CategoryLandingHeader } from "@/components/sections/CategoryLanding";
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: c } = await params;
  const category = getCategory(c);
  if (!category) return {};
  return {
    title: `${category.heading} — ${category.subhead}`,
    description: category.intro,
    alternates: {
      canonical: `/shop/${category.slug}`,
    },
    openGraph: {
      title: `${category.heading} | Enviro Aqua`,
      description: category.subhead,
      url: `/shop/${category.slug}`,
    },
  };
}

/**
 * Convert the searchParams object into the {key: string[]} shape that
 * filterProducts expects. We strip query-string keys that aren't facets
 * (sort, page, q) so they don't get treated as filter values.
 */
function buildActiveFacets(
  searchParams: Record<string, string | string[] | undefined>
): Record<string, string[]> {
  const ignore = new Set(["sort", "page", "q"]);
  const out: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (ignore.has(key) || value === undefined) continue;
    out[key] = Array.isArray(value) ? value : [value];
  }
  return out;
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category: c } = await params;
  const sp = await searchParams;
  const category = getCategory(c);
  if (!category) notFound();

  const all = getProductsByCategory(category.slug);
  const facets = summariseFacets(all);
  const active = buildActiveFacets(sp);
  const filtered = filterProducts(all, active);
  const sortKey = (sp.sort as SortKey | undefined) ?? "featured";
  const products = sortProducts(filtered, sortKey);

  const trail = [
    { label: "Home", url: "/" },
    { label: "Shop", url: "/shop" },
    { label: category.name, url: `/shop/${category.slug}` },
  ];

  const showRail = facets.length > 0;

  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={trail.map((t) => ({ label: t.label, href: t.url }))}
      />

      <div className="mt-6">
        <CategoryLandingHeader category={category} />
      </div>

      <div
        className={`grid grid-cols-1 gap-10 lg:gap-12 mt-12 ${
          showRail ? "lg:grid-cols-[240px_minmax(0,1fr)]" : ""
        }`}
      >
        <Suspense fallback={null}>
          {showRail && <FilterRail facets={facets} />}
        </Suspense>
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="text-sm text-muted tabular">
              <span className="text-ink font-medium">{products.length}</span>{" "}
              {products.length === 1 ? "product" : "products"}
            </p>
            <Suspense fallback={null}>
              <SortMenu />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <ActiveFilters />
          </Suspense>
          <ProductGrid products={products} />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail) }}
      />
    </div>
  );
}