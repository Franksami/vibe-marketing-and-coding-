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

export function ServiceTiersDark() {
  return (
    <section id="pricing" className="py-20 bg-gray-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="mx-auto max-w-3xl text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 border-gray-800 bg-gray-900/50 text-orange-500">
            <Sparkles className="mr-2 h-3 w-3" />
            Limited Time Launch Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Choose Your Path to Success
          </h2>
          <p className="text-lg text-gray-400">
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
              transition={{ delay: index * 0.1 }}
              className={tier.popular ? "relative" : ""}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <Badge className="bg-orange-600 text-white border-0">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full ${
                tier.popular 
                  ? "border-orange-500/50 shadow-orange-500/20 shadow-lg" 
                  : "border-gray-800"
              } bg-gray-900/50 backdrop-blur`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <tier.icon className={`h-8 w-8 ${
                      tier.popular ? "text-orange-500" : "text-gray-400"
                    }`} />
                    {tier.popular && (
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                        Save $200
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                  <CardDescription className="text-gray-400">{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-500">/one-time</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {tier.notIncluded.length > 0 && (
                    <div className="pt-4 border-t border-gray-800 space-y-3">
                      {tier.notIncluded.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 opacity-50">
                          <X className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  <Button
                    className={`w-full ${
                      tier.popular 
                        ? "bg-orange-600 hover:bg-orange-700 text-white" 
                        : "bg-gray-800 hover:bg-gray-700 text-white"
                    } border-0`}
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

        {/* Money back guarantee */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">
            🔒 <span className="font-semibold text-white">30-Day Money Back Guarantee</span> • No questions asked • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}