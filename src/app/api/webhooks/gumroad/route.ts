import { NextRequest, NextResponse } from 'next/server';
import { gumroad, isTestPurchase, getPurchaseAmount } from '@/lib/gumroad';
import { prisma } from '@/lib/prisma';
import productCatalog from '../../../../../content/products/catalog.json';

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    
    // Get signature from headers
    const signature = request.headers.get('x-gumroad-signature') || '';
    
    // Verify webhook signature (if configured)
    if (process.env.GUMROAD_WEBHOOK_SECRET) {
      const isValid = gumroad.verifyWebhookSignature(rawBody, signature);
      if (!isValid) {
        console.error('Invalid Gumroad webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Parse the form-encoded body
    const formData = new URLSearchParams(rawBody);
    const body: any = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });

    // Parse the webhook event
    const event = gumroad.parseWebhookEvent(body);
    
    console.log('Gumroad webhook received:', {
      type: 'purchase',
      productId: event.product_id,
      email: event.email,
      amount: event.price,
      isTest: isTestPurchase(event),
    });

    // Skip test purchases in production
    if (process.env.NODE_ENV === 'production' && isTestPurchase(event)) {
      console.log('Skipping test purchase in production');
      return NextResponse.json({ success: true, test: true });
    }

    // Find the product in our catalog
    const catalogProduct = productCatalog.products.find(
      p => p.gumroadId === event.product_id || p.slug === event.product_permalink
    );

    if (!catalogProduct) {
      console.error('Product not found in catalog:', event.product_id);
      // Still process the purchase even if not in catalog
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: event.email.toLowerCase() },
    });

    // Create user if they don't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: event.email.toLowerCase(),
          name: event.email.split('@')[0], // Default name from email
          emailVerified: new Date(), // Gumroad verified the email
        },
      });
    }

    // Record the purchase
    const purchase = await prisma.purchase.create({
      data: {
        userId: user.id,
        productId: catalogProduct?.id || event.product_id,
        productName: event.product_name,
        amount: getPurchaseAmount(event),
        currency: event.currency,
        status: 'completed',
        provider: 'gumroad',
        providerId: event.sale_id,
        metadata: {
          gumroadData: event,
          catalogProduct: catalogProduct || null,
        },
      },
    });

    // Generate and save license key
    const licenseKey = gumroad.generateLicenseKey(
      catalogProduct?.id || event.product_id,
      event.sale_id
    );

    await prisma.licenseKey.create({
      data: {
        key: licenseKey,
        userId: user.id,
        purchaseId: purchase.id,
        productId: catalogProduct?.id || event.product_id,
        maxActivations: catalogProduct?.tier === 'premium' ? 3 : 1,
        expiresAt: catalogProduct?.tier === 'free' 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days for free
          : null, // No expiration for paid products
      },
    });

    // Update user tags based on purchase
    if (catalogProduct) {
      const currentTags = user.metadata as any || {};
      const tags = currentTags.tags || [];
      
      // Add product-specific tags
      if (catalogProduct.tier === 'free' && !tags.includes('lead')) {
        tags.push('lead');
      }
      if (catalogProduct.tier === 'tripwire' && !tags.includes('customer')) {
        tags.push('customer');
      }
      if (catalogProduct.tier === 'premium' && !tags.includes('premium_customer')) {
        tags.push('premium_customer');
      }
      
      // Add product tag
      tags.push(`purchased_${catalogProduct.slug}`);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          metadata: {
            ...currentTags,
            tags: [...new Set(tags)], // Remove duplicates
            lastPurchase: new Date(),
          },
        },
      });
    }

    // TODO: Trigger delivery email via ConvertKit or other email service
    // This would include the license key and download instructions

    console.log('Gumroad purchase processed successfully:', {
      purchaseId: purchase.id,
      userId: user.id,
      licenseKey: licenseKey,
    });

    return NextResponse.json({
      success: true,
      purchaseId: purchase.id,
      message: 'Purchase recorded successfully',
    });

  } catch (error) {
    console.error('Gumroad webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

// Gumroad sends GET requests to verify the webhook endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    message: 'Gumroad webhook endpoint is active',
    timestamp: new Date().toISOString(),
  });
}