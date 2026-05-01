import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/catalogue";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shop — Water Filters, Bubblers, Kitchen Taps & Bathroom",
  description:
    "Shop the Enviro Aqua catalogue — water filtration, WaterMark-certified commercial drinking bubblers, kitchen taps and a focused bathroom range. Australia-wide delivery.",
  alternates: {
    canonical: "/shop",
  },
};

export default function ShopIndexPage() {
  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
        ]}
      />
      <header className="mt-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Shop the catalogue
        </h1>
        <p className="text-lg text-ink/80 mt-3 max-w-prose">
          Four categories. Same price retail or trade. Each product page lists
          the certifications that specific item carries.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
        {CATEGORIES.map((cat) => {
          const sample = getProductsByCategory(cat.slug)[0];
          return (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group block bg-mist border border-line hover:border-ink rounded-sm overflow-hidden transition-colors duration-fast"
            >
              <div className="relative aspect-[16/9] bg-paper">
                {sample?.images[0] && (
                  <Image
                    src={sample.images[0]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain p-10 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <div className="p-6 lg:p-8">
                <h2 className="text-xl font-semibold tracking-tight">
                  {cat.heading}
                </h2>
                <p className="text-sm text-ink/75 mt-2 leading-relaxed">
                  {cat.subhead}
                </p>
                <p className="text-sm font-medium text-brand mt-4 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast">
                  Shop {cat.name.toLowerCase()}
                  <span aria-hidden>→</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
