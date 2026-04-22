// lib/woo.ts
const WOO_URL = process.env.NEXT_PUBLIC_WOO_URL;

if (!WOO_URL) {
  throw new Error("NEXT_PUBLIC_WOO_URL is not set in .env.local");
}

// Types for what we get back from Woo Store API
export type WooImage = {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
};

export type WooPrice = {
  price: string;
  regular_price: string;
  sale_price: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
};

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  sku: string;
  on_sale: boolean;
  prices: WooPrice;
  images: WooImage[];
  categories: { id: number; name: string; slug: string }[];
  is_in_stock: boolean;
  is_purchasable: boolean;
  attributes: {
    id: number;
    name: string;
    taxonomy: string;
    has_variations: boolean;
    terms: { id: number; name: string; slug: string }[];
  }[];
};

// Fetch a list of products
export async function getProducts(params?: {
  per_page?: number;
  page?: number;
  category?: string;
  search?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.per_page) searchParams.set("per_page", String(params.per_page));
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.category) searchParams.set("category", params.category);
  if (params?.search) searchParams.set("search", params.search);

  const url = `${WOO_URL}/wp-json/wc/store/v1/products?${searchParams.toString()}`;

  const res = await fetch(url, {
    // Cache on the server for 5 minutes
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return (await res.json()) as WooProduct[];
}

// Fetch a single product by slug
export async function getProductBySlug(slug: string) {
  const url = `${WOO_URL}/wp-json/wc/store/v1/products?slug=${slug}`;

  const res = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  const products = (await res.json()) as WooProduct[];
  return products[0] ?? null;
}

// Format a price string from Woo (returned in minor units, e.g. "6995" = $69.95)
export function formatPrice(
  price: string,
  minorUnit: number = 2,
  symbol: string = "$"
) {
  const value = Number(price) / Math.pow(10, minorUnit);
  return `${symbol}${value.toFixed(2)}`;
}