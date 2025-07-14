# ConvertKit (Kit) Email Integration Setup Guide

## Overview

The landing page now integrates with ConvertKit (recently rebranded as Kit) for email capture and automated email sequences. ConvertKit is perfect for creators and course sellers with powerful automation features.

## Setup Steps

### 1. Get Your ConvertKit API Credentials

1. Log in to your [ConvertKit account](https://app.convertkit.com)
2. Go to Settings → Advanced → API
3. Copy your **API Key** and **API Secret**
4. Keep this page open - you'll need the Form ID next

### 2. Create a Landing Page Form

1. Go to Grow → Landing Pages & Forms
2. Create a new Form (or use existing)
3. Name it "Vibe Academy Landing Page"
4. Copy the Form ID from the URL or embed code
   - Example: If URL is `https://app.convertkit.com/forms/designers/1234567/edit`
   - Your Form ID is `1234567`

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# ConvertKit Configuration
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_API_SECRET=your_api_secret_here
CONVERTKIT_FORM_ID=your_form_id_here

# Optional
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 4. Set Up Welcome Email Automation

ConvertKit handles welcome emails through Visual Automations (better deliverability):

1. Go to Automate → Visual Automations
2. Click "New Automation"
3. Choose trigger: "Joins a form" → Select your form
4. Add action: "Send an email"
5. Design your welcome email with:
   - Subject: "Welcome to Vibe Coding Academy - Here's Your Free Starter Kit!"
   - Include download links for resources
   - Add community invitation
   - Include founding member offer

#### Welcome Email Template for ConvertKit:

```html
Hi {{ subscriber.first_name | default: "there" }}!

Welcome to Vibe Coding Academy! 🚀

Thank you for joining our community of 10,000+ developers who are building faster with AI.

## Your Free Starter Kit:

**→ [Download 3 Cursor Rules](https://vibecodingacademy.com/resources/cursor-rules)**
Copy these directly into your Cursor settings for instant productivity

**→ [Get 5 Claude Prompts](https://vibecodingacademy.com/resources/claude-prompts)**
Our most effective prompts for rapid development

**→ [Access Quick Start Guide](https://vibecodingacademy.com/resources/quickstart)**
Get your first app running in 30 minutes

## Join Our Community

Get help, share wins, and access weekly live coding sessions:
**[Join the Skool Community →](https://skool.com/vibe-coding)**

---

**🎯 Limited Time: Founding Member Offer**
Get lifetime access to Vibe Academy for just $299 (normally $499)
[Claim Your Spot →](https://vibecodingacademy.com/academy)

Questions? Just reply to this email!

Happy coding,
The Vibe Academy Team
```

### 5. Add Tags for Segmentation

Create tags in ConvertKit for better targeting:

1. Go to Grow → Subscribers
2. Click "Tags" → "Create a Tag"
3. Suggested tags:
   - `vibe-academy-interest`
   - `free-resources-downloaded`
   - `founding-member`
   - `community-member`

### 6. Test the Integration

1. Restart your dev server: `npm run dev`
2. Submit a test email through the form
3. Check:
   - ConvertKit dashboard for new subscriber
   - Email inbox for welcome automation
   - Console logs for any errors

## Features Implemented

✅ **Automatic Subscription** - Emails added to your ConvertKit form
✅ **Duplicate Handling** - Existing subscribers handled gracefully
✅ **Error Recovery** - Emails still captured even if API fails
✅ **Form Integration** - Direct connection to ConvertKit forms
✅ **Automation Ready** - Triggers ConvertKit visual automations

## Advanced Features

### Tagging Based on Source

Update the API to tag subscribers:

```typescript
// In capture-email/route.ts
await convertkit.tagSubscriber(email, TAG_ID);
```

### Custom Fields

Pass additional data to ConvertKit:

```typescript
await convertkit.addSubscriberToForm(formId, {
  email,
  first_name: name,
  fields: {
    source: 'landing_page',
    interest: 'vibe_academy'
  }
});
```

### Sequences

Create email sequences in ConvertKit:

1. Go to Automate → Sequences
2. Create a 7-day onboarding sequence
3. Add to your form automation

## Monitoring

View metrics in ConvertKit:
- Subscriber growth
- Email open rates
- Click rates
- Automation performance

## Troubleshooting

### Subscribers Not Adding
1. Verify API credentials in `.env.local`
2. Check Form ID is correct
3. Look for errors in server console
4. Check ConvertKit API logs

### Emails Not Sending
1. Check automation is active
2. Verify email is confirmed in ConvertKit
3. Check spam filters
4. Review ConvertKit email settings

## ConvertKit Best Practices

1. **Use Visual Automations** - More reliable than API emails
2. **Segment with Tags** - Better than multiple forms
3. **Double Opt-in** - Better deliverability (optional)
4. **Custom Fields** - Track source, interests, etc.
5. **A/B Test** - ConvertKit has built-in split testing

## Next Steps

1. **Create Segments** - Based on engagement
2. **Build Sequences** - Educational email series
3. **Add Broadcasts** - Weekly newsletters
4. **Track Conversions** - Connect to purchase events
5. **Create Upsells** - Automated offers based on behavior

## Migration from Other Services

If switching from another service:
1. Export subscribers as CSV
2. Import to ConvertKit (Grow → Subscribers → Import)
3. Map custom fields
4. Recreate automations
5. Update DNS records for better deliverability