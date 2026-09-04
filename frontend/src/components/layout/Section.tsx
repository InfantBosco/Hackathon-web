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
    primary: 'bg-transparent',
    secondary: 'bg-[rgba(18,5,9,0.35)] border-y border-[var(--color-border-subtle)]',
    glass: 'bg-[var(--color-surface-glass)] backdrop-blur-xl border-y border-[var(--color-border-subtle)]',
    gradient: 'bg-gradient-to-b from-transparent via-[rgba(18,5,9,0.4)] to-transparent',
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
