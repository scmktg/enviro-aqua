import type { Category } from "@/types/category";

/**
 * Category structure. Each category page is also a landing page — the `intro`
 * is the SEO body copy, and each subCategory has its own `decisionLine` that
 * powers the "which one do I need?" matrix at the top of the PLP.
 *
 * Five top-level categories. The primary specialty is water-filters; the rest
 * exist because customers building water-filter installs asked us to source
 * the supporting equipment (pumps, dosing tanks, bathroom suites).
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
      "Australian-stocked water filtration for town water, tank water and bore supplies. Whole-house Big Blue systems for the property, under-sink and bench-top units for drinking water, reverse osmosis for the highest reduction of fluoride, PFAS and dissolved solids — plus every cartridge size in standard 10\" and 20\" formats. Same price retail or trade. Shipped Australia-wide from our Wyong NSW Central Coast warehouse, with free Click & Collect for local customers. Certifications vary by product — each product page lists what that specific system carries.",
    navCta: {
      eyebrow: "Not sure which filter?",
      title: "Use the 30-second filter finder",
      body: "Three questions. Tells you exactly what fits your home, water source and budget.",
      href: "/help/which-filter",
    },
    subCategories: [
      {
        slug: "whole-house-filters",
        name: "Whole House",
        heading: "Whole House Water Filters",
        intro:
          "Point-of-entry filtration for the whole property — every tap, shower and appliance gets filtered water. The right choice for chlorine, sediment, taste and protecting hot-water systems and washing machines. Standard Big Blue 10\" and 20\" sizing means cartridges are available everywhere in Australia.",
        decisionLine:
          "You own the home and want every tap filtered, including showers and laundry.",
      },
      {
        slug: "under-sink-ro-systems",
        name: "Under Sink & RO",
        heading: "Under Sink & Reverse Osmosis Systems",
        intro:
          "Hidden under-the-bench filtration with a dedicated drinking-water tap, and reverse osmosis when you want fluoride, PFAS and TDS reduced by up to 99%. Two-stage and three-stage carbon systems for taste and chlorine; four- and five-stage RO for the highest reduction; bench-top units for renters who can't drill into a cabinet.",
        decisionLine:
          "You want filtered drinking water from a dedicated tap — under the sink if you can, on the bench if you rent.",
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
          "Genuine replacement cartridges for every Enviro Aqua system — and for any standard 10\" or 20\" Australian housing. Sediment, carbon block, granular activated carbon, RO membranes, ultrafiltration. Annual kits available.",
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
        slug: "filter-fittings",
        name: "Filter Fittings",
        heading: "Fittings, Tubing & Accessories",
        intro:
          "Push-fit fittings, tubing, pressure gauges, diverter valves and tap connectors for water filter installations. Standard 1/4\" (6mm) and 3/8\" sizing. Australian mains-pressure rated.",
        decisionLine:
          "You're servicing or building out a system — the small parts that hold it together.",
      },
    ],
  },
  {
    slug: "drinking-bubblers",
    name: "Drinking Bubblers",
    navLabel: "Drinking Bubblers",
    heading: "Drinking Bubblers, Coolers & Fountains",
    subhead:
      "WaterMark-certified filtered bubblers for schools, gyms, offices and public spaces. 304 stainless steel. Same-day dispatch from Wyong NSW.",
    intro:
      "Commercial drinking water for high-traffic environments — schools, gyms, offices, body corporates, sports clubs and councils. Filtered drinking bubblers (WaterMark certified to AS/NZS 3497), direct-connect water coolers, and replacement parts. 304 stainless steel construction throughout. Pricing is the same for trade, fit-out and direct purchase. Multi-site quotes available.",
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
          "WaterMark-certified filtered drinking bubblers for direct-connect installation. 304 stainless steel construction, vandal-resistant, built for schools, gyms and public sites. Includes pre-filter and main carbon-block filter. Annual service kits available.",
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
    slug: "water-pumps",
    name: "Water Pumps",
    navLabel: "Water Pumps",
    heading: "Water Pumps & Pressure Equipment",
    subhead:
      "Booster pumps for RO systems, 12V pumps for caravans and off-grid, pressure tanks for whole-house installs.",
    intro:
      "The pumps and pressure vessels that make filtration work where mains pressure can't — booster pumps for under-sink RO systems on long supply runs, 12V diaphragm pumps for caravans and off-grid water cabinets, and pre-charged pressure tanks that maintain delivery pressure across whole-house installs. We stock these because every second whole-house install needs one of them; sourcing them separately from the filter is a wasted week.",
    navCta: {
      eyebrow: "Building an RO system?",
      title: "Talk through the pump sizing",
      body: "Inlet pressure, draw rate, tank size — call us before you order.",
      href: "/contact",
    },
    subCategories: [
      {
        slug: "12v-caravan-pumps",
        name: "12V Caravan Pumps",
        heading: "12V Caravan & Off-Grid Pumps",
        intro:
          "12V diaphragm pumps for caravans, motorhomes, off-grid cabins and trailer-mounted water cabinets. Self-priming, run-dry-safe, pressure-switched for on-demand delivery. Standard 1/2\" inlet/outlet — fits any RV plumbing.",
        decisionLine:
          "Caravan, off-grid build, or any 12V water system that needs pressure on demand.",
      },
      {
        slug: "booster-pumps",
        name: "Booster Pumps",
        heading: "RO & Whole-House Booster Pumps",
        intro:
          "Booster pumps that lift inlet pressure into the 60–80 PSI range that RO membranes need to work efficiently. Mains-powered units for under-sink RO systems on long supply runs, properties on tank water, or anywhere afternoon pressure drop kills RO output.",
        decisionLine:
          "Your RO system isn't producing the rated litres per day — almost always a pressure problem.",
      },
      {
        slug: "pressure-tanks",
        name: "Pressure Tanks",
        heading: "Pressure Tanks & RO Storage",
        intro:
          "Pre-charged bladder tanks for RO systems and whole-house pressure equalisation. Maintains delivery pressure between pump cycles and stores filtered RO water for instant draw at the tap. Sized from 12 L (RO storage) to 80 L+ (whole-house buffer).",
        decisionLine:
          "Your RO system or whole-house pump needs a buffer to deliver flow on demand.",
      },
    ],
  },
  {
    slug: "chemical-dosing-tanks",
    name: "Chemical Dosing Tanks",
    navLabel: "Dosing Tanks",
    heading: "Bunded Chemical Dosing Tanks",
    subhead:
      "Bunded chemical storage built to Australian dangerous-goods standards — pool dosing, alkalinity correction, water-treatment plants.",
    intro:
      "Bunded polyethylene tanks for the safe storage and dosing of pool chemicals, alkalinity-correction agents and water-treatment chemicals. Built to Australian dangerous-goods storage requirements with integral 110% bund volume to contain spills. Sized for treatment-plant rooms, council pools, body-corporate pump rooms and commercial water-treatment installations. We've supplied these into water-treatment fit-outs across NSW since 2019 — call to spec the right tank for your dosing rate and chemical compatibility.",
    navCta: {
      eyebrow: "Specifying a treatment plant?",
      title: "Talk to us about dosing capacity",
      body: "Chemical compatibility, dosing rate, bund sizing — get it right the first time.",
      href: "/contact",
    },
    subCategories: [],
  },
  {
    slug: "bathroom",
    name: "Bathroom",
    navLabel: "Bathroom",
    heading: "Bathroom — Fit-Out Range",
    subhead:
      "A focused range of WELS-rated bathroom essentials — for projects already buying water filtration from us.",
    intro:
      "Enviro Aqua's bathroom range exists for one reason: customers building bathrooms alongside whole-house filter installs asked us to source the rest of the suite. Toilets, vanities, mixer taps, kitchen mixers and floor drains — all WELS-rated and WaterMark compliant where required, all available at the same price retail or trade. We don't pretend to be a full bathroom retailer; for that you want a specialist. We do make sure the bathroom side of your fit-out doesn't slow down the filter delivery.",
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
          "Standard hot/cold kitchen mixers — pull-down spray, gooseneck, spring-loaded. WELS rated, ceramic-disc cartridges, AS/NZS-compliant. The tap when you're not adding filtration to it; pair our filter-taps range under Water Filters when you are.",
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
 * Lookup helpers. These are O(n) but n=5, so it's fine — the alternative
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
