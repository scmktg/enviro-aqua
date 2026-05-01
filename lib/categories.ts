import type { Category } from "@/types/category";

/**
 * Category structure. Each category page is also a landing page — the `intro`
 * is the SEO body copy, and each subCategory has its own decisionLine that
 * powers the "which one do I need?" matrix at the top of the PLP.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "water-filters",
    name: "Water Filters",
    navLabel: "Water Filters",
    heading: "Water Filters",
    subhead:
      "Whole-house, under-sink, bench-top and reverse osmosis. Plumber-grade Australian product. Same-day dispatch from Wyong NSW.",
    intro:
      "Australian-stocked water filtration for town water, tank water and bore supplies. Whole-house Big Blue systems for the property, under-sink and bench-top units for drinking water, reverse osmosis for the highest reduction of fluoride, PFAS and dissolved solids — plus every cartridge size in standard 10\" and 20\" formats. Same price retail or trade. Shipped Australia-wide from our Wyong NSW Central Coast warehouse, with free Click & Collect for local customers. Certifications vary by product — each product page lists what that specific system carries.",
    navCta: {
      eyebrow: "Not sure which filter?",
      title: "Use the 30-second filter finder",
      body: "Three questions. Tells you exactly what fits your home, water source and budget.",
      href: "/help/which-filter",
    },
    subCategories: [
      {
        slug: "whole-house",
        name: "Whole House",
        heading: "Whole House Water Filters",
        intro:
          "Point-of-entry filtration for the whole property — every tap, shower and appliance gets filtered water. The right choice for chlorine, sediment, taste and protecting hot-water systems and washing machines. Standard Big Blue 10\" and 20\" sizing means cartridges are available everywhere in Australia.",
        decisionLine:
          "You own the home and want every tap filtered, including showers and laundry.",
      },
      {
        slug: "under-sink",
        name: "Under Sink",
        heading: "Under Sink Water Filters",
        intro:
          "Hidden under-the-bench filtration with a dedicated drinking-water tap. The standard for Australian kitchens — bottled-quality water on demand without countertop clutter. 2-stage, 3-stage with alkaline mineralisation, or pair with a reverse osmosis system.",
        decisionLine:
          "You own the home, want filtered drinking water from a dedicated tap, and have under-sink space.",
      },
      {
        slug: "bench-top",
        name: "Bench Top",
        heading: "Bench Top Water Filters",
        intro:
          "Countertop water filters that connect to your existing tap with a diverter — no plumbing, no installation, no landlord conversation. The category for renters, holiday homes, and anyone who needs filtered water this week without a plumber's call-out.",
        decisionLine:
          "You rent, or you can't (or don't want to) install under the sink.",
      },
      {
        slug: "reverse-osmosis",
        name: "Reverse Osmosis",
        heading: "Reverse Osmosis Systems",
        intro:
          "RO is the only residential filtration that reduces fluoride, PFAS and total dissolved solids by up to 99%. Five-stage under-sink units for households, commercial-scale plants for bore-water sites and small businesses. Pair with a 3-way kitchen mixer or a dedicated drinking-water faucet.",
        decisionLine:
          "You want the highest reduction of fluoride, PFAS and dissolved solids — or you're on bore / brackish water.",
      },
      {
        slug: "uv-sterilisation",
        name: "UV Sterilisation",
        heading: "UV Steriliser Systems",
        intro:
          "Ultraviolet sterilisation kills 99.99% of bacteria, viruses and protozoa with no chemicals and no taste impact. Mandatory for tank water in many council areas and the right choice anywhere on a non-chlorinated supply. Add to a whole-house filter or run inline.",
        decisionLine:
          "You're on tank water, bore water, or any non-chlorinated supply.",
      },
      {
        slug: "shower-filters",
        name: "Shower Filters",
        heading: "Shower Filters",
        intro:
          "In-line shower filters that reduce chlorine before it hits skin and hair. The single cheapest upgrade for anyone in a heavily chlorinated municipal area. Installs in five minutes between the wall and the shower head — no tools.",
        decisionLine:
          "You rent, or you don't want to commit to a whole-house system yet.",
      },
      {
        slug: "replacement-cartridges",
        name: "Replacement Cartridges",
        heading: "Replacement Filter Cartridges",
        intro:
          "Genuine replacement cartridges for every Enviro Aqua system — and for any standard 10\" or 20\" Australian housing. Sediment, carbon block, granular activated carbon, RO membranes, ultrafiltration. Annual kits and subscription delivery available.",
        decisionLine:
          "Your filter is over 6–12 months old — replace it before it starts releasing what it captured.",
      },
      {
        slug: "fittings-parts",
        name: "Fittings & Parts",
        heading: "Fittings, Tubing & Accessories",
        intro:
          "Push-fit fittings, tubing, pressure gauges, diverter valves and tap connectors for water filter installations. Standard 1/4\" (6mm) and 3/8\" sizing. Australian mains-pressure rated.",
        decisionLine:
          "You're servicing or building out a system — the small parts that hold it together.",
      },
      {
        slug: "tanks-pumps",
        name: "Tanks & Pumps",
        heading: "Pressure Tanks & Pumps",
        intro:
          "Pressure tanks and booster pumps for reverse osmosis systems and rainwater applications. Maintains on-demand flow when mains pressure isn't enough.",
        decisionLine:
          "You're on a tank, bore or low-pressure supply, or scaling an RO system.",
      },
    ],
  },
  {
    slug: "commercial-bubblers",
    name: "Commercial Bubblers",
    navLabel: "Commercial Bubblers",
    heading: "Commercial Bubblers & Drinking Fountains",
    subhead:
      "WaterMark-certified filtered bubblers for schools, gyms, offices and public spaces. 304 stainless steel. Same-day dispatch from Wyong NSW.",
    intro:
      "Commercial drinking water for high-traffic environments — schools, gyms, offices, body corporates, sports clubs and councils. Filtered drinking bubblers (WaterMark certified to AS/NZS 3497), direct-connect water coolers, and under-counter chillers. 304 stainless steel construction throughout. Pricing is the same for trade, fit-out and direct purchase. Multi-site quotes available.",
    navCta: {
      eyebrow: "Multi-site project?",
      title: "Get a fit-out quote",
      body: "Schools, gyms, offices — multi-unit pricing on 5+. Email or call for a same-day quote.",
      href: "/help/which-filter",
    },
    subCategories: [
      {
        slug: "filtered-bubblers",
        name: "Filtered Bubblers",
        heading: "Filtered Drinking Bubblers",
        intro:
          "WaterMark-certified filtered drinking bubblers for direct-connect installation. 304 stainless steel construction, vandal-resistant, built for schools, gyms and public sites. Includes pre-filter and main carbon-block filter. Annual service kits available.",
        decisionLine:
          "Public-facing, high-traffic site — schools, gyms, councils, fitness centres.",
      },
      {
        slug: "water-coolers",
        name: "Water Coolers",
        heading: "Hot, Cold & Ambient Water Coolers",
        intro:
          "Direct-connect water coolers — hot, cold and ambient — for offices, lunchrooms and back-of-house. No bottle deliveries, no contracts. Built-in three-stage filtration; mains-water plumbed.",
        decisionLine:
          "Office, lunchroom or break-out space — staff need hot tea and cold water on tap.",
      },
      {
        slug: "under-counter-chillers",
        name: "Under-Counter Chillers",
        heading: "Under-Counter Drinking Water Chillers",
        intro:
          "Under-counter chillers for hospitality and food service. Hide the unit, plumb a stainless tap through the bench. Continuous chilled filtered water for restaurants, cafés and bars.",
        decisionLine:
          "Hospitality fit-out — chilled water at the bar without compromising counter space.",
      },
      {
        slug: "bubbler-parts",
        name: "Bubbler Parts & Filters",
        heading: "Bubbler Replacement Parts & Filters",
        intro:
          "Replacement filters, taps and service parts for Enviro Aqua commercial bubblers. Annual service kits keep your unit compliant and tasting clean.",
        decisionLine:
          "Time for the annual service — or a tap got knocked off and needs replacing.",
      },
    ],
  },
  {
    slug: "kitchen-taps",
    name: "Kitchen Taps",
    navLabel: "Kitchen Taps",
    heading: "Kitchen Taps for Filtered Drinking Water",
    subhead:
      "RO drinking-water faucets, 3-way mixers and standard kitchen mixers — the right tap for every Enviro Aqua filter system.",
    intro:
      "Kitchen taps that pair with our water filter systems. Dedicated reverse-osmosis faucets that connect to under-sink RO units, 3-way mixers that combine hot, cold and filtered water in a single fixture, and a focused range of standard kitchen mixers. WELS rated, AS/NZS compliant, designed for Australian 35mm sink cut-outs. If you're installing a filter system, this is the tap to install with it.",
    navCta: {
      eyebrow: "Filter + tap together",
      title: "Save on a system bundle",
      body: "Buy your RO system and tap together. We size the cut-out and pair the right tap.",
      href: "/shop/water-filters/reverse-osmosis",
    },
    subCategories: [
      {
        slug: "ro-3way-taps",
        name: "3-Way RO Taps",
        heading: "3-Way RO Mixer Taps",
        intro:
          "One tap, three streams: hot mains, cold mains, and filtered RO water — all from a single fixture. Replaces your existing kitchen mixer and connects to an under-sink reverse osmosis system. The tidy choice for kitchens that don't have room for a second drinking-water tap.",
        decisionLine:
          "You want filtered water without a second tap on the bench.",
      },
      {
        slug: "dedicated-ro-taps",
        name: "Dedicated RO Taps",
        heading: "Dedicated RO Drinking-Water Taps",
        intro:
          "A separate small-bore tap that delivers RO drinking water only, alongside your existing kitchen mixer. Standard pairing for under-sink RO systems. Australian 35mm cut-out compatible.",
        decisionLine:
          "You're keeping your existing kitchen mixer and adding a drinking-water tap.",
      },
      {
        slug: "mixer-taps",
        name: "Mixer Taps",
        heading: "Kitchen Mixer Taps",
        intro:
          "Standard hot/cold kitchen mixers — pull-down, gooseneck, spring-loaded. WELS rated, ceramic-disc cartridges, AS/NZS-compliant.",
        decisionLine:
          "Replacing the kitchen tap — not adding filtration.",
      },
    ],
  },
  {
    slug: "bathroom",
    name: "Bathroom",
    navLabel: "Bathroom",
    heading: "Bathroom — Fit-Out Range",
    subhead:
      "A focused range of WELS-rated bathroom essentials — for projects already buying water filtration from us.",
    intro:
      "Enviro Aqua's bathroom range exists for one reason: customers building bathrooms alongside whole-house filter installs asked us to source the rest of the suite. Toilets, vanities, mixer taps and floor drains — all WELS-rated and WaterMark compliant where required, all available at the same price retail or trade. We don't pretend to be a full bathroom retailer; for that you want a specialist. We do make sure the bathroom side of your fit-out doesn't slow down the filter delivery.",
    navCta: {
      eyebrow: "Filter system first",
      title: "Spec your filtration before the bathroom",
      body: "Whole-house filter sizing affects vanity tap pressure. Quick walkthrough — call us, or use the filter finder.",
      href: "/help/which-filter",
    },
    subCategories: [
      {
        slug: "toilets",
        name: "Toilets",
        heading: "Toilets",
        intro:
          "WELS-rated, dual-flush toilet suites and concealed-cistern systems. Soft-close seats included.",
        decisionLine:
          "New build or full bathroom renovation.",
      },
      {
        slug: "basins-vanities",
        name: "Basins & Vanities",
        heading: "Basins & Vanities",
        intro:
          "Freestanding vanities with stone and ceramic basin tops. Pre-drilled for standard tap configurations. Tap and drainage sold separately.",
        decisionLine:
          "Bathroom renovation — main vanity replacement.",
      },
      {
        slug: "showers-drains",
        name: "Showers & Drains",
        heading: "Showers & Drains",
        intro:
          "Tile-insert floor drains and shower components. AS/NZS compliant.",
        decisionLine:
          "Wet-area drainage upgrade.",
      },
      {
        slug: "bathroom-taps",
        name: "Bathroom Taps",
        heading: "Bathroom Taps",
        intro:
          "Bath spouts, basin mixers and shower mixers. WELS rated, ceramic-disc cartridges.",
        decisionLine:
          "Bathroom tapware replacement.",
      },
    ],
  },
];

/**
 * Lookup helpers. These are O(n) but n=4, so it's fine — the alternative
 * is maintaining a parallel index that drifts.
 */
export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getSubCategory(
  categorySlug: string,
  subSlug: string
): { category: Category; sub: import("@/types/category").SubCategory } | undefined {
  const category = getCategory(categorySlug);
  if (!category) return undefined;
  const sub = category.subCategories.find((s) => s.slug === subSlug);
  if (!sub) return undefined;
  return { category, sub };
}
