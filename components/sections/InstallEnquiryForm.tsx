"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { isEligiblePostcode, INSTALL_PACKAGE } from "@/lib/install-package";
import { BUSINESS } from "@/lib/business";

/**
 * Install enquiry form. State is held locally; submission posts to
 * /api/install-enquiry which validates server-side and dispatches an
 * email to the team. Form fields below mirror the API's expected
 * shape one-to-one.
 *
 * Form pattern decisions:
 *   - No payment field — this is an enquiry, not a checkout. Customer
 *     pays via Shopify invoice after the team confirms availability.
 *   - Postcode is checked client-side as the user types AND server-side
 *     on submit, so out-of-area customers see the message immediately.
 *   - Date input uses native <input type="date"> for accessibility and
 *     mobile-keyboard correctness; min={today} prevents past dates.
 *   - Inline error messages per-field rather than a single banner —
 *     it's clearer which field needs fixing.
 */

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  suburb: string;
  postcode: string;
  preferredDate: string;
  alternateDate: string;
  waterSupply: "" | "town" | "tank" | "bore" | "unsure";
  homeType: "" | "house" | "townhouse" | "apartment" | "rural" | "other";
  notes: string;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  suburb: "",
  postcode: "",
  preferredDate: "",
  alternateDate: "",
  waterSupply: "",
  homeType: "",
  notes: "",
};

