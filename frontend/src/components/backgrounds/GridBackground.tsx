import React from 'react';
import { cn } from '../../lib/utils';

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  glow?: boolean;
  id?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  children,
  className,
  glow = true,
  id,
}) => {
  return (
    <div id={id} className={cn('relative w-full overflow-hidden bg-transparent', className)}>
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,30,66,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,30,66,0.12)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none"
      />

      {/* Ambient Glow Orbs */}
      {glow && (
        <>
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--color-accent-cyan)] opacity-10 blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[var(--color-accent-purple)] opacity-10 blur-[140px] pointer-events-none rounded-full" />
        </>
      )}

      {children}
    </div>
  );
};
