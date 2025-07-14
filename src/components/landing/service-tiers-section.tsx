"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

export function ServiceTiersSection() {
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
      href: "#community",
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
                <Button 
                  className="w-full" 
                  variant={tier.variant}
                  size="lg"
                  asChild
                >
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
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