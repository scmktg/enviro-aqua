import type { BlogPost } from "@/types/blog";

export const post: BlogPost = {
  slug: "when-to-replace-water-filter-cartridges",
  title:
    "When to Replace Your Water Filter Cartridges (And What Happens If You Don't)",
  description:
    "How long water filter cartridges actually last, why the manufacturer's interval is a starting point not an answer, and the warning signs that mean you've left it too long.",
  excerpt:
    "Cartridge intervals are not arbitrary. Run them past their lifespan and the carbon stops adsorbing — it starts releasing what it captured. Here's how to know when to change yours.",
  publishedAt: "2026-02-22",
  author: {
    name: "Liam Hartley",
    role: "Senior Water Treatment Specialist",
  },
  topic: "Maintenance",
  keywords: [
    "replace water filter cartridge",
    "water filter cartridge lifespan",
    "carbon block expiry",
    "RO membrane replacement",
  ],
  relatedCategories: [
    {
      label: "Replacement Cartridges",
      href: "/shop/water-filters/replacement-cartridges",
    },
    {
      label: "Whole House Water Filters",
      href: "/shop/water-filters/whole-house",
    },
    {
      label: "Reverse Osmosis Systems",
      href: "/shop/water-filters/reverse-osmosis",
    },
  ],
  relatedProducts: [
    "twin-pack-polypropylene-sediment-cartridges-20-x-4-5-whole-house-5-micron",
    "75-gpd-reverse-osmosis-membrane-replacement-twin-pack-280-l-day",
    "reverse-osmosis-ro-membrane-400-gpd-approx-1500-litres-per-day",
  ],
  body: [
    {
      type: "paragraph",
      text: "Filter cartridges have a finite life. Every cartridge specifies one — a litre count, a months-since-install figure, or both. Most filter owners ignore them. Sometimes that's fine for a month or two. Past a certain point, it becomes a real problem: a saturated carbon cartridge does not stop working in a graceful, gradually-less-effective way. It starts releasing the contaminants it has been adsorbing back into the water passing through. Sediment cartridges that are clogged starve the rest of the system of pressure, and biofilm grows on the upstream face of every cartridge that's left in service too long.",
    },
    {
      type: "paragraph",
      text: "This article is the practical version of cartridge maintenance for residential Australian filter systems. The real lifespan figures (not just the manufacturer's optimistic ones), the warning signs to look for, and what specifically goes wrong if you ignore the schedule.",
    },
    {
      type: "heading",
      level: 2,
      text: "How long each cartridge type actually lasts",
      id: "lifespan",
    },
    {
      type: "comparison",
      headers: ["Cartridge type", "Typical interval", "Limiting factor"],
      rows: [
        ["Sediment (polypropylene)", "6 months", "Clogging — pressure drop"],
        ["Carbon block", "12 months", "Carbon saturation"],
        ["Granular activated carbon (GAC)", "9 months", "Channelling + saturation"],
        ["RO membrane", "2–3 years", "Fouling + chlorine damage"],
        ["UV lamp (not a cartridge but same logic)", "12 months", "UV-C output decay"],
        ["Quartz sleeve (UV)", "5 years", "Scaling, mechanical damage"],
        ["Ultrafiltration (UF)", "12–24 months", "Fouling"],
        ["KDF (heavy metal)", "5 years", "Adsorption capacity"],
      ],
    },
    {
      type: "paragraph",
      text: "Two important notes on this table.",
    },
    {
      type: "paragraph",
      text: "First, these are usage-dependent. A bench-top filter at a holiday house running 100L/year will get longer cartridge life than one in a family home running 5,000L/year. The litre rating is the more accurate measure when you can track it; the time interval is what you fall back on when you can't.",
    },
    {
      type: "paragraph",
      text: "Second, water quality varies. Sediment cartridges in tank-fed homes saturate twice as fast as in town-water homes. Carbon cartridges in heavily chlorinated municipal supplies (Sydney's coastal east, parts of Melbourne) saturate faster than in less-chlorinated regional supplies. Replace based on the worst-case interval if you're unsure.",
    },
    {
      type: "heading",
      level: 2,
      text: "What goes wrong when you leave a cartridge too long",
      id: "what-goes-wrong",
    },
    {
      type: "heading",
      level: 3,
      text: "Sediment cartridge — clogging and pressure drop",
    },
    {
      type: "paragraph",
      text: "Sediment cartridges accumulate particulate over time. Pressure drop across the cartridge increases as it loads up. At first you don't notice; you'll spot it when shower flow gets weak, the dishwasher complains about low pressure, or the toilet cistern fills more slowly than it used to.",
    },
    {
      type: "paragraph",
      text: "Past a critical loading the cartridge can start shedding accumulated material — \"channelling\" — where water blasts through one section of the cartridge and pushes captured sediment downstream. You'll notice intermittent cloudy water at the tap. By that point you're three to six months past replacement.",
    },
    {
      type: "heading",
      level: 3,
      text: "Carbon block — saturation and breakthrough",
    },
    {
      type: "paragraph",
      text: 'Carbon block adsorbs contaminants onto the carbon\'s surface area until that surface area is occupied. Past saturation, two things happen. New incoming chlorine and organic compounds pass through the cartridge unfiltered ("breakthrough"). And in some cases, previously-adsorbed compounds desorb back into the water as new compounds compete for binding sites.',
    },
    {
      type: "paragraph",
      text: "Concretely: a saturated carbon block in a chlorinated municipal supply not only stops removing chlorine, it can briefly release a higher chlorine concentration than entered the unit. Customers describe the experience as the filter \"making the water taste worse\" — that's exactly what's happening.",
    },
    {
      type: "callout",
      tone: "warning",
      title: "Carbon doesn't fail safely",
      body: "If you're going to leave one cartridge type past its rated life, don't make it carbon. Saturation isn't a graceful decline — it's a step-change to worse-than-no-filter performance for several days as the cartridge desorbs.",
    },
    {
      type: "heading",
      level: 3,
      text: "RO membrane — fouling and chlorine damage",
    },
    {
      type: "paragraph",
      text: "RO membranes fail in two ways. Slow fouling — minerals, biofilm, and organics build up on the membrane surface, reducing flow rate and rejection percentage. You'll notice the storage tank takes longer to fill and the TDS reading on the permeate climbs from 10ppm to 50, then 100, then up to the same as the source water.",
    },
    {
      type: "paragraph",
      text: "Fast chlorine damage — RO membranes are made of polyamide, which chlorine attacks. Every RO system has a carbon pre-filter to protect the membrane from chlorine. If that pre-filter is past its replacement date and chlorine is breaking through, the membrane behind it can be permanently damaged in weeks. Replace the carbon pre-filter on time and the membrane will last 2–3 years; let the carbon go and the membrane is a 6-month consumable.",
    },
    {
      type: "heading",
      level: 3,
      text: "UV lamp — invisible degradation",
    },
    {
      type: "paragraph",
      text: 'UV-C lamps lose 30% of their output in the first year of operation, even though they continue to glow visibly. The "lamp on" indicator on most UV units only confirms that current is flowing, not that the disinfection dose is adequate. The lamp keeps glowing past the point where it\'s killing bacteria reliably. There are no visible cues. The lamp must be replaced on a calendar schedule.',
    },
    {
      type: "heading",
      level: 2,
      text: "Warning signs you've left it too long",
      id: "warning-signs",
    },
    {
      type: "paragraph",
      text: "If you're already noticing any of these, your filter is overdue:",
    },
    {
      type: "list",
      items: [
        "**Slower flow at every tap** (whole-house) or weak flow at the filtered tap (under-sink, RO). Sediment cartridge clogged.",
        "**Chlorine taste returning** to filtered water. Carbon saturated.",
        "**Filtered water tastes worse than mains** for a few days after cartridges sit unused. Carbon desorbing.",
        "**TDS rising on RO permeate**. Membrane fouling, or pre-filter failure letting chlorine through.",
        "**Cloudy or off-coloured water** intermittently. Channelling — sediment cartridge past saturation.",
        "**Strange smell from the under-sink unit** when you run it after a few days away. Biofilm growth on a saturated cartridge.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "How to make replacement happen",
      id: "make-it-happen",
    },
    {
      type: "paragraph",
      text: "The honest reason most people miss their cartridge replacement isn't laziness — it's that they don't think about it for 11 of every 12 months. The mental load fades, then the calendar event sneaks up.",
    },
    {
      type: "paragraph",
      text: "Three approaches that work:",
    },
    {
      type: "list",
      items: [
        "**Calendar reminder, set at install.** Pick a memorable date (the start of school, your birthday, end-of-financial-year) and set a recurring annual reminder for that date. Pair it with all your other annual maintenance.",
        "**Subscribe to scheduled cartridge delivery.** Several Australian retailers (including us) offer auto-shipped cartridge kits at the right interval. Cartridges arrive on the right month; you just have to swap them in.",
        "**Pre-buy cartridges at install.** Buy the next 12 months' worth of cartridges when you buy the system. They sit in the cupboard. You change them when you remember to. The barrier ('I haven't ordered any yet') is removed.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "Free reminder: subscribe to our cartridge replacement emails",
      body: "We send a single email two weeks before your cartridges are due to change — based on which system you bought. No newsletter, no offers, no chasing. Sign up at the bottom of any product page.",
    },
    {
      type: "heading",
      level: 2,
      text: "What you actually need to keep on hand",
      id: "stock-list",
    },
    {
      type: "paragraph",
      text: "For a typical Australian whole-house + under-sink + RO setup, the home stock list is:",
    },
    {
      type: "list",
      items: [
        "1 sediment cartridge (whole-house) — for the 6-month change.",
        "1 carbon block + 1 GAC (whole-house) — for the 12-month change.",
        "1 sediment + 1 carbon (under-sink) — for the annual under-sink change.",
        "1 spare carbon pre-filter (RO) — to protect the membrane.",
        "Spare housing wrench — the cheap step that prevents \"can't find the wrench when I need it\" excuses.",
      ],
    },
    {
      type: "paragraph",
      text: "RO membranes you can order on demand at the 2-3 year mark — they don't need to sit in your cupboard. Same for UV lamps — order one when the calendar fires, change it within a week.",
    },
    {
      type: "product-link",
      heading: "Common replacement parts",
      blurb:
        "Standard cartridges and membranes for Australian filter systems.",
      productSlugs: [
        "twin-pack-polypropylene-sediment-cartridges-20-x-4-5-whole-house-5-micron",
        "75-gpd-reverse-osmosis-membrane-replacement-twin-pack-280-l-day",
        "reverse-osmosis-ro-membrane-400-gpd-approx-1500-litres-per-day",
      ],
    },
  ],
};
