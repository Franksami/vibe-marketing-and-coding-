import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function FAQSection() {
  const faqs = [
    {
      question: "Do I need prior coding experience?",
      answer: "Basic HTML/CSS/JavaScript knowledge is helpful but not required. We start from the fundamentals and many successful students come from no-code backgrounds. If you can follow tutorials and are willing to learn, you'll do great.",
      category: "requirements",
    },
    {
      question: "What exactly is Vibe Coding?",
      answer: "Vibe Coding is our methodology for building production-ready applications using AI tools like Cursor and Claude. It's not about replacing developers—it's about amplifying your abilities to build 10x faster while maintaining quality.",
      category: "general",
    },
    {
      question: "How long does it take to see results?",
      answer: "Most students complete their first paid project within 21 days. Some have landed $5K+ projects in their first month. The key is following our proven system and leveraging the community support.",
      category: "results",
    },
    {
      question: "Is the $499 one-time or recurring?",
      answer: "The Vibe Academy is a one-time payment of $499 (currently $299 for founding members) with lifetime access. This includes all future updates, new modules, and community access. No hidden fees or subscriptions.",
      category: "pricing",
    },
    {
      question: "What's included in the community?",
      answer: "Free tier includes access to our Skool community, weekly live sessions, and basic resources. Paid members get access to private channels, direct mentor support, exclusive workshops, and priority assistance.",
      category: "community",
    },
    {
      question: "Can I really charge $10K for projects?",
      answer: "Yes! We teach you to build professional, full-stack applications that solve real business problems. When you deliver this level of value, premium pricing is justified. We'll show you exactly how to position and sell these services.",
      category: "pricing",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with the course, just email us within 30 days for a full refund. No questions asked.",
      category: "guarantee",
    },
    {
      question: "What tools do I need to get started?",
      answer: "You'll need Cursor (free trial available), access to Claude AI ($20/month), and a computer that can run VS Code. We provide credits and discounts for many tools through our partnership program.",
      category: "requirements",
    },
    {
      question: "Is 1:1 coaching worth it?",
      answer: "If you're serious about fast-tracking your success or have specific project needs, absolutely. Our coaches have built dozens of production apps and can save you weeks of trial and error. Most coaching clients recoup the investment in their first project.",
      category: "coaching",
    },
    {
      question: "How is this different from other courses?",
      answer: "We focus on practical, production-ready skills using cutting-edge AI tools. You'll build on the actual platform we built with these tools, seeing real metrics and code. Plus, our community and ongoing support are unmatched.",
      category: "general",
    },
  ];

  const categories = {
    general: "General",
    requirements: "Requirements",
    pricing: "Pricing",
    results: "Results",
    community: "Community",
    guarantee: "Guarantee",
    coaching: "Coaching",
  };

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about Vibe Coding and our programs
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <span>{faq.question}</span>
                  <Badge variant="outline" className="ml-auto mr-4 hidden sm:inline-flex">
                    {categories[faq.category as keyof typeof categories]}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Support */}
        <div className="mt-12 rounded-lg border border-dashed p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions? Reach out to our team at{" "}
            <a href="mailto:support@vibecoding.com" className="font-medium text-primary hover:underline">
              support@vibecoding.com
            </a>{" "}
            or join our free community to ask current students.
          </p>
        </div>
      </div>
    </section>
  );
}