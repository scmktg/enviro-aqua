import Link from "next/link";
import { BUSINESS, fullAddress, compactHoursString } from "@/lib/business";

const NEARBY_SUBURBS = [
  "Wyong",
  "Tuggerah",
  "Lake Haven",
  "The Entrance",
  "Bateau Bay",
  "Long Jetty",
  "Toukley",
  "Charmhaven",
  "Gosford",
  "Erina",
  "Terrigal",
  "Avoca Beach",
  "Woy Woy",
  "Umina Beach",
];

const EXTENDED_REGIONS = [
  "Newcastle",
  "Lake Macquarie",
  "Hunter Valley",
  "Sydney North",
  "Hornsby",
  "Northern Beaches",
];

/**
 * Local-area SEO strip for the homepage. The pattern is standard for
 * AU local businesses targeting "service near me" queries: a named
 * region heading, a list of in-region suburb terms, a list of adjacent
 * regions, and a clear NAP block (Name, Address, Phone) that matches
 * the rest of the site exactly.
 *
 * The suburb list is plain prose with linked anchors to the showroom
 * page rather than a pile of link-stuffed sub-pages. We avoid creating
 * a doorway page per suburb — that's spammy and Google penalises it.
 * The legitimate local SEO play is one credible localBusiness entity
 * with a real address, real hours, and real catchment language.
 */
export function HomeLocalArea() {
  return (
    <section
      aria-labelledby="local-area-heading"
      className="bg-mist border-y border-line"
    >
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
              Based in {BUSINESS.address.suburb} {BUSINESS.address.state}
            </p>
            <h2
              id="local-area-heading"
              className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
            >
              Australia&rsquo;s water filter specialists, on the NSW Central
              Coast.
            </h2>
            <p className="text-base text-ink/80 mt-5 leading-relaxed">
              Our showroom and warehouse are at {fullAddress()}, in the
              Amsterdam Circuit industrial precinct just off the M1. Walk-in
              customers, free Click &amp; Collect, and same-day Australia-wide
              dispatch on orders before {BUSINESS.dispatch.cutoffTime}.
            </p>

            <address className="not-italic mt-6 space-y-1 text-sm">
              <p className="font-medium text-ink">{BUSINESS.brandName}</p>
              <p className="text-ink/85">{fullAddress()}</p>
              <p>
                <a
                  href={`tel:${BUSINESS.phone.tel}`}
                  className="tabular font-medium text-brand hover:text-brand-700 transition-colors duration-fast"
                >
                  {BUSINESS.phone.display}
                </a>
              </p>
              <p>
                <Link
                  href="/showroom"
                  className="text-brand hover:text-brand-700 underline underline-offset-4"
                >
                  Visit our showroom
                </Link>{" "}
                <span className="text-muted">· {compactHoursString()}</span>
              </p>
            </address>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-ink mb-3">
                Central Coast suburbs we serve
              </h3>
              <p className="text-xs uppercase tracking-[0.16em] text-muted mb-3">
                Walk-in &amp; Click &amp; Collect
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-ink/85">
                {NEARBY_SUBURBS.map((suburb) => (
                  <li key={suburb}>{suburb}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-ink mb-3">
                Adjacent regions
              </h3>
              <p className="text-xs uppercase tracking-[0.16em] text-muted mb-3">
                Australia-wide shipping
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-ink/85 mb-5">
                {EXTENDED_REGIONS.map((region) => (
                  <li key={region}>{region}</li>
                ))}
              </ul>
              <p className="text-sm text-ink/75 leading-relaxed">
                We ship to every Australian postcode via tracked standard or
                express courier — see{" "}
                <Link
                  href="/shipping"
                  className="text-brand hover:text-brand-700 underline underline-offset-4"
                >
                  shipping rates
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
