import { Metadata } from "next";
import productCatalog from "../../../content/products/catalog.json";
import { formatGumroadPrice, getProductUrl } from "@/lib/gumroad";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Lock, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products - Vibe Academy",
  description: "Digital products and resources to accelerate your coding journey with AI",
};

const tierConfig = {
  free: {
    badge: "Free",
    color: "bg-green-500",
    icon: Download,
  },
  tripwire: {
    badge: "Popular",
    color: "bg-blue-500",
    icon: Zap,
  },
  premium: {
    badge: "Premium",
    color: "bg-purple-500",
    icon: Sparkles,
  },
};

export default function ProductsPage() {
  const publishedProducts = productCatalog.products.filter(
    (product) => product.status === "published" || product.status === "testing"
  );

  const groupedProducts = {
    free: publishedProducts.filter((p) => p.tier === "free"),
    tripwire: publishedProducts.filter((p) => p.tier === "tripwire"),
    premium: publishedProducts.filter((p) => p.tier === "premium"),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Digital Products & Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Accelerate your coding journey with AI-powered tools and templates
          </p>
        </div>

        {/* Free Products */}
        {groupedProducts.free.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Free Resources</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Start your journey with these high-value free resources
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedProducts.free.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Tripwire Products */}
        {groupedProducts.tripwire.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Essential Tools</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Level up with these affordable, high-impact resources
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedProducts.tripwire.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Premium Products */}
        {groupedProducts.premium.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Premium Solutions</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Professional-grade tools for serious developers
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedProducts.premium.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Bundles */}
        {productCatalog.bundles.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Bundle Deals</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Save big with these curated bundles
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {productCatalog.bundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: typeof productCatalog.products[0] }) {
  const config = tierConfig[product.tier as keyof typeof tierConfig];
  const Icon = config.icon;
  const isComingSoon = product.status === "planned" || product.status === "development";

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      {product.tier !== "free" && (
        <div className="absolute top-4 right-4">
          <Badge className={`${config.color} text-white`}>
            {config.badge}
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-600 capitalize">{product.tier}</span>
        </div>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <div className="text-3xl font-bold">
            {product.price === 0 ? "Free" : formatGumroadPrice(product.price)}
          </div>
        </div>

        <div className="space-y-2">
          {product.features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {feature}
              </span>
            </div>
          ))}
          {product.features.length > 4 && (
            <p className="text-sm text-gray-500 pl-6">
              + {product.features.length - 4} more features
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter>
        {isComingSoon ? (
          <Button className="w-full" disabled>
            <Lock className="mr-2 h-4 w-4" />
            Coming Soon
          </Button>
        ) : product.gumroadId ? (
          <Button className="w-full" asChild>
            <a
              href={getProductUrl(product.slug)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {product.price === 0 ? "Get Free Access" : "Get Instant Access"}
            </a>
          </Button>
        ) : (
          <Button className="w-full" asChild>
            <Link href={`/products/${product.slug}`}>
              Learn More
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function BundleCard({ bundle }: { bundle: typeof productCatalog.bundles[0] }) {
  const savings = bundle.savings;
  const savingsPercent = Math.round((savings / bundle.originalPrice) * 100);

  return (
    <Card className="relative overflow-hidden border-2 border-purple-200 dark:border-purple-800">
      <div className="absolute top-4 right-4">
        <Badge className="bg-red-500 text-white">
          Save {savingsPercent}%
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-2xl">{bundle.name}</CardTitle>
        <CardDescription>{bundle.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <div className="text-gray-500 line-through text-lg">
            {formatGumroadPrice(bundle.originalPrice)}
          </div>
          <div className="text-3xl font-bold text-purple-600">
            {formatGumroadPrice(bundle.bundlePrice)}
          </div>
          <div className="text-green-600 font-semibold">
            You save {formatGumroadPrice(savings)}!
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-sm">This bundle includes:</p>
          {bundle.products.map((productId) => {
            const product = productCatalog.products.find((p) => p.id === productId);
            return product ? (
              <div key={productId} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">{product.name}</span>
              </div>
            ) : null;
          })}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg" disabled={bundle.status !== "published"}>
          {bundle.status === "published" ? "Get Bundle Deal" : "Coming Soon"}
        </Button>
      </CardFooter>
    </Card>
  );
}