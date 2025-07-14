"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Sparkles, Gift } from "lucide-react";
import { toast } from "sonner";
import { trackEvents } from "@/components/analytics/google-analytics";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown this session
    const shown = sessionStorage.getItem("exitIntentShown");
    if (shown) {
      setHasShown(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    // Desktop exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && !isOpen) {
        // Small delay to prevent accidental triggers
        timeoutId = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
          sessionStorage.setItem("exitIntentShown", "true");
          // Track exit intent shown
          trackEvents.exitIntent('power_pack');
        }, 100);
      }
    };

    // Mobile exit intent (scroll up rapidly)
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = lastScrollY - currentScrollY;
      
      // Detect rapid upward scroll (likely trying to leave)
      if (timeDiff > 0) {
        const scrollSpeed = scrollDiff / timeDiff;
        if (scrollSpeed > 2 && currentScrollY < 100 && !hasShown && !isOpen) {
          setIsOpen(true);
          setHasShown(true);
          sessionStorage.setItem("exitIntentShown", "true");
        }
      }
      
      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    // Add listeners after a delay (don't annoy users immediately)
    const setupTimeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 10000); // Wait 10 seconds before activating

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(setupTimeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/capture-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Check your email for your exclusive offer!");
        setIsOpen(false);
        // Track successful conversion
        trackEvents.emailCapture('exit_intent');
        // Prevent showing again even in future sessions for 30 days
        const expires = new Date();
        expires.setDate(expires.getDate() + 30);
        document.cookie = `exitIntentComplete=true; expires=${expires.toUTCString()}; path=/`;
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check cookie to prevent showing to users who already submitted
  useEffect(() => {
    const hasCompleted = document.cookie.includes("exitIntentComplete=true");
    if (hasCompleted) {
      setHasShown(true);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Gift className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Wait! Don&apos;t Leave Empty-Handed 🎁</DialogTitle>
          <DialogDescription className="text-base">
            Get our exclusive <strong>Cursor Power Pack</strong> with 10 advanced rules 
            that will instantly level up your AI coding game.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Value props */}
          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              What You&apos;ll Get:
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 10 Advanced Cursor Rules (normally $47)</li>
              <li>• AI Prompt Cheat Sheet</li>
              <li>• Component Generation Templates</li>
              <li>• Debugging Workflow Guide</li>
            </ul>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Me The Power Pack →"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}