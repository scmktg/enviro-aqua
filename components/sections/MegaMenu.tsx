import Link from "next/link";
import type { Category } from "@/types/category";

interface MegaMenuProps {
  category: Category;
  onClose?: () => void;
}

/**
 * Mega-menu dropdown rendered under the top-level nav. Two-column layout:
 *  - Left: grid of sub-category links (the actual nav)
 *  - Right: a CTA card pinned to a single specific action per category.
 *
 * The CTA card is critical — without it, the dropdown is a dead-end of
 * links. With it, the dropdown becomes a conversion surface: someone
 * skimming "Water Filters" gets shown a path to the filter-finder; someone
 * on "Commercial Bubblers" gets shown a path to a multi-site quote.
 */
export function MegaMenu({ category, onClose }: MegaMenuProps) {
  return (
    <div
      className="absolute top-full left-0 right-0 bg-paper border-b border-line"
      role="region"
      aria-label={`${category.name} menu`}
    >
      <div className="container-site grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 py-10">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-6">
            {category.name}
          </p>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {category.subCategories.map((sub) => (
              <li key={sub.slug}>
                <Link
                  href={`/shop/${category.slug}/${sub.slug}`}
                  onClick={onClose}
                  className="group inline-flex items-center justify-between w-full text-sm text-ink hover:text-brand transition-colors duration-fast py-1"
                >
                  <span>{sub.name}</span>
                  <span
                    aria-hidden
                    className="text-muted group-hover:text-brand opacity-0 group-hover:opacity-100 transition-all duration-fast translate-x-[-4px] group-hover:translate-x-0"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/shop/${category.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-brand hover:text-brand-700 transition-colors duration-fast"
          >
            Shop all {category.name.toLowerCase()}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <Link
          href={category.navCta.href}
          onClick={onClose}
          className="group block bg-mist hover:bg-brand-50 transition-colors duration-fast rounded-sm p-6 border border-line hover:border-brand"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            {category.navCta.eyebrow}
          </p>
          <h3 className="text-lg font-semibold mt-2 tracking-tight">
            {category.navCta.title}
          </h3>
          <p className="text-sm text-muted mt-3 leading-relaxed">
            {category.navCta.body}
          </p>
          <p className="text-sm font-medium text-brand mt-5 inline-flex items-center gap-1">
            Get started
            <span
              aria-hidden
              className="transition-transform duration-fast group-hover:translate-x-1"
            >
              →
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
}
