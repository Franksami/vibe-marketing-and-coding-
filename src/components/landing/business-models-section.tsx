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
  Briefcase
} from "lucide-react";
import Link from "next/link";

export function BusinessModelsSection() {
  const models = [
    {
      icon: TrendingUp,
      title: "Affiliate Marketing",
      income: "$2-10K/month",
      time: "Launch in 24 hours",
      description: "Build comparison tools and review sites that earn commissions",
      example: "AI tool comparison site earning $5,200/month",
      difficulty: "Easy",
    },
    {
      icon: Package,
      title: "Digital Products",
      income: "$3-15K/month",
      time: "Launch in 3 days",
      description: "Create and sell templates, tools, and info products",
      example: "Notion templates generating $8K/month passive income",
      difficulty: "Easy",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      income: "$5-20K/month", 
      time: "Launch in 1 week",
      description: "Sell digital downloads, prompts, and online tools",
      example: "AI prompt marketplace doing $12K/month",
      difficulty: "Medium",
    },
    {
      icon: Users,
      title: "Communities",
      income: "$5-15K/month",
      time: "Launch in 1 week",
      description: "Build paid membership sites and exclusive communities",
      example: "Trading community with 100 members at $97/month",
      difficulty: "Medium",
    },
    {
      icon: DollarSign,
      title: "Ad Revenue",
      income: "$1-5K/month",
      time: "Launch in 2 days",
      description: "Create viral tools and calculators that generate ad income",
      example: "Finance calculator site earning $3K/month from ads",
      difficulty: "Easy",
    },
    {
      icon: Megaphone,
      title: "Sponsorships",
      income: "$2-10K/month",
      time: "Launch in 2 weeks",
      description: "Build platforms that attract premium sponsors",
      example: "Newsletter with 5K subs earning $5K/month from sponsors",
      difficulty: "Medium",
    },
    {
      icon: Briefcase,
      title: "Service Business",
      income: "$10-50K/month",
      time: "Launch this week",
      description: "Offer done-for-you AI automation and development services",
      example: "AI automation agency charging $5K per project",
      difficulty: "Easy",
    },
  ];

  return (
    <section id="business-models" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            Choose Your Path to $10K/Month
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            7 Proven Business Models You Can Build with AI
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick the model that fits your lifestyle. Build it this week. 
            Scale to $10K/month using our proven system.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {models.map((model) => (
            <Card key={model.title} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <model.icon className="h-8 w-8 text-primary" />
                  <Badge variant={model.difficulty === "Easy" ? "default" : "secondary"}>
                    {model.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{model.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-green-600">
                    {model.income}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {model.time}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">
                  {model.description}
                </CardDescription>
                <p className="text-sm text-muted-foreground italic">
                  Example: {model.example}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg mb-6">
            Not sure which model to choose? Our course shows you how to combine multiple models 
            for unstoppable income.
          </p>
          <Button size="lg" asChild>
            <Link href="#courses">
              See How to Build Each Model →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}