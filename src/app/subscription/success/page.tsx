'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, Users, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SubscriptionSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // In production, verify session with Stripe
    // For now, just show success
    if (sessionId) {
      // Could fetch session details here
    }
  }, [sessionId]);

  const nextSteps = [
    {
      icon: Download,
      title: 'Download Your Products',
      description: 'Get instant access to the Ultimate Cursor Rulebook and all current products.',
      action: 'Download Now',
      href: '/downloads',
    },
    {
      icon: Users,
      title: 'Join the Community',
      description: 'Connect with other Pro members in our private Discord server.',
      action: 'Join Discord',
      href: 'https://discord.gg/thevibelaunch', // Update with real invite
    },
    {
      icon: BookOpen,
      title: 'Browse Resources',
      description: 'Explore exclusive tutorials, templates, and guides.',
      action: 'View Resources',
      href: '/resources',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Success Message */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Welcome to The Vibe Launch Pro! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your subscription is active. Let's get you started on your journey to coding 10x faster.
          </p>

          {/* Quick Info */}
          <Card className="max-w-2xl mx-auto p-6 mb-12">
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500 mb-1">Subscription Status</p>
                <p className="font-semibold text-green-600">Active ✓</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Billing Cycle</p>
                <p className="font-semibold">Monthly ($47)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Next Billing Date</p>
                <p className="font-semibold">In 30 days</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Member Since</p>
                <p className="font-semibold">Today!</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Next Steps</h2>
            <p className="text-gray-600">Get the most out of your Pro membership</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {nextSteps.map((step, i) => (
              <Card key={i} className="p-6 text-center">
                <step.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                <Button asChild>
                  <Link href={step.href}>{step.action}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Email */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent you a welcome email with all the links and resources you need to get started.
            If you don't see it, check your spam folder.
          </p>
          <p className="text-sm text-gray-500">
            Didn't receive it? <a href="mailto:support@thevibelaunch.ai" className="text-blue-500 hover:underline">Contact support</a>
          </p>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our team is here to ensure you succeed. Don't hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <a href="mailto:support@thevibelaunch.ai">Email Support</a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/pro/faq">View FAQ</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Pro Tips to Get Started
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                1
              </span>
              <div>
                <h3 className="font-semibold mb-1">Install your first cursor rule</h3>
                <p className="text-gray-600 text-sm">
                  Start with the React or Next.js rules from the Ultimate Cursor Rulebook. 
                  You'll see immediate productivity gains.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                2
              </span>
              <div>
                <h3 className="font-semibold mb-1">Join this week's coaching call</h3>
                <p className="text-gray-600 text-sm">
                  Every Thursday at 2pm EST. Check Discord for the link and topic.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                3
              </span>
              <div>
                <h3 className="font-semibold mb-1">Introduce yourself in Discord</h3>
                <p className="text-gray-600 text-sm">
                  Share what you're building and get help from the community. 
                  We're all here to help each other succeed!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}