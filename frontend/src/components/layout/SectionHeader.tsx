import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { withNexusLogo } from '../branding/NexusText';
import { FadeIn } from '../ui/FadeIn';
import { SplitTextReveal } from '../ui/SplitTextReveal';

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
        <FadeIn delay={0.0} direction="up" distance={16}>
          <Badge variant="cyan" className="mb-4">
            {badge}
          </Badge>
        </FadeIn>
      )}
      <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-sm mb-4">
        <SplitTextReveal text={title} mode="words" />
      </h2>
      {subtitle && (
        <div className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed font-medium">
          {typeof renderedSubtitle === 'string' ? (
            <SplitTextReveal text={renderedSubtitle} mode="words" delay={0.15} />
          ) : (
            <SplitTextReveal mode="container" delay={0.15}>{renderedSubtitle}</SplitTextReveal>
          )}
        </div>
      )}
    </div>
  );
};
