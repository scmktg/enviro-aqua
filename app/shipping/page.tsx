import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { BUSINESS, fullAddress, compactHoursString } from "@/lib/business";

const STANDARD = BUSINESS.shipping.standard;
const EXPRESS = BUSINESS.shipping.express;

const STANDARD_FROM = Math.min(...STANDARD.tiers.map((t) => t.price));
const EXPRESS_FROM = Math.min(...EXPRESS.tiers.map((t) => t.price));

export const metadata: Metadata = {
  title:
    "Shipping & Delivery — Same-Day Dispatch from Wyong NSW | Enviro Aqua",
  description: `Australia-wide shipping from our Wyong NSW Central Coast warehouse. Same-day dispatch on orders before ${BUSINESS.dispatch.cutoffTime}. Standard freight from $${STANDARD_FROM.toFixed(2)}, express from $${EXPRESS_FROM.toFixed(2)}. Free Click & Collect from the showroom.`,
  alternates: { canonical: "/shipping" },
};

const FAQ = [
  {
    q: "When will my order be dispatched?",
    a: `Orders placed before ${BUSINESS.dispatch.cutoffTime} AEST on a business day dispatch the same day from our Wyong NSW warehouse. Orders placed after ${BUSINESS.dispatch.cutoffTime} or on weekends dispatch the next business day. Public holiday cut-offs are advised at checkout.`,
  },
  {
    q: "Do you deliver to my postcode?",
    a: "Yes — we ship to every Australian postcode, including remote and regional areas. Delivery times to remote and regional postcodes can be longer than the headline standard / express ranges; if you're outside a metro area, allow extra business days.",
  },
  {
    q: "Can I collect my order from the showroom?",
    a: `Yes. Click & Collect is free, available during our showroom hours (${compactHoursString()}), and orders are typically ready within ${BUSINESS.clickAndCollect.typicalReadyHours} hours of being placed. You'll receive a text or email when it's ready to pick up at ${fullAddress()}.`,
  },
  {
    q: "Do I need to be there to sign for delivery?",
    a: "Most courier services we use offer Authority to Leave by default. If you'd prefer signature-on-delivery, leave a note at checkout and we'll arrange it. For valuable or large items (whole-house systems, commercial bubblers) signature is recommended.",
  },
  {
    q: "Is express shipping faster on every postcode?",
    a: `Express delivery is faster on metro and most major regional routes (${EXPRESS.timeRange}). Some remote postcodes don't see the full benefit because the courier still needs to drive the last leg by road. If you're paying for express and want a delivery estimate before checkout, call us on ${BUSINESS.phone.display}.`,
  },
  {
    q: "Do you ship to PO Boxes or Parcel Lockers?",
    a: "Small items yes; large items no. Whole-house systems and commercial bubblers ship via dedicated freight that requires a street address and someone able to receive bulky goods.",
  },
];

