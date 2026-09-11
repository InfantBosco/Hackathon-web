import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Calendar, MapPin, Clock, Trophy } from 'lucide-react';
import { Button } from '../ui/Button';
import { GridBackground } from '../backgrounds/GridBackground';
import { NeuralNoise } from '../backgrounds/NeuralNoise';
import { CountdownTimer } from './CountdownTimer';
import { heroData } from '../../data/heroData';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';
import { ContainerScrollBox } from '../ui/ContainerScrollBox';
import { KineticSpringFloat } from '../ui/KineticSpringFloat';

const heroBadges = [
  {
    label: 'DATE',
    value: 'Oct 7 - 9, 2026',
    icon: Calendar,
  },
  {
    label: 'VENUE',
    value: 'KITS, Coimbatore',
    icon: MapPin,
  },
  {
    label: 'REGISTER BY',
    value: 'Oct 1 11:59 PM',
    icon: Clock,
  },
  {
    label: 'PRIZE POOL',
    value: 'Rs. 1.5 LAKH',
    icon: Trophy,
  },
];

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick }) => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegisterClick = () => {
    trackEvent('register_cta_click', { location: 'hero' });
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      window.open(siteConfig.googleFormUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleExploreClick = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <GridBackground id="home" className="min-h-screen pt-28 pb-16 flex flex-col justify-center relative">
      <NeuralNoise opacity={0.3} />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 my-auto">
        {/* Header Tagline & Brand */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.1 }}
            className="flex flex-col items-center gap-2 mb-2"
          >
            {/* Unboxed, Prominent Logos with Splitting Line */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-7">
              <img
                src="https://res.cloudinary.com/demc5rxwn/image/upload/v1789066202/uvpmacxmjcejtzhgsmf9.png"
                alt="Karunya Logo"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]"
              />
              <div className="h-7 sm:h-8 md:h-10 w-[1.5px] bg-gradient-to-b from-transparent via-white/50 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              <img
                src="https://res.cloudinary.com/demc5rxwn/image/upload/v1789059762/bniypjdp0l5zfayyz712.png"
                alt="Nexus Logo"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]"
              />
            </div>

            {/* Subtitle text "PRESENTS" */}
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.35em] text-slate-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mt-1">
              PRESENTS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 110, damping: 18, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-hacknex font-black tracking-tight uppercase select-none flex items-center justify-center text-center mx-auto w-full leading-none"
          >
            <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]">HACKNE</span>
            <span className="text-google-x drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">X</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.3 }}
            className="text-lg sm:text-2xl lg:text-3xl font-royal font-extrabold tracking-[0.1em] sm:tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_0_35px_rgba(245,158,11,0.55)] uppercase select-none mt-2 mb-3 px-2"
          >
            24 Hour National Level Hackathon
          </motion.div>

          <KineticSpringFloat
            as="p"
            mode="words"
            delay={0.4}
            staggerDelay={0.03}
            className="text-base sm:text-xl font-heading text-slate-300 max-w-2xl font-medium tracking-wide justify-center"
          >
            {heroData.taglinePlaceholder}
          </KineticSpringFloat>
        </div>

        {/* 4 Glassmorphism Feature Badges below tagline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 18, delay: 0.45 }}
          className="my-8"
        >
          <ContainerScrollBox className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
              {heroBadges.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-[1.6rem] p-4 sm:p-4.5 border border-amber-500/25 bg-[#0d0c10]/90 backdrop-blur-md flex items-center gap-3.5 shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:-translate-y-1 text-left select-none group"
                  >
                    <div className="shrink-0 text-white pl-0.5">
                      <Icon className="w-5 sm:w-6 h-5 sm:h-6 stroke-[1.75]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] sm:text-[11px] font-royal font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-red-500 drop-shadow-[0_1px_3px_rgba(245,158,11,0.4)]">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm font-heading font-bold text-white tracking-wide truncate mt-0.5">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ContainerScrollBox>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleRegisterClick}
            className="w-full sm:w-auto min-w-[220px]"
          >
            {heroData.primaryCtaText}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleExploreClick}
            rightIcon={<ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />}
            className="w-full sm:w-auto"
          >
            {heroData.secondaryCtaText}
          </Button>
        </motion.div>

        {/* Live Event Countdown Timer - Fades in on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{
            opacity: isScrolled ? 1 : 0,
            y: isScrolled ? 0 : 20,
            scale: isScrolled ? 1 : 0.95,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`mb-4 ${isScrolled ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <CountdownTimer />
        </motion.div>
      </div>
    </GridBackground>
  );
};
