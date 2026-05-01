/**
 * Product catalogue fixture. In production this is replaced by
 * `getProducts()` calls into the Shopify Storefront API — the consumer
 * shape (the `Product` type) is unchanged, so callers do not break.
 */

import type { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "12501",
    sku: "EA-WF-WH-016",
    slug: "triple-big-blue-whole-house-water-filter-20-x-4-5-3-stage",
    title: "Triple Big Blue Whole House Water Filter — 20\" x 4.5\" (3 Stage)",
    primaryCategory: "water-filters",
    subCategory: "whole-house",
    categoryPath: ["Water Filters", "Whole House Water Filters"],
    price: 1299.95,
    regularPrice: 1299.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Whole-house water filter for point-of-entry installation — treats every tap in the home.",
    longDescription: `Point-of-entry whole-house filtration that treats every outlet in your home — kitchen, bathrooms, laundry and garden. Protects plumbing and appliances, reduces chlorine taste, and captures sediment from town water, rain tanks and bore supplies.

**Specifications**

• **3-stage filtration**
• **Housing size:** 20" x 4.5" (standard Australian sizing)
• **Filtration rating:** 5 micron
• **Reduces:** sediment, chlorine, heavy metals, taste & odour
• **Certifications:** WaterMark
• **Finish:** Brushed Nickel, Stainless Steel

**Why this filter**

• Softer water for showering and washing
• Reduced chlorine taste and smell from every tap
• Protects hot-water systems and washing machines from sediment damage
• Standard 10" or 20" Big Blue cartridge housings — cartridges available Australia-wide
• Best paired with an under-sink RO system for drinking water

**Installation**

Installed at your mains-water point-of-entry by a licensed plumber. Standard whole-house installs take 2–4 hours.`,
    facets: {
      housing_size: "20\" x 4.5\"",
      removes: ["sediment", "chlorine", "heavy metals", "taste & odour"],
      application: ["town water", "bore water", "rental friendly"],
      price_band: "$1,000+",
      stages: 3,
      micron: "5 micron",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2025/05/WM-3-St-WH-BB.png",
      "https://enviroaqua.com.au/wp-content/uploads/2025/05/WM-3-St-WH-BB.png",
      "https://enviroaqua.com.au/wp-content/uploads/2025/05/WH-BB-3-Stainless.jpg-5.png",
      "https://enviroaqua.com.au/wp-content/uploads/2025/05/3-BB5.png",
      "https://enviroaqua.com.au/wp-content/uploads/2025/05/3-BB6.png-6.png",
      "https://enviroaqua.com.au/wp-content/uploads/2025/05/WM-3-St-WH-BB.png-7.png",
    ],
    tags: ["20 x 4.5 cartridge", "whole house water filter", "3 stage filter", "bore water filter", "watermark certified", "australia"],
    certifications: ["WaterMark"],
    kitHint: "Pair with UV Steriliser + annual cartridge set",
    seoTitle: "Triple Big Blue Whole House Water Filter — 20\" x… | Enviro Aqua",
    seoDescription: "Treat every tap in your home — whole-house filtration for town, tank and bore water. 3-stage, 20\" x 4.5\". Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "12509",
    sku: "EA-WF-WH-017",
    slug: "deluxe-stainless-steel-lockable-whole-house-water-filter-3-stage-big-blue",
    title: "Deluxe Stainless Steel Lockable Whole House Water Filter — 3 Stage Big Blue",
    primaryCategory: "water-filters",
    subCategory: "whole-house",
    categoryPath: ["Water Filters", "Whole House Water Filters"],
    price: 1300.0,
    regularPrice: 1300.0,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Whole-house water filter for point-of-entry installation — treats every tap in the home.",
    longDescription: `Point-of-entry whole-house filtration that treats every outlet in your home — kitchen, bathrooms, laundry and garden. Protects plumbing and appliances, reduces chlorine taste, and captures sediment from town water, rain tanks and bore supplies.

**Specifications**

• **Filtration rating:** 5 micron
• **Filtration media:** Sediment (PP)
• **Reduces:** sediment, chlorine, taste & odour
• **Finish:** Stainless Steel

**Why this filter**

• Softer water for showering and washing
• Reduced chlorine taste and smell from every tap
• Protects hot-water systems and washing machines from sediment damage
• Standard 10" or 20" Big Blue cartridge housings — cartridges available Australia-wide
• Best paired with an under-sink RO system for drinking water

**Installation**

Installed at your mains-water point-of-entry by a licensed plumber. Standard whole-house installs take 2–4 hours.`,
    facets: {
      technology: ["Sediment (PP)"],
      removes: ["sediment", "chlorine", "taste & odour"],
      price_band: "$1,000+",
      micron: "5 micron",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2025/05/3-Stainless-Steel-With-door-and-lock-3.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2025/05/3-Stainless-Steel-With-door-and-lock.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2025/05/3-Stainless-Steel-With-door-and-lock-1-1.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2025/05/05a4d1aa-4b38-48e4-a704-a86ebd940892.jpeg",
    ],
    tags: ["whole house water filter", "australia"],
    certifications: [],
    kitHint: "Pair with UV Steriliser + annual cartridge set",
    seoTitle: "Deluxe Stainless Steel Lockable Whole House Water… | Enviro Aqua",
    seoDescription: "Treat every tap in your home — whole-house filtration for town, tank and bore water. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "3649",
    sku: "EA-WF-WH-004",
    slug: "twin-pack-polypropylene-sediment-cartridges-20-x-4-5-whole-house-5-micron",
    title: "Twin-Pack Polypropylene Sediment Cartridges — 20\" x 4.5\" Whole House (5 Micron)",
    primaryCategory: "water-filters",
    subCategory: "whole-house",
    categoryPath: ["Water Filters", "Whole House Water Filters"],
    price: 79.95,
    regularPrice: 79.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Whole-house water filter for point-of-entry installation — treats every tap in the home.",
    longDescription: `Point-of-entry whole-house filtration that treats every outlet in your home — kitchen, bathrooms, laundry and garden. Protects plumbing and appliances, reduces chlorine taste, and captures sediment from town water, rain tanks and bore supplies.

**Specifications**

• **Housing size:** 20" x 4.5" (standard Australian sizing)
• **Filtration rating:** 5 micron
• **Filtration media:** Sediment (PP)
• **Reduces:** sediment

**Why this filter**

• Softer water for showering and washing
• Reduced chlorine taste and smell from every tap
• Protects hot-water systems and washing machines from sediment damage
• Standard 10" or 20" Big Blue cartridge housings — cartridges available Australia-wide
• Best paired with an under-sink RO system for drinking water

**Installation**

Installed at your mains-water point-of-entry by a licensed plumber. Standard whole-house installs take 2–4 hours.`,
    facets: {
      housing_size: "20\" x 4.5\"",
      technology: ["Sediment (PP)"],
      removes: ["sediment"],
      price_band: "$30 – $100",
      micron: "5 micron",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-62.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-1-48.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-2-27.jpg",
    ],
    tags: ["20 x 4.5 cartridge", "whole house water filter", "australia"],
    certifications: [],
    kitHint: "Pair with UV Steriliser + annual cartridge set",
    seoTitle: "Twin-Pack Polypropylene Sediment Cartridges — 20\" x… | Enviro Aqua",
    seoDescription: "Treat every tap in your home — whole-house filtration for town, tank and bore water. 20\" x 4.5\". Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "4052",
    sku: "EA-WF-WH-005",
    slug: "twin-big-blue-whole-house-water-filter-20-x-4-5-2-cartridge-set-bracket",
    title: "Twin Big Blue Whole House Water Filter — 20\" x 4.5\" (2-Cartridge Set + Bracket)",
    primaryCategory: "water-filters",
    subCategory: "whole-house",
    categoryPath: ["Water Filters", "Whole House Water Filters"],
    price: 299.95,
    regularPrice: 299.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Whole-house water filter for point-of-entry installation — treats every tap in the home.",
    longDescription: `Point-of-entry whole-house filtration that treats every outlet in your home — kitchen, bathrooms, laundry and garden. Protects plumbing and appliances, reduces chlorine taste, and captures sediment from town water, rain tanks and bore supplies.

**Specifications**

• **Housing size:** 20" x 4.5" (standard Australian sizing)

**Why this filter**

• Softer water for showering and washing
• Reduced chlorine taste and smell from every tap
• Protects hot-water systems and washing machines from sediment damage
• Standard 10" or 20" Big Blue cartridge housings — cartridges available Australia-wide
• Best paired with an under-sink RO system for drinking water

**Installation**

Installed at your mains-water point-of-entry by a licensed plumber. Standard whole-house installs take 2–4 hours.`,
    facets: {
      housing_size: "20\" x 4.5\"",
      price_band: "$100 – $300",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2021/09/Screenshot-2021-09-07-at-12.45.58-pm-1.png",
      "https://enviroaqua.com.au/wp-content/uploads/2021/09/Screenshot-2021-09-07-at-12.45.58-pm-1.png",
    ],
    tags: ["20 x 4.5 cartridge", "whole house water filter", "australia"],
    certifications: [],
    kitHint: "Pair with UV Steriliser + annual cartridge set",
    seoTitle: "Twin Big Blue Whole House Water Filter — 20\" x 4.5\"… | Enviro Aqua",
    seoDescription: "Treat every tap in your home — whole-house filtration for town, tank and bore water. 20\" x 4.5\". Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "3552",
    sku: "EA-WF-WH-001",
    slug: "whole-house-water-filter-1-stage-sediment-10-x-2-5",
    title: "Whole House Water Filter — 1 Stage Sediment (10\" x 2.5\")",
    primaryCategory: "water-filters",
    subCategory: "whole-house",
    categoryPath: ["Water Filters", "Whole House Water Filters"],
    price: 54.95,
    regularPrice: 54.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Whole-house water filter for point-of-entry installation — treats every tap in the home.",
    longDescription: `Point-of-entry whole-house filtration that treats every outlet in your home — kitchen, bathrooms, laundry and garden. Protects plumbing and appliances, reduces chlorine taste, and captures sediment from town water, rain tanks and bore supplies.

**Specifications**

• **1-stage filtration**
• **Housing size:** 10" x 2.5" (standard Australian sizing)
• **Filtration rating:** 5 micron
• **Filtration media:** Sediment (PP)
• **Reduces:** sediment, taste & odour

**Why this filter**

• Softer water for showering and washing
• Reduced chlorine taste and smell from every tap
• Protects hot-water systems and washing machines from sediment damage
• Standard 10" or 20" Big Blue cartridge housings — cartridges available Australia-wide
• Best paired with an under-sink RO system for drinking water

**Installation**

Installed at your mains-water point-of-entry by a licensed plumber. Standard whole-house installs take 2–4 hours.`,
    facets: {
      housing_size: "10\" x 2.5\"",
      technology: ["Sediment (PP)"],
      removes: ["sediment", "taste & odour"],
      price_band: "$30 – $100",
      stages: 1,
      micron: "5 micron",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/big_blue_10_2.5_sediment_filter.png",
    ],
    tags: ["10 x 2.5 cartridge", "whole house water filter", "1 stage filter", "australia"],
    certifications: [],
    kitHint: "Pair with UV Steriliser + annual cartridge set",
    seoTitle: "Whole House Water Filter — 1 Stage Sediment (10\" x… | Enviro Aqua",
    seoDescription: "Treat every tap in your home — whole-house filtration for town, tank and bore water. 1-stage, 10\" x 2.5\". Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "3660",
    sku: "EA-WF-US-002",
    slug: "standard-10-x-2-5-water-filter-standard-water-filter-housing-white-universal",
    title: "Standard 10\" x 2.5\" Water Filter Standard Water Filter Housing White — Universal",
    primaryCategory: "water-filters",
    subCategory: "under-sink",
    categoryPath: ["Water Filters", "Under Sink Water Filters"],
    price: 29.95,
    regularPrice: 29.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Under-sink water filter system with dedicated filtered-water tap. Hidden installation, bottled-quality water on demand.",
    longDescription: `Compact filtration that tucks inside your kitchen cabinet and delivers filtered water through a dedicated tap. Bottled-quality water without the bench-top clutter or ongoing plastic-bottle cost.

**Specifications**

• **Housing size:** 10" x 2.5" (standard Australian sizing)

**Why this filter**

• Filtered water on demand from a dedicated kitchen tap
• Hidden installation — zero bench-top footprint
• Standard 10" cartridge sizes — easy annual replacement
• Compatible with our 3-way RO mixer taps
• Ideal for chlorine, sediment and taste reduction

**Installation**

Mounts to the cabinet wall under your sink. Most homeowners self-install in 1–2 hours; licensed plumber recommended for new tap-hole drilling.`,
    facets: {
      housing_size: "10\" x 2.5\"",
      price_band: "Under $30",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l400.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-65.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-1-50.jpg",
    ],
    tags: ["10 x 2.5 cartridge", "under sink water filter", "australia"],
    certifications: [],
    kitHint: "Pair with dedicated filter tap + replacement cartridges",
    seoTitle: "Standard 10\" x 2.5\" Water Filter Standard Water… | Enviro Aqua",
    seoDescription: "Hidden under-sink filter with dedicated tap — bottled-quality water without the clutter. 10\" x 2.5\". Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "3577",
    sku: "EA-WF-US-001",
    slug: "under-sink-water-filter-2-stage-sediment-carbon",
    title: "Under Sink Water Filter — 2-Stage Sediment, Carbon",
    primaryCategory: "water-filters",
    subCategory: "under-sink",
    categoryPath: ["Water Filters", "Under Sink Water Filters"],
    price: 99.95,
    regularPrice: 99.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Under-sink water filter system with dedicated filtered-water tap. Hidden installation, bottled-quality water on demand.",
    longDescription: `Compact filtration that tucks inside your kitchen cabinet and delivers filtered water through a dedicated tap. Bottled-quality water without the bench-top clutter or ongoing plastic-bottle cost.

**Specifications**

• **2-stage filtration**
• **Filtration rating:** 5 micron
• **Filtration media:** Sediment (PP), Carbon Block (CTO)
• **Reduces:** sediment, chlorine, taste & odour
• **Finish:** Stainless Steel

**Why this filter**

• Filtered water on demand from a dedicated kitchen tap
• Hidden installation — zero bench-top footprint
• Standard 10" cartridge sizes — easy annual replacement
• Compatible with our 3-way RO mixer taps
• Ideal for chlorine, sediment and taste reduction

**Installation**

Mounts to the cabinet wall under your sink. Most homeowners self-install in 1–2 hours; licensed plumber recommended for new tap-hole drilling.`,
    facets: {
      technology: ["Sediment (PP)", "Carbon Block (CTO)"],
      removes: ["sediment", "chlorine", "taste & odour"],
      application: ["town water", "rain tank"],
      price_band: "$30 – $100",
      stages: 2,
      micron: "5 micron",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/Category-Image-40.png",
    ],
    tags: ["rain tank water filter", "under sink water filter", "2 stage filter", "australia"],
    certifications: [],
    kitHint: "Pair with dedicated filter tap + replacement cartridges",
    seoTitle: "Under Sink Water Filter — 2-Stage Sediment, Carbon | Enviro Aqua",
    seoDescription: "Hidden under-sink filter with dedicated tap — bottled-quality water without the clutter. 2-stage. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "11760",
    sku: "EA-WF-US-003",
    slug: "under-sink-water-filter-3-stage-sediment-carbon-alkaline",
    title: "Under Sink Water Filter — 3-Stage Sediment, Carbon, Alkaline",
    primaryCategory: "water-filters",
    subCategory: "under-sink",
    categoryPath: ["Water Filters", "Under Sink Water Filters"],
    price: 129.95,
    regularPrice: 129.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Under-sink water filter system with dedicated filtered-water tap. Hidden installation, bottled-quality water on demand.",
    longDescription: `Compact filtration that tucks inside your kitchen cabinet and delivers filtered water through a dedicated tap. Bottled-quality water without the bench-top clutter or ongoing plastic-bottle cost.

**Specifications**

• **3-stage filtration**
• **Filtration rating:** 5 micron
• **Filtration media:** Sediment (PP), Carbon Block (CTO), Alkaline / Remineralisation
• **Reduces:** sediment, chlorine, taste & odour
• **Finish:** Stainless Steel

**Why this filter**

• Filtered water on demand from a dedicated kitchen tap
• Hidden installation — zero bench-top footprint
• Standard 10" cartridge sizes — easy annual replacement
• Compatible with our 3-way RO mixer taps
• Ideal for chlorine, sediment and taste reduction

**Installation**

Mounts to the cabinet wall under your sink. Most homeowners self-install in 1–2 hours; licensed plumber recommended for new tap-hole drilling.`,
    facets: {
      technology: ["Sediment (PP)", "Carbon Block (CTO)", "Alkaline / Remineralisation"],
      removes: ["sediment", "chlorine", "taste & odour"],
      application: ["town water", "rain tank"],
      price_band: "$100 – $300",
      stages: 3,
      micron: "5 micron",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2025/01/three_stage_alkaline.png",
    ],
    tags: ["rain tank water filter", "under sink water filter", "3 stage filter", "australia"],
    certifications: [],
    kitHint: "Pair with dedicated filter tap + replacement cartridges",
    seoTitle: "Under Sink Water Filter — 3-Stage Sediment, Carbon,… | Enviro Aqua",
    seoDescription: "Hidden under-sink filter with dedicated tap — bottled-quality water without the clutter. 3-stage. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "3610",
    sku: "EA-WF-BN-001",
    slug: "bench-top-water-filter-2-stage-sediment-carbon",
    title: "Bench Top Water Filter — 2 Stage Sediment + Carbon",
    primaryCategory: "water-filters",
    subCategory: "bench-top",
    categoryPath: ["Water Filters", "Bench Top Water Filters"],
    price: 69.95,
    regularPrice: 69.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Countertop water filter that connects to your existing tap — no plumbing required. Perfect for rentals.",
    longDescription: `Countertop filters that connect to your existing kitchen tap via a diverter valve — no plumbing required. The rental-friendly way to filter tap water.

**Specifications**

• **2-stage filtration**
• **Filtration media:** Sediment (PP), Carbon Block (CTO)
• **Reduces:** sediment, chlorine, taste & odour

**Why this filter**

• Zero plumbing — installs in 5 minutes with a tap adaptor
• Fully portable — take it with you when you move
• Landlord-friendly — no permanent modifications
• Standard 10" cartridges — same replacements as under-sink
• Budget-friendly entry to filtered water

**Installation**

Clip the included diverter valve to your kitchen tap, attach the feed tube and you're filtering in minutes.`,
    facets: {
      technology: ["Sediment (PP)", "Carbon Block (CTO)"],
      removes: ["sediment", "chlorine", "taste & odour"],
      application: ["rental friendly"],
      price_band: "$30 – $100",
      stages: 2,
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/twin_counter_top.png",
    ],
    tags: ["2 stage filter", "benchtop water filter", "australia"],
    certifications: [],
    kitHint: "Pair with diverter valve + replacement cartridges",
    seoTitle: "Bench Top Water Filter — 2 Stage Sediment + Carbon | Enviro Aqua",
    seoDescription: "No-plumbing countertop filter that connects to your kitchen tap. Perfect for rentals. 2-stage. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "11772",
    sku: "EA-WF-BN-002",
    slug: "bench-top-water-filter-1-stage-sediment",
    title: "Bench Top Water Filter — 1 Stage Sediment",
    primaryCategory: "water-filters",
    subCategory: "bench-top",
    categoryPath: ["Water Filters", "Bench Top Water Filters"],
    price: 69.95,
    regularPrice: 69.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Countertop water filter that connects to your existing tap — no plumbing required. Perfect for rentals.",
    longDescription: `Countertop filters that connect to your existing kitchen tap via a diverter valve — no plumbing required. The rental-friendly way to filter tap water.

**Specifications**

• **1-stage filtration**
• **Filtration media:** Sediment (PP)
• **Reduces:** sediment

**Why this filter**

• Zero plumbing — installs in 5 minutes with a tap adaptor
• Fully portable — take it with you when you move
• Landlord-friendly — no permanent modifications
• Standard 10" cartridges — same replacements as under-sink
• Budget-friendly entry to filtered water

**Installation**

Clip the included diverter valve to your kitchen tap, attach the feed tube and you're filtering in minutes.`,
    facets: {
      technology: ["Sediment (PP)"],
      removes: ["sediment"],
      application: ["rental friendly"],
      price_band: "$30 – $100",
      stages: 1,
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2025/01/countertop_sediment.png",
    ],
    tags: ["1 stage filter", "benchtop water filter", "australia"],
    certifications: [],
    kitHint: "Pair with diverter valve + replacement cartridges",
    seoTitle: "Bench Top Water Filter — 1 Stage Sediment | Enviro Aqua",
    seoDescription: "No-plumbing countertop filter that connects to your kitchen tap. Perfect for rentals. 1-stage. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "11775",
    sku: "EA-WF-BN-003",
    slug: "bench-top-water-filter-1-stage-carbon",
    title: "Bench Top Water Filter — 1 Stage Carbon",
    primaryCategory: "water-filters",
    subCategory: "bench-top",
    categoryPath: ["Water Filters", "Bench Top Water Filters"],
    price: 49.95,
    regularPrice: 49.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Countertop water filter that connects to your existing tap — no plumbing required. Perfect for rentals.",
    longDescription: `Countertop filters that connect to your existing kitchen tap via a diverter valve — no plumbing required. The rental-friendly way to filter tap water.

**Specifications**

• **1-stage filtration**
• **Filtration media:** Carbon Block (CTO)
• **Reduces:** chlorine, taste & odour

**Why this filter**

• Zero plumbing — installs in 5 minutes with a tap adaptor
• Fully portable — take it with you when you move
• Landlord-friendly — no permanent modifications
• Standard 10" cartridges — same replacements as under-sink
• Budget-friendly entry to filtered water

**Installation**

Clip the included diverter valve to your kitchen tap, attach the feed tube and you're filtering in minutes.`,
    facets: {
      technology: ["Carbon Block (CTO)"],
      removes: ["chlorine", "taste & odour"],
      application: ["rental friendly"],
      price_band: "$30 – $100",
      stages: 1,
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2025/01/countertop_carbon.png",
    ],
    tags: ["1 stage filter", "benchtop water filter", "australia"],
    certifications: [],
    kitHint: "Pair with diverter valve + replacement cartridges",
    seoTitle: "Bench Top Water Filter — 1 Stage Carbon | Enviro Aqua",
    seoDescription: "No-plumbing countertop filter that connects to your kitchen tap. Perfect for rentals. 1-stage. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "12568",
    sku: "EA-WF-RO-010",
    slug: "commercial-reverse-osmosis-water-treatment-system-500-lph",
    title: "Commercial Reverse Osmosis Water Treatment System — 500 LPH",
    primaryCategory: "water-filters",
    subCategory: "reverse-osmosis",
    categoryPath: ["Water Filters", "Reverse Osmosis (RO) Systems"],
    price: 5490.0,
    regularPrice: 5490.0,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Heavy-duty 500 LPH commercial reverse osmosis water treatment machine. Built for industrial sites, manufacturing and large commercial applications requiring continuous high-flow purified water.",
    longDescription: `Reverse osmosis is the only residential filtration technology that meaningfully reduces fluoride, PFAS, TDS and dissolved minerals. For households concerned about water purity at the highest level.

**Specifications**

• **Flow rate:** 500 LPH
• **Filtration media:** Reverse Osmosis
• **Reduces:** chlorine, taste & odour, tds / dissolved solids
• **Finish:** Stainless Steel

**Why this filter**

• Reduces fluoride, PFAS, lead, arsenic and dissolved solids up to 99%
• Multi-stage filtration with sediment, carbon and RO membrane
• Dedicated filtered-water tap — pair with our 3-way RO mixers
• Pressure-tank storage for on-demand flow
• Commercial RO desalination available for bore/brackish supplies

**Installation**

Professional plumber recommended. Systems come pre-assembled with all fittings; installation typically takes 2–3 hours including a new tap-hole.`,
    facets: {
      flow_rate: "500 LPH",
      technology: ["Reverse Osmosis"],
      removes: ["chlorine", "taste & odour", "tds / dissolved solids"],
      application: ["commercial"],
      price_band: "$1,000+",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2025/11/Commercial-RO-Unit-12000-LPD-Video-1.webp",
      "https://enviroaqua.com.au/wp-content/uploads/2025/11/RO-Commercial-12000-LPD.webp",
      "https://enviroaqua.com.au/wp-content/uploads/2025/11/Commercial-RO-Unit-12000-LPD-Video.webp",
      "https://enviroaqua.com.au/wp-content/uploads/2025/11/Commercial-unit.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2025/11/500LPD-RO-1.png",
      "https://enviroaqua.com.au/wp-content/uploads/2025/11/500LPD-RO.jpg2_.jpg",
    ],
    tags: ["reverse osmosis system", "australia", "commercial"],
    certifications: [],
    kitHint: "Pair with 3-way RO tap + replacement membrane",
    seoTitle: "Commercial Reverse Osmosis Water Treatment System —… | Enviro Aqua",
    seoDescription: "Reduces fluoride, PFAS and TDS up to 99% — multi-stage RO drinking water. 500 LPH. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "12600",
    sku: "EA-WF-UV-010",
    slug: "whole-house-water-filter-uv-steriliser-system-3-stage",
    title: "Whole House Water Filter + UV Steriliser System — 3 Stage",
    primaryCategory: "water-filters",
    subCategory: "uv-sterilisation",
    categoryPath: ["Water Filters", "UV Steriliser Water Filters"],
    price: 1299.95,
    regularPrice: 1299.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "UV water steriliser that eliminates bacteria, viruses and pathogens from tank, bore and rain-catch water supplies.",
    longDescription: `UV sterilisation kills bacteria, viruses, Cryptosporidium and Giardia without adding chemicals. Essential for rain tank, bore and roof-catchment supplies, and a critical upgrade for whole-house systems where biological contamination is a risk.

**Specifications**

• **3-stage filtration**
• **Filtration media:** UV Sterilisation
• **Reduces:** bacteria & viruses

**Why this filter**

• 99.99% reduction of bacteria and viruses including E. coli
• Chemical-free — no chlorine, no taste, no residues
• Pairs with sediment + carbon pre-filters for rain tank installations
• Available from 6W (0.5 GPM) to 55W (12 GPM) for every household size
• Lamp replacement typically every 9,000 hours (~12 months)

**Installation**

Installed in-line after sediment and carbon pre-filters. Requires a standard 240V power point (12V and 220V variants available).`,
    facets: {
      technology: ["UV Sterilisation"],
      removes: ["bacteria & viruses"],
      price_band: "$1,000+",
      stages: 3,
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2025/12/2-BB-UV.avif",
      "https://enviroaqua.com.au/wp-content/uploads/2025/12/3-Stages-BB-UV-Description.png",
      "https://enviroaqua.com.au/wp-content/uploads/2025/12/3-Stages-BB-UV-Description.png-2.png",
      "https://enviroaqua.com.au/wp-content/uploads/2025/12/BB-Filter1.png-2.png",
    ],
    tags: ["3 stage filter", "uv water steriliser", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "Whole House Water Filter + UV Steriliser System — 3… | Enviro Aqua",
    seoDescription: "UV sterilisation kills bacteria and viruses in rain tank and bore water — no chemicals. 3-stage. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "3954",
    sku: "EA-WF-UV-002",
    slug: "uv-water-steriliser-25w-220-240v-1500-lph",
    title: "UV Water Steriliser — 25W 220–240V, 1500 LPH",
    primaryCategory: "water-filters",
    subCategory: "uv-sterilisation",
    categoryPath: ["Water Filters", "UV Steriliser Water Filters"],
    price: 244.95,
    regularPrice: 244.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "UV water steriliser that eliminates bacteria, viruses and pathogens from tank, bore and rain-catch water supplies.",
    longDescription: `UV sterilisation kills bacteria, viruses, Cryptosporidium and Giardia without adding chemicals. Essential for rain tank, bore and roof-catchment supplies, and a critical upgrade for whole-house systems where biological contamination is a risk.

**Specifications**

• **Flow rate:** 1500 LPH
• **Filtration media:** UV Sterilisation
• **Reduces:** bacteria & viruses

**Why this filter**

• 99.99% reduction of bacteria and viruses including E. coli
• Chemical-free — no chlorine, no taste, no residues
• Pairs with sediment + carbon pre-filters for rain tank installations
• Available from 6W (0.5 GPM) to 55W (12 GPM) for every household size
• Lamp replacement typically every 9,000 hours (~12 months)

**Installation**

Installed in-line after sediment and carbon pre-filters. Requires a standard 240V power point (12V and 220V variants available).`,
    facets: {
      flow_rate: "1500 LPH",
      technology: ["UV Sterilisation"],
      removes: ["bacteria & viruses"],
      price_band: "$100 – $300",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/09/25w-uv-220V.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/09/25w-TRANSFOMER.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/09/25W-LAMP.jpg",
    ],
    tags: ["uv water steriliser", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "UV Water Steriliser — 25W 220–240V, 1500 LPH | Enviro Aqua",
    seoDescription: "UV sterilisation kills bacteria and viruses in rain tank and bore water — no chemicals. 1500 LPH. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "4198",
    sku: "EA-WF-SF-001",
    slug: "shower-filter-15-stages-includes-extra-cartridge",
    title: "Shower Filter — 15 Stages — Includes Extra Cartridge",
    primaryCategory: "water-filters",
    subCategory: "shower-filters",
    categoryPath: ["Water Filters", "Shower Filters"],
    price: 39.95,
    regularPrice: 39.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Chlorine-reducing shower filter that screws onto any standard shower arm in two minutes.",
    longDescription: `Chlorine and chloramine don't stop at the kitchen tap. Shower filters reduce the harsh disinfectants that dry out skin, fade hair colour and aggravate eczema — with a two-minute install and no plumbing.

**Specifications**

• **15-stage filtration**
• **Reduces:** chlorine, heavy metals, taste & odour
• **Finish:** Brushed Nickel, Polished Chrome

**Why this filter**

• Reduces chlorine, chloramine and heavy metals from shower water
• Noticeably softer skin and hair from the first wash
• Screws onto any standard Australian shower arm
• No tools, no plumber, no tenancy issues
• Replacement cartridge lasts 6–12 months

**Installation**

Unscrew your existing shower head, thread the filter on, reattach the head. Two minutes.`,
    facets: {
      removes: ["chlorine", "heavy metals", "taste & odour"],
      price_band: "$30 – $100",
      stages: 15,
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2022/05/shower-filter.png",
      "https://enviroaqua.com.au/wp-content/uploads/2022/05/shower1.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2022/05/shower6.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2022/05/shower4.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2022/05/shower3.jpg",
    ],
    tags: ["15 stage filter", "shower filter", "australia"],
    certifications: [],
    kitHint: "Includes extra cartridge + replacement available",
    seoTitle: "Shower Filter — 15 Stages — Includes Extra Cartridge | Enviro Aqu",
    seoDescription: "Softer skin and hair in a 2-minute install — chlorine-reducing shower filter. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "3467",
    sku: "EA-WF-CT-003",
    slug: "75-gpd-reverse-osmosis-membrane-replacement-twin-pack-280-l-day",
    title: "75 GPD Reverse Osmosis Membrane Replacement — Twin Pack (280 L/day)",
    primaryCategory: "water-filters",
    subCategory: "replacement-cartridges",
    categoryPath: ["Water Filters", "Replacement Filter Cartridges"],
    price: 74.95,
    regularPrice: 74.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Twin-pair replacement set — sediment pre-filter plus carbon block for complete dual-stage filtration. Australian-standard sizing with NSF-compliant media.",
    longDescription: `Annual cartridge replacement is non-negotiable — used filters stop removing and start releasing what they've captured. We stock every cartridge size in sediment, carbon, pleated, RO membrane and specialty formats.

**Specifications**

• **Flow rate:** 75 GPD
• **Filtration media:** Reverse Osmosis
• **Reduces:** tds / dissolved solids

**Why this filter**

• Genuine NSF-compliant cartridges for 10" and 20" housings
• Available in 2.5" slim-line and 4.5" Big Blue sizes
• Sediment (PP), carbon block (CTO), granular carbon (GAC), pleated and RO membranes
• Multi-pack and annual-kit pricing for long-term savings
• Subscribe to never run out — automatic annual delivery available`,
    facets: {
      flow_rate: "75 GPD",
      technology: ["Reverse Osmosis"],
      removes: ["tds / dissolved solids"],
      price_band: "$30 – $100",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-25.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-1-20.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-2-9.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-3-7.jpg",
    ],
    tags: ["filter cartridge", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "75 GPD Reverse Osmosis Membrane Replacement — Twin… | Enviro Aqua",
    seoDescription: "Genuine replacement cartridges for every Enviro Aqua system. 75 GPD.",
  },
  {
    id: "3419",
    sku: "EA-WF-CT-001",
    slug: "inline-uf-ultrafiltration-filter-cartridge",
    title: "Inline UF Ultrafiltration Filter Cartridge",
    primaryCategory: "water-filters",
    subCategory: "replacement-cartridges",
    categoryPath: ["Water Filters", "Replacement Filter Cartridges"],
    price: 24.95,
    regularPrice: 24.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Ultrafiltration (UF) cartridge — 0.01 micron hollow-fibre membrane. Australian-standard sizing with NSF-compliant media.",
    longDescription: `Annual cartridge replacement is non-negotiable — used filters stop removing and start releasing what they've captured. We stock every cartridge size in sediment, carbon, pleated, RO membrane and specialty formats.

**Specifications**

• **Filtration media:** Ultrafiltration (UF)

**Why this filter**

• Genuine NSF-compliant cartridges for 10" and 20" housings
• Available in 2.5" slim-line and 4.5" Big Blue sizes
• Sediment (PP), carbon block (CTO), granular carbon (GAC), pleated and RO membranes
• Multi-pack and annual-kit pricing for long-term savings
• Subscribe to never run out — automatic annual delivery available`,
    facets: {
      technology: ["Ultrafiltration (UF)"],
      price_band: "Under $30",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-3-3.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l500-9.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-15.jpg",
    ],
    tags: ["filter cartridge", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "Inline UF Ultrafiltration Filter Cartridge | Enviro Aqua",
    seoDescription: "Genuine replacement cartridges for every Enviro Aqua system.",
  },
  {
    id: "3450",
    sku: "EA-WF-CT-002",
    slug: "ro-wrench-for-1812-reverse-osmosis-membrane-housings",
    title: "RO Wrench — for 1812 Reverse Osmosis Membrane Housings",
    primaryCategory: "water-filters",
    subCategory: "replacement-cartridges",
    categoryPath: ["Water Filters", "Replacement Filter Cartridges"],
    price: 14.95,
    regularPrice: 14.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Genuine replacement water filter cartridge. Australian-standard sizing with NSF-compliant media.",
    longDescription: `Annual cartridge replacement is non-negotiable — used filters stop removing and start releasing what they've captured. We stock every cartridge size in sediment, carbon, pleated, RO membrane and specialty formats.

**Specifications**

• **Filtration media:** Reverse Osmosis
• **Reduces:** tds / dissolved solids

**Why this filter**

• Genuine NSF-compliant cartridges for 10" and 20" housings
• Available in 2.5" slim-line and 4.5" Big Blue sizes
• Sediment (PP), carbon block (CTO), granular carbon (GAC), pleated and RO membranes
• Multi-pack and annual-kit pricing for long-term savings
• Subscribe to never run out — automatic annual delivery available`,
    facets: {
      technology: ["Reverse Osmosis"],
      removes: ["tds / dissolved solids"],
      price_band: "Under $30",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-22.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l500-12.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-1-18.jpg",
    ],
    tags: ["filter cartridge", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "RO Wrench — for 1812 Reverse Osmosis Membrane Housings | Enviro A",
    seoDescription: "Genuine replacement cartridges for every Enviro Aqua system.",
  },
  {
    id: "12549",
    sku: "EA-WF-CT-032",
    slug: "reverse-osmosis-ro-membrane-400-gpd-approx-1500-litres-per-day",
    title: "Reverse Osmosis RO Membrane 400 GPD. Approx 1500 Litres Per Day",
    primaryCategory: "water-filters",
    subCategory: "replacement-cartridges",
    categoryPath: ["Water Filters", "Replacement Filter Cartridges"],
    price: 109.95,
    regularPrice: 110.0,
    onSale: true,
    stockStatus: "in_stock",
    shortDescription: "Reverse osmosis membrane replacement — the heart of your RO system. Australian-standard sizing with NSF-compliant media.",
    longDescription: `Annual cartridge replacement is non-negotiable — used filters stop removing and start releasing what they've captured. We stock every cartridge size in sediment, carbon, pleated, RO membrane and specialty formats.

**Specifications**

• **Flow rate:** 400 GPD
• **Filtration media:** Reverse Osmosis
• **Reduces:** tds / dissolved solids

**Why this filter**

• Genuine NSF-compliant cartridges for 10" and 20" housings
• Available in 2.5" slim-line and 4.5" Big Blue sizes
• Sediment (PP), carbon block (CTO), granular carbon (GAC), pleated and RO membranes
• Multi-pack and annual-kit pricing for long-term savings
• Subscribe to never run out — automatic annual delivery available`,
    facets: {
      flow_rate: "400 GPD",
      technology: ["Reverse Osmosis"],
      removes: ["tds / dissolved solids"],
      price_band: "$100 – $300",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2025/10/400-GPD-Membrane.png",
      "https://enviroaqua.com.au/wp-content/uploads/2025/10/400-GPD-Membrane.png",
      "https://enviroaqua.com.au/wp-content/uploads/2025/10/400-GPD-Membrane-2.png",
    ],
    tags: ["filter cartridge", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "Reverse Osmosis RO Membrane 400 GPD. Approx 1500… | Enviro Aqua",
    seoDescription: "Genuine replacement cartridges for every Enviro Aqua system. 400 GPD.",
  },
  {
    id: "3587",
    sku: "EA-WF-FP-002",
    slug: "water-pressure-gauge-1-4-brass-bspt-thread-60-150-300-psi",
    title: "Water Pressure Gauge — 1/4\" Brass BSPT Thread, 60 / 150 / 300 PSI",
    primaryCategory: "water-filters",
    subCategory: "fittings-parts",
    categoryPath: ["Water Filters", "Fittings, Tubing & Accessories"],
    price: 29.95,
    regularPrice: 29.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Water filter installation accessory — Australian mains-pressure rated.",
    longDescription: `Genuine replacement fittings and accessories for water filter installations and servicing.

**Specifications**

• **Finish:** Stainless Steel

**Features**

• Australian mains-pressure rated
• NSF-certified where applicable
• Standard 1/4" (6mm) and 3/8" push-fit sizing`,
    facets: {
      price_band: "Under $30",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-48.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-1-38.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-2-19.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-3-12.jpg",
    ],
    tags: ["water filter parts", "australia"],
    certifications: ["NSF"],
    kitHint: null,
    seoTitle: "Water Pressure Gauge — 1/4\" Brass BSPT Thread, 60 /… | Enviro Aqua",
    seoDescription: "Mains-pressure rated water filter fittings and accessories.",
  },
  {
    id: "3688",
    sku: "EA-WF-TP-003",
    slug: "high-pressure-switch-24v-for-ro-water-filters-quick-connect",
    title: "High-Pressure Switch 24V for RO Water Filters — Quick Connect",
    primaryCategory: "water-filters",
    subCategory: "tanks-pumps",
    categoryPath: ["Water Filters", "Pressure Tanks, Bladders & Pumps"],
    price: 19.95,
    regularPrice: 19.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Pressure tank for reverse osmosis drinking water systems — plastic, rust-free, drinking-water compatible.",
    longDescription: `Storage tanks, bladders and booster pumps purpose-built for RO and whole-house filtration systems.

**Specifications**

• **Filtration media:** Reverse Osmosis
• **Reduces:** tds / dissolved solids

**Features**

• Drinking-water-safe bladders — made in Italy
• RO-compatible pressure tanks from 8L to 50L
• 24V diaphragm booster pumps for low-pressure inlets`,
    facets: {
      technology: ["Reverse Osmosis"],
      removes: ["tds / dissolved solids"],
      price_band: "Under $30",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-72.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-1-54.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-2-31.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/s-l1600-3-20.jpg",
    ],
    tags: ["ro pressure tank", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "High-Pressure Switch 24V for RO Water Filters —… | Enviro Aqua",
    seoDescription: "Pressure tanks, bladders and booster pumps for RO and whole-house systems.",
  },
  {
    id: "11666",
    sku: "EA-CB-BB-001",
    slug: "commercial-filtered-water-bubbler-square-stainless-steel-watermark-certified",
    title: "Commercial Filtered Water Bubbler — Square, Stainless Steel, WaterMark Certified",
    primaryCategory: "commercial-bubblers",
    subCategory: "filtered-bubblers",
    categoryPath: ["Commercial Bubblers & Coolers", "Filtered Water Bubblers"],
    price: 999.95,
    regularPrice: 999.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "WaterMark-certified commercial filtered water bubbler in 304 stainless steel. Direct-connect, built for schools, gyms and offices.",
    longDescription: `WaterMark-certified commercial water bubblers built to AS/NZS 3497 for permanent mains connection in schools, gyms, offices and public facilities. 304 stainless steel, vandal-resistant, built for high-traffic use.

**Specifications**

• **Filtration media:** Sediment (PP), Pleated / Washable
• **Reduces:** sediment, chlorine, taste & odour, scale / limescale
• **Certifications:** WaterMark
• **Finish:** Brushed Nickel, Stainless Steel

**Why this bubbler**

• WaterMark certified — legal for permanent installation in public buildings
• 304 stainless steel construction — rust-resistant and durable
• Direct mains connection — no bottles, no deliveries
• Integrated filtration — sediment and carbon stages included
• Wholesale pricing available for multi-unit projects

**Installation**

Direct-connected to mains water supply by a licensed plumber. Single point of drainage required. Professional install typically $250–$400 per unit.`,
    facets: {
      technology: ["Sediment (PP)", "Pleated / Washable"],
      removes: ["sediment", "chlorine", "taste & odour", "scale / limescale"],
      application: ["town water", "commercial"],
      price_band: "$300 – $1,000",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/Bubbler-3.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/YL-600C-scaled.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/YL600C4-scaled.jpg",
    ],
    tags: ["commercial water bubbler", "watermark certified", "australia", "commercial"],
    certifications: ["WaterMark", "AS/NZS 3497"],
    kitHint: "Pair with annual replacement filter set",
    seoTitle: "Commercial Filtered Water Bubbler — Square,… | Enviro Aqua",
    seoDescription: "WaterMark-certified commercial bubblers for schools, gyms and offices. Direct-connect. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "11670",
    sku: "EA-CB-BB-002",
    slug: "commercial-filtered-cold-water-bubbler-round-stainless-steel-watermark-certified",
    title: "Commercial Filtered Cold Water Bubbler — Round, Stainless Steel, WaterMark Certified",
    primaryCategory: "commercial-bubblers",
    subCategory: "filtered-bubblers",
    categoryPath: ["Commercial Bubblers & Coolers", "Filtered Water Bubblers"],
    price: 849.95,
    regularPrice: 849.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "WaterMark-certified commercial filtered water bubbler in 304 stainless steel. Direct-connect, built for schools, gyms and offices.",
    longDescription: `WaterMark-certified commercial water bubblers built to AS/NZS 3497 for permanent mains connection in schools, gyms, offices and public facilities. 304 stainless steel, vandal-resistant, built for high-traffic use.

**Specifications**

• **Finish:** Stainless Steel

**Why this bubbler**

• WaterMark certified — legal for permanent installation in public buildings
• 304 stainless steel construction — rust-resistant and durable
• Direct mains connection — no bottles, no deliveries
• Integrated filtration — sediment and carbon stages included
• Wholesale pricing available for multi-unit projects

**Installation**

Direct-connected to mains water supply by a licensed plumber. Single point of drainage required. Professional install typically $250–$400 per unit.`,
    facets: {
      application: ["commercial"],
      price_band: "$300 – $1,000",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/Water-Bubbler-1-Tap.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/Water-Bubbler-1-Tap-2.avif",
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/Water-Bubbler-2-Tap.avif",
    ],
    tags: ["commercial water bubbler", "australia", "commercial"],
    certifications: ["WaterMark", "AS/NZS 3497"],
    kitHint: "Pair with annual replacement filter set",
    seoTitle: "Commercial Filtered Cold Water Bubbler — Round,… | Enviro Aqua",
    seoDescription: "WaterMark-certified commercial bubblers for schools, gyms and offices. Direct-connect. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "11685",
    sku: "EA-CB-BB-003",
    slug: "commercial-rust-free-filtered-cold-water-bubbler-watermark-certified",
    title: "Commercial Rust-Free Filtered Cold Water Bubbler — WaterMark Certified",
    primaryCategory: "commercial-bubblers",
    subCategory: "filtered-bubblers",
    categoryPath: ["Commercial Bubblers & Coolers", "Filtered Water Bubblers"],
    price: 1299.95,
    regularPrice: 1299.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "WaterMark-certified commercial filtered water bubbler in 304 stainless steel. Direct-connect, built for schools, gyms and offices.",
    longDescription: `WaterMark-certified commercial water bubblers built to AS/NZS 3497 for permanent mains connection in schools, gyms, offices and public facilities. 304 stainless steel, vandal-resistant, built for high-traffic use.

**Specifications**

• **Filtration media:** Sediment (PP)
• **Reduces:** sediment, chlorine, taste & odour

**Why this bubbler**

• WaterMark certified — legal for permanent installation in public buildings
• 304 stainless steel construction — rust-resistant and durable
• Direct mains connection — no bottles, no deliveries
• Integrated filtration — sediment and carbon stages included
• Wholesale pricing available for multi-unit projects

**Installation**

Direct-connected to mains water supply by a licensed plumber. Single point of drainage required. Professional install typically $250–$400 per unit.`,
    facets: {
      technology: ["Sediment (PP)"],
      removes: ["sediment", "chlorine", "taste & odour"],
      application: ["commercial"],
      price_band: "$1,000+",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/bubbler-grey-2.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/YL-600P.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/bubbler-grey.jpg",
    ],
    tags: ["commercial water bubbler", "australia", "commercial"],
    certifications: ["WaterMark", "AS/NZS 3497"],
    kitHint: "Pair with annual replacement filter set",
    seoTitle: "Commercial Rust-Free Filtered Cold Water Bubbler —… | Enviro Aqua",
    seoDescription: "WaterMark-certified commercial bubblers for schools, gyms and offices. Direct-connect. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "11679",
    sku: "EA-CB-WC-002",
    slug: "direct-connect-water-cooler-3-stage-filter-hot-cold-ambient",
    title: "Direct Connect Water Cooler — 3-Stage Filter, Hot / Cold / Ambient",
    primaryCategory: "commercial-bubblers",
    subCategory: "water-coolers",
    categoryPath: ["Commercial Bubblers & Coolers", "Hot, Cold & Ambient Water Coolers"],
    price: 499.95,
    regularPrice: 499.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Direct-connect filtered water cooler delivering hot, cold and ambient water — the bottle-less alternative to water delivery.",
    longDescription: `Direct-connect filtered water coolers that replace bottled-water delivery. Hot, cold, and ambient water on demand — no bottles, no deliveries, no ongoing plastic waste.

**Specifications**

• **3-stage filtration**

**Why this cooler**

• Direct mains connection — eliminates bottle delivery costs
• Hot, cold and room-temperature water from one unit
• Integrated filtration — filtered water from every outlet
• Payback typically under 18 months versus bottle delivery
• Office and bench-top models available`,
    facets: {
      application: ["commercial"],
      price_band: "$300 – $1,000",
      stages: 3,
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/free-stand.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/B.T-Cooler1.jpg",
    ],
    tags: ["3 stage filter", "water cooler", "australia", "commercial"],
    certifications: [],
    kitHint: null,
    seoTitle: "Direct Connect Water Cooler — 3-Stage Filter, Hot /… | Enviro Aqua",
    seoDescription: "Hot, cold and ambient filtered water from one unit. Bottle-free. 3-stage.",
  },
  {
    id: "11663",
    sku: "EA-CB-WC-001",
    slug: "filtered-hot-cold-water-cooler-direct-connect",
    title: "Filtered Hot & Cold Water Cooler — Direct Connect",
    primaryCategory: "commercial-bubblers",
    subCategory: "water-coolers",
    categoryPath: ["Commercial Bubblers & Coolers", "Hot, Cold & Ambient Water Coolers"],
    price: 499.95,
    regularPrice: 499.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Direct-connect filtered water cooler delivering hot, cold and ambient water — the bottle-less alternative to water delivery.",
    longDescription: `Direct-connect filtered water coolers that replace bottled-water delivery. Hot, cold, and ambient water on demand — no bottles, no deliveries, no ongoing plastic waste.

**Specifications**

• **Filtration media:** Sediment (PP)
• **Reduces:** sediment, chlorine, taste & odour

**Why this cooler**

• Direct mains connection — eliminates bottle delivery costs
• Hot, cold and room-temperature water from one unit
• Integrated filtration — filtered water from every outlet
• Payback typically under 18 months versus bottle delivery
• Office and bench-top models available`,
    facets: {
      technology: ["Sediment (PP)"],
      removes: ["sediment", "chlorine", "taste & odour"],
      application: ["commercial"],
      price_band: "$300 – $1,000",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/11/cooler_direct_connect.png",
    ],
    tags: ["water cooler", "australia", "commercial"],
    certifications: [],
    kitHint: null,
    seoTitle: "Filtered Hot & Cold Water Cooler — Direct Connect | Enviro Aqua",
    seoDescription: "Hot, cold and ambient filtered water from one unit. Bottle-free.",
  },
  {
    id: "13369",
    sku: "EA-CB-UC-001",
    slug: "under-counter-drinking-water-chiller-stainless-steel-with-ss-tap",
    title: "Under Counter Drinking Water Chiller — Stainless Steel with SS Tap",
    primaryCategory: "commercial-bubblers",
    subCategory: "under-counter-chillers",
    categoryPath: ["Commercial Bubblers & Coolers", "Under-Counter Water Chillers"],
    price: 599.95,
    regularPrice: 599.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Under-counter filtered water chiller — chilled filtered water from your existing tap, no second faucet required.",
    longDescription: `Filtered chilled water from your existing kitchen tap — the chiller and filter live hidden in the cabinet. Commercial-grade stainless steel construction.

**Specifications**

• **Finish:** Stainless Steel

**Why this cooler**

• Chilled water from your existing tap — no second tap required
• Under-counter installation — zero bench-top footprint
• Stainless steel tap included
• Suitable for office kitchens, break rooms and commercial settings`,
    facets: {
      price_band: "$300 – $1,000",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2026/04/chiller.jpg",
      "https://enviroaqua.com.au/wp-content/uploads/2026/04/chiller4.webp",
      "https://enviroaqua.com.au/wp-content/uploads/2026/04/chiller2.jpg",
    ],
    tags: ["under counter chiller", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "Under Counter Drinking Water Chiller — Stainless… | Enviro Aqua",
    seoDescription: "Chilled filtered water from your existing tap — under-counter stainless steel chiller. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "3961",
    sku: "EA-CB-BR-001",
    slug: "drinking-fountain-replacement-tap-chrome-finish",
    title: "Drinking Fountain Replacement Tap — Chrome Finish",
    primaryCategory: "commercial-bubblers",
    subCategory: "bubbler-parts",
    categoryPath: ["Commercial Bubblers & Coolers", "Bubbler Parts & Replacement Filters"],
    price: 49.95,
    regularPrice: 49.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Replacement filter cartridge set for Enviro Aqua commercial bubblers.",
    longDescription: `Replacement filter cartridges and spare parts for Enviro Aqua commercial bubblers and drinking fountains. Annual maintenance made simple.

**Specifications**

• **Finish:** Polished Chrome`,
    facets: {
      price_band: "$30 – $100",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/10/Fountain-tap.jpg",
    ],
    tags: ["bubbler replacement filter", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "Drinking Fountain Replacement Tap — Chrome Finish | Enviro Aqua",
    seoDescription: "Annual filter service kits for commercial bubblers.",
  },
  {
    id: "4977",
    sku: "EA-KT-T3-001",
    slug: "3-way-kitchen-mixer-for-ro-water-filters-shiny-gold",
    title: "3-Way Kitchen Mixer for RO Water Filters — Shiny Gold",
    primaryCategory: "kitchen-taps",
    subCategory: "ro-3way-taps",
    categoryPath: ["Kitchen Taps", "3-Way RO Mixer Taps"],
    price: 129.95,
    regularPrice: 159.95,
    onSale: true,
    stockStatus: "in_stock",
    shortDescription: "3-way kitchen mixer delivering hot, cold and RO-filtered water through a single tap.",
    longDescription: `One tap, three outputs: hot, cold and RO-filtered water through a single kitchen mixer. Eliminates the need for a separate drinking-water tap on the benchtop.

**Specifications**

• **Finish:** Brushed Gold

**Why this tap**

• Hot, cold and RO-filtered water from a single tap
• Sleek modern finish — matte black, brushed gold, nickel or chrome
• Compatible with all standard under-sink RO systems
• NSF-certified drinking water flow channel
• Eliminates bench-top clutter from a second tap`,
    facets: {
      price_band: "$100 – $300",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2022/03/gold_3_way_tap.png",
    ],
    tags: ["3 way ro tap", "australia"],
    certifications: ["NSF"],
    kitHint: null,
    seoTitle: "3-Way Kitchen Mixer for RO Water Filters — Shiny Gold | Enviro Aq",
    seoDescription: "Hot, cold and RO-filtered water from a single 3-way mixer tap.",
  },
  {
    id: "4999",
    sku: "EA-KT-T3-002",
    slug: "luxurious-3-way-ro-tap-matte-black-or-brushed-nickel",
    title: "Luxurious 3-Way RO Tap — Matte Black or Brushed Nickel",
    primaryCategory: "kitchen-taps",
    subCategory: "ro-3way-taps",
    categoryPath: ["Kitchen Taps", "3-Way RO Mixer Taps"],
    price: 149.95,
    regularPrice: 149.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "3-way kitchen mixer delivering hot, cold and RO-filtered water through a single tap.",
    longDescription: `One tap, three outputs: hot, cold and RO-filtered water through a single kitchen mixer. Eliminates the need for a separate drinking-water tap on the benchtop.

**Specifications**

• **Finish:** Matte Black, Brushed Nickel

**Why this tap**

• Hot, cold and RO-filtered water from a single tap
• Sleek modern finish — matte black, brushed gold, nickel or chrome
• Compatible with all standard under-sink RO systems
• NSF-certified drinking water flow channel
• Eliminates bench-top clutter from a second tap`,
    facets: {
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/luxury_black_3_way.jpg",
    ],
    tags: ["3 way ro tap", "australia"],
    certifications: ["NSF"],
    kitHint: null,
    seoTitle: "Luxurious 3-Way RO Tap — Matte Black or Brushed Nickel | Enviro A",
    seoDescription: "Hot, cold and RO-filtered water from a single 3-way mixer tap.",
  },
  {
    id: "4173",
    sku: "EA-KT-TD-001",
    slug: "premium-reverse-osmosis-drinking-water-faucet-nsf-certified",
    title: "Premium Reverse Osmosis Drinking Water Faucet — NSF Certified",
    primaryCategory: "kitchen-taps",
    subCategory: "dedicated-ro-taps",
    categoryPath: ["Kitchen Taps", "Dedicated RO Drinking Taps"],
    price: 59.0,
    regularPrice: 59.0,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "NSF-certified dedicated filtered-water tap for RO and under-sink filter systems.",
    longDescription: `Single-outlet drinking-water taps installed alongside your main kitchen mixer. NSF-certified for drinking water contact.

**Specifications**

• **Certifications:** NSF

**Why this tap**

• NSF-certified for drinking water
• Dedicated filtered-water outlet — pairs with any RO or filter system
• Available in chrome, matte black, nickel and gold finishes
• Traditional filtered-water setup — used with existing kitchen mixer`,
    facets: {
      application: ["rental friendly"],
      price_band: "$30 – $100",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2022/03/new-Tap.jpg",
    ],
    tags: ["ro filter tap", "nsf certified", "australia"],
    certifications: ["NSF"],
    kitHint: null,
    seoTitle: "Premium Reverse Osmosis Drinking Water Faucet — NSF… | Enviro Aqua",
    seoDescription: "NSF-certified dedicated drinking-water tap for RO systems.",
  },
  {
    id: "4175",
    sku: "EA-KT-TD-002",
    slug: "double-handle-reverse-osmosis-water-filter-tap-chrome",
    title: "Double-Handle Reverse Osmosis Water Filter Tap — Chrome",
    primaryCategory: "kitchen-taps",
    subCategory: "dedicated-ro-taps",
    categoryPath: ["Kitchen Taps", "Dedicated RO Drinking Taps"],
    price: 34.95,
    regularPrice: 34.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "NSF-certified dedicated filtered-water tap for RO and under-sink filter systems.",
    longDescription: `Single-outlet drinking-water taps installed alongside your main kitchen mixer. NSF-certified for drinking water contact.

**Specifications**

• **Finish:** Polished Chrome

**Why this tap**

• NSF-certified for drinking water
• Dedicated filtered-water outlet — pairs with any RO or filter system
• Available in chrome, matte black, nickel and gold finishes
• Traditional filtered-water setup — used with existing kitchen mixer`,
    facets: {
      price_band: "$30 – $100",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2022/03/double_tap.jpg",
    ],
    tags: ["ro filter tap", "australia"],
    certifications: ["NSF"],
    kitHint: null,
    seoTitle: "Double-Handle Reverse Osmosis Water Filter Tap —… | Enviro Aqua",
    seoDescription: "NSF-certified dedicated drinking-water tap for RO systems.",
  },
  {
    id: "5059",
    sku: "EA-KT-KM-001",
    slug: "modern-pull-down-kitchen-mixer-brushed-nickel",
    title: "Modern Pull-Down Kitchen Mixer — Brushed Nickel",
    primaryCategory: "kitchen-taps",
    subCategory: "mixer-taps",
    categoryPath: ["Kitchen Taps", "Kitchen Mixer Taps"],
    price: 129.95,
    regularPrice: 129.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "WELS-rated kitchen mixer tap in a contemporary finish.",
    longDescription: `Standard single-lever kitchen mixer taps without filter integration. Ideal when you already have a separate filtered-water tap installed.

**Specifications**

• **Certifications:** WELS
• **Finish:** Brushed Nickel

**Why this tap**

• Standard WELS-rated kitchen mixer
• Modern pull-down, gooseneck and spring-loaded designs
• Quality finishes in chrome and brushed nickel`,
    facets: {
      price_band: "$100 – $300",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/pull_down_nickel.png",
    ],
    tags: ["kitchen mixer tap", "wels rated", "australia"],
    certifications: ["WELS"],
    kitHint: null,
    seoTitle: "Modern Pull-Down Kitchen Mixer — Brushed Nickel | Enviro Aqua",
    seoDescription: "WELS-rated kitchen mixer taps in contemporary finishes.",
  },
  {
    id: "5078",
    sku: "EA-KT-KM-002",
    slug: "spring-loaded-kitchen-mixer-brushed-nickel",
    title: "Spring-Loaded Kitchen Mixer — Brushed Nickel",
    primaryCategory: "kitchen-taps",
    subCategory: "mixer-taps",
    categoryPath: ["Kitchen Taps", "Kitchen Mixer Taps"],
    price: 119.95,
    regularPrice: 119.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "WELS-rated kitchen mixer tap in a contemporary finish.",
    longDescription: `Standard single-lever kitchen mixer taps without filter integration. Ideal when you already have a separate filtered-water tap installed.

**Specifications**

• **Certifications:** WaterMark, WELS
• **Finish:** Brushed Nickel

**Why this tap**

• Standard WELS-rated kitchen mixer
• Modern pull-down, gooseneck and spring-loaded designs
• Quality finishes in chrome and brushed nickel`,
    facets: {
      price_band: "$100 – $300",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/spring-loaded-tap-kitchen-mixer-in-brushed-nickel.png",
    ],
    tags: ["kitchen mixer tap", "watermark certified", "wels rated", "australia"],
    certifications: ["WaterMark", "WELS"],
    kitHint: null,
    seoTitle: "Spring-Loaded Kitchen Mixer — Brushed Nickel | Enviro Aqua",
    seoDescription: "WELS-rated kitchen mixer taps in contemporary finishes.",
  },
  {
    id: "4613",
    sku: "EA-BA-TL-002",
    slug: "in-wall-concealed-cistern-toilet-rimless-chrome-buttons-wels",
    title: "In-Wall Concealed Cistern Toilet — Rimless, Chrome Buttons, WELS",
    primaryCategory: "bathroom",
    subCategory: "toilets",
    categoryPath: ["Bathroom", "Toilets"],
    price: 395.0,
    regularPrice: 395.0,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Rimless dual-flush toilet suite with soft-close seat, WELS-rated and WaterMark-certified.",
    longDescription: `Rimless ceramic toilet suites with soft-close seats, WELS-rated and WaterMark-certified. Back-to-wall and in-wall cistern configurations.

**Specifications**

• **Certifications:** WaterMark, WELS
• **Finish:** Polished Chrome`,
    facets: {
      price_band: "$300 – $1,000",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/in-wall-2.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/in-wall.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/in-wall-6.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/in-wall-5.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/in-wall-4.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/in-wall-3.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/in-wall-2.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/in-wall-1.png",
    ],
    tags: ["rimless toilet", "watermark certified", "wels rated", "australia"],
    certifications: ["WaterMark", "WELS"],
    kitHint: null,
    seoTitle: "In-Wall Concealed Cistern Toilet — Rimless, Chrome… | Enviro Aqua",
    seoDescription: "Rimless soft-close toilets — WELS-rated and WaterMark-certified.",
  },
  {
    id: "4637",
    sku: "EA-BA-TL-003",
    slug: "rimless-modern-ceramic-toilet-2-piece-p-trap-watermark-wels",
    title: "Rimless Modern Ceramic Toilet — 2-Piece P-Trap, WaterMark + WELS",
    primaryCategory: "bathroom",
    subCategory: "toilets",
    categoryPath: ["Bathroom", "Toilets"],
    price: 265.0,
    regularPrice: 265.0,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Rimless dual-flush toilet suite with soft-close seat, WELS-rated and WaterMark-certified.",
    longDescription: `Rimless ceramic toilet suites with soft-close seats, WELS-rated and WaterMark-certified. Back-to-wall and in-wall cistern configurations.

**Specifications**

• **Certifications:** WaterMark, WELS`,
    facets: {
      price_band: "$100 – $300",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/rimless-4.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/rimless-3-1.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/rimless-2-1.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/rimless-1-1.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/rimless-5.png",
    ],
    tags: ["rimless toilet", "watermark certified", "wels rated", "australia"],
    certifications: ["WaterMark", "WELS"],
    kitHint: null,
    seoTitle: "Rimless Modern Ceramic Toilet — 2-Piece P-Trap,… | Enviro Aqua",
    seoDescription: "Rimless soft-close toilets — WELS-rated and WaterMark-certified.",
  },
  {
    id: "4647",
    sku: "EA-BA-BV-001",
    slug: "1200mm-freestanding-vanity-stone-basin-top-white-pvc-tap-drainage-not-included",
    title: "1200mm Freestanding Vanity + Stone Basin Top — White PVC (tap/drainage not included)",
    primaryCategory: "bathroom",
    subCategory: "basins-vanities",
    categoryPath: ["Bathroom", "Basins & Vanities"],
    price: 835.0,
    regularPrice: 835.0,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Contemporary bathroom basin / vanity — quality materials, modern finish.",
    longDescription: `Counter-top basins, vessel sinks and complete vanity units with stone or ceramic tops.`,
    facets: {
      price_band: "$300 – $1,000",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/stone-basin-cabinet-1.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/stone-basin-cabinet-2.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/stone-basin-cabinet-3.png",
    ],
    tags: ["bathroom basin", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "1200mm Freestanding Vanity + Stone Basin Top —… | Enviro Aqua",
    seoDescription: "Modern bathroom basins and vanities in ceramic and stone.",
  },
  {
    id: "4663",
    sku: "EA-BA-BV-002",
    slug: "600mm-freestanding-vanity-ceramic-basin-top-white-pvc-tap-drainage-not-included",
    title: "600mm Freestanding Vanity + Ceramic Basin Top — White PVC (tap/drainage not included)",
    primaryCategory: "bathroom",
    subCategory: "basins-vanities",
    categoryPath: ["Bathroom", "Basins & Vanities"],
    price: 399.0,
    regularPrice: 399.0,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Contemporary bathroom basin / vanity — quality materials, modern finish.",
    longDescription: `Counter-top basins, vessel sinks and complete vanity units with stone or ceramic tops.`,
    facets: {
      price_band: "$300 – $1,000",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/vanity_cabinet_1.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/vanity_cabinet_2.png",
    ],
    tags: ["bathroom basin", "australia"],
    certifications: [],
    kitHint: null,
    seoTitle: "600mm Freestanding Vanity + Ceramic Basin Top —… | Enviro Aqua",
    seoDescription: "Modern bathroom basins and vanities in ceramic and stone.",
  },
  {
    id: "4598",
    sku: "EA-BA-SD-002",
    slug: "tile-insert-floor-drain-115mm-square-100mm-waste-outlet",
    title: "Tile Insert Floor Drain — 115mm Square, 100mm Waste Outlet",
    primaryCategory: "bathroom",
    subCategory: "showers-drains",
    categoryPath: ["Bathroom", "Showers & Drains"],
    price: 52.95,
    regularPrice: 52.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "WELS-rated bathroom shower or drain fixture.",
    longDescription: `Water-saving rainfall shower sets and tile-insert floor drains, WELS-rated.

**Specifications**

• **Finish:** Polished Chrome, Stainless Steel`,
    facets: {
      price_band: "$30 – $100",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/1-1.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/2-1.png",
    ],
    tags: ["shower set", "australia"],
    certifications: ["WELS"],
    kitHint: null,
    seoTitle: "Tile Insert Floor Drain — 115mm Square, 100mm Waste… | Enviro Aqua",
    seoDescription: "Water-saving shower sets and tile-insert floor drains.",
  },
  {
    id: "4603",
    sku: "EA-BA-TP2-001",
    slug: "wall-mounted-bath-spout-shower-mixer-round-chrome-wels-rated",
    title: "Wall-Mounted Bath Spout & Shower Mixer — Round Chrome, WELS Rated",
    primaryCategory: "bathroom",
    subCategory: "bathroom-taps",
    categoryPath: ["Bathroom", "Bathroom Taps & Mixers"],
    price: 58.5,
    regularPrice: 58.5,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "WELS-rated bathroom tap with quality finish.",
    longDescription: `WELS-rated bathroom mixer taps in contemporary finishes. Basin mixers, wall-mounted spouts and tall vessel-basin variants.

**Specifications**

• **Certifications:** WaterMark, WELS
• **Finish:** Polished Chrome`,
    facets: {
      application: ["commercial"],
      price_band: "$30 – $100",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/wall_basin_tap_1.png",
      "https://enviroaqua.com.au/wp-content/uploads/2024/10/wall_basin_tap_2.png",
    ],
    tags: ["bathroom tap", "watermark certified", "wels rated", "australia", "commercial"],
    certifications: ["WaterMark", "WELS"],
    kitHint: null,
    seoTitle: "Wall-Mounted Bath Spout & Shower Mixer — Round… | Enviro Aqua",
    seoDescription: "WELS-rated bathroom mixer taps in chrome, black and gold.",
  },
  {
    id: "3395",
    sku: "EA-WF-RO-001",
    slug: "commercial-reverse-osmosis-desalination-plant-1500-lpd-400-gpd",
    title: "Commercial Reverse Osmosis Desalination Plant — 1500 LPD / 400 GPD",
    primaryCategory: "water-filters",
    subCategory: "reverse-osmosis",
    categoryPath: ["Water Filters", "Reverse Osmosis (RO) Systems"],
    price: 940.0,
    regularPrice: 940.0,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Commercial 400 GPD / 1500 LPD reverse osmosis desalination plant for bore water, brackish supplies and commercial applications. Rated 0.3 m³/hr feed flow, 18–30% recovery. Ships ready to plumb.",
    longDescription: `Reverse osmosis is the only residential filtration technology that meaningfully reduces fluoride, PFAS, TDS and dissolved minerals. For households concerned about water purity at the highest level.

**Specifications**

• **Flow rate:** 1500 LPD
• **Filtration media:** Reverse Osmosis
• **Reduces:** tds / dissolved solids

**Why this filter**

• Reduces fluoride, PFAS, lead, arsenic and dissolved solids up to 99%
• Multi-stage filtration with sediment, carbon and RO membrane
• Dedicated filtered-water tap — pair with our 3-way RO mixers
• Pressure-tank storage for on-demand flow
• Commercial RO desalination available for bore/brackish supplies

**Installation**

Professional plumber recommended. Systems come pre-assembled with all fittings; installation typically takes 2–3 hours including a new tap-hole.`,
    facets: {
      flow_rate: "1500 LPD",
      technology: ["Reverse Osmosis"],
      removes: ["tds / dissolved solids"],
      application: ["commercial"],
      price_band: "$300 – $1,000",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/400-GPD-RO.png",
      "https://enviroaqua.com.au/wp-content/uploads/2020/07/400-GPD-RO-1.jpg",
    ],
    tags: ["reverse osmosis system", "australia", "commercial"],
    certifications: [],
    kitHint: "Pair with 3-way RO tap + replacement membrane",
    seoTitle: "Commercial Reverse Osmosis Desalination Plant —… | Enviro Aqua",
    seoDescription: "Reduces fluoride, PFAS and TDS up to 99% — multi-stage RO drinking water. 1500 LPD. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "4076",
    sku: "EA-WF-RO-005",
    slug: "5-stage-reverse-osmosis-under-sink-system-with-3-way-tap",
    title: "5-Stage Reverse Osmosis Under Sink System with 3-Way Tap",
    primaryCategory: "water-filters",
    subCategory: "reverse-osmosis",
    categoryPath: ["Water Filters", "Reverse Osmosis (RO) Systems"],
    price: 599.95,
    regularPrice: 599.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Reverse osmosis drinking water system that reduces fluoride, TDS, heavy metals and dissolved contaminants up to 99%.",
    longDescription: `Reverse osmosis is the only residential filtration technology that meaningfully reduces fluoride, PFAS, TDS and dissolved minerals. For households concerned about water purity at the highest level.

**Specifications**

• **5-stage filtration**
• **Filtration rating:** 0.0001 micron
• **Filtration media:** Sediment (PP), Reverse Osmosis
• **Reduces:** sediment, chlorine, heavy metals, taste & odour, tds / dissolved solids

**Why this filter**

• Reduces fluoride, PFAS, lead, arsenic and dissolved solids up to 99%
• Multi-stage filtration with sediment, carbon and RO membrane
• Dedicated filtered-water tap — pair with our 3-way RO mixers
• Pressure-tank storage for on-demand flow
• Commercial RO desalination available for bore/brackish supplies

**Installation**

Professional plumber recommended. Systems come pre-assembled with all fittings; installation typically takes 2–3 hours including a new tap-hole.`,
    facets: {
      technology: ["Sediment (PP)", "Reverse Osmosis"],
      removes: ["sediment", "chlorine", "heavy metals", "taste & odour", "tds / dissolved solids"],
      price_band: "$300 – $1,000",
      stages: 5,
      micron: "0.0001 micron",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2021/10/RO3Way.jpg",
    ],
    tags: ["5 stage filter", "reverse osmosis system", "australia"],
    certifications: [],
    kitHint: "Pair with 3-way RO tap + replacement membrane",
    seoTitle: "5-Stage Reverse Osmosis Under Sink System with… | Enviro Aqua",
    seoDescription: "Reduces fluoride, PFAS and TDS up to 99% — multi-stage RO drinking water. 5-stage. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "11779",
    sku: "EA-WF-RO-007",
    slug: "under-sink-reverse-osmosis-system-4-stage",
    title: "Under Sink Reverse Osmosis System — 4 Stage",
    primaryCategory: "water-filters",
    subCategory: "reverse-osmosis",
    categoryPath: ["Water Filters", "Reverse Osmosis (RO) Systems"],
    price: 209.95,
    regularPrice: 209.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Reverse osmosis drinking water system that reduces fluoride, TDS, heavy metals and dissolved contaminants up to 99%.",
    longDescription: `Reverse osmosis is the only residential filtration technology that meaningfully reduces fluoride, PFAS, TDS and dissolved minerals. For households concerned about water purity at the highest level.

**Specifications**

• **4-stage filtration**
• **Filtration rating:** 0.0001 micron
• **Filtration media:** Sediment (PP), Carbon Block (CTO), Reverse Osmosis
• **Reduces:** sediment, chlorine, heavy metals, taste & odour, tds / dissolved solids
• **Finish:** Stainless Steel

**Why this filter**

• Reduces fluoride, PFAS, lead, arsenic and dissolved solids up to 99%
• Multi-stage filtration with sediment, carbon and RO membrane
• Dedicated filtered-water tap — pair with our 3-way RO mixers
• Pressure-tank storage for on-demand flow
• Commercial RO desalination available for bore/brackish supplies

**Installation**

Professional plumber recommended. Systems come pre-assembled with all fittings; installation typically takes 2–3 hours including a new tap-hole.`,
    facets: {
      technology: ["Sediment (PP)", "Carbon Block (CTO)", "Reverse Osmosis"],
      removes: ["sediment", "chlorine", "heavy metals", "taste & odour", "tds / dissolved solids"],
      price_band: "$100 – $300",
      stages: 4,
      micron: "0.0001 micron",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2025/01/four_stage_undersink.png",
    ],
    tags: ["4 stage filter", "reverse osmosis system", "australia"],
    certifications: [],
    kitHint: "Pair with 3-way RO tap + replacement membrane",
    seoTitle: "Under Sink Reverse Osmosis System — 4 Stage | Enviro Aqua",
    seoDescription: "Reduces fluoride, PFAS and TDS up to 99% — multi-stage RO drinking water. 4-stage. Shop Enviro Aqua — Australia-wide delivery.",
  },
  {
    id: "11783",
    sku: "EA-WF-RO-008",
    slug: "under-sink-reverse-osmosis-system-5-stage",
    title: "Under Sink Reverse Osmosis System — 5 Stage",
    primaryCategory: "water-filters",
    subCategory: "reverse-osmosis",
    categoryPath: ["Water Filters", "Reverse Osmosis (RO) Systems"],
    price: 259.95,
    regularPrice: 259.95,
    onSale: false,
    stockStatus: "in_stock",
    shortDescription: "Reverse osmosis drinking water system that reduces fluoride, TDS, heavy metals and dissolved contaminants up to 99%.",
    longDescription: `Reverse osmosis is the only residential filtration technology that meaningfully reduces fluoride, PFAS, TDS and dissolved minerals. For households concerned about water purity at the highest level.

**Specifications**

• **5-stage filtration**
• **Filtration rating:** 5 micron
• **Filtration media:** Sediment (PP), Carbon Block (CTO), Granular Activated Carbon (GAC), Reverse Osmosis, Fluoride Reduction
• **Reduces:** sediment, chlorine, fluoride, heavy metals, taste & odour, tds / dissolved solids
• **Finish:** Stainless Steel

**Why this filter**

• Reduces fluoride, PFAS, lead, arsenic and dissolved solids up to 99%
• Multi-stage filtration with sediment, carbon and RO membrane
• Dedicated filtered-water tap — pair with our 3-way RO mixers
• Pressure-tank storage for on-demand flow
• Commercial RO desalination available for bore/brackish supplies

**Installation**

Professional plumber recommended. Systems come pre-assembled with all fittings; installation typically takes 2–3 hours including a new tap-hole.`,
    facets: {
      technology: ["Sediment (PP)", "Carbon Block (CTO)", "Granular Activated Carbon (GAC)", "Reverse Osmosis", "Fluoride Reduction"],
      removes: ["sediment", "chlorine", "fluoride", "heavy metals", "taste & odour", "tds / dissolved solids"],
      price_band: "$100 – $300",
      stages: 5,
      micron: "5 micron",
    },
    images: [
      "https://enviroaqua.com.au/wp-content/uploads/2025/01/five_stage_undersink.png",
    ],
    tags: ["5 stage filter", "reverse osmosis system", "australia"],
    certifications: [],
    kitHint: "Pair with 3-way RO tap + replacement membrane",
    seoTitle: "Under Sink Reverse Osmosis System — 5 Stage | Enviro Aqua",
    seoDescription: "Reduces fluoride, PFAS and TDS up to 99% — multi-stage RO drinking water. 5-stage. Shop Enviro Aqua — Australia-wide delivery.",
  },
];