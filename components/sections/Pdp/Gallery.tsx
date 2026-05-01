"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  images: string[];
  alt: string;
}

/**
 * PDP gallery. For a functional, spec-driven product — water filters,
 * bubblers, taps — buyers want to survey the whole unit, not click
 * through a slideshow. So the layout is:
 *
 *  - Lead image: large, square, full width
 *  - Secondary images: a 2-up grid below, rendered at the same time
 *  - Click any secondary image to swap it into the lead slot
 *
 * This is the editorial pattern Allbirds, Aesop and Tekla use for
 * functional product — it treats the gallery as a survey, not a
 * carousel. The buyer sees the full unit, the label/spec sticker, and
 * any install detail in one scan.
 */
export function Gallery({ images, alt }: GalleryProps) {
  const [leadIndex, setLeadIndex] = useState(0);
  if (images.length === 0) return null;

  const lead = images[leadIndex]!;
  const secondaries = images
    .map((src, i) => ({ src, i }))
    .filter(({ i }) => i !== leadIndex);

  return (
    <div className="space-y-3">
      <div className="relative aspect-square bg-mist rounded-sm overflow-hidden">
        <Image
          src={lead}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
          className="object-contain p-10 lg:p-14"
        />
      </div>

      {secondaries.length > 0 && (
        <ul
          className="grid grid-cols-2 gap-3"
          aria-label="Additional product views"
        >
          {secondaries.map(({ src, i }) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setLeadIndex(i)}
                aria-label={`Show view ${i + 1} as primary`}
                className="block w-full relative aspect-square bg-mist rounded-sm overflow-hidden border border-line hover:border-ink transition-colors duration-fast group"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="object-contain p-6 lg:p-8 transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
