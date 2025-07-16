import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

export function Logo({ className, size = 'md', variant = 'default' }: LogoProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const colors = {
    default: 'text-slate-900',
    white: 'text-white',
  };

  return (
    <Link href="/" className={cn('inline-flex items-center gap-2 font-bold no-underline', className)}>
      <span className={cn(sizes[size])}>🚀</span>
      <span className={cn(sizes[size], colors[variant])}>
        thevibelaunch<span className="font-normal">.ai</span>
      </span>
    </Link>
  );
}