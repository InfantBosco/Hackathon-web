import React from 'react';
import { cn } from '@/lib/utils';

interface ArcticMapPatternProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Component: React.FC<ArcticMapPatternProps> = ({
  className,
  children,
  title = "Hand-Drawn Arctic Map",
  description = "This background uses a cool, frosty color palette and a snowfall effect to create the feeling of a frozen, arctic landscape."
}) => {
  return (
    <div className={cn("pattern-wrapper relative overflow-hidden rounded-xl border border-[rgba(0,240,255,0.3)] bg-[#080d1a]/95 p-6 shadow-2xl min-h-[260px] flex flex-col justify-center", className)}>
      <div className="ocean-backdrop absolute inset-0 bg-gradient-to-b from-[#0b1b36] via-[#071124] to-[#040914] opacity-90 pointer-events-none">
        <div className="island-backdrop absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.18),transparent_70%)] pointer-events-none"></div>
      </div>
      <div className="snow absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_50%,#ffffff_1.2px,transparent_1.2px)] bg-[size:36px_36px] animate-[fall_15s_linear_infinite]"></div>
      
      {/* SVG filter definition */}
      <svg height="0" width="0" style={{ position: 'absolute' }}>
        <filter id="handDrawnNoise">
          <feTurbulence result="noise" numOctaves="5" baseFrequency="0.0065" type="fractalNoise">
            <animate attributeName="baseFrequency" dur="60s" values="0.0065;0.008;0.0065" repeatCount="indefinite"></animate>
          </feTurbulence>
          <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale="900" in2="noise" in="SourceGraphic"></feDisplacementMap>
        </filter>
      </svg>
      
      {/* Content */}
      <div className="content relative z-10 w-full">
        {children ? (
          children
        ) : (
          <div>
            <h1 className="text-2xl font-heading font-bold text-white mb-2">{title}</h1>
            <div className="card text-xs font-mono text-[var(--color-text-secondary)] bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-lg p-4 backdrop-blur-sm">
              {description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ArcticMapPattern = Component;
export default Component;
