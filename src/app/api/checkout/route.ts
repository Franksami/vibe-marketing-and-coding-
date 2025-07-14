import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to purchase" },
        { status: 401 }
      );
    }

    const { priceId } = await request.json();

    // Use the founding member price if no priceId provided
    const finalPriceId = priceId || process.env.STRIPE_FOUNDING_MEMBER_PRICE_ID;

    if (!finalPriceId) {
      return NextResponse.json(
        { error: "No price ID configured" },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Create Stripe checkout session
    const checkoutSession = await createCheckoutSession({
      priceId: finalPriceId,
      userId: session.user.id,
      userEmail: session.user.email,
      successUrl: `${origin}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/#pricing`,
    });

    return NextResponse.json({ 
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id 
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}