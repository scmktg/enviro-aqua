import type { Product } from "@/types/product";
import {
  BUSINESS,
  postalAddress,
  openingHoursSpec,
} from "@/lib/business";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://enviroaqua.com.au";
const SITE_NAME = BUSINESS.brandName;

export function siteUrl(path = ""): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE_URL}${path}`;
}

// Escapes characters that could break out of a <script> block when the
// JSON is interpolated via dangerouslySetInnerHTML.
const JSON_ESCAPES: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};
const JSON_ESCAPE_RE = new RegExp("[<>&\\u2028\\u2029]", "g");

function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(JSON_ESCAPE_RE, (c) => JSON_ESCAPES[c]!);
}

/**
 * Product schema.org JSON-LD. Keeps Google happy on PDPs and unlocks
 * rich-result eligibility (price, availability, rating).
 */
export function productJsonLd(product: Product): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    sku: product.sku,
    image: product.images,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url: siteUrl(`/product/${product.slug}`),
      priceCurrency: "AUD",
      price: product.price.toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stockStatus === "out_of_stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        address: postalAddress(),
      },
    },
  };
  return safeJson(data);
}

export function breadcrumbJsonLd(
  trail: { label: string; url: string }[]
): string {
  return safeJson({ "@context": "https://schema.org", ...breadcrumbData(trail) });
}

/**
 * LocalBusiness JSON-LD. This replaces a generic `Organization` entry
 * because the brand has a real physical premises (the Wyong showroom).
 * `LocalBusiness` makes Enviro Aqua eligible for the Google Maps
 * knowledge panel and the local-pack carousel for "water filter near me"
 * searches in the Central Coast region.
 *
 * Schema includes: full postal address, geo coordinates, opening hours,
 * areaServed (Central Coast + extended catchment), telephone, ABN as
 * `taxID`, and `sameAs` for social profiles when added.
 */
export const LOCAL_BUSINESS_ID = `${SITE_URL}#localbusiness`;

function localBusinessData() {
  return {
    "@type": ["LocalBusiness", "Store"],
    "@id": LOCAL_BUSINESS_ID,
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: siteUrl("/logo.webp"),
    image: siteUrl("/opengraph-image"),
    description:
      "Australian water filter specialists, based in Wyong on the NSW Central Coast. Whole-house, under-sink, bench-top and reverse osmosis water filters, plus WaterMark-certified commercial drinking bubblers. Click & collect from Wyong, Australia-wide shipping.",
    telephone: BUSINESS.phone.tel,
    email: BUSINESS.email,
    taxID: BUSINESS.abn,
    priceRange: "$$",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.address.latitude,
      longitude: BUSINESS.address.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${BUSINESS.address.latitude},${BUSINESS.address.longitude}`,
    openingHoursSpecification: openingHoursSpec(),
    areaServed: [
      { "@type": "AdministrativeArea", name: "Central Coast Council, NSW" },
      ...BUSINESS.serviceArea.suburbs.map((suburb) => ({
        "@type": "City",
        name: suburb,
        containedInPlace: { "@type": "State", name: "New South Wales" },
      })),
      { "@type": "Country", name: "Australia" },
    ],
    knowsAbout: [
      "Water filtration",
      "Reverse osmosis",
      "WaterMark certification",
      "Commercial drinking water",
      "Whole house water filters",
      "Under sink water filters",
      "Bench top water filters",
      "UV water sterilisation",
      "Replacement filter cartridges",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS.phone.tel,
        contactType: "customer service",
        areaServed: "AU",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        email: BUSINESS.email,
        contactType: "customer service",
        areaServed: "AU",
      },
    ],
    paymentAccepted: "Cash, Credit Card, Apple Pay, Google Pay, Bank Transfer",
    currenciesAccepted: "AUD",
    sameAs: [],
  };
}

function breadcrumbData(trail: { label: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.label,
      item: siteUrl(t.url),
    })),
  };
}

function faqData(faq: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function localBusinessJsonLd(): string {
  return safeJson({ "@context": "https://schema.org", ...localBusinessData() });
}

/**
 * Combined JSON-LD for a local SEO hub page. Emits a single `@graph`
 * containing the canonical LocalBusiness entity (referenced by `@id` so
 * Google merges with other emissions of the same business), the page's
 * breadcrumbs, and the page's FAQ. One script tag per page.
 */
export function localHubJsonLd(input: {
  trail: { label: string; url: string }[];
  faq: { q: string; a: string }[];
}): string {
  return safeJson({
    "@context": "https://schema.org",
    "@graph": [
      localBusinessData(),
      breadcrumbData(input.trail),
      faqData(input.faq),
    ],
  });
}

/**
 * Backwards-compat alias. Older imports of `organizationJsonLd` still
 * work; they now emit the richer LocalBusiness payload.
 */
export const organizationJsonLd = localBusinessJsonLd;

/**
 * Article schema.org JSON-LD for blog posts. Author is rendered as a
 * Person within the Organization (the writer is on staff). Image is
 * intentionally optional — most posts won't have a hero image and Google
 * tolerates omission for `Article` type (it's strict only on
 * `NewsArticle`).
 */
export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  authorName: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
  image?: string;
}): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    author: {
      "@type": "Person",
      name: input.authorName,
      worksFor: { "@type": "Organization", name: SITE_NAME },
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: siteUrl("/logo.webp") },
    },
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    keywords: input.keywords.join(", "),
    inLanguage: "en-AU",
    ...(input.image ? { image: input.image } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
  };
  return safeJson(data);
}
