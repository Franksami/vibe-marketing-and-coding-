import { NextResponse } from 'next/server';
import { createConvertKitClient } from '@/lib/convertkit';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if ConvertKit is configured
    const formId = process.env.CONVERTKIT_FORM_ID;
    if (!formId || !process.env.CONVERTKIT_API_KEY) {
      // Log the email if ConvertKit is not configured
      console.log('Email captured (ConvertKit not configured):', email);
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thanks for joining! We\'ll be in touch soon.' 
        },
        { status: 200 }
      );
    }

    try {
      // Add subscriber to ConvertKit form
      const convertkit = createConvertKitClient();
      const subscribed = await convertkit.addSubscriberWithWebhook(email, formId);

      if (subscribed) {
        console.log('Email added to ConvertKit:', email);
        
        // Note: Welcome emails should be configured in ConvertKit's visual automations
        // This ensures better deliverability and tracking
        
        return NextResponse.json(
          { 
            success: true, 
            message: 'Thanks for joining! Check your email for your free resources.' 
          },
          { status: 200 }
        );
      } else {
        // Subscriber might already exist, which is fine
        console.log('Email already in ConvertKit or pending confirmation:', email);
        
        return NextResponse.json(
          { 
            success: true, 
            message: 'Welcome back! Check your email for your resources.' 
          },
          { status: 200 }
        );
      }
    } catch (convertkitError) {
      // Log but don't fail - we still captured the email
      console.error('ConvertKit error (email still captured):', convertkitError);
      console.log('Email captured with error:', email);
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thanks for joining! We\'ll be in touch soon.' 
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Email capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture email' },
      { status: 500 }
    );
  }
}