import type { BlogPost } from "@/types/blog";

import { post as wholeHouseGuide } from "./posts/whole-house-water-filter-australia-buyers-guide";
import { post as roVsCarbon } from "./posts/reverse-osmosis-vs-carbon-block-fluoride-removal";
import { post as tankUv } from "./posts/tank-water-filter-uv-sterilisation-australia";
import { post as watermarkExplained } from "./posts/watermark-certification-explained-australia";
import { post as commercialBubblers } from "./posts/specifying-commercial-drinking-bubblers-schools-gyms";
import { post as cartridgeReplacement } from "./posts/when-to-replace-water-filter-cartridges";
import { post as renterFilters } from "./posts/best-water-filter-for-renters-australia";

/**
 * Posts are sorted newest-first by `publishedAt`. New posts: drop a file
 * into `./posts/` exporting `post: BlogPost`, then add an import here.
 * Static-rendered routes pick them up at build time.
 */
const ALL_POSTS: BlogPost[] = [
  wholeHouseGuide,
  roVsCarbon,
  tankUv,
  watermarkExplained,
  commercialBubblers,
  cartridgeReplacement,
  renterFilters,
].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function getAllPosts(): BlogPost[] {
  return ALL_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

/**
 * Related posts. Strategy: same topic first, then any other post excluding
 * the current one. Cap at 3.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameTopic = ALL_POSTS.filter(
    (p) => p.slug !== post.slug && p.topic === post.topic
  );
  const others = ALL_POSTS.filter(
    (p) => p.slug !== post.slug && p.topic !== post.topic
  );
  return [...sameTopic, ...others].slice(0, limit);
}

/**
 * Approximate reading time. Average adult reading speed is ~225 wpm; we
 * use 220 to round generously. Counts every word in every text-bearing
 * block. Approximation is acceptable here — accuracy doesn't matter, the
 * intent is "is this 4 minutes or 14 minutes?"
 */
export function getReadingTime(post: BlogPost): number {
  const WPM = 220;
  let words = 0;
  for (const block of post.body) {
    switch (block.type) {
      case "paragraph":
      case "quote":
        words += countWords(block.text);
        break;
      case "heading":
        words += countWords(block.text);
        break;
      case "list":
        for (const item of block.items) words += countWords(item);
        break;
      case "callout":
        words += countWords(block.body);
        if (block.title) words += countWords(block.title);
        break;
      case "comparison":
        for (const row of block.rows)
          for (const cell of row) words += countWords(cell);
        break;
      case "product-link":
        if (block.blurb) words += countWords(block.blurb);
        break;
    }
  }
  return Math.max(1, Math.round(words / WPM));
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Format a published date for display. AU locale, long form.
 * Server-rendered, so timezone-stable.
 */
export function formatPublishedDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Sydney",
  });
}
