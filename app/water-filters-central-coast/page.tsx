import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { HomeReviews } from "@/components/sections/HomeReviews";
import {
  BUSINESS,
  fullAddress,
  compactHoursString,
} from "@/lib/business";
import { localHubJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Water Filters Central Coast NSW | Wyong Showroom & Same-Day Dispatch | Enviro Aqua",
  description:
    "Water filters on the NSW Central Coast — whole-house, under-sink, RO and bench-top. Pick up from our Wyong showroom or get same-day dispatch to Gosford, Terrigal, The Entrance, Tuggerah and across the Coast.",
  alternates: { canonical: "/water-filters-central-coast" },
  openGraph: {
    title:
      "Water Filters Central Coast NSW — Wyong Showroom & Same-Day Dispatch",
    description:
      "Whole-house, under-sink, RO and bench-top water filters on the NSW Central Coast. Click & Collect from Wyong, same-day dispatch across the Coast.",
    url: "/water-filters-central-coast",
    type: "website",
  },
};

const TRUST_STRIP = [
  {
    title: "Wyong showroom",
    body: `Walk in, see the systems, take one home. ${compactHoursString()}.`,
  },
  {
    title: "Same-day dispatch",
    body: `Order before ${BUSINESS.dispatch.cutoffTime} on a business day, ships from Wyong same day.`,
  },
  {
    title: "Free Click & Collect",
    body: `Typically ready in ${BUSINESS.clickAndCollect.typicalReadyHours} hours during business hours.`,
  },
  {
    title: "WaterMark certified",
    body: "Plumber-grade housings and cartridges, the same kit our installers use.",
  },
];

const PRODUCT_TYPES = [
  {
    eyebrow: "Every tap",
    title: "Whole-house filters",
    body: "One Big Blue housing at the mains line treats every drop in the house — kitchen, bathroom, laundry, garden tap. The Coast standard for owners on town water who don't want filtered water gated to a single outlet.",
    href: "/shop/water-filters/whole-house",
    cta: "Shop whole-house",
  },
  {
    eyebrow: "Plumbed-in drinking water",
    title: "Under-sink filters",
    body: "Filter housing tucked in the cupboard, dedicated tap on the bench (or routed through a 3-way mixer). Bottled-quality water on demand, no countertop clutter. Suits owners and renters with landlord approval.",
    href: "/shop/water-filters/under-sink",
    cta: "Shop under-sink",
  },
  {
    eyebrow: "No plumbing required",
    title: "Bench-top filters",
    body: "Connects to your existing kitchen tap with a diverter — no plumber, no holes, no landlord conversation. Comes off cleanly when you move. Same media as the plumbed-in range.",
    href: "/shop/water-filters/bench-top",
    cta: "Shop bench-top",
  },
  {
    eyebrow: "Highest reduction",
    title: "Reverse osmosis",
    body: "The only residential technology that meaningfully reduces fluoride, PFAS, lead and total dissolved solids. Plumbs in under the sink alongside or instead of a standard filter. The right call when carbon block alone isn't enough.",
    href: "/shop/water-filters/reverse-osmosis",
    cta: "Shop RO systems",
  },
  {
    eyebrow: "Tank & bore add-on",
    title: "UV sterilisation",
    body: "Inactivates bacteria, viruses and protozoa with no chemicals or taste change. Fits in series after a sediment / carbon stage on rural properties drawing from rainwater tanks or bore. We pair the unit and lamp size to your flow rate.",
    href: "/shop/water-filters/uv-sterilisation",
    cta: "Shop UV systems",
  },
];

const SUBURBS = [
  { name: "Wyong", postcode: "2259", drive: "Showroom" },
  { name: "Tuggerah", postcode: "2259", drive: "5 min" },
  { name: "Lake Haven", postcode: "2263", drive: "8 min" },
  { name: "Gorokan", postcode: "2263", drive: "10 min" },
  { name: "Toukley", postcode: "2263", drive: "12 min" },
  { name: "Charmhaven", postcode: "2263", drive: "9 min" },
  { name: "Long Jetty", postcode: "2261", drive: "17 min" },
  { name: "The Entrance", postcode: "2261", drive: "15 min" },
  { name: "Bateau Bay", postcode: "2261", drive: "18 min" },
  { name: "Gosford", postcode: "2250", drive: "25 min" },
  { name: "Erina", postcode: "2250", drive: "28 min" },
  { name: "Terrigal", postcode: "2260", drive: "30 min" },
  { name: "Avoca Beach", postcode: "2251", drive: "32 min" },
  { name: "Woy Woy", postcode: "2256", drive: "35 min" },
  { name: "Umina Beach", postcode: "2257", drive: "40 min" },
];

