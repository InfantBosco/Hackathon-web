import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[rgba(255,30,66,0.12)] text-[var(--color-accent-cyan)] border border-[rgba(255,30,66,0.35)] shadow-[0_0_15px_rgba(255,30,66,0.2)]',
        cyan: 'bg-[rgba(0,240,255,0.12)] text-[var(--color-accent-cyan)] border border-[rgba(0,240,255,0.35)] shadow-[0_0_15px_rgba(0,240,255,0.2)]',
        purple: 'bg-[rgba(225,29,72,0.12)] text-[var(--color-accent-purple)] border border-[rgba(225,29,72,0.35)] shadow-[0_0_15px_rgba(225,29,72,0.2)]',
        success: 'bg-emerald-950/50 text-emerald-400 border border-emerald-800',
        warning: 'bg-amber-950/50 text-amber-400 border border-amber-800',
        error: 'bg-red-950/50 text-red-400 border border-red-800',
        destructive: 'bg-red-950/80 text-red-400 border border-red-800',
        secondary: 'bg-white/10 text-white/80 border border-white/20',
        outline: 'bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border)]',
      },
    },
    defaultVariants: {
      variant: 'cyan',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}

export { badgeVariants };
export default Badge;
