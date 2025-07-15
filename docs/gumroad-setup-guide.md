# Gumroad Store Setup & Integration Guide

## Overview

This guide covers setting up your Gumroad store to sell digital products and integrate with the Vibe Academy platform. Gumroad handles payment processing, license key generation, and digital delivery.

## Initial Setup

### 1. Create Gumroad Account

1. Go to [gumroad.com](https://gumroad.com) and sign up
2. Choose a store URL (e.g., `thevibelaunch.gumroad.com`)
3. Complete your profile:
   - Add profile picture and banner
   - Write compelling bio
   - Add social links

### 2. Configure Store Settings

1. **Payment Settings** (Settings → Payments)
   - Connect bank account or PayPal
   - Set up tax handling (Gumroad handles VAT/sales tax)
   - Configure currency (USD recommended)

2. **Store Customization** (Settings → Store)
   - Upload logo and banner
   - Set brand colors
   - Customize checkout experience
   - Add custom domain (optional)

3. **Email Settings** (Settings → Emails)
   - Customize purchase receipt emails
   - Set up delivery emails
   - Configure abandoned cart emails

## API Integration

### 1. Get API Credentials

1. Go to Settings → Advanced → Applications
2. Create new application:
   - Name: "Vibe Academy Integration"
   - Redirect URI: `https://yourdomain.com/api/auth/gumroad/callback`
3. Copy credentials:
   - Application ID
   - Application Secret
   - Access Token

### 2. Configure Webhooks

1. Go to Settings → Advanced → Webhooks
2. Add webhook endpoint:
   - URL: `https://yourdomain.com/api/webhooks/gumroad`
   - Events: Select "New Sale"
3. Copy the signing secret for verification

### 3. Update Environment Variables

Add to your `.env.local`:

```bash
# Gumroad Configuration
GUMROAD_ACCESS_TOKEN=your_access_token_here
GUMROAD_APPLICATION_ID=your_app_id_here
GUMROAD_APPLICATION_SECRET=your_app_secret_here
GUMROAD_WEBHOOK_SECRET=your_webhook_secret_here
NEXT_PUBLIC_GUMROAD_STORE_URL=https://thevibelaunch.gumroad.com
```

## Product Setup

### Product Tiers

We use three product tiers, each serving a specific purpose:

#### 1. Free Products (Lead Magnets)
- **Purpose**: Build email list
- **Price**: $0
- **Examples**: Marketing Kit, Quick Start Guides
- **Delivery**: Instant download + email sequence

#### 2. Tripwire Products ($9-49)
- **Purpose**: Convert subscribers to customers
- **Price**: $9-49
- **Examples**: Cursor Rules Kit, Prompt Templates
- **Delivery**: Gumroad + email onboarding

#### 3. Premium Products ($99+)
- **Purpose**: High-value offerings
- **Price**: $99-997
- **Examples**: UI Kits, SaaS Boilerplates
- **Delivery**: License key + member portal

### Creating Products

For each product in `/content/products/catalog.json`:

1. **Click "New Product"** in Gumroad dashboard

2. **Basic Information**:
   - Name: Match catalog name exactly
   - URL: Use the slug from catalog
   - Price: Match catalog price (in dollars)
   - Description: Use catalog description

3. **Product Files**:
   - Upload ZIP file for digital products
   - Add preview files if applicable
   - Set file size limits

4. **Cover Image**:
   - Use 1280x720px image
   - Include product name and key features
   - Maintain brand consistency

5. **Settings**:
   - Enable "Generate license keys"
   - Set purchase limit (if applicable)
   - Configure regional pricing
   - Add product tags

6. **Content**:
   - Write compelling sales copy
   - Add feature list
   - Include testimonials
   - Add FAQ section

7. **After Creation**:
   - Copy the product ID
   - Update `gumroadId` in catalog.json
   - Test purchase flow

### Product Catalog Sync

After creating products in Gumroad:

1. Update `/content/products/catalog.json` with Gumroad IDs
2. Run sync script: `npm run sync-products`
3. Verify products appear on website

## License Key Management

### Automatic Generation

Gumroad automatically generates license keys for each purchase. Our system:
1. Receives keys via webhook
2. Stores in database with user association
3. Tracks activations and expiration
4. Provides validation API

### License Key Format

Our custom format: `VIBE-TIMESTAMP-RANDOM-HASH`
- Example: `VIBE-LM3K8P2N-A1B2C3D4E5F6G7H8-12AB34CD`
- Unique and verifiable
- Easy to communicate to customers

## Testing

### Test Purchases

1. Enable test mode in Gumroad
2. Use test credit card: `4242 4242 4242 4242`
3. Any future expiry date, any CVC
4. Verify webhook received
5. Check license key generation
6. Test download delivery

### Webhook Testing

Test webhook locally:
```bash
# Use ngrok to expose local endpoint
ngrok http 3000

# Update Gumroad webhook URL to ngrok URL
# Make test purchase
# Check logs for webhook data
```

## Delivery Automation

### Email Sequences

For each product tier:

1. **Free Products**:
   - Instant delivery email
   - Day 1: Welcome + quick win
   - Day 3: Case study
   - Day 7: Upgrade offer

2. **Tripwire Products**:
   - Purchase confirmation
   - Day 1: Getting started guide
   - Day 3: Advanced tips
   - Day 7: Premium upgrade

3. **Premium Products**:
   - VIP welcome email
   - Onboarding sequence
   - Weekly tips for 4 weeks
   - Community invitation

### ConvertKit Integration

Connect Gumroad to ConvertKit:
1. Use Zapier or native integration
2. Tag customers by product
3. Trigger appropriate sequences
4. Track engagement

## Analytics & Reporting

### Gumroad Analytics

Monitor in Gumroad dashboard:
- Sales volume and revenue
- Conversion rates
- Traffic sources
- Geographic distribution
- Product performance

### Custom Tracking

Our integration tracks:
- License key usage
- Product activation rates
- Customer lifetime value
- Refund rates
- Support tickets per product

## Pricing Strategies

### Psychological Pricing
- End prices in 7 or 9 ($27, $47, $97)
- Use charm pricing for conversions
- Round numbers for premium ($297, $497)

### Discount Codes
1. Create in Gumroad → Discounts
2. Types:
   - Percentage off (20%, 50%)
   - Fixed amount ($10, $50)
   - Limited time offers
3. Use for:
   - Launch promotions
   - Email subscribers
   - Seasonal sales

### Bundle Offers
Create product bundles:
1. Add multiple files to single product
2. Price below individual sum
3. Highlight savings amount
4. Limited time availability

## Customer Support

### Common Issues

1. **Download Problems**:
   - Check spam folder
   - Resend from Gumroad
   - Provide direct link

2. **License Key Issues**:
   - Verify in our database
   - Check activation limit
   - Reset if needed

3. **Refund Requests**:
   - 30-day policy
   - Process via Gumroad
   - Update our records

### Support Workflow
1. Customer emails support
2. Check Gumroad + our database
3. Resolve issue
4. Update customer record
5. Follow up in 24h

## Scaling Considerations

### High Volume
- Gumroad handles unlimited sales
- Our webhook processing scales
- Database optimized for growth
- CDN for file delivery

### International Sales
- Gumroad handles VAT/tax
- Multi-currency support
- Localized checkout
- Regional pricing options

### Product Updates
1. Upload new version to Gumroad
2. Email previous customers
3. Update changelog
4. Announce in community

## Security Best Practices

1. **API Keys**: Never expose in client code
2. **Webhooks**: Always verify signatures
3. **License Keys**: Validate server-side
4. **User Data**: Follow GDPR/privacy laws
5. **Refunds**: Have clear policy

## Monitoring & Alerts

Set up monitoring for:
- Failed webhook deliveries
- Unusual refund rates
- License key abuse
- Download failures
- API errors

## Next Steps

1. Complete Gumroad store setup
2. Create your first product
3. Test the full purchase flow
4. Set up email automation
5. Launch to beta users
6. Monitor and optimize

## Resources

- [Gumroad API Docs](https://gumroad.com/api)
- [Gumroad Seller Guide](https://help.gumroad.com)
- [Webhook Testing Tool](https://webhook.site)
- [Our Product Catalog](/content/products/catalog.json)