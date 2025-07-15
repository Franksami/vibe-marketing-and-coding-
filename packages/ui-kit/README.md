# @vibe/ui-kit

A comprehensive React component library designed specifically for n8n workflow integration. Built with TypeScript, Tailwind CSS, and Radix UI primitives.

## Features

- 🎨 **Beautiful Components** - Pre-styled components that look great out of the box
- 🔧 **n8n Integration** - Components designed for workflow automation
- 📱 **Responsive** - Mobile-first design that works on all devices
- 🌙 **Dark Mode** - Built-in dark mode support
- 🎯 **TypeScript** - Full TypeScript support with exported types
- 📚 **Storybook** - Interactive documentation and playground
- ⚡ **Performance** - Optimized bundle size and tree-shaking

## Installation

```bash
npm install @vibe/ui-kit
# or
yarn add @vibe/ui-kit
# or
pnpm add @vibe/ui-kit
```

## Setup

### 1. Import Styles

Add the global styles to your application:

```tsx
// In your root component or _app.tsx
import '@vibe/ui-kit/dist/index.css';
```

### 2. Configure Tailwind (Optional)

If you're using Tailwind CSS in your project, add our preset:

```js
// tailwind.config.js
module.exports = {
  presets: [require('@vibe/ui-kit/tailwind.config')],
  // your config...
}
```

## Usage

### Workflow Status

Display the current status of a workflow execution:

```tsx
import { WorkflowStatus } from '@vibe/ui-kit';

function MyComponent() {
  return (
    <WorkflowStatus 
      status="running" 
      message="Processing data..." 
      animate
    />
  );
}
```

### Workflow Trigger

Create buttons to trigger n8n workflows:

```tsx
import { WorkflowTrigger } from '@vibe/ui-kit';

function MyComponent() {
  const handleTrigger = async (workflowId: string) => {
    const response = await fetch(`/api/workflows/${workflowId}/trigger`, {
      method: 'POST',
    });
    // Handle response
  };

  return (
    <WorkflowTrigger
      workflowId="workflow-123"
      workflowName="Process Orders"
      onTrigger={handleTrigger}
      isRunning={false}
    />
  );
}
```

### Webhook Trigger

Display webhook endpoints with copy functionality:

```tsx
import { WebhookTrigger } from '@vibe/ui-kit';

function MyComponent() {
  return (
    <WebhookTrigger
      workflowId="workflow-123"
      workflowName="Webhook Workflow"
      webhookEndpoint="https://n8n.example.com/webhook/abc123"
      method="POST"
      showEndpoint
      copyToClipboard
    />
  );
}
```

### Workflow History

Display execution history with filtering and export:

```tsx
import { WorkflowHistory } from '@vibe/ui-kit';

function MyComponent() {
  const executions = [
    {
      id: '1',
      workflowId: 'workflow-123',
      workflowName: 'Daily Report',
      status: 'success',
      startedAt: new Date(),
      duration: 5420,
      trigger: 'schedule',
    },
    // more executions...
  ];

  return (
    <WorkflowHistory
      executions={executions}
      onExecutionClick={(execution) => console.log(execution)}
      showFilters
      showExport
    />
  );
}
```

### Metric Cards

Display KPIs and metrics:

```tsx
import { MetricCard, MetricCardGroup } from '@vibe/ui-kit';

function Dashboard() {
  const metrics = [
    {
      title: 'Total Executions',
      value: 1234,
      trend: 'up',
      trendValue: '+12%',
      format: 'number',
    },
    {
      title: 'Success Rate',
      value: 98.5,
      trend: 'up',
      trendValue: '+2.5%',
      format: 'percentage',
    },
    {
      title: 'Monthly Cost',
      value: 499,
      trend: 'down',
      trendValue: '-15%',
      format: 'currency',
    },
    {
      title: 'Active Workflows',
      value: 42,
      trend: 'neutral',
      format: 'number',
    },
  ];

  return <MetricCardGroup metrics={metrics} columns={4} />;
}
```

## Components

### Workflow Components

- **WorkflowStatus** - Display workflow execution status
- **WorkflowTrigger** - Trigger workflow executions
- **WebhookTrigger** - Trigger webhooks with endpoint display
- **BatchTrigger** - Trigger multiple workflows at once
- **WorkflowHistory** - Display execution history table

### Data Components

- **MetricCard** - Display single metric with trend
- **MetricCardGroup** - Display multiple metrics in a grid

### More Components Coming Soon

- DataTable - Advanced data tables with sorting/filtering
- ChartWrapper - Recharts integration
- DashboardShell - Layout components
- AuthForms - Authentication components

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/vibe-academy/ui-kit.git

# Install dependencies
cd packages/ui-kit
npm install

# Start development
npm run dev

# Start Storybook
npm run storybook
```

### Building

```bash
# Build the library
npm run build

# Build Storybook
npm run build-storybook
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © The Vibe Launch

## Support

- 📧 Email: support@thevibelaunch.ai
- 💬 Discord: [Join our community](https://discord.gg/vibeacademy)
- 📚 Docs: [Documentation](https://docs.thevibelaunch.ai/ui-kit)