import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { getProductBySlug } from "@/lib/catalogue";
import { BUSINESS } from "@/lib/business";

const BUBBLER_SLUGS = [
  "commercial-water-bubbler-filtered-stainless-steel-watermark-certified-square-des",
  "commercial-stainless-steel-filtered-cold-water-bubbler-round-wm",
  "commercial-rust-free-filtered-cold-water-bubbler-wm",
];

export const metadata: Metadata = {
  title:
    "WaterMark Certified Commercial Bubblers - Ready to Install | Enviro Aqua",
  description:
    "Three WaterMark-certified commercial drinking bubblers, ready to ship from Wyong NSW. Filters pre-installed, standard half-inch connection, your plumber installs in under an hour. For schools, gyms and offices.",
  alternates: { canonical: "/bubblers-and-coolers" },
  openGraph: {
    title: "WaterMark Certified Commercial Bubblers - Ready to Install",
    description:
      "Pick a model, we ship same-day. Filters pre-installed, plumber connects to a standard half-inch inlet.",
    url: "/bubblers-and-coolers",
    type: "website",
  },
};

const STYLE_DETAILS = {
  "commercial-water-bubbler-filtered-stainless-steel-watermark-certified-square-des":
    {
      style: "Square format",
      audience: "Schools, public spaces, councils",
      hookline:
        "The standard rectangular bubbler that fits cleanly against any wall.",
      keySpec: "Ambient water, wall-mount",
    },
  "commercial-stainless-steel-filtered-cold-water-bubbler-round-wm": {
    style: "Round format, chilled",
    audience: "Gyms, sports clubs, fitness centres",
    hookline:
      "Refrigerated cold water for high-traffic sites where ambient won't cut it.",
    keySpec: "Cold water, integrated chiller",
  },
  "commercial-rust-free-filtered-cold-water-bubbler-wm": {
    style: "Marine grade, chilled",
    audience: "Outdoor sites, coastal, pool decks",
    hookline:
      "316 stainless for outdoor and coastal sites where standard 304 would pit.",
    keySpec: "316 marine grade, cold water",
  },
} as const;

