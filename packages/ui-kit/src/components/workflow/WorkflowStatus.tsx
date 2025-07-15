import React from 'react';
import { cn } from '@/utils/cn';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  PlayCircle, 
  PauseCircle,
  Loader2,
  Activity
} from 'lucide-react';

export type WorkflowStatusType = 
  | 'idle' 
  | 'running' 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'paused' 
  | 'scheduled'
  | 'loading';

export interface WorkflowStatusProps {
  status: WorkflowStatusType;
  message?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

const statusConfig: Record<WorkflowStatusType, {
  icon: React.ComponentType<any>;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  idle: {
    icon: Clock,
    label: 'Idle',
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    borderColor: 'border-gray-300 dark:border-gray-700',
  },
  running: {
    icon: Activity,
    label: 'Running',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    borderColor: 'border-blue-300 dark:border-blue-700',
  },
  success: {
    icon: CheckCircle2,
    label: 'Success',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900',
    borderColor: 'border-green-300 dark:border-green-700',
  },
  error: {
    icon: XCircle,
    label: 'Error',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900',
    borderColor: 'border-red-300 dark:border-red-700',
  },
  warning: {
    icon: AlertCircle,
    label: 'Warning',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    borderColor: 'border-yellow-300 dark:border-yellow-700',
  },
  paused: {
    icon: PauseCircle,
    label: 'Paused',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900',
    borderColor: 'border-orange-300 dark:border-orange-700',
  },
  scheduled: {
    icon: Clock,
    label: 'Scheduled',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    borderColor: 'border-purple-300 dark:border-purple-700',
  },
  loading: {
    icon: Loader2,
    label: 'Loading',
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    borderColor: 'border-gray-300 dark:border-gray-700',
  },
};

const sizeConfig = {
  sm: {
    container: 'px-2 py-1 text-xs',
    icon: 'h-3 w-3',
    gap: 'gap-1',
  },
  md: {
    container: 'px-3 py-1.5 text-sm',
    icon: 'h-4 w-4',
    gap: 'gap-1.5',
  },
  lg: {
    container: 'px-4 py-2 text-base',
    icon: 'h-5 w-5',
    gap: 'gap-2',
  },
};

export const WorkflowStatus: React.FC<WorkflowStatusProps> = ({
  status,
  message,
  showIcon = true,
  showLabel = true,
  size = 'md',
  className,
  animate = true,
}) => {
  const config = statusConfig[status];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  const shouldAnimate = animate && (status === 'running' || status === 'loading');

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border font-medium transition-all',
        sizes.container,
        sizes.gap,
        config.color,
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      {showIcon && (
        <Icon 
          className={cn(
            sizes.icon,
            shouldAnimate && status === 'running' && 'animate-pulse',
            shouldAnimate && status === 'loading' && 'animate-spin'
          )} 
        />
      )}
      {showLabel && (
        <span>{message || config.label}</span>
      )}
    </div>
  );
};

// Compound component for more complex status displays
export interface WorkflowStatusCardProps extends WorkflowStatusProps {
  title: string;
  description?: string;
  timestamp?: Date;
  onRetry?: () => void;
  onCancel?: () => void;
}

export const WorkflowStatusCard: React.FC<WorkflowStatusCardProps> = ({
  title,
  description,
  timestamp,
  onRetry,
  onCancel,
  ...statusProps
}) => {
  const config = statusConfig[statusProps.status];

  return (
    <div className={cn(
      'rounded-lg border p-4',
      config.borderColor,
      'bg-card'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <WorkflowStatus {...statusProps} size="sm" />
            <h3 className="font-semibold text-sm">{title}</h3>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
          )}
          {timestamp && (
            <p className="text-xs text-muted-foreground">
              {timestamp.toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {statusProps.status === 'error' && onRetry && (
            <button
              onClick={onRetry}
              className="text-xs px-2 py-1 rounded border border-current hover:bg-accent"
            >
              Retry
            </button>
          )}
          {(statusProps.status === 'running' || statusProps.status === 'scheduled') && onCancel && (
            <button
              onClick={onCancel}
              className="text-xs px-2 py-1 rounded border border-current hover:bg-accent"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowStatus;