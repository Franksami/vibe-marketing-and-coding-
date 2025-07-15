import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, MobileSidebar, type SidebarItem } from './Sidebar';
import { 
  Home, 
  FileText, 
  BarChart, 
  Users, 
  Settings,
  Package,
  Zap,
  Database,
  Menu
} from 'lucide-react';

const meta = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sidebarItems: SidebarItem[] = [
  {
    id: 'home',
    title: 'Home',
    href: '/',
    icon: <Home />,
  },
  {
    id: 'workflows',
    title: 'Workflows',
    href: '/workflows',
    icon: <Zap />,
    badge: 12,
  },
  {
    id: 'data',
    title: 'Data',
    icon: <Database />,
    children: [
      {
        id: 'data-sources',
        title: 'Sources',
        href: '/data/sources',
      },
      {
        id: 'data-destinations',
        title: 'Destinations',
        href: '/data/destinations',
      },
      {
        id: 'data-mappings',
        title: 'Mappings',
        href: '/data/mappings',
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    href: '/analytics',
    icon: <BarChart />,
  },
  {
    id: 'team',
    title: 'Team',
    href: '/team',
    icon: <Users />,
    badge: 3,
  },
  {
    id: 'integrations',
    title: 'Integrations',
    href: '/integrations',
    icon: <Package />,
    disabled: true,
  },
  {
    id: 'settings',
    title: 'Settings',
    href: '/settings',
    icon: <Settings />,
  },
];

export const Default: Story = {
  args: {
    items: sidebarItems,
    logo: <div className="text-xl font-bold">Logo</div>,
    onNavigate: (href) => console.log('Navigate to:', href),
  },
  render: (args) => (
    <div className="flex h-screen">
      <Sidebar {...args} />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p className="mt-2 text-muted-foreground">
          Click sidebar items to see navigation events in the console.
        </p>
      </div>
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <div className="flex h-screen">
        <Sidebar
          items={sidebarItems}
          logo={<div className="text-xl font-bold">My App</div>}
          collapsible
          defaultCollapsed={collapsed}
          onNavigate={(href) => console.log('Navigate to:', href)}
        />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Collapsible Sidebar</h1>
          <p className="mt-2 text-muted-foreground">
            Click the menu icon in the sidebar to toggle collapse state.
          </p>
        </div>
      </div>
    );
  },
};

export const WithFooter: Story = {
  args: {
    items: sidebarItems,
    logo: <div className="text-xl font-bold">Logo</div>,
    footer: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10" />
          <div className="flex-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </div>
      </div>
    ),
    onNavigate: (href) => console.log('Navigate to:', href),
  },
  render: (args) => (
    <div className="flex h-screen">
      <Sidebar {...args} />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Sidebar with Footer</h1>
        <p className="mt-2 text-muted-foreground">
          The sidebar includes a footer with user information.
        </p>
      </div>
    </div>
  ),
};

export const MobileExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="h-screen">
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 border-b p-4 lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-md p-2 hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Mobile Sidebar Demo</h1>
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={sidebarItems}
          logo={<div className="text-xl font-bold">My App</div>}
          onNavigate={(href) => {
            console.log('Navigate to:', href);
            setIsOpen(false);
          }}
        />

        {/* Desktop Layout */}
        <div className="hidden h-full lg:flex">
          <Sidebar
            items={sidebarItems}
            logo={<div className="text-xl font-bold">My App</div>}
            onNavigate={(href) => console.log('Navigate to:', href)}
          />
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold">Desktop View</h1>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4 lg:hidden">
          <h1 className="text-2xl font-bold">Mobile View</h1>
          <p className="mt-2 text-muted-foreground">
            Click the menu button to open the sidebar.
          </p>
        </div>
      </div>
    );
  },
};

export const ComplexNavigation: Story = {
  render: () => {
    const complexItems: SidebarItem[] = [
      {
        id: 'dashboard',
        title: 'Dashboard',
        href: '/dashboard',
        icon: <Home />,
      },
      {
        id: 'workflows',
        title: 'Workflows',
        icon: <Zap />,
        children: [
          {
            id: 'all-workflows',
            title: 'All Workflows',
            href: '/workflows',
            badge: 24,
          },
          {
            id: 'my-workflows',
            title: 'My Workflows',
            href: '/workflows/mine',
            badge: 8,
          },
          {
            id: 'templates',
            title: 'Templates',
            href: '/workflows/templates',
          },
          {
            id: 'workflow-settings',
            title: 'Settings',
            children: [
              {
                id: 'workflow-env',
                title: 'Environment',
                href: '/workflows/settings/env',
              },
              {
                id: 'workflow-secrets',
                title: 'Secrets',
                href: '/workflows/settings/secrets',
              },
            ],
          },
        ],
      },
      {
        id: 'data',
        title: 'Data Management',
        icon: <Database />,
        children: [
          {
            id: 'connections',
            title: 'Connections',
            href: '/data/connections',
            badge: 'New',
          },
          {
            id: 'schemas',
            title: 'Schemas',
            href: '/data/schemas',
          },
          {
            id: 'transformations',
            title: 'Transformations',
            href: '/data/transformations',
          },
        ],
      },
    ];

    return (
      <div className="flex h-screen">
        <Sidebar
          items={complexItems}
          logo={<div className="text-xl font-bold">Complex Nav</div>}
          onNavigate={(href) => console.log('Navigate to:', href)}
        />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Complex Navigation</h1>
          <p className="mt-2 text-muted-foreground">
            This sidebar demonstrates nested navigation items and badges.
          </p>
        </div>
      </div>
    );
  },
};