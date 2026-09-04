import React from 'react';
import { cn } from '../../lib/utils';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className,
}) => {
  return (
    <label className={cn('inline-flex items-center gap-3 cursor-pointer select-none', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative',
          checked ? 'bg-[var(--color-accent-cyan)]' : 'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </div>
      {label && <span className="text-sm font-medium text-[var(--color-text-primary)]">{label}</span>}
    </label>
  );
};
