import Link from "next/link";
import Image from "next/image";
import { getProductBySlug, mergeProductState } from "@/lib/catalogue";
import { getProductStates } from "@/lib/shopify/product-state";
import { Price } from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Bubbler section now showcases all three of our WaterMark-certified
 * commercial bubblers (the only category where every SKU genuinely
 * carries WaterMark to AS/NZS 3497). Routes to a dedicated commercial
 * landing page rather than the regular sub-category PLP because the
 * B2B buyer needs different context (compliance documentation,
 * fit-out spec sheets, multi-site quoting) than a retail shopper.
 */
const FEATURED_BUBBLERS = [
  "commercial-water-bubbler-filtered-stainless-steel-watermark-certified-square-des",
  "commercial-stainless-steel-filtered-cold-water-bubbler-round-wm",
  "commercial-rust-free-filtered-cold-water-bubbler-wm",
];

export async function HomeBubblerSpotlight() {
  const hardcoded = FEATURED_BUBBLERS.map((slug) =>
    getProductBySlug(slug)
  ).filter((b): b is NonNullable<typeof b> => Boolean(b));

  if (hardcoded.length === 0) return null;

  const states = await getProductStates(hardcoded.map((p) => p.slug));
  const bubblers = hardcoded.map((p) =>
    mergeProductState(p, states.get(p.slug) ?? null)
  );

  return (
    <section
      aria-labelledby="bubbler-heading"
      className="container-site py-20 lg:py-24"
    >
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            Commercial drinking water · WaterMark certified
          </p>
          <h2
            id="bubbler-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
          >
            Filtered drinking bubblers for schools, gyms and offices.
          </h2>
        </div>
        <p className="lg:col-span-5 text-base text-ink/80 leading-relaxed lg:pt-8">
          Three commercial-grade models, all WaterMark certified to
          AS/NZS 3497, all 304 stainless steel, all in stock at our
          Wyong warehouse for next-day dispatch. Specified by Australian
          schools, gyms, councils and body corporates since 2019.
        </p>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {bubblers.map((bubbler) => (
          <li key={bubbler.id}>
            <Link
              href="/bubblers-and-coolers"
              className="group block h-full bg-paper border border-line hover:border-ink rounded-sm overflow-hidden transition-colors duration-fast"
            >
              <article className="h-full flex flex-col">
                <div className="relative aspect-[4/3] bg-mist">
                  {bubbler.images[0] && (
                    <Image
                      src={bubbler.images[0]}
                      alt={bubbler.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  )}
                  <span className="absolute top-3 left-3 inline-flex items-center h-6 px-2 bg-paper border border-line text-xs font-medium text-ink rounded-sm">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-3 h-3 text-brand mr-1.5"
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
                    WaterMark certified
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-semibold tracking-tight leading-snug flex-1">
                    {bubbler.title.replace(
                      " — WaterMark Certified",
                      ""
                    )}
                  </h3>
                  <div className="flex items-end justify-between mt-4 pt-4 border-t border-line">
                    <Price amount={bubbler.price} size="md" />
                    <span className="text-sm font-medium text-brand inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast">
                      View
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <ButtonLink href="/bubblers-and-coolers">
          View commercial bubbler range
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Get a multi-site quote
        </ButtonLink>
      </div>
    </section>
  );
}