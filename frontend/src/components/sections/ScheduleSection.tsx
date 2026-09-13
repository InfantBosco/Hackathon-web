import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Timeline, TimelineEntry } from '../ui/Timeline';
import { ContainerScrollBox } from '../ui/ContainerScrollBox';

export const ScheduleSection: React.FC = () => {
  const data: TimelineEntry[] = [
    {
      title: "Oct 8",
      content: (
        <ContainerScrollBox>
          <div className="p-6 sm:p-7 rounded-2xl bg-[#11121a]/95 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:border-white/60 hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-[1.025] hover:-translate-y-1.5 transition-all duration-300 text-left font-sans space-y-6 transform-gpu">
            <div className="space-y-4">
              {/* 7:30 AM - 8:30 AM */}
              <div className="space-y-1.5">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">07:30 AM — 08:30 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">External Participant Arrival, Registration & Kit Distribution</h5>
                <ul className="space-y-1 text-xs text-slate-400 font-sans leading-relaxed pl-0.5">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500 font-bold">•</span>
                    <span>Participant arrival</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500 font-bold">•</span>
                    <span>Registration: Confirm Attendance, Confirm Whatsapp group Addition, Confirm Kit collection</span>
                  </li>
                </ul>
              </div>

              {/* 8:30 AM - 8:45 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">08:30 AM — 08:45 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Participants Assemble at Emmanuel Auditorium</h5>
              </div>

              {/* 9:00 AM - 9:30 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">09:00 AM — 09:30 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Round 2 Opening Ceremony</h5>
              </div>

              {/* 9:30 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-widest uppercase">09:30 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Hackathon Begins — Round 2 (24-Hr Clock Starts)</h5>
              </div>

              {/* 9:30 AM - 12:00 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">09:30 AM — 12:00 PM (2h 30m)</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build Phase 1</h5>
              </div>

              {/* 12:00 PM - 1:00 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">12:00 PM — 01:00 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Lunch Break</h5>
              </div>

              {/* 1:00 PM - 4:00 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">01:00 PM — 04:00 PM (3 Hours)</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build Phase 2</h5>
              </div>

              {/* 4:00 PM - 4:15 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">04:00 PM — 04:15 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Afternoon Tea Break</h5>
              </div>

              {/* 4:15 PM - 5:15 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-widest uppercase">04:15 PM — 05:15 PM (1 Hour)</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Jury Round — Idea Pitch + Progress Check #1</h5>
              </div>

              {/* 5:15 PM - 7:30 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">05:15 PM — 07:30 PM (2h 15m)</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build Phase 3</h5>
              </div>

              {/* 7:30 PM - 8:30 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">07:30 PM — 08:30 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Dinner Break</h5>
              </div>

              {/* 8:30 PM - 10:30 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">08:30 PM — 10:30 PM (2 Hours)</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build Phase 4</h5>
              </div>

              {/* 10:30 PM - 10:45 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">10:30 PM — 10:45 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Ice Breaker Session</h5>
              </div>

              {/* 10:45 PM - 4:00 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-widest uppercase">10:45 PM — 04:00 AM (5h 15m)</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build Phase 5</h5>
                <p className="text-slate-400 text-xs font-sans leading-relaxed">Last-minute debugging, code freezes, and pitch deck preparation.</p>
              </div>

              {/* 4:00 AM - 6:30 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">04:00 AM — 06:30 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build Phase 6</h5>
                <p className="text-slate-400 text-xs font-sans leading-relaxed">Quiet coding hours; nap zone open for tired participants.</p>
              </div>

              {/* 6:30 AM - 8:00 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">06:30 AM — 08:00 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Breakfast Open</h5>
              </div>

              {/* 8:00 AM - 8:30 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">08:00 AM — 08:30 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Final Sprint — Last-Minute Debugging + Pitch Deck Prep</h5>
              </div>
            </div>
          </div>
        </ContainerScrollBox>
      ),
    },
    {
      title: "Oct 9",
      content: (
        <ContainerScrollBox>
          <div className="p-6 sm:p-7 rounded-2xl bg-[#11121a]/95 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:border-white/60 hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-[1.025] hover:-translate-y-1.5 transition-all duration-300 text-left font-sans space-y-6 transform-gpu">
            <div className="space-y-5">
              {/* 08:30 AM - 09:30 AM */}
              <div className="space-y-1.5">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">08:30 AM — 09:30 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Final Submission & Jury Screening</h5>
              </div>

              {/* 09:30 AM - 09:40 AM */}
              <div className="pt-4 border-t border-white/10 space-y-1.5">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">09:30 AM — 09:40 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Top 15 Finalists Announced</h5>
              </div>

              {/* 09:40 AM - 10:55 AM */}
              <div className="pt-4 border-t border-white/10 space-y-1.5">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-widest uppercase">09:40 AM — 10:55 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Final Pitch & Presentation</h5>
              </div>

              {/* 11:15 AM - 12:15 PM */}
              <div className="pt-4 border-t border-white/10 space-y-1.5">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">11:15 AM — 12:15 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Chief Guest Session</h5>
              </div>

              {/* 12:15 PM - 12:35 PM */}
              <div className="pt-4 border-t border-white/10 space-y-1.5">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-widest uppercase">12:15 PM — 12:35 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Awards & Prize Distribution</h5>
              </div>

              {/* 12:37 PM - 01:00 PM */}
              <div className="pt-4 border-t border-white/10 space-y-1.5">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">12:37 PM — 01:00 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Event Conclusion and Photos</h5>
              </div>
            </div>
          </div>
        </ContainerScrollBox>
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
