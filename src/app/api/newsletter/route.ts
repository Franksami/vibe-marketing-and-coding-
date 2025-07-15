import { NextRequest, NextResponse } from 'next/server';

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY!;
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, source = 'website' } = body;

    // Validate input
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Subscribe to ConvertKit
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
          first_name: firstName || '',
          tags: [source, 'website-signup'],
          fields: {
            source: source,
            signup_date: new Date().toISOString(),
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('ConvertKit error:', data);
      throw new Error(data.message || 'Failed to subscribe');
    }

    // Track conversion event (optional - for analytics)
    // await trackEvent('newsletter_signup', { source });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
      subscriber: {
        id: data.subscription.subscriber.id,
        email_address: data.subscription.subscriber.email_address,
      },
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to subscribe. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}