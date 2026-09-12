import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Timeline, TimelineEntry } from '../ui/Timeline';

export const ScheduleSection: React.FC = () => {
  const data: TimelineEntry[] = [
    {
      title: "Oct 7 : Day 1",
      content: (
        <div className="p-6 rounded-2xl bg-[#11121a]/90 border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.12)] hover:border-amber-400 transition-colors text-left font-sans">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
            <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
              09:00 AM — 05:00 PM
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              INTERNAL SPRINT
            </span>
          </div>

          <h4 className="text-lg font-heading font-bold text-white mb-2">
            Internal Hackathon
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>3 levels of screening</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Top 100 teams will be selected to advance</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Oct 8 : Day 2",
      content: (
        <div className="p-6 rounded-2xl bg-[#11121a]/90 border border-white/20 shadow-lg hover:border-amber-400/60 transition-colors text-left font-sans space-y-5">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-widest">
              MAIN 24-HOUR SPRINT
            </span>
            <span className="text-xs font-mono text-slate-400">OCTOBER 8</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm font-mono">
            <div className="space-y-1">
              <div className="text-amber-300 font-bold">09:00 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Opening Ceremony</h5>
              <p className="text-slate-400 text-xs font-sans">Welcome note, event guidelines, and team briefing.</p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-amber-300 font-bold">09:30 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Guest Talk</h5>
              <p className="text-slate-400 text-xs font-sans">Keynote address by industry leaders & technical mentors.</p>
            </div>

            <div className="pt-3 border-t border-amber-500/30 space-y-1 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="text-amber-300 font-bold tracking-wider">10:00 AM — TIMER STARTS</div>
              <h5 className="font-heading font-bold text-white text-base">24-Hour Non-Stop Hackathon Commences</h5>
              <p className="text-slate-300 text-xs font-sans">Teams start building solutions with live mentor guidance.</p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-300 font-bold">01:00 PM</div>
              <h5 className="font-heading font-bold text-white text-base">Lunch Break</h5>
              <p className="text-slate-400 text-xs font-sans">Networking and lunch break for participants.</p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-300 font-bold">05:00 PM</div>
              <h5 className="font-heading font-bold text-white text-base">Snack Break</h5>
              <p className="text-slate-400 text-xs font-sans">Evening snacks and mentor feedback check-in.</p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-300 font-bold">08:00 PM</div>
              <h5 className="font-heading font-bold text-white text-base">Dinner Break</h5>
              <p className="text-slate-400 text-xs font-sans">Dinner served, continuing into overnight building session.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Oct 9 : Day 3",
      content: (
        <div className="p-6 rounded-2xl bg-[#11121a]/90 border border-white/20 shadow-lg hover:border-amber-400/60 transition-colors text-left font-sans space-y-5">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-widest">
              FINALS & CEREMONY
            </span>
            <span className="text-xs font-mono text-slate-400">OCTOBER 9</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm font-mono">
            <div className="space-y-1">
              <div className="text-slate-300 font-bold">12:00 AM & 04:00 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Midnight & Early Refreshments</h5>
              <p className="text-slate-400 text-xs font-sans">Midnight and 4 AM energy snacks & tea/coffee.</p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-300 font-bold">07:00 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Breakfast</h5>
              <p className="text-slate-400 text-xs font-sans">Morning breakfast before final pitch prep.</p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-amber-300 font-bold">10:00 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Final Judgements</h5>
              <p className="text-slate-400 text-xs font-sans">Project presentations & live evaluation by judges.</p>
            </div>

            <div className="pt-3 border-t border-amber-500/30 space-y-1 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="text-amber-300 font-bold tracking-wider">12:00 PM</div>
              <h5 className="font-heading font-bold text-white text-base">Prize Distribution & Closing Ceremony</h5>
              <p className="text-slate-300 text-xs font-sans">Awarding winners of ₹1.5 Lakh prize pool and official closing ceremony.</p>
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
        subtitle="24 Hour National Level Hackathon Schedule"
        className="mb-6 md:mb-8"
      />

      <div className="max-w-5xl mx-auto">
        <Timeline data={data} />
      </div>
    </Section>
  );
};
