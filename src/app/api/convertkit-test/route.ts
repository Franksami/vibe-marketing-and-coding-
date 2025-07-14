import { NextResponse } from 'next/server';

// Direct API test bypassing our form logic
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const apiKey = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;

    console.log('[ConvertKit Test] Starting test with:', { email, formId });

    // Test 1: Direct form subscription
    const formResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          email: email,
        }),
      }
    );

    const formData = await formResponse.json();
    console.log('[ConvertKit Test] Form response:', formData);

    // Test 2: Get subscriber by email
    const subscriberResponse = await fetch(
      `https://api.convertkit.com/v3/subscribers?api_secret=${process.env.CONVERTKIT_API_SECRET}&email_address=${email}`,
      { method: 'GET' }
    );

    const subscriberData = await subscriberResponse.json();
    console.log('[ConvertKit Test] Subscriber lookup:', subscriberData);

    // Test 3: Try alternative subscription endpoint
    const bulkResponse = await fetch(
      'https://api.convertkit.com/v3/bulk/subscribe',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          subscribers: [{
            email: email,
            fields: {
              source: 'vibe-academy-test'
            }
          }]
        }),
      }
    );

    const bulkData = await bulkResponse.json();
    console.log('[ConvertKit Test] Bulk subscribe response:', bulkData);

    return NextResponse.json({
      success: true,
      tests: {
        formSubscription: {
          success: formResponse.ok,
          status: formResponse.status,
          data: formData,
        },
        subscriberLookup: {
          found: subscriberData.total_subscribers > 0,
          count: subscriberData.total_subscribers,
          data: subscriberData,
        },
        bulkSubscription: {
          success: bulkResponse.ok,
          status: bulkResponse.status,
          data: bulkData,
        }
      },
      summary: {
        email: email,
        formId: formId,
        timestamp: new Date().toISOString(),
        subscriberId: formData.subscription?.subscriber?.id || bulkData.subscribers?.[0]?.id,
        state: formData.subscription?.state || 'unknown',
      }
    });
  } catch (error) {
    console.error('[ConvertKit Test] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// Get all forms to verify form exists
export async function GET() {
  try {
    const apiSecret = process.env.CONVERTKIT_API_SECRET;
    
    const response = await fetch(
      `https://api.convertkit.com/v3/forms?api_secret=${apiSecret}`,
      { method: 'GET' }
    );

    const data = await response.json();
    
    return NextResponse.json({
      forms: data.forms?.map((form: any) => ({
        id: form.id,
        name: form.name,
        type: form.type,
        created_at: form.created_at,
        format: form.format,
        embed_url: form.embed_url,
      })) || [],
      totalForms: data.forms?.length || 0,
      currentFormId: process.env.CONVERTKIT_FORM_ID,
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch forms',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}