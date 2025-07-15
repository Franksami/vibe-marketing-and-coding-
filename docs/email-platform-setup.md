# Email Platform Setup Guide

## 🎯 Overview
Setting up your email marketing system to deliver lead magnets, nurture sequences, and the 7-Day Vibe Marketing Email Course.

## 📊 Platform Comparison

### ConvertKit (Recommended)
**Best for**: Creators and course sellers
- **Price**: Free up to 1,000 subscribers
- **Pros**: 
  - Visual automation builder
  - Easy tagging system
  - Great for courses
  - Built-in landing pages
  - Excellent deliverability
- **Cons**: Limited design options

### Mailchimp
**Best for**: All-in-one marketing
- **Price**: Free up to 500 subscribers
- **Pros**: 
  - Comprehensive features
  - Good analytics
  - E-commerce integration
- **Cons**: Complex for beginners

### ActiveCampaign
**Best for**: Advanced automation
- **Price**: Starts at $15/month
- **Pros**: 
  - Powerful automation
  - CRM features
  - Advanced segmentation
- **Cons**: Steeper learning curve

## 🚀 Quick Start: ConvertKit Setup

### Step 1: Create Account (10 mins)
1. Go to [convertkit.com](https://convertkit.com)
2. Start free trial (no credit card needed)
3. Choose "Creator" account type
4. Verify your email

### Step 2: Initial Configuration (15 mins)

#### Sender Settings
- **From Name**: [Your Name] from The Vibe Launch
- **From Email**: hello@yourdomain.com
- **Reply-to**: Same as from email

#### Brand Settings
- Upload logo
- Set brand colors
- Configure email footer

### Step 3: Create Forms (20 mins)

#### Landing Page Form
**Name**: Vibe Academy Lead Magnet
**Fields**: 
- First Name
- Email

**Success Message**:
```
🎉 Success! Check your email for your free resources.
If you don't see it in 5 minutes, check your spam folder.
```

#### Embedded Form for Website
```html
<!-- ConvertKit Form -->
<script async data-uid="YOUR_FORM_ID" src="https://thevibelaunch.ck.page/YOUR_FORM_ID/index.js"></script>
```

### Step 4: Set Up Tags & Segments (15 mins)

#### Tags to Create:
- `lead-magnet-cursor-rules`
- `lead-magnet-brand-workbook`
- `email-course-7-day`
- `community-member`
- `customer-paid`
- `customer-gumroad`

#### Segments:
- **Engaged**: Opened email in last 30 days
- **Cold**: No opens in 60+ days
- **Customers**: Has `customer-paid` tag
- **Free**: No `customer-paid` tag

## 📧 Email Templates

### Lead Magnet Delivery Email
**Subject**: Your Vibe Academy resources are here! 🎁

```
Hi [First Name],

Thanks for joining The Vibe Launch! I'm excited to share these resources with you.

Here's what you requested:

📦 **[Lead Magnet Name]**
Download here: [Download Link]

While you're here, I wanted to invite you to our free community where 100+ developers are building with AI:

👉 Join the community: [Skool Link]

Over the next few days, I'll share:
- My favorite Cursor workflows
- How I built a $X product in Y days
- The exact prompts I use daily

Talk soon!
[Your name]

P.S. Having trouble with the download? Just reply to this email and I'll help you out.
```

### 7-Day Email Course Setup

#### Course Structure:
1. **Day 0**: Welcome & Quick Win
2. **Day 1**: Your Marketing Foundation
3. **Day 2**: Finding Your Vibe
4. **Day 3**: Content That Connects
5. **Day 4**: Building in Public
6. **Day 5**: Automation Secrets
7. **Day 6**: Monetization Methods
8. **Day 7**: Your 30-Day Plan

#### Email 1: Welcome & Quick Win
**Subject**: Welcome! Let's find your marketing vibe 🚀
**Delay**: Immediate

```
Hi [First Name],

Welcome to the 7-Day Vibe Marketing Course!

Over the next week, you'll learn how to build an authentic tech brand that attracts the right customers without feeling salesy.

But first, let's start with a quick win...

**Today's 5-Minute Exercise:**
Write down your answer to this question:
"I help [TARGET AUDIENCE] achieve [DESIRED OUTCOME] by [YOUR METHOD]"

Example:
"I help developers achieve 10x productivity by teaching AI-powered coding workflows"

This becomes your marketing north star.

Tomorrow, we'll dive into building your foundation.

Building with you,
[Your name]

P.S. Join our community to share your statement and get feedback: [Skool Link]
```

### Purchase Confirmation Template
**Subject**: Welcome to The Vibe Launch! Here's everything you need 🎉

```
Hi [First Name],

Your purchase of [Product Name] is confirmed! 

Here's how to access everything:

📦 **Your Purchase**: [Product Name]
🔑 **License Key**: [License Key]
📥 **Download Link**: [Gumroad Download URL]

**What's Next:**
1. Download your files using the link above
2. Check the README for setup instructions
3. Join our private community channel
4. Attend this month's group call

**Need Help?**
- Community support: [Skool Link]
- Email support: Reply to this email
- Documentation: [Docs Link]

Welcome to the family!
[Your name]
```

## 🔄 Automation Workflows

### Workflow 1: Lead Magnet Delivery
```
Trigger: Subscribes to form
↓
Action: Add tag "lead-magnet-[name]"
↓
Action: Send delivery email
↓
Wait: 1 day
↓
Action: Send "Did you download?" email
↓
Wait: 3 days
↓
Decision: Clicked download?
  → Yes: Add tag "engaged"
  → No: Send reminder email
```

### Workflow 2: 7-Day Course
```
Trigger: Tag "email-course-7-day" added
↓
Action: Send Day 0 email (immediate)
↓
Loop: Days 1-7
  - Wait: 24 hours
  - Send: Day [X] email
  - Check: Email opened?
    → Yes: Continue
    → No: Add tag "needs-re-engagement"
↓
End: Send graduation email
↓
Action: Add tag "course-completed"
```

### Workflow 3: Purchase Integration
```
Trigger: Webhook from Gumroad
↓
Action: Add tag "customer-paid"
↓
Action: Add tag "customer-[product]"
↓
Action: Send purchase confirmation
↓
Wait: 1 hour
↓
Action: Send onboarding email
↓
Wait: 3 days
↓
Action: Send "How's it going?" email
```

## 🔗 Integration Steps

### Connect to Landing Page

#### Next.js API Route
Create `/app/api/subscribe/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

export async function POST(request: NextRequest) {
  const { email, firstName } = await request.json();

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email,
          first_name: firstName,
          tags: ['website-signup'],
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Subscription failed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
```

### Connect to Gumroad

1. In ConvertKit, go to Automations → Rules
2. Create new rule:
   - Trigger: "When webhook received"
   - Get webhook URL
3. In Gumroad:
   - Settings → Webhooks
   - Add ConvertKit webhook URL
   - Select "Sale" event

## 📊 Analytics Setup

### Key Metrics to Track:
- **Subscriber Growth**: New subscribers/day
- **Open Rate**: Aim for 25%+
- **Click Rate**: Aim for 7%+
- **Conversion Rate**: Free → Paid

### UTM Parameters:
Always use for tracking:
```
?utm_source=email&utm_medium=newsletter&utm_campaign=7-day-course
```

## ✅ Launch Checklist

### Before Going Live:
- [ ] Verify sender email domain
- [ ] Set up SPF/DKIM records
- [ ] Test all forms
- [ ] Test automation workflows
- [ ] Create lead magnets
- [ ] Write email sequences
- [ ] Set up tags
- [ ] Connect to website
- [ ] Test with personal email
- [ ] Set up analytics

### Day 1 Goals:
- [ ] 10 subscribers
- [ ] All automations working
- [ ] First lead magnet delivered
- [ ] No delivery issues

## 🚀 Quick Action Steps

1. **Right Now**: Create ConvertKit account
2. **Next 30 mins**: Set up first form and lead magnet email
3. **Today**: Write 7-day course emails
4. **Tomorrow**: Connect to website and test

---

**Pro Tip**: Start simple. One form, one lead magnet, one automation. You can always add more complexity later!