"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Former Teacher → AI Agency Owner",
    content: "In 3 months, I went from zero tech skills to running a $15K/month AI automation agency. The step-by-step system made it possible.",
    rating: 5,
    revenue: "$15K/month",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Ex-Accountant → Chatbot Consultant",
    content: "The client acquisition strategies alone paid for the course 10x over. Now I have a waitlist for my chatbot services.",
    rating: 5,
    revenue: "$8K/month",
    avatar: "MJ",
  },
  {
    name: "Emily Rodriguez",
    role: "Freelancer → SaaS Founder",
    content: "Built my first SaaS using Claude Code in 2 weeks. It now generates $5K MRR on autopilot. Life-changing course!",
    rating: 5,
    revenue: "$5K MRR",
    avatar: "ER",
  },
  {
    name: "David Park",
    role: "Marketing Manager → AI Consultant",
    content: "The community support is incredible. Got my first $3K client within 10 days of starting. Now closing $5-10K deals regularly.",
    rating: 5,
    revenue: "$20K/month",
    avatar: "DP",
  },
  {
    name: "Lisa Thompson",
    role: "Stay-at-home Mom → AI Designer",
    content: "Started with zero experience, now earning more than my previous corporate job while working from home. My family is amazed!",
    rating: 5,
    revenue: "$7K/month",
    avatar: "LT",
  },
  {
    name: "James Wright",
    role: "College Student → AI Developer",
    content: "Paid off my student loans in 6 months. The ROI on this course is insane. Best investment I've ever made.",
    rating: 5,
    revenue: "$12K/month",
    avatar: "JW",
  },
];

export function TestimonialsDark() {
  return (
    <section id="community" className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-gray-800 bg-gray-900/50 text-orange-500">
            <Quote className="mr-2 h-3 w-3" />
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Real People, Real Results
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join hundreds of students who transformed their lives with AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-gray-900/50 border-gray-800 backdrop-blur p-6 hover:border-orange-500/30 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-orange-500/20 text-orange-500">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {testimonial.revenue}
                  </Badge>
                </div>

                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-400">
            <span className="font-bold text-white">Average student result:</span> First paying client within 14 days
          </p>
        </motion.div>
      </div>
    </section>
  );
}