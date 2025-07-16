"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu } from "lucide-react";

const techCategories = [
  {
    name: "AI Development",
    tools: [
      { name: "Claude Code", description: "Build full-stack apps with AI", logo: "🤖" },
      { name: "Cursor IDE", description: "AI-powered code editor", logo: "💻" },
      { name: "v0 by Vercel", description: "UI generation from prompts", logo: "🎨" },
      { name: "GitHub Copilot", description: "AI pair programming", logo: "🐙" },
    ]
  },
  {
    name: "No-Code Automation",
    tools: [
      { name: "n8n", description: "Workflow automation", logo: "🔄" },
      { name: "Make.com", description: "Visual automation builder", logo: "⚡" },
      { name: "Zapier", description: "Connect 5000+ apps", logo: "🔗" },
      { name: "Bubble", description: "Build web apps visually", logo: "🫧" },
    ]
  },
  {
    name: "AI Models & APIs",
    tools: [
      { name: "OpenAI GPT-4", description: "Advanced language model", logo: "🧠" },
      { name: "Anthropic Claude", description: "Safe & helpful AI", logo: "🤝" },
      { name: "Midjourney", description: "AI image generation", logo: "🎭" },
      { name: "ElevenLabs", description: "AI voice synthesis", logo: "🎙️" },
    ]
  },
  {
    name: "Marketing & Sales",
    tools: [
      { name: "Gumroad", description: "Digital product sales", logo: "🛍️" },
      { name: "ConvertKit", description: "Email automation", logo: "✉️" },
      { name: "Stripe", description: "Payment processing", logo: "💳" },
      { name: "Cal.com", description: "Booking automation", logo: "📅" },
    ]
  },
];

export function TechStackDark() {
  return (
    <section className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-gray-800 bg-gray-900/50 text-orange-500">
            <Cpu className="mr-2 h-3 w-3" />
            Tech Stack
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            The Tools You'll Master
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Learn the exact AI tools and platforms our students use to build 
            $10K/month businesses without writing code
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-white">{category.name}</h3>
              <div className="grid gap-3">
                {category.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + toolIndex * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="p-4 bg-gray-900/50 border-gray-800 backdrop-blur hover:border-orange-500/30 transition-all">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{tool.logo}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{tool.name}</h4>
                          <p className="text-sm text-gray-400">{tool.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            Plus 20+ more tools, templates, and resources included in the course
          </p>
        </motion.div>
      </div>
    </section>
  );
}