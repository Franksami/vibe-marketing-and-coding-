import { NextResponse } from 'next/server';

interface Subscriber {
  email_address: string;
}

interface Subscription {
  subscriber?: Subscriber;
  state: string;
  created_at: string;
}

interface Form {
  name: string;
  url: string;
}

interface FormResponse {
  form?: Form;
}

interface SubscriptionsResponse {
  total_subscriptions: number;
  subscriptions?: Subscription[];
}

interface TestSubscriptionResponse {
  subscription?: {
    state: string;
  };
}

export async function GET() {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const apiSecret = process.env.CONVERTKIT_API_SECRET;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !apiSecret || !formId) {
    return NextResponse.json({
      error: 'ConvertKit not configured',
      config: {
        hasApiKey: !!apiKey,
        hasApiSecret: !!apiSecret,
        hasFormId: !!formId,
      }
    }, { status: 500 });
  }

  try {
    // Test 1: Get form details
    const formResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}?api_secret=${apiSecret}`,
      { method: 'GET' }
    );
    const formData: FormResponse = await formResponse.json();

    // Test 2: Get recent subscribers (last 50)
    const subscribersResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscriptions?api_secret=${apiSecret}&per_page=50`,
      { method: 'GET' }
    );
    const subscribersData: SubscriptionsResponse = await subscribersResponse.json();

    // Test 3: Test email submission
    const testEmail = `debug-test-${Date.now()}@example.com`;
    const testResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          email: testEmail,
        }),
      }
    );
    const testData: TestSubscriptionResponse = await testResponse.json();

    return NextResponse.json({
      status: 'ConvertKit Debug Info',
      timestamp: new Date().toISOString(),
      form: {
        id: formId,
        name: formData.form?.name || 'Unknown',
        url: formData.form?.url || 'N/A',
        totalSubscribers: subscribersData.total_subscriptions || 0,
      },
      recentSubscribers: subscribersData.subscriptions?.slice(0, 5).map((sub: Subscription) => ({
        email: sub.subscriber?.email_address,
        state: sub.state,
        createdAt: sub.created_at,
      })) || [],
      testSubmission: {
        email: testEmail,
        success: testResponse.ok,
        state: testData.subscription?.state,
        message: testResponse.ok ? 'Test email submitted successfully' : 'Test submission failed',
      },
      apiEndpoints: {
        captureEmail: '/api/capture-email',
        formUrl: `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Debug failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}