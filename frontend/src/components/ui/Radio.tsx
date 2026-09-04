import React from 'react';
import { cn } from '../../lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  selectedValue,
  onChange,
  error,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] font-medium">
          {label}
        </label>
      )}
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              'flex items-start gap-3 p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] cursor-pointer transition-all hover:border-[var(--color-accent-cyan)]',
              selectedValue === opt.value && 'border-[var(--color-accent-cyan)] bg-[rgba(0,240,255,0.05)]'
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selectedValue === opt.value}
              onChange={() => onChange?.(opt.value)}
              className="mt-0.5 w-4 h-4 text-[var(--color-accent-cyan)] accent-[var(--color-accent-cyan)] cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{opt.label}</span>
              {opt.description && (
                <span className="text-xs text-[var(--color-text-muted)]">{opt.description}</span>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-xs font-mono text-red-400">{error}</p>}
    </div>
  );
};
