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
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-red-500 via-white to-zinc-400 shadow-[0_0_12px_rgba(255,30,66,0.6)] z-50 transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* 1. VIBRANT MULTI-LAYERED AURORA EFFECT WITH SCROLL PARALLAX */}
      {showAurora && (
        <div
          className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-90 transition-transform duration-500 ease-out"
          style={{
            transform: `translateY(${scrollProgress * 50}px)`,
          }}
        >
          {/* Aurora Blob 1 - Top Left Crimson & White Beam */}
          <div className="absolute -top-32 -left-32 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,30,66,0.22)_0%,rgba(255,255,255,0.12)_35%,rgba(180,180,180,0.06)_60%,transparent_75%)] blur-[100px] animate-[aurora-slow_18s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 2 - Center Right Ethereal Platinum Mesh */}
          <div className="absolute top-1/4 -right-32 w-[850px] h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,rgba(225,29,72,0.14)_45%,transparent_80%)] blur-[110px] animate-[aurora-reverse_24s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 3 - Bottom Left Ruby Crimson Glow */}
          <div className="absolute -bottom-32 left-1/4 w-[950px] h-[950px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,30,66,0.25)_0%,rgba(200,200,200,0.08)_50%,transparent_80%)] blur-[120px] animate-[aurora-pulse_15s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 4 - Center Core Flash */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(255,30,66,0.15)_40%,transparent_65%)] blur-[90px] animate-[aurora-pulse_11s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 5 - Top Right Platinum Silver Beam */}
          <div className="absolute -top-40 right-1/4 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,transparent_60%)] blur-[95px] animate-[aurora-slow_22s_ease-in-out_infinite_alternate]" />

          {/* Aurora Blob 6 - Bottom Right Deep Crimson Waves */}
          <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.2)_0%,transparent_70%)] blur-[115px] animate-[aurora-reverse_28s_ease-in-out_infinite_alternate]" />

          {/* Dynamic Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.18)_51%)] bg-[size:100%_4px] opacity-15" />
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
