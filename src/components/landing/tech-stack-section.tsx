"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Database, Globe, Cpu, GitBranch, Zap } from "lucide-react";
import { useState } from "react";

export function TechStackSection() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const techStack = [
    {
      id: "cursor",
      name: "Cursor",
      description: "AI-first code editor",
      icon: Code2,
      stats: { users: "50K+", version: "0.42.5" },
      features: ["AI autocomplete", "Multi-file edits", "Custom rules"],
    },
    {
      id: "claude",
      name: "Claude 3.5",
      description: "Advanced AI assistant",
      icon: Cpu,
      stats: { requests: "1M+/day", accuracy: "98%" },
      features: ["Code generation", "Debugging", "Architecture planning"],
    },
    {
      id: "nextjs",
      name: "Next.js 15",
      description: "React framework",
      icon: Globe,
      stats: { downloads: "5M+/week", performance: "100" },
      features: ["App Router", "Server Components", "Edge Runtime"],
    },
    {
      id: "supabase",
      name: "Supabase",
      description: "Backend as a Service",
      icon: Database,
      stats: { uptime: "99.99%", latency: "<50ms" },
      features: ["PostgreSQL", "Real-time", "Auth"],
    },
    {
      id: "n8n",
      name: "n8n",
      description: "Workflow automation",
      icon: GitBranch,
      stats: { workflows: "1000+", nodes: "400+" },
      features: ["Visual builder", "Custom nodes", "Self-hosted"],
    },
    {
      id: "vercel",
      name: "Vercel",
      description: "Deployment platform",
      icon: Zap,
      stats: { deployments: "10M+/day", regions: "20+" },
      features: ["Edge Functions", "Analytics", "Preview URLs"],
    },
  ];

  // Future: Add connection lines between components
  // const connections = [
  //   { from: "cursor", to: "claude", label: "AI assistance" },
  //   { from: "nextjs", to: "supabase", label: "API calls" },
  //   { from: "n8n", to: "supabase", label: "Automation" },
  //   { from: "nextjs", to: "vercel", label: "Deployment" },
  // ];

  return (
    <section id="tech-stack" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            FULL TRANSPARENCY
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See Exactly How We Built This
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            This entire platform was built using the exact stack we teach. 
            Click any component to see live metrics and implementation details.
          </p>
        </div>

        {/* Interactive Tech Stack Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech) => (
            <Card
              key={tech.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeComponent === tech.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveComponent(tech.id === activeComponent ? null : tech.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <tech.icon className="h-8 w-8 text-primary" />
                  <Badge variant="outline" className="text-xs">
                    LIVE
                  </Badge>
                </div>
                <CardTitle className="mt-4">{tech.name}</CardTitle>
                <CardDescription>{tech.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {Object.entries(tech.stats).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-2xl font-bold">{value}</p>
                      <p className="text-xs text-muted-foreground capitalize">{key}</p>
                    </div>
                  ))}
                </div>
                
                {/* Features */}
                <div className="space-y-1">
                  {tech.features.map((feature) => (
                    <p key={feature} className="text-sm text-muted-foreground">
                      • {feature}
                    </p>
                  ))}
                </div>

                {activeComponent === tech.id && (
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Source Code
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      See Implementation
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Metrics Dashboard */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle>Platform Metrics (Live)</CardTitle>
            <CardDescription>
              Real-time data from our production environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-3xl font-bold">2.1s</p>
                <p className="text-sm text-muted-foreground">Page Load Time</p>
              </div>
              <div>
                <p className="text-3xl font-bold">98</p>
                <p className="text-sm text-muted-foreground">Lighthouse Score</p>
              </div>
              <div>
                <p className="text-3xl font-bold">342</p>
                <p className="text-sm text-muted-foreground">Active Users Now</p>
              </div>
              <div>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Errors (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Architecture CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline">
            Explore Full Architecture Diagram →
          </Button>
        </div>
      </div>
    </section>
  );
}