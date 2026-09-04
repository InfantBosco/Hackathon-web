import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, error, leftIcon, rightIcon, className, disabled, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] font-medium">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text.muted pointer-events-none text-[var(--color-text-muted)]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full h-11 px-4 bg-[var(--color-surface)] text-white placeholder-[var(--color-text-muted)] text-sm border border-[var(--color-border)] rounded-[var(--radius-md)] transition-all focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-muted pointer-events-none text-[var(--color-text-muted)]">
              {rightIcon}
            </span>
          )}
        </div>
        {description && !error && (
          <p className="text-xs text-[var(--color-text-muted)]">{description}</p>
        )}
        {error && <p className="text-xs font-mono text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
