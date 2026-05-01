import type { BlogPost } from "@/types/blog";

export const post: BlogPost = {
  slug: "reverse-osmosis-vs-carbon-block-fluoride-removal",
  title:
    "Reverse Osmosis vs Carbon Block: Which Water Filter Actually Removes Fluoride?",
  description:
    "If fluoride or PFAS in your drinking water is the reason you're shopping for a filter, the technology you choose matters more than anything else. Here's what each filter type actually does — and where carbon block falls short.",
  excerpt:
    "Carbon block is in 80% of household water filters. Reverse osmosis is in maybe 10%. For chlorine and taste, that's the right ratio. For fluoride, PFAS, and dissolved solids, it's the opposite of what most people need.",
  publishedAt: "2026-04-08",
  author: {
    name: "Liam Hartley",
    role: "Senior Water Treatment Specialist",
  },
  topic: "Reverse Osmosis",
  keywords: [
    "reverse osmosis vs carbon filter",
    "does carbon filter remove fluoride",
    "fluoride water filter Australia",
    "PFAS water filter",
  ],
  relatedCategories: [
    {
      label: "Reverse Osmosis Systems",
      href: "/shop/water-filters/reverse-osmosis",
    },
    {
      label: "Under Sink Water Filters",
      href: "/shop/water-filters/under-sink",
    },
    {
      label: "Replacement Cartridges",
      href: "/shop/water-filters/replacement-cartridges",
    },
  ],
  relatedProducts: [
    "5-stage-reverse-osmosis-under-sink-system-with-3-way-tap",
    "under-sink-reverse-osmosis-system-5-stage",
    "under-sink-reverse-osmosis-system-4-stage",
  ],
  body: [
    {
      type: "paragraph",
      text: "Roughly half the customers who call us asking about water filters mention fluoride in the first thirty seconds. The next most common concerns are PFAS (the so-called \"forever chemicals\") and TDS — total dissolved solids — which is the number that comes off a hand-held water tester sold on Amazon for $20. All three of these contaminants share something important: they're not particles, they're not chlorine, and they're not what carbon-block filters are designed to address.",
    },
    {
      type: "paragraph",
      text: "Most water filters on the Australian market are built around carbon-block technology. They're cheap, they're effective at what they do, and a marketing team can list a hundred contaminants on the packaging without lying. The catch is in what carbon block doesn't reliably reduce — and that's the part this article covers.",
    },
    {
      type: "heading",
      level: 2,
      text: "How carbon block actually works",
      id: "carbon-block-explained",
    },
    {
      type: "paragraph",
      text: "A carbon block cartridge is compressed activated carbon — usually coconut-shell or bituminous coal — packed into a solid cylinder with a defined micron rating (typically 0.5 to 5 microns). Water is forced through the porous structure under mains pressure. Carbon's job is adsorption: contaminants stick to the enormous internal surface area of the carbon particles, while water molecules slip through.",
    },
    {
      type: "paragraph",
      text: "What carbon block is genuinely good at: chlorine, chloramine (with the right grade of carbon), volatile organic compounds, taste-and-odour compounds, some pesticides and herbicides, and trihalomethanes. The 0.5-micron physical filtration also catches Giardia and Cryptosporidium cysts. For most Australian town-water customers asking \"can I drink straight from the tap and stop worrying about chlorine\", a good carbon block answers \"yes\".",
    },
    {
      type: "paragraph",
      text: "What carbon block is not designed to do: reject ions in solution. Fluoride, dissolved sodium, calcium, magnesium, sulphate, nitrate, dissolved heavy metals, and PFAS all pass through carbon block with at most modest reduction. There's a small physisorption effect on some of these, but you cannot rely on a carbon-block filter to make a meaningful dent in any of them.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Why carbon block isn't the right tool for fluoride",
      body: "Fluoride is added to municipal water as fluoride ions, which are smaller than water molecules and chemically dissimilar to the organic compounds carbon adsorbs. Pushing fluoridated water through a carbon block does not separate the ions out — they continue downstream with the water.",
    },
    {
      type: "heading",
      level: 2,
      text: "How reverse osmosis works",
      id: "ro-explained",
    },
    {
      type: "paragraph",
      text: "Reverse osmosis runs water at pressure across a semi-permeable membrane. The membrane has pores at the molecular scale — around 0.0001 microns, roughly a thousand times finer than carbon block. Water molecules pass through; almost everything else, including ions in solution, is rejected and flushed to drain.",
    },
    {
      type: "paragraph",
      text: "A typical residential RO system rejects around 95–99% of total dissolved solids, including fluoride, lead, arsenic, chromium, nitrate, and the long-chain PFAS compounds (PFOA, PFOS, GenX). It also rejects chlorine and most everything carbon block handles, though in practice every RO system has a carbon pre-filter to protect the membrane from chlorine attack.",
    },
    {
      type: "paragraph",
      text: "The trade-offs are real. RO systems waste water — typically 3–4 litres to drain for every 1 litre of permeate, though modern membranes have improved this ratio to closer to 1:1 with the right pressure. They run more slowly than a direct-flow filter, which is why almost every residential RO unit uses a small storage tank. They strip beneficial minerals along with the harmful contaminants, which is why many systems include a remineralisation post-filter. And the membranes themselves cost more to replace than carbon cartridges — a 75-GPD residential membrane is around $80–$120 and lasts 2–3 years.",
    },
    {
      type: "heading",
      level: 2,
      text: "Side-by-side: what each technology reduces",
      id: "comparison",
    },
    {
      type: "comparison",
      headers: ["Contaminant", "Carbon Block", "Reverse Osmosis"],
      rows: [
        ["Chlorine / chloramine", "Excellent", "Excellent (via pre-filter)"],
        ["Sediment & particulate", "Good", "Excellent (via pre-filter)"],
        ["Taste, odour, organics", "Excellent", "Excellent"],
        ["Fluoride", "Negligible", "95%+ reduction"],
        ["Lead (dissolved)", "Some — depends on grade", "97%+ reduction"],
        ["PFAS / PFOA / PFOS", "Variable, unreliable", "95–99% reduction"],
        ["Nitrate", "Negligible", "85–92% reduction"],
        ["Arsenic", "Negligible", "94%+ reduction"],
        ["Total Dissolved Solids", "Negligible", "95–99% reduction"],
        ["Bacteria / viruses", "Cysts only (0.5µ)", "All (membrane physical)"],
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "When to choose which",
      id: "decision",
    },
    {
      type: "paragraph",
      text: "The decision is mostly about what's actually in your water, not about brand preference.",
    },
    {
      type: "heading",
      level: 3,
      text: "Choose carbon block (under-sink or whole-house) if…",
    },
    {
      type: "list",
      items: [
        "You're on chlorinated town water in a major metro area.",
        "Your only complaints are taste, odour, and the occasional brown-tinted water.",
        "You don't have specific concerns about fluoride, PFAS, or dissolved solids.",
        "You want lower upfront cost, simpler install, and the cheapest cartridge replacements.",
      ],
    },
    {
      type: "heading",
      level: 3,
      text: "Choose reverse osmosis if…",
    },
    {
      type: "list",
      items: [
        "Fluoride is the reason you're shopping for a filter.",
        "You live near a known PFAS contamination site (firefighting training grounds, some military bases, certain industrial corridors).",
        "Your TDS reading is above 500 ppm, especially if it's making coffee taste flat or scaling appliances.",
        "You're on bore water or brackish supply.",
        "You want bottled-water-quality output for drinking and cooking, and you're prepared to pay 3–5× more upfront and replace a membrane every couple of years.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "The combo most people actually want",
      body: "If your concerns are mixed — chlorine taste at every tap AND fluoride-free drinking water — the sensible build is a whole-house carbon-block filter for the property plus an under-sink RO at the kitchen for drinking and cooking. The whole-house unit handles bulk filtration; the RO handles the high-grade reduction at the only point you actually need it.",
    },
    {
      type: "heading",
      level: 2,
      text: "What about ultrafiltration, KDF, ceramic and the rest?",
      id: "other-tech",
    },
    {
      type: "paragraph",
      text: "There are a few other technologies worth a quick mention. Ultrafiltration (UF) membranes work like a coarser RO — they reject bacteria, viruses, and large organics but pass dissolved ions through. UF is useful as a polishing stage downstream of carbon, but it doesn't address fluoride either. KDF (a copper-zinc alloy) targets some heavy metals and chlorine, and is sometimes used as a stage in multi-cartridge systems. Ceramic filters are excellent for microbiological reduction but, again, don't touch dissolved ions. None of these are RO substitutes for fluoride, PFAS, or TDS.",
    },
    {
      type: "heading",
      level: 2,
      text: "How to test your water before you buy",
      id: "testing",
    },
    {
      type: "paragraph",
      text: "Before spending $400–$800 on an RO system, it's worth getting an actual reading on what's in your water. The cheap option: a hand-held TDS meter ($25 on Amazon) tells you total dissolved solids in seconds. It won't tell you what those solids are, but if you're below 200 ppm and you're on town water, fluoride is essentially the only major contaminant worth worrying about — and it's reduced effectively only by RO. The thorough option: a private water analysis from a NATA-accredited lab covers fluoride, heavy metals, hardness, microbiological, and a panel of organic compounds. Around $150–$250 and turnaround is usually a week.",
    },
    {
      type: "paragraph",
      text: "If you'd rather skip the test and start with the system most Australian RO customers buy: a 5-stage under-sink RO with a dedicated drinking-water tap is the standard. Sediment pre-filter, two carbon stages, the membrane itself, and a post-filter for polishing. Sized for a 4-person household, with a 3.2 gallon tank and around 75 gallons-per-day of permeate.",
    },
    {
      type: "product-link",
      heading: "RO systems we ship for residential drinking water",
      blurb:
        "Five-stage under-sink units are the standard. Tap and remineralisation options vary.",
      productSlugs: [
        "5-stage-reverse-osmosis-under-sink-system-with-3-way-tap",
        "under-sink-reverse-osmosis-system-5-stage",
        "under-sink-reverse-osmosis-system-4-stage",
      ],
    },
  ],
};
