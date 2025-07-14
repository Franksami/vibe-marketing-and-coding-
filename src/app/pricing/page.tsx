"use client";

import { useState } from "react";
import { Navigation } from "@/components/landing/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Sparkles, Users, Zap, Shield, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { trackEvents } from "@/components/analytics/google-analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"lifetime" | "payment-plan">("lifetime");

  const handlePurchase = async (planType: string) => {
    if (!session) {
      toast.error("Please sign in to purchase");
      router.push("/?login=true");
      return;
    }

    setIsLoading(true);
    trackEvents.beginCheckout(planType === "lifetime" ? 499 : 199);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: planType === "lifetime" 
            ? process.env.NEXT_PUBLIC_STRIPE_FOUNDING_MEMBER_PRICE_ID
            : process.env.NEXT_PUBLIC_STRIPE_PAYMENT_PLAN_PRICE_ID
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  const features = [
    { name: "Access to Skool community", free: true, academy: true, coaching: true },
    { name: "Weekly live coding sessions", free: true, academy: true, coaching: true },
    { name: "Basic Cursor rules (3)", free: true, academy: true, coaching: true },
    { name: "15+ module video course", free: false, academy: true, coaching: true },
    { name: "All starter kits & templates", free: false, academy: true, coaching: true },
    { name: "Private Discord channel", free: false, academy: true, coaching: true },
    { name: "Weekly group calls", free: false, academy: true, coaching: true },
    { name: "Lifetime updates", free: false, academy: true, coaching: true },
    { name: "Certificate of completion", free: false, academy: true, coaching: true },
    { name: "1:1 onboarding call", free: false, academy: false, coaching: true },
    { name: "Personal project review", free: false, academy: false, coaching: true },
    { name: "Custom learning path", free: false, academy: false, coaching: true },
    { name: "Priority support", free: false, academy: false, coaching: true },
    { name: "Direct Slack access", free: false, academy: false, coaching: true },
  ];

  const faqs = [
    {
      question: "What's the difference between lifetime and payment plan?",
      answer: "Both give you the exact same access! The payment plan splits the cost into 3 monthly payments of $199 (total $597), while lifetime access is a one-time payment of $499. Lifetime saves you $98."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with the course, just email us within 30 days for a full refund. No questions asked."
    },
    {
      question: "Do I need coding experience?",
      answer: "Basic HTML/CSS/JavaScript knowledge is helpful but not required. We start from the fundamentals and many successful students come from no-code backgrounds."
    },
    {
      question: "How long do I have access?",
      answer: "Forever! Both payment options give you lifetime access to all course materials, future updates, and the community."
    },
    {
      question: "What if I need help?",
      answer: "You'll have access to our community, weekly live sessions, and group calls. Academy members also get access to our private Discord for faster support."
    },
    {
      question: "Can I upgrade later?",
      answer: "Yes! You can upgrade from the free community to Academy anytime. If you want 1:1 coaching, we can arrange that separately."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-2 h-3 w-3" />
              Limited Time: Founding Member Pricing
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Choose the plan that fits your learning style. Upgrade or cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center">
            <Tabs value={billingPeriod} onValueChange={(v) => setBillingPeriod(v as "lifetime" | "payment-plan")} className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="lifetime">
                  Lifetime Access
                  <Badge variant="secondary" className="ml-2">Save $98</Badge>
                </TabsTrigger>
                <TabsTrigger value="payment-plan">
                  Payment Plan
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Free Community */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Community</CardTitle>
                <CardDescription>Join our community and start learning</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/forever</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.filter(f => f.free).map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="https://skool.com/vibe-coding">
                    Join Free Community
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Vibe Academy */}
            <Card className="relative border-primary shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="px-3 py-1">MOST POPULAR</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Vibe Academy</CardTitle>
                <CardDescription>Complete course + lifetime updates</CardDescription>
                <div className="mt-4">
                  {billingPeriod === "lifetime" ? (
                    <>
                      <span className="text-4xl font-bold">$499</span>
                      <span className="text-muted-foreground ml-2 line-through">$699</span>
                      <Badge variant="secondary" className="ml-2">SAVE $200</Badge>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">$199</span>
                      <span className="text-muted-foreground">/month × 3</span>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.filter(f => f.academy).slice(0, 9).map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={() => handlePurchase(billingPeriod)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Get Instant Access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* 1:1 Coaching */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">1:1 Coaching</CardTitle>
                <CardDescription>Personalized guidance from experts</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$250</span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.filter(f => f.coaching).map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="mailto:coaching@vibecodingacademy.com">
                    Apply for Coaching
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">Detailed Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium">Features</th>
                  <th className="text-center py-4 px-4 font-medium">Community</th>
                  <th className="text-center py-4 px-4 font-medium">Vibe Academy</th>
                  <th className="text-center py-4 px-4 font-medium">1:1 Coaching</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={feature.name} className={index % 2 === 0 ? "bg-background" : ""}>
                    <td className="py-4 px-4 text-sm">{feature.name}</td>
                    <td className="text-center py-4 px-4">
                      {feature.free ? (
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.academy ? (
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.coaching ? (
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <Shield className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">30-Day Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                Not satisfied? Get a full refund within 30 days. No questions asked.
              </p>
            </div>
            <div>
              <Users className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">10,000+ Students</h3>
              <p className="text-sm text-muted-foreground">
                Join a thriving community of developers building with AI.
              </p>
            </div>
            <div>
              <Zap className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Instant Access</h3>
              <p className="text-sm text-muted-foreground">
                Start learning immediately after purchase. No waiting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Development Speed?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of developers who are building faster with AI. 
            Start with our free community or unlock everything with Vibe Academy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="https://skool.com/vibe-coding">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              onClick={() => handlePurchase("lifetime")}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Get Academy Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            🛡️ 30-day money-back guarantee • Cancel anytime • Secure checkout
          </p>
        </div>
      </section>
    </div>
  );
}