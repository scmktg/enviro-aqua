import Link from "next/link";
import type { Category } from "@/types/category";
import { DecisionMatrix } from "./DecisionMatrix";

interface CategoryLandingProps {
  category: Category;
}

/**
 * Header section for category landing pages. This area is the SEO landing
 * for the category — H1 + intro paragraph carries the keyword cluster, and
 * the sub-category strip gives Google explicit internal linking to the
 * sub-pages we want indexed.
 */
export function CategoryLandingHeader({ category }: CategoryLandingProps) {
  return (
    <header>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        {category.heading}
      </h1>
      <p className="text-lg text-ink/80 mt-3 max-w-prose">{category.subhead}</p>
      <p className="text-base text-ink/75 mt-6 max-w-prose leading-relaxed">
        {category.intro}
      </p>

      {category.subCategories.length > 1 && (
        <nav
          aria-label={`${category.name} sub-categories`}
          className="mt-8"
        >
          <ul className="flex flex-wrap gap-2">
            {category.subCategories.map((sub) => (
              <li key={sub.slug}>
                <Link
                  href={`/shop/${category.slug}/${sub.slug}`}
                  className="inline-flex items-center h-9 px-3 text-sm bg-paper border border-line hover:border-ink rounded-sm transition-colors duration-fast"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <DecisionMatrix category={category} />
    </header>
  );
}
