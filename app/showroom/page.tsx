import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { BUSINESS, fullAddress, compactHoursString } from "@/lib/business";
import { localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Visit Our Wyong Showroom — Water Filters Central Coast NSW | Enviro Aqua",
  description: `Visit Enviro Aqua at ${fullAddress()} — water filters, reverse osmosis systems, commercial bubblers and replacement cartridges in stock. Open ${compactHoursString()}. Free Click & Collect.`,
  alternates: { canonical: "/showroom" },
  openGraph: {
    title: "Visit Our Wyong Showroom — Water Filters Central Coast NSW",
    description: `Drop in to our showroom at ${fullAddress()} — ${compactHoursString()}.`,
    url: "/showroom",
    type: "website",
  },
};

const SUBURBS_TIER_1 = [
  "Wyong",
  "Tuggerah",
  "Lake Haven",
  "The Entrance",
  "Bateau Bay",
  "Toukley",
  "Charmhaven",
  "Long Jetty",
];

const SUBURBS_TIER_2 = [
  "Gosford",
  "Erina",
  "Terrigal",
  "Avoca Beach",
  "Woy Woy",
  "Umina Beach",
  "Newcastle",
  "Lake Macquarie",
  "Maitland",
  "Sydney North",
  "Hornsby",
  "Northern Beaches",
];

