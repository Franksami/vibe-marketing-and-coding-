// Gumroad Integration Types

export interface GumroadProduct {
  id: string;
  name: string;
  permalink: string;
  price: number; // in cents
  currency: string;
  description?: string;
  preview_url?: string;
  file_size?: number;
  sales_count?: number;
  sales_usd_cents?: number;
  published?: boolean;
  tier: ProductTier;
  tags: string[];
  delivery_type: 'digital' | 'physical' | 'subscription';
}

export type ProductTier = 'free' | 'tripwire' | 'premium';

export interface GumroadPurchase {
  id: string;
  product_id: string;
  product_name: string;
  permalink: string;
  product_permalink: string;
  email: string;
  price: number;
  gumroad_fee: number;
  currency: string;
  quantity: number;
  discover_fee_charged: boolean;
  can_contact: boolean;
  referrer: string;
  order_number: number;
  sale_id: string;
  sale_timestamp: string;
  purchaser_id: string;
  subscription_id?: string;
  variants?: Record<string, string>;
  license_key: string;
  ip_country: string;
  recurrence?: string;
  is_gift_receiver_purchase?: boolean;
  refunded?: boolean;
  disputed?: boolean;
  dispute_won?: boolean;
}

export interface GumroadWebhookEvent {
  seller_id: string;
  product_id: string;
  product_name: string;
  permalink: string;
  product_permalink: string;
  email: string;
  price: string;
  gumroad_fee: string;
  currency: string;
  quantity: string;
  discover_fee_charged: string;
  can_contact: string;
  referrer: string;
  card?: {
    visual: string;
    type: string;
    bin: string;
    expiry_month: string;
    expiry_year: string;
  };
  order_number: string;
  sale_id: string;
  sale_timestamp: string;
  purchaser_id: string;
  subscription_id?: string;
  variants?: Record<string, string>;
  test?: string;
  license_key: string;
  ip_country: string;
  recurrence?: string;
  is_gift_receiver_purchase?: string;
  refunded?: string;
  disputed?: string;
  dispute_won?: string;
}

export interface ProductTemplate {
  tier: ProductTier;
  name: string;
  description: string;
  suggestedPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  deliveryMethod: string;
  features: string[];
  targetAudience: string;
  valueProposition: string;
}

export interface GumroadConfig {
  accessToken: string;
  verificationToken: string;
  storeUrl: string;
  webhookSecret?: string;
}

export interface ProductCatalogItem {
  id: string;
  gumroadId?: string;
  name: string;
  slug: string;
  tier: ProductTier;
  price: number;
  description: string;
  features: string[];
  deliverables: string[];
  coverImage?: string;
  salesPage?: string;
  status: 'planned' | 'development' | 'testing' | 'published' | 'retired';
  tags: string[];
  metadata?: Record<string, any>;
}

export interface LicenseKey {
  key: string;
  productId: string;
  purchaseId: string;
  userId?: string;
  email: string;
  uses: number;
  maxUses: number;
  expiresAt?: Date;
  createdAt: Date;
  lastUsedAt?: Date;
  disabled: boolean;
}

export interface DeliveryStatus {
  purchaseId: string;
  productId: string;
  email: string;
  delivered: boolean;
  deliveredAt?: Date;
  attempts: number;
  lastAttempt?: Date;
  error?: string;
}

// Product tier configurations
export const PRODUCT_TIERS: Record<ProductTier, ProductTemplate> = {
  free: {
    tier: 'free',
    name: 'Free Lead Magnet',
    description: 'High-value content to build your email list',
    suggestedPrice: 0,
    priceRange: { min: 0, max: 0 },
    deliveryMethod: 'Email with download link',
    features: [
      'Instant download',
      'Email list building',
      'Brand awareness',
      'Trust building'
    ],
    targetAudience: 'New subscribers and potential customers',
    valueProposition: 'Exchange valuable content for email addresses'
  },
  tripwire: {
    tier: 'tripwire',
    name: 'Tripwire Offer',
    description: 'Low-priced, high-value product to convert subscribers',
    suggestedPrice: 27,
    priceRange: { min: 9, max: 49 },
    deliveryMethod: 'Gumroad delivery + email sequence',
    features: [
      'Instant access',
      'High perceived value',
      'Customer onboarding',
      'Upsell opportunity'
    ],
    targetAudience: 'Email subscribers ready to make first purchase',
    valueProposition: 'Convert subscribers into paying customers'
  },
  premium: {
    tier: 'premium',
    name: 'Premium Product',
    description: 'High-ticket course or comprehensive resource',
    suggestedPrice: 297,
    priceRange: { min: 99, max: 997 },
    deliveryMethod: 'Member portal access + Gumroad backup',
    features: [
      'Comprehensive content',
      'Ongoing updates',
      'Community access',
      'Premium support'
    ],
    targetAudience: 'Serious learners and professionals',
    valueProposition: 'Transform skills with comprehensive training'
  }
};