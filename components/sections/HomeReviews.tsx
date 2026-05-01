/**
 * Customer reviews lifted from the live enviroaqua.com.au site. Each one
 * is a real, attributable review from Google or Facebook — first names
 * preserved, source labelled. We don't editorialise the copy.
 *
 * Note: review schema (AggregateRating / Review) is intentionally NOT
 * emitted as JSON-LD here, because Google requires the reviews to be
 * verifiable on a third-party platform AND for the merchant to own the
 * source. When the team imports verified reviews via a tool like Reviews.io
 * or Yotpo, swap this to use that data with proper schema.
 */
const REVIEWS = [
  {
    quote:
      "Fantastic customer service. Had an issue with a 12v tap. Staff identified the problem and even came out to the car and fixed it on the spot.",
    author: "Steve Clark",
    source: "Google",
  },
  {
    quote:
      "I contacted via Facebook enquiring on how to fix my sputtering mixer tap. A prompt reply with pictures and a how-to guide got my tap working perfectly once I cleaned the rust from the filter. The speed of reply and helpfulness makes me rate Enviro Aqua 5 stars.",
    author: "John",
    source: "Google",
  },
  {
    quote:
      "Great product quality with a fair price. Honestly, the best solutions to stop buying bottled water and spend hundreds of dollars!",
    author: "Salah H. Ashqar",
    source: "Facebook",
  },
];

export function HomeReviews() {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="border-y border-line bg-paper"
    >
      <div className="container-site py-20 lg:py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
            What our customers say
          </p>
          <h2
            id="reviews-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight"
          >
            Real reviews from Google &amp; Facebook.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {REVIEWS.map((review) => (
            <figure key={review.author} className="border-t border-ink pt-6">
              <div
                className="flex gap-0.5 mb-5 text-brand"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-hidden
                  >
                    <path d="M8 0l2.4 5.4L16 6.2l-4 3.9.9 5.6L8 13l-4.9 2.7L4 10.1 0 6.2l5.6-.8L8 0Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-base text-ink leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <p className="font-medium text-ink">{review.author}</p>
                <p className="text-muted text-xs mt-0.5 uppercase tracking-wider">
                  via {review.source}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
