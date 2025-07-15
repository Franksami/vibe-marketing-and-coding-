import React from 'react';
import { cn } from '@/utils/cn';
import { WorkflowStatus, WorkflowStatusType } from './WorkflowStatus';
import { 
  Clock, 
  Calendar, 
  ArrowRight, 
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  status: WorkflowStatusType;
  startedAt: Date;
  finishedAt?: Date;
  duration?: number; // in milliseconds
  trigger: string; // manual, webhook, schedule
  triggeredBy?: string;
  error?: string;
  data?: Record<string, any>;
  logs?: Array<{
    timestamp: Date;
    level: 'info' | 'warning' | 'error';
    message: string;
  }>;
}

export interface WorkflowHistoryProps {
  executions: WorkflowExecution[];
  onExecutionClick?: (execution: WorkflowExecution) => void;
  onRetry?: (execution: WorkflowExecution) => void;
  showFilters?: boolean;
  showExport?: boolean;
  className?: string;
}

export const WorkflowHistory: React.FC<WorkflowHistoryProps> = ({
  executions,
  onExecutionClick,
  onRetry,
  showFilters = true,
  showExport = true,
  className,
}) => {
  const [filter, setFilter] = React.useState<WorkflowStatusType | 'all'>('all');
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());

  const filteredExecutions = filter === 'all' 
    ? executions 
    : executions.filter(e => e.status === filter);

  const formatDuration = (ms?: number) => {
    if (!ms) return '-';
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  };

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const exportData = () => {
    const csv = [
      ['ID', 'Workflow', 'Status', 'Started', 'Duration', 'Trigger', 'Error'],
      ...filteredExecutions.map(e => [
        e.id,
        e.workflowName,
        e.status,
        e.startedAt.toISOString(),
        formatDuration(e.duration),
        e.trigger,
        e.error || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-history-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header with filters */}
      {(showFilters || showExport) && (
        <div className="flex items-center justify-between">
          {showFilters && (
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Executions</option>
                <option value="success">Success</option>
                <option value="error">Failed</option>
                <option value="running">Running</option>
                <option value="warning">Warning</option>
              </select>
            </div>
          )}
          
          {showExport && (
            <button
              onClick={exportData}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          )}
        </div>
      )}

      {/* Execution list */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left text-sm font-medium p-3">Workflow</th>
              <th className="text-left text-sm font-medium p-3">Status</th>
              <th className="text-left text-sm font-medium p-3">Started</th>
              <th className="text-left text-sm font-medium p-3">Duration</th>
              <th className="text-left text-sm font-medium p-3">Trigger</th>
              <th className="text-sm font-medium p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredExecutions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-muted-foreground">
                  No executions found
                </td>
              </tr>
            ) : (
              filteredExecutions.map((execution) => (
                <React.Fragment key={execution.id}>
                  <tr 
                    className={cn(
                      'border-t hover:bg-muted/50 cursor-pointer',
                      expandedRows.has(execution.id) && 'bg-muted/30'
                    )}
                    onClick={() => onExecutionClick?.(execution)}
                  >
                    <td className="p-3">
                      <div className="font-medium text-sm">{execution.workflowName}</div>
                      <div className="text-xs text-muted-foreground">#{execution.id.slice(0, 8)}</div>
                    </td>
                    <td className="p-3">
                      <WorkflowStatus status={execution.status} size="sm" />
                    </td>
                    <td className="p-3 text-sm">
                      {execution.startedAt.toLocaleString()}
                    </td>
                    <td className="p-3 text-sm">
                      {formatDuration(execution.duration)}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-sm">
                        {execution.trigger === 'webhook' && <ArrowRight className="h-3 w-3" />}
                        {execution.trigger === 'schedule' && <Clock className="h-3 w-3" />}
                        {execution.trigger === 'manual' && <Calendar className="h-3 w-3" />}
                        {execution.trigger}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {execution.status === 'error' && onRetry && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onRetry(execution);
                            }}
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(execution.id);
                          }}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {expandedRows.has(execution.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded row with details */}
                  {expandedRows.has(execution.id) && (
                    <tr>
                      <td colSpan={6} className="bg-muted/20 p-4 border-t">
                        <div className="space-y-3">
                          {execution.error && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                                Error Message
                              </p>
                              <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                                {execution.error}
                              </p>
                            </div>
                          )}
                          
                          {execution.logs && execution.logs.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Execution Logs</p>
                              <div className="space-y-1 font-mono text-xs">
                                {execution.logs.map((log, index) => (
                                  <div 
                                    key={index}
                                    className={cn(
                                      'flex gap-2',
                                      log.level === 'error' && 'text-red-600',
                                      log.level === 'warning' && 'text-yellow-600'
                                    )}
                                  >
                                    <span className="text-muted-foreground">
                                      {log.timestamp.toLocaleTimeString()}
                                    </span>
                                    <span className="uppercase">[{log.level}]</span>
                                    <span>{log.message}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {execution.triggeredBy && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Triggered by:</span>{' '}
                              {execution.triggeredBy}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkflowHistory;