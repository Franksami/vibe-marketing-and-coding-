"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTADark() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-black" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Build Your
            <span className="text-orange-500"> $10K/Month</span> AI Business?
          </h2>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join 2,847+ students who are already building profitable AI businesses. 
            Limited spots available at launch price.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur"
            >
              <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Start earning in 14 days</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur"
            >
              <Shield className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-gray-300">30-day money back guarantee</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur"
            >
              <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Lifetime community access</p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white border-0 text-lg px-8"
              asChild
            >
              <Link href="#pricing">
                Get Instant Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white"
              asChild
            >
              <Link href="/products/marketing-kit">
                Start with Free Resources
              </Link>
            </Button>
          </motion.div>

          {/* Urgency */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-gray-400"
          >
            ⚡ Launch pricing ends in 48 hours • Price increases to $497 after
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}