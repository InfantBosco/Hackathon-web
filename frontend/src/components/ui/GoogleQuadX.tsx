import React from 'react';

export interface GoogleQuadXProps {
  className?: string;
}

/**
 * GoogleQuadX
 * Renders the iconic Google 4-color stylized "X" logo (Yellow, Green, Red, Blue)
 * matching the HackNEX typography brand.
 */
export const GoogleQuadX: React.FC<GoogleQuadXProps> = ({
  className = 'h-[0.82em] w-auto inline-block align-baseline ml-[0.02em]',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ display: 'inline-block', verticalAlign: '-0.04em' }}
      aria-label="Google Quad Color X"
    >
      {/* Top-Left: Google Yellow */}
      <polygon points="0,0 26,0 50,50 24,50" fill="#FBBC05" />
      {/* Top-Right: Google Green */}
      <polygon points="100,0 74,0 50,50 76,50" fill="#34A853" />
      {/* Bottom-Left: Google Red */}
      <polygon points="0,100 24,100 50,50 24,50" fill="#EA4335" />
      {/* Bottom-Right: Google Blue */}
      <polygon points="100,100 76,100 50,50 76,50" fill="#4285F4" />
    </svg>
  );
};
