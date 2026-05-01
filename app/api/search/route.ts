import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/search";
import { getAllProducts } from "@/lib/catalogue";

/**
 * Search endpoint. Currently the SearchOverlay calls into the in-memory
 * search index directly, which is fine for a 40-product fixture. This
 * endpoint exists for two reasons:
 *   1. It's the swap point for Shopify's storefront search later — the
 *      same response shape is returned, so the overlay code doesn't change.
 *   2. It supports query parameter access ("/api/search?q=ro+membrane") for
 *      tools like Slackbots, sales-team scripts, or competitor monitoring.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim();
  const limitRaw = parseInt(url.searchParams.get("limit") ?? "10", 10);
  const limit = Number.isFinite(limitRaw)
    ? Math.min(40, Math.max(1, limitRaw))
    : 10;

  if (q.length < 2) {
    return NextResponse.json({ query: q, results: [] });
  }

  const results = searchProducts(getAllProducts(), q, limit);
  return NextResponse.json({
    query: q,
    results: results.map(({ product, score }) => ({
      id: product.id,
      sku: product.sku,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0] ?? null,
      url: `/product/${product.slug}`,
      score,
    })),
  });
}
