import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, Users, Award } from "lucide-react";
import Link from "next/link";

export function CoursePreviewSection() {
  const modules = [
    {
      category: "Money Models",
      modules: [
        { number: 0, title: "7 Ways to Make $10K/Month Online", duration: "90 min", lessons: 3 },
        { number: 0.5, title: "Tech Basics in Plain English", duration: "60 min", lessons: 6 },
        { number: 0.75, title: "Power User Secrets", duration: "75 min", lessons: 6 },
      ],
    },
    {
      category: "Business Foundation",
      modules: [
        { number: 1, title: "Design $100M Offers That Sell", duration: "60 min", lessons: 3 },
        { number: 2, title: "Get 10 Clients This Week", duration: "90 min", lessons: 3 },
        { number: 3, title: "Build & Deliver with AI", duration: "120 min", lessons: 3 },
      ],
    },
    {
      category: "Sales & Scale",
      modules: [
        { number: 4, title: "Close High-Ticket Sales", duration: "60 min", lessons: 3 },
        { number: 5, title: "Service Delivery Excellence", duration: "45 min", lessons: 3 },
        { number: 6, title: "Scale to $10K/Month", duration: "60 min", lessons: 3 },
      ],
    },
    {
      category: "Bonus Content",
      modules: [
        { number: 7, title: "AI Freelancer Flywheel", duration: "90 min", lessons: 5 },
        { number: 8, title: "Quick Win Templates", duration: "60 min", lessons: 10 },
        { number: 9, title: "Community & Support", duration: "Ongoing", lessons: 0 },
      ],
    },
  ];

  const stats = [
    { icon: Clock, label: "Total Duration", value: "12+ Hours" },
    { icon: PlayCircle, label: "Video Lessons", value: "95+" },
    { icon: Users, label: "Active Students", value: "2,847" },
    { icon: Award, label: "Completion Rate", value: "87%" },
  ];

  return (
    <section id="courses" className="py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The AI Transformation Business System
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The ONLY course that shows you how to build a $10K/month business using AI - 
            without writing a single line of code. 30-day proven system.
          </p>
        </div>

        {/* Course Stats */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-6">
                <stat.icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Modules */}
        <div className="mt-16">
          <Tabs defaultValue="Foundation" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {modules.map((category) => (
                <TabsTrigger key={category.category} value={category.category}>
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {modules.map((category) => (
              <TabsContent key={category.category} value={category.category} className="mt-8">
                <div className="grid gap-4 md:grid-cols-3">
                  {category.modules.map((module) => (
                    <Card key={module.number}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">Module {module.number}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {module.duration}
                          </span>
                        </div>
                        <CardTitle className="mt-2 text-lg">{module.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {module.lessons} lessons with hands-on exercises
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sample Lesson CTA */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle>Try a Free Sample Lesson</CardTitle>
            <CardDescription>
              Watch Module 1, Lesson 1: &quot;Setting Up Your AI Development Environment&quot;
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button size="lg" asChild>
              <Link href="#sample">
                <PlayCircle className="mr-2 h-4 w-4" />
                Watch Free Lesson
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}