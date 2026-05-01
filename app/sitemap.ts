import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";
import { getAllProducts } from "@/lib/catalogue";
import { getAllPosts } from "@/lib/blog";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://enviroaqua.com.au";

/**
 * Priority weighting matches the brand's SEO hierarchy. Google treats
 * priority as a relative-importance hint within a single sitemap, so
 * we use it to communicate intent, not absolute crawl rate.
 *
 *   water-filters       → 0.9   (primary specialty)
 *   commercial-bubblers → 0.8   (secondary specialty)
 *   kitchen-taps        → 0.6   (paired with filters)
 *   bathroom            → 0.4   (de-emphasised)
 *
 * Sub-categories inherit and step down by 0.1; products step down by
 * a further 0.1.
 */
const CATEGORY_PRIORITY: Record<string, number> = {
  "water-filters": 0.9,
  "commercial-bubblers": 0.8,
  "kitchen-taps": 0.6,
  bathroom: 0.4,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: now,
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE}/shop`,
      lastModified: now,
      priority: 0.85,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE}/help/which-filter`,
      lastModified: now,
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE}/blog`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE}/showroom`,
      lastModified: now,
      priority: 0.75,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE}/shipping`,
      lastModified: now,
      priority: 0.6,
      changeFrequency: "monthly",
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.flatMap((cat) => {
    const catPriority = CATEGORY_PRIORITY[cat.slug] ?? 0.5;
    const top = {
      url: `${BASE}/shop/${cat.slug}`,
      lastModified: now,
      priority: catPriority,
      changeFrequency: "weekly" as const,
    };
    const subs = cat.subCategories.map((sub) => ({
      url: `${BASE}/shop/${cat.slug}/${sub.slug}`,
      lastModified: now,
      priority: Math.max(0.1, catPriority - 0.1),
      changeFrequency: "weekly" as const,
    }));
    return [top, ...subs];
  });

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((p) => {
    const catPriority = CATEGORY_PRIORITY[p.primaryCategory] ?? 0.5;
    return {
      url: `${BASE}/product/${p.slug}`,
      lastModified: now,
      priority: Math.max(0.1, catPriority - 0.2),
      changeFrequency: "weekly",
    };
  });

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
