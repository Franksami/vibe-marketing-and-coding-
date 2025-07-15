import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { ChevronLeft, Menu } from 'lucide-react';

export interface SidebarItem {
  id: string;
  title: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: SidebarItem[];
  disabled?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onNavigate?: (href: string) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  logo,
  footer,
  collapsible = true,
  defaultCollapsed = false,
  onNavigate,
  className,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavigate = (href?: string) => {
    if (href && onNavigate) {
      onNavigate(href);
    }
  };

  const renderItem = (item: SidebarItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              handleNavigate(item.href);
            }
          }}
          disabled={item.disabled}
          className={cn(
            'group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            item.disabled && 'cursor-not-allowed opacity-60',
            depth > 0 && 'ml-4'
          )}
        >
          {item.icon && (
            <span className={cn('h-4 w-4', collapsed ? '' : 'mr-3')}>
              {item.icon}
            </span>
          )}
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <ChevronLeft
                  className={cn(
                    'ml-2 h-4 w-4 transition-transform',
                    isExpanded && '-rotate-90'
                  )}
                />
              )}
            </>
          )}
        </button>
        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-1">
            {item.children!.map(child => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {logo && !collapsed && <div className="font-semibold">{logo}</div>}
        {collapsible && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-md p-1.5 hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {items.map(item => renderItem(item))}
      </nav>

      {/* Footer */}
      {footer && !collapsed && (
        <div className="border-t p-4">{footer}</div>
      )}
    </aside>
  );
};

export interface MobileSidebarProps extends SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  ...sidebarProps
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
        <Sidebar {...sidebarProps} collapsible={false} />
      </div>
    </>
  );
};