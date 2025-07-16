"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Loader2, Zap, Rocket, Crown, ArrowRight } from "lucide-react";
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
      name: "Self-Paced",
      icon: Zap,
      price: "$497",
      originalPrice: "$997",
      frequency: "lifetime access",
      description: "Everything you need to build & launch",
      features: [
        "Complete AI Development System",
        "7 Proven Business Templates",
        "Claude + Cursor Mastery Course",
        "No-Code Automation Workflows",
        "Private Discord Community",
        "Weekly Group Q&A Calls",
        "Lifetime Updates",
        "30-Day Money-Back Guarantee",
      ],
      cta: "Start Building Today",
      href: "/checkout/self-paced",
      variant: "outline" as const,
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      name: "Accelerator",
      icon: Rocket,
      price: "$1,497",
      originalPrice: "$2,997",
      frequency: "8-week program",
      description: "Fast-track to your first $10K month",
      features: [
        "Everything in Self-Paced",
        "8 Weekly Live Implementation Calls",
        "Done-With-You App Building",
        "Personal Launch Strategy",
        "1-on-1 Onboarding Call",
        "Direct Slack Access",
        "Client Acquisition Templates",
        "First 10 Customers Playbook",
        "Priority Support",
      ],
      cta: "Join Next Cohort",
      href: "/checkout/accelerator",
      variant: "default" as const,
      badge: "MOST POPULAR",
      popular: true,
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      name: "Partnership",
      icon: Crown,
      price: "$4,997",
      originalPrice: "$9,997",
      frequency: "12-week intensive",
      description: "We build and scale together",
      features: [
        "Everything in Accelerator",
        "We Build Your First Product",
        "Launch Strategy & Execution",
        "Revenue Share Partnership",
        "Weekly 1-on-1 Strategy Calls",
        "Custom Tech Stack Setup",
        "Team Training (up to 5)",
        "12 Months Priority Support",
        "$100K Revenue Guarantee",
      ],
      cta: "Apply Now",
      href: "/apply/partnership",
      variant: "outline" as const,
      limited: true,
      gradient: "from-amber-500/10 to-orange-500/10",
    },
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 gradient-mesh opacity-20" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Sparkles className="mr-2 h-3 w-3" />
            Limited Time Launch Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Choose Your Path to
            <span className="text-gradient"> $10K/Month</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join 500+ non-technical founders who are building profitable businesses with AI. 
            Pick the support level that matches your goals.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative transition-all duration-300 hover:shadow-xl ${tier.popular ? "border-primary shadow-lg scale-105" : "hover:scale-[1.02]"}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="px-4 py-1.5 bg-gradient-primary text-white border-0">
                    <Sparkles className="mr-1 h-3 w-3" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="relative">
                <div className={`absolute inset-0 ${tier.gradient} opacity-5 rounded-t-lg`} />
                <div className="relative z-10">
                  <tier.icon className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                  <div className="mt-6 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                      {tier.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">{tier.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{tier.frequency}</span>
                  </div>
                  {tier.limited && (
                    <Badge variant="secondary" className="mt-3">
                      Limited Spots Available
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                {tier.name === "Self-Paced" ? (
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
                    className={`w-full group ${
                      tier.popular 
                        ? "bg-gradient-primary text-white hover:shadow-lg" 
                        : tier.name === "Partnership" 
                          ? "border-2 border-primary hover:bg-primary/5" 
                          : ""
                    }`}
                    variant={tier.variant}
                    size="lg"
                    asChild
                  >
                    <Link href={tier.href} className="flex items-center justify-center">
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
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