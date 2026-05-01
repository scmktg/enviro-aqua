import type { Product } from "@/types/product";

interface FitsWithProps {
  product: Product;
}

/**
 * "Fits with" — addresses the #1 fitment question by sub-category.
 * Replacement cartridges show housing-size compatibility; whole-house
 * systems show what they pair with for drinking water; etc.
 *
 * This is intentionally a small, focused module — it's not trying to
 * be a feature list, it's answering the specific "will this work with
 * what I have?" question.
 */
export function FitsWith({ product }: FitsWithProps) {
  const note = compatibilityNote(product);
  if (!note) return null;

  return (
    <aside
      aria-label="Compatibility"
      className="mt-8 bg-brand-50 border-l-2 border-brand p-5 rounded-sm"
    >
      <p className="text-xs uppercase tracking-[0.18em] text-brand mb-2 font-medium">
        Fits with
      </p>
      <p className="text-sm text-ink leading-relaxed">{note}</p>
    </aside>
  );
}

function compatibilityNote(product: Product): string | null {
  if (product.subCategory === "replacement-cartridges") {
    const size = product.facets.housing_size;
    if (size) {
      return `Standard ${size} Australian filter housing — fits all Enviro Aqua under-sink and whole-house systems with that housing size, plus most third-party Big Blue and slim-line filters.`;
    }
    return "Standard Australian filter housing — fits all Enviro Aqua systems and most third-party Big Blue and slim-line filters.";
  }
  if (product.subCategory === "whole-house") {
    return "Pair with an under-sink RO system for drinking water, or add UV sterilisation if you're on tank or bore supply. Standard 10\" or 20\" cartridges available everywhere in Australia.";
  }
  if (product.subCategory === "reverse-osmosis") {
    return "Works with our 3-way kitchen mixers and dedicated RO drinking-water faucets. Pre-filter cartridges fit every standard 10\" x 2.5\" housing.";
  }
  if (product.subCategory === "filtered-bubblers") {
    return "Direct-connects to mains water. Annual service kits available for ongoing filter replacement. Multi-site project quotes on five units or more.";
  }
  if (product.subCategory === "ro-3way-taps" || product.subCategory === "dedicated-ro-taps") {
    return "Pairs with every Enviro Aqua under-sink RO system. Standard 35mm Australian sink cut-out.";
  }
  return null;
}
