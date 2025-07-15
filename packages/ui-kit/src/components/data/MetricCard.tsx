import React from 'react';
import { cn } from '@/utils/cn';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  MoreVertical
} from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  format?: 'number' | 'currency' | 'percentage';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  description?: string;
  href?: string;
  loading?: boolean;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onInfoClick?: () => void;
  menuItems?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

const variantStyles = {
  default: {
    container: 'bg-card',
    icon: 'bg-muted text-muted-foreground',
    trend: {
      up: 'text-green-600 dark:text-green-400',
      down: 'text-red-600 dark:text-red-400',
      neutral: 'text-gray-600 dark:text-gray-400',
    }
  },
  primary: {
    container: 'bg-primary/10 border-primary/20',
    icon: 'bg-primary/20 text-primary',
    trend: {
      up: 'text-primary',
      down: 'text-primary',
      neutral: 'text-primary',
    }
  },
  success: {
    container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    icon: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
    trend: {
      up: 'text-green-600 dark:text-green-400',
      down: 'text-green-600 dark:text-green-400',
      neutral: 'text-green-600 dark:text-green-400',
    }
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    icon: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400',
    trend: {
      up: 'text-yellow-600 dark:text-yellow-400',
      down: 'text-yellow-600 dark:text-yellow-400',
      neutral: 'text-yellow-600 dark:text-yellow-400',
    }
  },
  danger: {
    container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    icon: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
    trend: {
      up: 'text-red-600 dark:text-red-400',
      down: 'text-red-600 dark:text-red-400',
      neutral: 'text-red-600 dark:text-red-400',
    }
  },
};

const sizeStyles = {
  sm: {
    container: 'p-3',
    title: 'text-xs',
    value: 'text-xl',
    icon: 'h-8 w-8',
    iconSize: 'h-4 w-4',
  },
  md: {
    container: 'p-4',
    title: 'text-sm',
    value: 'text-2xl',
    icon: 'h-10 w-10',
    iconSize: 'h-5 w-5',
  },
  lg: {
    container: 'p-6',
    title: 'text-base',
    value: 'text-3xl',
    icon: 'h-12 w-12',
    iconSize: 'h-6 w-6',
  },
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  format = 'number',
  trend,
  trendValue,
  icon,
  description,
  href,
  loading = false,
  variant = 'default',
  size = 'md',
  className,
  onInfoClick,
  menuItems,
}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];

  const formatValue = (val: string | number): string => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val}%`;
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const content = (
    <div className={cn(
      'relative rounded-lg border transition-all',
      styles.container,
      sizes.container,
      href && 'hover:shadow-md cursor-pointer',
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={cn(
              'rounded-lg flex items-center justify-center',
              styles.icon,
              sizes.icon
            )}>
              {React.isValidElement(icon) 
                ? React.cloneElement(icon as React.ReactElement<any>, { 
                    className: cn('flex-shrink-0', sizes.iconSize) 
                  })
                : icon
              }
            </div>
          )}
          <div>
            <h3 className={cn('font-medium text-muted-foreground', sizes.title)}>
              {title}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {onInfoClick && (
            <button
              onClick={onInfoClick}
              className="p-1 rounded hover:bg-accent"
            >
              <Info className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          
          {menuItems && menuItems.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded hover:bg-accent"
              >
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-popover border rounded-md shadow-lg z-10">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.onClick();
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-accent"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Value */}
      <div className="space-y-1">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-24"></div>
          </div>
        ) : (
          <>
            <div className={cn('font-bold', sizes.value)}>
              {formatValue(value)}
            </div>
            
            {/* Trend */}
            {trend && (
              <div className={cn(
                'flex items-center gap-1 text-sm',
                styles.trend[trend]
              )}>
                {getTrendIcon()}
                {trendValue && <span>{trendValue}</span>}
                {previousValue && (
                  <span className="text-muted-foreground">
                    from {formatValue(previousValue)}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Link indicator */}
      {href && (
        <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground" />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {content}
      </a>
    );
  }

  return content;
};

// Metric Card Group for displaying multiple metrics
export interface MetricCardGroupProps {
  metrics: MetricCardProps[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const MetricCardGroup: React.FC<MetricCardGroupProps> = ({
  metrics,
  columns = 4,
  className,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricCard;