"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XCircle, CheckCircle2, AlertCircle, TrendingUp, ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function ProblemSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const problems = [
    {
      title: "Watching Others Win While You're Stuck",
      description: "Every day you see people with less experience launching successful AI businesses",
      stat: "87% of new AI businesses launched by non-coders",
      icon: "😤",
    },
    {
      title: "Your Ideas Are Worth $100K+ But...", 
      description: "You can't execute them without spending $50K on developers or years learning to code",
      stat: "Average dev cost: $150-300/hour",
      icon: "💸",
    },
    {
      title: "AI Changed Everything—Except Your Income",
      description: "While others build AI agencies charging $10K/month, you're still trading hours for dollars",
      stat: "AI market growing 37% yearly",
      icon: "📈",
    },
    {
      title: "You're One Skill Away from Freedom",
      description: "The only thing between you and a 6-figure business is knowing how to leverage AI tools",
      stat: "48 hours to first paying customer",
      icon: "🔓",
    },
  ];

  const solutions = [
    {
      title: "Turn AI Into Your Personal Dev Team",
      description: "Build sophisticated apps, SaaS products, and automation systems using conversational AI",
      highlight: "No code required",
      icon: "🤖",
    },
    {
      title: "Launch Revenue-Generating Apps in 48 Hours",
      description: "Our students average their first paying customer within 2 days of starting",
      highlight: "Proven fast",
      icon: "🚀",
    },
    {
      title: "Build Once, Sell Forever",
      description: "Create products that generate $5-50K/month on autopilot with AI-powered systems",
      highlight: "Passive income",
      icon: "💰",
    },
    {
      title: "Join 500+ Successful AI Entrepreneurs",
      description: "Get the exact blueprints, workflows, and support system that created multiple 6-figure businesses",
      highlight: "Community backed",
      icon: "👥",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariantsRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 rounded-full bg-destructive/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 border-slate-200 bg-slate-50">
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
        </motion.div>

        <motion.div 
          ref={ref}
          className="mt-16 grid gap-8 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Problems */}
          <div>
            <h3 className="mb-8 text-xl font-semibold flex items-center gap-2">
              <motion.div 
                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
              >
                <XCircle className="h-5 w-5 text-slate-600" />
              </motion.div>
              The Struggle Is Real
            </h3>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="group border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 transition-all hover:shadow-md hover:border-slate-300">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <motion.span 
                          className="text-2xl"
                          animate={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {problem.icon}
                        </motion.span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{problem.title}</h4>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {problem.description}
                          </p>
                        </div>
                      </div>
                      {problem.stat && (
                        <motion.div 
                          className="pt-3 border-t border-destructive/10"
                          initial={{ width: 0 }}
                          animate={inView ? { width: "100%" } : { width: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                          <p className="text-xs font-medium text-destructive">{problem.stat}</p>
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-8 text-xl font-semibold flex items-center gap-2">
              <motion.div 
                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle2 className="h-5 w-5 text-slate-600" />
              </motion.div>
              Your New Reality
            </h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  variants={itemVariantsRight}
                  whileHover={{ scale: 1.02, x: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="group border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition-all hover:shadow-md hover:border-slate-300">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <motion.span 
                          className="text-2xl"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {solution.icon}
                        </motion.span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg flex items-center gap-2 flex-wrap">
                            {solution.title}
                            {solution.highlight && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={inView ? { scale: 1 } : { scale: 0 }}
                                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                              >
                                <Badge variant="secondary" className="text-xs">
                                  {solution.highlight}
                                </Badge>
                              </motion.div>
                            )}
                          </h4>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {solution.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Transformation statement with parallax effect */}
        <motion.div 
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-50 p-12 border border-slate-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="absolute inset-0 gradient-mesh opacity-10" />
          
          {/* Floating elements */}
          <motion.div
            className="absolute top-10 left-10 text-6xl opacity-10"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            💡
          </motion.div>
          <motion.div
            className="absolute bottom-10 right-10 text-6xl opacity-10"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
          >
            🚀
          </motion.div>
          
          <div className="relative z-10 space-y-6">
            <motion.div 
              className="flex justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Badge className="px-4 py-1.5 bg-slate-900 text-white border-0">
                <TrendingUp className="mr-2 h-4 w-4" />
                Success Story
              </Badge>
            </motion.div>
            
            <motion.blockquote 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p className="text-2xl sm:text-3xl font-semibold leading-tight">
                "I replaced my $120K salary in 4 months by building 
                <span className="text-gradient"> AI-powered tools</span> for local businesses. 
                Zero coding experience when I started."
              </p>
            </motion.blockquote>
            
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <p className="font-semibold">Alex Rivera</p>
              <p className="text-sm text-muted-foreground">Former Marketing Manager → AI Entrepreneur</p>
              <div className="flex gap-4 mt-2 text-sm">
                {[
                  { icon: CheckCircle2, text: "$32K MRR" },
                  { icon: CheckCircle2, text: "12 Active Clients" },
                  { icon: CheckCircle2, text: "Working 20hrs/week" },
                ].map((item, index) => (
                  <motion.span 
                    key={index}
                    className="flex items-center gap-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.text}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="flex justify-center pt-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              <motion.a
                href="#business-models"
                className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
                whileHover={{ x: 5 }}
              >
                See how Alex did it
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}