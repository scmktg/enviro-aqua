import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Which Water Filter Do I Need? — The 60-Second Filter Finder",
  description:
    "Three questions, one filter recommendation. Understand whether you need a whole-house system, an under-sink filter, a bench-top unit or reverse osmosis — based on your home, your supply, and what you want filtered.",
  alternates: { canonical: "/help/which-filter" },
};

const FLOW = [
  {
    n: "01",
    q: "Do you rent, or do you own?",
    a: "If you rent, you almost always want a Bench Top filter — it sits on the kitchen bench, connects to your existing tap with a diverter, and uninstalls in five minutes when you move. No plumber, no landlord conversation. If you own, the right answer depends on whether you want filtered drinking water (Under Sink) or filtered water at every tap including showers and laundry (Whole House).",
    cta: { label: "Under Sink & Bench Top", href: "/shop/water-filters/under-sink-ro-systems" },
  },
  {
    n: "02",
    q: "Town water, tank water, or bore?",
    a: "Town water is chlorinated — a sediment + carbon stage covers it. Tank and bore water are not chlorinated, which means bacterial risk; you want UV sterilisation in the system. High-TDS, brackish or fluoride-heavy supplies need Reverse Osmosis to make a meaningful reduction.",
    cta: { label: "UV Sterilisers", href: "/shop/water-filters/uv-sterilisers" },
  },
  {
    n: "03",
    q: "What do you actually want filtered out?",
    a: "Chlorine, taste & odour, sediment: any sediment + carbon system handles these. Heavy metals, lead: carbon block. Fluoride, PFAS, total dissolved solids: only Reverse Osmosis reduces these to single-digit-percent levels. Bacteria, viruses, protozoa: UV. There's no single filter that does everything — but a 3-stage whole-house plus an under-sink RO covers about 99% of household concerns.",
    cta: { label: "Reverse Osmosis Systems", href: "/shop/water-filters/under-sink-ro-systems" },
  },
];

export default function WhichFilterPage() {
  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Which filter do I need?", href: "/help/which-filter" },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          The 60-second filter finder
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
          Three questions. One filter recommendation.
        </h1>
        <p className="text-lg text-ink/80 mt-6 leading-relaxed">
          We sell water filters for a living. Here&rsquo;s how we&rsquo;d
          narrow it down at the counter — without trying to upsell you onto a
          system you don&rsquo;t need.
        </p>
      </header>

      <ol className="mt-16 space-y-16 lg:space-y-20 max-w-3xl">
        {FLOW.map((step) => (
          <li key={step.n}>
            <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-6">
              <p className="text-3xl font-semibold tabular text-brand">
                {step.n}
              </p>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {step.q}
                </h2>
                <p className="text-base text-ink/85 mt-4 leading-relaxed">
                  {step.a}
                </p>
                <ButtonLink href={step.cta.href} variant="ghost" className="mt-5">{step.cta.label} →</ButtonLink>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-24 max-w-3xl bg-mist border border-line rounded-sm p-8 lg:p-10">
        <h2 className="text-2xl font-semibold tracking-tight">
          Still unsure? Talk to us.
        </h2>
        <p className="text-base text-ink/80 mt-3 leading-relaxed">
          Five minutes on the phone is faster than another hour reading
          contradictory forum posts. Tell us your suburb, your supply (town,
          tank, bore) and what tastes off — we&rsquo;ll point you at the right
          system. Same price either way.
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
            Email us
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
