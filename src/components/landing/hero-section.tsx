"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Users, Zap, CheckCircle2, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { trackEvents } from "@/components/analytics/google-analytics";

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

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
        // Track successful email capture
        trackEvents.emailCapture('hero_section');
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
      {/* Modern gradient background */}
      <div className="absolute inset-0 -z-10 gradient-mesh opacity-30" />
      <div className="absolute inset-0 -z-10 gradient-radial" />
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust indicator */}
          <Badge variant="outline" className="mb-8 px-6 py-2 border-primary/20 bg-primary/5">
            <TrendingUp className="mr-2 h-4 w-4 text-primary" />
            127 students hit $10K+ last month
          </Badge>

          {/* Main headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Turn Your Ideas Into
            <span className="block mt-2 text-gradient">
              Revenue-Generating Apps
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-normal">
              in 48 Hours or Less
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            Master the AI-powered development system that&apos;s helping non-technical founders build 
            and launch profitable SaaS, marketplaces, and automation businesses—without writing code.
          </p>

          {/* Success metrics */}
          <div className="mt-10 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">48hrs</div>
              <div className="text-sm text-muted-foreground">Average Launch Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$10-50K</div>
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Coding Required</div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Link href="/pricing" className="flex items-center">
                Get Instant Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2 hover:bg-primary/5">
              <Link href="#business-models">
                View Success Stories
              </Link>
            </Button>
          </div>

          {/* What's included */}
          <div className="mt-12 space-y-3">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">What You Get Today:</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Complete AI Development System</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>7 Ready-to-Launch Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Private Community Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Weekly Live Coaching</span>
              </div>
            </div>
          </div>

          {/* Urgency/Scarcity */}
          <div className="mt-8">
            <Badge variant="destructive" className="px-4 py-2">
              <Clock className="mr-2 h-4 w-4" />
              Special Launch Price Ends in 48 Hours
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}