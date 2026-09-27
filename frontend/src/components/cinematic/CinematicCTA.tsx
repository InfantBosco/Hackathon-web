import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

interface CinematicCTAProps {
  onRegisterClick: () => void;
}

export const CinematicCTA: React.FC<CinematicCTAProps> = ({ onRegisterClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const floatingBtnRef = useRef<HTMLDivElement>(null);

  const headlineWords = [
    { text: 'READY', breakAfter: false },
    { text: 'TO', breakAfter: false },
    { text: 'BUILD', breakAfter: true },
    { text: 'SOMETHING', breakAfter: false },
    { text: 'GREAT?', breakAfter: false },
  ];

  // GSAP Scroll sequence: Word-by-word reveal followed by circular button appearance
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!sectionRef.current) return;
    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(['.cta-badge', '.cta-word', '.cta-subtitle', '.cta-btn-box', '.cta-meta'], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
        });
        return;
      }

      // Initial state: Words start dimmed, button & extras hidden
      gsap.set('.cta-badge', { opacity: 0, y: 25 });
      headlineWords.forEach((_, i) => {
        gsap.set(`.cta-word-${i}`, {
          opacity: 0.1,
          y: 28,
          scale: 0.94,
          filter: 'blur(6px)',
        });
      });
      gsap.set('.cta-subtitle', { opacity: 0, y: 25 });
      gsap.set('.cta-btn-box', { opacity: 0, y: 35, scale: 0.6 });
      gsap.set('.cta-meta', { opacity: 0, y: 20 });

      if (isDesktop) {
        // Desktop / Laptop: Pinned cinematic reveal with Lenis dampening
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1500',
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            onEnter: () => {
              (window as any).__ctaActive = true;
            },
            onLeave: () => {
              (window as any).__ctaActive = false;
            },
            onEnterBack: () => {
              (window as any).__ctaActive = true;
            },
            onLeaveBack: () => {
              (window as any).__ctaActive = false;
            },
          },
        });

        // 1. Top badge fades in smoothly
        tl.to('.cta-badge', {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        });
        tl.to({}, { duration: 0.08 });

        // 2. Headline words reveal sequentially word-by-word with scroll
        headlineWords.forEach((_, i) => {
          tl.to(`.cta-word-${i}`, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.35,
            ease: 'power2.out',
          });
          tl.to({}, { duration: 0.08 });
        });

        // 3. Subtitle description reveals once headline sentence is assembled
        tl.to('.cta-subtitle', {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        });
        tl.to({}, { duration: 0.06 });

        // 4. AFTER sentence completes: Circular Register button pops out!
        tl.to('.cta-btn-box', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'back.out(1.6)',
        });

        // 5. Meta info fades in
        tl.to('.cta-meta', {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        });

        // Hold buffer before unpinning
        tl.to({}, { duration: 0.25 });
      } else {
        // Mobile / Phone: Scrubbed reveal as user scrolls down
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1.0,
          },
        });

        tl.to('.cta-badge', { opacity: 1, y: 0, duration: 0.3 });
        headlineWords.forEach((_, i) => {
          tl.to(`.cta-word-${i}`, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.3,
          });
        });
        tl.to('.cta-subtitle', { opacity: 1, y: 0, duration: 0.35 });
        tl.to('.cta-btn-box', { opacity: 1, y: 0, scale: 1, duration: 0.45 });
        tl.to('.cta-meta', { opacity: 1, y: 0, duration: 0.3 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic cursor follower for Laptop / Desktop:
  // The circular register button tracks and follows the user cursor across #final-cta
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || !sectionRef.current || !floatingBtnRef.current || !anchorRef.current) return;

    const section = sectionRef.current;
    const floatingBtn = floatingBtnRef.current;
    const anchor = anchorRef.current;

    const xTo = gsap.quickTo(floatingBtn, 'x', { duration: 0.32, ease: 'power2.out' });
    const yTo = gsap.quickTo(floatingBtn, 'y', { duration: 0.32, ease: 'power2.out' });
    const rotTo = gsap.quickTo(floatingBtn, 'rotation', { duration: 0.32, ease: 'power2.out' });

    let isInside = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isInside) return;
      const anchorRect = anchor.getBoundingClientRect();
      const anchorCenterX = anchorRect.left + anchorRect.width / 2;
      const anchorCenterY = anchorRect.top + anchorRect.height / 2;

      const deltaX = e.clientX - anchorCenterX;
      const deltaY = e.clientY - anchorCenterY;

      // Smooth magnetic glide toward cursor with subtle dynamic tilt
      xTo(deltaX);
      yTo(deltaY);
      rotTo(Math.max(-12, Math.min(12, deltaX * 0.04)));
    };

    const handleMouseEnter = () => {
      isInside = true;
    };

    const handleMouseLeave = () => {
      isInside = false;
      xTo(0);
      yTo(0);
      rotTo(0);
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClick = () => {
    trackEvent('register_cta_click', { location: 'final_cta' });
    onRegisterClick();
  };

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 sm:py-20 z-10"
    >
      {/* Pure text content without any black background box or stray reflection */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full flex flex-col items-center justify-center">
        {/* Top Badge */}
        <div className="cta-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md mb-6 sm:mb-8 will-change-transform">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.28em] text-amber-300 font-semibold">
            JOIN 1,500+ INNOVATORS ACROSS INDIA
          </span>
        </div>

        {/* Headline: Word-by-Word Scroll Reveal */}
        <h2
          className="font-heading font-black tracking-tight text-white mb-6 sm:mb-8 select-none flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 gap-y-1 sm:gap-y-2.5 max-w-4xl mx-auto"
          style={{ fontSize: 'clamp(2.2rem, 6.5vw, 5.2rem)', lineHeight: 1.08 }}
        >
          {headlineWords.map((item, i) => (
            <React.Fragment key={i}>
              <span
                className={`cta-word cta-word-${i} inline-block will-change-transform text-white drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]`}
              >
                {item.text}
              </span>
              {item.breakAfter && <span className="basis-full h-0" />}
            </React.Fragment>
          ))}
        </h2>

        {/* Subtitle description */}
        <p className="cta-subtitle text-sm sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-xl mx-auto font-sans drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)] will-change-transform">
          Assemble your team of 4 and register for{' '}
          <strong className="text-white font-bold">HackNEX '26</strong>.
          <br />
          October 8–9, 2026 at Karunya University, Coimbatore.
        </p>

        {/* Register Button Anchor: Handles scroll entrance animation */}
        <div
          ref={anchorRef}
          className="cta-btn-box will-change-transform relative z-30 flex justify-center items-center my-2"
        >
          {/* Floating Circle Button: Follows user cursor on desktop, centered on phone */}
          <div
            ref={floatingBtnRef}
            className="will-change-transform transform-gpu pointer-events-auto"
          >
            <button
              onClick={handleClick}
              className="group relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 text-black flex flex-col items-center justify-center p-3 shadow-[0_0_50px_rgba(245,158,11,0.7)] hover:shadow-[0_0_75px_rgba(245,158,11,0.95)] hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer overflow-hidden border-2 border-amber-300"
              title="Click to Register for HackNEX '26"
            >
              {/* Internal subtle pulse ring */}
              <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-25 pointer-events-none" />

              <span className="relative z-10 flex flex-col items-center justify-center text-center font-heading font-black leading-tight select-none">
                <span className="text-[11px] sm:text-xs md:text-sm tracking-widest uppercase">
                  REGISTER
                </span>
                <span className="text-sm sm:text-base md:text-lg tracking-widest uppercase mt-0.5">
                  NOW
                </span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mt-1 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* Supporting info */}
        <div className="cta-meta mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-mono text-slate-300 flex-wrap drop-shadow-md will-change-transform">
          <span>₹500 / PERSON</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          <span>3-4 PER TEAM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          <span>DEADLINE: OCT 6</span>
        </div>
      </div>
    </section>
  );
};
