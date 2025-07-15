import { NextRequest, NextResponse } from 'next/server';

// This endpoint would be called by ConvertKit webhook
// when someone confirms their email subscription
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, firstName } = data.subscriber;
    
    // In production, you would:
    // 1. Verify webhook signature
    // 2. Send personalized email with download link
    // 3. Track delivery
    
    // For now, we'll just log and return success
    console.log(`Delivering lead magnet to ${email}`);
    
    // You could send an email here with the download link
    // const downloadUrl = `${process.env.NEXT_PUBLIC_URL}/downloads/cursor-rules-starter-pack.zip`;
    
    return NextResponse.json({ 
      success: true,
      message: 'Lead magnet delivery initiated'
    });
  } catch (error) {
    console.error('Lead magnet delivery error:', error);
    return NextResponse.json(
      { error: 'Failed to deliver lead magnet' },
      { status: 500 }
    );
  }
}
