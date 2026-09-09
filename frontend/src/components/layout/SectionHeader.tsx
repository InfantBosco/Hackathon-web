import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { withNexusLogo } from '../branding/NexusText';
import { KineticSpringFloat } from '../ui/KineticSpringFloat';

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
    center: 'text-center items-center justify-center',
    right: 'text-right items-end',
  };

  const renderedSubtitle = typeof subtitle === 'string' ? withNexusLogo(subtitle) : subtitle;

  return (
    <div className={cn('flex flex-col mb-12 md:mb-16 max-w-3xl mx-auto', alignmentStyles[align], className)}>
      {badge && (
        <KineticSpringFloat delay={0.05} mode="words">
          <Badge variant="cyan" className="mb-4">
            {badge}
          </Badge>
        </KineticSpringFloat>
      )}
      <KineticSpringFloat
        as="h2"
        mode="words"
        delay={0.1}
        staggerDelay={0.04}
        className="text-3xl md:text-5xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-sm mb-4"
      >
        {title}
      </KineticSpringFloat>
      {subtitle && (
        typeof subtitle === 'string' ? (
          <KineticSpringFloat
            as="p"
            mode="words"
            delay={0.2}
            staggerDelay={0.02}
            className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed font-medium"
          >
            {subtitle}
          </KineticSpringFloat>
        ) : (
          <KineticSpringFloat delay={0.2}>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed font-medium">
              {renderedSubtitle}
            </p>
          </KineticSpringFloat>
        )
      )}
    </div>
  );
};
