import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, Users, Award } from "lucide-react";
import Link from "next/link";

export function CoursePreviewDark() {
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
    <section className="py-20 bg-gray-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-gray-800 bg-gray-900/50 text-orange-500">
            <PlayCircle className="mr-2 h-3 w-3" />
            Course Preview
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            What You'll Learn
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A complete roadmap from zero to $10K/month using AI tools. 
            No fluff, just actionable strategies that work.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center bg-gray-900/50 border-gray-800 backdrop-blur">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Modules */}
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Course Curriculum</CardTitle>
            <CardDescription className="text-gray-400">
              12 modules designed to take you from beginner to profitable entrepreneur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
                {modules.map((category, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={index.toString()}
                    className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                  >
                    {category.category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {modules.map((category, categoryIndex) => (
                <TabsContent key={categoryIndex} value={categoryIndex.toString()} className="mt-6">
                  <div className="space-y-4">
                    {category.modules.map((module, moduleIndex) => (
                      <div
                        key={moduleIndex}
                        className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">
                            {module.number}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{module.title}</h4>
                            <p className="text-sm text-gray-400">
                              {module.lessons > 0 ? `${module.lessons} lessons` : 'Live sessions'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="h-4 w-4" />
                          {module.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white border-0" asChild>
            <Link href="#pricing">
              Get Instant Access
              <PlayCircle className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-gray-400">
            Join 2,847+ students • Lifetime access • 30-day guarantee
          </p>
        </div>
      </div>
    </section>
  );
}