import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard, MetricCardGroup } from './MetricCard';

const meta = {
  title: 'Data/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: 'select',
      options: ['number', 'currency', 'percentage'],
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Total Executions',
    value: 1234,
    format: 'number',
  },
};

export const WithTrend: Story = {
  args: {
    title: 'Total Executions',
    value: 1234,
    trend: 'up',
    trendValue: '+12%',
    format: 'number',
  },
};

export const Currency: Story = {
  args: {
    title: 'Monthly Revenue',
    value: 45678.90,
    trend: 'up',
    trendValue: '+23.5%',
    format: 'currency',
  },
};

export const Percentage: Story = {
  args: {
    title: 'Success Rate',
    value: 98.5,
    trend: 'up',
    trendValue: '+2.5%',
    format: 'percentage',
  },
};

export const Negative: Story = {
  args: {
    title: 'Error Rate',
    value: 2.3,
    trend: 'down',
    trendValue: '-15%',
    format: 'percentage',
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading Metric',
    value: 0,
    isLoading: true,
  },
};

export const MetricGroup: StoryObj<typeof MetricCardGroup> = {
  render: () => (
    <MetricCardGroup
      metrics={[
        {
          title: 'Total Executions',
          value: 12345,
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
      ]}
      columns={4}
    />
  ),
};

export const ResponsiveGrid: StoryObj<typeof MetricCardGroup> = {
  render: () => (
    <div className="w-full max-w-6xl">
      <MetricCardGroup
        metrics={[
          {
            title: 'Daily Active Users',
            value: 5234,
            trend: 'up',
            trendValue: '+8%',
            format: 'number',
          },
          {
            title: 'Conversion Rate',
            value: 3.2,
            trend: 'up',
            trendValue: '+0.5%',
            format: 'percentage',
          },
          {
            title: 'Average Order Value',
            value: 125.50,
            trend: 'down',
            trendValue: '-3%',
            format: 'currency',
          },
          {
            title: 'Customer Satisfaction',
            value: 4.8,
            trend: 'up',
            trendValue: '+0.2',
            format: 'number',
          },
          {
            title: 'Support Tickets',
            value: 23,
            trend: 'down',
            trendValue: '-30%',
            format: 'number',
          },
          {
            title: 'Server Uptime',
            value: 99.98,
            trend: 'neutral',
            format: 'percentage',
          },
        ]}
        columns={3}
      />
    </div>
  ),
};

export const RealTimeMetrics: Story = {
  render: () => {
    const [value, setValue] = React.useState(1000);
    const [trend, setTrend] = React.useState<'up' | 'down' | 'neutral'>('neutral');
    
    React.useEffect(() => {
      const interval = setInterval(() => {
        const change = Math.random() * 200 - 100;
        setValue(prev => Math.max(0, prev + change));
        setTrend(change > 10 ? 'up' : change < -10 ? 'down' : 'neutral');
      }, 2000);
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <MetricCard
        title="Real-Time Metric"
        value={Math.round(value)}
        trend={trend}
        trendValue={trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
        format="number"
      />
    );
  },
};