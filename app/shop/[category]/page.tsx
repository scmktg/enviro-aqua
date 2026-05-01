import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductsByCategory,
  summariseFacets,
  filterProducts,
  sortProducts,
  getPopularForCategory,
  type SortKey,
} from "@/lib/catalogue";
import { getCategory, CATEGORIES } from "@/lib/categories";
import { CategoryLandingHeader } from "@/components/sections/CategoryLanding";
import { FilterRail } from "@/components/sections/FilterRail";
import { ActiveFilters } from "@/components/sections/ActiveFilters";
import { SortMenu } from "@/components/sections/SortMenu";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { PopularRail } from "@/components/sections/PopularRail";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};
  return {
    title: `${category.heading} — Australia-wide Delivery`,
    description: category.subhead,
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
 * Build the active-facet map from URL searchParams, ignoring control keys
 * (sort, page, q) so they don't end up applied as facet filters.
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
  const { category: categorySlug } = await params;
  const sp = await searchParams;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const all = getProductsByCategory(category.slug);
  const facets = summariseFacets(all);
  const active = buildActiveFacets(sp);
  const filtered = filterProducts(all, active);
  const sortKey = (sp.sort as SortKey | undefined) ?? "featured";
  const products = sortProducts(filtered, sortKey);
  const hasActiveFilters = Object.keys(active).length > 0;
  const popular = hasActiveFilters ? [] : getPopularForCategory(category.slug);
  const showRail = facets.length > 0;

  const trail = [
    { label: "Home", url: "/" },
    { label: category.name, url: `/shop/${category.slug}` },
  ];

  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs trail={trail.map((t) => ({ label: t.label, href: t.url }))} />
      <div className="mt-6">
        <CategoryLandingHeader category={category} />
      </div>

      {popular.length > 0 && (
        <PopularRail
          products={popular}
          heading={popularHeadingFor(category.slug)}
          subhead={popularSubheadFor(category.slug)}
        />
      )}

      <div
        className={`grid grid-cols-1 gap-10 lg:gap-12 mt-12 lg:mt-16 ${
          showRail ? "lg:grid-cols-[240px_minmax(0,1fr)]" : ""
        }`}
      >
        {showRail && <FilterRail facets={facets} />}
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="text-sm text-muted tabular">
              <span className="text-ink font-medium">{products.length}</span>{" "}
              {products.length === 1 ? "product" : "products"}
            </p>
            <SortMenu />
          </div>
          <ActiveFilters />
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

function popularHeadingFor(slug: string): string {
  switch (slug) {
    case "water-filters":
      return "The four systems we ship most often.";
    case "commercial-bubblers":
      return "What schools, gyms and offices are specifying.";
    case "kitchen-taps":
      return "Most-installed kitchen taps.";
    case "bathroom":
      return "Bathroom essentials.";
    default:
      return "Most popular.";
  }
}

function popularSubheadFor(slug: string): string | undefined {
  switch (slug) {
    case "water-filters":
      return "Hand-picked across whole-house, under-sink, RO and bench-top — one for every common Australian setup.";
    case "commercial-bubblers":
      return "WaterMark certified, vandal-resistant 304 stainless, multi-site quoting available.";
    default:
      return undefined;
  }
}
