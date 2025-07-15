// Stripe Product Configuration
// Start simple, expand later

export const STRIPE_PRODUCTS = {
  // Launch with one simple subscription tier
  vibeProMonthly: {
    name: 'The Vibe Launch Pro',
    priceId: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_xxxxx',
    price: 47,
    interval: 'month',
    description: 'Everything you need to code 10x faster',
    features: [
      'All current products (Cursor Rulebook, etc.)',
      'Monthly rule updates & new products',
      'Private Discord community',
      'Weekly group coaching calls',
      'Early access to all new products',
      'Priority support',
      'Exclusive templates & resources',
    ],
  },
  
  // One-time products (can add to Stripe Checkout easily)
  cursorRulebook: {
    name: 'Ultimate Cursor Rulebook',
    priceId: process.env.STRIPE_PRICE_RULEBOOK || 'price_xxxxx', 
    price: 47,
    description: '50+ premium cursor rules',
  },
  
  // Future tiers (implement after launch)
  // vibeProYearly: {
  //   name: 'The Vibe Launch Pro (Annual)',
  //   priceId: 'price_xxxxx',
  //   price: 470, // 2 months free
  //   interval: 'year',
  // },
};

// Simple usage limits for MVP
export const SUBSCRIPTION_LIMITS = {
  free: {
    productsAccess: false,
    communityAccess: false,
    coachingCalls: false,
    support: 'community',
  },
  pro: {
    productsAccess: true,
    communityAccess: true,
    coachingCalls: true,
    support: 'priority',
  },
};

// Helper to check if user has access
export function hasAccess(userPlan: string, feature: keyof typeof SUBSCRIPTION_LIMITS.pro) {
  const plan = userPlan === 'pro' ? 'pro' : 'free';
  return SUBSCRIPTION_LIMITS[plan][feature];
}