import type { BlogPost } from "@/types/blog";

export const post: BlogPost = {
  slug: "watermark-certification-explained-australia",
  title: "WaterMark Certification Explained: What It Means and When You Need It",
  description:
    "WaterMark, WELS, NSF and AS/NZS — Australian water filter certifications, demystified. Which products legally need certification, what each one actually proves, and how to read the labels honestly.",
  excerpt:
    "WaterMark is mandatory for some plumbed-in products and irrelevant for others. Most retailers blur the difference. Here's what each certification means, and when it's required by law.",
  publishedAt: "2026-03-18",
  author: {
    name: "Liam Hartley",
    role: "Senior Water Treatment Specialist",
  },
  topic: "Standards",
  keywords: [
    "WaterMark certification",
    "WaterMark water filter",
    "WELS rated tap",
    "AS/NZS 3497",
  ],
  relatedCategories: [
    {
      label: "Commercial Bubblers",
      href: "/shop/commercial-bubblers",
    },
    {
      label: "Whole House Water Filters",
      href: "/shop/water-filters/whole-house",
    },
    { label: "Kitchen Taps", href: "/shop/kitchen-taps" },
  ],
  relatedProducts: [
    "commercial-filtered-water-bubbler-square-stainless-steel-watermark-certified",
    "triple-big-blue-whole-house-water-filter-20-x-4-5-3-stage",
    "rimless-modern-ceramic-toilet-2-piece-p-trap-watermark-wels",
  ],
  body: [
    {
      type: "paragraph",
      text: "Walk into any plumbing supplier in Australia and you'll see the WaterMark logo plastered across boxes, tap cards, and product spec sheets. Some of them legitimately carry it; some print it as a vague suggestion of quality; some retailers will tell you everything is \"WaterMark certified\" without specifying anything. The same is true for WELS ratings, NSF certifications, and the AS/NZS standards series. Each one means something specific. Each one applies to a different category of product. And honestly using these terms — rather than treating them as marketing decoration — is the difference between a credible specifier and one to avoid.",
    },
    {
      type: "paragraph",
      text: "This article is the plain-English version of the certifications you'll see when you're shopping for a water filter, a tap, or a commercial drinking fountain in Australia. Where each one is required, where it's optional, and how to read product labels without being misled.",
    },
    {
      type: "heading",
      level: 2,
      text: "WaterMark: the mandatory one",
      id: "watermark",
    },
    {
      type: "paragraph",
      text: "WaterMark is administered by the Australian Building Codes Board. It's a mandatory certification for plumbing and drainage products that connect permanently to a potable water supply or sewer system. Every state plumbing code in Australia adopts it through the Plumbing Code of Australia, and a licensed plumber installing a non-WaterMark product where one is required can lose their license. It's not optional.",
    },
    {
      type: "paragraph",
      text: "What it covers: pipes, fittings, valves, taps, toilet cisterns, hot water systems, filter housings that are plumbed into mains, drinking fountains and bubblers, and a long list of related infrastructure. Each WaterMark certification references a specific Australian Standard the product is tested against — for example, drinking water treatment units (which means filters that are permanently plumbed-in) must be certified under AS/NZS 3497.",
    },
    {
      type: "paragraph",
      text: "What it doesn't cover: portable products, products that connect via a flexible hose to an existing certified tap (think bench-top filters with a diverter), and most accessories. A bench-top water filter that diverts water from your kitchen tap is not required to carry WaterMark, because it's not making a permanent connection to the mains. The diverter and the existing tap are the certified components — the filter housing downstream sits in a regulatory grey zone where certification is permitted but not mandatory.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Quick test: does this product need WaterMark?",
      body: "Will a licensed plumber permanently plumb it into your mains water? If yes, it must be WaterMark certified. If no — if it sits on a counter, plugs into a hose, or runs on a portable basis — WaterMark is not legally required, although the product may still carry related certifications like NSF.",
    },
    {
      type: "heading",
      level: 2,
      text: "WELS: the water-efficiency one",
      id: "wels",
    },
    {
      type: "paragraph",
      text: "WELS — the Water Efficiency Labelling and Standards scheme — is run by the federal government and is mandatory for tapware, showerheads, washing machines, dishwashers, and toilets sold in Australia. The recognisable WELS label shows a star rating (more stars = more efficient) and a flow-rate or water-consumption figure.",
    },
    {
      type: "paragraph",
      text: "It's not a quality certification. WELS doesn't tell you whether a tap is well-built, certified for permanent installation, or appropriate for your application. It tells you how much water the product uses. The two ratings to know:",
    },
    {
      type: "list",
      items: [
        "**Stars (1–6)** — efficiency relative to peers in the same category. More stars is better.",
        "**Litres per minute (taps and showers)** or **litres per flush (toilets)** — the absolute consumption figure.",
      ],
    },
    {
      type: "paragraph",
      text: "A tap can be WELS rated and not WaterMark certified (it's perfectly water-efficient but isn't approved for permanent connection). A tap can also be WaterMark certified and not WELS rated (rare, since both are mandatory for retail tapware). For consumer kitchen and bathroom taps, you want both.",
    },
    {
      type: "heading",
      level: 2,
      text: "NSF: the international one",
      id: "nsf",
    },
    {
      type: "paragraph",
      text: "NSF International is a US-based independent testing and certification body. Their standards are global, voluntary in Australia, and very widely adopted in the water filtration industry — particularly for the materials and contaminant-reduction performance of filter media and membranes.",
    },
    {
      type: "paragraph",
      text: "The NSF standards you'll see most often on water filters:",
    },
    {
      type: "list",
      items: [
        "**NSF 42** — aesthetic effects (chlorine, taste, odour, particulate). What carbon-block filters are mostly tested against.",
        "**NSF 53** — health-related contaminants (lead, cysts, VOCs, MTBE). Higher bar than 42.",
        "**NSF 58** — reverse osmosis systems specifically. Tests permeate water quality and recovery.",
        "**NSF 61** — drinking water system components. Materials in contact with water must not leach harmful substances.",
      ],
    },
    {
      type: "paragraph",
      text: "An NSF-certified filter has been tested in an independent lab against a specified contaminant reduction claim. The certification is product-and-claim specific, which means a manufacturer can certify that their filter reduces chlorine to NSF 42 standards but make no claim about lead reduction. Look at the certification number, not just the badge.",
    },
    {
      type: "heading",
      level: 2,
      text: "AS/NZS: the underlying standards",
      id: "as-nzs",
    },
    {
      type: "paragraph",
      text: "Australian/New Zealand Standards (AS/NZS) are the technical specifications WaterMark certifications reference. The relevant ones for water filtration:",
    },
    {
      type: "comparison",
      headers: ["Standard", "What it covers", "Where you'll see it"],
      rows: [
        [
          "AS/NZS 4020",
          "Materials in contact with drinking water",
          "Filter housings, tubing, fittings",
        ],
        [
          "AS/NZS 3497",
          "Drinking water treatment units (plumbed-in)",
          "Whole-house & under-sink filters",
        ],
        [
          "AS/NZS 3662",
          "Performance of showers",
          "Showerheads",
        ],
        [
          "AS/NZS 6400",
          "Water-efficient products",
          "Tapware, toilets",
        ],
      ],
    },
    {
      type: "paragraph",
      text: "When a product is WaterMark certified, the certificate will reference one or more of these underlying standards. Reading the certificate tells you specifically what was tested.",
    },
    {
      type: "heading",
      level: 2,
      text: "How to read certifications honestly",
      id: "reading-claims",
    },
    {
      type: "paragraph",
      text: "Three patterns to be aware of when shopping:",
    },
    {
      type: "heading",
      level: 3,
      text: "Pattern 1 — \"NSF compliant\" without certification",
    },
    {
      type: "paragraph",
      text: '"NSF-compliant materials" or "manufactured to NSF standards" is not the same as "NSF certified". Compliance is a manufacturer\'s self-declaration; certification is third-party tested. Both are common in the filter industry, and both can be legitimate, but only one has been independently verified. Look for the certification number — actual NSF certification will reference one (e.g. NSF 42 #C0123456).',
    },
    {
      type: "heading",
      level: 3,
      text: "Pattern 2 — Brand-level vs product-level claims",
    },
    {
      type: "paragraph",
      text: 'A retailer saying "we sell WaterMark-certified water filters" might be honest — they sell at least one such product — but you have to check the specific item you\'re buying. WaterMark is awarded per product, not per brand. The same is true for NSF.',
    },
    {
      type: "heading",
      level: 3,
      text: "Pattern 3 — Wrong standard for the product",
    },
    {
      type: "paragraph",
      text: 'Some packaging cites a standard that doesn\'t apply to the product type. A filter housing labelled "AS/NZS 4020 compliant" tells you the housing material is safe for drinking water — but says nothing about whether the unit as a whole is approved for installation (which would be AS/NZS 3497, plus WaterMark). The applicable standard depends on the product category.',
    },
    {
      type: "heading",
      level: 2,
      text: "Where Enviro Aqua products sit",
      id: "our-position",
    },
    {
      type: "paragraph",
      text: 'We sell certified and uncertified products. Both are legal — but every product page on this site lists exactly what each item carries, and we don\'t use site-wide certification claims that don\'t apply to specific items.',
    },
    {
      type: "list",
      items: [
        "**Commercial drinking bubblers** — all 3 SKUs we carry are WaterMark certified to AS/NZS 3497 (mandatory for permanent installation in public buildings).",
        "**Whole-house systems** — one is WaterMark certified, the others are not. The choice is on each product page; uncertified options are sold for installations where mandatory certification doesn't apply (e.g. caravan, off-grid, pre-meter).",
        "**Bench-top filters** — none carry WaterMark, because they don't require it. They're connected via diverter to an existing certified tap.",
        "**Kitchen taps** — most carry both WELS and a NSF cert on the spout. WaterMark applies to the body of the tap and is required for installation.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "When in doubt, ask for the certificate",
      body: "Any reputable Australian seller can provide the actual certification document or registration number on request — it's required record-keeping. If a retailer can't tell you whether a product is certified, or which standard it was tested against, treat that as the answer.",
    },
    {
      type: "heading",
      level: 2,
      text: "Bottom line",
      id: "summary",
    },
    {
      type: "paragraph",
      text: "Certifications matter most when you're plumbing a product permanently into mains water. For those products, WaterMark is mandatory and absent at your plumber's professional risk. WELS is a separate (efficiency) scheme that is also mandatory for retail tapware in Australia. NSF is an independent quality and contaminant-reduction certification — useful as a credibility signal, but voluntary here.",
    },
    {
      type: "paragraph",
      text: "For products where certification isn't legally required — bench-top filters, portable RO units, replacement cartridges — quality and certification still vary. Read the actual product page, not the homepage banner.",
    },
    {
      type: "product-link",
      heading: "Products with verified certification",
      blurb:
        "A few examples from our range — each carrying genuine WaterMark + WELS where applicable.",
      productSlugs: [
        "commercial-filtered-water-bubbler-square-stainless-steel-watermark-certified",
        "triple-big-blue-whole-house-water-filter-20-x-4-5-3-stage",
        "rimless-modern-ceramic-toilet-2-piece-p-trap-watermark-wels",
      ],
    },
  ],
};
