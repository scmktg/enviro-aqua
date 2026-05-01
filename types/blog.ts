/**
 * Blog post structure. Posts are authored as TypeScript modules (rather
 * than MDX) so the catalogue/category references that drive internal
 * linking can be type-checked at build. Each post compiles to a
 * structured `BlogPost` consumed by the renderer.
 *
 * Migration path: when the content team grows past ~20 posts, this can
 * be swapped for MDX or a CMS — the consumer signature (`BlogPost`)
 * doesn't change. Today the simplicity is the point.
 */

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; tone: "info" | "warning"; title?: string; body: string }
  | {
      type: "comparison";
      headers: [string, string, string];
      rows: [string, string, string][];
    }
  | {
      type: "product-link";
      productSlugs: string[];
      heading?: string;
      blurb?: string;
    }
  | { type: "quote"; text: string; attribution?: string };

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogPost {
  /** URL slug under /blog/[slug]. Must be unique. */
  slug: string;
  /** Article title — used as H1 and meta title. */
  title: string;
  /** SEO meta description, ~155 chars. */
  description: string;
  /** Short standfirst shown on listing and at top of post. */
  excerpt: string;
  /** ISO date string (YYYY-MM-DD). */
  publishedAt: string;
  /** ISO date string — last edit. */
  updatedAt?: string;
  author: BlogAuthor;
  /** Lead image URL — relative to public/ or absolute. */
  heroImage?: string;
  /** Lead image alt text. */
  heroImageAlt?: string;
  /** Topical tag — drives related-post grouping. */
  topic:
    | "Whole House"
    | "Drinking Water"
    | "Reverse Osmosis"
    | "Tank & Bore"
    | "Commercial"
    | "Maintenance"
    | "Standards";
  /** Primary keyword cluster targeted. Used in JSON-LD `keywords`. */
  keywords: string[];
  /** Internal links to category/sub-category pages — drives the "Up next" footer. */
  relatedCategories?: { label: string; href: string }[];
  /** Product slugs referenced anywhere in the post — surfaces in "Products mentioned" footer. */
  relatedProducts?: string[];
  /** Body content. */
  body: BlogBlock[];
}
