import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Get user ID from session
        const userId = session.client_reference_id;
        
        if (!userId) {
          console.error("No user ID in checkout session");
          break;
        }

        // Update user to founding member
        await prisma.user.update({
          where: { id: userId },
          data: {
            isFoundingMember: true,
            purchasedAt: new Date(),
            stripeCustomerId: session.customer as string,
          },
        });

        console.log(`User ${userId} upgraded to founding member`);

        // TODO: Send confirmation email via ConvertKit
        // TODO: Add user to founding member tag in ConvertKit
        
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment succeeded:", paymentIntent.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", paymentIntent.id);
        // TODO: Send failure notification
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}