const FAQ = [
  {
    q: "Do I need a different filter for Central Coast water than other parts of NSW?",
    a: "If you're on town water from Mardi or Mangrove Creek dam, a standard sediment + carbon block setup handles the chlorine, sediment and taste — same kit we'd recommend for most Sydney supply. If you're on tank water, you want sediment + carbon plus UV. If you're on bore water, you want a water test first; the right system depends on what's actually in the bore.",
  },
  {
    q: "Is Central Coast town water hard or soft?",
    a: "We don't publish hardness numbers from memory because they vary by source and time of year — Central Coast Council publishes the current water quality report on their website. In general the supply is treated to drinking standard and isn't aggressively hard, but a pre-filter sediment stage is still worth it because of intermittent main-line works that stir up sediment.",
  },
  {
    q: "Can you install a whole-house filter on the Central Coast?",
    a: "Yes. We have a packaged whole-house install that includes the Triple Big Blue 3-stage system, a licensed local plumber, all standard fittings and the initial cartridges. Most Coast installs happen within 7–14 days of enquiry. See the install package page for the current price and full inclusions.",
  },
  {
    q: "Do you ship to Gosford, Terrigal, Woy Woy and the Peninsula?",
    a: `Yes — same-day dispatch from Wyong on orders placed before ${BUSINESS.dispatch.cutoffTime} on a business day, with tracked courier delivery to every Coast postcode. Most southern-Coast addresses receive next business day. If you're closer to Wyong, Click & Collect is free and usually ready within ${BUSINESS.clickAndCollect.typicalReadyHours} hours.`,
  },
  {
    q: "I'm on tank water — what filter do I need?",
    a: "A typical tank-water setup is a 3-stage sequence: sediment pre-filter (catches roof grit and debris), carbon block (taste, organics) and UV steriliser (inactivates bacteria and protozoa). The exact housing size depends on flow rate and how many bathrooms you have. Call or email us your peak flow and we'll spec it.",
  },
  {
    q: "I'm on bore water — what filter do I need?",
    a: "Don't buy a system blind. Bore water varies enormously across the Coast — iron, manganese, hardness, sulphur, nitrate and the odd biological hit are all possible. Get a water test (we can recommend a NATA-accredited lab) and send us the results. We'll spec a system that targets what's actually in your water rather than a generic combo.",
  },
  {
    q: "Can I pick up from Wyong instead of paying shipping?",
    a: `Yes. Order online, choose Click & Collect at checkout, and pick up from ${fullAddress()} — typically ready within ${BUSINESS.clickAndCollect.typicalReadyHours} hours during business hours. Free, no fees, and our team can run through the install with you in person while you're there.`,
  },
];

const TRAIL = [
  { label: "Home", href: "/" },
  {
    label: "Water filters Central Coast",
    href: "/water-filters-central-coast",
  },
];

