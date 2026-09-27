import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-cyan-950/40 text-cyan-200 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]',
        cyan: 'bg-cyan-950/60 text-cyan-300 border border-cyan-400/40 shadow-[0_0_16px_rgba(0,240,255,0.35)]',
        purple: 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/40 shadow-[0_0_16px_rgba(129,140,248,0.3)]',
        success: 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 shadow-[0_0_16px_rgba(16,185,129,0.3)]',
        warning: 'bg-amber-950/60 text-amber-300 border border-amber-500/40 shadow-[0_0_16px_rgba(245,158,11,0.3)]',
        error: 'bg-rose-950/60 text-rose-300 border border-rose-500/40 shadow-[0_0_16px_rgba(244,63,94,0.3)]',
        destructive: 'bg-rose-950/60 text-rose-300 border border-rose-500/40',
        secondary: 'bg-sky-950/40 text-sky-200 border border-sky-500/30',
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
