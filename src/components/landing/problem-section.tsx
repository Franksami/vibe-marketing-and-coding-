import { Card } from "@/components/ui/card";
import { XCircle, CheckCircle2 } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      title: "Spending Weeks on Boilerplate",
      description: "Setting up auth, databases, and basic CRUD takes forever",
    },
    {
      title: "Deliverables Look Unprofessional", 
      description: "Your automations work but lack the polish clients expect",
    },
    {
      title: "Can't Charge Premium Prices",
      description: "Without beautiful UIs, you're stuck competing on price",
    },
    {
      title: "Slow Development Cycles",
      description: "Traditional coding methods can't keep up with client demands",
    },
  ];

  const solutions = [
    {
      title: "Ship Full Apps in Hours",
      description: "Go from idea to deployed app faster than ever before",
    },
    {
      title: "Professional UIs Every Time",
      description: "Create stunning interfaces that impress clients",
    },
    {
      title: "Charge $10K+ Per Project",
      description: "Command premium prices with premium deliverables",
    },
    {
      title: "10x Development Speed",
      description: "AI-assisted coding that actually works in production",
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Old Way is Broken
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Traditional development is too slow, and no-code tools are too limited. 
            There&apos;s a better way.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Problems */}
          <div>
            <h3 className="mb-8 text-xl font-semibold text-destructive">
              Without Vibe Coding
            </h3>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <Card key={index} className="border-destructive/20 bg-destructive/5 p-6">
                  <div className="flex gap-4">
                    <XCircle className="h-5 w-5 flex-shrink-0 text-destructive" />
                    <div>
                      <h4 className="font-semibold">{problem.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-8 text-xl font-semibold text-primary">
              With Vibe Coding
            </h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <Card key={index} className="border-primary/20 bg-primary/5 p-6">
                  <div className="flex gap-4">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">{solution.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
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
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center">
          <p className="text-2xl font-semibold">
            &quot;I went from charging $500 for basic automations to{" "}
            <span className="text-primary">$15,000 for full-stack dashboards</span>{" "}
            in just 3 months&quot;
          </p>
          <p className="mt-4 text-muted-foreground">
            - Sarah Chen, Vibe Academy Graduate
          </p>
        </div>
      </div>
    </section>
  );
}