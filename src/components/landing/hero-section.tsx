"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
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
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gradient-to-tr from-primary/5 to-primary/10 shadow-xl shadow-primary/10 ring-1 ring-primary/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          {/* Social proof badge */}
          <Badge variant="secondary" className="mb-8 px-4 py-2">
            <Users className="mr-2 h-4 w-4" />
            Join 10,000+ developers building with AI
          </Badge>

          {/* Main headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Build{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              $10K Client Dashboards
            </span>{" "}
            in Days Using Cursor + Claude
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Master the AI development stack that&apos;s 10x faster than traditional coding. 
            Learn to build production-ready apps with the exact tools we used to create this platform.
          </p>

          {/* Value props */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Ship 10x Faster</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Production-Ready Code</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Active Community</span>
            </div>
          </div>

          {/* Email capture form */}
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-md"
              required
            />
            <Button type="submit" size="lg" className="group" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Get Free Starter Kit'}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </Button>
          </form>
          {message && (
            <p className={`mt-2 text-sm ${message.includes('error') || message.includes('Failed') ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}

          {/* Trust signals */}
          <p className="mt-6 text-sm text-muted-foreground">
            🎁 Instant access to 3 Cursor rules + 5 Claude prompts
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="#demo">
                Watch 60-Min Demo →
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}