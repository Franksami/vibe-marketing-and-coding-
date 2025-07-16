"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, CheckCircle } from "lucide-react";
import Link from "next/link";

export function FreeProductSimple() {
  const benefits = [
    "UTM Builder Pro Tool",
    "AI-Powered Headline Analyzer",
    "3 Pre-configured AI Agents",
    "8-Week Learning Path",
    "30-Day Email Support",
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-4xl mx-auto p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div>
                  <Badge className="mb-4">Free Download</Badge>
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
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto"
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
                <div className="w-full h-[300px] rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <Download className="w-24 h-24 text-white/20" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}