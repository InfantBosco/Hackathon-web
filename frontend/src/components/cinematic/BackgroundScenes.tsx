import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BackgroundScenes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP scroll-driven 24-Hour Cycle Scene Transitions (Morning -> Evening -> Night -> Dawn)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. SCENE MORNING (Kickoff): visible at top, crossfades out into Scene Evening at #tracks
      gsap.to('#bg-scene-morning', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#tracks',
          start: 'top 95%',
          end: 'top 35%',
          scrub: 1.2,
        },
      });

      // 2. SCENE EVENING (Dusk Sprint): fades in at #tracks, fades out at #schedule
      gsap.fromTo(
        '#bg-scene-evening',
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#tracks',
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1.2,
          },
        }
      );
      gsap.to('#bg-scene-evening', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#schedule',
          start: 'top 90%',
          end: 'top 35%',
          scrub: 1.2,
        },
      });

      // 3. SCENE NIGHT (Midnight 24-Hr Flow): fades in at #schedule, fades out at #venue
      gsap.fromTo(
        '#bg-scene-night',
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#schedule',
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1.2,
          },
        }
      );
      gsap.to('#bg-scene-night', {
        opacity: 0,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#venue',
          start: 'top 95%',
          end: 'top 30%',
          scrub: 1.5,
        },
      });

      // 4. SCENE DAWN (Karunya Campus / Grand Finale): fades in smoothly at #venue through Final CTA
      gsap.fromTo(
        '#bg-scene-dawn',
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: '#venue',
            start: 'top 95%',
            end: 'top 30%',
            scrub: 1.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#030712]"
      aria-hidden="true"
    >
      {/* 01. MORNING (09:00 AM — Kickoff / Daybreak) */}
      <div
        id="bg-scene-morning"
        className="absolute inset-0 opacity-100 will-change-[opacity] transform-gpu"
      >
        <img
          src="/scenes/morning.jpg"
          alt="Karunya Institute of Technology and Sciences — Morning Hackathon Kickoff"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark gradient overlay for contrast and text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-[#030712]/30 to-[#030712]/85 pointer-events-none" />
      </div>

      {/* 02. EVENING (06:00 PM — Sunset / Sprint Arena) */}
      <div
        id="bg-scene-evening"
        className="absolute inset-0 opacity-0 will-change-[opacity] transform-gpu"
      >
        <img
          src="/scenes/evening.jpg"
          alt="Karunya Innovation Hub — Evening Sunset Hackathon Sprint"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-[#030712]/35 to-[#030712]/90 pointer-events-none" />
      </div>

      {/* 03. NIGHT (02:00 AM — Midnight Hackathon / Late Night Code Flow) */}
      <div
        id="bg-scene-night"
        className="absolute inset-0 opacity-0 will-change-[opacity] transform-gpu"
      >
        <img
          src="/scenes/night.jpg"
          alt="Karunya Innovation Hub — Midnight 24-Hour Code Marathon"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-[#030712]/40 to-[#030712]/90 pointer-events-none" />
      </div>

      {/* 04. DAWN (Karunya Campus Aerial Scene — Grand Finale & Venue) */}
      <div
        id="bg-scene-dawn"
        className="absolute inset-0 opacity-0 will-change-[opacity] transform-gpu"
      >
        <img
          src="/scenes/dawn.jpg"
          alt="Karunya Institute of Technology and Sciences — Grand Finale & Awards"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-[#030712]/25 to-[#030712]/80 pointer-events-none" />
      </div>

      {/* Unified dark ambient lighting overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#030712]/30 via-transparent to-[#030712]/60" />
    </div>
  );
};
