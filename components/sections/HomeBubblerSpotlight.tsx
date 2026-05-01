import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/lib/catalogue";
import { Price } from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Bubbler spotlight — secondary priority for SEO, deserves its own beat.
 * Layout is asymmetric (60/40 image/copy) and differs from the hero
 * (which was copy-left, image-right). This avoids a stacked-blocks rhythm.
 *
 * Real product, real price. The copy speaks to the actual buyer
 * (procurement, facilities) rather than retail romance.
 */
export function HomeBubblerSpotlight() {
  const bubbler = getProductBySlug(
    "commercial-filtered-water-bubbler-square-stainless-steel-watermark-certified"
  );

  if (!bubbler) return null;

  return (
    <section
      aria-labelledby="bubbler-heading"
      className="container-site py-20 lg:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <Link
          href={`/product/${bubbler.slug}`}
          className="lg:col-span-7 group block"
        >
          <div className="relative aspect-[4/3] bg-mist rounded-sm overflow-hidden">
            {bubbler.images[0] && (
              <Image
                src={bubbler.images[0]}
                alt={`${bubbler.title} — for schools, gyms and offices`}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-contain p-12 transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
          </div>
        </Link>
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-4">
            Commercial Bubblers
          </p>
          <h2
            id="bubbler-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
          >
            Filtered drinking water for high-traffic Australian sites.
          </h2>
          <p className="text-base text-ink/80 mt-5 leading-relaxed">
            WaterMark certified. 304 stainless steel. Direct-connect to mains
            with a built-in filter. Specified by schools, fitness chains and
            councils across Australia. Multi-site project pricing on five units
            or more.
          </p>

          <ul className="mt-7 space-y-3 text-sm">
            {[
              "WaterMark certified to AS/NZS 3497",
              "Vandal-resistant 304 stainless construction",
              "Pre-filter + carbon block included",
              "Annual service kit available",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-ink/80">
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

          <div className="mt-8 pt-6 border-t border-line flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted mb-1">
                From
              </p>
              <Price amount={bubbler.price} size="xl" showIncTax />
            </div>
            <ButtonLink href="/shop/commercial-bubblers">Shop bubblers</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
