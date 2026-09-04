import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'purple' | 'success' | 'warning' | 'error' | 'outline';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'cyan',
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    cyan: 'bg-[rgba(255,30,66,0.12)] text-[var(--color-accent-cyan)] border border-[rgba(255,30,66,0.35)] shadow-[0_0_15px_rgba(255,30,66,0.2)]',
    purple: 'bg-[rgba(225,29,72,0.12)] text-[var(--color-accent-purple)] border border-[rgba(225,29,72,0.35)] shadow-[0_0_15px_rgba(225,29,72,0.2)]',
    success: 'bg-emerald-950/50 text-emerald-400 border border-emerald-800',
    warning: 'bg-amber-950/50 text-amber-400 border border-amber-800',
    error: 'bg-red-950/50 text-red-400 border border-red-800',
    outline: 'bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
