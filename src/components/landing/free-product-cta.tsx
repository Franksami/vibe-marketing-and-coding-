"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Sparkles, Users, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function FreeProductCTA() {
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    "UTM Builder Pro Tool",
    "AI-Powered Headline Analyzer",
    "3 Pre-configured AI Agents",
    "8-Week Learning Path",
    "30-Day Email Support",
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card 
            className="max-w-4xl mx-auto p-8 md:p-12 relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10"
              animate={{
                opacity: isHovered ? 0.2 : 0.1,
              }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Free Download
                  </Badge>
                  <Badge variant="outline">
                    Limited Time
                  </Badge>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Get Your Free AI Marketing Kit
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Transform your marketing workflow with AI-powered tools and templates. 
                    Join 500+ marketers already using our system.
                  </p>
                </div>

                {/* Benefits list */}
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto group"
                >
                  <Link href="/products/marketing-kit">
                    <Download className="mr-2 h-5 w-5" />
                    Get Instant Access
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                {/* Social proof */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>500+ Downloads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Instant Delivery</span>
                  </div>
                </div>
              </div>

              {/* Visual element */}
              <div className="relative">
                <motion.div
                  className="relative w-full h-[300px] rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Animated elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-32 h-32 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full blur-3xl opacity-30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="relative z-10"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Download className="w-24 h-24 text-white/80" />
                  </motion.div>

                  {/* Sparkles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${20 + i * 30}%`,
                        left: `${10 + i * 35}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom banner */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-500"
              animate={{
                scaleX: isHovered ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          </Card>
        </motion.div>
      </div>
    </section>
  );
}