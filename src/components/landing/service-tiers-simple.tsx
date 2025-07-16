"use client";

import { Check, X, Sparkles, Rocket, Crown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    price: "$47",
    description: "Perfect for beginners ready to start their AI journey",
    icon: Sparkles,
    features: [
      "AI Business Blueprint (7 Models)",
      "Claude Code Crash Course",
      "Cursor Setup Guide",
      "Basic Email Support",
      "Community Access",
    ],
    notIncluded: [
      "1-on-1 Coaching Calls",
      "Done-for-You Services",
      "Advanced Strategies",
    ],
    cta: "Start Learning",
    href: "#",
    popular: false,
  },
  {
    name: "Professional",
    price: "$297",
    description: "Everything you need to build a profitable AI business",
    icon: Rocket,
    features: [
      "Everything in Starter",
      "Weekly Group Coaching Calls",
      "Done-for-You Templates",
      "Client Acquisition System",
      "Advanced Automation Workflows",
      "Private Mastermind Access",
      "30-Day Money Back Guarantee",
    ],
    notIncluded: [
      "1-on-1 Private Coaching",
    ],
    cta: "Get Instant Access",
    href: "#",
    popular: true,
  },
  {
    name: "VIP",
    price: "$997",
    description: "White-glove service for serious entrepreneurs",
    icon: Crown,
    features: [
      "Everything in Professional",
      "Weekly 1-on-1 Coaching (4x/month)",
      "Done-With-You Implementation",
      "Custom Business Strategy",
      "Priority Support (24h response)",
      "Lifetime Updates",
      "Partner Network Access",
      "Revenue Share Opportunities",
    ],
    notIncluded: [],
    cta: "Apply Now",
    href: "#",
    popular: false,
  },
];

export function ServiceTiersSimple() {
  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-3xl text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4">
            <Sparkles className="mr-2 h-3 w-3" />
            Limited Time Launch Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Path to Success
          </h2>
          <p className="text-lg text-muted-foreground">
            Join 500+ students who are building profitable AI businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
                {tier.popular && (
                  <div className="relative">
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pt-8">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <tier.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.name !== "VIP" && <span className="text-muted-foreground">/one-time</span>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {tier.notIncluded.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 opacity-50">
                        <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={tier.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href={tier.href}>
                      {tier.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            🔒 Secure payment via Stripe • 30-day money-back guarantee • Instant access
          </p>
        </motion.div>
      </div>
    </section>
  );
}