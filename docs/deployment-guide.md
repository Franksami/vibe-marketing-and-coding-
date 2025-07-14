# Vibe Academy Deployment Guide

## Production URL
https://vibe-marketing-and-coding.vercel.app

## Environment Variables Configuration

To complete the deployment, add these environment variables in the Vercel dashboard:

### Required Environment Variables

1. **Database**
   ```
   DATABASE_URL="file:./db/production.db"
   ```

2. **Authentication**
   ```
   NEXTAUTH_URL="https://vibe-marketing-and-coding.vercel.app"
   NEXTAUTH_SECRET="[generate-secure-secret]"
   ```
   Generate secret: `openssl rand -base64 32`

3. **Email Service (ConvertKit)**
   ```
   CONVERTKIT_API_KEY="0aQcMavurNBy-9SixN9m1g"
   CONVERTKIT_API_SECRET="Kkm8ham3UWaJITKpKdrHmTd6H2Hc-lVVbmLRK6lq8oQ"
   CONVERTKIT_FORM_ID="8307309"
   ```

4. **Payment Processing (Stripe)**
   ```
   STRIPE_SECRET_KEY="[your-live-secret-key]"
   STRIPE_WEBHOOK_SECRET="[your-webhook-secret]"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="[your-live-publishable-key]"
   STRIPE_FOUNDING_MEMBER_PRICE_ID="[create-in-stripe-dashboard]"
   ```

5. **Analytics**
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID="[your-ga4-measurement-id]"
   ```

6. **Email Configuration**
   ```
   EMAIL_FROM="noreply@vibecodingacademy.com"
   ```

## How to Add Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Click on "Settings" tab
3. Navigate to "Environment Variables"
4. Add each variable with its value
5. Select environments: Production, Preview, Development
6. Click "Save"

## Post-Deployment Checklist

### Immediate Actions
- [ ] Test email capture forms
- [ ] Verify ConvertKit integration
- [ ] Test authentication flow
- [ ] Check responsive design on mobile

### Before Going Live
- [ ] Add Stripe live keys
- [ ] Create Stripe product ($499 Founding Member)
- [ ] Set up Stripe webhook endpoint
- [ ] Configure custom domain
- [ ] Set up ConvertKit automation
- [ ] Add Google Analytics
- [ ] Test payment flow with test card

### Production Testing
- [ ] Submit email in hero section
- [ ] Submit email in CTA section
- [ ] Test exit intent popup
- [ ] Create account with email/password
- [ ] Test magic link login
- [ ] Access protected /library page
- [ ] Complete test purchase

## Custom Domain Setup

1. Purchase domain (e.g., vibecodingacademy.com)
2. In Vercel: Settings → Domains → Add
3. Follow DNS configuration instructions
4. Update NEXTAUTH_URL to custom domain
5. SSL certificate auto-provisioned by Vercel

## Monitoring

- **Uptime**: Vercel dashboard
- **Analytics**: Google Analytics dashboard
- **Errors**: Vercel Functions logs
- **Database**: Check local SQLite file

## Support

For deployment issues:
- Vercel docs: https://vercel.com/docs
- Next.js deployment: https://nextjs.org/docs/deployment