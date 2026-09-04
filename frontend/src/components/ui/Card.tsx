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
      'glass-panel rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]',
    hoverGlow:
      'glass-panel border border-[var(--color-border)] hover:border-[var(--color-accent-cyan)] transition-all duration-300 hover:shadow-[var(--shadow-glow-cyan)] rounded-[var(--radius-lg)] p-6',
    interactive:
      'glass-panel border border-[var(--color-border)] hover:border-[var(--color-accent-gold)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] cursor-pointer rounded-[var(--radius-lg)] p-6',
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
