import type { Category } from "@/types/category";

/**
 * Category structure — three top-level navigation items.
 *
 *   1. Water Filters         — primary specialty (10 sub-categories)
 *   2. Bubblers & Coolers    — B2B drinking-water for schools/gyms/offices (3 subs)
 *   3. More                  — supporting bathroom/kitchen/specialty ranges (7 subs)
 *
 * The label "More" is intentional in the nav — short, signals "additional ranges"
 * without committing to a specific framing. The PLP H1 expands it.
 *
 * Order in this array is the order the nav, mega-menu, footer and sitemap render
 * — do not reorder casually. Each sub-category has its own decisionLine that
 * powers the "which one do I need?" matrix at the top of the parent landing page.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "water-filters",
    name: "Water Filters",
    navLabel: "Water Filters",
    heading: "Water Filters",
    subhead:
      "Whole-house, under-sink, reverse osmosis. Plumber-grade Australian product. Same-day dispatch from Wyong NSW.",
    intro:
      "Australian-stocked water filtration for town water, tank water and bore supplies. Whole-house Big Blue systems for the property, under-sink and bench-top units for drinking water, reverse osmosis for the highest reduction of fluoride, PFAS and dissolved solids — plus every cartridge size in standard 10\" and 20\" formats and the pumps, tanks and filter-taps that complete an install. Same price retail or trade. Shipped Australia-wide from our Wyong NSW Central Coast warehouse, with free Click & Collect for local customers. Certifications vary by product — each product page lists what that specific system carries.",
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
          "Hidden under-the-bench filtration with a dedicated drinking-water tap. The standard for Australian kitchens — bottled-quality water on demand without countertop clutter. Two-stage and three-stage carbon systems for taste, chlorine and sediment.",
        decisionLine:
          "You want filtered drinking water from a dedicated tap, plumbed in under the sink.",
      },
      {
        slug: "reverse-osmosis",
        name: "Reverse Osmosis",
        heading: "Reverse Osmosis Systems",
        intro:
          "RO is the only residential filtration that reduces fluoride, PFAS and total dissolved solids by up to 99%. Four-, five- and six-stage under-sink systems for households; commercial-scale desalination plants for bore-water sites and small businesses. Pair with a 3-way kitchen mixer or a dedicated drinking-water faucet from the Filter Taps range.",
        decisionLine:
          "You want the highest reduction of fluoride, PFAS and dissolved solids — or you're on bore / brackish water.",
      },
      {
        slug: "bench-top",
        name: "Bench Top",
        heading: "Bench Top Water Filters",
        intro:
          "Countertop filters that connect to your existing kitchen tap with a diverter — no plumbing, no installation, no landlord conversation. The category for renters, holiday homes and anyone who needs filtered water this week without a plumber's call-out. Same media as the plumbed-in range.",
        decisionLine:
          "You rent, or you can't (or don't want to) install under the sink.",
      },
      {
        slug: "uv-sterilisers",
        name: "UV Sterilisers",
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
          "Genuine replacement cartridges for every Enviro Aqua system — and for any standard 10\" or 20\" Australian housing. Sediment, carbon block, granular activated carbon, RO membranes, ultrafiltration. Plus the push-fit fittings, locking clips, TDS testers and small parts you need at service time.",
        decisionLine:
          "Your filter is over 6–12 months old — replace it before it starts releasing what it captured.",
      },
      {
        slug: "filter-taps",
        name: "Filter Taps",
        heading: "Filter Taps & 3-Way RO Mixers",
        intro:
          "The taps designed to pair with under-sink filter and RO systems. Dedicated drinking-water faucets that mount alongside your kitchen mixer, and 3-way mixers that combine hot, cold and filtered RO water in a single fixture. WELS rated, NSF where the tap contacts drinking water, sized for Australian 35mm sink cut-outs.",
        decisionLine:
          "You're installing or upgrading a filter system — these are the taps designed for it.",
      },
      {
        slug: "filter-pumps",
        name: "Filter Pumps",
        heading: "Booster & 12V Pumps for Water Filters",
        intro:
          "The pumps that complete a filter system. Booster pumps lift inlet pressure into the 60–80 PSI range RO membranes need to work efficiently — essential on long supply runs, tank water or anywhere afternoon pressure drop kills RO output. 12V diaphragm pumps for caravans, motorhomes and off-grid water cabinets running their own filtration.",
        decisionLine:
          "Your RO system isn't producing rated litres per day, or you're plumbing filtration into a caravan / off-grid build.",
      },
      {
        slug: "filter-tanks",
        name: "Filter Tanks",
        heading: "Tanks, Vessels & Inline Plumbing",
        intro:
          "Tanks, vessels and the inline plumbing that holds your filter system together. Pre-charged bladder tanks for RO storage and whole-house pressure equalisation; pressure switches, gauges, regulators and shut-off valves for service points; flexible stainless and PVC hose for connections. The functional bucket every install needs and no-one finds in one place.",
        decisionLine:
          "Your filter or RO install needs a holding tank, a pressure component, or the inline plumbing to tie it together.",
      },
    ],
  },
  {
    slug: "bubblers-and-coolers",
    name: "Bubblers & Coolers",
    navLabel: "Bubblers & Coolers",
    heading: "Drinking Bubblers & Water Coolers — Commercial",
    subhead:
      "WaterMark-certified filtered drinking water for schools, gyms, offices and public spaces. 304 stainless steel. Same-day dispatch from Wyong NSW.",
    intro:
      "Commercial drinking water for high-traffic environments — schools, gyms, offices, body corporates, sports clubs and councils. Filtered drinking bubblers (WaterMark certified to AS/NZS 3497) for direct-connect installation, hot/cold/ambient water coolers that replace bottled-water deliveries, and the replacement taps and cartridges that keep them serviced. 304 stainless steel construction throughout. Pricing is the same for trade, fit-out and direct purchase. Multi-site quotes available.",
    navCta: {
      eyebrow: "Multi-site project?",
      title: "Get a fit-out quote",
      body: "Schools, gyms, offices — multi-unit pricing on 5+. Email or call for a same-day quote.",
      href: "/help/which-filter",
    },
    subCategories: [
      {
        slug: "commercial-bubblers",
        name: "Commercial Bubblers",
        heading: "Filtered Drinking Bubblers",
        intro:
          "WaterMark-certified filtered drinking bubblers for direct-connect installation. 304 stainless steel construction, vandal-resistant, built for schools, gyms and public sites. Pre-filter and main carbon-block filter included; annual service kits available.",
        decisionLine:
          "Public-facing, high-traffic site — schools, gyms, councils, fitness centres.",
      },
      {
        slug: "water-coolers",
        name: "Water Coolers",
        heading: "Hot, Cold & Ambient Water Coolers",
        intro:
          "Direct-connect water coolers — hot, cold and ambient — for offices, lunchrooms and back-of-house. No bottle deliveries, no contracts. Built-in filtration; mains-water plumbed. Bench-top and free-standing units.",
        decisionLine:
          "Office, lunchroom or break-out space — staff need hot tea and cold water on tap.",
      },
      {
        slug: "taps-and-cartridges",
        name: "Taps & Cartridges",
        heading: "Replacement Taps & Cartridges",
        intro:
          "Replacement bubbler taps and filter cartridges for the units we sell. Annual service kits keep your unit compliant and tasting clean. If a tap got knocked off in a school corridor, this is the page.",
        decisionLine:
          "Time for the annual service — or a tap got knocked off and needs replacing.",
      },
    ],
  },
  {
    slug: "more",
    name: "More",
    navLabel: "More",
    heading: "Bathroom, Kitchen & Specialty",
    subhead:
      "Supporting ranges for customers building out around their water filter install — toilets, vanities, taps, dosing tanks, accessories.",
    intro:
      "Water filtration is what we do. The ranges in here exist because customers building bathrooms, kitchens and treatment-plant rooms alongside their filter installs asked us to source the rest. WELS-rated bathroom taps and toilets, bunded dosing tanks for pool chemicals and water-treatment plants, kitchen mixers without filter integration, vanities, floor drains and accessories. We don't pretend to be a full bathroom retailer or a chemicals specialist — for that you want a specialist. We do make sure the rest of your fit-out doesn't slow down the filter delivery.",
    navCta: {
      eyebrow: "Filter system first",
      title: "Spec your filtration before the bathroom",
      body: "Whole-house filter sizing affects vanity tap pressure. Quick walkthrough — call us, or use the filter finder.",
      href: "/help/which-filter",
    },
    subCategories: [
      {
        slug: "dosing-tanks",
        name: "Dosing Tanks",
        heading: "Bunded Chemical Dosing Tanks",
        intro:
          "Bunded polyethylene tanks for the safe storage and dosing of pool chemicals, alkalinity-correction agents and water-treatment chemicals. Built to Australian dangerous-goods storage requirements with integral 110% bund volume to contain spills. Sized for treatment-plant rooms, council pools, body-corporate pump rooms and commercial water-treatment installations. Call to spec the right tank for your dosing rate and chemical compatibility.",
        decisionLine:
          "You're specifying chemical storage for a pool, water-treatment plant or commercial pump room.",
      },
      {
        slug: "toilets",
        name: "Toilets",
        heading: "Toilets",
        intro:
          "WELS-rated, dual-flush toilet suites and concealed-cistern systems. Soft-close seats included. Rimless ceramic for easier cleaning.",
        decisionLine:
          "New build or full bathroom renovation.",
      },
      {
        slug: "bathroom-taps",
        name: "Bathroom Taps",
        heading: "Bathroom Taps",
        intro:
          "Bath spouts, basin mixers and shower mixers. WELS rated, ceramic-disc cartridges. Chrome and brushed-nickel finishes.",
        decisionLine:
          "Bathroom tapware replacement.",
      },
      {
        slug: "kitchen-taps",
        name: "Kitchen Taps",
        heading: "Kitchen Mixer Taps",
        intro:
          "Standard hot/cold kitchen mixers — pull-down spray, gooseneck, spring-loaded. WELS rated, ceramic-disc cartridges, AS/NZS-compliant. The tap when you're not adding filtration to it; pair with the Filter Taps range under Water Filters when you are.",
        decisionLine:
          "Replacing the kitchen tap — not adding filtration.",
      },
      {
        slug: "vanities-and-basins",
        name: "Vanities & Basins",
        heading: "Vanities & Basins",
        intro:
          "Freestanding vanities with stone and ceramic basin tops. Pre-drilled for standard tap configurations. Tap and drainage sold separately.",
        decisionLine:
          "Bathroom renovation — main vanity replacement.",
      },
      {
        slug: "showers-and-fixtures",
        name: "Showers & Fixtures",
        heading: "Showers & Wet-Area Fixtures",
        intro:
          "Tile-insert floor drains and shower components. AS/NZS compliant.",
        decisionLine:
          "Wet-area drainage upgrade.",
      },
      {
        slug: "bathroom-accessories",
        name: "Bathroom Accessories",
        heading: "Bathroom Accessories & Packages",
        intro:
          "Towel rings, robe hooks, soap holders and complete bathroom accessory packages. The fit-out details that finish a bathroom build.",
        decisionLine:
          "Bathroom build is at the accessories-and-finishings stage.",
      },
    ],
  },
];

/**
 * Lookup helpers. These are O(n) but n=3, so it's fine — the alternative
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
