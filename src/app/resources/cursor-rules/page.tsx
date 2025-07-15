import { Metadata } from 'next';
import { EmailSignupForm } from '@/components/email-signup-form';
import { LeadMagnetDownload } from '@/components/lead-magnet-download';
import { Code, Zap, Shield, Rocket, Users, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Cursor Rules Starter Pack - 10x Your AI Coding Speed',
  description: 'Download battle-tested Cursor rules for React, Next.js, Node.js, Python, and more. Write better code faster with AI-optimized patterns.',
  openGraph: {
    title: 'Free Cursor Rules Starter Pack',
    description: '10x your coding speed with AI-optimized rules',
    images: ['/og-cursor-rules.png'],
  },
};

const benefits = [
  {
    icon: <Zap className="text-yellow-400" size={24} />,
    title: "10x Faster Coding",
    description: "Generate production-ready code that follows best practices instantly"
  },
  {
    icon: <Shield className="text-green-400" size={24} />,
    title: "Fewer Bugs",
    description: "AI follows proven patterns that prevent common mistakes"
  },
  {
    icon: <Code className="text-blue-400" size={24} />,
    title: "Consistent Style",
    description: "Every line of code follows your team's conventions automatically"
  },
  {
    icon: <Rocket className="text-purple-400" size={24} />,
    title: "Ship Faster",
    description: "Spend less time on boilerplate and more time on features"
  }
];

const frameworks = [
  "React + TypeScript",
  "Next.js 14 App Router",
  "Node.js Backend",
  "Python",
  "Testing Patterns",
  "Debugging Strategies",
  "Performance Optimization"
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    content: "These rules transformed how I work with Cursor. What used to take hours now takes minutes.",
    rating: 5
  },
  {
    name: "Mike Rodriguez",
    role: "Full-Stack Developer",
    content: "The testing rules alone saved me so much time. My test coverage went from 40% to 85% effortlessly.",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Tech Lead",
    content: "We adopted these rules across our entire team. Code reviews are now a breeze!",
    rating: 5
  }
];

export default function CursorRulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            10x Your Coding Speed with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Battle-tested Cursor rules that help you write better code faster. 
            Used by 1,000+ developers to ship production apps with AI.
          </p>
        </div>

        {/* Download Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <LeadMagnetDownload
            fileName="cursor-rules-starter-pack.zip"
            fileUrl="/downloads/cursor-rules-starter-pack.zip"
            title="Your Free Cursor Rules Starter Pack"
            description="7 framework-specific rule sets to supercharge your AI coding workflow"
          />
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="px-4 py-16 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What&apos;s Included in Your Pack
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {frameworks.map((framework, index) => (
              <div key={index} className="flex items-center gap-3">
                <Star className="text-yellow-400 flex-shrink-0" size={20} />
                <span className="text-lg">{framework}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How to Use Your Cursor Rules
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Download & Extract</h3>
                <p className="text-gray-400">Get your starter pack and unzip it to see all the rule files</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Copy to Your Project</h3>
                <p className="text-gray-400">Place the .cursorrules file in your project root directory</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Start Coding with AI</h3>
                <p className="text-gray-400">Cursor will automatically use your rules for better code generation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Developers Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want More AI Coding Tips?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 5,000+ developers getting weekly tips on building with AI
          </p>
          <EmailSignupForm
            source="cursor-rules-page"
            buttonText="Send Me Weekly Tips"
            description="Plus: Get our 7-Day Vibe Marketing Email Course"
            incentive="Unsubscribe anytime. We respect your inbox."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Code Faster?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Download your free Cursor rules and start shipping better code today
          </p>
          <LeadMagnetDownload
            fileName="cursor-rules-starter-pack.zip"
            fileUrl="/downloads/cursor-rules-starter-pack.zip"
            title="Get Your Free Starter Pack"
            description="No email required. Instant download."
          />
        </div>
      </section>
    </div>
  );
}
