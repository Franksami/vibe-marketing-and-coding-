import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// n8n webhook URL (will be configured in production)
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook';
const N8N_API_KEY = process.env.N8N_API_KEY || '';

export type TriggerType = 
  | 'publish-content'
  | 'sync-social'
  | 'send-email'
  | 'process-enrollment'
  | 'generate-report'
  | 'update-community';

interface TriggerPayload {
  type: TriggerType;
  data: Record<string, unknown>;
  priority?: 'low' | 'normal' | 'high';
  metadata?: {
    userId?: string;
    source?: string;
    timestamp?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload: TriggerPayload = await request.json();

    // Add metadata
    payload.metadata = {
      ...payload.metadata,
      userId: session.user.id,
      source: 'web-app',
      timestamp: new Date().toISOString(),
    };

    // Validate trigger type
    const validTriggers: TriggerType[] = [
      'publish-content',
      'sync-social',
      'send-email',
      'process-enrollment',
      'generate-report',
      'update-community',
    ];

    if (!validTriggers.includes(payload.type)) {
      return NextResponse.json(
        { error: 'Invalid trigger type' },
        { status: 400 }
      );
    }

    // Send to n8n webhook
    const webhookUrl = `${N8N_WEBHOOK_URL}/${payload.type}`;
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${N8N_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.statusText}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      executionId: result.executionId,
      message: `Triggered ${payload.type} workflow`,
    });
  } catch (error) {
    console.error('Failed to trigger n8n workflow:', error);
    return NextResponse.json(
      { error: 'Failed to trigger workflow' },
      { status: 500 }
    );
  }
}

// GET endpoint to check workflow status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const executionId = searchParams.get('executionId');

    if (!executionId) {
      return NextResponse.json(
        { error: 'Execution ID required' },
        { status: 400 }
      );
    }

    // Check execution status in n8n
    const statusUrl = `${N8N_WEBHOOK_URL}/execution/${executionId}`;
    const response = await fetch(statusUrl, {
      headers: {
        'Authorization': `Bearer ${N8N_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get execution status');
    }

    const status = await response.json();

    return NextResponse.json({
      executionId,
      status: status.status,
      startedAt: status.startedAt,
      finishedAt: status.finishedAt,
      error: status.error,
    });
  } catch (error) {
    console.error('Failed to get workflow status:', error);
    return NextResponse.json(
      { error: 'Failed to get workflow status' },
      { status: 500 }
    );
  }
}