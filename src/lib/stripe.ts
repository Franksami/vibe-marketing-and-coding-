import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-06.acacia",
  typescript: true,
});

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount / 100);
};

export interface CheckoutSessionData {
  priceId: string;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession(data: CheckoutSessionData) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: data.successUrl,
    cancel_url: data.cancelUrl,
    customer_email: data.userEmail,
    client_reference_id: data.userId,
    metadata: {
      userId: data.userId,
      productType: "founding_member",
    },
  });

  return session;
}

export async function retrieveCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId);
}

export async function createCustomer(email: string, userId: string) {
  return stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });
}