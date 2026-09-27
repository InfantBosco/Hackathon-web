import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Cinematic components
import { HacknexLoader } from '../components/cinematic/HacknexLoader';
import { BackgroundScenes } from '../components/cinematic/BackgroundScenes';
import { CinematicNav } from '../components/cinematic/CinematicNav';
import { CinematicHero } from '../components/cinematic/CinematicHero';
import { CinematicAbout } from '../components/cinematic/CinematicAbout';
import { CinematicStory } from '../components/cinematic/CinematicStory';
import { CinematicStats } from '../components/cinematic/CinematicStats';
import { CinematicTracks } from '../components/cinematic/CinematicTracks';
import { CinematicChallenge } from '../components/cinematic/CinematicChallenge';
import { CinematicTimeline } from '../components/cinematic/CinematicTimeline';
import { CinematicPrizes } from '../components/cinematic/CinematicPrizes';
import { CinematicSponsors } from '../components/cinematic/CinematicSponsors';
import { CinematicVenue } from '../components/cinematic/CinematicVenue';
import { CinematicContact } from '../components/cinematic/CinematicContact';
import { CinematicFAQ } from '../components/cinematic/CinematicFAQ';
import { CinematicCTA } from '../components/cinematic/CinematicCTA';
import { CinematicFooter } from '../components/cinematic/CinematicFooter';

// Preserved functionality
import { BackToTop } from '../components/ui/BackToTop';
import { RegistrationModal } from '../components/modals/RegistrationModal';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis + GSAP ScrollTrigger: Controlled dampening on both desktop & mobile touch
  // Even if user swipes fast on phone, it glides steadily and slowly so animations look stunning
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const lenis = new Lenis({
      duration: isTouch ? 1.8 : 2.2, // Smooth, slow glide on phones
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.45, // Controlled mousewheel on desktop
      touchMultiplier: 0.5, // Reduced touch sensitivity by 50% so swipes don't rush through the page
      infinite: false,
      virtualScroll: (data) => {
        if (isTouch) {
          // Touch dampening: even if user swipes fast or pushes hard, move steadily and slowly
          const maxTouchDelta = 70;
          const sign = Math.sign(data.deltaY);
          data.deltaY = sign * Math.min(Math.abs(data.deltaY) * 0.4, maxTouchDelta);
        } else {
          // Desktop section dampening
          if ((window as any).__tracksActive) {
            const sign = Math.sign(data.deltaY);
            const dampened = Math.abs(data.deltaY) * 0.35;
            data.deltaY = sign * Math.min(dampened, 60);
          } else if ((window as any).__scheduleActive) {
            const sign = Math.sign(data.deltaY);
            const dampened = Math.abs(data.deltaY) * 0.65;
            data.deltaY = sign * Math.min(dampened, 120);
          } else if ((window as any).__ctaActive) {
            const sign = Math.sign(data.deltaY);
            const dampened = Math.abs(data.deltaY) * 0.6;
            data.deltaY = sign * Math.min(dampened, 110);
          }
        }
        return true;
      },
    });
    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
      delete (window as any).__tracksActive;
      delete (window as any).__scheduleActive;
      delete (window as any).__ctaActive;
    };
  }, []);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  };

  return (
    <div className="w-full relative bg-[#030712] text-white">
      {/* Razorpay Buildathon style initial verification & loading screen */}
      {isLoading && <HacknexLoader onComplete={handleLoaderComplete} />}

      {/* Fixed background scene system */}
      <BackgroundScenes />

      {/* Navigation — Only appears when home page occurs */}
      {!isLoading && <CinematicNav onRegisterClick={openRegisterModal} />}

      {/* Main content — renders above the fixed background */}
      <main className="relative z-10 w-full">
        {/* ACT I — THE HERO (Scene 1: Video BG) */}
        <CinematicHero onRegisterClick={openRegisterModal} />

        {/* TRANSITION — About */}
        <CinematicAbout />

        {/* STORY BEAT — Large text reveal */}
        <CinematicStory />

        {/* STATS — Animated counters */}
        <CinematicStats />

        {/* ACT II — THE CHALLENGE (Scene 2: Ambient Dark) */}
        <CinematicTracks />

        {/* Challenge details */}
        <CinematicChallenge />

        {/* Timeline pinned experience */}
        <CinematicTimeline />

        {/* Prizes */}
        <CinematicPrizes />

        {/* Sponsors */}
        <CinematicSponsors />

        {/* ACT III — THE VENUE (Scene 3: Venue BG) */}
        <CinematicVenue />

        {/* Contact */}
        <CinematicContact />

        {/* FAQ */}
        <CinematicFAQ />

        {/* Final CTA */}
        <CinematicCTA onRegisterClick={openRegisterModal} />
      </main>

      {/* Footer */}
      <CinematicFooter />

      {/* Utility */}
      <BackToTop />
      <RegistrationModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </div>
  );
};
