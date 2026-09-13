import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { ContainerScrollBox } from '../ui/ContainerScrollBox';
import { Cpu, Shield, Cloud, Database, Bot, Layers } from 'lucide-react';

export const ThemeSection: React.FC = () => {
  const themeBadges = [
    { name: 'AI & Local LLMs', icon: Cpu },
    { name: 'Agentic Systems', icon: Bot },
    { name: 'Data & Analytics', icon: Database },
    { name: 'Cloud Infrastructure', icon: Cloud },
    { name: 'Cybersecurity', icon: Shield },
    { name: 'Emerging Tech', icon: Layers },
  ];

  return (
    <Section id="theme" variant="primary">
      <SectionHeader
        badge="HACKATHON THEME"
        title="Overarching Innovation Theme"
        subtitle="Explore our core technical focus driving solutions at HackNEX 2026."
      />

      <div className="max-w-5xl mx-auto my-4">
        <ContainerScrollBox className="w-full">
          <GlassCard
            glowColor="none"
            className="relative group border border-amber-500/35 hover:border-amber-400/70 bg-[#0b0c13]/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(245,158,11,0.12)] p-7 sm:p-10 rounded-3xl overflow-hidden transition-all duration-300"
          >
            {/* Ambient Background Radial Glow & Accents */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Card Header */}
            <div className="relative z-10 mb-4">
              <span
                className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-amber-400 block"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                HACKATHON OVERARCHING THEME
              </span>
            </div>

            {/* Main Theme Statement */}
            <div className="relative z-10 my-4">
              <h3 className="text-base sm:text-lg md:text-xl font-sans font-semibold text-slate-100 leading-relaxed tracking-normal">
                "Develop innovative software solutions leveraging AI, local LLMs, agentic systems, data, cloud, cybersecurity, and emerging technologies to solve complex technical challenges."
              </h3>
            </div>

            {/* Tech Focus Badges Grid */}
            <div className="relative z-10 pt-6 border-t border-white/10 mt-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-3.5">
                CORE TECHNICAL FOCUS AREAS
              </span>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {themeBadges.map((badge, idx) => {
                  const IconComp = badge.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-[#131524]/90 border border-white/10 group-hover:border-amber-500/30 text-xs font-heading font-semibold text-slate-200 shadow-sm transition-all hover:scale-[1.03]"
                    >
                      <IconComp className="w-4 h-4 text-amber-400" />
                      <span>{badge.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </ContainerScrollBox>
      </div>
    </Section>
  );
};
