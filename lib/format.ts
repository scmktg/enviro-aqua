/**
 * Single AUD currency formatter — instantiated once and reused.
 * Tabular figures are applied via Tailwind's font-feature-settings utility.
 */
const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const AUD_NO_CURRENCY = new Intl.NumberFormat("en-AU", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(amount: number): string {
  // Whole dollar amounts ($395) are cleaner than $395.00 on cards.
  // Cents amounts ($69.95) need to show fractions.
  if (Number.isInteger(amount)) {
    return AUD.format(amount).replace(".00", "");
  }
  return AUD.format(amount);
}

export function formatPriceParts(amount: number): {
  symbol: string;
  whole: string;
  fraction: string | null;
} {
  const isWhole = Number.isInteger(amount);
  if (isWhole) {
    return { symbol: "$", whole: amount.toLocaleString("en-AU"), fraction: null };
  }
  const [whole, fraction] = AUD_NO_CURRENCY.format(amount).split(".");
  return { symbol: "$", whole, fraction: fraction ?? null };
}

/**
 * Short title for cards / cart line items — strips trailing spec dashes
 * past the second em-dash so the card stays readable.
 */
export function shortTitle(title: string, max = 64): string {
  if (title.length <= max) return title;
  // Split at em-dash boundaries.
  const parts = title.split(" — ");
  if (parts.length > 1 && parts[0]!.length <= max) return parts[0]!;
  return title.slice(0, max - 1).trimEnd() + "…";
}

/**
 * Pretty-print an Intl ListFormat. Falls back gracefully on older runtimes
 * (notably Edge runtime variants), which is why we feature-detect.
 */
export function listFormat(items: string[]): string {
  if (items.length === 0) return "";
  if (typeof Intl.ListFormat !== "undefined") {
    return new Intl.ListFormat("en-AU", {
      style: "long",
      type: "conjunction",
    }).format(items);
  }
  if (items.length === 1) return items[0]!;
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
