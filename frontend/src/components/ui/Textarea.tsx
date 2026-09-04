import React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, description, error, className, disabled, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] font-medium">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full p-4 bg-[var(--color-surface)] text-white placeholder-[var(--color-text-muted)] text-sm border border-[var(--color-border)] rounded-[var(--radius-md)] transition-all focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[100px] resize-y',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {description && !error && (
          <p className="text-xs text-[var(--color-text-muted)]">{description}</p>
        )}
        {error && <p className="text-xs font-mono text-red-400">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
