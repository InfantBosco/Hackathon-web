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
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none"
      />

      {/* Ambient Google 4-Color Glow Orbs */}
      {glow && (
        <>
          <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-[#4285F4] opacity-[0.14] blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-[#EA4335] opacity-[0.12] blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-[#FBBC05] opacity-[0.10] blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#34A853] opacity-[0.12] blur-[140px] pointer-events-none rounded-full" />
        </>
      )}

      {children}
    </div>
  );
};
