# SaaS MVP Builder Workflow Template

## Overview
Build a functional SaaS MVP in 48 hours using AI-powered development with Cursor and modern frameworks.

## Prerequisites
- Cursor IDE installed
- Node.js 18+ installed
- Vercel account (free)
- Supabase account (free)
- Stripe account (for payments)
- Claude/GPT-4 API access

## Tech Stack
- **Frontend**: Next.js 14 (App Router)
- **Backend**: Next.js API Routes
- **Database**: Supabase (Postgres)
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Styling**: Tailwind CSS + shadcn/ui
- **Deployment**: Vercel

## Hour-by-Hour Breakdown

### Hours 1-4: Foundation Setup

#### 1. Project Initialization Prompt:
```
Create a new Next.js 14 project with:
- TypeScript
- Tailwind CSS
- App router
- ESLint
- src directory

Project name: [your-saas-name]
```

#### 2. Cursor Command:
```bash
# In Cursor, use Cmd+K and type:
Set up a modern SaaS boilerplate with Next.js 14, TypeScript, Tailwind, and Supabase integration. Include folder structure for:
- Authentication pages
- Dashboard layout
- Landing page
- API routes
- Database models
- Utility functions
```

#### 3. Database Schema Prompt:
```
Design a database schema for a [YOUR SAAS TYPE] with:
- Users table (auth integrated)
- Organizations/Teams
- Subscriptions
- [Your core data model]
- Activity logs

Generate Supabase SQL migrations and TypeScript types.
```

### Hours 5-8: Core Features

#### 1. Authentication System:
```
Implement complete authentication using Supabase Auth:
- Sign up with email verification
- Sign in with email/password
- OAuth (Google, GitHub)
- Password reset flow
- Protected route middleware
- User profile management

Create these pages:
- /auth/signin
- /auth/signup
- /auth/forgot-password
- /dashboard (protected)
```

#### 2. Dashboard Layout Prompt:
```
Create a responsive dashboard layout with:
- Sidebar navigation (collapsible)
- Top header with user menu
- Main content area
- Mobile-responsive design
- Dark mode support
- Breadcrumbs
- Loading states

Use shadcn/ui components throughout.
```

### Hours 9-12: Business Logic

#### 1. Core Feature Implementation:
```
Implement [YOUR CORE FEATURE] with:
- CRUD operations
- Real-time updates using Supabase
- Optimistic UI updates
- Error handling
- Loading states
- Empty states
- Search and filters
- Pagination
```

#### 2. API Routes Template:
```typescript
// Cursor prompt for API route:
Create a Next.js API route that:
- Validates input using Zod
- Checks authentication
- Implements rate limiting
- Handles errors gracefully
- Returns typed responses
- Logs activities

Example for [YOUR_ENTITY]:
- GET: List with pagination
- POST: Create new
- PUT: Update existing
- DELETE: Soft delete
```

### Hours 13-16: Subscription & Payments

#### 1. Stripe Integration Prompt:
```
Implement Stripe subscription system:
- Pricing table component
- Checkout session creation
- Webhook handling
- Subscription management portal
- Usage-based billing tracking
- Free trial logic

Plans:
- Free: [limits]
- Pro: $29/mo [features]
- Team: $99/mo [features]
```

#### 2. Billing Dashboard:
```
Create billing management page with:
- Current plan display
- Usage metrics
- Upgrade/downgrade options
- Payment method management
- Invoice history
- Cancel subscription flow
```

### Hours 17-20: Polish & UX

#### 1. Landing Page Prompt:
```
Create a high-converting landing page with:
- Hero section with clear value prop
- Feature highlights (3-6 features)
- Pricing table
- Testimonials section
- FAQ accordion
- CTA buttons throughout
- SEO meta tags
- Open Graph images

Use modern design with animations using Framer Motion.
```

#### 2. Onboarding Flow:
```
Implement user onboarding:
- Welcome modal after signup
- Setup wizard (3-4 steps)
- Interactive product tour
- Sample data generation
- First action prompt
- Progress tracking
```

### Hours 21-24: Performance & Security

#### 1. Performance Optimization:
```
Optimize the application:
- Implement React Suspense
- Add loading.tsx files
- Image optimization
- Font optimization
- API route caching
- Database query optimization
- Bundle size analysis
```

#### 2. Security Checklist:
```
Implement security best practices:
- Environment variables validation
- CORS configuration
- Rate limiting on APIs
- Input sanitization
- SQL injection prevention
- XSS protection
- CSRF tokens
- Secure headers
```

### Hours 25-28: Admin & Analytics

#### 1. Admin Dashboard:
```
Create admin panel with:
- User management
- Subscription overview
- Revenue metrics
- System health monitoring
- Feature flags
- Support ticket view
- Activity logs
```

#### 2. Analytics Integration:
```
Implement analytics:
- PostHog/Mixpanel setup
- Custom event tracking
- User journey mapping
- Conversion funnel tracking
- Performance monitoring
- Error tracking (Sentry)
```

