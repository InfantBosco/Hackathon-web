import React, { useState } from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { ContainerScrollBox } from '../ui/ContainerScrollBox';
import { Button } from '../ui/Button';
import { siteConfig } from '../../data/siteConfig';
import { FileText, Lock, Clock, Download } from 'lucide-react';

export const ProblemStatementsSection: React.FC = () => {
  const [showNotice, setShowNotice] = useState(false);

  const handlePdfDownload = () => {
    if (siteConfig.problemStatementsPdfUrl) {
      window.open(siteConfig.problemStatementsPdfUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 3500);
    }
  };

  return (
    <Section id="problem-statements" variant="secondary">
      <SectionHeader
        badge="PROBLEM STATEMENTS"
        title="Challenge Tracks & Problem Statements"
        subtitle="Official problem statement guidelines and track details will be released prior to the event."
      />

      <div className="max-w-5xl mx-auto my-4">
        <ContainerScrollBox className="w-full">
          <GlassCard
            glowColor="none"
            className="relative group border border-white/40 hover:border-white/70 bg-[#0c0e1a] backdrop-blur-3xl shadow-[0_0_60px_rgba(255,255,255,0.22)] p-7 sm:p-10 rounded-3xl overflow-hidden transition-all duration-300 opacity-100"
          >
            {/* Ambient Background Accents */}
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-500/20 blur-[70px] rounded-full pointer-events-none" />
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-500/10 blur-[70px] rounded-full pointer-events-none" />

            {/* Card Header & Status Badge */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-white/20 border border-white/30 text-white shadow-md">
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
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-amber-500/25 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                <Clock className="w-4 h-4 animate-pulse text-amber-400" />
                <span>To be Released</span>
              </div>
            </div>

            {/* Description Body */}
            <div className="relative z-10 my-4 max-w-3xl">
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-medium">
                Official problem statements and track guidelines will be released prior to the hackathon. Participants will be able to view and download the complete Problem Statements PDF right here.
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
                    <Lock className="w-4 h-4 text-slate-300" />
                  )
                }
                className="w-full sm:w-auto font-royal font-bold tracking-wider uppercase text-xs sm:text-sm !py-3.5 px-6 shadow-md"
              >
                {siteConfig.problemStatementsPdfUrl ? 'Download Problem Statements (PDF)' : 'Problem Statements: To be Released'}
              </Button>

              {/* Notice Banner if PDF not yet uploaded */}
              {showNotice && (
                <div className="animate-fadeIn py-2.5 px-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 shadow-md">
                  <Clock className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Problem Statements PDF will be uploaded here prior to the event!</span>
                </div>
              )}
            </div>
          </GlassCard>
        </ContainerScrollBox>
      </div>
    </Section>
  );
};
