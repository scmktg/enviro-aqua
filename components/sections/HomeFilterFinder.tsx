import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Reframed filter finder. Previous version had a two-step decision
 * matrix (rent/own → town/tank/bore) which doesn't match how customers
 * actually decide. The real question is much simpler: what specific
 * concern brought you here?
 *
 * The four answers route directly to a sub-category page. The fifth
 * action (call us) handles edge cases — bore water, fluoride
 * concerns, multi-system installs — without making the form
 * complex enough to need branching.
 */
const ANSWERS = [
  {
    question: "I want filtered water at every tap",
    route: "Whole house filter",
    href: "/shop/water-filters/whole-house-filters",
    note: "Big Blue stack at the mains line",
  },
  {
    question: "Just drinking water — clean install, hidden",
    route: "Under sink filter",
    href: "/shop/water-filters/under-sink-ro-systems",
    note: "With a dedicated tap or 3-way mixer",
  },
  {
    question: "Just drinking water — no plumber, no install",
    route: "Bench top filter",
    href: "/shop/water-filters/under-sink-ro-systems",
    note: "Connects to your existing tap",
  },
  {
    question: "I'm worried about fluoride, PFAS or dissolved solids",
    route: "Reverse osmosis",
    href: "/shop/water-filters/under-sink-ro-systems",
    note: "The only system that meaningfully reduces them",
  },
];

export function HomeFilterFinder() {
  return (
    <section
      aria-labelledby="finder-heading"
      className="bg-mist border-y border-line"
    >
      <div className="container-site py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
              The 30-second filter finder
            </p>
            <h2
              id="finder-heading"
              className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
            >
              One question. Four answers.
            </h2>
            <p className="text-base text-ink/80 mt-5 leading-relaxed max-w-prose">
              Most people overthink which filter to buy. Tell us what you
              want filtered, and where — we&rsquo;ll route you straight to
              the right shelf.
            </p>
            <div className="mt-7 space-y-3">
              <ButtonLink href="/help/which-filter">
                Read the long-form guide
              </ButtonLink>
              <p className="text-sm text-muted leading-relaxed">
                On bore or tank water, or unsure where to start?{" "}
                <Link
                  href="/contact"
                  className="text-brand hover:text-brand-700 underline underline-offset-4"
                >
                  Talk to us first
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] text-muted mb-4">
              Pick the one that sounds like you
            </p>
            <ol className="bg-paper border border-line rounded-sm divide-y divide-line">
              {ANSWERS.map((answer, i) => (
                <li key={answer.href}>
                  <Link
                    href={answer.href}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:gap-6 items-center px-5 py-5 group hover:bg-mist transition-colors duration-fast"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-muted tabular mb-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="text-base font-medium text-ink leading-snug">
                        &ldquo;{answer.question}&rdquo;
                      </p>
                      <p className="text-sm text-muted mt-1.5 leading-relaxed">
                        {answer.note}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm font-semibold text-ink">
                        {answer.route}
                      </p>
                      <span
                        aria-hidden
                        className="text-brand text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast mt-1"
                      >
                        Shop
                        <span>→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}