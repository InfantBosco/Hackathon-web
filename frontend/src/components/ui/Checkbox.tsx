import React from 'react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="inline-flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-5 h-5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent-cyan)] focus:ring-[var(--color-accent-cyan)] focus:ring-offset-[var(--color-bg-primary)] transition-all cursor-pointer accent-[var(--color-accent-cyan)]',
              className
            )}
            {...props}
          />
          {label && <span className="text-sm text-[var(--color-text-primary)]">{label}</span>}
        </label>
        {error && <p className="text-xs font-mono text-red-400 ml-8">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
