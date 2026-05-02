import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/shopify/checkout";
import type { CartLine } from "@/types/cart";

/**
 * Checkout route. The cart drawer and full cart page POST here with the
 * current cart lines; we resolve them to Shopify variant GIDs and create
 * a Shopify cart, then return the hosted-checkout URL.
 *
 * Response contract (always JSON, always read this shape — never trust
 * `res.ok` alone):
 *
 *   Success:  { ok: true, checkoutUrl: string, cartId: string|null, isStub: boolean }
 *   Failure:  { ok: false, error: { code, message } }
 *
 * Failure codes the client cares about:
 *   - "EMPTY_CART"      → cart lines array was empty (HTTP 400)
 *   - "BAD_REQUEST"     → body didn't parse as JSON or had wrong shape (HTTP 400)
 *   - "CHECKOUT_FAILED" → Shopify returned an error or the variant lookup
 *                         failed (HTTP 502 — upstream issue, retryable)
 *
 * No diagnostic logging — credentials must never reach server logs in
 * production. If you need to debug Shopify auth issues locally, do it
 * via the curl smoke test in SHOPIFY-INTEGRATION.md, not by instrumenting
 * this route.
 */

interface CheckoutRequestBody {
  lines?: unknown;
}

function isCartLineArray(value: unknown): value is CartLine[] {
  if (!Array.isArray(value)) return false;
  return value.every(
    (l) =>
      l !== null &&
      typeof l === "object" &&
      typeof (l as CartLine).id === "string" &&
      typeof (l as CartLine).sku === "string" &&
      typeof (l as CartLine).slug === "string" &&
      typeof (l as CartLine).quantity === "number" &&
      (l as CartLine).quantity > 0
  );
}

export async function POST(request: Request) {
  let body: CheckoutRequestBody | null;
  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "BAD_REQUEST",
          message: "Request body must be valid JSON.",
        },
      },
      { status: 400 }
    );
  }

  if (!body || !isCartLineArray(body.lines)) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "BAD_REQUEST",
          message: "Request body must include a `lines` array of cart lines.",
        },
      },
      { status: 400 }
    );
  }

  const lines = body.lines;

  if (lines.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "EMPTY_CART",
          message: "Your cart is empty.",
        },
      },
      { status: 400 }
    );
  }

  try {
    const result = await createCheckout(lines);
    return NextResponse.json({
      ok: true,
      checkoutUrl: result.checkoutUrl,
      cartId: result.cartId,
      isStub: result.isStub,
    });
  } catch (err) {
    // We log the message (no env, no secrets, no PII) so production
    // observability still has a signal when checkouts fail.
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[checkout] createCheckout failed:", message);

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "CHECKOUT_FAILED",
          // The message from createCheckout is already user-safe (it's
          // the Shopify userErrors message or our SKU-not-found copy).
          // If you want to hide internals, swap this for a generic
          // string in production.
          message,
        },
      },
      { status: 502 }
    );
  }
}