### Hours 29-32: Testing & Documentation

#### 1. Testing Suite:
```
Create comprehensive tests:
- Unit tests for utilities
- Integration tests for API routes
- E2E tests for critical paths
- Component tests
- Performance tests

Use Playwright for E2E and Vitest for unit tests.
```

#### 2. Documentation:
```
Generate documentation:
- README with setup instructions
- API documentation
- Environment variables guide
- Deployment guide
- Contributing guidelines
- Architecture decisions
```

### Hours 33-36: Email & Notifications

#### 1. Email System:
```
Implement email notifications using Resend:
- Welcome email
- Password reset
- Subscription confirmations
- Weekly digest
- Custom transactional emails

Create email templates with React Email.
```

#### 2. In-App Notifications:
```
Add notification system:
- Toast notifications
- Bell icon with dropdown
- Real-time updates
- Mark as read functionality
- Notification preferences
```

### Hours 37-40: Deployment & Launch

#### 1. Production Deployment:
```
Deploy to production:
- Set up Vercel project
- Configure environment variables
- Set up custom domain
- Enable analytics
- Configure caching
- Set up monitoring
- Enable error tracking
```

#### 2. Launch Checklist:
```
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Stripe webhooks configured
- [ ] Email sending verified
- [ ] SSL certificate active
- [ ] Monitoring alerts set up
- [ ] Backup system enabled
- [ ] Terms & Privacy pages
```

### Hours 41-48: Growth Features

#### 1. Referral System:
```
Implement referral program:
- Unique referral codes
- Tracking dashboard
- Reward system
- Email invitations
- Social sharing
- Analytics tracking
```

#### 2. Public API:
```
Create developer-friendly API:
- API key management
- Rate limiting by tier
- OpenAPI documentation
- SDKs generation
- Webhook system
- API analytics
```

## Cursor Pro Tips

### 1. Context Management:
```
# Create .cursorrules file:
Project: SaaS MVP for [YOUR DOMAIN]
Stack: Next.js 14, TypeScript, Supabase, Stripe
Style: Clean, modern, type-safe
Focus: Performance, security, user experience

Always:
- Use App Router patterns
- Implement proper error handling
- Add loading states
- Follow REST conventions
- Use TypeScript strictly
```

### 2. Rapid Development Commands:
```
# Component generation
Cmd+K: "Create a new component for [FEATURE] with TypeScript, proper types, loading state, and error handling"

# API route generation
Cmd+K: "Create a CRUD API route for [MODEL] with validation, auth check, and proper error responses"

# Database queries
Cmd+K: "Write a Supabase query to [ACTION] with proper types and error handling"
```

### 3. AI-Powered Debugging:
```
# When stuck, use:
"Explain this error and provide 3 solutions with code examples"

"Optimize this component for performance"

"Add proper TypeScript types to this function"

"Convert this to use React Server Components"
```

## Common Pitfalls & Solutions

### 1. Authentication Issues
- Always check Supabase RLS policies
- Verify redirect URLs in Supabase dashboard
- Use middleware for route protection

### 2. Performance Problems
- Implement pagination early
- Use React.memo strategically
- Optimize images with next/image
- Implement proper caching strategies

### 3. State Management
- Use URL state for filters/search
- Zustand for global client state
- React Query for server state
- Avoid prop drilling

## Scaling Considerations

### When You Hit 100 Users:
- Implement caching layer
- Add CDN for assets
- Optimize database queries
- Set up monitoring alerts

### When You Hit 1000 Users:
- Database connection pooling
- Implement job queues
- Add read replicas
- Consider microservices

## Cost Estimation

### Monthly Costs (up to 1000 users):
- Vercel: $0-20 (Free tier usually sufficient)
- Supabase: $0-25 (Free tier for start)
- Stripe: 2.9% + $0.30 per transaction
- Domain: $1/month
- Total: <$50/month

## Success Metrics

### Technical Metrics:
- Page load time <3s
- Core Web Vitals passing
- 99.9% uptime
- <1% error rate

### Business Metrics:
- User activation rate
- Trial to paid conversion
- Monthly recurring revenue
- Churn rate
- Customer lifetime value

## Next Steps After MVP

1. **User Feedback Loop**
   - Install Hotjar/Clarity
   - Schedule user interviews
   - Implement feedback widget

2. **Feature Expansion**
   - Mobile app with Capacitor
   - Advanced analytics
   - Team collaboration features
   - API marketplace

3. **Marketing Integration**
   - Blog with MDX
   - SEO optimization
   - Social media automation
   - Affiliate program

## Resources & Templates

- [GitHub Repo]: Starter template
- [Figma File]: UI components
- [Notion Doc]: Launch checklist
- [Video Tutorial]: 2-hour walkthrough
- [Discord Community]: Get help

Remember: The goal is a working MVP, not perfection. Ship fast, iterate based on feedback!