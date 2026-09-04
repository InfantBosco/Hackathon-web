import React from 'react';
import { cn } from '../../lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'gradient';
  containerClean?: boolean;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'primary',
  containerClean = false,
  className,
  id,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[var(--color-bg-primary)]',
    secondary: 'bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)]',
    glass: 'bg-[var(--color-surface-glass)] backdrop-blur-xl border-y border-[var(--color-border-subtle)]',
    gradient: 'bg-gradient-to-b from-[var(--color-bg-primary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-primary)]',
  };

  return (
    <section
      id={id}
      className={cn('py-16 md:py-24 relative overflow-hidden', variantStyles[variant], className)}
      {...props}
    >
      <Container clean={containerClean}>{children}</Container>
    </section>
  );
};
