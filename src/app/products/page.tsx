import { Metadata } from "next";
import Link from "next/link";
import productCatalog from "../../../content/products/catalog.json";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "Products - The Vibe Launch",
  description: "AI-powered marketing tools and resources to accelerate your growth",
};

export default function ProductsPage() {
  const formatPrice = (cents: number) => {
    if (cents === 0) return "Free";
    return `$${(cents / 100).toFixed(0)}`;
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "free": return <Sparkles className="w-4 h-4" />;
      case "tripwire": return <Zap className="w-4 h-4" />;
      case "premium": return <Crown className="w-4 h-4" />;
      default: return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "free": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "tripwire": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "premium": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default: return "";
    }
  };

  const publishedProducts = productCatalog.products.filter(p => p.status === "testing" || p.status === "published");

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Marketing Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to leverage AI for marketing success. From free tools to premium solutions.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedProducts.map((product) => (
              <Card key={product.id} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                {/* Tier Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={getTierColor(product.tier)} variant="outline">
                    {getTierIcon(product.tier)}
                    <span className="ml-1">{product.tier}</span>
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl pr-20">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      {formatPrice(product.price)}
                    </span>
                    {product.tier === "tripwire" && (
                      <span className="text-muted-foreground line-through">
                        $97
                      </span>
                    )}
                  </div>

                  {/* Key Features */}
                  <ul className="space-y-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {product.features.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        <span className="text-primary">+</span> {product.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full group">
                    <Link href={`/products/${product.slug}`}>
                      {product.price === 0 ? "Get Free Access" : "Learn More"}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Card>
            ))}
          </div>

          {/* Coming Soon Products */}
          {productCatalog.products.filter(p => p.status === "planned" || p.status === "development").length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-center mb-8">Coming Soon</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productCatalog.products
                  .filter(p => p.status === "planned" || p.status === "development")
                  .map((product) => (
                    <Card key={product.id} className="relative opacity-60">
                      <CardHeader>
                        <Badge variant="outline" className="absolute top-4 right-4">
                          Coming Soon
                        </Badge>
                        <CardTitle className="text-xl pr-20">{product.name}</CardTitle>
                        <CardDescription>
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-muted-foreground">
                          {formatPrice(product.price)}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" disabled>
                          Notify Me
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bundle Offers */}
      {productCatalog.bundles.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Bundle Deals</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {productCatalog.bundles.map((bundle) => (
                <Card key={bundle.id} className="relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
                      Save ${(bundle.savings / 100).toFixed(0)}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{bundle.name}</CardTitle>
                    <CardDescription>{bundle.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold">
                          ${(bundle.bundlePrice / 100).toFixed(0)}
                        </span>
                        <span className="text-muted-foreground line-through">
                          ${(bundle.originalPrice / 100).toFixed(0)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Includes:</p>
                        {bundle.products.map((productId) => {
                          const product = productCatalog.products.find(p => p.id === productId);
                          return product ? (
                            <div key={productId} className="text-sm text-muted-foreground">
                              • {product.name}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled={bundle.status !== "published"}>
                      {bundle.status === "published" ? "Get Bundle Deal" : "Coming Soon"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}