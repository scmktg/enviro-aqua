// app/page.tsx
export const revalidate = 300;

import Image from "next/image";
import Link from "next/link";
import { getProducts, formatPrice } from "@/lib/woo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Truck, Shield, Factory, MapPin, Check } from "lucide-react";
import { WASI } from "wasi";

function decodeEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Your own Woo/Jetpack-hosted imagery (no external stock)
const HERO_IMAGE =
  "https://i0.wp.com/enviroaqua.com.au/wp-content/uploads/2026/03/whole-house-shower.jpeg?fit=2400%2C1792&ssl=1";
const BENCHTOP_IMAGE =
  "https://i0.wp.com/enviroaqua.com.au/wp-content/uploads/2026/03/caravan_benchtop_filter-scaled.jpeg?fit=2560%2C1717&ssl=1";
const UNDERSINK_IMAGE =
  "https://i0.wp.com/enviroaqua.com.au/wp-content/uploads/2026/03/undersink-filters-scaled.png?fit=1717%2C2560&ssl=1";
const WHOLEHOUSE_IMAGE =
  "https://i0.wp.com/enviroaqua.com.au/wp-content/uploads/2026/03/whole-house-shower.jpeg?fit=2400%2C1792&ssl=1";
const WAREHOUSE_IMAGE =
  "https://i0.wp.com/enviroaqua.com.au/wp-content/uploads/2024/10/Single_Carbon_Filter.jpg?fit=1200%2C1200&ssl=1";

export default async function HomePage() {
  let featured: Awaited<ReturnType<typeof getProducts>> = [];
  let cartridges: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    [featured, cartridges] = await Promise.all([
      getProducts({ per_page: 4 }),
      getProducts({ per_page: 4, category: "filter-cartridges" }),
    ]);
  } catch (err) {
    console.error("Failed to load products:", err);
  }

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-secondary/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="max-w-xl">
              <Badge variant="outline" className="mb-5 border-border text-muted-foreground font-normal">
                <Factory className="h-3 w-3 mr-1.5" />
                Direct from factory · wholesale prices
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.05]">
                Trade-quality water filtration, at wholesale prices.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Whole-house systems, under-sink filters, commercial bubblers — sourced direct
                from the factory and shipped from the NSW Central Coast. Same price for trade
                and homeowners.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/product-category/water-filters">
                    Shop water filters
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/product-category/whole-house">Whole house systems</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent" /> In-stock in Australia
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent" /> Watermark options
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent" /> Phone support
                </span>
              </div>
            </div>
            <div
              className="relative w-full rounded-lg overflow-hidden bg-muted"
              style={{ aspectRatio: "5 / 4" }}
            >
              <Image
  src={HERO_IMAGE}
  alt="Whole-house water filtration system installed"
  fill
  priority
  fetchPriority="high"
  sizes="(max-width: 1024px) 100vw, 50vw"
  className="object-cover"
  quality={85}
/>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TrustItem icon={<Truck className="h-5 w-5" />} title="Fast AU shipping" sub="From NSW Central Coast" />
            <TrustItem icon={<Factory className="h-5 w-5" />} title="Direct import" sub="No middleman markup" />
            <TrustItem icon={<Shield className="h-5 w-5" />} title="Watermark options" sub="Plumbing-compliant" />
            <TrustItem icon={<MapPin className="h-5 w-5" />} title="Real showroom" sub="Wyong, NSW" />
          </div>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            Find your filter
          </h2>
          <p className="text-muted-foreground mt-2">
            Three ways to get clean water, depending on your home.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <CategoryTile
            href="/shop?filter_system=bench-top"
            image={BENCHTOP_IMAGE}
            title="Benchtop filters"
            description="Portable, no plumbing. Plug in and pour."
            priceFrom="From $69.95"
          />
          <CategoryTile
            href="/shop?filter_system=under-sink"
            image={UNDERSINK_IMAGE}
            title="Under-sink filters"
            description="Hidden under the bench, filtered water on tap."
            priceFrom="From $99.95"
          />
          <CategoryTile
            href="/shop?filter_system=whole-house"
            image={WHOLEHOUSE_IMAGE}
            title="Whole-house systems"
            description="Every tap in the house, filtered at the source."
            priceFrom="From $1,199.95"
          />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
                Trending now
              </h2>
              <p className="text-muted-foreground mt-2">Our most-shipped systems this month.</p>
            </div>
            <Link
              href="/shop"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors underline underline-offset-4"
            >
              View all products
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY ENVIRO AQUA */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="max-w-xl">
            <Badge variant="outline" className="mb-4 border-border text-muted-foreground font-normal">
              How we work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground leading-tight">
              We buy direct. You pay less. Nobody in between.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Most water filtration in Australia goes through two or three distributors before it
              reaches you. We cut that chain. Our commercial bubblers start at $999.95 Watermark
              certified — the kind of pricing other suppliers reserve for plumbing trade accounts.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Homeowner or tradie — same price, same stock, same dispatch. Everything ships from
              our Wyong warehouse on the NSW Central Coast.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureRow title="Direct-import pricing" body="No distributor margin, no reseller markup." />
              <FeatureRow title="Same price for everyone" body="Retail or trade — no account games." />
              <FeatureRow title="Watermark where it matters" body="Certified systems for compliant installs." />
              <FeatureRow title="Australian stock" body="Sitting in Wyong, not on a ship overseas." />
            </div>
          </div>
          <div
            className="relative w-full rounded-lg overflow-hidden bg-muted"
            style={{ aspectRatio: "1 / 1" }}
          >
            <Image
  src={WAREHOUSE_IMAGE}
  alt="Whole-house water filtration system installed"
  fill
  priority
  fetchPriority="high"
  sizes="(max-width: 1024px) 100vw, 50vw"
  className="object-cover"
  quality={85}
