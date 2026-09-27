import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { heroData } from '../../data/heroData';
import { trackEvent } from '../../lib/analytics';
import { TwistingTitleTimer } from './TwistingTitleTimer';

gsap.registerPlugin(ScrollTrigger);

interface CinematicHeroProps {
  onRegisterClick: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onRegisterClick }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Clean intro sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-org-logos', { y: 30, opacity: 0, duration: 0.8 }, 0.2)
        .from('.hero-powered', { y: 25, opacity: 0, duration: 0.7 }, 0.4)
        .from('.hero-presents', { y: 20, opacity: 0, duration: 0.6 }, 0.5)
        .from('.hero-title-box', { y: 40, opacity: 0, scale: 0.95, duration: 1.0 }, 0.35)
        .from('.hero-tagline', { y: 25, opacity: 0, duration: 0.7 }, 0.7)
        .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.7 }, 0.85)
        .from('.hero-ctas', { y: 20, opacity: 0, duration: 0.7 }, 1.0)
        .from('.hero-countdown', { y: 20, opacity: 0, duration: 0.6 }, 1.15)
        .from('.hero-scroll-indicator', { opacity: 0, duration: 0.8 }, 1.4);

      // Smooth scroll-driven parallax fade out (scrubbed slowly to scroll)
      gsap.to('.hero-inner', {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '75% top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRegisterClick = () => {
    trackEvent('register_cta_click', { location: 'hero' });
    onRegisterClick();
  };

  const handleExploreClick = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-24"
    >
      <div className="hero-inner relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full flex flex-col items-center justify-center pt-16">
        {/* Organization Logos — Nexus | Karunya | CIRA */}
        <div className="hero-org-logos flex items-center justify-center gap-3 sm:gap-6 md:gap-8 mb-4 max-w-full">
          <img
            src="https://res.cloudinary.com/demc5rxwn/image/upload/v1789059762/bniypjdp0l5zfayyz712.png"
            alt="Nexus Logo"
            className="h-7 sm:h-10 md:h-14 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          />
          <div className="h-5 sm:h-8 md:h-10 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <img
            src="https://res.cloudinary.com/demc5rxwn/image/upload/v1789196109/e0ujlxpd75ckmqlooy8w.png"
            alt="Karunya Logo"
            className="h-7 sm:h-10 md:h-14 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          />
          <div className="h-5 sm:h-8 md:h-10 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <img
            src="https://res.cloudinary.com/demc5rxwn/image/upload/v1789984129/vwbxosj2fa7j1ikqvo17.png"
            alt="CIRA Logo"
            className="h-10 sm:h-16 md:h-22 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          />
        </div>

        {/* Powered By */}
        <div className="hero-powered mb-3">
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.3em] text-slate-400">
            POWERED BY
          </span>
          <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 mt-2 flex-wrap px-4">
            <img src="https://res.cloudinary.com/demc5rxwn/image/upload/v1789982426/mb6ttkax94stfdaegnm5.png" alt="Google Cloud" className="h-4 sm:h-6 md:h-7 w-auto object-contain opacity-80" />
            <img src="https://res.cloudinary.com/demc5rxwn/image/upload/v1789982425/oqeih8o1pu9ytbcs4b8j.png" alt="Microsoft" className="h-4 sm:h-6 md:h-7 w-auto object-contain opacity-80" />
            <img src="https://res.cloudinary.com/demc5rxwn/image/upload/v1789971756/xqa7idnojcuzkarda6fu.png" alt="EC-Council" className="h-4 sm:h-6 md:h-9 w-auto object-contain opacity-80" />
            <img src="https://res.cloudinary.com/demc5rxwn/image/upload/v1789980899/jrkcr0bqksz0iftv8yrb.png" alt="SUSE" className="h-4 sm:h-6 md:h-7 w-auto object-contain opacity-80" />
            <img src="https://res.cloudinary.com/demc5rxwn/image/upload/v1789364592/qxktwxtl9dv0aqbsdq2s.png" alt="Cisco" className="h-3.5 sm:h-5 md:h-6 w-auto object-contain opacity-80" />
          </div>
        </div>

        {/* Division of CSE — PRESENTS */}
        <div className="hero-presents mb-3">
          <span className="block text-xs sm:text-sm md:text-base font-heading font-black tracking-[0.25em] sm:tracking-[0.4em] text-slate-300 uppercase">
            DIVISION OF CSE
          </span>
          <span className="block text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.35em] text-amber-400/80 mt-1">
            PRESENTS
          </span>
        </div>

        {/* HACKNEX Dynamic Twisting Title <-> Live Countdown Timer */}
        <div className="hero-title-box w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-2 select-none">
          <TwistingTitleTimer />
        </div>

        {/* 24 Hour Tagline */}
        <p
          className="hero-tagline font-royal font-black tracking-[0.1em] sm:tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-500 uppercase select-none mb-3"
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.6rem)' }}
        >
          24 Hour National Level Hackathon
        </p>

        {/* Subtitle */}
        <p className="hero-subtitle text-sm sm:text-lg text-slate-300 font-heading font-medium tracking-wide mb-6 max-w-2xl mx-auto">
          {heroData.taglinePlaceholder}
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-6 w-full max-w-md mx-auto">
          <Button
            variant="primary"
            size="lg"
            onClick={handleRegisterClick}
            className="w-full sm:w-auto min-w-[200px] font-royal font-black tracking-[0.15em] uppercase text-black text-sm sm:text-base shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] transition-all"
          >
            REGISTER NOW
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleExploreClick}
            rightIcon={<ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />}
            className="w-full sm:w-auto !h-auto !py-4"
          >
            {heroData.secondaryCtaText}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 pointer-events-none">
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">Scroll to Explore</span>
        <div className="w-px h-8 relative overflow-hidden bg-white/10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-400 to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#030712] to-transparent z-[5] pointer-events-none" />
    </section>
  );
};
