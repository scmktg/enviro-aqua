import type { BlogPost } from "@/types/blog";

export const post: BlogPost = {
  slug: "tank-water-filter-uv-sterilisation-australia",
  title: "Filtering Tank Water: Why UV Sterilisation Isn't Optional",
  description:
    "If you're on rainwater tank supply in Australia, sediment and carbon filters alone aren't enough. Here's why UV sterilisation matters, what it actually kills, and how to size a system for tank-fed properties.",
  excerpt:
    "Rainwater tastes great because it isn't chlorinated. That's the problem. Without something downstream to handle bacteria, you're drinking water that's only as clean as the last possum that walked across your roof.",
  publishedAt: "2026-03-28",
  author: {
    name: "Liam Hartley",
    role: "Senior Water Treatment Specialist",
  },
  topic: "Tank & Bore",
  keywords: [
    "tank water filter Australia",
    "UV water steriliser",
    "rainwater filter",
    "bore water UV",
  ],
  relatedCategories: [
    {
      label: "UV Sterilisers",
      href: "/shop/water-filters/uv-sterilisation",
    },
    {
      label: "Whole House Water Filters",
      href: "/shop/water-filters/whole-house",
    },
    {
      label: "Replacement Cartridges",
      href: "/shop/water-filters/replacement-cartridges",
    },
  ],
  relatedProducts: [
    "whole-house-water-filter-uv-steriliser-system-3-stage",
    "uv-water-steriliser-25w-220-240v-1500-lph",
    "triple-big-blue-whole-house-water-filter-20-x-4-5-3-stage",
  ],
  body: [
    {
      type: "paragraph",
      text: "Roughly 26% of Australian households use a rainwater tank as either their primary or supplementary water source. In rural and outer-suburban areas the figure climbs above 80%. The water is generally cleaner than what you'd assume — modern roof catchment with first-flush diverters and screened gutter inlets keeps most of the gross debris out — but \"generally cleaner than urban municipal water\" and \"safe to drink unfiltered\" are not the same statement.",
    },
    {
      type: "paragraph",
      text: "Tank water is unchlorinated. That's the appeal: no metallic chemical taste, no smell, lighter on the palate. It's also the problem. Without disinfection, anything that finds its way into the tank — leaves, dust, bird droppings, dead insects, the occasional amphibian — has the opportunity to support bacterial and protozoan growth. Australian summer tank temperatures (often 20–28°C in the upper layer) are essentially ideal for that growth. Routine surveillance studies in NSW and QLD have found Legionella, Aeromonas, and E. coli in roughly 30–60% of household rainwater tanks, depending on the region and the catchment design.",
    },
    {
      type: "paragraph",
      text: "Filtration alone — sediment plus carbon — does not address this risk. Carbon doesn't kill bacteria; it sometimes feeds them. To deal with biological contamination, you need a disinfection step. For residential tank water in Australia, that step is almost always UV sterilisation.",
    },
    {
      type: "heading",
      level: 2,
      text: "How UV sterilisation works",
      id: "uv-explained",
    },
    {
      type: "paragraph",
      text: "A UV steriliser is a sealed stainless-steel chamber containing a UV-C lamp inside a quartz sleeve. Water flows around the sleeve and is exposed to UV-C radiation at a wavelength of 254 nanometres. That specific wavelength damages the DNA of bacteria, viruses and protozoan cysts in a way they cannot repair, rendering them unable to reproduce. They might still be in the water — they're just inert. They can no longer infect.",
    },
    {
      type: "paragraph",
      text: "What makes UV-C work as a disinfection method, rather than a filter:",
    },
    {
      type: "list",
      items: [
        "**Speed** — exposure time of less than a second is enough at correct dose levels.",
        "**No chemicals** — nothing added to the water, nothing left behind.",
        "**No taste impact** — water comes out tasting exactly the same as it went in.",
        "**Broad spectrum** — kills bacteria, viruses, and protozoa (Giardia, Cryptosporidium) where chlorine struggles with the latter.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Why UV needs filtration upstream",
      id: "pre-filtration",
    },
    {
      type: "paragraph",
      text: "UV is a finishing step, not a stand-alone solution. The lamp's effectiveness depends on water clarity. If sediment, tannins, or biofilm are in the water flowing past the quartz sleeve, two bad things happen.",
    },
    {
      type: "paragraph",
      text: "First, suspended particles cast a shadow over the lamp. Bacteria hiding behind a grain of sediment receive a fraction of the UV dose the design assumes, and survive. Second, mineral and organic deposits build up on the quartz sleeve itself, gradually blocking the UV from reaching the water at all. A neglected steriliser on dirty water can lose 80% of its disinfection capacity within months while the green \"on\" indicator continues to glow.",
    },
    {
      type: "callout",
      tone: "warning",
      title: "UV without sediment filtration is theatre",
      body: "An installed UV unit on cloudy tank water may still pass certification on day one, but inside three months the sleeve is fouled and the dose to the water is a fraction of what's required. Always install a sediment + carbon stack upstream — and replace cartridges on schedule.",
    },
    {
      type: "paragraph",
      text: "The standard residential setup for tank water:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**5-micron sediment cartridge** — catches the bulk of particulate.",
        "**1-micron sediment or carbon block** — finer polish, protects the sleeve from biofilm-feeding organics.",
        "**UV-C steriliser** — sized for at least the home's peak flow rate (typically 1500 L/h for a 3-bedroom house).",
      ],
    },
    {
      type: "paragraph",
      text: "A good rule for sizing: take your home's expected peak flow (showers + dishwasher + a tap running) and add 30%. A 25W UV unit rated for 1500 L/h is enough for almost every standalone Australian house. Larger sites — large rural properties, multi-dwelling shared tanks — step up to 40W and 6000 L/h class.",
    },
    {
      type: "heading",
      level: 2,
      text: "What about ozone, chlorination, or boiling?",
      id: "alternatives",
    },
    {
      type: "paragraph",
      text: "These have their place, but for residential tank-fed homes UV is the right answer.",
    },
    {
      type: "paragraph",
      text: "**Boiling** is effective and it's what you do during a boil-water notice. It's not practical as a daily solution. It does nothing for the showers and the washing machine.",
    },
    {
      type: "paragraph",
      text: "**Manual chlorination** of a tank works (and is recommended for tanks that show repeated bacterial issues) but it changes the taste and you need to retreat after every significant rain event. It also doesn't disinfect water as it passes through the line — it disinfects the tank itself, which is a different problem.",
    },
    {
      type: "paragraph",
      text: "**Ozone** is used in some commercial applications. The equipment cost is significantly higher than UV and the residual breakdown chemistry is more complex than a household installer should be managing.",
    },
    {
      type: "heading",
      level: 2,
      text: "Maintenance — what you need to do, and when",
      id: "maintenance",
    },
    {
      type: "comparison",
      headers: ["Component", "Replace every", "Cost"],
      rows: [
        ["UV lamp", "12 months", "$60–$120"],
        ["Quartz sleeve", "5 years (or if cracked)", "$80–$150"],
        ["Sediment cartridges", "6 months (longer if clean tank)", "$25–$40"],
        ["Carbon cartridges", "12 months", "$45–$70"],
        ["O-rings on housings", "When changing cartridges", "$5–$15"],
      ],
    },
    {
      type: "paragraph",
      text: "The lamp itself is the most-missed maintenance item. UV-C output drops by 30% over the first 9–12 months even though the lamp visibly still lights up. You don't notice anything; the water keeps tasting the same; bacteria slowly start surviving the chamber. Replace the lamp on schedule, regardless of how it looks.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Set a calendar reminder",
      body: "If you do nothing else from this article, put 'replace UV lamp' on your calendar for 12 months from your install date. Lamps degrade silently. The unit gives no failure indicator — just gradually less effective disinfection.",
    },
    {
      type: "heading",
      level: 2,
      text: "Council and certification considerations",
      id: "compliance",
    },
    {
      type: "paragraph",
      text: "If you're on town water with a tank as a backup, certification rules don't usually apply to your filter system. If your tank is your sole supply (typical for rural and remote properties) some councils and water management plans require UV disinfection on potable lines, and a few specify minimum dose levels. Check your local council's water management plan before specifying a system.",
    },
    {
      type: "paragraph",
      text: "Most installers will recommend an isolated potable line — UV-treated water for the kitchen sink and bathrooms — and untreated tank water for non-potable uses like toilet flushing and the garden. This stretches cartridge and lamp life.",
    },
    {
      type: "paragraph",
      text: "For homes on tank supply, the right starting point is a 3-stage filter plus UV combined system. They come pre-plumbed and pre-sized. Don't try to mix stages from different manufacturers unless you genuinely know what you're doing.",
    },
    {
      type: "product-link",
      heading: "Tank water systems",
      blurb:
        "Combined whole-house + UV systems sized for typical Australian rural and outer-suburban homes.",
      productSlugs: [
        "whole-house-water-filter-uv-steriliser-system-3-stage",
        "uv-water-steriliser-25w-220-240v-1500-lph",
        "triple-big-blue-whole-house-water-filter-20-x-4-5-3-stage",
      ],
    },
  ],
};
