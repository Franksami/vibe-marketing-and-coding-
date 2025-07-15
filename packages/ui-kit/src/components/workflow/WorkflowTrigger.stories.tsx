import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowTrigger, WebhookTrigger, BatchTrigger } from './WorkflowTrigger';

const meta = {
  title: 'Workflow/WorkflowTrigger',
  component: WorkflowTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof WorkflowTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    workflowId: 'workflow-123',
    workflowName: 'Process Orders',
    onTrigger: async (id) => {
      console.log('Triggering workflow:', id);
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
    isRunning: false,
  },
};

export const Running: Story = {
  args: {
    workflowId: 'workflow-123',
    workflowName: 'Process Orders',
    onTrigger: async () => {},
    isRunning: true,
  },
};

export const WithPayload: Story = {
  args: {
    workflowId: 'workflow-123',
    workflowName: 'Create Report',
    onTrigger: async (id, payload) => {
      console.log('Triggering workflow:', id, 'with payload:', payload);
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
    payload: { reportType: 'monthly', format: 'pdf' },
    showPayload: true,
  },
};

export const Disabled: Story = {
  args: {
    workflowId: 'workflow-123',
    workflowName: 'Maintenance Mode',
    onTrigger: async () => {},
    disabled: true,
  },
};

export const WebhookExample: StoryObj<typeof WebhookTrigger> = {
  render: () => (
    <WebhookTrigger
      workflowId="webhook-flow"
      workflowName="Webhook Integration"
      webhookEndpoint="https://n8n.example.com/webhook/abc123xyz"
      method="POST"
      showEndpoint
      copyToClipboard
      onTrigger={async (id) => {
        console.log('Testing webhook:', id);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }}
    />
  ),
};

export const BatchExample: StoryObj<typeof BatchTrigger> = {
  render: () => (
    <BatchTrigger
      workflows={[
        { id: 'workflow-1', name: 'Data Import' },
        { id: 'workflow-2', name: 'Data Validation' },
        { id: 'workflow-3', name: 'Report Generation' },
      ]}
      onTrigger={async (workflows) => {
        console.log('Triggering batch workflows:', workflows);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }}
    />
  ),
};

export const TriggerVariants: Story = {
  render: () => {
    const variants = ['default', 'outline', 'ghost', 'destructive'] as const;
    
    return (
      <div className="flex flex-col gap-4">
        {variants.map(variant => (
          <WorkflowTrigger
            key={variant}
            workflowId={`workflow-${variant}`}
            workflowName={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Trigger`}
            variant={variant}
            onTrigger={async () => {}}
          />
        ))}
      </div>
    );
  },
};

export const TriggerSizes: Story = {
  render: () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    return (
      <div className="flex items-center gap-4">
        {sizes.map(size => (
          <WorkflowTrigger
            key={size}
            workflowId={`workflow-${size}`}
            workflowName={`${size.toUpperCase()} Size`}
            size={size}
            onTrigger={async () => {}}
          />
        ))}
      </div>
    );
  },
};