"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface GalleryProps {
  images: string[];
  alt: string;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
      />
    </svg>
  );
}

export function Gallery({ images, alt }: GalleryProps) {
  const [leadIndex, setLeadIndex] = useState(0);
  const total = images.length;
  const hasMultiple = total > 1;

  const goPrev = useCallback(
    () => setLeadIndex((i) => (i - 1 + total) % total),
    [total],
  );
  const goNext = useCallback(
    () => setLeadIndex((i) => (i + 1) % total),
    [total],
  );

  useEffect(() => {
    if (!hasMultiple) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasMultiple, goPrev, goNext]);

  if (total === 0) return null;
  const lead = images[leadIndex]!;

  if (hasMultiple) {
    ReactDOM.preload(images[(leadIndex + 1) % total]!, { as: "image" });
  }

  return (
    <div
      className="relative aspect-square bg-mist rounded-sm overflow-hidden"
      aria-roledescription={hasMultiple ? "carousel" : undefined}
      aria-label={hasMultiple ? `${alt} — image gallery` : undefined}
    >
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
            aria-label={`Previous image (${leadIndex + 1} of ${total})`}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-white/80 hover:bg-white border border-line text-ink transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={`Next image (${leadIndex + 1} of ${total})`}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-white/80 hover:bg-white border border-line text-ink transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Chevron direction="right" />
          </button>
        </>
      )}
    </div>
  );
}
