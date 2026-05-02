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
import Image from "next/image";

/**
 * Header is now a black ribbon over a white nav bar. The ribbon carries
 * the brand thesis ("same price retail or trade") plus rotating CTAs;
 * the nav itself uses ink-on-paper so it reads cleaner against page
 * content and lets the mega menu open seamlessly on the same surface.
 *
 * Both ribbon and nav stick together — the user always has access to
 * the brand pitch and the cart.
 */
export function Header() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
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
            <div className="container-site h-[64px] flex items-center justify-between gap-6">
              <div className="flex items-center gap-10">
                <Link
                  href="/"
                  aria-label="Enviro Aqua — Australian water filter specialists"
                  className="inline-flex items-center"
                >
                  <Logo />
                </Link>
                <nav aria-label="Primary" className="hidden lg:block">
                  <ul className="flex items-center gap-7">
                    {CATEGORIES.map((cat) => (
                      <li
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
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/blog"
                        className="text-sm font-medium text-ink hover:text-brand transition-colors duration-fast"
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search products"
                  className="h-10 w-10 inline-flex items-center justify-center text-ink hover:text-brand transition-colors duration-fast"
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
    </>
  );
}

function Logo() {
  return (
    <span className="inline-flex items-center">
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