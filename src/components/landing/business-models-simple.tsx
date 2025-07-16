"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Zap, 
  Code2, 
  Palette, 
  Bot, 
  Database, 
  LineChart, 
  Boxes 
} from "lucide-react";

const businessModels = [
  {
    icon: Zap,
    title: "AI Automation Agency",
    income: "5K-25K",
    difficulty: "Hot",
    description: "Build custom AI workflows and automations for businesses using n8n and Make.com",
    features: [
      "High-ticket clients ($3K-10K/project)",
      "Recurring revenue from maintenance",
      "No coding required"
    ],
    color: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/20"
  },
  {
    icon: Code2,
    title: "Claude Code Services",
    income: "3K-15K",
    difficulty: "Medium",
    description: "Develop custom applications and MVPs using Claude Code & Cursor - without writing code",
    features: [
      "Build full-stack apps in hours",
      "Charge $5K-20K per project",
      "Scale with AI assistants"
    ],
    color: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    icon: Palette,
    title: "AI Design Studio",
    income: "2K-10K",
    difficulty: "Easy",
    description: "Create unlimited designs for businesses using Midjourney, DALL-E, and Canva AI",
    features: [
      "Logo packages ($500-2K)",
      "Social media content plans",
      "Brand identity systems"
    ],
    color: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20"
  },
  {
    icon: Bot,
    title: "Chatbot Consultant",
    income: "4K-20K",
    difficulty: "Hot",
    description: "Build and deploy custom AI chatbots for customer service and sales automation",
    features: [
      "Implementation fees ($3K-8K)",
      "Monthly maintenance ($500-2K)",
      "White-label solutions"
    ],
    color: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-500/20"
  },
  {
    icon: Database,
    title: "Data Automation Expert",
    income: "3K-18K",
    difficulty: "Medium",
    description: "Automate data entry, processing, and reporting workflows for enterprises",
    features: [
      "Enterprise clients pay premium",
      "Recurring contracts",
      "High ROI for clients"
    ],
    color: "from-indigo-500/10 to-blue-500/10",
    borderColor: "border-indigo-500/20"
  },
  {
    icon: LineChart,
    title: "AI Analytics Agency",
    income: "5K-30K",
    difficulty: "Advanced",
    description: "Provide AI-powered business intelligence and predictive analytics dashboards",
    features: [
      "Monthly retainers ($2K-10K)",
      "Custom dashboard development",
      "Predictive modeling services"
    ],
    color: "from-red-500/10 to-rose-500/10",
    borderColor: "border-red-500/20"
  },
  {
    icon: Boxes,
    title: "No-Code SaaS Builder",
    income: "10K-50K",
    difficulty: "Hot",
    description: "Build and launch micro-SaaS products using AI and no-code tools in days",
    features: [
      "Recurring revenue model",
      "Build once, sell forever",
      "AI handles the coding"
    ],
    color: "from-violet-500/10 to-purple-500/10",
    borderColor: "border-violet-500/20"
  }
];

export function BusinessModelsSimple() {
  return (
    <section id="business-models" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4">
            7 Proven Business Models
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Path to $10K/Month
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each model is battle-tested and proven to generate consistent revenue. 
            Pick one that matches your skills and interests.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {businessModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`h-12 w-12 rounded-lg ${model.color} flex items-center justify-center`}>
                      <model.icon className="h-6 w-6" />
                    </div>
                    <Badge 
                      variant={model.difficulty === "Hot" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {model.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{model.title}</CardTitle>
                  <div className="text-2xl font-bold text-primary mt-2">
                    ${model.income}/month
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="mb-4 text-sm">
                    {model.description}
                  </CardDescription>
                  
                  <div className="space-y-2 mb-4">
                    {model.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="ghost" size="sm" className="w-full group" asChild>
                    <Link href="#pricing">
                      Learn More
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
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
          <p className="text-lg font-semibold text-primary mb-2">
            Your Path to Success Starts Here
          </p>
          <p className="text-muted-foreground">
            Join 500+ entrepreneurs who transformed their lives with AI
          </p>
        </motion.div>
      </div>
    </section>
  );
}