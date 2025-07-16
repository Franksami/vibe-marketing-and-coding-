"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Loader2, Zap, Rocket, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { trackEvents } from "@/components/analytics/google-analytics";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

export function ServiceTiersSection() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
      price: 497,
      originalPrice: 997,
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
      gradient: "from-slate-50 to-white",
      borderGradient: "from-slate-300 to-slate-200",
      iconColor: "text-slate-700",
      savings: 50,
    },
    {
      name: "Accelerator",
      icon: Rocket,
      price: 1497,
      originalPrice: 2997,
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
      gradient: "from-slate-100 to-slate-50",
      borderGradient: "from-slate-400 to-slate-300",
      iconColor: "text-slate-900",
      savings: 50,
    },
    {
      name: "Partnership",
      icon: Crown,
      price: 4997,
      originalPrice: 9997,
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
      gradient: "from-slate-50 to-white",
      borderGradient: "from-slate-300 to-slate-200",
      iconColor: "text-slate-700",
      savings: 50,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 border-slate-200 bg-slate-50">
            <Sparkles className="mr-2 h-3 w-3 animate-pulse" />
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
        </motion.div>

        <motion.div 
          ref={ref}
          className="mt-16 grid gap-8 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
              whileHover={{ y: -10 }}
              style={{ perspective: 1000 }}
            >
              <Card 
                className={`relative h-full transition-all duration-500 ${
                  tier.popular 
                    ? "shadow-2xl scale-105 border-2 border-primary" 
                    : "hover:shadow-xl border-2 border-transparent"
                }`}
                style={{
                  transform: hoveredTier === index 
                    ? "rotateY(-2deg) rotateX(2deg)" 
                    : "rotateY(0deg) rotateX(0deg)",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s ease"
                }}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <Badge className="px-4 py-1.5 bg-slate-900 text-white border-0 shadow-lg">
                      <Sparkles className="mr-1 h-3 w-3" />
                      MOST POPULAR
                    </Badge>
                  </motion.div>
                )}
                
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-50 rounded-t-lg`} />
                
                {/* Animated border gradient on hover */}
                {hoveredTier === index && (
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-75"
                    style={{
                      background: `linear-gradient(45deg, transparent 30%, ${tier.borderGradient} 50%, transparent 70%)`,
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
                
                <CardHeader className="relative z-10">
                  <div className="relative">
                    <motion.div 
                      className="flex justify-center mb-4"
                      animate={hoveredTier === index ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`h-16 w-16 rounded-full bg-background shadow-md flex items-center justify-center ${tier.iconColor}`}>
                        <tier.icon className="h-8 w-8" />
                      </div>
                    </motion.div>
                    
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="mt-2">{tier.description}</CardDescription>
                    
                    <div className="mt-6 space-y-1">
                      <div className="flex items-baseline justify-center gap-2">
                        <motion.span 
                          className="text-5xl font-bold tracking-tight"
                          animate={hoveredTier === index ? { scale: 1.1 } : { scale: 1 }}
                        >
                          $<CountUp 
                            end={tier.price} 
                            duration={1.5}
                            enableScrollSpy
                            scrollSpyOnce
                          />
                        </motion.span>
                        {tier.originalPrice && (
                          <span className="text-xl text-muted-foreground line-through">
                            ${tier.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{tier.frequency}</span>
                      
                      {tier.savings && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={hoveredTier === index ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Badge variant="secondary" className="mt-2">
                            Save {tier.savings}% today
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  {tier.limited && (
                    <Badge variant="secondary" className="mt-3">
                      Limited Spots Available
                    </Badge>
                  )}
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <motion.li 
                        key={feature} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <motion.div
                          animate={hoveredTier === index ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                        </motion.div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="relative z-10">
                  {tier.name === "Self-Paced" ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button 
                        className="w-full relative overflow-hidden" 
                        variant={tier.variant}
                        size="lg"
                        onClick={handlePurchase}
                        disabled={isLoading}
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={hoveredTier === index ? { x: "100%" } : {}}
                          transition={{ duration: 0.5 }}
                        />
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            {tier.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button 
                        className={`w-full group relative overflow-hidden ${
                          tier.popular 
                            ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg" 
                            : tier.name === "Partnership" 
                              ? "border-2 border-slate-300 hover:bg-slate-50" 
                              : ""
                        }`}
                        variant={tier.variant}
                        size="lg"
                        asChild
                      >
                        <Link href={tier.href} className="flex items-center justify-center">
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={hoveredTier === index ? { x: "100%" } : {}}
                            transition={{ duration: 0.5 }}
                          />
                          {tier.cta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Money-back guarantee with animation */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.p 
            className="text-sm text-muted-foreground flex items-center justify-center gap-2"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-lg">🛡️</span>
            30-day money-back guarantee on all paid plans • No questions asked
          </motion.p>
        </motion.div>

        {/* Agency/Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <Card className="mt-12 border-dashed border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center">
              <CardTitle>Need Custom Training for Your Team?</CardTitle>
              <CardDescription>
                We offer custom workshops and implementation services for agencies and enterprises
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="link" asChild className="group">
                  <Link href="#contact" className="flex items-center">
                    Contact Us for Custom Pricing 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}