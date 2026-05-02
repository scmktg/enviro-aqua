import { NextResponse } from "next/server";
import { isEligiblePostcode, INSTALL_PACKAGE } from "@/lib/install-package";
import { BUSINESS } from "@/lib/business";

/**
 * Install enquiry submissions. Customer submits the form on
 * /install/whole-house with their details and desired install date;
 * this route validates the input and dispatches it to the team.
 *
 * Today: sends an email via Resend (or whatever transactional email
 * provider is configured via RESEND_API_KEY). Acts as the single
 * source of incoming bookings; team replies to the customer to
 * confirm plumber availability and send the Shopify invoice manually.
 *
 * Future: swap the email dispatch for a Shopify Admin API call that
 * creates a draft order with the customer + line items, attaches the
 * install date as an order note, and sends the invoice automatically
 * from Shopify when the team marks it ready. The validation logic and
 * input shape stays the same; only the dispatch step changes.
 */

interface InstallEnquiryInput {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  suburb: string;
  postcode: string;
  preferredDate: string;
  alternateDate?: string;
  waterSupply: "town" | "tank" | "bore" | "unsure";
  homeType: "house" | "townhouse" | "apartment" | "rural" | "other";
  notes?: string;
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isValidAuPhone(s: string): boolean {
  // Strip spaces, parens, dashes, +
  const digits = s.replace(/[\s()\-+]/g, "");
  // AU mobile = 04xxxxxxxx (10 digits) or +614xxxxxxxx (11 digits with country)
  // AU landline = (0X)xxxxxxxx (10 digits) or +61Xxxxxxxx (11 digits)
  return /^(0\d{9}|61\d{9})$/.test(digits);
}

function validate(input: Partial<InstallEnquiryInput>): {
  ok: boolean;
  errors: Record<string, string>;
  data?: InstallEnquiryInput;
} {
  const errors: Record<string, string> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = "Please enter your name.";
  }
  if (!input.email || !isValidEmail(input.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!input.phone || !isValidAuPhone(input.phone)) {
    errors.phone = "Please enter a valid Australian phone number.";
  }
  if (!input.street || input.street.trim().length < 3) {
    errors.street = "Please enter your street address.";
  }
  if (!input.suburb || input.suburb.trim().length < 2) {
    errors.suburb = "Please enter your suburb.";
  }
  if (!input.postcode || !/^\d{4}$/.test(input.postcode.trim())) {
    errors.postcode = "Please enter a 4-digit postcode.";
  } else if (!isEligiblePostcode(input.postcode)) {
    errors.postcode =
      "This package is currently only available for Central Coast NSW postcodes (2250–2265). " +
      "For installs outside this area, please call " +
      BUSINESS.phone.display +
      ".";
  }
  if (!input.preferredDate) {
    errors.preferredDate = "Please choose a preferred install date.";
  } else {
    const date = new Date(input.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(date.getTime())) {
      errors.preferredDate = "Please enter a valid date.";
    } else if (date < today) {
      errors.preferredDate = "Preferred date must be today or later.";
    }
  }
  if (
    !input.waterSupply ||
    !["town", "tank", "bore", "unsure"].includes(input.waterSupply)
  ) {
    errors.waterSupply = "Please tell us about your water supply.";
  }
  if (
    !input.homeType ||
    !["house", "townhouse", "apartment", "rural", "other"].includes(
      input.homeType
    )
  ) {
    errors.homeType = "Please tell us your home type.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors: {},
    data: input as InstallEnquiryInput,
  };
}

/**
 * Format the enquiry into a plain-text email body suitable for the
 * team's inbox. Not HTML — easier to read on a phone, and the team can
 * reply directly with cc to the customer.
 */
function buildEmailBody(data: InstallEnquiryInput): string {
  return `New install enquiry — ${INSTALL_PACKAGE.name}
─────────────────────────────────────────────────────

Customer
  Name:     ${data.fullName}
  Email:    ${data.email}
  Phone:    ${data.phone}

Install address
  ${data.street}
  ${data.suburb} NSW ${data.postcode}

Site details
  Home type:     ${data.homeType}
  Water supply:  ${data.waterSupply}

Schedule
  Preferred date:   ${data.preferredDate}
  Alternate date:   ${data.alternateDate || "(not provided)"}

Notes from customer
  ${data.notes || "(no notes)"}

─────────────────────────────────────────────────────
Package: ${INSTALL_PACKAGE.name}
Price:   $${INSTALL_PACKAGE.price.toFixed(2)} inc. GST

Next steps
  1. Call the customer within 24 hours to confirm details.
  2. Confirm plumber availability for the requested date.
  3. Send Shopify invoice for $${INSTALL_PACKAGE.price.toFixed(2)} once confirmed.
  4. Lock in install date once invoice is paid.
`;
}

/**
 * Dispatch the enquiry. Currently sends an email via Resend if the
 * RESEND_API_KEY env var is set; otherwise logs to console (so dev
 * works without external services configured).
 */
async function dispatchEnquiry(data: InstallEnquiryInput): Promise<void> {
  const body = buildEmailBody(data);
  const resendKey = process.env.RESEND_API_KEY;
  const recipient = process.env.INSTALL_ENQUIRY_RECIPIENT ?? BUSINESS.email;

  if (!resendKey) {
    // Dev / unconfigured fallback — log the enquiry to the server
    // console so you can see it during local development without
    // setting up email infrastructure.
    console.log(
      "\n┌─ Install enquiry (no email sent — RESEND_API_KEY unset) ─────────"
    );
    body.split("\n").forEach((line) => console.log(`│ ${line}`));
    console.log(
      "└──────────────────────────────────────────────────────────────────\n"
    );
    return;
  }

  // Resend email API. https://resend.com/docs/api-reference/emails/send-email
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Enviro Aqua Website <noreply@enviroaqua.com.au>`,
      to: [recipient],
      reply_to: data.email,
      subject: `New install enquiry — ${data.fullName} (${data.suburb} ${data.postcode})`,
      text: body,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Email dispatch failed: ${response.status} ${errText}`);
  }
}

export async function POST(request: Request) {
  let body: Partial<InstallEnquiryInput>;
  try {
    body = (await request.json()) as Partial<InstallEnquiryInput>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const validation = validate(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 400 }
    );
  }

  try {
    await dispatchEnquiry(validation.data!);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[install-enquiry] dispatch failed", message);
    // Soft-fail to the user — they can still call us. We log loudly
    // server-side so the team can backfill the enquiry from logs.
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't submit your enquiry online — please call us on " +
          BUSINESS.phone.display +
          " and we'll book you in over the phone.",
      },
      { status: 500 }
    );
  }
}