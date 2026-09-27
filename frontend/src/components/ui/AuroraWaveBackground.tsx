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
    <div className={`relative w-full min-h-screen bg-[#030712] text-white ${className}`}>
      {/* 1. NEURAL CYBER AURORA AMBIENT GLOW (MATCHING HERO VIDEO PALETTE) */}
      {showAurora && (
        <div
          className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-85 transition-transform duration-500 ease-out will-change-transform transform-gpu"
          style={{
            transform: `translateY(${scrollProgress * 50}px)`,
          }}
        >
          {/* Aurora Blob 1 - Top Left Luminescent Neural Cyan (#00f0ff / #06b6d4) */}
          <div className="absolute -top-32 -left-32 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.32)_0%,rgba(56,189,248,0.12)_45%,transparent_75%)] blur-[80px] animate-[aurora-slow_18s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 2 - Top Right Synaptic Gold & Amber (#f59e0b / #fbbf24) */}
          <div className="absolute top-1/4 -right-32 w-[850px] h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.26)_0%,rgba(251,191,36,0.10)_45%,transparent_80%)] blur-[85px] animate-[aurora-reverse_24s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 3 - Bottom Left Quantum Emerald (#10b981 / #34d399) */}
          <div className="absolute -bottom-32 left-1/4 w-[950px] h-[950px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.24)_0%,rgba(52,211,153,0.08)_50%,transparent_80%)] blur-[90px] animate-[aurora-pulse_15s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 4 - Bottom Right Electric Azure (#38bdf8 / #6366f1) */}
          <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.28)_0%,rgba(99,102,241,0.10)_70%,transparent_80%)] blur-[85px] animate-[aurora-reverse_28s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 5 - Center Neural Fusion Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.22)_0%,rgba(245,158,11,0.15)_35%,rgba(16,185,129,0.12)_60%,transparent_85%)] blur-[80px] animate-[aurora-pulse_11s_ease-in-out_infinite_alternate]" />

          {/* Dynamic Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.15)_51%)] bg-[size:100%_4px] opacity-15" />
        </div>
      )}

      {/* 2. INTERACTIVE FULL-SITE LUMINESCENT NEURAL WAVE BACKGROUND */}
      {showWaves && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
          <Waves strokeColor="rgba(56, 189, 248, 0.35)" pointerSize={0.5} />
        </div>
      )}

      {/* 3. FOREGROUND PAGE CONTENT */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
