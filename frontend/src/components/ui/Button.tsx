import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Spinner } from './Spinner';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-blue)] text-slate-950 font-bold shadow-[var(--shadow-glow-cyan)] hover:opacity-90 active:scale-95',
    secondary:
      'bg-[var(--color-surface-elevated)] text-white border border-[var(--color-border)] hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)] active:scale-95',
    ghost:
      'bg-transparent text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-surface)] active:scale-95',
    outline:
      'bg-transparent text-white border border-[var(--color-border)] hover:border-[var(--color-accent-purple)] hover:shadow-[var(--shadow-glow-purple)] active:scale-95',
    danger:
      'bg-red-600 text-white font-bold hover:bg-red-500 active:scale-95',
  };

  const sizeStyles = {
    sm: 'h-9 px-3 text-xs gap-1.5 rounded-[var(--radius-sm)]',
    md: 'h-11 px-5 text-sm gap-2 rounded-[var(--radius-md)]',
    lg: 'h-14 px-8 text-base gap-3 rounded-[var(--radius-lg)]',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-heading tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-cyan)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Spinner size={size === 'lg' ? 'md' : 'sm'} />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};
