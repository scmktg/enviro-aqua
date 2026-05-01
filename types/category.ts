import type { PrimaryCategory } from "./product";

export interface SubCategory {
  slug: string;
  name: string;
  /** PLP H1 — usually the same as name but sometimes more SEO-targeted. */
  heading: string;
  /** Lead paragraph below the H1. Reads like the buyer's question, answered. */
  intro: string;
  /** Decision-matrix line — surfaces in the CategoryLanding component. */
  decisionLine: string;
}

export interface Category {
  slug: PrimaryCategory;
  name: string;
  /** Short label for the nav. */
  navLabel: string;
  /** Landing page H1. */
  heading: string;
  /** One-line subhead under the H1 — the SEO-aware sentence. */
  subhead: string;
  /** ~80-word landing intro. Written for both buyer comprehension and search. */
  intro: string;
  /** Featured CTA copy in the mega-menu. */
  navCta: {
    eyebrow: string;
    title: string;
    body: string;
    href: string;
  };
  subCategories: SubCategory[];
}
