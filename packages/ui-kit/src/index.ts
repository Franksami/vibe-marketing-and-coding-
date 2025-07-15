// Utility functions
export { cn } from './utils/cn';

// Workflow components
export { 
  WorkflowStatus, 
  WorkflowStatusCard,
  type WorkflowStatusProps,
  type WorkflowStatusCardProps,
  type WorkflowStatusType 
} from './components/workflow/WorkflowStatus';

export { 
  WorkflowTrigger,
  WebhookTrigger,
  BatchTrigger,
  type WorkflowTriggerProps,
  type WebhookTriggerProps,
  type BatchTriggerProps
} from './components/workflow/WorkflowTrigger';

export { 
  WorkflowHistory,
  type WorkflowHistoryProps,
  type WorkflowExecution
} from './components/workflow/WorkflowHistory';

// Data components
export { 
  MetricCard,
  MetricCardGroup,
  type MetricCardProps,
  type MetricCardGroupProps
} from './components/data/MetricCard';

// Layout components
export {
  DashboardShell,
  DashboardHeader,
  DashboardNav,
  DashboardMain,
  type DashboardShellProps,
  type DashboardHeaderProps,
  type DashboardNavProps,
  type DashboardMainProps
} from './components/layout/DashboardShell';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps
} from './components/layout/Card';

export {
  Grid,
  Flex,
  Container,
  type GridProps,
  type FlexProps,
  type ContainerProps
} from './components/layout/Grid';

export {
  Sidebar,
  MobileSidebar,
  type SidebarProps,
  type MobileSidebarProps,
  type SidebarItem
} from './components/layout/Sidebar';

// Re-export styles for consumers who want to import them
export const styles = {
  globals: () => import('./styles/globals.css'),
};