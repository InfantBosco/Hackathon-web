import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'hoverGlow' | 'interactive';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6',
    hoverGlow:
      'bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent-cyan)] transition-all duration-300 hover:shadow-[var(--shadow-glow-cyan)] rounded-[var(--radius-lg)] p-6',
    interactive:
      'bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent-purple)] transition-all duration-300 hover:shadow-[var(--shadow-glow-purple)] cursor-pointer rounded-[var(--radius-lg)] p-6',
  };

  return (
    <motion.div
      whileHover={variant === 'interactive' ? { y: -4 } : undefined}
      className={cn(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
