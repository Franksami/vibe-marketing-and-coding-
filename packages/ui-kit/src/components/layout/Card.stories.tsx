import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './Card';

const meta = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'ghost'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content can contain any React components or text.</p>
      </CardContent>
      <CardFooter>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <Card variant="default" className="w-[300px]">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>With shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Default variant includes a subtle shadow.</p>
        </CardContent>
      </Card>

      <Card variant="bordered" className="w-[300px]">
        <CardHeader>
          <CardTitle>Bordered Card</CardTitle>
          <CardDescription>With border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Bordered variant has a visible border.</p>
        </CardContent>
      </Card>

      <Card variant="ghost" className="w-[300px]">
        <CardHeader>
          <CardTitle>Ghost Card</CardTitle>
          <CardDescription>Transparent background</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Ghost variant has no background or border.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>This card has no footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Cards don't require all sections. You can omit the footer if not needed.</p>
      </CardContent>
    </Card>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Workflow Status</CardTitle>
        <CardDescription>Monitor your active workflows</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Email Campaign</span>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Data Sync</span>
            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
              Paused
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Report Generation</span>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
              Running
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button className="text-sm text-muted-foreground hover:text-foreground">
          View All
        </button>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Create New
        </button>
      </CardFooter>
    </Card>
  ),
};

export const TitleVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle as="h1">H1 Title</CardTitle>
          <CardDescription>Using h1 tag</CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle as="h2">H2 Title</CardTitle>
          <CardDescription>Using h2 tag</CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Default H3 Title</CardTitle>
          <CardDescription>Default uses h3 tag</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

export const GridLayout: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Card {i + 1}</CardTitle>
            <CardDescription>Description for card {i + 1}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content goes here</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};