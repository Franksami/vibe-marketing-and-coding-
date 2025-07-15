"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, DollarSign, Globe, Cpu } from "lucide-react";

export function TechStackSection() {
  const techStack = [
    {
      id: "claude-code",
      name: "Claude Code",
      description: "Your AI builder - does all the coding for you",
      icon: Cpu,
      stats: { saves: "20+ hrs/week", skill: "Not needed" },
      features: ["Builds complete businesses", "No coding required", "Works 24/7"],
    },
    {
      id: "cursor",
      name: "Cursor",
      description: "Your workspace - where the magic happens",
      icon: Code2,
      stats: { setup: "5 minutes", cost: "Free" },
      features: ["Copy-paste friendly", "AI-powered", "Beginner friendly"],
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Get paid - handles all payment processing",
      icon: DollarSign,
      stats: { setup: "10 minutes", fees: "2.9% + 30¢" },
      features: ["Accept payments globally", "Subscriptions", "Invoicing"],
    },
    {
      id: "vercel",
      name: "Vercel",
      description: "Go live - your business on the internet",
      icon: Globe,
      stats: { deploy: "1 click", cost: "Free to start" },
      features: ["Instant deployment", "Always online", "Scales automatically"],
    },
  ];

  return (
    <section id="tech-stack" className="py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            THE ONLY 4 TOOLS YOU NEED
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Forget Complex Tech Stacks
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            While others juggle 20+ tools, you'll build entire businesses with just these 4. 
            Total setup time: 30 minutes. Total cost to start: $0.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((tech) => (
            <Card key={tech.id} className="text-center">
              <CardHeader>
                <tech.icon className="mx-auto h-12 w-12 text-primary mb-4" />
                <CardTitle>{tech.name}</CardTitle>
                <CardDescription>{tech.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-1">
                  {Object.entries(tech.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {tech.features.map((feature, i) => (
                    <p key={i} className="text-xs text-muted-foreground">
                      ✓ {feature}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg border bg-card p-8">
          <h3 className="text-xl font-semibold mb-4 text-center">
            The "Restaurant" Analogy That Makes It All Clear
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">🏪 Traditional Way (Complex)</h4>
              <p className="text-sm text-muted-foreground">
                Like trying to run a restaurant where you have to be the chef, waiter, 
                cashier, and janitor. You need to know everything about everything.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🚀 Our Way (Simple)</h4>
              <p className="text-sm text-muted-foreground">
                You're the restaurant owner. Claude Code is your chef, Cursor is your kitchen, 
                Stripe is your cashier, and Vercel is your dining room. You just manage the business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}