import React from 'react';
import { cn } from '../../utils/cn';

export interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn("flex min-h-screen flex-col space-y-6", className)}>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        {children}
      </div>
    </div>
  );
};

export interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  heading, 
  text, 
  children 
}) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h1>
        {text && (
          <p className="text-lg text-muted-foreground">{text}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export interface DashboardNavProps {
  items: {
    title: string;
    href?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
  }[];
  onNavigate?: (href: string) => void;
}

export const DashboardNav: React.FC<DashboardNavProps> = ({ 
  items,
  onNavigate 
}) => {
  const handleClick = (href?: string) => {
    if (href && onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item.href)}
          disabled={item.disabled}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            item.disabled && "cursor-not-allowed opacity-60"
          )}
        >
          {item.icon && (
            <span className="mr-2 h-4 w-4">{item.icon}</span>
          )}
          <span>{item.title}</span>
        </button>
      ))}
    </nav>
  );
};

export interface DashboardMainProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardMain: React.FC<DashboardMainProps> = ({ 
  children, 
  className 
}) => {
  return (
    <main className={cn("flex w-full flex-1 flex-col overflow-hidden", className)}>
      {children}
    </main>
  );
};