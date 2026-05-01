import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/lib/catalogue";

/**
 * Kitchen taps pairing section. Positioned AFTER the filter sections and
 * AFTER the bubbler section — kitchen taps are presented as the
 * accessory that completes a water filter install, not as a competing
 * category. This is deliberate for SEO: we want Google to associate
 * "kitchen tap" pages with filtration intent, not generic tapware.
 *
 * Three product types lead the section, each linking through to its
 * sub-category. Visually it's a 3-up image strip — different rhythm
 * to the 2-up filter cards above so the page doesn't feel like one
 * grid pattern repeated.
 */
const TAP_TYPES = [
  {
    slug: "ro-3way-taps",
    label: "3-Way RO Mixers",
    productSlug: "luxurious-3-way-ro-tap-matte-black-or-brushed-nickel",
    blurb: "One tap, three streams: hot, cold and filtered RO.",
  },
  {
    slug: "dedicated-ro-taps",
    label: "Dedicated RO Faucets",
    productSlug: "premium-reverse-osmosis-drinking-water-faucet-nsf-certified",
    blurb: "A separate small-bore tap for filtered drinking water only.",
  },
  {
    slug: "mixer-taps",
    label: "Kitchen Mixers",
    productSlug: "modern-pull-down-kitchen-mixer-brushed-nickel",
    blurb: "Standard pull-out and gooseneck mixers, WELS rated.",
  },
];

export function HomeKitchenTapsPairing() {
  return (
    <section
      aria-labelledby="taps-heading"
      className="border-t border-line"
    >
      <div className="container-site py-20 lg:py-24">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
              Pairs with your filter
            </p>
            <h2
              id="taps-heading"
              className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
            >
              Kitchen taps for filtered drinking water.
            </h2>
          </div>
          <p className="lg:col-span-6 text-base text-ink/80 leading-relaxed lg:pt-8">
            The right tap finishes the install. We stock dedicated RO faucets
            for under-sink reverse osmosis systems, 3-way mixers that combine
            hot, cold and filtered water in a single fixture, and a small
            range of standard kitchen mixers. WELS rated, made for Australian
            35mm sink cut-outs.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {TAP_TYPES.map((tap) => {
            const product = getProductBySlug(tap.productSlug);
            return (
              <Link
                key={tap.slug}
                href={`/shop/kitchen-taps/${tap.slug}`}
                className="group block bg-mist rounded-sm overflow-hidden border border-line hover:border-ink transition-colors duration-fast"
              >
                <div className="relative aspect-[4/5]">
                  {product?.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-contain p-10 transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <div className="p-5 bg-paper border-t border-line">
                  <h3 className="text-base font-semibold tracking-tight">
                    {tap.label}
                  </h3>
                  <p className="text-sm text-ink/75 mt-1.5 leading-relaxed">
                    {tap.blurb}
                  </p>
                  <p className="text-sm font-medium text-brand mt-3 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast">
                    Shop
                    <span aria-hidden>→</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
