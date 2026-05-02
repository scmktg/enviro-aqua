import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { InstallEnquiryForm } from "@/components/sections/InstallEnquiryForm";
import { CertificationBadges } from "@/components/ui/CertificationBadges";
import { ButtonLink } from "@/components/ui/Button";
import { getProductBySlug } from "@/lib/catalogue";
import { INSTALL_PACKAGE } from "@/lib/install-package";
import { BUSINESS } from "@/lib/business";

const SUPPLY_PRODUCT_SLUG =
  "triple-big-blue-whole-house-water-filter-20-x-4-5-3-stage";

export const metadata: Metadata = {
  title:
    "Whole House Water Filter Installation — Central Coast NSW | Enviro Aqua",
  description: `Whole-house water filter professionally installed by a certified Central Coast plumber. $${INSTALL_PACKAGE.price} all-inclusive — Triple Big Blue 3-stage system, 2–3 hour install, 12-month cartridge supply. Servicing Wyong, Tuggerah, Gosford and surrounds.`,
  alternates: { canonical: "/install/whole-house" },
  openGraph: {
    title: "Whole House Water Filter Installation — Central Coast NSW",
    description: `$${INSTALL_PACKAGE.price} all-inclusive. Certified local plumber, 2–3 hour install, no upfront payment.`,
    url: "/install/whole-house",
    type: "website",
  },
};

const FAQ = [
  {
    q: "Do I have to pay anything to submit this form?",
    a: "No. The form is an enquiry only — no card, no deposit, no commitment. Once you submit, we call you back within 24 hours to confirm your install address and check plumber availability. We only send you an invoice once everything is confirmed and locked in.",
  },
  {
  q: "What does the $2,299 actually cover?",
  a: "The Triple Big Blue 3-stage WaterMark-certified whole-house system, the initial 3-cartridge stack (sediment plus two carbon stages), 2–3 hours of licensed plumber labour, all standard fittings (isolation valves, bypass, mounting bracket), and pre-install site assessment. There are no separate call-out fees, materials charges, or hidden add-ons for a standard install. Replacement cartridges (every 6–12 months) are sold separately at standard prices.",
},
  {
    q: "What if my install needs extra plumbing work?",
    a: "If we discover during the site assessment that your install needs significant additional work — repositioning the meter line, replacing damaged pipework before the filter point, structural modifications — we'll call you with a quote before doing anything. You can approve, decline, or just have us install where the standard scope works. No surprises on the invoice.",
  },
  {
    q: "How quickly can you install?",
    a: "Most Central Coast installs happen within 7–14 days of enquiry. Sooner is sometimes possible during quieter periods — we can usually accommodate a specific date if you give us at least one weeks' notice.",
  },
  {
    q: "What if I rent or live in a strata building?",
    a: "Renters and strata residents can still get this package, but you'll need landlord or body corporate approval before we install. We can provide a written spec to share with them. If approval doesn't come through, no harm done — the enquiry costs you nothing.",
  },
  {
    q: "Can I cancel after I've submitted the form?",
    a: `Yes. Until your invoice is paid, you can cancel any time at no cost. Once you've paid, we ask for ${INSTALL_PACKAGE.policy.cancellationWindow} notice for cancellations or reschedules so we can let the plumber know.`,
  },
  {
    q: "Why use you instead of buying the unit and finding my own plumber?",
    a: "You can absolutely DIY it that way and we'll happily sell you the unit on its own. The bundle is for people who want one phone number, one invoice, one accountable party. We've already vetted the plumber, we've already pre-tested the system, and if anything goes wrong post-install you call us, not them.",
  },
  {
    q: "Can you do installs outside the Central Coast?",
    a: `This particular packaged price applies to Central Coast NSW (postcodes 2250–2265). For installs in Sydney, Newcastle, the Hunter or further afield, call us on ${BUSINESS.phone.display} and we can arrange a quote with a local plumber in your area. The product side is the same; only the labour rate varies by location.`,
  },
];

