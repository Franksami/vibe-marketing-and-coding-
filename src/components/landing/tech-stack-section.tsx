"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, DollarSign, Globe, Cpu } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export function TechStackSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const techStack = [
    {
      id: "claude-code",
      name: "Claude Code",
      description: "Your AI builder - does all the coding for you",
      icon: Cpu,
      stats: { saves: "20+ hrs/week", skill: "Not needed" },
      features: ["Builds complete businesses", "No coding required", "Works 24/7"],
    },
    {
      id: "cursor",
      name: "Cursor",
      description: "Your workspace - where the magic happens",
      icon: Code2,
      stats: { setup: "5 minutes", cost: "Free" },
      features: ["Copy-paste friendly", "AI-powered", "Beginner friendly"],
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Get paid - handles all payment processing",
      icon: DollarSign,
      stats: { setup: "10 minutes", fees: "2.9% + 30¢" },
      features: ["Accept payments globally", "Subscriptions", "Invoicing"],
    },
    {
      id: "vercel",
      name: "Vercel",
      description: "Go live - your business on the internet",
      icon: Globe,
      stats: { deploy: "1 click", cost: "Free to start" },
      features: ["Instant deployment", "Always online", "Scales automatically"],
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
    <section id="tech-stack" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(241, 245, 249, 0.5), rgba(248, 250, 252, 0.5))",
            "linear-gradient(to bottom right, rgba(248, 250, 252, 0.5), rgba(241, 245, 249, 0.5))",
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
          <Badge variant="secondary" className="mb-4 border-slate-200 bg-slate-50">
            THE ONLY 4 TOOLS YOU NEED
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Forget Complex Tech Stacks
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            While others juggle 20+ tools, you'll build entire businesses with just these 4. 
            Total setup time: 30 minutes. Total cost to start: $0.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredCard(tech.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ perspective: 1000 }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut" as const,
                }}
              >
                <Card 
                  className="relative h-full text-center overflow-hidden transition-all duration-500 hover:shadow-2xl border-2 border-transparent hover:border-slate-200 group"
                  style={{
                    transform: hoveredCard === tech.id 
                      ? "rotateX(-5deg) rotateY(5deg)" 
                      : "rotateX(0deg) rotateY(0deg)",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.5s ease",
                  }}
                >
                  {/* Gradient background on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Glow effect */}
                  {hoveredCard === tech.id && (
                    <motion.div
                      className="absolute inset-0 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-slate-300/20 blur-xl" />
                    </motion.div>
                  )}
                  
                  <CardHeader className="relative z-10">
                    <motion.div
                      animate={hoveredCard === tech.id ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <tech.icon className="mx-auto h-12 w-12 text-slate-700 mb-4" />
                    </motion.div>
                    <CardTitle>{tech.name}</CardTitle>
                    <CardDescription>{tech.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="mb-4 space-y-1">
                      {Object.entries(tech.stats).map(([key, value]) => (
                        <motion.div 
                          key={key} 
                          className="flex justify-between text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={hoveredCard === tech.id ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <span className="text-muted-foreground capitalize">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {tech.features.map((feature, i) => (
                        <motion.p 
                          key={i} 
                          className="text-xs text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          animate={hoveredCard === tech.id ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                        >
                          ✓ {feature}
                        </motion.p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear" as const,
            }}
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                #64748b,
                #64748b 10px,
                transparent 10px,
                transparent 20px
              )`,
              backgroundSize: "28px 28px",
            }}
          />
          
          <h3 className="text-xl font-semibold mb-4 text-center relative z-10">
            The "Restaurant" Analogy That Makes It All Clear
          </h3>
          <div className="grid gap-4 md:grid-cols-2 relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-100"
            >
              <h4 className="font-medium mb-2">🏪 Traditional Way (Complex)</h4>
              <p className="text-sm text-muted-foreground">
                Like trying to run a restaurant where you have to be the chef, waiter, 
                cashier, and janitor. You need to know everything about everything.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-100"
            >
              <h4 className="font-medium mb-2">🚀 Our Way (Simple)</h4>
              <p className="text-sm text-muted-foreground">
                You're the restaurant owner. Claude Code is your chef, Cursor is your kitchen, 
                Stripe is your cashier, and Vercel is your dining room. You just manage the business.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}