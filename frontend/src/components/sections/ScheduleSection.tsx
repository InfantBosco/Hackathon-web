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
          <div className="p-4 sm:p-7 rounded-2xl bg-[#11121a]/95 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:border-white/60 hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-[1.025] hover:-translate-y-1.5 transition-all duration-300 text-left font-sans space-y-6 transform-gpu">
            <div className="space-y-4">
              {/* 7:30 AM - 8:30 AM */}
              <div className="space-y-1.5">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">07:30 AM — 08:30 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Participant Arrival & Registration</h5>
                <p className="text-slate-300 text-xs font-sans leading-relaxed flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">•</span> Exclusive HackNex Kit distribution!
                </p>
              </div>

              {/* 8:30 AM - 9:30 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">08:30 AM — 09:30 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Opening Ceremony & Hackathon Briefing</h5>
              </div>

              {/* 9:30 AM - 12:00 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">09:30 AM — 12:00 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build Phase #1</h5>
              </div>

              {/* 12:00 PM - 1:00 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">12:00 PM — 01:00 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Lunch Break</h5>
              </div>

              {/* 1:00 PM - 4:00 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">01:00 PM — 04:00 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build Phase #2</h5>
              </div>

              {/* 4:00 PM - 4:15 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">04:00 PM — 04:15 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Break</h5>
              </div>

              {/* 4:15 PM - 5:15 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">04:15 PM — 05:15 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Jury Review & Progress Check</h5>
              </div>

              {/* 5:15 PM - 7:30 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">05:15 PM — 07:30 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build Phase #3</h5>
              </div>

              {/* 7:30 PM - 8:30 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">07:30 PM — 08:30 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Dinner Break</h5>
              </div>

              {/* 8:30 PM - 10:30 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">08:30 PM — 10:30 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build Phase #4</h5>
              </div>

              {/* 10:30 PM - 10:45 PM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">10:30 PM — 10:45 PM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Break</h5>
              </div>

              {/* 10:45 PM - 4:00 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">10:45 PM — 04:00 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Overnight Build</h5>
              </div>

              {/* 4:00 AM - 6:30 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">04:00 AM — 06:30 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Build & Development</h5>
              </div>

              {/* 6:30 AM - 8:00 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">06:30 AM — 08:00 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Breakfast Break</h5>
              </div>

              {/* 8:00 AM - 8:30 AM */}
              <div className="pt-3.5 border-t border-white/10 space-y-1">
                <div className="font-royal font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">08:00 AM — 08:30 AM</div>
                <h5 className="font-heading font-semibold text-slate-100 text-sm sm:text-base">Final Sprint & Submission Preparation</h5>
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
          <div className="p-4 sm:p-7 rounded-2xl bg-[#11121a]/95 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:border-white/60 hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-[1.025] hover:-translate-y-1.5 transition-all duration-300 text-left font-sans space-y-6 transform-gpu">
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
