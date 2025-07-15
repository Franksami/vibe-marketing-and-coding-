import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowStatus, WorkflowStatusCard } from './WorkflowStatus';

const meta = {
  title: 'Workflow/WorkflowStatus',
  component: WorkflowStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['idle', 'running', 'success', 'error', 'warning', 'paused', 'scheduled', 'loading'],
    },
  },
} satisfies Meta<typeof WorkflowStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'idle',
  },
};

export const Running: Story = {
  args: {
    status: 'running',
    message: 'Processing workflow...',
    animate: true,
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    message: 'Workflow completed successfully',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    message: 'Failed to process workflow',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    message: 'Workflow completed with warnings',
  },
};

export const Loading: Story = {
  args: {
    status: 'loading',
    message: 'Loading workflow data...',
    animate: true,
  },
};

export const StatusCard: StoryObj<typeof WorkflowStatusCard> = {
  render: () => (
    <div className="space-y-4 w-96">
      <WorkflowStatusCard 
        workflowName="Data Sync"
        status="success"
        message="Last sync completed successfully"
        lastRun={new Date(Date.now() - 3600000)}
      />
      <WorkflowStatusCard 
        workflowName="Email Campaign"
        status="running"
        message="Processing batch 3 of 5"
        lastRun={new Date()}
        animate
      />
      <WorkflowStatusCard 
        workflowName="Report Generation"
        status="error"
        message="Failed to connect to database"
        lastRun={new Date(Date.now() - 7200000)}
      />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => {
    const statuses = ['idle', 'running', 'success', 'error', 'warning', 'paused', 'scheduled', 'loading'] as const;
    
    return (
      <div className="grid grid-cols-2 gap-4">
        {statuses.map(status => (
          <WorkflowStatus
            key={status}
            status={status}
            message={`Status: ${status}`}
            animate={['running', 'loading'].includes(status)}
          />
        ))}
      </div>
    );
  },
};