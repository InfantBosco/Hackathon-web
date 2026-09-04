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
      'bg-gradient-to-r from-[#FF1E42] via-[#E11D48] to-[#9F1239] text-white font-bold shadow-[0_0_25px_rgba(255,30,66,0.45)] hover:brightness-110 active:scale-95 uppercase tracking-wider',
    secondary:
      'glass-panel text-white border border-[rgba(255,30,66,0.3)] hover:border-[#FF1E42] hover:shadow-[0_0_20px_rgba(255,30,66,0.3)] active:scale-95 uppercase tracking-wider',
    ghost:
      'bg-transparent text-[var(--color-text-secondary)] hover:text-white hover:bg-[rgba(255,30,66,0.1)] active:scale-95 uppercase tracking-wider',
    outline:
      'bg-transparent text-white border border-[var(--color-border)] hover:border-[var(--color-accent-cyan)] hover:shadow-[var(--shadow-glow-cyan)] active:scale-95 uppercase tracking-wider',
    danger:
      'bg-red-700 text-white font-bold hover:bg-red-600 active:scale-95 uppercase tracking-wider',
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
