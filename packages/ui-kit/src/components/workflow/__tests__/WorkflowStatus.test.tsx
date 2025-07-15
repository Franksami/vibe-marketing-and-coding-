import React from 'react';
import { render, screen } from '@testing-library/react';
import { WorkflowStatus, WorkflowStatusCard } from '../WorkflowStatus';

describe('WorkflowStatus', () => {
  it('renders with active status', () => {
    render(<WorkflowStatus status="active" />);
    const badge = screen.getByText('Active');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-green-100');
  });

  it('renders with paused status', () => {
    render(<WorkflowStatus status="paused" />);
    const badge = screen.getByText('Paused');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-yellow-100');
  });

  it('renders with error status', () => {
    render(<WorkflowStatus status="error" />);
    const badge = screen.getByText('Error');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-red-100');
  });

  it('renders with waiting status', () => {
    render(<WorkflowStatus status="waiting" />);
    const badge = screen.getByText('Waiting');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-blue-100');
  });

  it('renders with inactive status', () => {
    render(<WorkflowStatus status="inactive" />);
    const badge = screen.getByText('Inactive');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-gray-100');
  });

  it('accepts custom className', () => {
    render(<WorkflowStatus status="active" className="custom-class" />);
    const badge = screen.getByText('Active');
    expect(badge.className).toContain('custom-class');
  });

  it('displays with correct icon for each status', () => {
    const { rerender } = render(<WorkflowStatus status="active" />);
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();

    rerender(<WorkflowStatus status="paused" />);
    expect(screen.getByTestId('pause-icon')).toBeInTheDocument();

    rerender(<WorkflowStatus status="error" />);
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();

    rerender(<WorkflowStatus status="waiting" />);
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();

    rerender(<WorkflowStatus status="inactive" />);
    expect(screen.getByTestId('minus-icon')).toBeInTheDocument();
  });
});

describe('WorkflowStatusCard', () => {
  const defaultProps = {
    name: 'Test Workflow',
    status: 'active' as const,
    lastRun: '5 minutes ago',
    successRate: 95,
    executionCount: 150,
  };

  it('renders all workflow information', () => {
    render(<WorkflowStatusCard {...defaultProps} />);
    
    expect(screen.getByText('Test Workflow')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Last run: 5 minutes ago')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('displays correct success rate color for high rates', () => {
    render(<WorkflowStatusCard {...defaultProps} successRate={95} />);
    const successRateElement = screen.getByText('95%');
    expect(successRateElement.className).toContain('text-green-600');
  });

  it('displays correct success rate color for medium rates', () => {
    render(<WorkflowStatusCard {...defaultProps} successRate={85} />);
    const successRateElement = screen.getByText('85%');
    expect(successRateElement.className).toContain('text-yellow-600');
  });

  it('displays correct success rate color for low rates', () => {
    render(<WorkflowStatusCard {...defaultProps} successRate={75} />);
    const successRateElement = screen.getByText('75%');
    expect(successRateElement.className).toContain('text-red-600');
  });

  it('renders without optional description', () => {
    render(<WorkflowStatusCard {...defaultProps} />);
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });

  it('renders with description when provided', () => {
    render(<WorkflowStatusCard {...defaultProps} description="Test description" />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(<WorkflowStatusCard {...defaultProps} className="custom-class" />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('custom-class');
  });
});