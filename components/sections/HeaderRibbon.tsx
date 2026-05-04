import Link from "next/link";
import { BUSINESS } from "@/lib/business";

/**
 * Black ribbon bar, sits above the (now white) header. Rotates 3 short
 * CTAs/value props on a CSS-only carousel so the brand pillars surface
 * one at a time rather than competing for attention.
 *
 * Implementation note: we render all 3 CTAs in a vertical strip and
 * animate the strip's translateY in a 12-second loop. No JS, no
 * hydration cost, no layout shift. The strip is rendered twice (loop
 * seam) to make the animation seamless.
 *
 * The leftmost slot ("Same price retail or trade") is the brand thesis
 * and is rendered statically alongside the rotation on viewports `md`
 * and wider. Below `md`, only the rotating message shows (centred) —
 * the static thesis text doesn't fit alongside it on a 380px viewport.
 */
const ROTATING_MESSAGES: { label: string; href: string }[] = [
  {
    label: `Same-day dispatch from Wyong NSW · order before ${BUSINESS.dispatch.cutoffTime}`,
    href: "/shipping",
  },
  {
    label: "Free Click & Collect from our Wyong showroom",
    href: "/showroom",
  },
  { label: "Australian-stocked · plumber-grade product", href: "/help/which-filter" },
  { label: "Not sure which filter? 60-second filter finder", href: "/help/which-filter" },
];

export function HeaderRibbon() {
  return (
    <div className="bg-ink text-paper text-xs h-9 flex items-center overflow-hidden">
      <div className="container-site flex items-center justify-between gap-6 w-full">
        <p className="hidden md:block flex-shrink-0">
          <span className="font-medium">Same price retail or trade.</span>
          <span className="text-paper/60 ml-2">No accounts, no minimums.</span>
        </p>

        {/* Rotating slot. Height matches the ribbon (h-9 = 36px). */}
        <div
          className="relative h-9 overflow-hidden flex-1 md:flex-none md:w-[420px]"
          aria-label="Service announcements"
        >
          <ul className="ribbon-rotate absolute inset-x-0">
            {[...ROTATING_MESSAGES, ...ROTATING_MESSAGES].map((msg, i) => (
              <li
                key={i}
                className="h-9 flex items-center justify-center md:justify-end"
              >
                <Link
                  href={msg.href}
                  className="text-paper/85 hover:text-paper transition-colors duration-fast inline-flex items-center gap-2"
                >
                  {msg.label}
                  <span aria-hidden className="text-paper/50">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
