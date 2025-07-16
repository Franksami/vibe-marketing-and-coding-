"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/effects/text-reveal";
import { AIBrain } from "@/components/3d/ai-brain";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <AIBrain />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="outline" className="mb-8 px-6 py-2 border-slate-200 bg-slate-50/90 backdrop-blur">
            <Sparkles className="mr-2 h-4 w-4 text-slate-600 animate-pulse" />
            The Future of AI Development
          </Badge>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TextReveal type="word" duration={1.5}>
            Build Intelligent Apps
          </TextReveal>
          <span className="block mt-2 text-gradient">
            <TextReveal type="letter" delay={0.8} duration={2}>
              Without Writing Code
            </TextReveal>
          </span>
        </motion.h1>

        <motion.p 
          className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Master AI-powered development and launch your next $10K/month business. 
          Join 500+ entrepreneurs who are already building the future.
        </motion.p>

        <motion.div 
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MagneticButton>
            <Button 
              size="lg" 
              className="bg-slate-900 text-white hover:bg-slate-800 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 group relative overflow-hidden glass"
              asChild
            >
              <Link href="/pricing" className="flex items-center">
                <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Start Building Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </MagneticButton>
          
          <MagneticButton>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 rounded-full border-2 hover:bg-slate-50/50 backdrop-blur glass"
              asChild
            >
              <Link href="#business-models">
                View Success Stories
              </Link>
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Floating UI elements */}
        <motion.div
          className="absolute top-20 left-10 glass p-4 rounded-lg"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <code className="text-sm text-slate-600">const ai = new Brain();</code>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 glass p-4 rounded-lg"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        >
          <code className="text-sm text-slate-600">revenue.scale(10x);</code>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full p-1">
            <div className="w-1 h-3 bg-slate-400 rounded-full mx-auto animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}