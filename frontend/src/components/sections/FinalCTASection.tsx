import React from 'react';
import { GridBackground } from '../backgrounds/GridBackground';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';
import { Button } from '../ui/Button';
import { FadeIn } from '../ui/FadeIn';

interface FinalCTASectionProps {
  onRegisterClick?: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onRegisterClick }) => {
  const handleRegisterClick = () => {
    trackEvent('register_cta_click', { location: 'final_cta' });
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      window.open(siteConfig.googleFormUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <GridBackground className="py-24 border-t border-[var(--color-border-subtle)] text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <FadeIn delay={0.0} direction="up">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-cyan)] mb-4 block">
            JOIN 1,500+ INNOVATORS ACROSS INDIA
          </span>
        </FadeIn>

        <FadeIn delay={0.1} direction="up">
          <h2 className="text-4xl sm:text-6xl font-heading font-black text-white uppercase tracking-tight mb-6">
            READY TO BUILD SOMETHING GREAT?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto leading-relaxed">
            <span>Assemble your team of 4 and register for <strong className="font-royal font-bold text-white">HackNEX '26</strong>.</span>
            <br />
            <span className="inline-block mt-1">October 8–9, 2026 at Karunya University.</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.3} direction="up">
          <Button
            variant="primary"
            size="lg"
            onClick={handleRegisterClick}
            className="min-w-[240px] !h-auto !py-3 flex-col gap-0.5"
          >
            <span className="font-royal font-black text-sm sm:text-base tracking-[0.15em] uppercase text-black leading-tight">
              REGISTER NOW
            </span>
            <span className="font-royal font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase text-amber-600 leading-tight">
              COMING SOON!!
            </span>
          </Button>
        </FadeIn>
      </div>
    </GridBackground>
  );
};
