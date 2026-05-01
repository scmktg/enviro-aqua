import type { Certification } from "@/types/product";

interface CertificationBadgesProps {
  certifications: Certification[];
  /** Visual treatment. Compact = chip strip; detailed = labelled rows. */
  variant?: "compact" | "detailed";
  className?: string;
}

const CERT_LABEL: Record<Certification, string> = {
  WaterMark: "WaterMark",
  WELS: "WELS Rated",
  NSF: "NSF Certified",
  "AS/NZS 4020": "AS/NZS 4020",
  "AS/NZS 3497": "AS/NZS 3497",
};

const CERT_DESCRIPTION: Record<Certification, string> = {
  WaterMark:
    "Australian Building Codes Board mandatory certification for plumbing products connected to mains water.",
  WELS: "Water Efficiency Labelling and Standards — required for tapware sold in Australia.",
  NSF: "NSF International — independent certification of materials in contact with drinking water.",
  "AS/NZS 4020":
    "Australian/New Zealand Standard for materials in contact with drinking water.",
  "AS/NZS 3497":
    "Australian/New Zealand Standard for plumbed-in drinking water treatment units.",
};

/**
 * Renders certification badges only for products that genuinely carry
 * them. Returns null when the certifications array is empty — this is
 * the pattern that prevents misleading claims: empty-array → no badges,
 * full stop. Never renders a "no certifications" or "pending" state.
 */
export function CertificationBadges({
  certifications,
  variant = "compact",
  className,
}: CertificationBadgesProps) {
  if (certifications.length === 0) return null;

  if (variant === "detailed") {
    return (
      <dl
        aria-label="Certifications"
        className={`space-y-3 ${className ?? ""}`}
      >
        {certifications.map((cert) => (
          <div
            key={cert}
            className="grid grid-cols-[120px_1fr] gap-3 text-sm"
          >
            <dt className="font-medium text-ink">{CERT_LABEL[cert]}</dt>
            <dd className="text-ink/75 leading-relaxed">
              {CERT_DESCRIPTION[cert]}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <ul
      aria-label="Certifications"
      className={`flex flex-wrap items-center gap-1.5 ${className ?? ""}`}
    >
      {certifications.map((cert) => (
        <li
          key={cert}
          className="inline-flex items-center gap-1.5 h-6 px-2 bg-mist border border-line rounded-sm text-xs font-medium text-ink"
          title={CERT_DESCRIPTION[cert]}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-3 h-3 text-brand"
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
          {CERT_LABEL[cert]}
        </li>
      ))}
    </ul>
  );
}
