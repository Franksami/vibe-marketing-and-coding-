"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, CheckCircle } from "lucide-react";
import Link from "next/link";

export function FreeProductDark() {
  const benefits = [
    "UTM Builder Pro Tool",
    "AI-Powered Headline Analyzer",
    "3 Pre-configured AI Agents",
    "8-Week Learning Path",
    "30-Day Email Support",
  ];

  return (
    <section className="py-20 bg-gray-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-gray-900/50 border-gray-800 backdrop-blur">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div>
                  <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">Free Download</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Get Your Free AI Marketing Kit
                  </h2>
                  <p className="text-lg text-gray-400">
                    Transform your marketing workflow with AI-powered tools and templates. 
                    Join 500+ marketers already using our system.
                  </p>
                </div>

                {/* Benefits list */}
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white border-0"
                >
                  <Link href="/products/marketing-kit">
                    <Download className="mr-2 h-5 w-5" />
                    Get Instant Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Visual element */}
              <div className="relative">
                <div className="w-full h-[300px] rounded-lg bg-gradient-to-br from-orange-600/20 to-orange-800/10 flex items-center justify-center border border-orange-500/20">
                  <Download className="w-24 h-24 text-orange-500/30" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}