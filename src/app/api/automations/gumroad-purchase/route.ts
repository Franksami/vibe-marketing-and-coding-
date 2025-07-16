import { NextRequest, NextResponse } from 'next/server';
import { gumroad } from '@/lib/gumroad';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import productCatalog from '@/content/products/catalog.json';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-gumroad-signature') || '';

    // Verify webhook signature
    if (!gumroad.verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the webhook data
    const formData = new URLSearchParams(rawBody);
    const webhookData: Record<string, string> = {};
    formData.forEach((value, key) => {
      webhookData[key] = value;
    });

    const event = gumroad.parseWebhookEvent(webhookData);

    // Find the product in our catalog
    const product = productCatalog.products.find(
      p => p.gumroadId === event.product_id || p.slug === event.product_permalink
    );

    if (!product) {
      console.error('Product not found:', event.product_id);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Process based on product tier
    switch (product.tier) {
      case 'free':
        await handleFreeProduct(event, product);
        break;
      case 'tripwire':
        await handleTripwireProduct(event, product);
        break;
      case 'premium':
        await handlePremiumProduct(event, product);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Automation error:', error);
    return NextResponse.json(
      { error: 'Automation failed' },
      { status: 500 }
    );
  }
}

async function handleFreeProduct(event: any, product: any) {
  // 1. Add to email list with 'lead-magnet' tag
  await addToEmailList(event.email, {
    tags: ['lead-magnet', product.id],
    customFields: {
      product_downloaded: product.name,
      download_date: new Date().toISOString(),
    }
  });

  // 2. Send welcome email with download link
  await sendEmail({
    to: event.email,
    subject: `🎉 Your ${product.name} is ready!`,
    template: 'lead-magnet-delivery',
    data: {
      productName: product.name,
      downloadUrl: `/api/downloads/${product.id}?key=${event.license_key}`,
      quickStartUrl: `/products/${product.slug}/quick-start`,
    }
  });

  // 3. Track conversion
  await trackConversion({
    email: event.email,
    product: product.id,
    value: 0,
    source: 'gumroad',
  });

  // 4. Trigger nurture sequence
  await triggerNurtureSequence(event.email, 'free-to-paid');
}

async function handleTripwireProduct(event: any, product: any) {
  // 1. Update customer status
  await updateCustomerStatus(event.email, 'customer');

  // 2. Add product access
  await grantProductAccess(event.email, product.id, event.license_key);

  // 3. Send purchase confirmation
  await sendEmail({
    to: event.email,
    subject: `✅ Welcome to ${product.name}!`,
    template: 'purchase-confirmation',
    data: {
      productName: product.name,
      amount: event.price,
      accessUrl: `/products/${product.slug}/access`,
      supportEmail: 'support@thevibelaunch.ai',
    }
  });

  // 4. Add to customer segment
  await addToEmailList(event.email, {
    tags: ['customer', 'tripwire', product.id],
    customFields: {
      lifetime_value: parseFloat(event.price.replace('$', '')),
      last_purchase_date: new Date().toISOString(),
    }
  });

  // 5. Schedule review request (7 days)
  await scheduleEmail(event.email, 'review-request', 7);
}

async function handlePremiumProduct(event: any, product: any) {
  // 1. VIP treatment
  await updateCustomerStatus(event.email, 'vip');

  // 2. Grant premium access
  await grantProductAccess(event.email, product.id, event.license_key, {
    tier: 'premium',
    supportLevel: 'priority',
  });

  // 3. Send VIP welcome
  await sendEmail({
    to: event.email,
    subject: `🌟 VIP Access Granted - ${product.name}`,
    template: 'vip-welcome',
    data: {
      productName: product.name,
      vipBenefits: [
        'Priority support',
        'Exclusive updates',
        'Community access',
        'Bonus resources',
      ],
      calendarLink: 'https://calendly.com/vibelaunch/vip-onboarding',
    }
  });

  // 4. Notify team
  await notifyTeam({
    type: 'new-vip-customer',
    customer: event.email,
    product: product.name,
    amount: event.price,
  });

  // 5. Add to VIP segment
  await addToEmailList(event.email, {
    tags: ['vip', 'premium', product.id],
    customFields: {
      vip_status: true,
      premium_products: [product.id],
    }
  });
}

// Helper functions (implement based on your email service)
async function addToEmailList(email: string, data: any) {
  // ConvertKit/MailerLite/etc implementation
  console.log('Adding to email list:', email, data);
}

async function updateCustomerStatus(email: string, status: string) {
  // Update in database
  await prisma.user.update({
    where: { email },
    data: { 
      customerStatus: status,
      lastPurchaseAt: new Date(),
    }
  });
}

async function grantProductAccess(email: string, productId: string, licenseKey: string, options?: any) {
  // Grant access in database
  console.log('Granting access:', email, productId, options);
}

async function trackConversion(data: any) {
  // Google Analytics, Segment, etc
  console.log('Tracking conversion:', data);
}

async function triggerNurtureSequence(email: string, sequence: string) {
  // Trigger email sequence
  console.log('Triggering sequence:', email, sequence);
}

async function scheduleEmail(email: string, template: string, daysDelay: number) {
  // Schedule future email
  console.log('Scheduling email:', email, template, daysDelay);
}

async function notifyTeam(data: any) {
  // Slack, Discord, email notification
  console.log('Notifying team:', data);
}