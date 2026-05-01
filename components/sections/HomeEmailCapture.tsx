"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/**
 * Email capture with a specific value proposition: cartridge replacement
 * reminders. This is not "subscribe to our newsletter for 10% off" —
 * it's a service-tier signup that solves a real problem for the buyer
 * (forgetting to replace cartridges on time) AND drives recurring revenue
 * for us.
 *
 * The reminder cadence is tied to what they bought, surfaced by Shopify
 * customer + order data once integrated. Today this submission is a stub
 * that just shows a thank-you state.
 */
export function HomeEmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
    // POST /api/subscribe — wired up when the marketing automation backend
    // is connected. Form intentionally degrades to inert success state.
  };

  return (
    <section
      aria-labelledby="email-heading"
      className="container-site py-20 lg:py-24"
    >
      <div className="bg-mist rounded-sm p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            One email a year. Maybe two.
          </p>
          <h2
            id="email-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight"
          >
            Cartridge replacement reminders, sent when you actually need them.
          </h2>
          <p className="text-base text-ink/80 mt-4 leading-relaxed">
            Tell us which system you own. We&rsquo;ll email you 2 weeks before
            your cartridges are due to change — and only then. No newsletter,
            no &ldquo;hey just checking in&rdquo;, no offers we&rsquo;d be
            embarrassed by.
          </p>
        </div>

        {submitted ? (
          <div className="bg-paper border border-line rounded-sm p-6">
            <p className="text-sm font-medium text-success">
              ✓ You&rsquo;re on the list.
            </p>
            <p className="text-sm text-ink/80 mt-2 leading-relaxed">
              We&rsquo;ll be in touch when your cartridge replacement window
              comes up. In the meantime, if you have questions, hit reply on
              the welcome email.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="bg-paper border border-line rounded-sm p-6"
            aria-labelledby="email-heading"
          >
            <label htmlFor="email-input" className="text-sm font-medium">
              Your email
            </label>
            <div className="mt-2 flex flex-col sm:flex-row gap-2">
              <Input
                id="email-input"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" size="md">
                Set reminder
              </Button>
            </div>
            <p className="text-xs text-muted mt-3">
              We&rsquo;ll ask which system you own after you confirm.
              Unsubscribe with one click. Privacy policy applies.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
