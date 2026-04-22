// components/site/site-footer.tsx
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { footerNav, companyInfo } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Image
  src="/logo.png"
  alt="Enviro Aqua"
  width={178}
  height={32}
  priority
  className="w-auto h-7 md:h-8"
/>
            <p className="text-sm text-background/70 max-w-sm leading-relaxed">
              Australian supplier of whole-house water filter systems,
              based on the NSW Central Coast.
            </p>
            <div className="mt-6 space-y-2 text-sm text-background/70">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="hover:text-background transition-colors">
                  {companyInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerNav.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-medium text-background mb-4">{group.label}</h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-background/60">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} {companyInfo.name}</span>
            <span>ACN {companyInfo.acn}</span>
            <span>ABN {companyInfo.abn}</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-background transition-colors">Privacy</Link>
            <Link href="/watermark-policy" className="hover:text-background transition-colors">Watermark Policy</Link>
            <Link href="/delivery-return" className="hover:text-background transition-colors">Delivery & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}