/>
          </div>
        </div>
      </section>

      {/* CARTRIDGES */}
      {cartridges.length > 0 && (
        <section className="bg-secondary/40 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
                  Replacement cartridges
                </h2>
                <p className="text-muted-foreground mt-2">
                  Stock up and save. Most standard sizes in stock.
                </p>
              </div>
              <Link
                href="/product-category/filter-cartridges"
                className="text-sm font-medium text-foreground hover:text-accent transition-colors underline underline-offset-4"
              >
                All cartridges
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {cartridges.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
        <div className="mb-10 max-w-2xl">
          <Badge variant="outline" className="mb-4 border-border text-muted-foreground font-normal">
            What customers say
          </Badge>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            Five-star rated on Google.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Testimonial
            quote="Fantastic customer service. Had an issue with a 12v tap. Staff identified the problem and even came out to the car and fixed it on the spot."
            author="Steve Clark"
            source="Google review"
          />
          <Testimonial
            quote="Great product quality with a fair price. Honestly, the best solution to stop buying bottled water and spend hundreds of dollars."
            author="Salah H. Ashqar"
            source="Facebook review"
          />
          <Testimonial
            quote="Contacted via Facebook about my sputtering mixer tap — prompt reply with photos and a how-to guide. Tap working perfectly once I cleaned the rust from the filter."
            author="John"
            source="Google review"
          />
        </div>
      </section>

      {/* VISIT US */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
                Come see the systems in person.
              </h2>
              <p className="mt-6 text-background/70 leading-relaxed">
                Our showroom in Wyong has whole-house systems, under-sink setups, and commercial
                bubblers on display. Drop in, bring a water sample, talk to a human.
              </p>
              <div className="mt-8 space-y-3 text-background/80">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-background/60 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-background">6/45 Amsterdam Cct, Wyong NSW 2259</div>
                    <div className="text-sm text-background/60 mt-0.5">NSW Central Coast · 1h 30m north of Sydney</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/showroom">Visit the showroom</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-background/30 text-background hover:bg-background hover:text-foreground"
                  asChild
                >
                  <a href="tel:0287728162">Call (02) 8772 8162</a>
                </Button>
              </div>
            </div>
            <div
              className="relative w-full rounded-lg overflow-hidden bg-background/10"
              style={{ aspectRatio: "16 / 10" }}
            >
              <iframe
                src="https://maps.google.com/maps?q=6%2F45%20Amsterdam%20Cct%2C%20Wyong%20NSW%202259&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Enviro Aqua showroom location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ————————— Components —————————

function TrustItem({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-accent flex-shrink-0">{icon}</div>
      <div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

function CategoryTile({
  href,
  image,
  title,
  description,
  priceFrom,
}: {
  href: string;
  image: string;
  title: string;
  description: string;
  priceFrom: string;
}) {
  return (
    <Link href={href} className="group block">
      <div
        className="relative w-full rounded-lg overflow-hidden bg-muted"
        style={{ aspectRatio: "4 / 3" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end text-background">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-sm text-background/85 mt-1">{description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-medium">{priceFrom}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProductCard({
  product,
}: {
  product: Awaited<ReturnType<typeof getProducts>>[number];
}) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <Card className="overflow-hidden border-border hover:border-muted-foreground/40 transition-colors h-full bg-card">
        <div
          className="relative w-full bg-secondary/40"
          style={{ aspectRatio: "1 / 1" }}
        >
          {product.images[0] && (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-300"
            />
          )}
          {product.on_sale && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-0">
              Sale
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 min-h-10 leading-snug">
            {decodeEntities(product.name)}
          </h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-medium text-foreground">
              {formatPrice(
                product.prices.price,
                product.prices.currency_minor_unit,
                product.prices.currency_symbol
              )}
            </span>
            {product.is_in_stock ? (
              <span className="text-xs text-accent font-medium">In stock</span>
            ) : (
              <span className="text-xs text-muted-foreground">Sold out</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function FeatureRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent/10 text-accent flex items-center justify-center mt-0.5">
        <Check className="h-3.5 w-3.5" />
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{body}</div>
      </div>
    </div>
  );
}

function Testimonial({ quote, author, source }: { quote: string; author: string; source: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col h-full">
      <div className="flex gap-0.5 mb-4 text-accent">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <p className="text-sm text-foreground leading-relaxed mb-5 flex-1">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="text-xs pt-4 border-t border-border">
        <div className="font-medium text-foreground">{author}</div>
        <div className="text-muted-foreground mt-0.5">{source}</div>
      </div>
    </div>
  );
}