import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Timeline, TimelineEntry } from '../ui/Timeline';

export const ScheduleSection: React.FC = () => {
  const data: TimelineEntry[] = [
    {
      title: "Oct 8",
      content: (
        <div className="p-6 rounded-2xl bg-[#11121a]/90 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300 text-left font-sans space-y-5">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-widest">
              MAIN 24-HOUR SPRINT
            </span>
            <span className="text-xs font-mono text-slate-400">OCTOBER 8</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm font-mono">
            <div className="space-y-1">
              <div className="text-slate-200 font-bold">09:00 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Opening Ceremony</h5>
              <p className="text-slate-400 text-xs font-sans">Welcome note, event guidelines, and team briefing.</p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-200 font-bold">09:30 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Guest Talk</h5>
              <p className="text-slate-400 text-xs font-sans">Keynote address by industry leaders & technical mentors.</p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-200 font-bold tracking-wider">10:00 AM — TIMER STARTS</div>
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
      title: "Oct 9",
      content: (
        <div className="p-6 rounded-2xl bg-[#11121a]/90 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300 text-left font-sans space-y-5">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-widest">
              FINALS & CEREMONY
            </span>
            <span className="text-xs font-mono text-slate-400">OCTOBER 9</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm font-mono">
            {/* 12:00 AM & 04:00 AM */}
            <div className="space-y-1">
              <div className="text-slate-300 font-bold">12:00 AM & 04:00 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Midnight & Early Refreshments</h5>
              <p className="text-slate-400 text-xs font-sans">Midnight and 4:00 AM energy snacks & tea/coffee for hackers.</p>
            </div>

            {/* 07:00 AM */}
            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-300 font-bold">07:00 AM - 08:00 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Breakfast</h5>
              <p className="text-slate-400 text-xs font-sans">Morning breakfast before final pitch prep.</p>
            </div>

            {/* 08:30 AM - 09:30 AM */}
            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-200 font-bold">08:30 AM - 09:30 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Jury Screening Round & Pitch Prep</h5>
              <ul className="space-y-1 text-xs text-slate-300 font-sans list-disc list-inside">
                <li>Panel reviews all submissions and shortlists Top 15 teams.</li>
                <li>Students prepare Final Round Pitch, Business Model & Presentation.</li>
              </ul>
            </div>

            {/* 09:30 AM - 09:40 AM */}
            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-200 font-bold">09:30 AM - 09:40 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Top 15 Finalists Announced (Round 3)</h5>
              <p className="text-slate-400 text-xs font-sans">Top 15 teams announced. Other participants relax and move to auditorium for ice breaker.</p>
            </div>

            {/* 09:40 AM - 10:55 AM */}
            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-200 font-bold tracking-wider">09:40 AM - 10:55 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Finalist Pitch Presentations</h5>
              <p className="text-slate-300 text-xs font-sans">Finalists move to 3 parallel pitch rooms/stages (Panels A / B / C — 5 teams each, 15 mins per team).</p>
            </div>

            {/* 10:55 AM - 11:30 AM */}
            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-300 font-bold">10:55 AM - 11:30 AM</div>
              <h5 className="font-heading font-bold text-white text-base">Auditorium Gathering & Final Evaluation</h5>
              <ul className="space-y-1 text-xs text-slate-400 font-sans list-disc list-inside">
                <li>10:55 AM – 11:05 AM: Students move to Emmanuel Auditorium.</li>
                <li>10:55 AM – 11:30 AM: Jury finalizes overall Top 5 winners.</li>
              </ul>
            </div>

            {/* 11:15 AM - 12:15 PM */}
            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-200 font-bold">11:15 AM - 12:15 PM</div>
              <h5 className="font-heading font-bold text-white text-base">Chief Guest Talk</h5>
              <p className="text-slate-400 text-xs font-sans">Keynote address by Chief Guest (60 mins).</p>
            </div>

            {/* 12:15 PM - 12:35 PM */}
            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-200 font-bold tracking-wider">12:15 PM - 12:35 PM</div>
              <h5 className="font-heading font-bold text-white text-base">Awards Ceremony & Prize Distribution</h5>
              <p className="text-slate-300 text-xs font-sans">Official awards ceremony and prize distribution for winners.</p>
            </div>

            {/* 12:35 PM - 01:30 PM */}
            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-slate-300 font-bold">12:35 PM - 01:30 PM</div>
              <h5 className="font-heading font-bold text-white text-base">Vote of Thanks & Group Photos</h5>
              <p className="text-slate-400 text-xs font-sans">Vote of thanks followed by group photos. Event officially concludes at 1:30 PM.</p>
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
