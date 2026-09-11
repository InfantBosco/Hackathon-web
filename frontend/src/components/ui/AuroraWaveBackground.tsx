'use client';

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Waves } from './wave-background';

interface AuroraWaveBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showWaves?: boolean;
  showAurora?: boolean;
  enableSmoothScroll?: boolean;
}

export const AuroraWaveBackground: React.FC<AuroraWaveBackgroundProps> = ({
  children,
  className = '',
  showWaves = true,
  showAurora = true,
  enableSmoothScroll = true,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize Lenis Silky Smooth Scroll & Scroll Parallax Effect
  useEffect(() => {
    if (!enableSmoothScroll) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential inertia
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    const handleScroll = (e: any) => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, e.scroll / scrollHeight)));
      }
    };

    lenis.on('scroll', handleScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enableSmoothScroll]);

  return (
    <div className={`relative w-full min-h-screen bg-[#000000] text-white ${className}`}>
      {/* 1. VIBRANT GOOGLE 4-COLOR AURORA BACKGROUND WITH SCROLL PARALLAX */}
      {showAurora && (
        <div
          className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-100 transition-transform duration-500 ease-out will-change-transform transform-gpu"
          style={{
            transform: `translateY(${scrollProgress * 50}px)`,
          }}
        >
          {/* Aurora Blob 1 - Top Left Google Blue (#4285F4) */}
          <div className="absolute -top-32 -left-32 w-[950px] h-[950px] rounded-full bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.45)_0%,rgba(66,133,244,0.15)_40%,transparent_75%)] blur-[90px] animate-[aurora-slow_18s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 2 - Top Right Google Red (#EA4335) */}
          <div className="absolute top-1/4 -right-32 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(234,67,53,0.42)_0%,rgba(234,67,53,0.15)_45%,transparent_80%)] blur-[95px] animate-[aurora-reverse_24s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 3 - Bottom Left Google Yellow (#FBBC05) */}
          <div className="absolute -bottom-32 left-1/4 w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,188,5,0.38)_0%,rgba(251,188,5,0.12)_50%,transparent_80%)] blur-[100px] animate-[aurora-pulse_15s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 4 - Bottom Right Google Green (#34A853) */}
          <div className="absolute -bottom-40 -right-40 w-[850px] h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(52,168,83,0.40)_0%,rgba(52,168,83,0.14)_70%,transparent_80%)] blur-[95px] animate-[aurora-reverse_28s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 5 - Center Multi-Color Fusion Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.30)_0%,rgba(234,67,53,0.25)_30%,rgba(251,188,5,0.20)_55%,rgba(52,168,83,0.20)_70%,transparent_85%)] blur-[85px] animate-[aurora-pulse_11s_ease-in-out_infinite_alternate]" />

          {/* Dynamic Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.12)_51%)] bg-[size:100%_4px] opacity-15" />
        </div>
      )}

      {/* 2. INTERACTIVE FULL-SITE WAVE BACKGROUND */}
      {showWaves && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-75">
          <Waves strokeColor="rgba(255, 255, 255, 0.60)" pointerSize={0.5} />
        </div>
      )}

      {/* 3. FOREGROUND PAGE CONTENT */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
