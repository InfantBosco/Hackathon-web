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
      {/* 0. TOP METALLIC SCROLL PROGRESS BAR */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-white via-slate-200 to-zinc-500 shadow-[0_0_12px_rgba(255,255,255,0.6)] z-50 transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* 1. VIBRANT MONOCHROME AURORA EFFECT WITH SCROLL PARALLAX */}
      {showAurora && (
        <div
          className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-85 transition-transform duration-500 ease-out"
          style={{
            transform: `translateY(${scrollProgress * 40}px)`,
          }}
        >
          {/* Aurora Gradient Blob 1 - Top Left Floating White Beam */}
          <div className="absolute -top-32 -left-32 w-[850px] h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_0%,rgba(200,200,200,0.12)_40%,transparent_70%)] blur-[100px] animate-[aurora-slow_20s_ease-in-out_infinite_alternate]" />

          {/* Aurora Gradient Blob 2 - Center Right Platinum Mesh */}
          <div className="absolute top-1/4 -right-32 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(240,240,240,0.18)_0%,rgba(160,160,160,0.08)_45%,transparent_75%)] blur-[110px] animate-[aurora-reverse_26s_ease-in-out_infinite_alternate]" />

          {/* Aurora Gradient Blob 3 - Bottom Left Floating Glow */}
          <div className="absolute -bottom-32 left-1/4 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16)_0%,rgba(140,140,140,0.06)_50%,transparent_80%)] blur-[120px] animate-[aurora-pulse_16s_ease-in-out_infinite_alternate]" />

          {/* Aurora Gradient Blob 4 - Center Core Highlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_60%)] blur-[90px] animate-[aurora-pulse_12s_ease-in-out_infinite_alternate]" />

          {/* Dynamic Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_51%)] bg-[size:100%_4px] opacity-15" />
        </div>
      )}

      {/* 2. INTERACTIVE FULL-SITE WAVE BACKGROUND */}
      {showWaves && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
          <Waves strokeColor="rgba(255, 255, 255, 0.38)" pointerSize={0.5} />
        </div>
      )}

      {/* 3. FOREGROUND PAGE CONTENT */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
