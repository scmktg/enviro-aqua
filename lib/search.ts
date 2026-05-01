import type { Product } from "@/types/product";

/**
 * Lightweight in-memory search. Production swap-in is Shopify Storefront
 * Search API or Algolia — same result shape returned.
 *
 * Scoring is intentionally simple: exact-match SKU and title-token matches
 * are weighted heaviest. Good enough for a 40-product catalogue and stays
 * useful for ~500 SKUs before we'd want to switch.
 */

export interface SearchResult {
  product: Product;
  score: number;
}

export function searchProducts(
  products: Product[],
  query: string,
  limit = 10
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const terms = q.split(/\s+/).filter(Boolean);
  const results: SearchResult[] = [];

  for (const product of products) {
    const haystacks = {
      title: product.title.toLowerCase(),
      sku: product.sku.toLowerCase(),
      tags: product.tags.join(" ").toLowerCase(),
      sub: product.subCategory.toLowerCase(),
      facets: facetText(product).toLowerCase(),
      desc: product.shortDescription.toLowerCase(),
    };

    let score = 0;

    // Exact SKU match — almost always what a tradie searches.
    if (haystacks.sku === q) {
      score += 1000;
    } else if (haystacks.sku.includes(q)) {
      score += 50;
    }

    for (const term of terms) {
      if (haystacks.title.includes(term)) score += 10;
      if (haystacks.title.startsWith(term)) score += 5;
      if (haystacks.tags.includes(term)) score += 6;
      if (haystacks.sub.includes(term)) score += 4;
      if (haystacks.facets.includes(term)) score += 3;
      if (haystacks.desc.includes(term)) score += 1;
    }

    if (score > 0) {
      results.push({ product, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

function facetText(product: Product): string {
  const f = product.facets;
  return [
    f.flow_rate,
    f.housing_size,
    ...(f.technology ?? []),
    ...(f.removes ?? []),
    ...(f.application ?? []),
    f.micron,
  ]
    .filter(Boolean)
    .join(" ");
}