export default function InstallPackagePage() {
  const product = getProductBySlug(SUPPLY_PRODUCT_SLUG);

  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Install Package", href: "/install/whole-house" },
        ]}
      />

      {/* Hero — value proposition + price + form anchor */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-6 mb-16 lg:mb-20">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.18em] text-brand font-medium mb-4">
            Central Coast NSW · Including installation
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight leading-[1.1]">
            Whole-house water filter,
            <br />
            <span className="text-muted">professionally installed.</span>
          </h1>
          <p className="text-lg text-ink/85 mt-5 leading-relaxed max-w-prose">
            One price. One phone number. One Saturday afternoon and every tap
            in your Central Coast home runs filtered water — chlorine, sediment
            and taste gone. Installed by a licensed local plumber we&rsquo;ve
            worked with for years, on a date that suits you.
          </p>

          {/* Price card */}
          <div className="mt-8 inline-flex items-baseline gap-3 bg-mist border border-line rounded-sm px-6 py-4">
            <span className="text-3xl lg:text-4xl font-semibold tracking-tight tabular">
              ${INSTALL_PACKAGE.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted">
              all-inclusive · inc. GST · Central Coast NSW
            </span>
          </div>

          <ul className="mt-8 space-y-2.5 text-base text-ink/85">
            {[
  "Triple Big Blue 3-stage whole-house system (WaterMark certified)",
  "Licensed Central Coast plumber · 2–3 hour install",
  "Pre-install site assessment included",
  "Initial 3-cartridge stack ready to filter from day one",
  "No call-out fee, no materials surcharge, no hidden add-ons",
].map((point) => (
              <li key={point} className="flex items-start gap-3">
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
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <ButtonLink href="#enquire" size="lg">
              Request your install
            </ButtonLink>
            <ButtonLink
              external
              href={`tel:${BUSINESS.phone.tel}`}
              size="lg"
              variant="ghost"
            >
              Or call {BUSINESS.phone.display}
            </ButtonLink>
          </div>
          <p className="text-sm text-muted mt-4">
            No payment, no commitment until plumber availability is confirmed.
          </p>
        </div>

        {product?.images[0] && (
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] bg-mist rounded-sm overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain p-8 lg:p-12"
                priority
              />
            </div>
            {product.certifications.length > 0 && (
              <div className="mt-4">
                <CertificationBadges
                  certifications={product.certifications}
                />
              </div>
            )}
          </div>
        )}
      </header>

      {/* Why this package — three pillars */}
      <section
        aria-labelledby="why-heading"
        className="border-y border-line py-12 lg:py-16 mb-16 lg:mb-20"
      >
        <div className="max-w-2xl mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            Why bundle it
          </p>
          <h2
            id="why-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            Buying the unit and finding a plumber separately costs more —
            and takes longer.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-brand font-medium mb-2">
              Cost
            </p>
            <h3 className="text-lg font-semibold tracking-tight mb-2">
              You save around $300.
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed">
              Most Central Coast plumbers charge $850–$950 for a whole-house
              filter install on its own, plus a call-out fee. The bundle includes
              labour, all standard fittings, pre-install assessment and a year
              of cartridges — about $2,600 worth at separate-purchase prices.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-brand font-medium mb-2">
              Speed
            </p>
            <h3 className="text-lg font-semibold tracking-tight mb-2">
              You&rsquo;re installed inside two weeks.
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed">
              Finding a plumber who knows whole-house filtration is harder than
              it sounds. We&rsquo;ve already done that — Mick has installed
              hundreds of these systems across the Central Coast. He knows the
              spec, has the parts, and turns up when scheduled.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-brand font-medium mb-2">
              Accountability
            </p>
            <h3 className="text-lg font-semibold tracking-tight mb-2">
              One phone number for everything.
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed">
              If something goes wrong post-install — a leak, a flow issue, a
              cartridge that needs replacing early — you call us, not the
              plumber, not the manufacturer. We sort it because we sold you
              the package end to end.
            </p>
          </div>
        </div>
      </section>

      {/* What's included — flat list, no itemisation */}
      <section
        aria-labelledby="included-heading"
        className="mb-16 lg:mb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
              What&rsquo;s included
            </p>
            <h2
              id="included-heading"
              className="text-2xl md:text-3xl font-semibold tracking-tight"
            >
              One price, everything covered.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                {
                  title: "Triple Big Blue 3-stage whole-house system",
                  body: 'WaterMark certified · 20" × 4.5" housings.',
                },
                {
                  title: "Professional installation",
                  body: "Licensed Central Coast plumber, 2–3 hour install with isolation valves and bypass.",
                },
                {
                  title: "Pre-install site assessment",
                  body: "Pressure check, supply check, install location confirmed before any work starts.",
                },
                {
  title: "3-cartridge stack",
  body: "Sediment + dual carbon cartridges installed and ready to filter from day one.",
},
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
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
                    <p className="text-sm text-ink/75 mt-0.5 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted mt-8">
              Fixed price, inc. GST. No call-out fees, materials surcharges
              or hidden add-ons.
            </p>
          </div>

          <aside className="bg-mist rounded-sm border border-line p-6 lg:self-start">
            <h3 className="text-sm font-semibold tracking-tight mb-3 text-ink">
              Not included
            </h3>
            <ul className="space-y-2 text-sm text-ink/80">
              {INSTALL_PACKAGE.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2 leading-relaxed">
                  <span aria-hidden className="text-muted mt-0.5 flex-shrink-0">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted mt-4 leading-relaxed">
              If any of these apply to your install, we&rsquo;ll call with
              a separate quote first. You can decline at no cost.
            </p>
          </aside>
        </div>
      </section>

      {/* Process — what happens after submit */}
      <section
        aria-labelledby="timeline-heading"
        className="bg-mist -mx-4 lg:-mx-0 lg:rounded-sm py-12 lg:py-16 px-4 lg:px-12 mb-16 lg:mb-20"
      >
        <div className="max-w-2xl mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            What happens after you submit
          </p>
          <h2
            id="timeline-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            From form to filtered water in under two weeks.
          </h2>
        </div>
        <ol className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-6">
          {INSTALL_PACKAGE.timeline.map((step, i) => (
            <li
              key={step.title}
              className="lg:relative bg-paper border border-line rounded-sm p-5"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-brand font-medium mb-2 tabular">
                {String(i + 1).padStart(2, "0")} · {step.step}
              </p>
              <h3 className="text-base font-semibold tracking-tight mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-ink/80 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Form — the actual conversion target */}
      <section
        id="enquire"
        aria-labelledby="form-heading"
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 lg:mb-20 scroll-mt-32"
      >
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            Step one
          </p>
          <h2
            id="form-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight"
          >
            Two minutes. No payment.
            <br />
            <span className="text-muted">We&rsquo;ll take it from here.</span>
          </h2>
          <p className="text-base text-ink/85 mt-5 leading-relaxed">
            Fill in your details and your preferred install date. We&rsquo;ll
            call you back within 24 hours during business hours to confirm
            your address and check plumber availability. Only when
            we&rsquo;ve agreed on a date do we send you an invoice.
          </p>
          <div className="mt-8 space-y-3 text-sm text-ink/85">
            <p className="flex items-center gap-2">
              <span aria-hidden className="text-brand">
                ✓
              </span>
              No card details required
            </p>
            <p className="flex items-center gap-2">
              <span aria-hidden className="text-brand">
                ✓
              </span>
              No deposit
            </p>
            <p className="flex items-center gap-2">
              <span aria-hidden className="text-brand">
                ✓
              </span>
              Cancel any time before you pay
            </p>
            <p className="flex items-center gap-2">
              <span aria-hidden className="text-brand">
                ✓
              </span>
              Real human follow-up call from {BUSINESS.address.suburb}
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <InstallEnquiryForm />
        </div>
      </section>

      {/* Social proof — real reviews */}
      <section
        aria-labelledby="proof-heading"
        className="border-y border-line py-12 lg:py-16 mb-16 lg:mb-20"
      >
        <div className="max-w-2xl mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            From real customers
          </p>
          <h2
            id="proof-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            Why Central Coast homeowners trust Enviro Aqua.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <figure>
            <div
              className="flex gap-0.5 mb-4 text-brand"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden
                >
                  <path d="M8 0l2.4 5.4L16 6.2l-4 3.9.9 5.6L8 13l-4.9 2.7L4 10.1 0 6.2l5.6-.8L8 0Z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-base text-ink leading-relaxed">
              &ldquo;Fantastic customer service. Had an issue with a 12v tap.
              Staff identified the problem and even came out to the car and
              fixed it on the spot.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              <span className="font-medium text-ink">Steve Clark</span> · via
              Google
            </figcaption>
          </figure>
          <figure>
            <div
              className="flex gap-0.5 mb-4 text-brand"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden
                >
                  <path d="M8 0l2.4 5.4L16 6.2l-4 3.9.9 5.6L8 13l-4.9 2.7L4 10.1 0 6.2l5.6-.8L8 0Z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-base text-ink leading-relaxed">
              &ldquo;Great product quality with a fair price. Honestly, the
              best solutions to stop buying bottled water and spend hundreds
              of dollars!&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              <span className="font-medium text-ink">Salah H. Ashqar</span> ·
              via Facebook
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="max-w-3xl mb-16 lg:mb-20"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          Common questions
        </p>
        <h2
          id="faq-heading"
          className="text-2xl md:text-3xl font-semibold tracking-tight mb-8"
        >
          Things people ask before they book.
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

      {/* Final CTA — for users who scrolled past form */}
      <section
        aria-label="Final call to action"
        className="bg-ink text-paper rounded-sm p-8 lg:p-12 text-center mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Ready to have filtered water at every tap?
        </h2>
        <p className="text-base text-paper/80 mt-3 max-w-xl mx-auto leading-relaxed">
          Two-minute form. No payment now. We come back to you within
          24 hours with a confirmed install date.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="#enquire"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-medium bg-brand text-paper hover:bg-brand-700 rounded-sm transition-colors duration-fast"
          >
            Request your install
          </Link>
          <a
            href={`tel:${BUSINESS.phone.tel}`}
            className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-medium text-paper border border-paper/30 hover:border-paper rounded-sm transition-colors duration-fast"
          >
            Or call {BUSINESS.phone.display}
          </a>
        </div>
      </section>

      {/* JSON-LD Service schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Whole House Water Filter Installation",
            provider: {
              "@type": "LocalBusiness",
              name: BUSINESS.brandName,
              telephone: BUSINESS.phone.tel,
            },
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Central Coast NSW",
            },
            offers: {
              "@type": "Offer",
              price: INSTALL_PACKAGE.price,
              priceCurrency: "AUD",
            },
            description: metadata.description,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </div>
  );
}