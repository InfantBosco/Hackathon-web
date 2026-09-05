import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { GridBackground } from '../backgrounds/GridBackground';
import { NeuralNoise } from '../backgrounds/NeuralNoise';
import { CountdownTimer } from './CountdownTimer';
import { heroData } from '../../data/heroData';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

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
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-heading font-black tracking-tight text-white uppercase select-none">
            HACK<span className="text-[var(--color-accent-cyan)] drop-shadow-[0_0_45px_rgba(255,30,66,0.85)]">NEX</span>
          </h1>
          <p className="text-base sm:text-xl font-heading text-[var(--color-text-secondary)] max-w-2xl font-medium tracking-wide">
            {heroData.taglinePlaceholder}
          </p>
        </motion.div>

        {/* Metadata Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 text-xs sm:text-sm font-mono text-white"
        >
          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-[var(--color-border-subtle)]">
            <Calendar className="w-4 h-4 text-[var(--color-accent-cyan)]" />
            <span>{heroData.dates}</span>
          </div>
          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-[var(--color-border-subtle)]">
            <MapPin className="w-4 h-4 text-[var(--color-accent-purple)]" />
            <span>{heroData.location}</span>
          </div>
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
