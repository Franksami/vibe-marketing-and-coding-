import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LibraryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b px-4 md:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className="font-semibold">Vibe Marketing & Coding</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link href="/library" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Library
          </Link>
          <Link href="/account" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Account
          </Link>
          <Button>Logout</Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Resource Library
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Welcome to your personal library of templates, workflows, and starter kits.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder for resource cards */}
                    <div className="bg-background rounded-lg border p-4 text-center">
                        <h3 className="text-lg font-bold">Coming Soon</h3>
                        <p className="text-sm text-muted-foreground">More resources are on the way!</p>
                    </div>
                     <div className="bg-background rounded-lg border p-4 text-center">
                        <h3 className="text-lg font-bold">Coming Soon</h3>
                        <p className="text-sm text-muted-foreground">More resources are on the way!</p>
                    </div>
                     <div className="bg-background rounded-lg border p-4 text-center">
                        <h3 className="text-lg font-bold">Coming Soon</h3>
                        <p className="text-sm text-muted-foreground">More resources are on the way!</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Vibe Marketing & Coding. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
} 