import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Timeline, TimelineEntry } from '../ui/Timeline';
import { Clock, CheckCircle2, Award, Utensils, Coffee, Zap, Sparkles, Flame, Presentation } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const data: TimelineEntry[] = [
    {
      title: "Oct 7 : Day 1",
      content: (
        <div className="space-y-4">
          <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
            Internal Hackathon screening & selection sprint at Karunya Institute of Technology and Sciences.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 rounded-2xl bg-[#13141c]/90 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:border-amber-400/60 transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Clock className="w-3.5 h-3.5" />
                  09:00 AM - 05:00 PM
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 3 Levels Screening
                </span>
              </div>
              <h4 className="text-lg font-heading font-bold text-white mb-2">
                Internal Hackathon
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                Competitive multi-round internal screening sprint. Top 100 teams will be selected to advance to the main 24-hour hackathon.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-slate-300 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Level 1: Pitch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Level 2: Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Level 3: Prototype</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Top 100 Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Oct 8 : Day 2",
      content: (
        <div className="space-y-4">
          <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
            Main 24-Hour National Level Hackathon kickoff, keynote address, and overnight coding sprint.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#13141c]/90 border border-white/15 hover:border-white/40 transition-all duration-300 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  <Clock className="w-3.5 h-3.5" /> 09:00 AM
                </span>
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-1 flex items-center gap-2">
                <Presentation className="w-4 h-4 text-cyan-400" /> Opening Ceremony
              </h4>
              <p className="text-xs text-slate-400">Welcome note, event guidelines, and team briefing.</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#13141c]/90 border border-white/15 hover:border-white/40 transition-all duration-300 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  <Clock className="w-3.5 h-3.5" /> 09:30 AM
                </span>
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" /> Guest Talk
              </h4>
              <p className="text-xs text-slate-400">Keynote address by industry leaders & mentors.</p>
            </div>

            <div className="sm:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-[#181926] to-[#12131f] border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:border-amber-400 transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/30 text-amber-200 border border-amber-400/50 animate-pulse">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> 10:00 AM — COMMENCES
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">24 HOUR TIMER</span>
              </div>
              <h4 className="text-base sm:text-lg font-heading font-bold text-white mb-1">
                24-Hour Non-Stop Hackathon Commences
              </h4>
              <p className="text-xs text-slate-300">Teams start building their solutions with live mentor guidance.</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#13141c]/90 border border-white/15 hover:border-white/40 transition-all duration-300 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <Clock className="w-3.5 h-3.5" /> 01:00 PM
                </span>
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-1 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" /> Lunch Break
              </h4>
              <p className="text-xs text-slate-400">Networking and lunch break for participants.</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#13141c]/90 border border-white/15 hover:border-white/40 transition-all duration-300 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
                  <Clock className="w-3.5 h-3.5" /> 05:00 PM
                </span>
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-1 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-orange-400" /> Snack Break
              </h4>
              <p className="text-xs text-slate-400">Evening snacks and mentor feedback check-in.</p>
            </div>

            <div className="sm:col-span-2 p-4 sm:p-5 rounded-2xl bg-[#13141c]/90 border border-white/15 hover:border-white/40 transition-all duration-300 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  <Clock className="w-3.5 h-3.5" /> 08:00 PM
                </span>
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-1 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-rose-400" /> Dinner Break
              </h4>
              <p className="text-xs text-slate-400">Dinner served, continuing into overnight building session.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Oct 9 : Day 3",
      content: (
        <div className="space-y-4">
          <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
            Overnight sprint completion, project evaluation, live judging, and grand prize distribution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#13141c]/90 border border-white/15 hover:border-white/40 transition-all duration-300 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  <Clock className="w-3.5 h-3.5" /> 12:00 AM & 04:00 AM
                </span>
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-1 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-blue-400" /> Refreshments
              </h4>
              <p className="text-xs text-slate-400">Midnight and 4am energy snacks & tea/coffee.</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#13141c]/90 border border-white/15 hover:border-white/40 transition-all duration-300 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <Clock className="w-3.5 h-3.5" /> 07:00 AM
                </span>
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-1 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" /> Breakfast
              </h4>
              <p className="text-xs text-slate-400">Morning breakfast before final pitch prep.</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#13141c]/90 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Clock className="w-3.5 h-3.5" /> 10:00 AM
                </span>
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-1 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" /> Final Judgements
              </h4>
              <p className="text-xs text-slate-400">Project presentation & live evaluation by judges.</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-[#161722] to-yellow-950/40 border border-amber-400/50 shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:border-yellow-300 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/20 text-amber-200 border border-amber-400/60">
                  <Clock className="w-3.5 h-3.5" /> 12:00 PM
                </span>
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-1 flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" /> Prize Distribution & Closing
              </h4>
              <p className="text-xs text-slate-300">Awarding winners of Rs. 1.5 Lakh prize pool and closing ceremony.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Section id="schedule" variant="primary" className="py-16 md:py-24">
      <SectionHeader
        badge="TIMELINE"
        title="EVENT SCHEDULE"
        subtitle="October 7–9, 2026 • Karunya Institute of Technology and Sciences, Coimbatore"
        className="mb-6 md:mb-8"
      />

      <div className="max-w-6xl mx-auto">
        <Timeline data={data} />
      </div>
    </Section>
  );
};
