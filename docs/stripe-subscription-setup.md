# Stripe Subscription Setup Guide

## Quick Setup (15 minutes)

### 1. Create Stripe Account
- Go to [stripe.com](https://stripe.com)
- Sign up for an account
- Complete business verification (can test without this)

### 2. Get API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** and **Secret key**
3. Add to `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Create Products & Prices

#### Option A: Stripe Dashboard (Recommended)
1. Go to [Products](https://dashboard.stripe.com/products)
2. Click "Add product"
3. Create "The Vibe Launch Pro" product:
   - Name: The Vibe Launch Pro
   - Description: Everything you need to code 10x faster with AI
   - Price: $47.00 / month
   - Billing period: Monthly
   - Trial period: 7 days

4. Copy the price ID (starts with `price_`)
5. Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY=price_xxxxx
```

#### Option B: Stripe CLI
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Create product and price
stripe products create \
  --name="The Vibe Launch Pro" \
  --description="Everything you need to code 10x faster with AI"

stripe prices create \
  --product=prod_xxxxx \
  --unit-amount=4700 \
  --currency=usd \
  --recurring[interval]=month
```

### 4. Set Up Webhook

1. For local testing:
```bash
# Install Stripe CLI if not already
brew install stripe/stripe-cli/stripe

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret
```

2. Add webhook secret to `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

3. For production:
   - Go to [Webhooks](https://dashboard.stripe.com/webhooks)
   - Add endpoint: `https://thevibelaunch.ai/api/stripe/webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`

### 5. Test the Flow

1. Start your dev server:
```bash
npm run dev
```

2. In another terminal, forward webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

3. Visit `http://localhost:3000/pro`
4. Click "Start Your Free Trial"
5. Use test card: `4242 4242 4242 4242`
6. Complete checkout
7. Check webhook logs in terminal

### 6. Enable Customer Portal

1. Go to [Customer Portal Settings](https://dashboard.stripe.com/settings/billing/portal)
2. Enable the portal
3. Configure:
   - Allow customers to cancel subscriptions
   - Allow customers to update payment methods
   - Show invoice history

### 7. Test Cards

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires auth: `4000 0025 0000 3155`

## Environment Variables Summary

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL (for redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Quick Checklist

- [ ] Stripe account created
- [ ] API keys in `.env.local`
- [ ] Product & price created
- [ ] Price ID in `.env.local`
- [ ] Webhook endpoint configured
- [ ] Webhook secret in `.env.local`
- [ ] Test checkout flow working
- [ ] Customer portal enabled

## Next Steps

1. **Add more products/tiers** when ready
2. **Set up Stripe Tax** for automatic tax calculation
3. **Configure Stripe Radar** for fraud prevention
4. **Add usage-based billing** for advanced features
5. **Set up revenue reporting** with Stripe Sigma

## Common Issues

### Webhook not receiving events
- Make sure `stripe listen` is running
- Check the webhook secret is correct
- Verify the endpoint URL

### Checkout not redirecting
- Check `NEXT_PUBLIC_APP_URL` is set correctly
- Ensure price ID is valid

### User not updating after payment
- Check database connection
- Verify webhook is processing events
- Check Prisma schema is up to date

## Support

- Stripe Support: support@stripe.com
- Our Support: support@thevibelaunch.ai