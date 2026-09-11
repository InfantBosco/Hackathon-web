import React from 'react';

export interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  index?: number;
  totalSections?: number;
  scrubSpeed?: number;
}

/**
 * Section Container
 * Renders standard natural flow section layout without any sticky card stacking.
 */
export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  id,
}) => {
  return (
    <div id={id} className={`relative w-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
};






