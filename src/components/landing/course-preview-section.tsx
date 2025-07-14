import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, Users, Award } from "lucide-react";
import Link from "next/link";

export function CoursePreviewSection() {
  const modules = [
    {
      category: "Foundation",
      modules: [
        { number: 1, title: "Master Cursor Setup", duration: "45 min", lessons: 6 },
        { number: 2, title: "Project Navigation Mastery", duration: "30 min", lessons: 4 },
        { number: 3, title: "Custom Modes & Workflows", duration: "60 min", lessons: 8 },
      ],
    },
    {
      category: "Advanced",
      modules: [
        { number: 4, title: "AI-Powered PRD Generation", duration: "50 min", lessons: 5 },
        { number: 5, title: "Powerful Cursor Rules", duration: "40 min", lessons: 6 },
        { number: 6, title: "AI Guidance Systems", duration: "55 min", lessons: 7 },
      ],
    },
    {
      category: "Integration",
      modules: [
        { number: 7, title: "Model Context Protocol", duration: "45 min", lessons: 5 },
        { number: 8, title: "MCP Server Installation", duration: "35 min", lessons: 4 },
        { number: 9, title: "Package Management", duration: "40 min", lessons: 5 },
      ],
    },
    {
      category: "Build",
      modules: [
        { number: 10, title: "Plan Your MVP", duration: "60 min", lessons: 6 },
        { number: 11, title: "Build & Test", duration: "90 min", lessons: 10 },
        { number: 12, title: "Deploy to Production", duration: "45 min", lessons: 5 },
      ],
    },
    {
      category: "Supabase",
      modules: [
        { number: 13, title: "Database & Auth Setup", duration: "60 min", lessons: 8 },
        { number: 14, title: "Real-time Features", duration: "50 min", lessons: 6 },
        { number: 15, title: "Production Deployment", duration: "40 min", lessons: 5 },
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
            The Vibe Coding Masterclass
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A comprehensive, step-by-step curriculum that takes you from beginner to 
            shipping production-ready apps with AI assistance.
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
            <TabsList className="grid w-full grid-cols-5">
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