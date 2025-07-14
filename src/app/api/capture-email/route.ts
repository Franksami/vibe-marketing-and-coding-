import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Integrate with actual email service (ConvertKit, Mailchimp, etc.)
    // For now, we'll log it and return success
    console.log('Email captured:', email);
    
    // Here you would typically:
    // 1. Add to email service
    // 2. Store in database
    // 3. Send welcome email
    // 4. Track conversion
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thanks for joining! Check your email for your free resources.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture email' },
      { status: 500 }
    );
  }
}