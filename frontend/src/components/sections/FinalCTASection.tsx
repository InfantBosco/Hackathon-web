import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Button } from '../ui/Button';
import { GridBackground } from '../backgrounds/GridBackground';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

export const FinalCTASection: React.FC = () => {
  const handleRegisterClick = () => {
    trackEvent('register_cta_click', { location: 'final_cta' });
    window.location.href = siteConfig.registerRoute;
  };

  return (
    <GridBackground className="py-24 border-t border-[var(--color-border-subtle)] text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-cyan)] mb-4 block"
        >
          JOIN 1,500+ INNOVATORS ACROSS INDIA
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-heading font-black text-white uppercase tracking-tight mb-6"
        >
          READY TO BUILD SOMETHING GREAT?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto"
        >
          Assemble your team of 4 and register for HackNEX 2026. October 7–9, 2026 at Karunya University.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleRegisterClick}
            leftIcon={<Rocket className="w-5 h-5" />}
            className="min-w-[240px]"
          >
            REGISTER NOW
          </Button>
        </motion.div>
      </div>
    </GridBackground>
  );
};
