import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { automationMonitor } from '@/lib/monitoring/automation-monitor';

export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session.user.email.includes('@thevibelaunch.ai')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get workflow health statuses
    const healthStatuses = await automationMonitor.getWorkflowHealth();

    // Transform to dashboard format
    const workflows = healthStatuses.map(health => ({
      id: health.workflowId,
      name: health.name,
      status: health.status === 'healthy' ? 'active' : health.status === 'failing' ? 'error' : 'inactive',
      lastRun: health.lastRunTime,
      successRate: Math.round(health.successRate),
      totalRuns: 0, // Would need to query this separately
    }));

    return NextResponse.json(workflows);
  } catch (error) {
    console.error('Failed to fetch workflows:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workflows' },
      { status: 500 }
    );
  }
}