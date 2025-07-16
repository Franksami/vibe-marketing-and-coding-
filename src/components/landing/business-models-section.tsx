"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Megaphone,
  Briefcase,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

export function BusinessModelsSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const models = [
    {
      icon: Briefcase,
      title: "AI Automation Agency",
      income: "10-50K",
      time: "First client in 48hrs",
      description: "Build custom AI solutions for businesses using no-code tools",
      example: "Solo agency owner: $32K/month with 8 clients",
      difficulty: "Hot",
      color: "from-slate-100 to-slate-50",
      borderColor: "border-slate-200",
      features: ["High demand", "Premium pricing", "Recurring revenue"],
      testimonial: "I replaced my corporate salary in 3 months",
    },
    {
      icon: ShoppingCart,
      title: "SaaS Products",
      income: "5-30K",
      time: "MVP in 1 week",
      description: "Build subscription software without coding using AI",
      example: "Analytics dashboard: 200 users at $49/month",
      difficulty: "High ROI",
      color: "from-slate-50 to-white",
      borderColor: "border-slate-200",
      features: ["Passive income", "Scalable", "High margins"],
      testimonial: "My SaaS hit $15K MRR in 60 days",
    },
    {
      icon: Package,
      title: "Digital Products",
      income: "3-15K",
      time: "Selling in 3 days",
      description: "Package your knowledge into courses, templates, and tools",
      example: "Business templates: $11K/month passive income",
      difficulty: "Easy",
      color: "from-slate-100 to-slate-50",
      borderColor: "border-slate-200",
      features: ["Low overhead", "Quick launch", "Evergreen sales"],
      testimonial: "Zero to $8K in my first month",
    },
    {
      icon: Users,
      title: "Paid Communities",
      income: "5-25K",
      time: "100 members in 30 days",
      description: "Create exclusive membership sites with AI-powered features",
      example: "Fitness community: 250 members at $47/month",
      difficulty: "Scalable",
      color: "from-slate-50 to-white",
      borderColor: "border-slate-200",
      features: ["Recurring revenue", "High engagement", "Community-driven"],
      testimonial: "300 members paying $97/month",
    },
    {
      icon: TrendingUp,
      title: "Content Arbitrage",
      income: "2-10K",
      time: "Profitable in 2 weeks",
      description: "Build AI-powered content sites that rank and convert",
      example: "Comparison site: $7K/month affiliate commissions",
      difficulty: "Passive",
      color: "from-slate-100 to-slate-50",
      borderColor: "border-slate-200",
      features: ["SEO traffic", "Affiliate income", "Low maintenance"],
      testimonial: "Ranking #1 for 50+ keywords",
    },
    {
      icon: Megaphone,
      title: "Newsletter Empire",
      income: "5-20K",
      time: "1K subs in 30 days",
      description: "Grow and monetize AI-curated newsletters",
      example: "Tech newsletter: 8K subs, $15K/month from sponsors",
      difficulty: "Growing",
      color: "from-slate-50 to-white",
      borderColor: "border-slate-200",
      features: ["Email list asset", "Multiple revenue streams", "Authority building"],
      testimonial: "10K subscribers in 90 days",
    },
    {
      icon: DollarSign,
      title: "Marketplace Apps",
      income: "10-40K",
      time: "Live in 2 weeks",
      description: "Connect buyers and sellers with AI-powered platforms",
      example: "Service marketplace: $28K/month in fees",
      difficulty: "High Value",
      color: "from-slate-100 to-slate-50",
      borderColor: "border-slate-200",
      features: ["Transaction fees", "Network effects", "Viral growth"],
      testimonial: "Processing $100K+ monthly",
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
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="business-models" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(6, 182, 212, 0.05))",
            "linear-gradient(to right, rgba(6, 182, 212, 0.05), rgba(59, 130, 246, 0.05))",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" as const }}
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 border-slate-200 bg-slate-50">
            <Zap className="mr-2 h-3 w-3" />
            Real Student Results
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            7 AI Business Models Making Our Students
            <span className="text-gradient"> $10-50K/Month</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Every model below is being used RIGHT NOW by non-technical founders 
            who started exactly where you are today.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {models.map((model, index) => (
            <motion.div
              key={model.title}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ perspective: 1000 }}
            >
              <Card 
                className={`relative h-full overflow-hidden transition-all duration-500 hover:shadow-2xl ${model.borderColor} border-2 group`}
                style={{
                  transform: hoveredCard === index 
                    ? "rotateY(-5deg) rotateX(5deg)" 
                    : "rotateY(0deg) rotateX(0deg)",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s ease"
                }}
              >
                {/* Animated gradient background */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-50`}
                  animate={hoveredCard === index ? { opacity: 0.7 } : { opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating particles on hover */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 -z-10">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-primary/30"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                )}

                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <motion.div 
                      className="h-12 w-12 rounded-lg bg-background/80 backdrop-blur flex items-center justify-center shadow-sm"
                      animate={hoveredCard === index ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <model.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <Badge 
                      variant={model.difficulty === "Hot" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {model.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{model.title}</CardTitle>
                  <div className="flex items-center gap-3 mt-3">
                    <motion.span 
                      className="text-2xl font-bold text-primary"
                      animate={hoveredCard === index ? { scale: 1.1 } : { scale: 1 }}
                    >
                      $<CountUp 
                        end={parseInt(model.income.split('-')[0])} 
                        duration={1.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      -{model.income.split('-')[1]}/month
                    </motion.span>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="mb-3 text-sm">
                    {model.description}
                  </CardDescription>
                  
                  {/* Features on hover */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={hoveredCard === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 mb-3">
                      {model.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      ⏱️ {model.time}
                    </p>
                    <div className="pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold">Real Result:</span> {model.example}
                      </p>
                      
                      {/* Testimonial on hover */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={hoveredCard === index ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs italic text-primary mt-2"
                      >
                        "{model.testimonial}"
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section with animation */}
        <motion.div 
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 p-8 sm:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute inset-0 gradient-mesh opacity-20" />
          <div className="relative z-10 text-center space-y-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Badge className="bg-slate-900 text-white border-0">
                <Sparkles className="mr-2 h-3 w-3" />
                Limited Time Bonus
              </Badge>
            </motion.div>
            
            <h3 className="text-2xl sm:text-3xl font-bold">
              Can't Decide? Build Multiple Income Streams
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our students average 2.7 income streams within 90 days. 
              Get the complete playbook for all 7 business models.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 group" asChild>
                  <Link href="#pricing" className="flex items-center">
                    Get All 7 Business Blueprints
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" asChild>
                  <Link href="#testimonials">
                    See More Success Stories
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}