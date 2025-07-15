# Email Platform Setup Checklist

## 🚀 Quick Setup (Next 30 Minutes)

### Step 1: ConvertKit Account (5 mins)
- [ ] Go to convertkit.com
- [ ] Create free account
- [ ] Verify email
- [ ] Skip onboarding (we'll configure manually)

### Step 2: Get Your Credentials (5 mins)
- [ ] Go to Settings → Advanced
- [ ] Copy API Key
- [ ] Go to Forms → Create Form
- [ ] Create "Website Signup" form
- [ ] Copy Form ID from URL

### Step 3: Add to .env.local (2 mins)
```env
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_FORM_ID=your_form_id_here
```

### Step 4: Test API Route (5 mins)
```bash
# Test your endpoint
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"Test"}'
```

### Step 5: Add Form to Landing Page (10 mins)

Add to your hero section:
```tsx
import { EmailSignupForm } from "@/components/email-signup-form";

<EmailSignupForm
  source="hero"
  buttonText="Start Free Course"
  description="Get the 7-Day Vibe Marketing Email Course"
  incentive="Plus: Cursor rules starter pack (instant download)"
/>
```

Add to your footer:
```tsx
<EmailSignupForm
  source="footer"
  buttonText="Subscribe"
  placeholder="Your email"
  description="Weekly tips for building with AI"
/>
```

### Step 6: Create First Automation (10 mins)

In ConvertKit:
1. Go to Automations → Create
2. Name: "Welcome & Lead Magnet Delivery"
3. Trigger: Joins form "Website Signup"
4. Add Email → Use template from our guide
5. Add your lead magnet download link
6. Activate automation

## 📧 Email Templates to Create

### Priority 1 (Today):
- [ ] Lead magnet delivery email
- [ ] Welcome email (Day 0 of course)
- [ ] Day 1 email

### Priority 2 (This Week):
- [ ] Days 2-7 of email course
- [ ] Purchase confirmation
- [ ] Community invitation

## 🔗 Integrations to Set Up

### Immediate:
- [ ] Website signup form
- [ ] Lead magnet delivery
- [ ] Tag subscribers appropriately

### This Week:
- [ ] Gumroad webhook connection
- [ ] Skool community integration
- [ ] Analytics tracking

## 📊 Success Metrics

### Day 1:
- [ ] 5 email subscribers
- [ ] All automations working
- [ ] Lead magnet delivered successfully

### Week 1:
- [ ] 50 subscribers
- [ ] 30% open rate
- [ ] 10% click rate
- [ ] 5 course completions

### Month 1:
- [ ] 500 subscribers
- [ ] 25%+ open rate
- [ ] 20 paying customers
- [ ] Positive feedback

## 🚨 Common Issues & Fixes

### Emails going to spam:
- Verify your domain
- Add SPF/DKIM records
- Warm up sending gradually

### Low open rates:
- Test subject lines
- Send at optimal times
- Segment your list

### Forms not working:
- Check API credentials
- Verify CORS settings
- Test in incognito mode

## ⚡ Next Actions

1. **Right now**: Create ConvertKit account
2. **Next 15 mins**: Set up first form and automation
3. **Today**: Add form to website
4. **Tomorrow**: Write remaining email content

---

**Remember**: Start with ONE form and ONE automation. You can expand later!

**Need help?** Check our detailed guide: `/docs/email-platform-setup.md`