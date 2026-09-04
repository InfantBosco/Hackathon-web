import React from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, disabled, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] font-medium">
            {label}
          </label>
        )}
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full h-11 px-4 bg-[var(--color-surface)] text-white text-sm border border-[var(--color-border)] rounded-[var(--radius-md)] transition-all focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] disabled:opacity-50 cursor-pointer',
            error && 'border-red-500',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[var(--color-surface)] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs font-mono text-red-400">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
