import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

/**
 * The decision-support module. This is the single biggest objection-killer
 * on the site: every visitor lands here with one of three questions —
 * "do I rent or own?", "drinking water or whole house?", "tank/town water?"
 *
 * We answer all three in a 60-second scan, then route them to a category.
 * Layout is a 2-column editorial split rather than the standard
 * three-icons-in-a-row, because the row pattern doesn't scale to nuanced
 * branching.
 */
const PATHS = [
  {
    eyebrow: "Step 1 — Where you live",
    rows: [
      {
        condition: "You rent",
        result: "Bench Top — no plumbing required",
        href: "/shop/water-filters/bench-top",
      },
      {
        condition: "You own — drinking water only",
        result: "Under Sink with a dedicated tap",
        href: "/shop/water-filters/under-sink",
      },
      {
        condition: "You own — every tap",
        result: "Whole House Big Blue",
        href: "/shop/water-filters/whole-house",
      },
    ],
  },
  {
    eyebrow: "Step 2 — Your water source",
    rows: [
      {
        condition: "Town water (chlorinated)",
        result: "Sediment + carbon stages cover it",
        href: "/shop/water-filters/under-sink",
      },
      {
        condition: "Tank or bore water",
        result: "Add UV sterilisation",
        href: "/shop/water-filters/uv-sterilisation",
      },
      {
        condition: "High TDS, fluoride or PFAS concerns",
        result: "Reverse Osmosis is the only system that reduces them",
        href: "/shop/water-filters/reverse-osmosis",
      },
    ],
  },
];

export function HomeDecisionMatrix() {
  return (
    <section
      aria-labelledby="decision-heading"
      className="bg-mist"
    >
      <div className="container-site py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted mb-4">
              The 60-second filter finder
            </p>
            <h2
              id="decision-heading"
              className="text-3xl md:text-4xl font-semibold tracking-tight"
            >
              Two questions. One filter.
            </h2>
            <p className="text-base text-ink/80 mt-5 leading-relaxed">
              Most people overthink this. Tell us where you live and what
              you&rsquo;re on, and we&rsquo;ll point you at the right system.
              No quiz, no email gate, no upsells.
            </p>
            <div className="mt-7">
              <ButtonLink href="/help/which-filter">Open the full filter finder</ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-10">
            {PATHS.map((path) => (
              <div key={path.eyebrow}>
                <p className="text-xs uppercase tracking-[0.18em] text-muted mb-4">
                  {path.eyebrow}
                </p>
                <ul className="bg-paper border border-line rounded-sm divide-y divide-line">
                  {path.rows.map((row) => (
                    <li key={row.condition}>
                      <Link
                        href={row.href}
                        className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr_auto] gap-3 sm:gap-6 items-center px-5 py-4 group hover:bg-mist transition-colors duration-fast"
                      >
                        <span className="text-sm text-muted">
                          {row.condition}
                        </span>
                        <span className="text-sm font-medium text-ink">
                          {row.result}
                        </span>
                        <span
                          aria-hidden
                          className="hidden sm:inline-flex text-brand text-sm font-medium items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast"
                        >
                          Shop
                          <span>→</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
