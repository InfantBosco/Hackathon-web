import React, { useState } from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { ContainerScrollBox } from '../ui/ContainerScrollBox';
import { Button } from '../ui/Button';
import { siteConfig } from '../../data/siteConfig';
import { FileText, Lock, Clock, Download, Cpu, Shield, Cloud, Database, Bot, Layers } from 'lucide-react';

export const DomainsSection: React.FC = () => {
  const [showNotice, setShowNotice] = useState(false);

  const handlePdfDownload = () => {
    if (siteConfig.problemStatementsPdfUrl) {
      window.open(siteConfig.problemStatementsPdfUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 3500);
    }
  };

  const themeBadges = [
    { name: 'AI & Local LLMs', icon: Cpu },
    { name: 'Agentic Systems', icon: Bot },
    { name: 'Data & Analytics', icon: Database },
    { name: 'Cloud Infrastructure', icon: Cloud },
    { name: 'Cybersecurity', icon: Shield },
    { name: 'Emerging Tech', icon: Layers },
  ];

  return (
    <Section id="domains" variant="primary">
      <SectionHeader
        badge="PS & THEME"
        title="Hackathon Theme & Problem Statements"
        subtitle="Explore our overarching innovation theme and prepare for problem statements release on the day of the event."
      />

      <div className="max-w-5xl mx-auto space-y-8 my-4">
        {/* CARD 1: OVERARCHING HACKATHON THEME */}
        <ContainerScrollBox className="w-full">
          <GlassCard
            glowColor="none"
            className="relative group border border-amber-500/35 hover:border-amber-400/70 bg-[#0b0c13]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(245,158,11,0.12)] p-7 sm:p-10 rounded-3xl overflow-hidden transition-all duration-300"
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

        {/* CARD 2: PROBLEM STATEMENTS (TO BE RELEASED) */}
        <ContainerScrollBox className="w-full">
          <GlassCard
            glowColor="none"
            className="relative group border border-white/35 hover:border-white/65 bg-[#0b0c13]/98 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,255,255,0.18)] p-7 sm:p-10 rounded-3xl overflow-hidden transition-all duration-300"
          >
            {/* Ambient Background Accents */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/15 blur-[80px] rounded-full pointer-events-none" />

            {/* Card Header & Status Badge */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/15 border border-white/25 text-white shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-slate-300">
                    CHALLENGE TRACKS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-tight mt-0.5">
                    Problem Statements
                  </h3>
                </div>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>To be Released</span>
              </div>
            </div>

            {/* Description Body */}
            <div className="relative z-10 my-4 max-w-3xl">
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-medium">
                Official problem statements and track guidelines will be released on the day of the hackathon. Participants will be able to view and download the complete Problem Statements PDF right here.
              </p>
            </div>

            {/* Action Area & PDF Download Button */}
            <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={handlePdfDownload}
                leftIcon={
                  siteConfig.problemStatementsPdfUrl ? (
                    <Download className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400" />
                  )
                }
                className="w-full sm:w-auto font-royal font-bold tracking-wider uppercase text-xs sm:text-sm !py-3.5 px-6"
              >
                {siteConfig.problemStatementsPdfUrl ? 'Download Problem Statements (PDF)' : 'Problem Statements: To be Released'}
              </Button>

              {/* Notice Banner if PDF not yet uploaded */}
              {showNotice && (
                <div className="animate-fadeIn py-2.5 px-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Problem Statements PDF will be uploaded here on the day of the hackathon!</span>
                </div>
              )}
            </div>
          </GlassCard>
        </ContainerScrollBox>
      </div>
    </Section>
  );
};
