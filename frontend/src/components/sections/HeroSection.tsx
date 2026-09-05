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
    label: 'REGISTRATION DEADLINE',
    value: 'Oct 1 11.59PM',
    icon: Clock,
  },
  {
    label: 'PRIZE POOL',
    value: 'Rs. 1.5 L',
    icon: Trophy,
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 mb-6"
        >
          <Badge variant="cyan" className="flex items-center gap-2 px-3 py-1">
            <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-4 w-auto shrink-0 inline-block" />
            <span>{heroData.badge}</span>
          </Badge>

          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-royal font-extrabold tracking-[0.15em] sm:tracking-[0.22em] uppercase select-none">
            <span className="text-white">HACK</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-zinc-400 to-zinc-500 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] ml-0.5">
              NEX
            </span>
          </h1>

          <div className="text-4xl sm:text-6xl lg:text-7xl font-royal font-extrabold tracking-[0.25em] pl-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_0_35px_rgba(245,158,11,0.55)] uppercase select-none -mt-2 mb-2">
            '26
          </div>

          <p className="text-base sm:text-xl font-heading text-slate-300 max-w-2xl font-medium tracking-wide">
            {heroData.taglinePlaceholder}
          </p>
        </motion.div>

        {/* 4 Glassmorphism Feature Badges below tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="my-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {heroBadges.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="glass-panel rounded-2xl p-3.5 sm:p-4 border border-red-500/30 bg-zinc-950/80 backdrop-blur-md shadow-[0_0_20px_rgba(255,30,66,0.3)] flex items-center gap-3 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_30px_rgba(255,30,66,0.5)] hover:-translate-y-1 text-left select-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0 text-red-400 shadow-[0_0_10px_rgba(255,30,66,0.25)]">
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
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
