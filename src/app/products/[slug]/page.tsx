import { Metadata } from "next";
import { notFound } from "next/navigation";
import productCatalog from "../../../../content/products/catalog.json";
import { GumroadButton, GumroadScript } from "@/components/gumroad/gumroad-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Star, Users, Clock, RefreshCw, Zap } from "lucide-react";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productCatalog.products.find(p => p.slug === slug);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - The Vibe Launch`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.coverImage],
    },
  };
}

export async function generateStaticParams() {
  return productCatalog.products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productCatalog.products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  const formatPrice = (cents: number) => {
    if (cents === 0) return "Free";
    return `$${(cents / 100).toFixed(0)}`;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "free": return "bg-green-500/10 text-green-500";
      case "tripwire": return "bg-blue-500/10 text-blue-500";
      case "premium": return "bg-purple-500/10 text-purple-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  // Mock testimonials - replace with real ones
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Marketing Director",
      content: "This completely transformed how we approach marketing. The ROI has been incredible!",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Startup Founder",
      content: "Finally, tools that actually deliver on their promises. Worth every penny.",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      role: "Content Creator",
      content: "I've tried dozens of similar products. This is by far the best value I've found.",
      rating: 5,
    },
  ];

  return (
    <>
      <GumroadScript />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge className={getTierColor(product.tier)}>
                    {product.tier.charAt(0).toUpperCase() + product.tier.slice(1)}
                  </Badge>
                  {product.tier === "free" && (
                    <Badge variant="secondary">
                      <Zap className="w-3 h-3 mr-1" />
                      Lead Magnet
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold">
                  {product.name}
                </h1>

                <p className="text-xl text-muted-foreground">
                  {product.description}
                </p>

                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.tier === "tripwire" && (
                    <span className="text-muted-foreground line-through">
                      $97
                    </span>
                  )}
                </div>

                <GumroadButton
                  productUrl={`https://thevibelaunch.gumroad.com/l/${product.slug}`}
                  productId={product.id}
                  text={product.price === 0 ? "Get Free Access" : "Buy Now"}
                  price={product.price > 0 ? formatPrice(product.price) : undefined}
                  size="lg"
                  className="w-full sm:w-auto"
                  isFree={product.price === 0}
                />

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>500+ Happy Customers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Instant Access</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RefreshCw className="w-4 h-4" />
                    <span>30-Day Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative">
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={product.coverImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything You Get
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {product.features.map((feature, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm">{feature}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Deliverables */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">
                What&apos;s Included
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {product.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{deliverable}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Customers Say
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-transparent to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to {product.price === 0 ? "Get Started" : "Level Up"}?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {product.price === 0 
                ? "Join thousands of marketers who are already using AI to transform their workflows."
                : "Don't miss out on this opportunity to accelerate your success."
              }
            </p>
            <GumroadButton
              productUrl={`https://thevibelaunch.gumroad.com/l/${product.slug}`}
              productId={product.id}
              text={product.price === 0 ? "Get Instant Access" : `Get Started for ${formatPrice(product.price)}`}
              size="lg"
              className="mx-auto"
              isFree={product.price === 0}
            />
          </div>
        </section>
      </main>
    </>
  );
}