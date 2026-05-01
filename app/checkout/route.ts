import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createCheckout } from "@/lib/shopify/checkout";
import { isShopifyConfigured } from "@/lib/shopify/client";
import type { CartLine } from "@/types/cart";

/**
 * Checkout route. See SHOPIFY-INTEGRATION.md for the broader flow.
 *
 * This route currently includes verbose env diagnostics (domain hex dump,
 * file-on-disk read, env-key inventory) to help debug a "Shopify not
 * configured" error where the in-memory env var contains characters that
 * aren't visible in the .env.local file. Once that's resolved, the
 * dumpEnvDiagnostics call can be deleted.
 */

/**
 * Show every byte of a string in a copy-paste-safe form. Used to spot
 * invisible whitespace, BOMs, or zero-width characters that visually
 * look like a clean string but explain bizarre auth failures.
 */
function hexDump(s: string | undefined): string {
  if (s === undefined) return "(undefined)";
  if (s === "") return "(empty string)";
  return Array.from(s)
    .map((c) => {
      const code = c.codePointAt(0)!;
      if (code >= 0x20 && code < 0x7f) return c;
      return `\\x${code.toString(16).padStart(2, "0")}`;
    })
    .join("");
}

async function dumpEnvDiagnostics() {
  console.log(
    "\n┌─ /checkout — env diagnostics ─────────────────────────────────────"
  );
  console.log(`│ process.cwd():  ${process.cwd()}`);

  // List every env var that contains "SHOPIFY" — catches typos and
  // unexpected duplicates (e.g. SHOPIFY vs NEXT_PUBLIC_SHOPIFY).
  const shopifyKeys = Object.keys(process.env).filter((k) =>
    k.toUpperCase().includes("SHOPIFY")
  );
  console.log(`│ Shopify env keys present: ${shopifyKeys.length}`);
  for (const k of shopifyKeys) {
    const v = process.env[k] ?? "";
    const preview = v.length > 60 ? v.slice(0, 60) + "…" : v;
    console.log(`│   ${k}=${preview}`);
  }

  // Hex dump of the domain — catches invisible characters that appear
  // identical to plain ASCII in normal terminal output.
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  console.log(`│`);
  console.log(`│ DOMAIN as Node sees it (every char):`);
  console.log(`│   ${hexDump(domain)}`);
  console.log(`│   length: ${domain?.length ?? 0}`);

  // Read the file from disk RIGHT NOW and compare byte-for-byte. If
  // these two differ, something is rewriting the env var in memory.
  try {
    const filePath = path.join(process.cwd(), ".env.local");
    const onDisk = await fs.readFile(filePath, "utf8");
    console.log(`│`);
    console.log(`│ .env.local on disk (${onDisk.length} bytes):`);
    onDisk.split("\n").forEach((line, i) => {
      console.log(`│   ${i + 1}: ${line}`);
    });
  } catch (err) {
    console.log(
      `│ Could not read .env.local from disk: ${(err as Error).message}`
    );
  }

  console.log(
    "└────────────────────────────────────────────────────────────────────\n"
  );
}

export async function POST(request: Request) {
  let lines: CartLine[] = [];
  try {
    const body = (await request.json().catch(() => null)) as
      | { lines?: CartLine[] }
      | null;
    lines = body?.lines ?? [];
  } catch {
    lines = [];
  }

  await dumpEnvDiagnostics();

  const configured = isShopifyConfigured();
  console.log(
    `\n┌─ /checkout — outcome ──────────────────────────────────────────────`
  );
  console.log(`│ Cart lines:   ${lines.length}`);
  console.log(`│ isConfigured: ${configured}`);

  if (lines.length === 0) {
    console.log(`│ Result:       empty cart, returning 400`);
    console.log(
      `└────────────────────────────────────────────────────────────────────\n`
    );
    return NextResponse.json(
      {
        checkoutUrl: "/cart?error=empty",
        cartId: null,
        isStub: true,
        error: "Cart is empty.",
      },
      { status: 400 }
    );
  }

  try {
    const result = await createCheckout(lines);
    console.log(
      `│ Result:       ${result.isStub ? "STUB (Shopify not configured)" : "OK → " + result.checkoutUrl}`
    );
    console.log(
      `└────────────────────────────────────────────────────────────────────\n`
    );
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`│ Result:       ERROR`);
    console.error(`│`);
    for (const line of message.split("\n")) {
      console.error(`│ ${line}`);
    }
    console.error(
      `└────────────────────────────────────────────────────────────────────\n`
    );
    return NextResponse.json(
      {
        checkoutUrl: "/cart?error=checkout",
        cartId: null,
        isStub: true,
        error: message,
      },
      { status: 200 }
    );
  }
}
