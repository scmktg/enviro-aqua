import type { BlogPost } from "@/types/blog";

export const post: BlogPost = {
  slug: "whole-house-water-filter-australia-buyers-guide",
  title:
    "How to Choose a Whole House Water Filter for Australian Homes",
  description:
    "Everything you need to know before buying a whole house water filter in Australia: town vs tank water, Big Blue vs slim-line housings, how many stages you actually need, and where they save money in the long run.",
  excerpt:
    "Whole house water filters treat every tap, shower and appliance — but the right system depends on whether you're on town water, tank, or bore. This is the guide we'd give a customer at the counter.",
  publishedAt: "2026-04-15",
  author: {
    name: "Liam Hartley",
    role: "Senior Water Treatment Specialist",
  },
  topic: "Whole House",
  keywords: [
    "whole house water filter Australia",
    "Big Blue water filter",
    "point of entry water filter",
    "20 inch water filter housing",
  ],
  relatedCategories: [
    {
      label: "Whole House Water Filters",
      href: "/shop/water-filters/whole-house",
    },
    {
      label: "Replacement Cartridges",
      href: "/shop/water-filters/replacement-cartridges",
    },
    { label: "UV Sterilisers", href: "/shop/water-filters/uv-sterilisation" },
  ],
  relatedProducts: [
    "triple-big-blue-whole-house-water-filter-20-x-4-5-3-stage",
    "twin-big-blue-whole-house-water-filter-20-x-4-5-2-cartridge-set-bracket",
    "deluxe-stainless-steel-lockable-whole-house-water-filter-3-stage-big-blue",
  ],
  body: [
    {
      type: "paragraph",
      text: "A whole house water filter — sometimes called a point-of-entry or POE filter — sits where the mains line enters your property and treats every drop of water that goes anywhere afterwards. Drinking taps, showers, washing machines, dishwashers, garden taps, hot water systems. One filter, one install, every fixture downstream gets cleaner water.",
    },
    {
      type: "paragraph",
      text: "Whether one is right for your home depends on three things: what's in your water, what you want to spend, and how easy your property is to plumb. This guide walks through each of those — at the level of detail we'd give a customer who calls the shop.",
    },
    {
      type: "heading",
      level: 2,
      text: "What a whole house filter actually does",
      id: "what-it-does",
    },
    {
      type: "paragraph",
      text: "A typical whole house filter is a sediment cartridge followed by one or more carbon stages, sized for the flow rate of an average Australian home (around 60–80 litres per minute peak). The sediment cartridge catches grit, rust and silt — the brown-tinted water that follows mains works, the fine particulate that builds up in tank-fed homes, and the iron staining that's common in bore supplies. The carbon stage adsorbs chlorine, taste-and-odour compounds, volatile organics, and traces of pesticide and herbicide that survive municipal treatment.",
    },
    {
      type: "paragraph",
      text: "What it doesn't do: it's not reverse osmosis. Whole house filters reduce dissolved minerals, fluoride, and PFAS by a few percent at best. If those are concerns for you, you want an RO unit at the kitchen for drinking water, with the whole house filter handling everything else.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Plain-English summary",
      body: "Whole house filters are great for chlorine taste, sediment, and protecting appliances and hot water systems from scale and debris. They are not a substitute for reverse osmosis if your concern is fluoride, lead, or dissolved solids in drinking water.",
    },
    {
      type: "heading",
      level: 2,
      text: "Town water, tank water, or bore?",
      id: "your-water-source",
    },
    {
      type: "paragraph",
      text: "The single biggest decision is what supply you're treating, because each one calls for a different stage configuration.",
    },
    {
      type: "heading",
      level: 3,
      text: "Town water (chlorinated)",
    },
    {
      type: "paragraph",
      text: "Sydney Water, Melbourne Water, SA Water and the rest all chlorinate (or chloraminate) their supply. The chlorine has done its job by the time the water reaches your meter — once it's inside your pipes, you generally want it gone. A two-stage whole house filter (sediment + carbon block) handles this, and a three-stage adds a second carbon for taste-and-odour finishing or a heavier sediment pre-filter if you're at the end of a long main where build-up accumulates.",
    },
    {
      type: "heading",
      level: 3,
      text: "Tank water",
    },
    {
      type: "paragraph",
      text: "Rainwater off a roof is not chlorinated. That's a feature for taste, but it means microbial risk: bird droppings, possum traffic, leaf debris, and warm summer tank temperatures all support bacterial growth. A sediment + carbon stack will not address bacteria. You need UV sterilisation downstream of the filtration. UV is the standard for tank-fed homes in Australia and a hard requirement under most council water management plans where tanks are used as a primary supply.",
    },
    {
      type: "heading",
      level: 3,
      text: "Bore water",
    },
    {
      type: "paragraph",
      text: "Bore is the trickiest. You can have iron, manganese, hardness, and bacterial issues all at once. The right answer is a water test before you buy anything — most councils run testing for under $80, or a private lab will give you a full panel for $150–$250. With the report in hand, you build the system around it: usually a heavy-duty sediment, a manganese-greensand or iron-removal media stage, a carbon block, and UV at the end.",
    },
    {
      type: "callout",
      tone: "warning",
      title: "Don't guess on bore water",
      body: "We won't sell a bore water customer a system without a water analysis. The wrong stage configuration won't just be ineffective — it can blind a UV unit (sediment plates the lamp sleeve) or chew through cartridges in weeks instead of months. Test first, spec second.",
    },
    {
      type: "heading",
      level: 2,
      text: "Big Blue, slim-line, or stainless?",
      id: "housing-formats",
    },
    {
      type: "paragraph",
      text: "Whole house filter housings come in three real-world formats in Australia.",
    },
    {
      type: "heading",
      level: 3,
      text: 'Big Blue 20" × 4.5" — the standard',
    },
    {
      type: "paragraph",
      text: "20-inch tall, 4.5-inch diameter housings are the workhorse. They take large cartridges that hold more media (more chlorine, more sediment, more lifespan) and the higher cross-sectional area means lower pressure drop at peak household flow. If your incoming pressure is in the normal 350–500 kPa band and your home has more than one bathroom, this is the size to default to. Cartridges are available everywhere — not just from us, from any plumbing merchant in the country.",
    },
    {
      type: "heading",
      level: 3,
      text: 'Slim-line 10" × 2.5"',
    },
    {
      type: "paragraph",
      text: "Half the size, a quarter of the cartridge volume. These are fine for one-bathroom apartments, granny flats, or as a polishing stage downstream of something larger. They're not appropriate as a primary whole-house filter for a 4-bedroom house — the cartridges run out faster and the pressure drop is noticeable on shower flow.",
    },
    {
      type: "heading",
      level: 3,
      text: "Stainless steel housings",
    },
    {
      type: "paragraph",
      text: "Same internal sizing as Big Blue but in 304 stainless steel. The benefit is UV stability (clear plastic housings degrade if exposed to direct sun in an outdoor install) and a much longer service life. The trade-off is roughly double the cost. For an outdoor install on the side of the house, stainless is worth it. For an indoor install in a cupboard or under the eaves, plastic Big Blue is fine.",
    },
    {
      type: "heading",
      level: 2,
      text: "How many stages do you actually need?",
      id: "stages",
    },
    {
      type: "paragraph",
      text: "Manufacturers will sell you anywhere from one to seven stages. The honest answer for most Australian homes:",
    },
    {
      type: "list",
      items: [
        "**1 stage** — sediment only. Fine for protecting an existing RO or under-sink filter from grit. Not enough on its own for whole-house treatment.",
        "**2 stages** — sediment + carbon block. The minimum useful whole-house spec. Handles chlorinated town water for most homes.",
        "**3 stages** — sediment + GAC (granular activated carbon) + carbon block. The sweet spot. The two carbon types target different contaminant profiles and the staged approach extends overall cartridge life. This is what we install in around 70% of new whole-house jobs.",
        "**4+ stages** — only if you have a specific reason. Iron-removal media, KDF for heavy metals, or a polishing stage after RO. More stages aren't automatically better — each one adds pressure drop and cartridge cost.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Pressure drop and flow rate — the bit installers care about",
      id: "pressure-and-flow",
    },
    {
      type: "paragraph",
      text: "Every cartridge in the line drops your house pressure a little. Stack three of them in series and at peak flow (two showers and a washing machine running together) the pressure drop can become noticeable. The way to manage it:",
    },
    {
      type: "list",
      items: [
        "**Use Big Blue, not slim-line** — bigger cross-section, less drop.",
        "**Don't run 1-micron cartridges as your primary sediment** — start at 5 or 20 micron, polish later if needed.",
        "**Replace cartridges on time** — a clogged sediment cartridge is the #1 cause of whole-house pressure complaints. Six months is a reasonable interval; 12 months max.",
        "**Check your incoming pressure** before installing. If you're already on 250 kPa or less, a triple-stage filter may push you below useful shower pressure. A pressure pump downstream of the filter solves it.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Install considerations",
      id: "install",
    },
    {
      type: "paragraph",
      text: "Whole house filters need to go on a plumbed line, post-meter, before any branching to fixtures. The right place is usually the wet-wall or the meter cupboard. They need bypass valves either side (so cartridges can be changed without shutting off the house), a pressure gauge upstream, and ideally a drain underneath in case of a housing failure or messy cartridge change.",
    },
    {
      type: "paragraph",
      text: "The whole job, including bracket-mounting and bypass plumbing, is usually a 2–3 hour install for a licensed plumber. Don't DIY it unless you genuinely know what you're doing — a failed o-ring at mains pressure floods quickly.",
    },
    {
      type: "heading",
      level: 2,
      text: "Cost over five years",
      id: "cost",
    },
    {
      type: "paragraph",
      text: "Buying the system is the cheap bit. The real cost is replacement cartridges over the system's life. A rough five-year total cost of ownership for a Big Blue triple-stage in a 4-person household, on town water:",
    },
    {
      type: "comparison",
      headers: ["Item", "Frequency", "5-year total"],
      rows: [
        ["Initial system + install", "Once", "$1,500–$2,200"],
        ["Sediment cartridge replacements", "Every 6 months", "$240–$400"],
        ["Carbon block / GAC replacements", "Every 12 months", "$280–$480"],
        ["Total over 5 years", "—", "$2,020–$3,080"],
      ],
    },
    {
      type: "paragraph",
      text: "Compared to bottled water for a 4-person household (around $25/week, or $6,500 over five years), a whole-house filter that also gives you bottled-quality drinking water is a clear cost saving — especially if it's reducing wear on a $2,000 hot water system at the same time.",
    },
    {
      type: "heading",
      level: 2,
      text: "What to do next",
      id: "next-steps",
    },
    {
      type: "paragraph",
      text: "If you're on town water, in a typical 3–4 bedroom Australian home, a Big Blue triple-stage is the answer most of the time. If you're on tank water, add UV. If you're on bore, get a water test before anything else.",
    },
    {
      type: "paragraph",
      text: "If you're not sure where you fit — call us, or use the filter finder. We've spent enough time at the counter to spec the right system in two minutes once we know your supply, your home size, and your incoming pressure.",
    },
    {
      type: "product-link",
      heading: "Whole house systems we ship most often",
      blurb: "Hand-picked across the three common Australian setups.",
      productSlugs: [
        "triple-big-blue-whole-house-water-filter-20-x-4-5-3-stage",
        "twin-big-blue-whole-house-water-filter-20-x-4-5-2-cartridge-set-bracket",
        "deluxe-stainless-steel-lockable-whole-house-water-filter-3-stage-big-blue",
      ],
    },
  ],
};
