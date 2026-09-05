import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white border border-white/25 shadow-[0_0_15px_rgba(255,255,255,0.15)]',
        cyan: 'bg-white/15 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]',
        purple: 'bg-zinc-800/80 text-zinc-200 border border-zinc-700 shadow-[0_0_15px_rgba(255,255,255,0.1)]',
        success: 'bg-emerald-950/50 text-emerald-400 border border-emerald-800',
        warning: 'bg-amber-950/50 text-amber-400 border border-amber-800',
        error: 'bg-zinc-900 text-zinc-300 border border-zinc-700',
        destructive: 'bg-zinc-900 text-zinc-300 border border-zinc-700',
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
