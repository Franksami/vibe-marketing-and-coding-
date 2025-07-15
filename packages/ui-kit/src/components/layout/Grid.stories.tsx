import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid, Flex, Container } from './Grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    responsive: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border bg-card p-4 text-center">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    cols: 3,
    gap: 'md',
    responsive: true,
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <GridItem key={i}>Item {i + 1}</GridItem>
      ))}
    </Grid>
  ),
};

export const ColumnVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 text-lg font-semibold">2 Columns</h3>
        <Grid cols={2} gap="md">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">4 Columns</h3>
        <Grid cols={4} gap="md">
          {Array.from({ length: 8 }, (_, i) => (
            <GridItem key={i}>Item {i + 1}</GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">12 Column Grid</h3>
        <Grid cols={12} gap="sm">
          {Array.from({ length: 12 }, (_, i) => (
            <GridItem key={i}>{i + 1}</GridItem>
          ))}
        </Grid>
      </div>
    </div>
  ),
};

export const GapVariations: Story = {
  render: () => (
    <div className="space-y-8">
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap}>
          <h3 className="mb-2 text-lg font-semibold">Gap: {gap}</h3>
          <Grid cols={3} gap={gap}>
            <GridItem>Item 1</GridItem>
            <GridItem>Item 2</GridItem>
            <GridItem>Item 3</GridItem>
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Resize your browser to see responsive behavior
      </p>
      <Grid cols={4} gap="md" responsive>
        {Array.from({ length: 8 }, (_, i) => (
          <GridItem key={i}>
            <h4 className="font-semibold">Card {i + 1}</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Responsive grid item
            </p>
          </GridItem>
        ))}
      </Grid>
    </div>
  ),
};

export const FlexExamples: StoryObj<typeof Flex> = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 text-lg font-semibold">Row Direction (Default)</h3>
        <Flex gap="md">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
        </Flex>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Column Direction</h3>
        <Flex direction="col" gap="md">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
        </Flex>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Center Aligned</h3>
        <Flex justify="center" align="center" gap="md" className="h-32 border rounded-lg">
          <GridItem>Centered 1</GridItem>
          <GridItem>Centered 2</GridItem>
          <GridItem>Centered 3</GridItem>
        </Flex>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Space Between</h3>
        <Flex justify="between" gap="md">
          <GridItem>Left</GridItem>
          <GridItem>Center</GridItem>
          <GridItem>Right</GridItem>
        </Flex>
      </div>
    </div>
  ),
};

export const ContainerExamples: StoryObj<typeof Container> = {
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <div key={size} className="bg-muted/50">
          <Container size={size}>
            <div className="bg-card rounded-lg p-8 text-center">
              <h3 className="text-lg font-semibold">Container: {size}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Max width: {
                  size === 'sm' ? '48rem' :
                  size === 'md' ? '64rem' :
                  size === 'lg' ? '80rem' :
                  size === 'xl' ? '1536px' :
                  'full width'
                }
              </p>
            </div>
          </Container>
        </div>
      ))}
    </div>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <Container size="xl">
      <Flex direction="col" gap="lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Dashboard Layout Example</h1>
          <p className="mt-2 text-muted-foreground">
            Combining Grid, Flex, and Container components
          </p>
        </div>

        <Grid cols={4} gap="md">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <div className="text-2xl font-bold">{(i + 1) * 234}</div>
              <p className="text-sm text-muted-foreground">Metric {i + 1}</p>
            </div>
          ))}
        </Grid>

        <Grid cols={3} gap="lg">
          <div className="col-span-2 rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Main Content</h3>
            <p className="mt-2 text-muted-foreground">
              This spans 2 columns in a 3-column grid
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Sidebar</h3>
            <p className="mt-2 text-muted-foreground">
              Single column sidebar
            </p>
          </div>
        </Grid>
      </Flex>
    </Container>
  ),
};