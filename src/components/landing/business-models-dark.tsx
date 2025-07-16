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
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/30"
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
    color: "from-blue-500/20 to-cyan-500/10",
    borderColor: "border-blue-500/30"
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
    color: "from-purple-500/20 to-pink-500/10",
    borderColor: "border-purple-500/30"
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
    color: "from-green-500/20 to-emerald-500/10",
    borderColor: "border-green-500/30"
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
    color: "from-indigo-500/20 to-blue-500/10",
    borderColor: "border-indigo-500/30"
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
    color: "from-red-500/20 to-orange-500/10",
    borderColor: "border-red-500/30"
  },
  {
    icon: Boxes,
    title: "AI Product Studio",
    income: "10K-50K",
    difficulty: "Scale",
    description: "Build and sell AI-powered SaaS products and tools with recurring revenue",
    features: [
      "Unlimited scaling potential",
      "Passive income streams",
      "Exit opportunities (acquisition)"
    ],
    color: "from-violet-500/20 to-purple-500/10",
    borderColor: "border-violet-500/30"
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Hot": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "Easy": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Advanced": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Scale": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export function BusinessModelsDark() {
  return (
    <section id="business-models" className="py-24 sm:py-32 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 border-gray-800 bg-gray-900/50 text-orange-500">
            <Boxes className="mr-2 h-3 w-3" />
            Choose Your Path
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white">
            7 Proven AI Business Models
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Each model includes templates, pricing strategies, and client acquisition systems. 
            Pick one and start earning within 48 hours.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {businessModels.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className={`h-full bg-gradient-to-br ${model.color} ${model.borderColor} border backdrop-blur group hover:shadow-orange-500/10 hover:shadow-lg transition-all duration-300`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gray-900/50 flex items-center justify-center">
                      <model.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(model.difficulty)}>
                      {model.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">{model.title}</CardTitle>
                  <CardDescription className="text-gray-400">{model.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-orange-500">${model.income}</span>
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                  
                  <ul className="space-y-2">
                    {model.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-400 mb-6">
            Not sure which model to choose? Our AI will recommend the perfect fit based on your skills and goals.
          </p>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white border-0" asChild>
            <Link href="#pricing">
              Get Your Personalized Roadmap
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}