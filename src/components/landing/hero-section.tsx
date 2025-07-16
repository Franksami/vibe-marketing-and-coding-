"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, TrendingUp, Clock, Zap, Code2, Rocket } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  
  // Animated text variants
  const words = ["Apps", "SaaS", "Dashboards", "Marketplaces", "Automations"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch('/api/capture-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail("");
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setMessage('Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden px-4 py-20 sm:px-6 lg:px-8 flex items-center">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" as const }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut" as const,
            }}
          />
        ))}
      </div>

      {/* Animated code snippets floating in background */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <motion.div
          className="absolute top-20 left-10 font-mono text-xs text-primary"
          animate={floatingAnimation}
        >
          {`<Dashboard />`}
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 font-mono text-xs text-primary"
          animate={floatingAnimation}
          transition={{ delay: 1 }}
        >
          {`function buildApp() {}`}
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 font-mono text-xs text-primary"
          animate={floatingAnimation}
          transition={{ delay: 2 }}
        >
          {`const revenue = $10K`}
        </motion.div>
      </div>

      <motion.div 
        ref={ref}
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust indicator with animation */}
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="mb-8 px-6 py-2 border-slate-200 bg-slate-50">
              <TrendingUp className="mr-2 h-4 w-4 text-primary animate-pulse" />
              <CountUp end={127} duration={2} /> students hit $10K+ last month
            </Badge>
          </motion.div>

          {/* Main headline with animated word switcher */}
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            variants={itemVariants}
          >
            Turn Your Ideas Into
            <span className="block mt-2 relative h-[1.2em]">
              <motion.span
                key={currentWord}
                className="absolute inset-0 text-gradient"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {words[currentWord]}
              </motion.span>
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-normal">
              in 48 Hours or Less
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Master the AI-powered development system that&apos;s helping non-technical founders build 
            and launch profitable SaaS, marketplaces, and automation businesses—without writing code.
          </motion.p>

          {/* Animated success metrics */}
          <motion.div 
            className="mt-10 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {[
              { icon: Clock, value: 48, suffix: "hrs", label: "Average Launch Time" },
              { icon: TrendingUp, value: 10, prefix: "$", suffix: "-50K", label: "Monthly Revenue" },
              { icon: Code2, value: 0, label: "Coding Required" },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="flex justify-center mb-2"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  <stat.icon className="h-8 w-8 text-primary/50" />
                </motion.div>
                <div className="text-3xl font-bold text-primary">
                  {stat.prefix}
                  <CountUp 
                    end={stat.value} 
                    duration={2} 
                    delay={0.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Primary CTA with enhanced animation */}
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-slate-900 text-white hover:bg-slate-800 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 group relative overflow-hidden"
                asChild
              >
                <Link href="/pricing" className="flex items-center">
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Get Instant Access
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-full border-2 hover:bg-primary/5 relative group overflow-hidden"
                asChild
              >
                <Link href="#business-models">
                  <motion.span
                    className="absolute inset-0 bg-primary/5"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Zap className="mr-2 h-5 w-5 text-primary group-hover:animate-pulse" />
                  View Success Stories
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* What's included with floating animation */}
          <motion.div 
            className="mt-12 space-y-3"
            variants={itemVariants}
          >
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              What You Get Today:
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              {[
                "Complete AI Development System",
                "7 Ready-to-Launch Templates",
                "Private Community Access",
                "Weekly Live Coaching"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <Sparkles className="h-4 w-4 text-slate-600 animate-pulse" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Urgency/Scarcity with pulsing animation */}
          <motion.div 
            className="mt-8"
            variants={itemVariants}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Badge variant="destructive" className="px-4 py-2">
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Special Launch Price Ends in 48 Hours
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}