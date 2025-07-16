'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, AlertCircle, CheckCircle, Clock, RefreshCw, Send } from 'lucide-react';

interface WorkflowStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastRun?: Date;
  successRate: number;
  totalRuns: number;
}

interface RecentActivity {
  id: string;
  type: string;
  status: 'success' | 'failed' | 'processing';
  message: string;
  timestamp: Date;
}

export function AutomationDashboard() {
  const [workflows, setWorkflows] = useState<WorkflowStatus[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch workflow statuses
      const workflowsRes = await fetch('/api/admin/workflows');
      const workflowsData = await workflowsRes.json();
      setWorkflows(workflowsData);

      // Fetch recent activities
      const activitiesRes = await fetch('/api/admin/activities');
      const activitiesData = await activitiesRes.json();
      setActivities(activitiesData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerWorkflow = async (type: string) => {
    try {
      const response = await fetch('/api/n8n/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) throw new Error('Failed to trigger workflow');

      // Refresh dashboard
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to trigger workflow:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'processing':
      case 'inactive':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Automation Dashboard</h2>
        <Button onClick={fetchDashboardData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="triggers">Manual Triggers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {workflows.filter(w => w.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  of {workflows.length} total workflows
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {workflows.length > 0
                    ? Math.round(
                        workflows.reduce((acc, w) => acc + w.successRate, 0) / workflows.length
                      )
                    : 0}%
                </div>
                <p className="text-xs text-muted-foreground">Average across all workflows</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Runs Today</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {activities.filter(
                    a => new Date(a.timestamp).toDateString() === new Date().toDateString()
                  ).length}
                </div>
                <p className="text-xs text-muted-foreground">Workflow executions</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          {workflows.map(workflow => (
            <Card key={workflow.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(workflow.status)}
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                  </div>
                  <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                    {workflow.status}
                  </Badge>
                </div>
                <CardDescription>
                  Last run: {workflow.lastRun ? new Date(workflow.lastRun).toLocaleString() : 'Never'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span>Success Rate: {workflow.successRate}%</span>
                  <span>Total Runs: {workflow.totalRuns}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest automation events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map(activity => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.message}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="triggers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Workflow Triggers</CardTitle>
              <CardDescription>Manually trigger automation workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button
                  onClick={() => triggerWorkflow('sync-social')}
                  variant="outline"
                  className="justify-start"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Sync Social Media
                </Button>
                <Button
                  onClick={() => triggerWorkflow('send-email')}
                  variant="outline"
                  className="justify-start"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Email Campaign
                </Button>
                <Button
                  onClick={() => triggerWorkflow('generate-report')}
                  variant="outline"
                  className="justify-start"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Generate Reports
                </Button>
                <Button
                  onClick={() => triggerWorkflow('update-community')}
                  variant="outline"
                  className="justify-start"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Update Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}