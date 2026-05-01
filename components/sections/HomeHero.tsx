import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getProductBySlug } from "@/lib/catalogue";
import { Price } from "@/components/ui/Price";
import { BUSINESS } from "@/lib/business";

/**
 * Hero is a 2-column layout, not a centered-headline-over-photo. Left side
 * carries the conversion thesis (what / for whom / why) in three readable
 * blocks; right side anchors a real product with a real price so the
 * homepage isn't selling vibes — it's selling stock.
 *
 * Above the H1 sits the SEO-aware eyebrow ("Water Filters · Commercial
 * Bubblers · Australia-wide") so the first text on the page contains the
 * primary keyword cluster.
 */
export function HomeHero() {
  const featured = getProductBySlug(
    "triple-big-blue-whole-house-water-filter-20-x-4-5-3-stage"
  );

  return (
    <section
      aria-label="Enviro Aqua — Australian water filter specialists"
      className="border-b border-line"
    >
      <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-14 lg:py-20">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-5">
            Water Filters Australia · Whole House · Under Sink · RO · Bubblers
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Australia&rsquo;s water filter specialists.
            <span className="block text-muted mt-2">
              Same price, retail or trade.
            </span>
          </h1>
          <p className="text-lg text-ink/80 mt-7 max-w-prose leading-relaxed">
            Whole-house, under-sink, bench-top and reverse osmosis water
            filters — plus WaterMark-certified commercial drinking bubblers
            for schools, gyms and offices. Australian-stocked, plumber-grade,
            shipped from our Wyong NSW warehouse on the Central Coast.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <ButtonLink href="/help/which-filter" size="lg">
              Use the filter finder
            </ButtonLink>
            <ButtonLink href="/shop/water-filters" size="lg" variant="ghost">
              Shop water filters
            </ButtonLink>
          </div>

          <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm">
            {[
              "Australian-stocked range",
              `Same-day dispatch (before ${BUSINESS.dispatch.cutoffTime})`,
              "Click & Collect — Wyong",
              "Trade-friendly pricing",
              "Plumber-grade product",
              "Real humans on chat",
            ].map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-ink/80"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4 text-brand flex-shrink-0 mt-0.5"
                  aria-hidden
                >
                  <path
                    d="m3.5 8.5 3 3 6-7"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {featured && (
          <Link
            href={`/product/${featured.slug}`}
            className="lg:col-span-5 group block"
          >
            <article className="relative bg-mist h-full p-8 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <Badge tone="brand">Best seller — whole house</Badge>
                <Badge tone="outline">In stock</Badge>
              </div>
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={featured.images[0]!}
                  alt={`${featured.title} — front view`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  priority
                />
              </div>
              <div className="mt-6 pt-6 border-t border-line">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">
                  Triple Big Blue · 20&Prime; × 4.5&Prime;
                </p>
                <h2 className="text-lg font-medium mt-1.5 tracking-tight">
                  3-stage whole-house filtration. Treats every tap.
                </h2>
                <div className="flex items-end justify-between mt-4">
                  <Price amount={featured.price} size="xl" showIncTax />
                  <span className="text-sm font-medium text-brand inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast">
                    Shop now
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}
      </div>
    </section>
  );
}
