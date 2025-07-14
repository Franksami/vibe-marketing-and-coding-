"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import Link from "next/link";

export function PurchaseSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    // In a real app, you'd verify the session with your backend
    // For now, we'll assume success if we have a session ID
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <CardTitle>Processing your purchase...</CardTitle>
              <CardDescription>Please wait while we confirm your payment</CardDescription>
            </>
          )}
          
          {status === "success" && (
            <>
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Welcome to Vibe Academy!</CardTitle>
              <CardDescription>
                You&apos;re now a founding member with lifetime access
              </CardDescription>
            </>
          )}
          
          {status === "error" && (
            <>
              <XCircle className="h-12 w-12 mx-auto mb-4 text-red-600" />
              <CardTitle>Something went wrong</CardTitle>
              <CardDescription>
                We couldn&apos;t verify your purchase. Please contact support.
              </CardDescription>
            </>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {status === "success" && (
            <>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">What happens next?</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ Check your email for login instructions</li>
                  <li>✓ Join our exclusive Skool community</li>
                  <li>✓ Access all course materials immediately</li>
                  <li>✓ Get lifetime updates and new content</li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/library">Access Your Library</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://skool.com/vibe-coding">Join Community</Link>
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground">
                Need help? Email us at support@vibecodingacademy.com
              </p>
            </>
          )}
          
          {status === "error" && (
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/#pricing">Try Again</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}