import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { CartDrawer } from "@/components/sections/CartDrawer";
import { BUSINESS } from "@/lib/business";
import { localBusinessJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://enviroaqua.com.au"
  ),
  title: {
    default:
      "Water Filters Australia — Wyong NSW Central Coast | Enviro Aqua",
    template: "%s | Enviro Aqua",
  },
  description: `Australia's water filter specialists, based in Wyong NSW. Whole-house, under-sink, bench-top and reverse osmosis systems. Plus WaterMark-certified commercial drinking bubblers for schools, gyms and offices. Same-day dispatch on orders before ${BUSINESS.dispatch.cutoffTime}. Click & Collect from our Wyong showroom.`,
  keywords: [
    "water filter Australia",
    "water filter Central Coast",
    "water filter Wyong",
    "water filter NSW",
    "whole house water filter",
    "under sink water filter",
    "bench top water filter",
    "reverse osmosis Australia",
    "commercial bubbler",
    "filtered drinking fountain",
    "WaterMark water filter",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Enviro Aqua",
    title: "Enviro Aqua — Water Filters Wyong, NSW Central Coast",
    description:
      "Whole-house, under-sink, bench-top and reverse osmosis water filters from Wyong NSW. WaterMark-certified commercial drinking bubblers. Australia-wide shipping.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enviro Aqua — Water Filters Wyong, NSW Central Coast",
    description:
      "Whole-house, under-sink, bench-top and reverse osmosis water filters from Wyong NSW. WaterMark-certified commercial drinking bubblers. Australia-wide shipping.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] bg-paper text-ink border border-line px-3 py-2 text-sm rounded-sm"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: localBusinessJsonLd() }}
        />
      </body>
    </html>
  );
}
