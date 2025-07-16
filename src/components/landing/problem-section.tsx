import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XCircle, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      title: "Watching Others Win While You're Stuck",
      description: "Every day you see people with less experience launching successful AI businesses",
      stat: "87% of new AI businesses launched by non-coders",
    },
    {
      title: "Your Ideas Are Worth $100K+ But...", 
      description: "You can't execute them without spending $50K on developers or years learning to code",
      stat: "Average dev cost: $150-300/hour",
    },
    {
      title: "AI Changed Everything—Except Your Income",
      description: "While others build AI agencies charging $10K/month, you're still trading hours for dollars",
      stat: "AI market growing 37% yearly",
    },
    {
      title: "You're One Skill Away from Freedom",
      description: "The only thing between you and a 6-figure business is knowing how to leverage AI tools",
      stat: "48 hours to first paying customer",
    },
  ];

  const solutions = [
    {
      title: "Turn AI Into Your Personal Dev Team",
      description: "Build sophisticated apps, SaaS products, and automation systems using conversational AI",
      highlight: "No code required",
    },
    {
      title: "Launch Revenue-Generating Apps in 48 Hours",
      description: "Our students average their first paying customer within 2 days of starting",
      highlight: "Proven fast",
    },
    {
      title: "Build Once, Sell Forever",
      description: "Create products that generate $5-50K/month on autopilot with AI-powered systems",
      highlight: "Passive income",
    },
    {
      title: "Join 500+ Successful AI Entrepreneurs",
      description: "Get the exact blueprints, workflows, and support system that created multiple 6-figure businesses",
      highlight: "Community backed",
    },
  ];

  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 gradient-mesh opacity-10" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-destructive/20 bg-destructive/5">
            <AlertCircle className="mr-2 h-3 w-3" />
            The Real Problem No One's Talking About
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            You're Not Too Late—You're Using the 
            <span className="text-gradient"> Wrong Approach</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            The difference between struggling and earning $10K/month isn't talent or timing. 
            It's having the right system to turn AI into your unfair advantage.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Problems */}
          <div>
            <h3 className="mb-8 text-xl font-semibold flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              The Struggle Is Real
            </h3>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <Card key={index} className="group border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10 p-6 transition-all hover:shadow-md hover:scale-[1.02]">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg">{problem.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {problem.description}
                      </p>
                    </div>
                    {problem.stat && (
                      <div className="pt-3 border-t border-destructive/10">
                        <p className="text-xs font-medium text-destructive">{problem.stat}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-8 text-xl font-semibold flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              Your New Reality
            </h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <Card key={index} className="group border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 transition-all hover:shadow-md hover:scale-[1.02] hover:border-primary/40">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        {solution.title}
                        {solution.highlight && (
                          <Badge variant="secondary" className="text-xs">
                            {solution.highlight}
                          </Badge>
                        )}
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Transformation statement */}
        <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-12">
          <div className="absolute inset-0 gradient-mesh opacity-10" />
          <div className="relative z-10 space-y-6">
            <div className="flex justify-center">
              <Badge className="px-4 py-1.5 bg-gradient-primary text-white border-0">
                <TrendingUp className="mr-2 h-4 w-4" />
                Success Story
              </Badge>
            </div>
            <blockquote className="text-center">
              <p className="text-2xl sm:text-3xl font-semibold leading-tight">
                &quot;I replaced my $120K salary in 4 months by building 
                <span className="text-gradient"> AI-powered tools</span> for local businesses. 
                Zero coding experience when I started.&quot;
              </p>
            </blockquote>
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold">Alex Rivera</p>
              <p className="text-sm text-muted-foreground">Former Marketing Manager → AI Entrepreneur</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  $32K MRR
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  12 Active Clients
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Working 20hrs/week
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}