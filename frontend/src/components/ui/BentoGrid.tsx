import React from 'react';
import { cn } from '../../lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]',
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  className,
}) => {
  const colSpanClasses = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
  };

  return (
    <div
      className={cn(
        'glass-panel rounded-[var(--radius-xl)] p-6 flex flex-col justify-between border border-[var(--color-border)] hover:border-[var(--color-accent-cyan)] transition-all duration-300 group hover:shadow-[var(--shadow-glow-cyan)]',
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
    >
      {children}
    </div>
  );
};
