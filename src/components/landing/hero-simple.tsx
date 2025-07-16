"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Code2, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSimple() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Badge variant="outline" className="px-6 py-2 border-slate-700 bg-slate-900/50 backdrop-blur">
            <Sparkles className="mr-2 h-4 w-4 text-slate-400" />
            AI-Powered Development Platform
          </Badge>
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Build Intelligent Apps
          <span className="block mt-2 bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
            10x Faster with AI
          </span>
        </motion.h1>

        <motion.p 
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Transform your ideas into production-ready applications using AI. 
          No coding experience required. Start building today.
        </motion.p>

        <motion.div 
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" asChild className="group">
            <Link href="/products">
              <Zap className="mr-2 h-5 w-5" />
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">
              <Code2 className="mr-2 h-5 w-5" />
              See How It Works
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold">10x</div>
            <div className="text-sm text-muted-foreground">Faster Development</div>
          </div>
          <div>
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm text-muted-foreground">AI Support</div>
          </div>
        </motion.div>
      </div>

      {/* Simple gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent" />
      </div>
    </section>
  );
}