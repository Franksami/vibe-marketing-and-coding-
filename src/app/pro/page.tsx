'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Sparkles, Zap, Users, BookOpen, Headphones, Package } from 'lucide-react';

export default function ProPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
          mode: 'subscription',
        }),
      });

      const { checkoutUrl } = await response.json();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: Package,
      title: 'All Premium Products',
      description: 'Instant access to Ultimate Cursor Rulebook ($47 value) plus all future products',
    },
    {
      icon: Sparkles,
      title: 'Monthly Rule Updates',
      description: 'New cursor rules every month for latest frameworks and patterns',
    },
    {
      icon: Users,
      title: 'Private Community',
      description: 'Connect with other pros who code 10x faster with AI',
    },
    {
      icon: Headphones,
      title: 'Weekly Group Coaching',
      description: 'Live calls to level up your AI coding skills',
    },
    {
      icon: BookOpen,
      title: 'Exclusive Resources',
      description: 'Templates, guides, and resources not available anywhere else',
    },
    {
      icon: Zap,
      title: 'Early Access',
      description: 'Be first to get new products and features',
    },
  ];

  const features = [
    'Ultimate Cursor Rulebook ($47 value)',
    'AI Freelancer Flywheel Course ($197 value)',
    'All future products included',
    'Monthly new cursor rules',
    'Private Discord community',
    'Weekly group coaching calls',
    'Priority email support',
    'Exclusive templates & resources',
    'Cancel anytime',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Limited Time: 7-Day Free Trial
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            The Vibe Launch Pro
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Everything you need to code 10x faster with AI. One subscription, unlimited potential.
          </p>

          {/* Pricing Card */}
          <Card className="max-w-md mx-auto p-8 shadow-xl border-2 border-purple-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              BEST VALUE
            </div>
            
            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-2">
                $47<span className="text-xl font-normal text-gray-500">/month</span>
              </div>
              <p className="text-gray-600">Cancel anytime. No BS.</p>
              <p className="text-sm text-green-600 font-medium mt-2">
                Start with 7-day free trial
              </p>
            </div>

            <Button 
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full py-6 text-lg font-semibold mb-6"
              size="lg"
            >
              {isLoading ? 'Loading...' : 'Start Your Free Trial →'}
            </Button>

            <div className="space-y-3">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          <p className="mt-6 text-sm text-gray-500">
            ⚡ Join 100+ developers already coding faster
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You Get as a Pro Member
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <Card key={i} className="p-6">
                <benefit.icon className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">The Math is Simple</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-4xl font-bold text-purple-600">15-20</div>
              <p className="text-gray-600">Hours saved per week</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500">$100+</div>
              <p className="text-gray-600">Average hourly rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500">$1,500+</div>
              <p className="text-gray-600">Value per week</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-8">
            At $47/month, The Vibe Launch Pro pays for itself in less than 30 minutes of saved time.
          </p>

          <Button 
            onClick={handleSubscribe}
            disabled={isLoading}
            size="lg"
            className="py-6 px-8 text-lg"
          >
            Start Saving Time Today →
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Questions?</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What happens after the trial?</h3>
              <p className="text-gray-600">You&apos;ll be charged $47/month after your 7-day trial ends. Cancel anytime before and pay nothing.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes! No contracts, no minimums. Cancel with one click from your account.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Do I get access to everything immediately?</h3>
              <p className="text-gray-600">Yes! As soon as you join, you get instant access to all products, the community, and resources.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Is this worth it if I already bought the Rulebook?</h3>
              <p className="text-gray-600">Absolutely! You get monthly updates, new products, coaching calls, and community access that far exceed the rulebook alone.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a href="mailto:support@thevibelaunch.ai" className="text-purple-600 hover:underline">
              Email support@thevibelaunch.ai
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Code 10x Faster?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join The Vibe Launch Pro today and transform how you build with AI.
          </p>
          <Button 
            onClick={handleSubscribe}
            disabled={isLoading}
            size="lg"
            variant="secondary"
            className="py-6 px-8 text-lg"
          >
            Start Your 7-Day Free Trial →
          </Button>
          <p className="mt-4 text-sm opacity-75">
            No credit card required for trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}