export default function CommercialBubblersPage() {
  const bubblers = BUBBLER_SLUGS.map((slug) => ({
    product: getProductBySlug(slug)!,
    detail: STYLE_DETAILS[slug as keyof typeof STYLE_DETAILS],
  })).filter((b) => b.product);

  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          {
            label: "Drinking Bubblers",
            href: "/bubblers-and-coolers",
          },
        ]}
      />

      {/* Hero */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-6 mb-16 lg:mb-20 items-end">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.18em] text-brand font-medium mb-4">
            For schools, gyms, offices
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
            Three certified bubblers.
            <br />
            <span className="text-muted">Pick a style. Ship today.</span>
          </h1>
          <p className="text-lg text-ink/85 mt-5 leading-relaxed max-w-prose">
            All three models below are WaterMark certified, in stock at our
            Wyong warehouse, and ship out same day on orders before{" "}
            {BUSINESS.dispatch.cutoffTime}. Filters come pre-installed,
            connection is a standard half-inch inlet - your usual plumber
            installs them in under an hour.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="#range"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 text-base font-medium bg-brand text-paper hover:bg-brand-700 rounded-sm transition-colors duration-fast"
            >
              View the range
            </Link>
            <a
              href={`tel:${BUSINESS.phone.tel}`}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 text-base font-medium text-ink border border-line hover:border-ink rounded-sm transition-colors duration-fast"
            >
              Multi-site? Call {BUSINESS.phone.display}
            </a>
          </div>
        </div>

        <ul className="lg:col-span-5 grid grid-cols-2 gap-px bg-line border border-line rounded-sm overflow-hidden">
          {[
            { value: "WaterMark", label: "Certified to AS/NZS 3497" },
            { value: "Pre-installed", label: "Filters fitted at dispatch" },
            { value: "Half-inch inlet", label: "Standard plumbing connection" },
            { value: "Same-day", label: "Dispatch from Wyong NSW" },
          ].map((stat) => (
            <li key={stat.label} className="bg-paper p-5">
              <p className="text-base font-semibold tracking-tight text-ink">
                {stat.value}
              </p>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </header>

      {/* The three styles */}
      <section
        id="range"
        aria-labelledby="range-heading"
        className="mb-16 lg:mb-20 scroll-mt-32"
      >
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
              Choose your style
            </p>
            <h2
              id="range-heading"
              className="text-2xl md:text-3xl font-semibold tracking-tight"
            >
              Three formats. One certified standard.
            </h2>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {bubblers.map(({ product, detail }) => (
            <li key={product.id}>
              <article className="h-full flex flex-col bg-paper border border-line rounded-sm overflow-hidden">
                <Link href={`/product/${product.slug}`} className="group block">
                  <div className="relative aspect-square bg-mist">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-contain p-10 transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                    <span className="absolute top-4 left-4 inline-flex items-center h-7 px-3 bg-paper border border-line text-xs font-medium text-ink rounded-sm">
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
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand font-medium mb-2">
                    {detail.style}
                  </p>
                  <h3 className="text-lg font-semibold tracking-tight leading-snug">
                    {detail.hookline}
                  </h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed">
                    {detail.audience}
                  </p>

                  <dl className="mt-5 pt-5 border-t border-line space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Spec</dt>
                      <dd className="text-ink text-right">{detail.keySpec}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Connection</dt>
                      <dd className="text-ink text-right">
                        Standard half-inch inlet
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Dispatch</dt>
                      <dd className="text-ink text-right">
                        Same day from Wyong NSW
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-6 flex items-end justify-between gap-4">
                    <div>
                      <Price amount={product.price} size="lg" showIncTax />
                      <p className="text-xs text-muted mt-1">Single unit</p>
                    </div>
                    <ButtonLink href={`/product/${product.slug}`} size="md">
                      Buy
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Install reassurance */}
      <section
        aria-labelledby="install-heading"
        className="bg-mist border border-line rounded-sm p-8 lg:p-12 mb-16 lg:mb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
              For your plumber
            </p>
            <h2
              id="install-heading"
              className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight"
            >
              Install is straightforward.
            </h2>
            <p className="text-base text-ink/85 mt-4 leading-relaxed">
              These ship as complete units with the filter cartridges
              already fitted, isolation valves on the inlet, and a standard
              half-inch BSP connection. A licensed plumber connects
              cold-water inlet, runs a tundish drain, and tests pressure -
              typically under an hour on site.
            </p>
            <p className="text-sm text-muted mt-4 leading-relaxed">
              No proprietary fittings. No factory commissioning visit
              required. No special tools.
            </p>
          </div>

          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Filters pre-installed",
                body: "Sediment plus carbon block fitted and pressure-tested before dispatch. Filtering from minute one.",
              },
              {
                title: "Standard half-inch BSP inlet",
                body: "The same connection your plumber uses on every other tap. No adapters, no head-scratching.",
              },
              {
                title: "Tundish-ready waste",
                body: "AS/NZS 3500 compliant air-break drain. Plumber routes to the nearest waste outlet.",
              },
              {
                title: "Wall or floor mount",
                body: "Mounting bracket included for wall units; floor-mount pedestal models bolt directly to slab.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="bg-paper border border-line rounded-sm p-5"
              >
                <div className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="w-5 h-5 text-brand flex-shrink-0 mt-0.5"
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
                  <div>
                    <p className="text-base font-medium text-ink">
                      {item.title}
                    </p>
                    <p className="text-sm text-ink/75 mt-1 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Multi-site CTA */}
      <section
        aria-labelledby="quote-heading"
        className="bg-ink text-paper rounded-sm p-8 lg:p-12 mb-16 lg:mb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] text-paper/60 font-medium mb-3">
              5+ units, one quote, one invoice
            </p>
            <h2
              id="quote-heading"
              className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight"
            >
              Specifying a school, chain or fit-out?
            </h2>
            <p className="text-base text-paper/80 mt-4 leading-relaxed">
              Multi-site project pricing, scheduled delivery to your install
              dates, single tax invoice across the order. Quotes turned
              around in 24 hours.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${BUSINESS.email}?subject=Multi-site bubbler quote`}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 text-base font-medium bg-paper text-ink hover:bg-mist rounded-sm transition-colors duration-fast"
              >
                Email {BUSINESS.email}
              </a>
              <a
                href={`tel:${BUSINESS.phone.tel}`}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 text-base font-medium text-paper border border-paper/30 hover:border-paper rounded-sm transition-colors duration-fast"
              >
                Or call {BUSINESS.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}