"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Drawer } from "@/components/ui/Drawer";
import { CATEGORIES } from "@/lib/categories";
import { BUSINESS, compactHoursString } from "@/lib/business";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** Tapping the inline search field closes the menu and signals the
   *  parent header to open the SearchOverlay modal — the same modal
   *  used on desktop, so search behaviour is identical across breakpoints. */
  onOpenSearch: () => void;
  /** Tapping the cart icon (if surfaced inside the menu) closes the menu
   *  and signals the parent to open CartDrawer. Currently the menu
   *  doesn't surface cart inside; the cart icon stays in the header
   *  toolbar. Kept on the API for symmetry / future use. */
  onOpenCart: () => void;
}

/**
 * Mobile navigation drawer. Slides in from the LEFT (mirroring the cart
 * drawer which slides in from the right). Reuses the existing Drawer
 * component for focus management, body-scroll lock, escape-to-close and
 * dimmed-overlay tap-to-close.
 *
 * Categories render expanded — no accordion. The 3-tier taxonomy with
 * 20 sub-categories total fits comfortably in a single scrollable column,
 * and one tap (vs two taps via accordion) is what mobile users want.
 *
 * Section headers (WATER FILTERS, BUBBLERS & COOLERS, MORE) are tappable
 * links to the category landing page, visually distinct from the
 * indented sub-category links beneath them.
 */
export function MobileMenu({ open, onClose, onOpenSearch }: MobileMenuProps) {
  const pathname = usePathname();

  // Close on route change. Same pattern as CartDrawer — covers the case
  // where a sub-category Link fires onClick={onClose} but navigation runs
  // in parallel and the drawer is briefly visible overlaid on the
  // destination page during transition.
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleSearchTap = () => {
    onClose();
    // Defer one frame so the close animation has time to start before
    // the search overlay opens — otherwise both modals are visible for
    // a moment which looks broken.
    requestAnimationFrame(() => onOpenSearch());
  };

  return (
    <Drawer open={open} onClose={onClose} title="Menu" side="left">
      <div className="px-6 py-5 flex flex-col gap-6">
        {/* Search — tap-to-open the existing SearchOverlay modal */}
        <button
          type="button"
          onClick={handleSearchTap}
          aria-label="Search products"
          className="flex items-center gap-3 w-full h-12 px-4 bg-mist border border-line rounded-sm text-left text-sm text-muted hover:border-ink transition-colors duration-fast"
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden>
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Search products…</span>
        </button>

        {/* Category sections */}
        <nav aria-label="Mobile categories" className="flex flex-col">
          {CATEGORIES.map((cat) => (
            <section key={cat.slug} className="border-t border-line pt-5 pb-1">
              <Link
                href={`/shop/${cat.slug}`}
                onClick={onClose}
                className="block text-xs uppercase tracking-[0.18em] text-muted hover:text-brand font-semibold transition-colors duration-fast"
              >
                {cat.navLabel}
              </Link>
              <ul className="mt-3 flex flex-col">
                {cat.subCategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/shop/${cat.slug}/${sub.slug}`}
                      onClick={onClose}
                      className="block py-2 pl-3 -ml-3 text-base text-ink hover:text-brand transition-colors duration-fast"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Blog — top-level link, not a category */}
          <section className="border-t border-line pt-5 pb-1">
            <Link
              href="/blog"
              onClick={onClose}
              className="block text-xs uppercase tracking-[0.18em] text-muted hover:text-brand font-semibold transition-colors duration-fast"
            >
              Blog
            </Link>
          </section>
        </nav>

        {/* Filter finder CTA — the brand's signature decision-support entry */}
        <Link
          href="/help/which-filter"
          onClick={onClose}
          className="flex items-center justify-between gap-3 h-12 px-4 bg-brand text-paper rounded-sm font-medium text-sm hover:bg-brand-700 transition-colors duration-fast"
        >
          <span>Help me choose a filter</span>
          <span aria-hidden>→</span>
        </Link>

        {/* Contact + showroom info */}
        <div className="border-t border-line pt-5 flex flex-col gap-3">
          <a
            href={`tel:${BUSINESS.phone.tel}`}
            className="flex items-center gap-3 h-11 text-sm font-medium text-ink hover:text-brand transition-colors duration-fast"
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden>
              <path
                d="M5 4h3l1 4-2 1a8 8 0 0 0 4 4l1-2 4 1v3a1 1 0 0 1-1 1A12 12 0 0 1 4 5a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="tabular">Call {BUSINESS.phone.display}</span>
          </a>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="flex items-center gap-3 h-11 text-sm font-medium text-ink hover:text-brand transition-colors duration-fast"
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden>
              <path
                d="M3 5h14v10H3z M3 5l7 5 7-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span>{BUSINESS.email}</span>
          </a>
          <p className="text-xs text-muted leading-relaxed mt-1">
            Wyong showroom · {compactHoursString()}
          </p>
        </div>
      </div>
    </Drawer>
  );
}
