// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getProducts, formatPrice } from "@/lib/woo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function HomePage() {
  const products = await getProducts({ per_page: 8 });

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-neutral-50 border-b">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <Badge variant="secondary" className="mb-4">
            Shipped fast from NSW Central Coast
          </Badge>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">
            Clean water for every Australian home
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
            Whole-house systems, under-sink filters, and benchtop solutions —
            trusted by plumbers, builders, and homeowners across Australia.
          </p>
          <div className="mt-8 flex gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/shop">Shop Water Filters</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/whole-house">Whole House Systems</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trending products */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-neutral-900">
              Trending Products
            </h2>
            <p className="text-neutral-600 mt-1">
              Our most popular water filtration systems
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm text-neutral-900 underline underline-offset-4"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group"
            >
              <Card className="overflow-hidden border-neutral-200 hover:border-neutral-400 transition-colors">
                <div className="relative aspect-square bg-neutral-100">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt || product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {product.on_sale && (
                    <Badge className="absolute top-2 left-2 bg-red-600">
                      Sale
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm text-neutral-900 line-clamp-2 min-h-10">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-neutral-900">
                      {formatPrice(
                        product.prices.price,
                        product.prices.currency_minor_unit,
                        product.prices.currency_symbol
                      )}
                    </span>
                    {product.is_in_stock ? (
                      <span className="text-xs text-green-700">In stock</span>
                    ) : (
                      <span className="text-xs text-neutral-500">Sold out</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}