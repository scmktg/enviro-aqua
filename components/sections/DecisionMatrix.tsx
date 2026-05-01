import Link from "next/link";
import type { Category } from "@/types/category";

interface DecisionMatrixProps {
  category: Category;
}

/**
 * The decision matrix on the category landing page. Maps each sub-category's
 * `decisionLine` into a tabular question→answer→link layout — the visitor
 * gets routed to the right sub-category in one scan.
 *
 * Critically, this is NOT three icons in a row. It's a question-and-answer
 * table with intentional copy on each row — the kind of thing a counter
 * salesperson would say before pointing.
 */
export function DecisionMatrix({ category }: DecisionMatrixProps) {
  const rows = category.subCategories.filter((s) => s.decisionLine);

  return (
    <section
      aria-label={`${category.name} decision support`}
      className="mt-10 mb-12"
    >
      <div className="border border-line rounded-sm overflow-hidden">
        <header className="bg-mist px-5 py-4 border-b border-line">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Not sure which one?
          </p>
          <h2 className="text-lg font-semibold tracking-tight mt-1">
            Match your situation to the right system.
          </h2>
        </header>
        <ul className="divide-y divide-line">
          {rows.map((sub) => (
            <li key={sub.slug}>
              <Link
                href={`/shop/${category.slug}/${sub.slug}`}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-6 items-center px-5 py-4 group hover:bg-mist transition-colors duration-fast"
              >
                <div>
                  <span className="text-sm text-muted block">
                    {sub.decisionLine}
                  </span>
                  <span className="text-base font-medium text-ink mt-0.5 inline-block">
                    {sub.heading}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="text-brand text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-fast"
                >
                  Shop
                  <span>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