export function InstallEnquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const update =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const today = new Date().toISOString().split("T")[0];

  // Client-side postcode hint — server still validates on submit but
  // showing this immediately stops out-of-area customers wasting time.
  const postcodeOutOfArea =
    form.postcode.length === 4 && !isEligiblePostcode(form.postcode);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setGeneralError(null);

    try {
      const res = await fetch("/api/install-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok: boolean;
        errors?: Record<string, string>;
        error?: string;
      };

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        if (data.error) setGeneralError(data.error);
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setGeneralError(
        "Couldn't submit your enquiry. Please call us on " +
          BUSINESS.phone.display +
          " and we'll book you in directly."
      );
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-mist border border-line rounded-sm p-8 lg:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-success/10 text-success">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-5 h-5"
              aria-hidden
            >
              <path
                d="m3.5 8.5 3 3 6-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="text-2xl font-semibold tracking-tight">
            Got it — thanks {form.fullName.split(" ")[0]}.
          </h2>
        </div>
        <p className="text-base text-ink/85 leading-relaxed">
          Your enquiry is in. We&rsquo;ll call you on{" "}
          <strong className="tabular">{form.phone}</strong> within 24 hours
          (during business hours) to confirm your install address and check
          plumber availability for{" "}
          <strong>
            {new Date(form.preferredDate).toLocaleDateString("en-AU", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </strong>
          .
        </p>
        <p className="text-base text-ink/85 leading-relaxed mt-4">
          A confirmation has been queued to{" "}
          <strong>{form.email}</strong>. If anything is urgent, call us
          directly on{" "}
          <a
            href={`tel:${BUSINESS.phone.tel}`}
            className="text-brand hover:text-brand-700 underline underline-offset-4 tabular font-medium"
          >
            {BUSINESS.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-paper border border-line rounded-sm p-6 lg:p-8 space-y-6"
      noValidate
    >
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
          Step 1 — About you
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="text-sm font-medium block mb-1.5"
            >
              Full name
            </label>
            <Input
              id="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => update("fullName")(e.target.value)}
              required
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName && (
              <p className="text-xs text-danger mt-1">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-sm font-medium block mb-1.5"
            >
              Phone
            </label>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="04XX XXX XXX"
              value={form.phone}
              onChange={(e) => update("phone")(e.target.value)}
              required
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && (
              <p className="text-xs text-danger mt-1">{errors.phone}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="text-sm font-medium block mb-1.5"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email")(e.target.value)}
              required
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && (
              <p className="text-xs text-danger mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
          Step 2 — Install address
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
          <div className="sm:col-span-6">
            <label
              htmlFor="street"
              className="text-sm font-medium block mb-1.5"
            >
              Street address
            </label>
            <Input
              id="street"
              type="text"
              autoComplete="address-line1"
              value={form.street}
              onChange={(e) => update("street")(e.target.value)}
              required
              aria-invalid={Boolean(errors.street)}
            />
            {errors.street && (
              <p className="text-xs text-danger mt-1">{errors.street}</p>
            )}
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="suburb"
              className="text-sm font-medium block mb-1.5"
            >
              Suburb
            </label>
            <Input
              id="suburb"
              type="text"
              autoComplete="address-level2"
              value={form.suburb}
              onChange={(e) => update("suburb")(e.target.value)}
              required
              aria-invalid={Boolean(errors.suburb)}
            />
            {errors.suburb && (
              <p className="text-xs text-danger mt-1">{errors.suburb}</p>
            )}
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="postcode"
              className="text-sm font-medium block mb-1.5"
            >
              Postcode
            </label>
            <Input
              id="postcode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={4}
              value={form.postcode}
              onChange={(e) =>
                update("postcode")(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              required
              aria-invalid={Boolean(errors.postcode) || postcodeOutOfArea}
            />
            {errors.postcode ? (
              <p className="text-xs text-danger mt-1">{errors.postcode}</p>
            ) : postcodeOutOfArea ? (
              <p className="text-xs text-warning mt-1">
                This package is currently only available for Central Coast NSW
                postcodes (2250–2265). Outside this area? Call{" "}
                {BUSINESS.phone.display}.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
          Step 3 — About your home
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="homeType"
              className="text-sm font-medium block mb-1.5"
            >
              Home type
            </label>
            <Select
              id="homeType"
              value={form.homeType}
              onChange={(e) =>
                update("homeType")(e.target.value as FormState["homeType"])
              }
              required
              aria-invalid={Boolean(errors.homeType)}
            >
              <option value="">Choose…</option>
              <option value="house">House (freestanding)</option>
              <option value="townhouse">Townhouse</option>
              <option value="apartment">Apartment / unit</option>
              <option value="rural">Rural property</option>
              <option value="other">Other</option>
            </Select>
            {errors.homeType && (
              <p className="text-xs text-danger mt-1">{errors.homeType}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="waterSupply"
              className="text-sm font-medium block mb-1.5"
            >
              Water supply
            </label>
            <Select
              id="waterSupply"
              value={form.waterSupply}
              onChange={(e) =>
                update("waterSupply")(
                  e.target.value as FormState["waterSupply"]
                )
              }
              required
              aria-invalid={Boolean(errors.waterSupply)}
            >
              <option value="">Choose…</option>
              <option value="town">Town water (mains)</option>
              <option value="tank">Rainwater tank</option>
              <option value="bore">Bore / well</option>
              <option value="unsure">Not sure</option>
            </Select>
            {errors.waterSupply && (
              <p className="text-xs text-danger mt-1">{errors.waterSupply}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
          Step 4 — Preferred install date
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="preferredDate"
              className="text-sm font-medium block mb-1.5"
            >
              Preferred date
            </label>
            <Input
              id="preferredDate"
              type="date"
              min={today}
              value={form.preferredDate}
              onChange={(e) => update("preferredDate")(e.target.value)}
              required
              aria-invalid={Boolean(errors.preferredDate)}
            />
            {errors.preferredDate && (
              <p className="text-xs text-danger mt-1">{errors.preferredDate}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="alternateDate"
              className="text-sm font-medium block mb-1.5"
            >
              Alternate date{" "}
              <span className="text-muted font-normal">(optional)</span>
            </label>
            <Input
              id="alternateDate"
              type="date"
              min={today}
              value={form.alternateDate}
              onChange={(e) => update("alternateDate")(e.target.value)}
            />
          </div>
        </div>
        <p className="text-xs text-muted mt-2">
          Final install date is confirmed once we&rsquo;ve checked plumber
          availability — usually within 48 hours.
        </p>
      </div>

      <div>
        <label htmlFor="notes" className="text-sm font-medium block mb-1.5">
          Anything else?{" "}
          <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          value={form.notes}
          onChange={(e) => update("notes")(e.target.value)}
          rows={4}
          className="w-full text-base text-ink bg-paper border border-line rounded-sm px-3 py-2.5 leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          placeholder="Existing filter? Specific install location? Access notes for the plumber?"
        />
      </div>

      {generalError && (
        <div
          role="alert"
          className="border-l-2 border-danger bg-danger/5 p-4 rounded-sm text-sm text-ink"
        >
          {generalError}
        </div>
      )}

      <div className="pt-2">
        <Button type="submit" size="lg" block disabled={submitting}>
          {submitting ? "Submitting…" : `Request install — $${INSTALL_PACKAGE.price.toFixed(2)}`}
        </Button>
        <p className="text-xs text-muted mt-3 text-center leading-relaxed">
          No payment now. We confirm plumber availability and send your
          itemised invoice within 24–48 hours. Pay only once you&rsquo;re
          happy with the date.
        </p>
      </div>
    </form>
  );
}