import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { 
  Play, 
  Square, 
  RefreshCw, 
  Zap, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

export interface WorkflowTriggerProps {
  workflowId: string;
  workflowName?: string;
  webhookUrl?: string;
  onTrigger: (workflowId: string, data?: any) => Promise<void>;
  onStop?: (workflowId: string) => Promise<void>;
  isRunning?: boolean;
  lastRunStatus?: 'success' | 'error' | 'warning';
  lastRunTime?: Date;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  disabled?: boolean;
  className?: string;
  data?: Record<string, any>;
}

const variantStyles = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
};

const sizeStyles = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const WorkflowTrigger: React.FC<WorkflowTriggerProps> = ({
  workflowId,
  workflowName,
  webhookUrl,
  onTrigger,
  onStop,
  isRunning = false,
  lastRunStatus,
  lastRunTime,
  variant = 'default',
  size = 'md',
  showStatus = true,
  disabled = false,
  className,
  data,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrigger = async () => {
    if (isRunning && onStop) {
      setIsLoading(true);
      try {
        await onStop(workflowId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to stop workflow');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      setError(null);
      try {
        await onTrigger(workflowId, data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to trigger workflow');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (isRunning) return <Square className="h-4 w-4" />;
    if (lastRunStatus === 'success') return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (lastRunStatus === 'error') return <AlertCircle className="h-4 w-4 text-red-500" />;
    if (lastRunStatus === 'warning') return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    return <Play className="h-4 w-4" />;
  };

  const getButtonText = () => {
    if (isLoading) return 'Processing...';
    if (isRunning) return 'Stop Workflow';
    return workflowName || 'Trigger Workflow';
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleTrigger}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
      >
        <span className="mr-2">{getStatusIcon()}</span>
        {getButtonText()}
      </button>

      {showStatus && (lastRunTime || error) && (
        <div className="text-xs text-muted-foreground">
          {error ? (
            <span className="text-red-500">Error: {error}</span>
          ) : lastRunTime ? (
            <span>Last run: {lastRunTime.toLocaleString()}</span>
          ) : null}
        </div>
      )}
    </div>
  );
};

// Advanced trigger with webhook display
export interface WebhookTriggerProps extends Omit<WorkflowTriggerProps, 'onTrigger'> {
  webhookEndpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  showEndpoint?: boolean;
  copyToClipboard?: boolean;
}

export const WebhookTrigger: React.FC<WebhookTriggerProps> = ({
  webhookEndpoint,
  method = 'POST',
  headers,
  showEndpoint = true,
  copyToClipboard = true,
  data,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const triggerWebhook = async (workflowId: string, payload?: any) => {
    const response = await fetch(webhookEndpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: method !== 'GET' ? JSON.stringify(payload || data || {}) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.statusText}`);
    }

    return response.json();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookEndpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <WorkflowTrigger {...props} onTrigger={triggerWebhook} />
      
      {showEndpoint && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <Zap className="h-4 w-4 text-muted-foreground" />
          <code className="text-xs flex-1 truncate">{webhookEndpoint}</code>
          {copyToClipboard && (
            <button
              onClick={handleCopy}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Batch trigger for multiple workflows
export interface BatchTriggerProps {
  workflows: Array<{
    id: string;
    name: string;
    endpoint?: string;
  }>;
  onTrigger: (workflowIds: string[]) => Promise<void>;
  variant?: WorkflowTriggerProps['variant'];
  size?: WorkflowTriggerProps['size'];
  className?: string;
}

export const BatchTrigger: React.FC<BatchTriggerProps> = ({
  workflows,
  onTrigger,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const [selectedWorkflows, setSelectedWorkflows] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const toggleWorkflow = (id: string) => {
    const newSelected = new Set(selectedWorkflows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedWorkflows(newSelected);
  };

  const handleTriggerBatch = async () => {
    if (selectedWorkflows.size === 0) return;
    
    setIsLoading(true);
    try {
      await onTrigger(Array.from(selectedWorkflows));
      setSelectedWorkflows(new Set());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {workflows.map((workflow) => (
          <label
            key={workflow.id}
            className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedWorkflows.has(workflow.id)}
              onChange={() => toggleWorkflow(workflow.id)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">{workflow.name}</span>
          </label>
        ))}
      </div>
      
      <button
        onClick={handleTriggerBatch}
        disabled={selectedWorkflows.size === 0 || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors w-full',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="mr-2 h-4 w-4" />
        )}
        Trigger {selectedWorkflows.size} Workflow{selectedWorkflows.size !== 1 ? 's' : ''}
      </button>
    </div>
  );
};

export default WorkflowTrigger;