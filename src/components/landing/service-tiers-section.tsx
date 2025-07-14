"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { trackEvents } from "@/components/analytics/google-analytics";

export function ServiceTiersSection() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!session) {
      toast.error("Please sign in to purchase");
      return;
    }

    setIsLoading(true);
    
    // Track checkout intent
    trackEvents.beginCheckout(499);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Price ID will come from env variable
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  const tiers = [
    {
      name: "Community",
      price: "$0",
      frequency: "/forever",
      description: "Join our community and start learning",
      features: [
        "Access to Skool community",
        "Weekly live coding sessions",
        "Basic Cursor rules",
        "Community support",
      ],
      cta: "Join Community",
      href: "https://skool.com/vibe-coding",
      variant: "outline" as const,
    },
    {
      name: "Vibe Academy",
      price: "$499",
      frequency: "one-time",
      description: "Complete course + lifetime updates",
      features: [
        "15+ module video course",
        "All starter kits & templates",
        "Private Discord channel",
        "Weekly group calls",
        "Lifetime updates",
        "Certificate of completion",
      ],
      cta: "Become Founding Member",
      href: "#academy",
      variant: "default" as const,
      badge: "SAVE $200",
      popular: true,
    },
    {
      name: "1:1 Coaching",
      price: "$250",
      frequency: "/hour",
      description: "Personalized guidance from experts",
      features: [
        "Custom learning path",
        "Code review & feedback",
        "Architecture planning",
        "Career guidance",
        "Priority support",
        "Recording of sessions",
      ],
      cta: "Book Discovery Call",
      href: "#coaching",
      variant: "outline" as const,
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-2 h-3 w-3" />
            Limited Time: Founding Member Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Choose Your Learning Path
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, upgrade when you&apos;re ready. All plans include access to our thriving community.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={tier.popular ? "relative border-primary shadow-lg" : ""}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="px-3 py-1">MOST POPULAR</Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.frequency}</span>
                  {tier.badge && (
                    <Badge variant="secondary" className="ml-2">
                      {tier.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                {tier.name === "Vibe Academy" ? (
                  <Button 
                    className="w-full" 
                    variant={tier.variant}
                    size="lg"
                    onClick={handlePurchase}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      tier.cta
                    )}
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    variant={tier.variant}
                    size="lg"
                    asChild
                  >
                    <Link href={tier.href}>{tier.cta}</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            🛡️ 30-day money-back guarantee on all paid plans • No questions asked
          </p>
        </div>

        {/* Agency/Enterprise CTA */}
        <Card className="mt-12 border-dashed">
          <CardHeader className="text-center">
            <CardTitle>Need Custom Training for Your Team?</CardTitle>
            <CardDescription>
              We offer custom workshops and implementation services for agencies and enterprises
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button variant="link" asChild>
              <Link href="#contact">Contact Us for Custom Pricing →</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}