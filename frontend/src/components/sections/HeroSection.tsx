import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Calendar, Users, Trophy } from 'lucide-react';
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
    label: 'PARTICIPANTS',
    value: '1500+',
    icon: Users,
  },
  {
    label: 'PRIZE POOL',
    value: 'Rs. 1.5 L',
    icon: Trophy,
  },
];

export const HeroSection: React.FC = () => {
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
            <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-4 w-auto shrink-0 inline-block invert brightness-200" />
            <span>{heroData.badge}</span>
          </Badge>

          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-heading font-black tracking-tight text-white uppercase select-none">
            HACK<span className="text-white drop-shadow-[0_0_45px_rgba(255,255,255,0.7)]">NEX</span>
          </h1>

          <p className="text-base sm:text-xl font-heading text-[var(--color-text-secondary)] max-w-2xl font-medium tracking-wide">
            {heroData.taglinePlaceholder}
          </p>
        </motion.div>

        {/* 4 Glassmorphism Feature Badges below tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto my-8"
        >
          {heroBadges.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="glass-panel rounded-2xl p-3.5 sm:p-4 border border-white/15 bg-zinc-950/80 backdrop-blur-md shadow-xl flex items-center gap-3 transition-all duration-300 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:-translate-y-1 text-left select-none"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm font-heading font-bold text-white tracking-wide truncate">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Live Event Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <CountdownTimer />
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
            rightIcon={<ArrowDown className="w-4 h-4 animate-bounce" />}
            className="w-full sm:w-auto"
          >
            {heroData.secondaryCtaText}
          </Button>
        </motion.div>
      </div>
    </GridBackground>
  );
};
