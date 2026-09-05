'use client';

import React from 'react';
import { Waves } from './wave-background';

interface AuroraWaveBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showWaves?: boolean;
  showAurora?: boolean;
}

export const AuroraWaveBackground: React.FC<AuroraWaveBackgroundProps> = ({
  children,
  className = '',
  showWaves = true,
  showAurora = true,
}) => {
  return (
    <div className={`relative w-full min-h-screen bg-[#000000] text-white ${className}`}>
      {/* 1. ETHEREAL MONOCHROME AURORA EFFECT */}
      {showAurora && (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-60">
          {/* Aurora Gradient Blob 1 - Top Left Floating Light */}
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(180,180,180,0.05)_45%,transparent_70%)] blur-[120px] animate-[aurora-slow_22s_ease-in-out_infinite_alternate]" />

          {/* Aurora Gradient Blob 2 - Center Right Platinum Mesh */}
          <div className="absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(220,220,220,0.1)_0%,rgba(140,140,140,0.04)_50%,transparent_75%)] blur-[140px] animate-[aurora-reverse_28s_ease-in-out_infinite_alternate]" />

          {/* Aurora Gradient Blob 3 - Bottom Left Floating Glow */}
          <div className="absolute -bottom-40 left-1/3 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(100,100,100,0.03)_50%,transparent_80%)] blur-[150px] animate-[aurora-pulse_18s_ease-in-out_infinite_alternate]" />

          {/* Subtle Dynamic Scanlines / Noise Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[size:100%_4px] opacity-20" />
        </div>
      )}

      {/* 2. INTERACTIVE FULL-SITE WAVE BACKGROUND */}
      {showWaves && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-45">
          <Waves strokeColor="rgba(255, 255, 255, 0.35)" pointerSize={0.5} />
        </div>
      )}

      {/* 3. FOREGROUND PAGE CONTENT */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
