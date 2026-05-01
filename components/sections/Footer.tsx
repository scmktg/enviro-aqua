import Link from "next/link";
import { BUSINESS, fullAddress, compactHoursString } from "@/lib/business";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "Whole House Filters", href: "/shop/water-filters/whole-house" },
      { label: "Under Sink Filters", href: "/shop/water-filters/under-sink" },
      { label: "Bench Top Filters", href: "/shop/water-filters/bench-top" },
      { label: "Reverse Osmosis", href: "/shop/water-filters/reverse-osmosis" },
      { label: "Replacement Cartridges", href: "/shop/water-filters/replacement-cartridges" },
      { label: "Commercial Bubblers", href: "/shop/commercial-bubblers" },
      { label: "Kitchen Taps", href: "/shop/kitchen-taps" },
      { label: "Bathroom", href: "/shop/bathroom" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Which filter do I need?", href: "/help/which-filter" },
      { label: "Blog & guides", href: "/blog" },
      { label: "Shipping & delivery", href: "/shipping" },
      { label: "Returns policy", href: "/shipping#returns" },
    ],
  },
  {
    heading: "Visit & contact",
    links: [
      { label: "Wyong showroom", href: "/showroom" },
      { label: "Contact us", href: "/contact" },
      { label: "Click & Collect", href: "/showroom#click-and-collect" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper on-dark mt-24">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden fill="none">
                <path
                  d="M16 4c4 6 8 10 8 15a8 8 0 0 1-16 0c0-5 4-9 8-15Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-lg font-semibold tracking-tight">
                {BUSINESS.brandName}
              </span>
            </Link>
            <p className="text-sm text-paper/70 leading-relaxed max-w-xs">
              Australian water filter specialists, based in Wyong on the NSW
              Central Coast. Plumber-grade product, same price retail or
              trade, Australia-wide shipping.
            </p>

            <address className="mt-6 space-y-2 text-sm not-italic">
              <p className="text-paper/85">
                <span className="block text-xs uppercase tracking-[0.16em] text-paper/55 mb-1">
                  Showroom & dispatch
                </span>
                {fullAddress()}
              </p>
              <p>
                <a
                  href={`tel:${BUSINESS.phone.tel}`}
                  className="font-medium tabular hover:text-paper/70 transition-colors duration-fast"
                >
                  {BUSINESS.phone.display}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-paper/70 hover:text-paper transition-colors duration-fast"
                >
                  {BUSINESS.email}
                </a>
              </p>
              <p className="text-paper/55 pt-1 text-xs">
                {compactHoursString()}
              </p>
            </address>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <h3 className="text-xs uppercase tracking-[0.18em] text-paper/60 mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/80 hover:text-paper transition-colors duration-fast"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.18em] text-paper/60 mb-4">
              Standards
            </h3>
            <p className="text-sm text-paper/70 leading-relaxed mb-3">
              Certifications vary by product. Each product page lists what
              that specific item carries.
            </p>
            <ul className="space-y-1 text-sm text-paper/80">
              <li>WaterMark — plumbed-in</li>
              <li>WELS — tapware</li>
              <li>NSF — drinking water media</li>
              <li>AS/NZS 4020 / 3497</li>
            </ul>
          </div>
        </div>

        <div className="rule-top border-paper/15 mt-14 pt-6 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4 text-xs text-paper/60">
          <p>
            © {new Date().getFullYear()} {BUSINESS.legalName}. ABN{" "}
            {BUSINESS.abn}. All prices in AUD inc. GST.
          </p>
          <p>
            Wyong, NSW Central Coast · Servicing Sydney, Newcastle &
            Australia-wide
          </p>
        </div>
      </div>
    </footer>
  );
}
