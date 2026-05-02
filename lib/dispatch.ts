import { BUSINESS } from "@/lib/business";

export interface DispatchStatus {
  beforeCutoff: boolean;
  isWeekend: boolean;
  message: string;
}

/**
 * Determines whether the current Sydney time is before the same-day
 * dispatch cutoff defined in `lib/business.ts`. Returns a human-readable
 * message that the cart drawer and cart page render verbatim.
 *
 * Pure function — no side effects. Run on every cart-drawer open and
 * every cart-page render. Doesn't memoise because the answer changes
 * by the minute and we want the displayed time-remaining to update if
 * the user lingers on the page near cutoff.
 *
 * Reads `BUSINESS.dispatch.cutoffHour24` so editing the cutoff in one
 * place updates every customer-facing surface that uses this logic.
 */
export function getDispatchStatus(): DispatchStatus {
  const cutoffHour = BUSINESS.dispatch.cutoffHour24;
  const cutoffDisplay = BUSINESS.dispatch.cutoffTime;

  const now = new Date();
  // Reinterpret the wall-clock instant as Sydney local time. The
  // toLocaleString round-trip is the standard browser-portable way
  // to do this without pulling in a timezone library.
  const sydney = new Date(
    now.toLocaleString("en-US", { timeZone: "Australia/Sydney" })
  );
  const day = sydney.getDay(); // 0 = Sun, 6 = Sat
  const hour = sydney.getHours();
  const minute = sydney.getMinutes();

  if (day === 0 || day === 6) {
    return {
      beforeCutoff: false,
      isWeekend: true,
      message: "Orders placed now will dispatch Monday morning from Wyong.",
    };
  }

  if (hour < cutoffHour) {
    const minutesLeft = 60 * (cutoffHour - hour) - minute;
    return {
      beforeCutoff: true,
      isWeekend: false,
      message: `Order in the next ${formatTimeLeft(minutesLeft)} for same-day dispatch from Wyong.`,
    };
  }

  return {
    beforeCutoff: false,
    isWeekend: false,
    message: `Orders placed after ${cutoffDisplay} dispatch the next business day.`,
  };
}

/**
 * Format minutes-remaining for the cart copy. Rules:
 *
 *   - Under 60min → "45min" (urgency is in the minute count)
 *   - Exactly on the hour → "2h" (don't append " 0min", reads weirdly)
 *   - Otherwise → "2h 15min" (preserve minutes — losing them
 *     undersells urgency near the boundary)
 *
 * Examples:
 *   119 → "1h 59min"
 *   120 → "2h"
 *   89  → "1h 29min"
 *   59  → "59min"
 *   1   → "1min"
 *
 * Exported for unit testing — keeps the time-formatting logic isolated
 * from the timezone arithmetic.
 */
export function formatTimeLeft(minutesLeft: number): string {
  // Defensive — getDispatchStatus only calls this when hour < cutoffHour
  // so minutesLeft is always positive, but a caller-error shouldn't
  // produce nonsense copy.
  if (minutesLeft <= 0) return "0min";

  if (minutesLeft < 60) {
    return `${minutesLeft}min`;
  }

  const hours = Math.floor(minutesLeft / 60);
  const mins = minutesLeft % 60;

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}min`;
}