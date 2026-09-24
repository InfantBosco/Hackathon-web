import React from 'react';
import { Section } from '../layout/Section';
import { GlassCard } from '../ui/GlassCard';
import { prizesData } from '../../data/prizesData';
import { ContainerScrollBox } from '../ui/ContainerScrollBox';
import { Badge } from '../ui/Badge';
import { KineticSpringFloat } from '../ui/KineticSpringFloat';

export const PrizesSection: React.FC = () => {
  return (
    <Section id="prizes" variant="secondary">
      {/* Top Badge Pill */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <KineticSpringFloat delay={0.05} mode="words">
          <Badge variant="cyan" className="px-3.5 sm:px-4 py-1 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em]">
            PRIZES
          </Badge>
        </KineticSpringFloat>
      </div>

      <div className="max-w-5xl mx-auto pt-2 px-4 sm:px-6">
        <ContainerScrollBox className="w-full">
          <div className="relative group">
            {/* Outer Soft White Glow Aura */}
            <div className="absolute -inset-1.5 rounded-3xl bg-white/25 blur-xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Single Rectangular Box with White Glow */}
            <GlassCard
              glowColor="none"
              className="relative z-10 border-2 border-white/60 bg-[#0a0c16]/95 backdrop-blur-2xl shadow-[0_0_35px_rgba(255,255,255,0.35),0_0_70px_rgba(255,255,255,0.15)] rounded-3xl p-6 sm:p-14 overflow-hidden transition-all duration-300 text-center"
            >
              {/* Ambient Radial Glow Accents */}
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-[90px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />

              {/* Title & Subtitle Content inside box */}
              <div className="relative z-10 flex flex-col items-center justify-center py-3 sm:py-6">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight mb-3 sm:mb-4">
                  Grand Prize Pool <span className="text-amber-400">{prizesData.totalPool}</span>
                </h2>

                <p className="text-xs sm:text-base md:text-lg text-slate-200 font-sans font-medium max-w-2xl leading-relaxed">
                  Compete for cash rewards, incubation opportunities, and national recognition.
                </p>
              </div>
            </GlassCard>
          </div>
        </ContainerScrollBox>
      </div>
    </Section>
  );
};





