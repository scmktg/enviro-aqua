import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeWaterFilterTypes } from "@/components/sections/HomeWaterFilterTypes";
import { HomeDecisionMatrix } from "@/components/sections/HomeDecisionMatrix";
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
 * Homepage section ordering is deliberate — it tells Google what this site
 * is primarily about:
 *
 *   1. Hero               — "water filter specialists" H1
 *   2. WaterFilterTypes   — long-form, 4 sub-category cards (whole-house,
 *                           under-sink, bench-top, RO). Bulk of
 *                           "water filter [type]" keyword weight lives here.
 *   3. DecisionMatrix     — internal links into water-filter sub-categories
 *   4. FeaturedProducts   — most-bought water filters
 *   5. BubblerSpotlight   — secondary specialty (commercial bubblers)
 *   6. KitchenTapsPairing — taps positioned as accessories to RO systems
 *   7. Reviews            — real Google/Facebook social proof
 *   8. LocalArea          — Central Coast SEO strip + NAP block
 *   9. BathroomStrip      — minimal, single-line, deliberately small
 *  10. EmailCapture       — cartridge replacement reminders
 *
 * The bathroom category is intentionally last and minimal. The local-area
 * section sits high enough to register as a topical signal but late
 * enough that the dominant keyword cluster (water filters Australia) gets
 * established first.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeWaterFilterTypes />
      <HomeDecisionMatrix />
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
