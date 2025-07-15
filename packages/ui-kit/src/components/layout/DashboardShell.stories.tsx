import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  DashboardShell, 
  DashboardHeader, 
  DashboardNav, 
  DashboardMain 
} from './DashboardShell';
import { Home, Settings, Users, FileText, BarChart } from 'lucide-react';

const meta = {
  title: 'Layout/DashboardShell',
  component: DashboardShell,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { title: 'Overview', href: '/dashboard', icon: <Home /> },
  { title: 'Workflows', href: '/workflows', icon: <FileText /> },
  { title: 'Analytics', href: '/analytics', icon: <BarChart /> },
  { title: 'Team', href: '/team', icon: <Users /> },
  { title: 'Settings', href: '/settings', icon: <Settings /> },
];

export const Default: Story = {
  render: () => (
    <DashboardShell>
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav items={navItems} onNavigate={(href) => console.log('Navigate to:', href)} />
      </aside>
      <DashboardMain>
        <DashboardHeader 
          heading="Dashboard" 
          text="Welcome back! Here's an overview of your workflows."
        >
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Create Workflow
          </button>
        </DashboardHeader>
        <div className="flex-1 p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg border bg-card p-6">
                <div className="text-2xl font-bold">{i * 123}</div>
                <p className="text-xs text-muted-foreground">Metric {i}</p>
              </div>
            ))}
          </div>
        </div>
      </DashboardMain>
    </DashboardShell>
  ),
};

export const WithDisabledItems: Story = {
  render: () => {
    const itemsWithDisabled = [
      ...navItems.slice(0, 3),
      { title: 'Beta Feature', href: '/beta', icon: <FileText />, disabled: true },
      ...navItems.slice(3),
    ];

    return (
      <DashboardShell>
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={itemsWithDisabled} onNavigate={(href) => console.log('Navigate to:', href)} />
        </aside>
        <DashboardMain>
          <DashboardHeader heading="Dashboard with Disabled Items" />
          <div className="flex-1 p-8">
            <p>Some navigation items can be disabled.</p>
          </div>
        </DashboardMain>
      </DashboardShell>
    );
  },
};

export const HeaderVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <DashboardHeader 
        heading="Simple Header" 
      />
      
      <DashboardHeader 
        heading="Header with Description" 
        text="This header includes a descriptive text below the title."
      />
      
      <DashboardHeader 
        heading="Header with Actions" 
        text="This header includes action buttons on the right."
      >
        <div className="flex gap-2">
          <button className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
            Export
          </button>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Create New
          </button>
        </div>
      </DashboardHeader>
    </div>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <DashboardShell className="h-screen">
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav items={navItems} onNavigate={(href) => console.log('Navigate to:', href)} />
      </aside>
      <DashboardMain>
        <DashboardHeader 
          heading="Responsive Dashboard" 
          text="Resize your browser to see the responsive behavior."
        />
        <div className="flex-1 p-4 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">Card {i}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  This layout adapts to different screen sizes.
                </p>
              </div>
            ))}
          </div>
        </div>
      </DashboardMain>
    </DashboardShell>
  ),
};