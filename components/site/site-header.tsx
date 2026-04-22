// components/site/site-header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { primaryNav } from "@/lib/nav";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b border-border">
      {/* Announcement bar */}
      <div className="bg-foreground text-background text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center">
          Shipped fast from the NSW Central Coast · 5-star Google rated
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 gap-6">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Image src="/logo.png" alt="Enviro Aqua" width={140} height={25} priority />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="px-4 py-4 overflow-y-auto">
                {primaryNav.map((group) => (
                  <div key={group.label} className="mb-6">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                      {group.label}
                    </h3>
                    <ul className="space-y-2">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block py-1.5 text-sm text-foreground hover:text-accent transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Enviro Aqua home">
            <Image
  src="/logo.png"
  alt="Enviro Aqua"
  width={178}
  height={32}
  priority
  className="w-auto h-7 md:h-8"
/>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {primaryNav.map((group) => (
              <div key={group.label} className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors py-2">
                  {group.label}
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-1 w-72 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  <ul className="py-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2.5 hover:bg-secondary transition-colors"
                        >
                          <div className="text-sm font-medium text-foreground">{link.label}</div>
                          {link.description && (
                            <div className="text-xs text-muted-foreground mt-0.5">{link.description}</div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search" asChild>
              <Link href="/search"><Search className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart" asChild>
              <Link href="/cart" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {/* Cart count badge — will wire up in Phase 2 cart step */}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}