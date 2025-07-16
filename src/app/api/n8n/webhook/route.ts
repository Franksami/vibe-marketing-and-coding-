import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

// Webhook secret for validating n8n requests
const N8N_WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || '';

// Supported webhook events
export type N8NWebhookEvent = 
  | 'content.published'
  | 'content.updated'
  | 'user.enrolled'
  | 'payment.completed'
  | 'email.subscribed'
  | 'social.posted'
  | 'automation.completed';

interface N8NWebhookPayload {
  event: N8NWebhookEvent;
  timestamp: string;
  data: Record<string, any>;
  workflowId?: string;
  executionId?: string;
}

// Verify webhook signature
function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!N8N_WEBHOOK_SECRET) {
    console.warn('N8N_WEBHOOK_SECRET not configured');
    return true; // Allow in development
  }

  const hmac = crypto.createHmac('sha256', N8N_WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('x-n8n-signature') || '';

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const payload: N8NWebhookPayload = JSON.parse(body);
    console.log('Received n8n webhook:', payload.event);

    // Process webhook based on event type
    switch (payload.event) {
      case 'content.published':
        await handleContentPublished(payload.data);
        break;

      case 'content.updated':
        await handleContentUpdated(payload.data);
        break;

      case 'user.enrolled':
        await handleUserEnrolled(payload.data);
        break;

      case 'payment.completed':
        await handlePaymentCompleted(payload.data);
        break;

      case 'email.subscribed':
        await handleEmailSubscribed(payload.data);
        break;

      case 'social.posted':
        await handleSocialPosted(payload.data);
        break;

      case 'automation.completed':
        await handleAutomationCompleted(payload.data);
        break;

      default:
        console.warn('Unknown webhook event:', payload.event);
    }

    // Log webhook execution
    await prisma.webhookLog.create({
      data: {
        source: 'n8n',
        event: payload.event,
        payload: payload.data,
        status: 'success',
        workflowId: payload.workflowId,
        executionId: payload.executionId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('n8n webhook error:', error);

    // Log failed webhook
    await prisma.webhookLog.create({
      data: {
        source: 'n8n',
        event: 'error',
        payload: { error: error instanceof Error ? error.message : 'Unknown error' },
        status: 'failed',
      },
    });

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Handler functions for each event type

async function handleContentPublished(data: any) {
  // Update content status in database
  if (data.contentId && data.contentType) {
    console.log(`Content published: ${data.contentType} - ${data.contentId}`);
    // Add your content publishing logic here
  }
}

async function handleContentUpdated(data: any) {
  // Handle content updates
  console.log('Content updated:', data);
}

async function handleUserEnrolled(data: any) {
  // Process new user enrollment
  if (data.userId && data.courseId) {
    console.log(`User ${data.userId} enrolled in course ${data.courseId}`);
    // Add enrollment processing logic
  }
}

async function handlePaymentCompleted(data: any) {
  // Process completed payment
  console.log('Payment completed:', data);
}

async function handleEmailSubscribed(data: any) {
  // Handle email subscription
  console.log('Email subscribed:', data);
}

async function handleSocialPosted(data: any) {
  // Track social media posts
  if (data.platform && data.postId) {
    console.log(`Posted to ${data.platform}: ${data.postId}`);
    // Add social media tracking logic
  }
}

async function handleAutomationCompleted(data: any) {
  // Log automation completion
  console.log('Automation completed:', data);
}