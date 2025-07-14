"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Clock, Users, Zap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function CTASection() {
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
    <section id="get-started" className="py-24 sm:py-32 bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-background to-background/95">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          
          <CardContent className="relative p-8 sm:p-12 lg:p-16">
            <div className="mx-auto max-w-3xl text-center">
              {/* Urgency Badge */}
              <Badge variant="default" className="mb-6">
                <Clock className="mr-2 h-3 w-3" />
                Founding Member Pricing Ends Soon
              </Badge>

              {/* Headline */}
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Ready to 10x Your Development Speed?
              </h2>

              {/* Subheadline */}
              <p className="mt-6 text-lg text-muted-foreground">
                Join 10,000+ developers who are building faster, charging more, 
                and loving every minute of it.
              </p>

              {/* Value Props */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Start building today</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Join our community</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>30-day guarantee</span>
                </div>
              </div>

              {/* Email Form */}
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
                  {isLoading ? 'Submitting...' : 'Get Instant Access'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </Button>
              </form>
              {message && (
                <p className={`mt-2 text-sm ${message.includes('error') || message.includes('Failed') ? 'text-red-500' : 'text-green-600'}`}>
                  {message}
                </p>
              )}

              {/* Trust Signal */}
              <p className="mt-6 text-sm text-muted-foreground">
                🎁 Plus get our Cursor Starter Kit + 5 Claude prompts instantly
              </p>

              {/* Secondary CTAs */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button variant="link" size="lg" asChild>
                  <Link href="/pricing">Compare Plans →</Link>
                </Button>
                <Button variant="link" size="lg" asChild>
                  <a href="#testimonials">See Success Stories →</a>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="mt-12 border-t pt-8">
                <p className="text-sm text-muted-foreground">
                  Trusted by developers from
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-muted-foreground">
                  <span className="text-sm font-medium">Google</span>
                  <span className="text-sm font-medium">Meta</span>
                  <span className="text-sm font-medium">Microsoft</span>
                  <span className="text-sm font-medium">Amazon</span>
                  <span className="text-sm font-medium">Stripe</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}