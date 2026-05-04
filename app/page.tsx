import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeBuyingPaths } from "@/components/sections/HomeBuyingPaths";
import { HomeFilterFinder } from "@/components/sections/HomeFilterFinder";
import { HomeFeaturedProducts } from "@/components/sections/HomeFeaturedProducts";
import { HomeBubblerSpotlight } from "@/components/sections/HomeBubblerSpotlight";
import { HomeKitchenTapsPairing } from "@/components/sections/HomeKitchenTapsPairing";
import { HomeReviews } from "@/components/sections/HomeReviews";
import { HomeLocalArea } from "@/components/sections/HomeLocalArea";
import { HomeBathroomStrip } from "@/components/sections/HomeBathroomStrip";
import { HomeEmailCapture } from "@/components/sections/HomeEmailCapture";

export const metadata: Metadata = {
  title:
    "Water Filters Australia — Wyong NSW Central Coast | Enviro Aqua",
  description: `Australian water filter specialists, based in Wyong on the NSW Central Coast. Whole-house Big Blue, under-sink, bench-top and reverse osmosis systems. WaterMark-certified commercial drinking bubblers for schools, gyms and offices. Same-day dispatch on orders before ${BUSINESS.dispatch.cutoffTime}. Click & Collect available.`,
  alternates: {
    canonical: "/",
  },
};

/**
 * Homepage section ordering reflects the actual customer journey:
 *
 *   1. Hero               — Australia-wide ecom + Central Coast install
 *   2. BuyingPaths        — "Where do you want filtered water?" — needs-based
 *   3. FilterFinder       — One-question shortcut for fast routing
 *   4. FeaturedProducts   — Most-bought systems (social proof at price level)
 *   5. BubblerSpotlight   — Three certified commercial bubblers → /drinking-bubblers
 *   6. KitchenTapsPairing — Taps as accessories to filtration
 *   7. Reviews            — Real Google/Facebook social proof
 *   8. LocalArea          — Central Coast SEO + NAP block
 *   9. BathroomStrip      — Minimal de-emphasised mention
 *  10. EmailCapture       — Cartridge replacement reminders
 *
 * Removed since previous version:
 *   - HomeWaterFilterTypes (ownership-framed, replaced by HomeBuyingPaths)
 *   - HomeDecisionMatrix (two-step rent/own → supply, replaced by
 *     single-question HomeFilterFinder)
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeBuyingPaths />
      <HomeFilterFinder />
      <HomeFeaturedProducts />
      <HomeBubblerSpotlight />
      <HomeKitchenTapsPairing />
      <HomeReviews />
      <HomeLocalArea />
      <HomeBathroomStrip />
      <HomeEmailCapture />
    </>
  );
}