import type { CartLine } from "@/types/cart";

/**
 * Client-side wrapper around POST /checkout. Single source of truth for
 * the response contract — both the cart drawer and the full cart page
 * call this so neither has to know how the route shape works.
 *
 * The route returns:
 *   Success: { ok: true, checkoutUrl: string, cartId: string|null, isStub: boolean }
 *   Failure: { ok: false, error: { code, message } }
 *
 * On the wire the API may also respond with HTTP 4xx/5xx and a non-JSON
 * body (Vercel platform errors, network drops). We treat anything we
 * can't parse to the success shape as a failure with a generic message.
 *
 * We deliberately do NOT call window.location.href from here — the
 * caller decides what to do with the URL. That keeps this safe to call
 * from a unit test and from non-browser contexts in the future (e.g. a
 * server action that pre-warms the cart).
 */

export type CheckoutOutcome =
  | {
      ok: true;
      checkoutUrl: string;
      isStub: boolean;
    }
  | {
      ok: false;
      code: CheckoutErrorCode;
      error: string;
    };

export type CheckoutErrorCode =
  | "EMPTY_CART"
  | "BAD_REQUEST"
  | "CHECKOUT_FAILED"
  | "NETWORK"
  | "MALFORMED_RESPONSE";

interface SuccessShape {
  ok: true;
  checkoutUrl: unknown;
  cartId?: unknown;
  isStub?: unknown;
}
interface FailureShape {
  ok: false;
  error?: { code?: unknown; message?: unknown };
}
type ResponseShape = SuccessShape | FailureShape | Record<string, unknown>;

/**
 * Return true if `url` is safe to navigate to. We allow:
 *   - relative paths starting with "/" (in-app routes like /cart?error=...)
 *   - https URLs whose host matches the configured Shopify domain
 *   - https URLs that look like a Shopify checkout (*.myshopify.com or
 *     *.shop) — covers the case where Shopify rotates domains
 *
 * We deliberately reject http://, javascript:, data:, and anything else
 * to prevent open-redirect bugs upstream from turning into XSS.
 */
function isSafeCheckoutUrl(url: string): boolean {
  if (typeof url !== "string" || url.length === 0) return false;
  if (url.startsWith("/")) return true;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  const host = parsed.hostname.toLowerCase();
  return (
    host.endsWith(".myshopify.com") ||
    host.endsWith(".shop") ||
    host.endsWith(".shopify.com")
  );
}

const GENERIC_FAILURE =
  "Something went wrong starting your checkout. Please try again.";

export async function startCheckout(
  lines: CartLine[]
): Promise<CheckoutOutcome> {
  let res: Response;
  try {
    res = await fetch("/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines }),
    });
  } catch {
    return {
      ok: false,
      code: "NETWORK",
      error:
        "We couldn't reach our servers — check your connection and try again.",
    };
  }

  let body: ResponseShape;
  try {
    body = (await res.json()) as ResponseShape;
  } catch {
    return {
      ok: false,
      code: "MALFORMED_RESPONSE",
      error: GENERIC_FAILURE,
    };
  }

  if (body && body.ok === true) {
    const { checkoutUrl, isStub } = body as SuccessShape;
    if (typeof checkoutUrl !== "string" || !isSafeCheckoutUrl(checkoutUrl)) {
      return {
        ok: false,
        code: "MALFORMED_RESPONSE",
        error: GENERIC_FAILURE,
      };
    }
    return {
      ok: true,
      checkoutUrl,
      isStub: typeof isStub === "boolean" ? isStub : false,
    };
  }

  // Failure shape — read code/message defensively.
  const errObj =
    body && typeof body === "object" && "error" in body
      ? (body as FailureShape).error
      : undefined;

  const codeRaw = errObj && typeof errObj === "object" ? errObj.code : undefined;
  const messageRaw =
    errObj && typeof errObj === "object" ? errObj.message : undefined;

  const code: CheckoutErrorCode =
    codeRaw === "EMPTY_CART" ||
    codeRaw === "BAD_REQUEST" ||
    codeRaw === "CHECKOUT_FAILED"
      ? codeRaw
      : "CHECKOUT_FAILED";

  const message =
    typeof messageRaw === "string" && messageRaw.length > 0
      ? messageRaw
      : GENERIC_FAILURE;

  return {
    ok: false,
    code,
    error: message,
  };
}