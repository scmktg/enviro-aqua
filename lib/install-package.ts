/**
 * Whole House Filter Install Package — service offering, not a regular
 * product. Customer requests via a form, team confirms with plumber,
 * invoice is sent through Shopify's draft order flow, install booked.
 *
 * No cart, no upfront payment. The /install/whole-house page reads
 * everything in this file as the source of truth for pricing, eligible
 * postcodes, timeline, and what's not included.
 */

export const INSTALL_PACKAGE = {
  /** Display name */
  name: "Whole House Filter Install Package",

  /** Sub-headline used on the landing page */
  tagline:
    "Triple Big Blue 3-stage system, professionally installed by a Central Coast plumber.",

  /** All-inclusive price, AUD */
  price: 2299,

  /** What's NOT included — kills the "hidden cost" objection */
  notIncluded: [
    "Excessive plumbing modifications beyond the 2m install zone",
    "Strata/body corporate approval where required",
    "Replacement of pre-existing damaged plumbing",
    "Replacement cartridges after the initial stack (sold separately)",
  ],

  /** Postcodes eligible for the package */
  eligiblePostcodes: [
    // Central Coast Council
    "2250", "2251", "2256", "2257", "2258", "2259", "2260",
    "2261", "2262", "2263", "2264", "2265",
  ],

  /** Service timeline — used in the "What happens next" section */
  timeline: [
    {
      step: "Today",
      title: "Submit your details",
      body: "Two-minute form. No payment, no commitment yet.",
    },
    {
      step: "Within 24 hours",
      title: "We call you back",
      body: "Confirm your install address, water supply type (town/tank/bore), and the right product spec for your home.",
    },
    {
      step: "Within 48 hours",
      title: "Plumber availability",
      body: "We coordinate with your local Central Coast plumber and lock in an install date that suits you.",
    },
    {
      step: "Before install",
      title: "Invoice & payment",
      body: "We send your itemised invoice via Shopify. Pay by card, Apple Pay, Google Pay, or bank transfer once you're happy.",
    },
    {
      step: "Install day",
      title: "Plumber arrives",
      body: "2–3 hour install. We test, you sign off, you have filtered water at every tap.",
    },
  ],

  /** Conditions for cancellation, rescheduling, etc. */
  policy: {
    cancellationWindow: "48 hours",
    depositRequired: false,
    invoiceTiming: "After plumber availability is confirmed, before install day",
  },
} as const;

/**
 * Check if a postcode is eligible for the install package.
 */
export function isEligiblePostcode(postcode: string): boolean {
  const normalised = postcode.trim().slice(0, 4);
  return (INSTALL_PACKAGE.eligiblePostcodes as readonly string[]).includes(
    normalised
  );
}