export default function WaterFiltersCentralCoastPage() {
  return (
    <>
      <div className="container-site py-8 lg:py-10">
        <Breadcrumbs trail={TRAIL} />

        {/* 1. H1 + sub + dual CTA */}
        <header className="mt-6 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            Central Coast NSW · Wyong showroom
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Water filters on the NSW Central Coast.
          </h1>
          <p className="text-lg text-ink/80 mt-5 leading-relaxed">
            Whole-house, under-sink, reverse osmosis and bench-top systems
            — stocked at our Wyong showroom and dispatched same-day to
            every postcode on the Coast. Plumber-grade housings and
            cartridges, the same kit we install with.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <ButtonLink href="/shop/water-filters" size="lg">
              Shop water filters
            </ButtonLink>
            <ButtonLink href="/showroom" size="lg" variant="ghost">
              Visit Wyong showroom
            </ButtonLink>
          </div>
        </header>

        {/* 2. Trust strip */}
        <section
          aria-label="What you get from Enviro Aqua"
          className="mt-12 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {TRUST_STRIP.map((item) => (
            <div
              key={item.title}
              className="border border-line rounded-sm p-5 bg-mist"
            >
              <p className="text-sm font-semibold text-ink tracking-tight">
                {item.title}
              </p>
              <p className="text-sm text-ink/75 mt-1.5 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </section>

        {/* 3. What's in Central Coast water? */}
        <section
          aria-labelledby="water-supply-heading"
          className="mt-16 lg:mt-24 max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            The supply on the Coast
          </p>
          <h2
            id="water-supply-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            What&rsquo;s in Central Coast water?
          </h2>
          <p className="text-base text-ink/85 leading-relaxed mt-4">
            Central Coast households draw water from one of four sources,
            and the right filter depends on which one you&rsquo;re on.
            Most homes are on town supply via Central Coast Council.
            Properties further from the network — Yarramalong, Wyong
            Creek, parts of Mangrove Mountain, the rural pockets behind
            the lakes — are more likely on rainwater tanks or bores. Each
            has a different filter spec.
          </p>

          <div className="mt-8 space-y-7">
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Town supply (most of the Coast)
              </h3>
              <p className="text-sm text-ink/85 mt-2 leading-relaxed">
                Treated and chlorinated supply from Mardi Dam and Mangrove
                Creek Dam, distributed through Central Coast Council&rsquo;s
                network. The chlorine and the occasional sediment hit
                during main-line works are the two things customers
                actually notice at the tap. A standard sediment + carbon
                block stage handles both — the chlorine taste disappears
                immediately and the sediment never reaches your kettle.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Rainwater tanks
              </h3>
              <p className="text-sm text-ink/85 mt-2 leading-relaxed">
                Common on properties west of the M1, on the Peninsula
                outskirts and across the Watagans. Tank water is generally
                soft and pleasant-tasting but carries roof grit, organic
                debris and the risk of bacteria from bird droppings or
                insect ingress. The standard answer is a three-stage
                setup: sediment pre-filter, carbon block, then a UV
                steriliser sized to your peak flow. Don&rsquo;t skip the
                UV.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Bore water
              </h3>
              <p className="text-sm text-ink/85 mt-2 leading-relaxed">
                Variable. Coast bores can carry iron, manganese, hardness,
                sulphur, nitrate or biologicals depending on depth and
                location — and the right filter targets what&rsquo;s
                actually in your bore, not a generic combo. Always get a
                NATA-accredited water test before you spec a system. Send
                us the results and we&rsquo;ll work back from there.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Fluoride, PFAS and dissolved solids
              </h3>
              <p className="text-sm text-ink/85 mt-2 leading-relaxed">
                Standard sediment and carbon won&rsquo;t reduce fluoride,
                PFAS or total dissolved solids in any meaningful way. If
                that&rsquo;s what you&rsquo;re after, you want reverse
                osmosis at a dedicated drinking tap. RO is the only
                residential technology that meaningfully reduces all
                three.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Product types + UV */}
        <section
          aria-labelledby="product-types-heading"
          className="mt-16 lg:mt-24"
        >
          <header className="max-w-3xl mb-8 lg:mb-10">
            <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
              By installation type
            </p>
            <h2
              id="product-types-heading"
              className="text-2xl md:text-3xl font-semibold tracking-tight"
            >
              Pick the system that matches your setup.
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {PRODUCT_TYPES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block bg-paper border border-line hover:border-ink rounded-sm p-6 lg:p-7 transition-colors duration-fast"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-brand font-medium">
                  {p.eyebrow}
                </p>
                <h3 className="text-lg font-semibold tracking-tight mt-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-ink/80 mt-3 leading-relaxed">
                  {p.body}
                </p>
                <p className="text-sm font-medium text-brand mt-5 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast">
                  {p.cta}
                  <span aria-hidden>→</span>
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Where to buy — Click & Collect + suburb table */}
        <section
          aria-labelledby="where-to-buy-heading"
          className="mt-16 lg:mt-24 max-w-4xl"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            Pick up or get it delivered
          </p>
          <h2
            id="where-to-buy-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            Where to buy on the Central Coast.
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-line rounded-sm p-6 bg-mist">
              <p className="text-xs uppercase tracking-[0.16em] text-muted mb-2">
                Free
              </p>
              <h3 className="text-base font-semibold tracking-tight">
                Click &amp; Collect — Wyong showroom
              </h3>
              <p className="text-sm text-ink/85 mt-2 leading-relaxed">
                Order online, choose Click &amp; Collect at checkout and
                pick up from {fullAddress()}. Typically ready within{" "}
                {BUSINESS.clickAndCollect.typicalReadyHours} hours during
                business hours. No shipping fee, and our team can talk
                through the install when you&rsquo;re here.
              </p>
              <div className="mt-4">
                <Link
                  href="/showroom#click-and-collect"
                  className="text-sm font-medium text-brand hover:text-brand-700 underline underline-offset-4"
                >
                  Showroom details
                </Link>
              </div>
            </div>
            <div className="border border-line rounded-sm p-6 bg-mist">
              <p className="text-xs uppercase tracking-[0.16em] text-muted mb-2">
                Same day
              </p>
              <h3 className="text-base font-semibold tracking-tight">
                Tracked courier across the Coast
              </h3>
              <p className="text-sm text-ink/85 mt-2 leading-relaxed">
                Orders before {BUSINESS.dispatch.cutoffTime} on a
                business day ship from Wyong same day. Most Central Coast
                addresses receive next business day via standard courier;
                express is available for the southern Coast and Peninsula.
              </p>
              <div className="mt-4">
                <Link
                  href="/shipping"
                  className="text-sm font-medium text-brand hover:text-brand-700 underline underline-offset-4"
                >
                  Shipping rates
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold tracking-tight mb-3">
              Suburbs we deliver to and pick up from
            </h3>
            <div className="overflow-x-auto border border-line rounded-sm">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Central Coast suburbs with postcode and approximate
                  drive time from the Wyong showroom.
                </caption>
                <thead className="bg-mist">
                  <tr className="text-left">
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-ink/85"
                    >
                      Suburb
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-ink/85 tabular"
                    >
                      Postcode
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-ink/85"
                    >
                      From Wyong showroom
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {SUBURBS.map((s) => (
                    <tr key={s.name}>
                      <th
                        scope="row"
                        className="px-4 py-2.5 font-normal text-ink text-left"
                      >
                        {s.name}
                      </th>
                      <td className="px-4 py-2.5 text-ink/75 tabular">
                        {s.postcode}
                      </td>
                      <td className="px-4 py-2.5 text-ink/75">{s.drive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted mt-3">
              Drive times are off-peak estimates from our Wyong showroom in
              the Amsterdam Circuit industrial precinct. Same-day Click
              &amp; Collect available for every suburb listed.
            </p>
          </div>
        </section>

        {/* 6. Trade & builder */}
        <section
          aria-labelledby="trade-heading"
          className="mt-16 lg:mt-24 bg-mist border border-line rounded-sm p-8 lg:p-10 max-w-4xl"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            Trade &amp; builders
          </p>
          <h2
            id="trade-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            Specifying water filters on a Central Coast build?
          </h2>
          <p className="text-base text-ink/85 leading-relaxed mt-4 max-w-prose">
            We supply licensed plumbers and Coast builders direct from the
            Wyong warehouse — Big Blue housings, sediment and carbon
            stages, replacement cartridge contracts, and trade pickup at
            the rear loading bay. Same retail price across the board, no
            minimum order, and we hold stock so you&rsquo;re not chasing
            it across three suppliers the day before fit-off. Call us with
            the spec (or the architect&rsquo;s plumbing schedule) and
            we&rsquo;ll confirm stock and a pickup time.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <ButtonLink external href={`tel:${BUSINESS.phone.tel}`}>
              Call {BUSINESS.phone.display}
            </ButtonLink>
            <ButtonLink
              external
              href={`mailto:${BUSINESS.email}`}
              variant="ghost"
            >
              Email the spec
            </ButtonLink>
          </div>
        </section>

        {/* 7. FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="mt-16 lg:mt-24 max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            Common questions
          </p>
          <h2
            id="faq-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-8"
          >
            Water filters on the Coast — what people ask.
          </h2>
          <div className="divide-y divide-line border-y border-line">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-base font-medium text-ink">
                    {item.q}
                  </span>
                  <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    className="w-3.5 h-3.5 mt-1.5 text-muted transition-transform duration-fast group-open:rotate-45 flex-shrink-0"
                    aria-hidden
                  >
                    <path
                      d="M7 1v12M1 7h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <p className="text-sm text-ink/80 leading-relaxed mt-3 max-w-prose">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* 8. Testimonials — full-bleed reuse of homepage block */}
      <HomeReviews />

      {/* 9. Final CTA — three buttons */}
      <div className="container-site pt-16 lg:pt-20 pb-16 lg:pb-20">
        <section
          aria-label="Final call to action"
          className="bg-ink text-paper rounded-sm p-8 lg:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Ready to sort the water at your place?
          </h2>
          <p className="text-base text-paper/80 mt-3 max-w-xl mx-auto leading-relaxed">
            Use the filter finder if you want a quick recommendation,
            browse the full range, or come and see the systems on the
            floor at our Wyong showroom.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/help/which-filter"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 text-base font-medium bg-brand text-paper hover:bg-brand-700 rounded-sm transition-colors duration-fast"
            >
              Use the filter finder
            </Link>
            <Link
              href="/shop/water-filters"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 text-base font-medium bg-paper text-ink hover:bg-paper/90 rounded-sm transition-colors duration-fast"
            >
              Shop water filters
            </Link>
            <Link
              href="/showroom"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 text-base font-medium text-paper border border-paper/30 hover:border-paper rounded-sm transition-colors duration-fast"
            >
              Visit Wyong showroom
            </Link>
          </div>
        </section>
      </div>

      {/*
        Single page-level JSON-LD block: emits a @graph containing the
        canonical LocalBusiness (same @id as the root layout's emission,
        so Google merges them into one entity), the breadcrumbs for this
        URL, and the FAQ above. Keep the FAQ array in lockstep with the
        rendered <details> blocks — the JSON-LD must mirror the page.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: localHubJsonLd({
            trail: TRAIL.map((t) => ({ label: t.label, url: t.href })),
            faq: FAQ,
          }),
        }}
      />
    </>
  );
}
