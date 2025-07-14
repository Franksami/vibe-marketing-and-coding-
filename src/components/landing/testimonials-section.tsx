import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      content: "I went from struggling with basic React to building and selling a $5K SaaS in 6 weeks. The Cursor + Claude workflow is absolutely game-changing.",
      author: "Marcus Johnson",
      role: "Freelance Developer",
      company: "Previously at Meta",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
      rating: 5,
      highlight: "$5K SaaS in 6 weeks",
    },
    {
      content: "As an agency owner, adding 'Custom Development' to our services increased our average project value from $3K to $15K. Best investment I've made.",
      author: "Rachel Kim",
      role: "Agency Owner",
      company: "Digital Craft Studio",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel",
      rating: 5,
      highlight: "5x project value",
    },
    {
      content: "The community alone is worth the price. Having 10K+ developers to learn from and getting weekly live coding sessions is incredible.",
      author: "Alex Chen",
      role: "Full Stack Developer",
      company: "Indie Hacker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      rating: 5,
      highlight: "Amazing community",
    },
    {
      content: "I replaced my entire no-code stack with custom apps built using Vibe Coding. My clients love the professional UIs and I love the control.",
      author: "Sarah Wilson",
      role: "Automation Consultant",
      company: "Wilson Automations",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 5,
      highlight: "Replaced no-code stack",
    },
    {
      content: "The course paid for itself with my first project. I built a custom dashboard for a client in 3 days and charged $8K. Mind blown.",
      author: "David Park",
      role: "Solopreneur",
      company: "Park Digital",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      rating: 5,
      highlight: "$8K in 3 days",
    },
    {
      content: "I've taken many coding courses, but this is the first one that actually teaches you how to build real products that clients will pay for.",
      author: "Emma Thompson",
      role: "Product Designer",
      company: "Turned Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      rating: 5,
      highlight: "Real-world focus",
    },
  ];

  return (
    <section id="community" className="py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Join 10,000+ Developers Building with AI
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real results from real developers who transformed their careers with Vibe Coding
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col">
              <CardContent className="flex-1 p-6">
                {/* Rating */}
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Highlight Badge */}
                <Badge variant="secondary" className="mb-4">
                  {testimonial.highlight}
                </Badge>

                {/* Content */}
                <p className="text-sm leading-relaxed">&quot;{testimonial.content}&quot;</p>
              </CardContent>

              <CardFooter className="border-t bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>
                      {testimonial.author.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Success Metrics */}
        <Card className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-8">
            <div className="grid gap-8 text-center md:grid-cols-4">
              <div>
                <p className="text-4xl font-bold">87%</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Students land higher-paying projects
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">$127K</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Average annual income increase
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">21 days</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Average time to first paid project
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">4.9/5</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Student satisfaction rating
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}