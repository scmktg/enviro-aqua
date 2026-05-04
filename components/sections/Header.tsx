"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { CATEGORIES } from "@/lib/categories";
import { useCart, useCartItemCount } from "@/lib/stores/cart-store";
import { BUSINESS } from "@/lib/business";
import { MegaMenu } from "./MegaMenu";
import { HeaderRibbon } from "./HeaderRibbon";
import { SearchOverlay } from "./SearchOverlay";
import { MobileMenu } from "./MobileMenu";
import Image from "next/image";

/**
 * Header is now a black ribbon over a white nav bar. The ribbon carries
 * the brand thesis ("same price retail or trade") plus rotating CTAs;
 * the nav itself uses ink-on-paper so it reads cleaner against page
 * content and lets the mega menu open seamlessly on the same surface.
 *
 * Layout: 3-column CSS grid — logo (left), centred nav (middle), action
 * cluster (right). The middle column collapses to a hamburger button
 * below the `xl` breakpoint (1280px). The hamburger lives at the END of
 * the right cluster (after the cart) — keeps the action zone in one
 * grouped corner rather than splitting nav-trigger and toolbar across
 * two sides of the header.
 *
 * Search icon hides below `xl` because the mobile menu has its own inline
 * search field (and the search overlay is one tap away from there).
 *
 * 1280px is the threshold below which the right cluster (≈250px) makes a
 * centred 4-item nav crowd against the logo; we use the hamburger pattern
 * at all narrower widths including iPad-landscape (1024px), where centred
 * desktop nav would create asymmetric whitespace.
 */
export function Header() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemCount = useCartItemCount();
  const openCart = useCart((s) => s.open);
  const pathname = usePathname();

  // On /cart, the cart icon shouldn't open the slide-in drawer — the user
  // is already viewing the cart. Scroll to top instead, which is the
  // sensible no-op equivalent of "summon the cart".
  const onCartIconClick = () => {
    if (pathname === "/cart") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      openCart();
    }
  };

  // 150ms close-delay on hover-out so the user can move their mouse
  // diagonally to a sub-category without the menu collapsing.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenCategory(null), 150);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <>
      <div className="sticky top-0 z-40">
        <HeaderRibbon />
        <header className="bg-paper text-ink border-b border-line">
          <div className="relative">
            <div className="container-site h-[64px] grid grid-cols-[auto_1fr_auto] items-center gap-6">
              {/* Left: logo */}
              <Link
                href="/"
                aria-label="Enviro Aqua — Australian water filter specialists"
                className="inline-flex items-center cursor-pointer"
              >
                <Logo />
              </Link>

              {/* Centre: nav (xl+ only). Centred via grid `1fr` + flex `justify-center`. */}
              <nav
                aria-label="Primary"
                className="hidden xl:flex items-center justify-center gap-7"
              >
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.slug}
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenCategory(cat.slug);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={`/shop/${cat.slug}`}
                      className="text-sm font-medium text-ink hover:text-brand transition-colors duration-fast inline-flex items-center gap-1.5 py-3"
                      aria-expanded={openCategory === cat.slug}
                    >
                      {cat.navLabel}
                      <svg
                        aria-hidden
                        viewBox="0 0 12 8"
                        className="w-3 h-2"
                        fill="none"
                      >
                        <path
                          d="M1 1.5l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </Link>
                  </div>
                ))}
                <Link
                  href="/blog"
                  className="text-sm font-medium text-ink hover:text-brand transition-colors duration-fast"
                >
                  Blog
                </Link>
              </nav>

              {/* Right: search (xl+ only) + phone + cart + hamburger (below xl) */}
              <div className="flex items-center gap-1 justify-self-end">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search products"
                  className="hidden xl:inline-flex h-10 w-10 items-center justify-center text-ink hover:text-brand transition-colors duration-fast"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-5 h-5"
                    aria-hidden
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="m17 17-3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <a
                  href={`tel:${BUSINESS.phone.tel}`}
                  className="hidden md:inline-flex items-center gap-2 px-3 h-10 text-sm font-medium tabular text-ink hover:text-brand transition-colors duration-fast"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-4 h-4"
                    aria-hidden
                  >
                    <path
                      d="M5 4h3l1 4-2 1a8 8 0 0 0 4 4l1-2 4 1v3a1 1 0 0 1-1 1A12 12 0 0 1 4 5a1 1 0 0 1 1-1Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {BUSINESS.phone.display}
                </a>
                <button
                  type="button"
                  onClick={onCartIconClick}
                  aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                  className="relative h-10 px-3 inline-flex items-center gap-2 text-ink hover:text-brand transition-colors duration-fast"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-5 h-5"
                    aria-hidden
                  >
                    <path
                      d="M3 4h2l2 11h11l1.5-8H6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <circle cx="9" cy="18" r="1" fill="currentColor" />
                    <circle cx="16" cy="18" r="1" fill="currentColor" />
                  </svg>
                  {itemCount > 0 && (
                    <span className="bg-brand text-paper rounded-full text-xs h-5 min-w-[20px] inline-flex items-center justify-center px-1.5 font-medium tabular">
                      {itemCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={mobileMenuOpen}
                  className="xl:hidden h-10 w-10 -mr-2 inline-flex items-center justify-center text-ink hover:text-brand transition-colors duration-fast"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
                    <path
                      d="M3 5h14M3 10h14M3 15h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {openCategory && (
              <div
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <MegaMenu
                  category={CATEGORIES.find((c) => c.slug === openCategory)!}
                  onClose={() => setOpenCategory(null)}
                />
              </div>
            )}
          </div>
        </header>
      </div>
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={openCart}
      />
    </>
  );
}

function Logo() {
  return (
    <span className="inline-flex items-center cursor-pointer">
      <Image
        src="/logo.webp"
        alt="Enviro Aqua"
        width={180}
        height={40}
        priority
        className="h-9 w-auto"
      />
    </span>
  );
}
