import React, { useState, useMemo } from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { ContainerScrollBox } from '../ui/ContainerScrollBox';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { siteConfig } from '../../data/siteConfig';
import { problemStatementsData } from '../../data/problemStatementsData';
import { 
  FileText, 
  Lock, 
  Clock, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  FileCheck,
  Cpu,
  Layers,
  Bot,
  Brain,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Tracks (8)' },
  { id: 'agentic', label: 'Agentic AI (1)' },
  { id: 'genai', label: 'Generative AI (3)' },
  { id: 'cv', label: 'Computer Vision (3)' },
  { id: 'localllms', label: 'Edge AI (1)' },
];

export const ProblemStatementsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNotice, setShowNotice] = useState(false);

  const filteredStatements = useMemo(() => {
    if (selectedCategory === 'all') return problemStatementsData;
    return problemStatementsData.filter((item) => item.domainId === selectedCategory);
  }, [selectedCategory]);

  const handleFallbackClick = () => {
    if (!siteConfig.problemStatementsPdfUrl) {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 3500);
    }
  };

  const getDomainIcon = (domainId: string) => {
    switch (domainId) {
      case 'agentic':
        return <Bot className="w-4 h-4 text-rose-400" />;
      case 'genai':
        return <Brain className="w-4 h-4 text-cyan-400" />;
      case 'cv':
        return <Eye className="w-4 h-4 text-amber-400" />;
      case 'localllms':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-white" />;
    }
  };

  const isReleased = Boolean(siteConfig.problemStatementsPdfUrl);

  return (
    <Section id="problem-statements" variant="secondary">
      <SectionHeader
        badge="PROBLEM STATEMENTS"
        title="Challenge Tracks & Problem Statements"
        subtitle={
          isReleased
            ? "Official problem statements and track guidelines are now live. Download the PDF or explore the challenges below."
            : "Official problem statement guidelines and track details will be released on the day of the hackathon."
        }
      />

      <div className="max-w-5xl mx-auto my-4 space-y-8">
        {/* HERO DOWNLOAD CARD */}
        <ContainerScrollBox className="w-full">
          <GlassCard
            glowColor="none"
            className="relative group border border-white/40 hover:border-white/70 bg-[#0c0e1a] backdrop-blur-3xl shadow-[0_0_60px_rgba(255,255,255,0.22)] p-7 sm:p-10 rounded-3xl overflow-hidden transition-all duration-300 opacity-100"
          >
            {/* Ambient Background Accents */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500/15 blur-[80px] rounded-full pointer-events-none" />

            {/* Card Header & Status Badge */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-white/20 border border-white/30 text-white shadow-md">
                  <FileText className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-slate-300">
                    OFFICIAL RELEASE · HACKNEX 2026
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-tight mt-0.5">
                    Problem Statements Document
                  </h3>
                </div>
              </div>

              {/* Status Badge */}
              {isReleased ? (
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Released & Downloadable</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-amber-500/25 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                  <Clock className="w-4 h-4 animate-pulse text-amber-400" />
                  <span>To be Released</span>
                </div>
              )}
            </div>

            {/* Description Body */}
            <div className="relative z-10 my-4 max-w-3xl">
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-medium">
                {isReleased
                  ? "The official HackNEX 2026 Problem Statements document is now published! Explore all 8 challenge tracks across Agentic AI, Generative AI, Computer Vision, and Edge AI. Review the technical baseline to beat, stretch goals, and judging rubrics for each statement below."
                  : "Official problem statements and track guidelines will be released on the day of the hackathon. Participants will be able to view and download the complete Problem Statements PDF right here."}
              </p>

              {/* Metadata Highlights Bar */}
              {isReleased && (
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                    14 Pages Document
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    8 Problem Statements
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    4 Innovation Tracks
                  </span>
                </div>
              )}
            </div>

            {/* Action Area & PDF Download Buttons */}
            <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {isReleased ? (
                <>
                  <Button
                    asChild
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto font-royal font-black tracking-wider uppercase text-xs sm:text-sm !py-3.5 px-7 shadow-lg"
                  >
                    <a
                      href={siteConfig.problemStatementsPdfUrl}
                      download="HackNEX_2026_Problem_Statements.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4 text-black" />
                      <span>Download Problem Statements (PDF)</span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto font-royal font-bold tracking-wider uppercase text-xs sm:text-sm !py-3.5 px-6 shadow-md"
                  >
                    <a
                      href={siteConfig.problemStatementsPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-amber-400" />
                      <span>View PDF in New Tab</span>
                    </a>
                  </Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleFallbackClick}
                  leftIcon={<Lock className="w-4 h-4 text-slate-300" />}
                  className="w-full sm:w-auto font-royal font-bold tracking-wider uppercase text-xs sm:text-sm !py-3.5 px-6 shadow-md"
                >
                  Problem Statements: To be Released
                </Button>
              )}

              {/* Notice Banner if PDF not yet uploaded */}
              {showNotice && (
                <div className="animate-fadeIn py-2.5 px-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 shadow-md">
                  <Clock className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Problem Statements PDF will be uploaded here on the day of the hackathon!</span>
                </div>
              )}
            </div>
          </GlassCard>
        </ContainerScrollBox>

        {/* BROWSE ALL 8 PROBLEM STATEMENTS */}
        {isReleased && (
          <div className="space-y-6 pt-4">
            {/* Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-white font-heading font-bold text-lg uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span>Explore Challenges by Domain</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid of Problem Statement Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredStatements.map((statement) => (
                <ContainerScrollBox key={statement.code} className="h-full">
                  <GlassCard
                    glowColor="none"
                    className="h-full flex flex-col justify-between border border-white/20 hover:border-white/50 bg-[#0d0e17]/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,255,255,0.12)] group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          {getDomainIcon(statement.domainId)}
                          <Badge variant={statement.tagColor}>{statement.category}</Badge>
                        </div>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/10 border border-white/15 text-amber-300">
                          {statement.code}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg sm:text-xl font-heading font-black text-white group-hover:text-amber-300 transition-colors mb-2.5">
                        {statement.title}
                      </h4>

                      {/* Pitch */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-medium mb-4">
                        {statement.pitch}
                      </p>

                      {/* Key Highlights */}
                      <div className="space-y-1.5 mb-5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                          Key Deliverables & Workflows:
                        </span>
                        {statement.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Area: Skills & Direct PDF Link */}
                    <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {statement.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-mono text-slate-400">
                          PDF Page {statement.pdfPage}
                        </span>
                        <a
                          href={`${siteConfig.problemStatementsPdfUrl}#page=${statement.pdfPage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 hover:text-amber-200 transition-colors"
                        >
                          <span>Read Full Spec</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </GlassCard>
                </ContainerScrollBox>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};
