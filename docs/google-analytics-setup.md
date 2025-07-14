# Google Analytics Setup Guide

## Overview

Google Analytics 4 (GA4) is integrated into the landing page to track visitor behavior, conversions, and ROI. The implementation includes automatic event tracking for all important user actions.

## Setup Steps

### 1. Create Google Analytics Account

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click "Start measuring"
3. Set up account:
   - Account name: "Vibe Academy"
   - Property name: "Vibe Academy Landing Page"
   - Timezone: Your timezone
   - Currency: USD

### 2. Get Your Measurement ID

1. After creating property, go to **Admin** (gear icon)
2. Under Property, click **Data Streams**
3. Click your web stream (or create one)
4. Copy your **Measurement ID** (starts with `G-`)

### 3. Configure Environment Variable

Add to your `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 4. Restart Development Server

```bash
npm run dev
```

## Events Being Tracked

The following events are automatically tracked:

### Engagement Events
- **email_capture** - When users submit email (tracks location: hero, cta, exit_intent)
- **click_cta** - When users click call-to-action buttons
- **exit_intent_shown** - When exit popup appears

### Authentication Events
- **sign_up** - New user registration
- **login** - User login (tracks method: email, phone, magic_link)

### Ecommerce Events
- **begin_checkout** - When user clicks purchase button
- **purchase** - Successful payment (tracked via webhook)

### Page Views
- Automatically tracked for all pages
- Single Page App navigation tracked

## Viewing Your Data

### Real-Time Reports
1. Go to **Reports** → **Realtime**
2. See live visitor activity
3. Monitor events as they happen

### Key Reports to Monitor

1. **Acquisition Reports**
   - Where visitors come from
   - Which channels drive conversions

2. **Engagement Reports**
   - Page views and time on site
   - Scroll depth and engagement rate

3. **Conversions**
   - Email capture rate
   - Purchase conversion rate
   - Funnel visualization

4. **User Behavior**
   - User flow through site
   - Drop-off points

## Setting Up Goals

### Email Capture Goal
1. Go to **Admin** → **Conversions**
2. Click **New conversion event**
3. Event name: `email_capture`
4. Mark as conversion

### Purchase Goal
1. Add event name: `purchase`
2. Set value parameter
3. Mark as conversion

### Founding Member Funnel
1. Go to **Explore** → **Funnel exploration**
2. Create steps:
   - Step 1: Page view (landing page)
   - Step 2: begin_checkout
   - Step 3: purchase

## Custom Dimensions

Set up custom dimensions for better insights:

1. **Email Location** - Where email was captured
2. **Login Method** - How users authenticate
3. **User Type** - Free vs Founding Member

## Enhanced Ecommerce

To track revenue:

1. Enable Enhanced Ecommerce in GA4
2. Our integration automatically sends:
   - Product views (service tiers)
   - Add to cart (begin_checkout)
   - Purchase events with value

## Debugging

### Check if GA is Working

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Open Chrome DevTools Console
3. Look for GA debug messages
4. Verify events are firing

### Test Events

Open browser console and run:
```javascript
gtag('event', 'test_event', {
  event_category: 'test',
  event_label: 'manual_test'
});
```

Then check Realtime reports in GA.

## Advanced Configuration

### Cross-Domain Tracking
If using multiple domains:
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  linker: {
    domains: ['vibecodingacademy.com', 'app.vibecodingacademy.com']
  }
});
```

### User ID Tracking
Track logged-in users across devices:
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  user_id: 'USER_ID_HERE'
});
```

### Custom Events
Add your own events:
```javascript
import { event } from '@/components/analytics/google-analytics';

event({
  action: 'video_play',
  category: 'engagement',
  label: 'intro_video',
  value: 30 // seconds watched
});
```

## Privacy & Compliance

### Cookie Consent
Consider adding cookie consent banner for GDPR compliance.

### Anonymize IPs
Add to your GA config:
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  anonymize_ip: true
});
```

### Opt-Out
Provide users option to opt-out:
```javascript
window['ga-disable-G-XXXXXXXXXX'] = true;
```

## Best Practices

1. **Test in Development** - Use GA Debug mode
2. **Use UTM Parameters** - Track campaign performance
3. **Set Up Alerts** - Get notified of traffic spikes/drops
4. **Regular Reviews** - Check data weekly
5. **Data Retention** - Set appropriate retention period

## Integration with Other Tools

### Google Ads
Link GA4 with Google Ads for conversion tracking.

### Google Search Console
Link for organic search insights.

### BigQuery
Export raw data for advanced analysis.

## Troubleshooting

### No Data Showing
1. Check Measurement ID is correct
2. Verify no ad blockers
3. Check browser console for errors
4. Wait 24-48 hours for data

### Events Not Tracking
1. Check event names match exactly
2. Verify parameters are correct
3. Use GA Debugger extension
4. Check Realtime reports

### Missing Conversions
1. Ensure events marked as conversions
2. Check event parameters
3. Verify purchase webhook working