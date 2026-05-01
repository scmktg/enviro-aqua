/**
 * Product types mirror what we'll receive from Shopify Storefront once the
 * integration is live. The catalogue.ts loader hydrates these from the JSON
 * fixture today, then is swapped for a Shopify GraphQL fetch with the same
 * return shape. Anything consuming a Product never needs to change.
 */

export type StockStatus = "in_stock" | "out_of_stock" | "low_stock";

export type PrimaryCategory =
  | "water-filters"
  | "commercial-bubblers"
  | "kitchen-taps"
  | "bathroom";

/**
 * Certifications a product genuinely carries. Only set on products where
 * this is verifiably true — never inferred or assumed. Misrepresenting
 * certifications is an ACCC matter under Australian Consumer Law, so
 * the data layer enforces honesty: if it isn't here, the UI doesn't
 * show it.
 */
export type Certification =
  | "WaterMark" // AS/NZS 4020 + AS/NZS 3497 etc — required for permanent connection to mains
  | "WELS" // Water Efficiency Labelling Scheme — required on tapware sold in AU
  | "NSF" // NSF International standards (e.g. NSF 42, 53, 58)
  | "AS/NZS 4020" // Drinking water materials standard
  | "AS/NZS 3497"; // Drinking water treatment units — plumbed-in

export interface ProductFacets {
  /** e.g. "1500 LPD" — surfaces on PDP spec table and as a filter chip. */
  flow_rate?: string;
  /** Cartridge / housing dimensions, the #1 fitment question. */
  housing_size?: string;
  /** Filter media — "Reverse Osmosis", "Carbon Block (CTO)" etc. */
  technology?: string[];
  /** Contaminants reduced — "fluoride", "chlorine", "PFAS" etc. */
  removes?: string[];
  /** Use case — "rental friendly", "commercial", "off-grid". */
  application?: string[];
  /** Display-only price band so we can show distribution on PLP. */
  price_band?: string;
  /** Stages count (whole-house, RO). */
  stages?: number;
  /** Micron rating for sediment-style cartridges. */
  micron?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  title: string;
  primaryCategory: PrimaryCategory;
  subCategory: string;
  categoryPath: string[];
  /** Display price, AUD. Always a number internally; formatting is a view concern. */
  price: number;
  /** Crossed-out RRP if on sale. */
  regularPrice: number;
  onSale: boolean;
  stockStatus: StockStatus;
  shortDescription: string;
  longDescription: string;
  facets: ProductFacets;
  images: string[];
  tags: string[];
  /** Certifications this product genuinely carries — empty array if none. */
  certifications: Certification[];
  /** "Pair with X" hint surfaced in cross-sell. */
  kitHint: string | null;
  seoTitle: string;
  seoDescription: string;
}
