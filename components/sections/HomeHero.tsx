import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { getProductBySlug } from "@/lib/catalogue";
import { BUSINESS } from "@/lib/business";
import { INSTALL_PACKAGE } from "@/lib/install-package";

/**
 * Hero is two parallel value propositions:
 *   Left  — Australia-wide ecommerce: shop water filters and bubblers,
 *           same-day dispatch, primary commercial signal
 *   Right — Central Coast install package as a local-only add-on,
 *           clearly labelled so out-of-area visitors don't think this
 *           is a local-only business
 *
 * Sizing strategy:
 *   - On desktop (lg+), the hero fills the viewport minus the sticky
 *     header (100px) and clamps to a sane minimum so it doesn't crush
 *     on tall narrow desktops. Everything inside both columns is
 *     vertically centred.
 *   - On mobile/tablet, content flows naturally without height
 *     constraints — phones can scroll, no need to compress.
 *
 * The H1 lives in the left column and carries the brand-level keyword
 * cluster. The supporting sections below the hero (HomeWaterFilterTypes,
 * HomeBubblerSpotlight, HomeLocalArea) carry deeper keyword work — the
 * hero stays sharp and uncluttered.
 */
export function HomeHero() {
  const featured = getProductBySlug(
    "premium-three-stage-big-blue-whole-house-water-filter-system"
  );

  return (
    <section
      aria-label="Enviro Aqua — Australian water filter specialists"
      className="border-b border-line lg:h-[calc(100vh-100px)] lg:min-h-[640px] lg:max-h-[860px] lg:flex lg:items-center"
    >
      <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 py-12 lg:py-0 items-center w-full">
        {/* Left — the ecommerce offer (primary) */}
        <div className="lg:col-span-7 flex flex-col">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-5">
            Australia-wide shipping · Same price retail or trade
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] font-semibold tracking-tight leading-[1.05]">
            Australia&rsquo;s water filter specialists.
          </h1>
          <p className="text-base lg:text-lg text-ink/75 mt-5 lg:mt-6 max-w-prose leading-relaxed">
            Whole-house, under-sink, bench-top and reverse osmosis water
            filters. WaterMark-certified commercial bubblers. Same-day
            dispatch from Wyong NSW on orders before {BUSINESS.dispatch.cutoffTime}.
          </p>

          <div className="mt-7 lg:mt-8 flex flex-col sm:flex-row gap-3">
            <ButtonLink href="/shop/water-filters" size="lg">
              Shop water filters
            </ButtonLink>
            <ButtonLink
              href="/shop/drinking-bubblers"
              size="lg"
              variant="ghost"
            >
              Shop bubblers
            </ButtonLink>
          </div>

          {/* Inline shipping reassurance — the "we're a real ecom site" beat */}
          <ul className="mt-8 lg:mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-x-6 sm:gap-y-0 text-sm text-ink/75">
            {[
              `Same-day dispatch · before ${BUSINESS.dispatch.cutoffTime}`,
              "Tracked freight, every postcode",
              "Free Click & Collect — Wyong",
            ].map((point, i) => (
              <li key={point} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span aria-hidden className="hidden sm:inline text-muted">
                    ·
                  </span>
                )}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4 text-brand flex-shrink-0"
                  aria-hidden
                >
                  <path
                    d="m3.5 8.5 3 3 6-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/*
          Right — Central Coast install package, clearly labelled as a
          LOCAL service. The "Central Coast NSW only" framing is
          deliberate and prominent so out-of-area visitors don't think
          we're a local-only business.
        */}
        {featured && (
          <Link
            href="/install/whole-house"
            className="lg:col-span-5 group block"
          >
            <article className="relative bg-mist overflow-hidden h-full flex flex-col">
              {/* Banner — local-only label is the FIRST thing the eye lands on */}
              <div className="bg-ink text-paper px-5 py-3 flex items-center gap-2.5 flex-shrink-0">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4 text-paper/70 flex-shrink-0"
                  aria-hidden
                >
                  <path
                    d="M8 1.5c2.5 0 4.5 2 4.5 4.5 0 3.5-4.5 8.5-4.5 8.5S3.5 9.5 3.5 6c0-2.5 2-4.5 4.5-4.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="8" cy="6" r="1.5" fill="currentColor" />
                </svg>
                <p className="text-xs uppercase tracking-[0.16em] font-medium">
                  Central Coast Residents · Installation package
                </p>
              </div>

              <div className="relative flex-1 min-h-[240px]">
                <Image
                  src={featured.images[0]!}
                  alt="Triple Big Blue whole-house water filter — Central Coast install package"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-contain p-8 lg:p-10 transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>

              <div className="bg-paper border-t border-line px-5 py-5 flex-shrink-0">
                <p className="text-base font-medium text-ink leading-snug">
                  Whole-house filter, professionally installed.
                </p>
                <p className="text-sm text-muted mt-1 leading-relaxed">
                  Triple Big Blue + licensed local plumber + 12 months of
                  cartridges, all-inclusive.
                </p>
                <div className="flex items-end justify-between mt-4 pt-4 border-t border-line">
                  <div>
                    <p className="text-2xl font-semibold tracking-tight tabular text-ink leading-none">
                      ${INSTALL_PACKAGE.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted mt-1">
                      Inc. GST · No payment now
                    </p>
                  </div>
                  <span className="text-sm font-medium text-brand inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast">
                    Request install
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