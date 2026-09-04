import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  glowColor?: 'cyan' | 'purple' | 'none';
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  glowColor = 'none',
  className,
  ...props
}) => {
  const glowStyles = {
    none: '',
    cyan: 'hover:shadow-[var(--shadow-glow-cyan)] hover:border-[var(--color-accent-cyan)]',
    purple: 'hover:shadow-[var(--shadow-glow-purple)] hover:border-[var(--color-accent-purple)]',
  };

  return (
    <motion.div
      className={cn(
        'glass-panel rounded-[var(--radius-lg)] p-6 transition-all duration-300',
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
