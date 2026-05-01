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
    const hoursLeft = Math.floor(minutesLeft / 60);
    return {
      beforeCutoff: true,
      isWeekend: false,
      message:
        hoursLeft >= 1
          ? `Order in the next ${hoursLeft}h for same-day dispatch from Wyong.`
          : `Order in the next ${minutesLeft}min for same-day dispatch from Wyong.`,
    };
  }

  return {
    beforeCutoff: false,
    isWeekend: false,
    message: `Orders placed after ${cutoffDisplay} dispatch the next business day.`,
  };
}
