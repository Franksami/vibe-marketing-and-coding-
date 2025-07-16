"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "I have zero coding experience. Can I really build AI apps?",
    answer: "Absolutely! 73% of our successful students started with no technical background. Our system uses conversational AI tools like Claude Code and Cursor that let you build sophisticated applications by describing what you want in plain English.",
  },
  {
    question: "How quickly can I start making money?",
    answer: "Most students land their first paying client within 14 days. We provide templates, scripts, and a proven client acquisition system. Sarah from Texas closed a $3,000 project in her second week!",
  },
  {
    question: "What if I don't have time for a full course?",
    answer: "The course is designed for busy people. Core modules are 60-90 minutes each, and you can implement as you learn. Many students build their business working just 1-2 hours per day.",
  },
  {
    question: "Is the AI market already saturated?",
    answer: "Not even close! Less than 3% of businesses use AI effectively. The market is growing 37% yearly, and demand far exceeds supply. Our students regularly close $5K-20K projects because businesses desperately need these services.",
  },
  {
    question: "What's included in the course?",
    answer: "Everything you need: 12+ hours of step-by-step videos, done-for-you templates, client acquisition scripts, pricing calculators, legal contracts, weekly group coaching, private community access, and lifetime updates.",
  },
  {
    question: "Do you offer a guarantee?",
    answer: "Yes! We offer a 30-day money-back guarantee. If you follow the system and don't land at least one paying client within 30 days, we'll refund your investment. We're that confident in our methods.",
  },
  {
    question: "How is this different from other AI courses?",
    answer: "We focus on practical business building, not theory. While others teach prompt engineering, we show you how to package AI services into $5K-20K projects. Plus, our community and weekly coaching ensure you actually implement and succeed.",
  },
  {
    question: "Can I really make $10K/month with AI?",
    answer: "Our top students make much more! But yes, $10K/month is very achievable. With just 2-3 clients paying $3-5K each, you're there. We provide the exact pricing strategies and service packages that work.",
  },
];

export function FAQDark() {
  return (
    <section className="py-20 bg-gray-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-gray-800 bg-gray-900/50 text-orange-500">
            <HelpCircle className="mr-2 h-3 w-3" />
            FAQs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Your Questions, Answered
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to know before getting started
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-900/50 border border-gray-800 rounded-lg px-6 backdrop-blur"
              >
                <AccordionTrigger className="text-left text-white hover:text-orange-500 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a 
            href="mailto:support@thevibelaunch.ai" 
            className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
          >
            Email us at support@thevibelaunch.ai
          </a>
        </motion.div>
      </div>
    </section>
  );
}