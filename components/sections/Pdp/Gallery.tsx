"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  images: string[];
  alt: string;
}

export function Gallery({ images, alt }: GalleryProps) {
  const [leadIndex, setLeadIndex] = useState(0);
  if (images.length === 0) return null;

  const lead = images[leadIndex]!;
  const hasMultiple = images.length > 1;

  const goPrev = () =>
    setLeadIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setLeadIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative aspect-square bg-mist rounded-sm overflow-hidden">
      <Image
        src={lead}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        priority
        className="object-contain p-10 lg:p-14"
      />

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-white/80 hover:bg-white border border-line text-ink transition-colors duration-fast"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-white/80 hover:bg-white border border-line text-ink transition-colors duration-fast"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
