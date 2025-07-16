import { prisma } from '@/lib/prisma';

interface MonitoringMetrics {
  totalWorkflows: number;
  activeWorkflows: number;
  successRate: number;
  averageExecutionTime: number;
  failedExecutions: number;
  topFailureReasons: { reason: string; count: number }[];
}

interface WorkflowHealth {
  workflowId: string;
  name: string;
  status: 'healthy' | 'degraded' | 'failing';
  lastRunTime?: Date;
  successRate: number;
  averageExecutionTime: number;
  recentFailures: number;
}

export class AutomationMonitor {
  /**
   * Get overall automation metrics
   */
  async getMetrics(timeRange: 'day' | 'week' | 'month' = 'day'): Promise<MonitoringMetrics> {
    const startDate = this.getStartDate(timeRange);

    // Get all workflow runs in the time range
    const runs = await prisma.workflowRun.findMany({
      where: {
        startedAt: {
          gte: startDate,
        },
      },
    });

    // Calculate metrics
    const totalRuns = runs.length;
    const successfulRuns = runs.filter(r => r.status === 'success').length;
    const failedRuns = runs.filter(r => r.status === 'failed').length;
    const totalExecutionTime = runs.reduce((sum, r) => sum + (r.duration || 0), 0);

    // Get unique workflow IDs
    const uniqueWorkflows = new Set(runs.map(r => r.workflowId));

    // Count failure reasons
    const failureReasons = runs
      .filter(r => r.status === 'failed' && r.error)
      .reduce((acc, run) => {
        const reason = this.categorizeError(run.error!);
        acc[reason] = (acc[reason] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const topFailureReasons = Object.entries(failureReasons)
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalWorkflows: uniqueWorkflows.size,
      activeWorkflows: uniqueWorkflows.size, // In real implementation, check n8n API
      successRate: totalRuns > 0 ? (successfulRuns / totalRuns) * 100 : 0,
      averageExecutionTime: totalRuns > 0 ? totalExecutionTime / totalRuns : 0,
      failedExecutions: failedRuns,
      topFailureReasons,
    };
  }

  /**
   * Get health status for each workflow
   */
  async getWorkflowHealth(): Promise<WorkflowHealth[]> {
    const recentRuns = await prisma.workflowRun.findMany({
      where: {
        startedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
    });

    // Group by workflow
    const workflowMap = new Map<string, typeof recentRuns>();
    recentRuns.forEach(run => {
      const runs = workflowMap.get(run.workflowId) || [];
      runs.push(run);
      workflowMap.set(run.workflowId, runs);
    });

    // Calculate health for each workflow
    const healthStatuses: WorkflowHealth[] = [];
    
    for (const [workflowId, runs] of workflowMap) {
      const successfulRuns = runs.filter(r => r.status === 'success').length;
      const successRate = (successfulRuns / runs.length) * 100;
      const recentFailures = runs.slice(0, 5).filter(r => r.status === 'failed').length;
      const avgExecutionTime = runs.reduce((sum, r) => sum + (r.duration || 0), 0) / runs.length;

      let status: 'healthy' | 'degraded' | 'failing';
      if (successRate >= 90 && recentFailures === 0) {
        status = 'healthy';
      } else if (successRate >= 70 || recentFailures <= 1) {
        status = 'degraded';
      } else {
        status = 'failing';
      }

      healthStatuses.push({
        workflowId,
        name: this.getWorkflowName(workflowId),
        status,
        lastRunTime: runs[0]?.startedAt,
        successRate,
        averageExecutionTime: avgExecutionTime,
        recentFailures,
      });
    }

    return healthStatuses;
  }

  /**
   * Log a workflow execution
   */
  async logExecution(data: {
    workflowId: string;
    trigger: string;
    input: any;
    output?: any;
    status: 'running' | 'success' | 'failed';
    error?: string;
    duration?: number;
  }): Promise<void> {
    await prisma.workflowRun.create({
      data: {
        workflowId: data.workflowId,
        trigger: data.trigger,
        input: data.input,
        output: data.output,
        status: data.status,
        error: data.error,
        duration: data.duration,
        completedAt: data.status !== 'running' ? new Date() : undefined,
      },
    });
  }

  /**
   * Get recent activity for display
   */
  async getRecentActivity(limit: number = 20): Promise<any[]> {
    const [webhookLogs, workflowRuns] = await Promise.all([
      prisma.webhookLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
      prisma.workflowRun.findMany({
        orderBy: { startedAt: 'desc' },
        take: limit,
      }),
    ]);

    // Combine and sort by timestamp
    const activities = [
      ...webhookLogs.map(log => ({
        id: log.id,
        type: `Webhook: ${log.event}`,
        status: log.status,
        message: log.error || `${log.source} webhook processed`,
        timestamp: log.createdAt,
      })),
      ...workflowRuns.map(run => ({
        id: run.id,
        type: `Workflow: ${this.getWorkflowName(run.workflowId)}`,
        status: run.status,
        message: run.error || `Triggered by ${run.trigger}`,
        timestamp: run.startedAt,
      })),
    ];

    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Set up alerts for failures
   */
  async checkAlerts(): Promise<void> {
    const healthStatuses = await this.getWorkflowHealth();
    
    for (const workflow of healthStatuses) {
      if (workflow.status === 'failing') {
        // Send alert (integrate with your notification system)
        console.error(`ALERT: Workflow ${workflow.name} is failing with ${workflow.successRate}% success rate`);
        
        // Could trigger an email, Slack message, etc.
        await this.sendAlert({
          type: 'workflow_failing',
          workflowId: workflow.workflowId,
          workflowName: workflow.name,
          successRate: workflow.successRate,
          recentFailures: workflow.recentFailures,
        });
      }
    }
  }

  /**
   * Clean up old logs
   */
  async cleanupOldLogs(daysToKeep: number = 30): Promise<void> {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);

    const [deletedWebhooks, deletedRuns] = await Promise.all([
      prisma.webhookLog.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate,
          },
        },
      }),
      prisma.workflowRun.deleteMany({
        where: {
          startedAt: {
            lt: cutoffDate,
          },
        },
      }),
    ]);

    console.log(`Cleaned up ${deletedWebhooks.count} webhook logs and ${deletedRuns.count} workflow runs`);
  }

  // Helper methods

  private getStartDate(timeRange: 'day' | 'week' | 'month'): Date {
    const now = new Date();
    switch (timeRange) {
      case 'day':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case 'week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'month':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
  }

  private categorizeError(error: string): string {
    if (error.includes('timeout')) return 'Timeout';
    if (error.includes('auth') || error.includes('unauthorized')) return 'Authentication';
    if (error.includes('rate limit')) return 'Rate Limit';
    if (error.includes('network') || error.includes('fetch')) return 'Network Error';
    if (error.includes('validation')) return 'Validation Error';
    return 'Other';
  }

  private getWorkflowName(workflowId: string): string {
    // In production, fetch from n8n API or maintain a local mapping
    const workflowNames: Record<string, string> = {
      'content-syndication': 'Content Syndication',
      'student-onboarding': 'Student Onboarding',
      'payment-processing': 'Payment Processing',
      'email-automation': 'Email Automation',
    };
    return workflowNames[workflowId] || workflowId;
  }

  private async sendAlert(alert: any): Promise<void> {
    // Implement your alert system here
    // Could be email, Slack, Discord, etc.
    console.log('Alert:', alert);
  }
}

// Export singleton instance
export const automationMonitor = new AutomationMonitor();