"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bot, Code2, Workflow, Sparkles } from "lucide-react";

const techStack = [
  {
    id: "claude",
    name: "Claude Code",
    icon: Bot,
    description: "Build apps with conversation",
    stats: {
      "Speed": "10x faster",
      "Learning": "Zero to hero",
      "Output": "Production-ready"
    },
    features: [
      "Natural language coding",
      "Full-stack development",
      "Instant deployment"
    ]
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: Code2,
    description: "AI-first code editor",
    stats: {
      "Productivity": "300% boost",
      "Accuracy": "99% correct",
      "Support": "24/7 AI help"
    },
    features: [
      "AI pair programming",
      "Smart autocomplete",
      "Bug fixing assistant"
    ]
  },
  {
    id: "n8n",
    name: "n8n",
    icon: Workflow,
    description: "Visual workflow automation",
    stats: {
      "Workflows": "Unlimited",
      "Integrations": "400+",
      "Hosting": "Self-hosted"
    },
    features: [
      "Drag-drop builder",
      "API connections",
      "Custom logic"
    ]
  },
  {
    id: "ai-tools",
    name: "AI Suite",
    icon: Sparkles,
    description: "Complete AI toolkit",
    stats: {
      "Tools": "20+",
      "Updates": "Weekly",
      "Support": "Community"
    },
    features: [
      "GPT-4 & Claude",
      "Midjourney & DALL-E",
      "Voice & video AI"
    ]
  }
];

export function TechStackSimple() {
  return (
    <section id="tech-stack" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4">
            Your AI Toolkit
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master these four core tools and you&apos;ll be able to build anything. 
            No prior coding experience required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <tech.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{tech.name}</CardTitle>
                  <CardDescription>{tech.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 space-y-1">
                    {Object.entries(tech.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{key}:</span>
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
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground">
            Join our community to get exclusive tutorials, templates, and support for each tool
          </p>
        </motion.div>
      </div>
    </section>
  );
}