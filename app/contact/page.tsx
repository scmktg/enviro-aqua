import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { BUSINESS, fullAddress, compactHoursString } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact Us — Wyong NSW Central Coast | Enviro Aqua",
  description: `Talk to the Enviro Aqua team. Phone ${BUSINESS.phone.display}, email ${BUSINESS.email}, or visit our Wyong NSW showroom (${compactHoursString()}).`,
  alternates: { canonical: "/contact" },
};

const CONTACT_REASONS = [
  {
    title: "Sizing or specifying for a job",
    body: "Quoting a whole-house install, repspeccing a fit-out, or pairing the right tap with an RO system. Five minutes on the phone is faster than email.",
    cta: { label: "Call us", href: `tel:${BUSINESS.phone.tel}`, external: true },
    eyebrow: "Best by phone",
  },
  {
    title: "Multi-site or commercial quotes",
    body: "5+ commercial bubblers for a school or gym chain, multiple whole-house systems for a fit-out — email so we can send a written quote.",
    cta: {
      label: "Email us",
      href: `mailto:${BUSINESS.email}`,
      external: true,
    },
    eyebrow: "Best by email",
  },
  {
    title: "Order tracking, returns, refunds",
    body: "Email is the fastest path — include your order number and we'll come back same-day during business hours.",
    cta: {
      label: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
      external: true,
    },
    eyebrow: "Best by email",
  },
  {
    title: "Click & Collect or showroom visit",
    body: `Drop in to our Wyong showroom at ${fullAddress()} during business hours. Click & Collect orders are usually ready within ${BUSINESS.clickAndCollect.typicalReadyHours} hours.`,
    cta: { label: "Showroom info", href: "/showroom", external: false },
    eyebrow: "In person",
  },
];

export default function ContactPage() {
  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          Real humans · Wyong NSW
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
          Talk to the team.
        </h1>
        <p className="text-lg text-ink/80 mt-5 leading-relaxed">
          We&rsquo;re a small Australian business and the people answering
          the phone are the same people loading cartridges into boxes. The
          fastest way to get an answer depends on what you&rsquo;re asking
          about — pick the right channel below.
        </p>
      </header>

      {/* Contact channels — quick-answer block */}
      <section
        aria-label="Primary contact methods"
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line rounded-sm overflow-hidden mt-10 max-w-4xl"
      >
        <div className="bg-paper p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
            Phone
          </p>
          <a
            href={`tel:${BUSINESS.phone.tel}`}
            className="text-2xl font-semibold tabular text-ink hover:text-brand transition-colors duration-fast"
          >
            {BUSINESS.phone.display}
          </a>
          <p className="text-xs text-muted mt-2 leading-relaxed">
            {compactHoursString()
              .split(" · ")
              .map((segment, i) => (
                <span key={segment}>
                  {i > 0 && <br />}
                  {segment}
                </span>
              ))}
          </p>
        </div>
        <div className="bg-paper p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
            Email
          </p>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-base font-semibold text-ink hover:text-brand transition-colors duration-fast break-words"
          >
            {BUSINESS.email}
          </a>
          <p className="text-xs text-muted mt-2 leading-relaxed">
            Same-business-day reply during showroom hours.
          </p>
        </div>
        <div className="bg-paper p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
            Visit
          </p>
          <p className="text-base font-semibold text-ink">
            {BUSINESS.address.suburb} {BUSINESS.address.state}
          </p>
          <p className="text-xs text-muted mt-2 leading-relaxed">
            {BUSINESS.address.streetShort}
            <br />
            <Link
              href="/showroom"
              className="text-brand hover:text-brand-700 underline underline-offset-4 mt-1 inline-block"
            >
              Showroom info
            </Link>
          </p>
        </div>
      </section>

      {/* Reason-based contact — drives the right channel */}
      <section
        aria-labelledby="reasons-heading"
        className="mt-16 lg:mt-24 max-w-4xl"
      >
        <h2
          id="reasons-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Pick the right channel.
        </h2>
        <p className="text-base text-ink/75 mt-2 max-w-prose leading-relaxed">
          Some questions are answered fastest on a 3-minute phone call;
          others need a written paper trail. Here&rsquo;s how we&rsquo;d
          route it.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-8">
          {CONTACT_REASONS.map((reason) => (
            <li
              key={reason.title}
              className="border border-line rounded-sm p-6 flex flex-col"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-brand mb-2 font-medium">
                {reason.eyebrow}
              </p>
              <h3 className="text-lg font-semibold tracking-tight">
                {reason.title}
              </h3>
              <p className="text-sm text-ink/80 mt-2 leading-relaxed flex-1">
                {reason.body}
              </p>
              <div className="mt-4">
                <ButtonLink
                  href={reason.cta.href}
                  external={reason.cta.external}
                  size="sm"
                  variant="ghost"
                >
                  {reason.cta.label}
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Self-serve resources — defer easy questions before they email */}
      <section
        aria-labelledby="self-serve-heading"
        className="mt-16 lg:mt-24 max-w-4xl bg-mist rounded-sm p-8 lg:p-10"
      >
        <h2
          id="self-serve-heading"
          className="text-xl font-semibold tracking-tight"
        >
          Quick answers without an email.
        </h2>
        <p className="text-base text-ink/85 leading-relaxed mt-3 max-w-prose">
          Most of what people email about is already answered on the site.
          If you&rsquo;re not sure where to start, try one of these first.
        </p>
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Which filter do I need?", href: "/help/which-filter" },
            { label: "Shipping rates & times", href: "/shipping" },
            { label: "Returns policy", href: "/shipping#returns" },
            { label: "Blog & how-to guides", href: "/blog" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center justify-between gap-4 p-4 bg-paper border border-line hover:border-ink rounded-sm transition-colors duration-fast"
              >
                <span className="font-medium text-ink group-hover:text-brand transition-colors duration-fast">
                  {link.label}
                </span>
                <span aria-hidden className="text-brand">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Business details — for invoicing/B2B confidence */}
      <section
        aria-labelledby="legal-heading"
        className="mt-16 lg:mt-24 max-w-4xl"
      >
        <h2
          id="legal-heading"
          className="text-xs uppercase tracking-[0.18em] text-muted mb-4"
        >
          Business details
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-line pb-2">
            <dt className="text-muted">Trading name</dt>
            <dd className="text-ink">{BUSINESS.brandName}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line pb-2">
            <dt className="text-muted">Legal entity</dt>
            <dd className="text-ink">{BUSINESS.legalName}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line pb-2">
            <dt className="text-muted">ABN</dt>
            <dd className="text-ink tabular">{BUSINESS.abn}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line pb-2">
            <dt className="text-muted">ACN</dt>
            <dd className="text-ink tabular">{BUSINESS.acn}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line pb-2">
            <dt className="text-muted">Registered address</dt>
            <dd className="text-ink text-right">{fullAddress()}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line pb-2">
            <dt className="text-muted">GST registered</dt>
            <dd className="text-ink">Yes</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
