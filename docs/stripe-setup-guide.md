# Stripe Payment Integration Setup Guide

## Overview

The landing page now includes Stripe integration for processing $499 Founding Member payments. When users click "Become Founding Member", they're redirected to Stripe Checkout for secure payment processing.

## Setup Steps

### 1. Get Your Stripe API Keys

1. Sign up or log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Toggle to **Test mode** for development
3. Go to **Developers → API keys**
4. Copy your keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### 2. Create Your Product and Price

1. Go to **Products** in Stripe Dashboard
2. Click **+ Add product**
3. Fill in:
   - Name: "Vibe Academy - Founding Member"
   - Description: "Lifetime access to Vibe Academy course and community"
   - Price: $499 (one-time)
4. Save the product
5. Copy the **Price ID** (starts with `price_`)

### 3. Configure Webhook Endpoint

1. Go to **Developers → Webhooks**
2. Click **+ Add endpoint**
3. Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)

### 4. Update Environment Variables

Update your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret
STRIPE_FOUNDING_MEMBER_PRICE_ID=price_your_actual_price_id
```

### 5. Test the Integration

1. Restart your dev server: `npm run dev`
2. Sign in to your account
3. Click "Become Founding Member" 
4. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
5. Any expiry date in the future, any CVC

## Features Implemented

✅ **Secure Checkout** - Stripe-hosted payment page
✅ **User Authentication** - Must be logged in to purchase
✅ **Automatic Upgrade** - Users marked as founding members after payment
✅ **Webhook Handling** - Reliable payment confirmation
✅ **Success Page** - Custom confirmation after purchase
✅ **Error Handling** - Graceful failure states

## Testing Webhooks Locally

For local development, use Stripe CLI:

1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copy the webhook signing secret shown
5. Update `STRIPE_WEBHOOK_SECRET` in `.env.local`

## Production Deployment

Before going live:

1. **Switch to Live Mode** in Stripe Dashboard
2. **Update API Keys** - Replace test keys with live keys
3. **Create Live Product** - Recreate product/price in live mode
4. **Update Webhook URL** - Point to your production domain
5. **Enable HTTPS** - Required for production webhooks
6. **Test Everything** - Make a real purchase to verify

## Monitoring Payments

View in Stripe Dashboard:
- **Payments** - All transactions
- **Customers** - User records
- **Events** - Webhook logs
- **Radar** - Fraud detection

## Adding More Products

To add more tiers:

1. Create new products/prices in Stripe
2. Add price IDs to `.env.local`
3. Update checkout endpoint to handle different prices
4. Add logic in webhook handler for different products

## Subscription Plans

To add recurring subscriptions:

1. Create subscription prices in Stripe
2. Change checkout mode from `payment` to `subscription`
3. Update webhook to handle subscription events
4. Add subscription management portal

## Security Best Practices

1. **Never expose secret keys** - Only use in server-side code
2. **Verify webhooks** - Always validate signatures
3. **Use HTTPS** - Required for production
4. **Enable Radar** - Stripe's fraud detection
5. **Regular monitoring** - Check for suspicious activity

## Troubleshooting

### Payment Not Processing
- Check API keys are correct
- Verify price ID exists
- Check browser console for errors
- Look at Stripe Dashboard logs

### Webhook Not Received
- Verify endpoint URL is correct
- Check webhook signing secret
- Use Stripe CLI for local testing
- Check server logs for errors

### User Not Upgraded
- Check webhook handler logs
- Verify user ID is passed correctly
- Check database updates
- Look for errors in Stripe events

## Next Steps

1. **Add More Payment Methods** - Apple Pay, Google Pay
2. **International Pricing** - Multi-currency support
3. **Discount Codes** - Stripe Coupons
4. **Payment Plans** - Split payments
5. **Affiliate Tracking** - UTM parameters