"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroDark() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white">
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Small Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-medium">
            BUILD SHIP MARKET
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Build, ship, and market your
          <br />
          ideas with AI.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Build your ideas, automate your workflows, scale to cash-flow, alongside a 
          network of mentors and builders. Don't ship alone.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            size="lg" 
            asChild 
            className="bg-orange-600 hover:bg-orange-700 text-white border-0 px-8 py-6 text-lg font-medium"
          >
            <Link href="/products">
              Access Academy - $49
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        {/* Additional Links */}
        <motion.div 
          className="mt-8 flex gap-6 justify-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/products" className="text-gray-400 hover:text-orange-500 transition-colors">
            VIBE CODING
          </Link>
          <Link href="/products" className="text-gray-400 hover:text-orange-500 transition-colors">
            VIBE MARKETING
          </Link>
          <Link href="/products" className="text-gray-400 hover:text-orange-500 transition-colors">
            VIBE BUILDING
          </Link>
        </motion.div>
      </div>
    </section>
  );
}