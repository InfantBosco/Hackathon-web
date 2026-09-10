import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Calendar, Trophy, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
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
    colorClass: 'border-[#4285F4]/40 hover:border-[#4285F4] hover:shadow-[0_0_30px_rgba(66,133,244,0.45)]',
    iconClass: 'bg-[#4285F4]/15 border-[#4285F4]/40 text-[#4285F4] shadow-[0_0_12px_rgba(66,133,244,0.3)]',
  },
  {
    label: 'VENUE',
    value: 'KITS, Coimbatore',
    icon: MapPin,
    colorClass: 'border-[#EA4335]/40 hover:border-[#EA4335] hover:shadow-[0_0_30px_rgba(234,67,53,0.45)]',
    iconClass: 'bg-[#EA4335]/15 border-[#EA4335]/40 text-[#EA4335] shadow-[0_0_12px_rgba(234,67,53,0.3)]',
  },
  {
    label: 'REGISTRATION DEADLINE',
    value: 'Oct 1 11.59PM',
    icon: Clock,
    colorClass: 'border-[#FBBC05]/40 hover:border-[#FBBC05] hover:shadow-[0_0_30px_rgba(251,188,5,0.45)]',
    iconClass: 'bg-[#FBBC05]/15 border-[#FBBC05]/40 text-[#FBBC05] shadow-[0_0_12px_rgba(251,188,5,0.3)]',
  },
  {
    label: 'PRIZE POOL',
    value: 'Rs. 1.5 L',
    icon: Trophy,
    colorClass: 'border-[#34A853]/40 hover:border-[#34A853] hover:shadow-[0_0_30px_rgba(52,168,83,0.45)]',
    iconClass: 'bg-[#34A853]/15 border-[#34A853]/40 text-[#34A853] shadow-[0_0_12px_rgba(52,168,83,0.3)]',
  },
];

export const HeroSection: React.FC = () => {
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
    window.location.href = siteConfig.registerRoute;
  };

  const handleExploreClick = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <GridBackground id="home" className="min-h-screen pt-28 pb-16 flex flex-col justify-center relative">
      <NeuralNoise opacity={0.3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 my-auto">
        {/* Header Tagline & Brand */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.1 }}
          >
            <Badge variant="cyan" className="flex items-center gap-2 px-3 py-1">
              <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-4 w-auto shrink-0 inline-block" />
              <span>{heroData.badge}</span>
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 110, damping: 18, delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-9xl font-royal font-extrabold tracking-[0.15em] sm:tracking-[0.22em] uppercase select-none"
          >
            <span className="text-white">HACK</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-zinc-400 to-zinc-500 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] ml-0.5">
              NEX
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.3 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-royal font-extrabold tracking-[0.25em] pl-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_0_35px_rgba(245,158,11,0.55)] uppercase select-none -mt-2 mb-2"
          >
            '26
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
          <ContainerScrollBox className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
              {heroBadges.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`glass-panel rounded-2xl p-3.5 sm:p-4 border bg-zinc-950/80 backdrop-blur-md flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 text-left select-none ${item.colorClass}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.iconClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm font-heading font-bold text-white tracking-wide truncate">
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