export default function ShippingPage() {
  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Shipping & Delivery", href: "/shipping" },
        ]}
      />

      <header className="mt-6 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          Australia-wide shipping from Wyong NSW
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Shipping &amp; delivery
        </h1>
        <p className="text-lg text-ink/80 mt-3 leading-relaxed">
          We dispatch same-day from our Wyong warehouse on the NSW Central
          Coast for orders placed before {BUSINESS.dispatch.cutoffTime}.
          Standard and express freight options across Australia, plus free
          Click &amp; Collect for local customers.
        </p>
      </header>

      {/* Top stats — fast-scan headline figures */}
      <section
        aria-label="Shipping highlights"
        className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-sm overflow-hidden mt-10 max-w-4xl"
      >
        {[
          {
            label: "Same-day dispatch cutoff",
            value: `${BUSINESS.dispatch.cutoffTime} AEST`,
          },
          { label: "Standard delivery", value: STANDARD.timeRange },
          { label: "Express delivery", value: EXPRESS.timeRange },
          { label: "Click & Collect", value: "Wyong NSW" },
        ].map((stat) => (
          <div key={stat.label} className="bg-paper p-5">
            <p className="text-2xl font-semibold tabular tracking-tight text-ink">
              {stat.value}
            </p>
            <p className="text-xs text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Postage tables */}
      <section
        id="rates"
        aria-labelledby="rates-heading"
        className="mt-14 max-w-4xl scroll-mt-32"
      >
        <h2
          id="rates-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Postage rates
        </h2>
        <p className="text-sm text-ink/75 mt-2 leading-relaxed max-w-prose">
          Standard rates apply to most metro and regional postcodes across
          Australia. Final shipping cost is shown at checkout based on the
          item&rsquo;s size and your delivery postcode.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="border border-line rounded-sm overflow-hidden">
            <header className="bg-mist px-5 py-4 border-b border-line">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {STANDARD.timeRange}
              </p>
              <h3 className="text-lg font-semibold tracking-tight mt-1">
                {STANDARD.label}
              </h3>
            </header>
            <table className="w-full text-sm">
              <tbody>
                {STANDARD.tiers.map((t) => (
                  <tr key={t.size} className="border-b border-line last:border-b-0">
                    <th
                      scope="row"
                      className="text-left font-medium px-5 py-3"
                    >
                      {t.size}
                    </th>
                    <td className="text-right px-5 py-3 tabular">
                      ${t.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-line rounded-sm overflow-hidden">
            <header className="bg-mist px-5 py-4 border-b border-line">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {EXPRESS.timeRange}
              </p>
              <h3 className="text-lg font-semibold tracking-tight mt-1">
                {EXPRESS.label}
              </h3>
            </header>
            <table className="w-full text-sm">
              <tbody>
                {EXPRESS.tiers.map((t) => (
                  <tr key={t.size} className="border-b border-line last:border-b-0">
                    <th
                      scope="row"
                      className="text-left font-medium px-5 py-3"
                    >
                      {t.size}
                    </th>
                    <td className="text-right px-5 py-3 tabular">
                      ${t.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Click & Collect */}
      <section
        id="click-and-collect"
        aria-labelledby="cnc-heading"
        className="mt-16 max-w-4xl scroll-mt-32"
      >
        <h2 id="cnc-heading" className="text-2xl font-semibold tracking-tight">
          Click &amp; Collect from Wyong
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div>
            <p className="text-base text-ink/85 leading-relaxed">
              Free pickup from our showroom on the NSW Central Coast. Place
              your order online, choose &ldquo;Collect In-Store&rdquo;, and
              we&rsquo;ll text or email you when it&rsquo;s ready —
              typically within{" "}
              <strong>{BUSINESS.clickAndCollect.typicalReadyHours} hours</strong>{" "}
              during business hours.
            </p>
            <ol className="mt-5 space-y-2 text-sm text-ink/85 list-decimal pl-5 marker:text-muted">
              <li>Order online and select Collect In-Store at checkout.</li>
              <li>Wait for the &quot;ready for collection&quot; notification.</li>
              <li>
                Pick up from {fullAddress()} during showroom hours.
              </li>
            </ol>
          </div>
          <aside className="bg-mist border border-line rounded-sm p-6">
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
            <Link
              href="/showroom"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-700 transition-colors duration-fast mt-5"
            >
              Visit our showroom
              <span aria-hidden>→</span>
            </Link>
          </aside>
        </div>
      </section>

      {/* Returns */}
      <section
        id="returns"
        aria-labelledby="returns-heading"
        className="mt-16 max-w-4xl scroll-mt-32"
      >
        <h2
          id="returns-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Returns
        </h2>
        <p className="text-base text-ink/85 leading-relaxed mt-3 max-w-prose">
          Returns are accepted for products that are <strong>damaged or
          faulty</strong> upon delivery. Submit a return request within{" "}
          <strong>{BUSINESS.returns.windowDays} days</strong> of receiving
          your order. Products in good working condition or undamaged items
          are not eligible for return.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="border border-line rounded-sm p-5">
            <h3 className="text-base font-semibold tracking-tight mb-2">
              What you&rsquo;ll need
            </h3>
            <ul className="text-sm text-ink/85 space-y-1.5 list-disc pl-5 marker:text-muted leading-relaxed">
              <li>Order number and proof of purchase from our website.</li>
              <li>Original packaging with all accessories and documentation.</li>
              <li>
                Photos or a short description showing the damage or fault.
              </li>
            </ul>
          </div>
          <div className="border border-line rounded-sm p-5">
            <h3 className="text-base font-semibold tracking-tight mb-2">
              How it works
            </h3>
            <ol className="text-sm text-ink/85 space-y-1.5 list-decimal pl-5 marker:text-muted leading-relaxed">
              <li>
                Email{" "}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-brand hover:text-brand-700 underline underline-offset-4"
                >
                  {BUSINESS.email}
                </a>{" "}
                with your order details and evidence.
              </li>
              <li>
                We&rsquo;ll send return shipping instructions if approved (we
                cover return freight on approved damaged-goods returns).
              </li>
              <li>
                Once we receive and inspect the product, you&rsquo;ll get a
                refund or replacement, your choice.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="mt-16 max-w-3xl scroll-mt-32"
      >
        <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight">
          Frequently asked
        </h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                <span className="text-base font-medium text-ink">
                  {item.q}
                </span>
                <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  className="w-3.5 h-3.5 mt-1.5 text-muted transition-transform duration-fast group-open:rotate-45"
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

      {/* JSON-LD FAQPage schema for rich-result eligibility */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
