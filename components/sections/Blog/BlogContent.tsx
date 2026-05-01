import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogBlock } from "@/types/blog";
import { getProductBySlug } from "@/lib/catalogue";
import { Price } from "@/components/ui/Price";

interface BlogContentProps {
  blocks: BlogBlock[];
}

/**
 * Renders a blog post's body. Typography is tuned for long-form reading:
 *  - `max-w-prose` (68ch) for body copy width
 *  - 18px base, 1.7 line-height
 *  - H2 / H3 with deliberate top-margin and lower-bottom-margin so they
 *    feel attached to the section below
 *  - Inline **bold** spans rendered via the same parser used on PDPs
 *  - Product-link blocks render real product cards with current prices
 *    so internal links are useful, not just navigational
 */
export function BlogContent({ blocks }: BlogContentProps) {
  return (
    <article className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-[17px] leading-[1.7] text-ink/90 max-w-prose"
              >
                {renderInline(block.text)}
              </p>
            );

          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={i}
                  id={block.id}
                  className="text-2xl md:text-[28px] font-semibold tracking-tight text-ink mt-12 mb-1 scroll-mt-32"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={i}
                id={block.id}
                className="text-xl font-semibold tracking-tight text-ink mt-8 mb-1 scroll-mt-32"
              >
                {block.text}
              </h3>
            );

          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={i}
                className={`max-w-prose pl-5 space-y-2 text-[17px] leading-[1.7] text-ink/90 marker:text-muted ${
                  block.ordered ? "list-decimal" : "list-disc"
                }`}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ListTag>
            );
          }

          case "callout":
            return (
              <aside
                key={i}
                className={`max-w-prose border-l-2 pl-5 py-4 my-2 ${
                  block.tone === "warning"
                    ? "border-warning bg-warning/5"
                    : "border-brand bg-brand-50"
                }`}
              >
                {block.title && (
                  <p
                    className={`text-xs uppercase tracking-[0.18em] font-medium mb-1.5 ${
                      block.tone === "warning"
                        ? "text-warning"
                        : "text-brand"
                    }`}
                  >
                    {block.title}
                  </p>
                )}
                <p className="text-[15px] leading-relaxed text-ink/90">
                  {renderInline(block.body)}
                </p>
              </aside>
            );

          case "comparison":
            return (
              <div
                key={i}
                className="max-w-prose overflow-x-auto -mx-4 sm:mx-0"
              >
                <table className="w-full text-sm border-collapse min-w-[480px] mx-4 sm:mx-0">
                  <thead>
                    <tr className="border-b border-ink">
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          scope="col"
                          className="text-left font-semibold p-3 align-bottom"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-line">
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`p-3 align-top ${
                              k === 0 ? "font-medium text-ink" : "text-ink/85"
                            }`}
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "product-link": {
            const products = block.productSlugs
              .map((s) => getProductBySlug(s))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));
            if (products.length === 0) return null;
            return (
              <section
                key={i}
                aria-label={block.heading ?? "Related products"}
                className="my-10 border-y border-line py-10"
              >
                {block.heading && (
                  <h3 className="text-xl font-semibold tracking-tight text-ink mb-1">
                    {block.heading}
                  </h3>
                )}
                {block.blurb && (
                  <p className="text-sm text-ink/75 mb-6 max-w-prose">
                    {block.blurb}
                  </p>
                )}
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        className="group block bg-paper border border-line hover:border-ink rounded-sm overflow-hidden transition-colors duration-fast h-full"
                      >
                        <div className="relative aspect-square bg-mist">
                          {product.images[0] && (
                            <Image
                              src={product.images[0]}
                              alt=""
                              fill
                              sizes="(min-width: 640px) 33vw, 100vw"
                              className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="text-sm font-medium text-ink leading-snug group-hover:text-brand transition-colors duration-fast">
                            {product.title}
                          </h4>
                          <div className="mt-3 flex items-end justify-between">
                            <Price amount={product.price} size="sm" />
                            <span
                              aria-hidden
                              className="text-xs font-medium text-brand inline-flex items-center gap-1 group-hover:gap-1.5 transition-all duration-fast"
                            >
                              View →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }

          case "quote":
            return (
              <blockquote
                key={i}
                className="max-w-prose border-l-2 border-ink pl-5 my-8 italic text-ink/85"
              >
                <p className="text-lg leading-relaxed">
                  &ldquo;{renderInline(block.text)}&rdquo;
                </p>
                {block.attribution && (
                  <footer className="not-italic text-sm text-muted mt-3">
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            );
        }
      })}
    </article>
  );
}

/**
 * Inline renderer — resolves **bold** segments. The blog body uses the
 * same syntax as the PDP long-description renderer for consistency.
 */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
