"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import { toast } from "sonner";

interface EmailSignupFormProps {
  source?: string;
  buttonText?: string;
  placeholder?: string;
  description?: string;
  incentive?: string;
  onSuccess?: () => void;
}

export function EmailSignupForm({
  source = "website",
  buttonText = "Get Free Resources",
  placeholder = "Enter your email",
  description = "Join 500+ developers building with AI",
  incentive = "Get instant access to our Cursor rules starter pack!",
  onSuccess,
}: EmailSignupFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setIsSuccess(true);
      toast.success("Check your email for your free resources!");
      
      // Clear form
      setEmail("");
      setFirstName("");

      // Track conversion (if analytics is set up)
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "newsletter_signup", {
          event_category: "engagement",
          event_label: source,
        });
      }

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to subscribe. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 p-6 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-950">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <p className="text-lg font-medium text-green-700 dark:text-green-300">
          Success! Check your email.
        </p>
        <p className="text-sm text-muted-foreground">
          Resources sent to {email}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-4">
      {description && (
        <p className="text-center text-muted-foreground">{description}</p>
      )}
      
      {incentive && (
        <div className="flex items-center justify-center space-x-2 text-sm">
          <Mail className="h-4 w-4 text-primary" />
          <span className="font-medium">{incentive}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
            className="flex-1"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || !email}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>

      <p className="text-xs text-center text-muted-foreground">
        No spam. Unsubscribe anytime. By subscribing, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}