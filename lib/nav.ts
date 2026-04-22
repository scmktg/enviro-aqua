// lib/nav.ts
export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

// Primary nav in the header — mirrors your Woo categories
export const primaryNav: NavGroup[] = [
  {
    label: "Water Filtration",
    links: [
      { label: "Water Filters", href: "/product-category/water-filters", description: "Whole house, under sink, benchtop" },
      { label: "Filter Cartridges", href: "/product-category/filter-cartridges", description: "Sediment, carbon, RO membranes" },
      { label: "Whole House Systems", href: "/product-category/whole-house", description: "Big blue triple stage and more" },
      { label: "Kitchen Taps", href: "/product-category/kitchen-taps", description: "Filter-compatible mixers and pure water taps" },
      { label: "Bubblers & Coolers", href: "/product-category/bubblers-coolers", description: "Commercial and office drinking fountains" },
      { label: "Tanks & Bladders", href: "/product-category/tanks-bladders" },
      { label: "Water Pumps", href: "/product-category/water-pumps" },
      { label: "Fittings & Parts", href: "/product-category/fittings-parts" },
    ],
  },
  {
    label: "Bathroom",
    links: [
      { label: "Bathroom Taps", href: "/product-category/bathroom-taps" },
      { label: "Showers", href: "/product-category/showers" },
      { label: "Basins", href: "/product-category/basins" },
      { label: "Toilets", href: "/product-category/toilets" },
      { label: "Cabinets", href: "/product-category/cabinets" },
      { label: "Mirrors", href: "/product-category/mirrors" },
      { label: "Bathroom Accessories", href: "/product-category/bathroom-accessories" },
      { label: "Bundles", href: "/product-category/bundles" },
    ],
  },
];

// Footer columns
export const footerNav: NavGroup[] = [
  {
    label: "Water Filtration",
    links: [
      { label: "Water Filters", href: "/product-category/water-filters" },
      { label: "Filter Cartridges", href: "/product-category/filter-cartridges" },
      { label: "Whole House", href: "/product-category/whole-house" },
      { label: "Kitchen Taps", href: "/product-category/kitchen-taps" },
      { label: "Water Pumps", href: "/product-category/water-pumps" },
    ],
  },
  {
    label: "Bathroom",
    links: [
      { label: "Bathroom Taps", href: "/product-category/bathroom-taps" },
      { label: "Showers", href: "/product-category/showers" },
      { label: "Basins", href: "/product-category/basins" },
      { label: "Toilets", href: "/product-category/toilets" },
      { label: "Cabinets", href: "/product-category/cabinets" },
    ],
  },
  {
    label: "Help",
    links: [
      { label: "Contact Us", href: "/our-contacts" },
      { label: "Delivery & Returns", href: "/delivery-return" },
      { label: "Showroom", href: "/showroom" },
      { label: "Track Your Order", href: "/parcel-panel" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export const companyInfo = {
  name: "Enviro Aqua",
  address: "6/45 Amsterdam Cct, Wyong, NSW, 2259",
  phone: "(02) 8772 8162",
  acn: "638 197 734",
  abn: "24 638 197 734",
};