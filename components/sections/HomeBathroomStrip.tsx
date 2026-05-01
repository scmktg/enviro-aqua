import Link from "next/link";

/**
 * Bathroom is the lowest-priority category on the site. We give it a
 * single-line strip on the homepage rather than a full section — enough
 * to satisfy users who actually want it, not enough to confuse Google
 * about what this site primarily sells.
 *
 * Note: no H2, no images, no rich copy. Google's heuristics around
 * "what is this page about?" weight section size and content depth, and
 * a 4-line strip carries far less topical weight than a full image
 * grid would. That's the point.
 */
export function HomeBathroomStrip() {
  return (
    <section
      aria-labelledby="bathroom-strip"
      className="bg-mist border-y border-line"
    >
      <div className="container-site py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 lg:gap-8 items-center">
        <p
          id="bathroom-strip"
          className="text-xs uppercase tracking-[0.18em] text-muted"
        >
          Bathroom
        </p>
        <p className="text-sm text-ink/85 leading-relaxed">
          Building a bathroom alongside your filter system? We stock a focused
          range of WELS-rated toilets, vanities, mixer taps and floor drains —
          for fit-out projects already buying filtration from us.
        </p>
        <Link
          href="/shop/bathroom"
          className="text-sm font-medium text-brand hover:text-brand-700 transition-colors duration-fast inline-flex items-center gap-1.5 lg:justify-self-end"
        >
          Browse bathroom
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