export default function ShowroomPage() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    fullAddress()
  )}`;

  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Wyong showroom", href: "/showroom" },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          Visit us · {BUSINESS.address.suburb} {BUSINESS.address.state}
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
          Our showroom on the NSW Central Coast.
        </h1>
        <p className="text-lg text-ink/80 mt-5 leading-relaxed">
          Drop in to see our water filtration systems, talk through your
          install with our team, or pick up a Click &amp; Collect order. The
          full Enviro Aqua range is on the floor — whole-house systems,
          under-sink RO, bench-top filters, replacement cartridges and
          commercial bubblers.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-12">
        <div className="lg:col-span-7">
          {/* Embedded map (no API key needed for the search-place embed) */}
          <div className="aspect-[4/3] bg-mist rounded-sm overflow-hidden border border-line">
            <iframe
              title="Map of Enviro Aqua showroom in Wyong NSW"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                fullAddress()
              )}&output=embed`}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
          <p className="text-xs text-muted mt-3">
            Located in the Amsterdam Circuit industrial precinct, North Wyong —
            5 minutes from the M1 Pacific Motorway.
          </p>
        </div>

        <aside className="lg:col-span-5">
          <div className="bg-mist rounded-sm border border-line p-6 lg:p-7">
            <h2 className="text-base font-semibold tracking-tight mb-1">
              {BUSINESS.brandName}
            </h2>
            <address className="not-italic text-sm text-ink/85 leading-relaxed">
              {BUSINESS.address.streetShort}
              <br />
              {BUSINESS.address.suburb} {BUSINESS.address.state}{" "}
              {BUSINESS.address.postcode}
            </address>

            <div className="mt-5 pt-5 border-t border-line space-y-2 text-sm">
              <p>
                <a
                  href={`tel:${BUSINESS.phone.tel}`}
                  className="font-medium tabular text-ink hover:text-brand transition-colors duration-fast"
                >
                  {BUSINESS.phone.display}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-ink hover:text-brand transition-colors duration-fast"
                >
                  {BUSINESS.email}
                </a>
              </p>
            </div>

            <div className="mt-5 pt-5 border-t border-line">
              <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
                Showroom hours
              </p>
              <dl className="text-sm space-y-1.5">
                {BUSINESS.hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between gap-4 tabular"
                  >
                    <dt className="text-ink">{h.day}</dt>
                    <dd className="text-ink/75">
                      {h.open && h.close ? `${h.open}–${h.close}` : "Closed"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink external href={directionsUrl} block>
                Get directions
              </ButtonLink>
              <ButtonLink
                external
                href={`tel:${BUSINESS.phone.tel}`}
                variant="ghost"
                block
              >
                Call before you visit
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>

      {/* Click & Collect anchor */}
      <section
        id="click-and-collect"
        aria-labelledby="cnc-heading"
        className="mt-16 lg:mt-24 max-w-4xl scroll-mt-32"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          Free local pickup
        </p>
        <h2
          id="cnc-heading"
          className="text-2xl md:text-3xl font-semibold tracking-tight"
        >
          Click &amp; Collect from our Wyong showroom.
        </h2>
        <p className="text-base text-ink/85 leading-relaxed mt-4 max-w-prose">
          Order online, choose Click &amp; Collect at checkout, and pick up
          from our Wyong showroom — typically ready within{" "}
          <strong>
            {BUSINESS.clickAndCollect.typicalReadyHours} hours
          </strong>{" "}
          during business hours. No shipping fees, no waiting on couriers,
          and our team can run through the install with you in person.
        </p>
        <div className="mt-6">
          <ButtonLink href="/shop">Start shopping</ButtonLink>
        </div>
      </section>

      {/* Local service area — local SEO copy */}
      <section
        aria-labelledby="service-area"
        className="mt-16 lg:mt-24 max-w-4xl"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          Servicing the Central Coast and beyond
        </p>
        <h2
          id="service-area"
          className="text-2xl md:text-3xl font-semibold tracking-tight"
        >
          Where our customers come from.
        </h2>
        <p className="text-base text-ink/85 leading-relaxed mt-4 max-w-prose">
          Most of our walk-in and Click &amp; Collect customers are based on
          the NSW Central Coast — the Wyong, Lake Haven, Tuggerah and The
          Entrance corridors are within 20 minutes of the showroom. We also
          serve customers driving up from Sydney, down from Newcastle, and
          across the Hunter region. For everyone outside the Central Coast,
          we ship Australia-wide via standard or express courier. See our
          full hub for{" "}
          <Link
            href="/water-filters-central-coast"
            className="text-brand hover:text-brand-700 underline underline-offset-4"
          >
            water filters Central Coast
          </Link>{" "}
          — by suburb, supply type and install option.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-base font-semibold tracking-tight mb-3">
              Central Coast suburbs
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-ink/85">
              {SUBURBS_TIER_1.map((suburb) => (
                <li key={suburb}>{suburb}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight mb-3">
              Adjacent regions
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-ink/85">
              {SUBURBS_TIER_2.map((suburb) => (
                <li key={suburb}>{suburb}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section
        aria-labelledby="facilities-heading"
        className="mt-16 lg:mt-24 max-w-4xl"
      >
        <h2
          id="facilities-heading"
          className="text-xs uppercase tracking-[0.18em] text-muted mb-4"
        >
          On-site
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <li className="border border-line rounded-sm p-4">
            <p className="font-medium text-ink">Off-street parking</p>
            <p className="text-muted mt-1 text-xs leading-relaxed">
              Parking directly outside the unit.
            </p>
          </li>
          <li className="border border-line rounded-sm p-4">
            <p className="font-medium text-ink">Wheelchair access</p>
            <p className="text-muted mt-1 text-xs leading-relaxed">
              Step-free entry from the carpark.
            </p>
          </li>
          <li className="border border-line rounded-sm p-4">
            <p className="font-medium text-ink">Trade pickup bay</p>
            <p className="text-muted mt-1 text-xs leading-relaxed">
              Pull up to load Big Blue housings or bulk cartridges.
            </p>
          </li>
        </ul>
      </section>

      {/* Encourage call before visit */}
      <section className="mt-16 lg:mt-24 bg-mist border border-line rounded-sm p-8 lg:p-10 max-w-4xl">
        <h2 className="text-xl font-semibold tracking-tight">
          Coming in for a specific install? Call ahead.
        </h2>
        <p className="text-base text-ink/85 leading-relaxed mt-3">
          If you&rsquo;re driving up specifically to look at a whole-house
          system, RO unit, or commercial bubbler, give us a quick call before
          you leave. We&rsquo;ll have the unit and the right cartridges ready
          to look at, and we can confirm stock on the day.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <ButtonLink external href={`tel:${BUSINESS.phone.tel}`}>
            Call {BUSINESS.phone.display}
          </ButtonLink>
          <ButtonLink
            external
            href={`mailto:${BUSINESS.email}`}
            variant="ghost"
          >
            Email us
          </ButtonLink>
        </div>
      </section>

      {/*
        LocalBusiness JSON-LD on the showroom page.
        The same payload is on every page via the root layout — the
        duplicate emission here is intentional. Google explicitly accepts
        repeated schema entities on multiple pages, and emitting it on
        the showroom page (with the most location-specific copy) gives
        the strongest local-pack signal.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusinessJsonLd() }}
      />
    </div>
  );
}
