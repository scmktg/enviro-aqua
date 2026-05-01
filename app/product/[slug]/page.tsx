import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getCrossSell, getAllProducts } from "@/lib/catalogue";
import { getCategory } from "@/lib/categories";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Gallery } from "@/components/sections/Pdp/Gallery";
import { BuyBox } from "@/components/sections/Pdp/BuyBox";
import { SpecsTable } from "@/components/sections/Pdp/SpecsTable";
import { FitsWith } from "@/components/sections/Pdp/FitsWith";
import { TrustBlock } from "@/components/sections/Pdp/TrustBlock";
import { CrossSell } from "@/components/sections/Pdp/CrossSell";
import { LongDescription } from "@/components/sections/Pdp/LongDescription";
import { Button } from "@/components/ui/Button";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const ogImage = product.images[0];

  return {
    title: product.seoTitle || product.title,
    description: product.seoDescription || product.shortDescription,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      url: `/product/${product.slug}`,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.primaryCategory);
  const crossSell = getCrossSell(product);

  const trail = [
    { label: "Home", url: "/" },
    {
      label: category?.name ?? "Shop",
      url: `/shop/${product.primaryCategory}`,
    },
    {
      label: product.title,
      url: `/product/${product.slug}`,
    },
  ];

  return (
    <article className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={trail.map((t) => ({ label: t.label, href: t.url }))}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-8">
        <div className="lg:col-span-7">
          <Gallery images={product.images} alt={product.title} />
        </div>
        <div className="lg:col-span-5">
          <BuyBox product={product} />
          <FitsWith product={product} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-12 lg:mt-16">
        <div className="lg:col-span-7">
          <h2 className="text-base font-semibold tracking-tight mb-4">
            About this {product.subCategory.replaceAll("-", " ")}
          </h2>
          <LongDescription text={product.longDescription} />

          {/* CTA repeat after the long-form content — the brief specifically
              calls for this. Buyers who scroll past the spec table and read
              the long description are at the highest intent. We render this
              as an anchor styled like a button, since it's a same-page jump
              rather than a button action. */}
          <div className="mt-8 pt-6 border-t border-line">
            <a
              href="#main"
              aria-label={`Back to ${product.title} buy box`}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 text-base font-medium bg-brand text-paper hover:bg-brand-700 rounded-sm transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Add to cart from above ↑
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <SpecsTable product={product} />
        </div>
      </div>

      <TrustBlock />

      <CrossSell products={crossSell} context={product} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd(product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail) }}
      />
    </article>
  );
}
