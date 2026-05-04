import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getProductsBySubCategory,
  summariseFacets,
  filterProducts,
  sortProducts,
  mergeProductStates,
  type SortKey,
} from "@/lib/catalogue";
import { getProductStates } from "@/lib/shopify/product-state";
import { getSubCategory, CATEGORIES } from "@/lib/categories";
import { FilterRail } from "@/components/sections/FilterRail";
import { ActiveFilters } from "@/components/sections/ActiveFilters";
import { SortMenu } from "@/components/sections/SortMenu";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];
  for (const cat of CATEGORIES) {
    for (const sub of cat.subCategories) {
      params.push({ category: cat.slug, subcategory: sub.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: c, subcategory: s } = await params;
  const found = getSubCategory(c, s);
  if (!found) return {};
  const { category, sub } = found;
  return {
    title: `${sub.heading} — Australia-wide Delivery`,
    description: sub.intro,
    alternates: {
      canonical: `/shop/${category.slug}/${sub.slug}`,
    },
    openGraph: {
      title: `${sub.heading} | Enviro Aqua`,
      description: sub.intro,
      url: `/shop/${category.slug}/${sub.slug}`,
    },
  };
}

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

export default async function SubCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category: c, subcategory: s } = await params;
  const sp = await searchParams;
  const found = getSubCategory(c, s);
  if (!found) notFound();
  const { category, sub } = found;

  const hardcoded = getProductsBySubCategory(category.slug, sub.slug);
  // Merge live Shopify price/stock BEFORE filter/sort so price-sort respects
  // live prices and stock filters operate on real availability.
  const states = await getProductStates(hardcoded.map((p) => p.slug));
  const all = mergeProductStates(hardcoded, states);
  const facets = summariseFacets(all);
  const active = buildActiveFacets(sp);
  const filtered = filterProducts(all, active);
  const sortKey = (sp.sort as SortKey | undefined) ?? "featured";
  const products = sortProducts(filtered, sortKey);

  const trail = [
    { label: "Home", url: "/" },
    { label: category.name, url: `/shop/${category.slug}` },
    { label: sub.name, url: `/shop/${category.slug}/${sub.slug}` },
  ];

  const showRail = facets.length > 0;

  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs trail={trail.map((t) => ({ label: t.label, href: t.url }))} />

      <header className="mt-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {sub.heading}
        </h1>
        <p className="text-base text-ink/75 mt-4 max-w-prose leading-relaxed">
          {sub.intro}
        </p>
      </header>

      <div
        className={`grid grid-cols-1 gap-10 lg:gap-12 mt-10 ${
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