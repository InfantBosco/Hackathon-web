import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { withNexusLogo } from '../branding/NexusText';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
}) => {
  const alignmentStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const renderedSubtitle = typeof subtitle === 'string' ? withNexusLogo(subtitle) : subtitle;

  return (
    <div className={cn('flex flex-col mb-12 md:mb-16 max-w-3xl mx-auto', alignmentStyles[align], className)}>
      {badge && (
        <Badge variant="cyan" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
          {renderedSubtitle}
        </p>
      )}
    </div>
  );
};
