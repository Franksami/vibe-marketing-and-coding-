import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowHistory, type WorkflowExecution } from './WorkflowHistory';

const meta = {
  title: 'Workflow/WorkflowHistory',
  component: WorkflowHistory,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WorkflowHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockExecutions: WorkflowExecution[] = [
  {
    id: '1',
    workflowId: 'workflow-123',
    workflowName: 'Daily Report',
    status: 'success',
    startedAt: new Date(Date.now() - 3600000),
    finishedAt: new Date(Date.now() - 3300000),
    duration: 300000,
    trigger: 'schedule',
    data: { cron: '0 9 * * *' },
  },
  {
    id: '2',
    workflowId: 'workflow-456',
    workflowName: 'User Onboarding',
    status: 'running',
    startedAt: new Date(Date.now() - 600000),
    trigger: 'webhook',
    data: { userId: 'user-789' },
  },
  {
    id: '3',
    workflowId: 'workflow-789',
    workflowName: 'Data Sync',
    status: 'error',
    startedAt: new Date(Date.now() - 7200000),
    finishedAt: new Date(Date.now() - 7100000),
    duration: 100000,
    trigger: 'manual',
    error: 'Failed to connect to database',
  },
  {
    id: '4',
    workflowId: 'workflow-123',
    workflowName: 'Daily Report',
    status: 'success',
    startedAt: new Date(Date.now() - 90000000),
    finishedAt: new Date(Date.now() - 89700000),
    duration: 300000,
    trigger: 'schedule',
  },
  {
    id: '5',
    workflowId: 'workflow-456',
    workflowName: 'User Onboarding',
    status: 'warning',
    startedAt: new Date(Date.now() - 172800000),
    finishedAt: new Date(Date.now() - 172700000),
    duration: 100000,
    trigger: 'webhook',
    data: { warnings: ['Email service degraded'] },
  },
];

export const Default: Story = {
  args: {
    executions: mockExecutions,
    onExecutionClick: (execution) => {
      console.log('Clicked execution:', execution);
    },
  },
};

export const WithFilters: Story = {
  args: {
    executions: mockExecutions,
    showFilters: true,
    onExecutionClick: (execution) => {
      console.log('Clicked execution:', execution);
    },
  },
};

export const WithExport: Story = {
  args: {
    executions: mockExecutions,
    showExport: true,
    onExport: (format) => {
      console.log('Exporting as:', format);
    },
  },
};

export const FullFeatures: Story = {
  args: {
    executions: mockExecutions,
    showFilters: true,
    showExport: true,
    onExecutionClick: (execution) => {
      console.log('Clicked execution:', execution);
    },
    onExport: (format) => {
      console.log('Exporting as:', format);
    },
  },
};

export const Loading: Story = {
  args: {
    executions: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    executions: [],
  },
};

export const ManyExecutions: Story = {
  args: {
    executions: Array.from({ length: 20 }, (_, i) => ({
      id: `exec-${i}`,
      workflowId: `workflow-${Math.floor(Math.random() * 5)}`,
      workflowName: ['Daily Report', 'User Onboarding', 'Data Sync', 'Email Campaign', 'Backup'][Math.floor(Math.random() * 5)],
      status: ['success', 'error', 'warning', 'running'][Math.floor(Math.random() * 4)] as any,
      startedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      finishedAt: Math.random() > 0.2 ? new Date(Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000) : undefined,
      duration: Math.floor(Math.random() * 600000),
      trigger: ['schedule', 'webhook', 'manual'][Math.floor(Math.random() * 3)],
    })),
    showFilters: true,
    showExport: true,
  },
};

export const RealTimeUpdates: Story = {
  render: () => {
    const [executions, setExecutions] = React.useState(mockExecutions);
    
    React.useEffect(() => {
      const interval = setInterval(() => {
        setExecutions(prev => {
          const running = prev.find(e => e.status === 'running');
          if (running) {
            return prev.map(e => 
              e.id === running.id 
                ? { ...e, status: 'success', finishedAt: new Date(), duration: Date.now() - e.startedAt.getTime() }
                : e
            );
          }
          return prev;
        });
      }, 3000);
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <WorkflowHistory
        executions={executions}
        showFilters
        onExecutionClick={(execution) => {
          console.log('Clicked execution:', execution);
        }}
      />
    );
  },
};