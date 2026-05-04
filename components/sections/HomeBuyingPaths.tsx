import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/lib/catalogue";

/**
 * Four buying paths reframed by NEED, not by property type.
 *
 * The four routes land on three distinct PLPs in the 3-tier structure:
 * whole-house and reverse-osmosis are their own pages; under-sink and
 * bench-top share the under-sink PLP (the catalogue keeps bench-top as a
 * hero handle but they live under the same under-sink sub-category for
 * routing). Hero images are pinned to specific product handles to keep
 * each card visually distinct.
 *
 *   1. Every tap        → whole-house PLP
 *   2. One tap, plumbed → under-sink PLP
 *   3. One tap, no install → bench-top PLP
 *   4. Highest grade    → reverse-osmosis PLP
 */
const PATHS = [
  {
    slug: "whole-house",
    eyebrow: "Every tap",
    title: "Filtered water everywhere",
    body: "From the kitchen sink to the laundry, the showers and the garden tap. One filter at the mains line treats every drop in the house. The choice for owners on town water who don't want filtered water gated to one outlet.",
    bestFor: "Showers, washing machines, kettle, every tap",
    heroHandle: "premium-three-stage-big-blue-whole-house-water-filter-system",
    href: "/shop/water-filters/whole-house",
    feature: "Most popular for families",
  },
  {
    slug: "under-sink",
    eyebrow: "One tap · plumbed in",
    title: "Drinking water at the kitchen — invisible install",
    body: "Filter housing hidden in the cupboard, dedicated tap on the bench (or routed through a 3-way mixer). Bottled-quality water on demand. No countertop clutter. Suits owners and renters with landlord approval.",
    bestFor: "Kitchen drinking water without bench clutter",
    heroHandle: "under-sink-water-filter-2-stage-sediment-carbon",
    href: "/shop/water-filters/under-sink",
    feature: "Cleanest install",
  },
  {
    slug: "bench-top",
    eyebrow: "One tap · no plumbing",
    title: "Filtered drinking water in five minutes",
    body: "Connects to your existing kitchen tap with a simple diverter — no plumber, no holes, no landlord conversation. Uninstalls cleanly when you move. Same filtration media as the plumbed-in range.",
    bestFor: "Renters, holiday homes, quick installs",
    heroHandle: "bench-top-water-filter-sediment-carbon-2-stage",
    href: "/shop/water-filters/bench-top",
    feature: "Renter friendly",
  },
  {
    slug: "reverse-osmosis",
    eyebrow: "Highest reduction",
    title: "Reverse osmosis — fluoride, PFAS, dissolved solids",
    body: "The only residential technology that meaningfully reduces fluoride, PFAS, lead, nitrate and total dissolved solids. Plumbs in under the sink alongside (or instead of) a standard filter. The right call when carbon block isn't enough.",
    bestFor: "Fluoride · PFAS · TDS · Bore water",
    heroHandle: "under-sink-water-filter-6-stage-reverse-osmosis-system",
    href: "/shop/water-filters/reverse-osmosis",
    feature: "Most reduction",
  },
];

export function HomeBuyingPaths() {
  return (
    <section
      aria-labelledby="paths-heading"
      className="container-site py-20 lg:py-28"
    >
      <header className="max-w-3xl mb-12 lg:mb-16">
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          Choose your setup
        </p>
        <h2
          id="paths-heading"
          className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
        >
          Where do you want filtered water?
        </h2>
        <p className="text-base text-ink/80 mt-4 leading-relaxed">
          Four ways to filter, by where the water needs to be clean. Pick
          the one that matches your situation — we&rsquo;ll spec the
          specific system from there.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {PATHS.map((path) => {
          const hero = getProductBySlug(path.heroHandle);
          return (
            <Link
              key={path.slug}
              href={path.href}
              className="group block bg-paper border border-line hover:border-ink rounded-sm overflow-hidden transition-colors duration-fast"
            >
              <article className="grid grid-cols-1 sm:grid-cols-[1fr_180px] h-full">
                <div className="p-6 lg:p-8 flex flex-col">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand mb-2 font-medium">
                    {path.eyebrow}
                  </p>
                  <h3 className="text-xl lg:text-[22px] font-semibold tracking-tight leading-snug">
                    {path.title}
                  </h3>
                  <p className="text-sm text-ink/80 mt-3 leading-relaxed flex-1">
                    {path.body}
                  </p>
                  <div className="mt-5 pt-5 border-t border-line">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted mb-1.5">
                      Best for
                    </p>
                    <p className="text-sm text-ink">{path.bestFor}</p>
                  </div>
                  <p className="text-sm font-medium text-brand mt-5 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast">
                    Shop {path.eyebrow.split(" · ")[0].toLowerCase()}
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
    </section>
  );
}