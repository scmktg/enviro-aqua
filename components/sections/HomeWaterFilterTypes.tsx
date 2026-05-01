import Link from "next/link";
import Image from "next/image";
import { getProductsBySubCategory } from "@/lib/catalogue";

/**
 * The water-filter category dominates this page. This is intentional:
 * Enviro Aqua is a water-filter specialist first. By giving the four
 * filter types their own dedicated section — each with a real product,
 * rich descriptive copy, and individual H3s — we signal to Google that
 * /shop/water-filters and its sub-categories are the primary topic of
 * the site.
 *
 * The keyword targets, one per card:
 *  - "whole house water filter Australia"
 *  - "under sink water filter Australia"
 *  - "bench top water filter Australia"
 *  - "reverse osmosis system Australia"
 *
 * Layout: 2x2 grid on desktop, stacked on mobile. Each card is a real
 * product anchor — clicking goes to the sub-category PLP, not a marketing
 * page.
 */
const FILTER_TYPES = [
  {
    slug: "whole-house",
    title: "Whole House Water Filters",
    eyebrow: "For the entire property",
    body: "Big Blue 10\" and 20\" point-of-entry systems. Filter every tap, shower and appliance — chlorine, sediment, taste and odour reduced before water reaches the home. The right choice for owners on town water who want filtered water everywhere, not just the kitchen.",
    productSubCategory: "whole-house",
    bestFor: "Town water · Chlorine · Hot-water protection",
  },
  {
    slug: "under-sink",
    title: "Under Sink Water Filters",
    eyebrow: "For drinking water at the kitchen",
    body: "Hidden 2-stage and 3-stage filtration with a dedicated drinking-water tap. Bottled-quality water on demand, no countertop clutter, no plumbing surprises. The standard for Australian kitchens — pair with a 3-way mixer or a separate small-bore faucet.",
    productSubCategory: "under-sink",
    bestFor: "Owners · Drinking water · Cleaner installs",
  },
  {
    slug: "bench-top",
    title: "Bench Top Water Filters",
    eyebrow: "For renters & no-plumbing setups",
    body: "Counter-mounted filters that connect to your existing tap with a diverter. No plumber, no landlord conversation, uninstalls in five minutes. Genuine carbon-block filtration — same media as the hard-plumbed range — without the install.",
    productSubCategory: "bench-top",
    bestFor: "Renters · Holiday homes · Quick installs",
  },
  {
    slug: "reverse-osmosis",
    title: "Reverse Osmosis Systems",
    eyebrow: "For the highest-grade reduction",
    body: "Five-stage RO under-sink units that reduce fluoride, PFAS, lead and total dissolved solids by up to 99%. The only residential filtration that meaningfully addresses these contaminants. Pair with a dedicated RO faucet or a 3-way kitchen mixer.",
    productSubCategory: "reverse-osmosis",
    bestFor: "Fluoride · PFAS · Bore water · TDS",
  },
];

export function HomeWaterFilterTypes() {
  return (
    <section
      aria-labelledby="filter-types-heading"
      className="container-site py-20 lg:py-28"
    >
      <header className="max-w-3xl mb-12 lg:mb-16">
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          Water filters Australia
        </p>
        <h2
          id="filter-types-heading"
          className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
        >
          Four filter types. One for every Australian setup.
        </h2>
        <p className="text-base text-ink/80 mt-4 leading-relaxed">
          Whether you own or rent, drink only at the kitchen or want every tap
          treated, on town water or tank — there&rsquo;s one right system.
          We&rsquo;ll spec it. Same price retail or trade.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {FILTER_TYPES.map((type) => {
          const products = getProductsBySubCategory(
            "water-filters",
            type.productSubCategory
          );
          const hero = products[0];
          const href = `/shop/water-filters/${type.slug}`;
          return (
            <Link
              key={type.slug}
              href={href}
              className="group block bg-paper border border-line hover:border-ink rounded-sm overflow-hidden transition-colors duration-fast"
            >
              <article className="grid grid-cols-1 sm:grid-cols-[1fr_180px] h-full">
                <div className="p-6 lg:p-8 flex flex-col">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand mb-2 font-medium">
                    {type.eyebrow}
                  </p>
                  <h3 className="text-xl lg:text-2xl font-semibold tracking-tight">
                    {type.title}
                  </h3>
                  <p className="text-sm text-ink/80 mt-3 leading-relaxed flex-1">
                    {type.body}
                  </p>
                  <div className="mt-5 pt-5 border-t border-line">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted mb-1.5">
                      Best for
                    </p>
                    <p className="text-sm text-ink">{type.bestFor}</p>
                  </div>
                  <p className="text-sm font-medium text-brand mt-5 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast">
                    Shop {type.title.toLowerCase()}
                    <span aria-hidden>→</span>
                  </p>
                </div>
                {hero?.images[0] && (
                  <div className="relative bg-mist h-48 sm:h-auto">
                    <Image
                      src={hero.images[0]}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 180px, 100vw"
                      className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
              </article>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
        <Link
          href="/shop/water-filters"
          className="font-medium text-brand hover:text-brand-700 transition-colors duration-fast inline-flex items-center gap-1.5"
        >
          Browse the full water filter range
          <span aria-hidden>→</span>
        </Link>
        <span className="hidden sm:inline text-muted">·</span>
        <Link
          href="/shop/water-filters/replacement-cartridges"
          className="font-medium text-ink hover:text-brand transition-colors duration-fast inline-flex items-center gap-1.5"
        >
          Replacement filter cartridges
          <span aria-hidden>→</span>
        </Link>
        <span className="hidden sm:inline text-muted">·</span>
        <Link
          href="/shop/water-filters/uv-sterilisation"
          className="font-medium text-ink hover:text-brand transition-colors duration-fast inline-flex items-center gap-1.5"
        >
          UV sterilisers for tank water
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
