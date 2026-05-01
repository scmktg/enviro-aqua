/**
 * Single source of truth for Enviro Aqua's operational details. Every
 * reference to phone, address, hours, ABN, etc. across the site reads
 * from this file — so updating, e.g., a public holiday closure happens
 * in one place and propagates to header ribbon, footer, contact page,
 * LocalBusiness JSON-LD, and product pages simultaneously.
 *
 * Consistency of the NAP (Name, Address, Phone) signal across pages is
 * a documented Google local-search ranking factor, so we lock these
 * values rather than letting them drift.
 */

export const BUSINESS = {
  legalName: "Enviro Aqua Pty Ltd",
  brandName: "Enviro Aqua",
  /** Customer-facing tagline / one-line position */
  tagline: "Australian water filter specialists. Central Coast NSW.",

  /** Australian business identifiers */
  abn: "24 638 197 734",
  acn: "638 197 734",

  /** Showroom & dispatch address */
  address: {
    street: "6/45 Amsterdam Circuit",
    streetShort: "6/45 Amsterdam Cct",
    suburb: "Wyong",
    state: "NSW",
    postcode: "2259",
    country: "Australia",
    /** Coordinates for the Wyong industrial estate */
    latitude: -33.2870,
    longitude: 151.4198,
  },

  /** Contact channels */
  phone: {
    /** Display format (used in copy) */
    display: "(02) 8772 8162",
    /** tel: link format (no spaces) */
    tel: "+61287728162",
  },
  email: "info@enviroaqua.com.au",

  /** Showroom opening hours — used in copy AND schema.org openingHoursSpecification */
  hours: [
    { day: "Monday", open: "09:00", close: "15:00" },
    { day: "Tuesday", open: "09:00", close: "15:00" },
    { day: "Wednesday", open: "09:00", close: "15:00" },
    { day: "Thursday", open: "09:00", close: "15:00" },
    { day: "Friday", open: "09:00", close: "14:30" },
    { day: "Saturday", open: null, close: null }, // Closed
    { day: "Sunday", open: null, close: null }, // Closed
  ] as const,

  /** Order dispatch policy */
  dispatch: {
    /** Display string used in copy ("12pm", "1pm", "12:30pm" etc). */
    cutoffTime: "12pm",
    /**
     * Hour-of-day in 24h format, used for the live cart drawer countdown
     * and the dispatch-status calculation. MUST match cutoffTime above.
     * If you change cutoffTime to e.g. "1pm", set this to 13.
     */
    cutoffHour24: 12,
    sameDayBefore: "Order before 12pm AEST on a business day for same-day dispatch.",
    nextDayAfter: "Orders received after 12pm dispatch the next business day.",
  },

  /** Click & Collect from the showroom */
  clickAndCollect: {
    enabled: true,
    typicalReadyHours: 2,
    location: "Wyong showroom",
  },

  /** Tiered postage costs — current real pricing */
  shipping: {
    standard: {
      label: "Standard delivery",
      timeRange: "2–5 business days",
      tiers: [
        { size: "Small Items", price: 10.95 },
        { size: "Medium Items", price: 14.95 },
        { size: "Large Items", price: 18.95 },
        { size: "Extra Large Items", price: 23.95 },
      ],
    },
    express: {
      label: "Express delivery",
      timeRange: "1–2 business days",
      tiers: [
        { size: "Small Items", price: 14.95 },
        { size: "Medium Items", price: 18.95 },
        { size: "Large Items", price: 23.95 },
        { size: "Extra Large Items", price: 31.95 },
      ],
    },
  },

  /** Returns policy */
  returns: {
    windowDays: 14,
    eligibleFor: "damaged or faulty products only",
    requiresOriginalPackaging: true,
  },

  /** Service catchment for local SEO. Order matters — closest first. */
  serviceArea: {
    primary: "Central Coast NSW",
    suburbs: [
      "Wyong",
      "Tuggerah",
      "The Entrance",
      "Bateau Bay",
      "Long Jetty",
      "Lake Haven",
      "Charmhaven",
      "Gorokan",
      "Toukley",
      "Gosford",
      "Erina",
      "Terrigal",
      "Avoca Beach",
      "Woy Woy",
    ],
    extendedRegions: [
      "Newcastle",
      "Lake Macquarie",
      "Sydney",
      "Hunter Valley",
      "Mid-North Coast",
    ],
  },

  /** Customer-facing nationwide promise */
  shippingPromise:
    "Australia-wide shipping from Wyong, NSW Central Coast",
} as const;

/**
 * Helper: full single-line address (used in copy)
 */
export function fullAddress(): string {
  const a = BUSINESS.address;
  return `${a.streetShort}, ${a.suburb} ${a.state} ${a.postcode}`;
}

/**
 * Helper: structured address for schema.org PostalAddress
 */
export function postalAddress() {
  const a = BUSINESS.address;
  return {
    "@type": "PostalAddress",
    streetAddress: a.streetShort,
    addressLocality: a.suburb,
    addressRegion: a.state,
    postalCode: a.postcode,
    addressCountry: "AU",
  };
}

/**
 * Helper: schema.org openingHoursSpecification array
 */
export function openingHoursSpec() {
  const dayMap: Record<string, string> = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
  };
  return BUSINESS.hours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMap[h.day],
      opens: h.open,
      closes: h.close,
    }));
}

/**
 * Convert a 24h time like "09:00" or "14:30" to display-friendly
 * "9am" or "2:30pm". Drops `:00` minutes for cleanliness.
 */
function formatTime12h(t24: string): string {
  const [hStr, mStr] = t24.split(":");
  const h = parseInt(hStr ?? "0", 10);
  const m = parseInt(mStr ?? "0", 10);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return m === 0 ? `${h12}${ampm}` : `${h12}:${String(m).padStart(2, "0")}${ampm}`;
}

const SHORT_DAY: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

/**
 * Compact one-line opening hours string for header/footer/PDP copy.
 *
 * Output examples (depending on what's in BUSINESS.hours):
 *   "Mon–Thu 9am–3pm · Fri 9am–2:30pm · Sat–Sun closed"
 *   "Mon–Fri 9am–5pm · Sat–Sun closed"
 *   "Mon–Sat 9am–5pm · Sun closed"
 *
 * The compactor groups consecutive days with identical hours so the
 * string stays terse. When you change `BUSINESS.hours`, every surface
 * that calls this helper updates simultaneously — no manual hunt.
 */
export function compactHoursString(): string {
  const days = BUSINESS.hours.map((h) => ({
    short: SHORT_DAY[h.day]!,
    range:
      h.open && h.close
        ? `${formatTime12h(h.open)}–${formatTime12h(h.close)}`
        : "closed",
  }));

  // Group consecutive days with the same range.
  const groups: { from: string; to: string; range: string }[] = [];
  for (const d of days) {
    const last = groups[groups.length - 1];
    if (last && last.range === d.range) {
      last.to = d.short;
    } else {
      groups.push({ from: d.short, to: d.short, range: d.range });
    }
  }

  return groups
    .map((g) => {
      const dayLabel = g.from === g.to ? g.from : `${g.from}–${g.to}`;
      return `${dayLabel} ${g.range}`;
    })
    .join(" · ");
}
