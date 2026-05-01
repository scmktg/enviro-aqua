import { BUSINESS } from "@/lib/business";

/**
 * Three trust pillars surfaced after the product description. Specifically
 * positioned to land just before the "complete the build" cross-sell —
 * the buyer has read the spec, they have one or two doubts, this is the
 * page section that closes them.
 *
 * Each pillar maps to one of the top-3 customer objections from the brand
 * brief: fitment ("genuine cartridges"), shipping ("same-day Wyong
 * dispatch"), and legitimacy ("Australian, ABN, real address, real
 * showroom").
 *
 * The dispatch pillar's "from" prices are derived from the rate card in
 * BUSINESS.shipping rather than hardcoded — when the shipping table
 * changes, this section updates.
 */
export function TrustBlock() {
  const standardFrom = Math.min(
    ...BUSINESS.shipping.standard.tiers.map((t) => t.price)
  );
  const expressFrom = Math.min(
    ...BUSINESS.shipping.express.tiers.map((t) => t.price)
  );

  const pillars = [
    {
      title: "Australian-owned, real warehouse, real showroom",
      body:
        "Family-run operation based on the NSW Central Coast. Real warehouse and showroom in Wyong, NSW — visit, collect, ask questions in person. Every order ships with a proper tax invoice and ABN, not a Wish receipt.",
    },
    {
      title: "Same-day dispatch from Wyong NSW",
      body: `Order before ${BUSINESS.dispatch.cutoffTime} on a business day and it leaves our Wyong warehouse the same day. Standard freight from $${standardFrom.toFixed(2)}, express from $${expressFrom.toFixed(2)}. Free Click & Collect from the showroom — usually ready in ${BUSINESS.clickAndCollect.typicalReadyHours} hours.`,
    },
    {
      title: "Genuine cartridges, lifetime parts support",
      body:
        'Every system uses standard 10" or 20" Australian housings, so cartridges and parts stay available — from us, from your local plumber\'s merchant, from anywhere. No proprietary lock-in.',
    },
  ];

  return (
    <section aria-label="Why buy from Enviro Aqua" className="mt-12 lg:mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 border-y border-line py-10">
        {pillars.map((pillar) => (
          <div key={pillar.title}>
            <h3 className="text-base font-semibold tracking-tight">
              {pillar.title}
            </h3>
            <p className="text-sm text-ink/80 mt-2 leading-relaxed">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
