import { 
  GumroadProduct, 
  GumroadPurchase, 
  GumroadWebhookEvent,
  ProductCatalogItem,
  LicenseKey,
  DeliveryStatus,
  GumroadConfig
} from '@/types/gumroad';
import crypto from 'crypto';

// Gumroad API configuration
const GUMROAD_API_BASE = 'https://api.gumroad.com/v2';

export class GumroadClient {
  private config: GumroadConfig;

  constructor(config: Partial<GumroadConfig> = {}) {
    this.config = {
      accessToken: process.env.GUMROAD_ACCESS_TOKEN || '',
      verificationToken: process.env.GUMROAD_VERIFICATION_TOKEN || '',
      storeUrl: process.env.NEXT_PUBLIC_GUMROAD_STORE_URL || '',
      webhookSecret: process.env.GUMROAD_WEBHOOK_SECRET,
      ...config
    };

    if (!this.config.accessToken) {
      console.warn('Gumroad access token not configured');
    }
  }

  // Verify webhook signature
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.config.webhookSecret) {
      console.warn('Webhook secret not configured, skipping verification');
      return true;
    }

    const expectedSignature = crypto
      .createHmac('sha256', this.config.webhookSecret)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  // Parse webhook event
  parseWebhookEvent(body: any): GumroadWebhookEvent {
    // Gumroad sends form-encoded data, parse it
    return {
      seller_id: body.seller_id,
      product_id: body.product_id,
      product_name: body.product_name,
      permalink: body.permalink,
      product_permalink: body.product_permalink,
      email: body.email,
      price: body.price,
      gumroad_fee: body.gumroad_fee,
      currency: body.currency,
      quantity: body.quantity,
      discover_fee_charged: body.discover_fee_charged,
      can_contact: body.can_contact,
      referrer: body.referrer || '',
      order_number: body.order_number,
      sale_id: body.sale_id,
      sale_timestamp: body.sale_timestamp,
      purchaser_id: body.purchaser_id,
      subscription_id: body.subscription_id,
      variants: body.variants,
      test: body.test,
      license_key: body.license_key,
      ip_country: body.ip_country,
      recurrence: body.recurrence,
      is_gift_receiver_purchase: body.is_gift_receiver_purchase,
      refunded: body.refunded,
      disputed: body.disputed,
      dispute_won: body.dispute_won,
    };
  }

  // Generate license key
  generateLicenseKey(productId: string, purchaseId: string): string {
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(8).toString('hex');
    const hash = crypto
      .createHash('sha256')
      .update(`${productId}-${purchaseId}-${timestamp}`)
      .digest('hex')
      .substring(0, 8);
    
    return `VIBE-${timestamp.toUpperCase()}-${random.toUpperCase()}-${hash.toUpperCase()}`;
  }

  // Validate license key format
  validateLicenseKeyFormat(key: string): boolean {
    const pattern = /^VIBE-[A-Z0-9]{8,}-[A-Z0-9]{16}-[A-Z0-9]{8}$/;
    return pattern.test(key);
  }

  // API Methods
  async getProducts(): Promise<GumroadProduct[]> {
    try {
      const response = await fetch(`${GUMROAD_API_BASE}/products`, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error fetching Gumroad products:', error);
      return [];
    }
  }

  async getProduct(productId: string): Promise<GumroadProduct | null> {
    try {
      const response = await fetch(`${GUMROAD_API_BASE}/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.product;
    } catch (error) {
      console.error('Error fetching Gumroad product:', error);
      return null;
    }
  }

  async getSale(saleId: string): Promise<GumroadPurchase | null> {
    try {
      const response = await fetch(`${GUMROAD_API_BASE}/sales/${saleId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.sale;
    } catch (error) {
      console.error('Error fetching Gumroad sale:', error);
      return null;
    }
  }

  // Enable a product
  async enableProduct(productId: string): Promise<boolean> {
    try {
      const response = await fetch(`${GUMROAD_API_BASE}/products/${productId}/enable`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error enabling Gumroad product:', error);
      return false;
    }
  }

  // Disable a product
  async disableProduct(productId: string): Promise<boolean> {
    try {
      const response = await fetch(`${GUMROAD_API_BASE}/products/${productId}/disable`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error disabling Gumroad product:', error);
      return false;
    }
  }
}

// Helper functions
export function formatGumroadPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function getProductUrl(permalink: string, storeUrl?: string): string {
  const base = storeUrl || process.env.NEXT_PUBLIC_GUMROAD_STORE_URL || 'https://thevibelaunch.gumroad.com';
  return `${base}/l/${permalink}`;
}

export function isTestPurchase(event: GumroadWebhookEvent): boolean {
  return event.test === 'true';
}

export function getPurchaseAmount(event: GumroadWebhookEvent): number {
  // Convert string price to cents
  const price = parseFloat(event.price.replace('$', '').replace(',', ''));
  return Math.round(price * 100);
}

// Product catalog helpers
export function getProductBySlug(slug: string, catalog: ProductCatalogItem[]): ProductCatalogItem | undefined {
  return catalog.find(product => product.slug === slug);
}

export function getProductsByTier(tier: string, catalog: ProductCatalogItem[]): ProductCatalogItem[] {
  return catalog.filter(product => product.tier === tier);
}

export function getPublishedProducts(catalog: ProductCatalogItem[]): ProductCatalogItem[] {
  return catalog.filter(product => product.status === 'published');
}

// Delivery helpers
export function createDeliveryRecord(
  purchase: GumroadWebhookEvent,
  productId: string
): Omit<DeliveryStatus, 'delivered' | 'deliveredAt'> {
  return {
    purchaseId: purchase.sale_id,
    productId,
    email: purchase.email,
    attempts: 0,
  };
}

// License key helpers
export function createLicenseRecord(
  key: string,
  purchase: GumroadWebhookEvent,
  productId: string,
  maxUses: number = 1
): Omit<LicenseKey, 'uses' | 'lastUsedAt' | 'disabled'> {
  return {
    key,
    productId,
    purchaseId: purchase.sale_id,
    email: purchase.email,
    maxUses,
    createdAt: new Date(),
  };
}

// Analytics helpers
export function calculateRevenue(purchases: GumroadPurchase[]): {
  total: number;
  afterFees: number;
  byProduct: Record<string, number>;
} {
  let total = 0;
  let afterFees = 0;
  const byProduct: Record<string, number> = {};

  purchases.forEach(purchase => {
    if (!purchase.refunded) {
      total += purchase.price;
      afterFees += purchase.price - purchase.gumroad_fee;
      
      if (!byProduct[purchase.product_id]) {
        byProduct[purchase.product_id] = 0;
      }
      byProduct[purchase.product_id] += purchase.price;
    }
  });

  return { total, afterFees, byProduct };
}

// Default client instance
export const gumroad = new GumroadClient();