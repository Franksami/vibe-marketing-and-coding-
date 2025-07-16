import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Megaphone,
  Briefcase,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";

export function BusinessModelsSection() {
  const models = [
    {
      icon: Briefcase,
      title: "AI Automation Agency",
      income: "$10-50K/month",
      time: "First client in 48hrs",
      description: "Build custom AI solutions for businesses using no-code tools",
      example: "Solo agency owner: $32K/month with 8 clients",
      difficulty: "Hot",
      color: "from-orange-500/10 to-red-500/10",
    },
    {
      icon: ShoppingCart,
      title: "SaaS Products",
      income: "$5-30K/month",
      time: "MVP in 1 week",
      description: "Build subscription software without coding using AI",
      example: "Analytics dashboard: 200 users at $49/month",
      difficulty: "High ROI",
      color: "from-blue-500/10 to-purple-500/10",
    },
    {
      icon: Package,
      title: "Digital Products", 
      income: "$3-15K/month",
      time: "Selling in 3 days",
      description: "Package your knowledge into courses, templates, and tools",
      example: "Business templates: $11K/month passive income",
      difficulty: "Easy",
      color: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: Users,
      title: "Paid Communities",
      income: "$5-25K/month",
      time: "100 members in 30 days",
      description: "Create exclusive membership sites with AI-powered features",
      example: "Fitness community: 250 members at $47/month",
      difficulty: "Scalable",
      color: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: TrendingUp,
      title: "Content Arbitrage",
      income: "$2-10K/month",
      time: "Profitable in 2 weeks",
      description: "Build AI-powered content sites that rank and convert",
      example: "Comparison site: $7K/month affiliate commissions",
      difficulty: "Passive",
      color: "from-cyan-500/10 to-blue-500/10",
    },
    {
      icon: Megaphone,
      title: "Newsletter Empire",
      income: "$5-20K/month",
      time: "1K subs in 30 days",
      description: "Grow and monetize AI-curated newsletters",
      example: "Tech newsletter: 8K subs, $15K/month from sponsors",
      difficulty: "Growing",
      color: "from-amber-500/10 to-orange-500/10",
    },
    {
      icon: DollarSign,
      title: "Marketplace Apps",
      income: "$10-40K/month",
      time: "Live in 2 weeks",
      description: "Connect buyers and sellers with AI-powered platforms",
      example: "Service marketplace: $28K/month in fees",
      difficulty: "High Value",
      color: "from-indigo-500/10 to-purple-500/10",
    },
  ];

  return (
    <section id="business-models" className="relative py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 gradient-mesh opacity-20" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Zap className="mr-2 h-3 w-3" />
            Real Student Results
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            7 AI Business Models Making Our Students
            <span className="text-gradient"> $10-50K/Month</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Every model below is being used RIGHT NOW by non-technical founders 
            who started exactly where you are today.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {models.map((model) => (
            <Card 
              key={model.title} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group cursor-pointer`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-50`} />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-12 w-12 rounded-lg bg-background/80 backdrop-blur flex items-center justify-center shadow-sm">
                    <model.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge 
                    variant={model.difficulty === "Hot" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {model.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{model.title}</CardTitle>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-2xl font-bold text-primary">{model.income}</span>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="mb-3 text-sm">
                  {model.description}
                </CardDescription>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    ⏱️ {model.time}
                  </p>
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold">Real Result:</span> {model.example}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 p-8 sm:p-12">
          <div className="absolute inset-0 gradient-mesh opacity-20" />
          <div className="relative z-10 text-center space-y-6">
            <Badge className="bg-gradient-primary text-white border-0">
              <Sparkles className="mr-2 h-3 w-3" />
              Limited Time Bonus
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Can't Decide? Build Multiple Income Streams
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our students average 2.7 income streams within 90 days. 
              Get the complete playbook for all 7 business models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-gradient-primary text-white group" asChild>
                <Link href="#pricing" className="flex items-center">
                  Get All 7 Business Blueprints
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#testimonials">
                  See More Success Stories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}