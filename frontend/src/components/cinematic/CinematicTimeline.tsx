import React, { useRef, useState, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Zap,
  Coffee,
  Award,
  Terminal,
  ChevronRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { scheduleData, ScheduleEvent } from '../../data/scheduleData';

gsap.registerPlugin(ScrollTrigger);

export const CinematicTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0); // Starts on Stage 1
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const activeDay = scheduleData[activeDayIndex] || scheduleData[0];

  // Filter events based on active category filter
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') return activeDay.events;
    return activeDay.events.filter((e) => e.category === selectedCategory);
  }, [activeDay, selectedCategory]);

  // Clean Warm Amber & Dark Obsidian styling — NO BLUE GLOW
  const stageTheme = {
    activeTabBorder: 'border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.25)]',
    activeTabBg: 'bg-amber-400/10',
    badgeBg: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
    pillBg: 'bg-amber-400 text-black',
    lineGlow: 'from-amber-400 via-yellow-400 to-amber-500',
    textAccent: 'text-amber-400',
  };

  // Category Icon & Badge Styling helper — NO BLUE GLOW
  const getCategoryMeta = (cat: ScheduleEvent['category']) => {
    switch (cat) {
      case 'build':
        return {
          label: 'BUILD SPRINT',
          icon: Zap,
          color: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
        };
      case 'jury':
        return {
          label: 'JURY EVALUATION',
          icon: ShieldCheck,
          color: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
        };
      case 'break':
        return {
          label: 'REFUEL & CHILL',
          icon: Coffee,
          color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
        };
      case 'ceremony':
        return {
          label: 'CEREMONY / KEYNOTE',
          icon: Award,
          color: 'text-yellow-300 border-yellow-400/30 bg-yellow-400/10',
        };
      case 'registration':
      default:
        return {
          label: 'REGISTRATION',
          icon: Terminal,
          color: 'text-slate-300 border-white/20 bg-white/5',
        };
    }
  };

  // Scroll sequence:
  // 1. Stage 1 box spawns quickly and smoothly
  // 2. Stage 2 box spawns next
  // 3. Stage 3 box spawns next
  // 4. After all 3 have appeared, lower content appears smoothly
  // No jumping highlights while scrolling!
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!sectionRef.current) return;
    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(['.stage-box-0', '.stage-box-1', '.stage-box-2', '.schedule-lower-content'], {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
        });
        return;
      }

      // Initial state: hide boxes before scroll sequence triggers on BOTH mobile & desktop
      gsap.set('.stage-box-0', { opacity: 0, y: 24, scale: 0.96 });
      gsap.set('.stage-box-1', { opacity: 0, y: 24, scale: 0.96 });
      gsap.set('.stage-box-2', { opacity: 0, y: 24, scale: 0.96 });
      gsap.set('.schedule-lower-content', { opacity: 0, y: 28, filter: isDesktop ? 'blur(6px)' : 'none' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isDesktop ? '+=1200' : '+=950',
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          onEnter: () => {
            (window as any).__scheduleActive = true;
          },
          onLeave: () => {
            (window as any).__scheduleActive = false;
          },
          onEnterBack: () => {
            (window as any).__scheduleActive = true;
          },
          onLeaveBack: () => {
            (window as any).__scheduleActive = false;
          },
        },
      });

      // 1. First, Stage 1 box spawns
      tl.to('.stage-box-0', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: 'power2.out',
      });
      tl.to({}, { duration: 0.08 }); // Quick hold

      // 2. Next, Stage 2 box spawns
      tl.to('.stage-box-1', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: 'power2.out',
      });
      tl.to({}, { duration: 0.08 }); // Quick hold

      // 3. Next, Stage 3 box spawns
      tl.to('.stage-box-2', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: 'power2.out',
      });
      tl.to({}, { duration: 0.12 }); // Quick hold after all 3 boxes are spawned

      // 4. After the appearance of all 3 one by one, next the boxes below appear smoothly
      tl.to('.schedule-lower-content', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.65,
        ease: 'power2.out',
      });
      tl.to({}, { duration: 0.25 }); // Final settling hold
    }, sectionRef);

    return () => {
      ctx.revert();
      delete (window as any).__scheduleActive;
    };
  }, []);

  // Animate milestone items with a smooth stagger when stage or category changes
  useLayoutEffect(() => {
    if (!cardsContainerRef.current) return;
    const cards = cardsContainerRef.current.querySelectorAll('.milestone-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 14, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.03, duration: 0.3, ease: 'power2.out' }
    );
  }, [activeDayIndex, selectedCategory]);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative min-h-screen flex flex-col justify-center pt-20 lg:pt-14 pb-8 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 lg:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-300 font-semibold">
              HACKATHON PROTOCOL & SCHEDULE
            </span>
          </div>

          <h2
            className="font-heading font-black tracking-tight text-white mb-1"
            style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)' }}
          >
            Event Schedule & Stages
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto">
            Scroll to reveal Stage 1, Stage 2, Stage 3 and their milestone protocols.
          </p>
        </div>

        {/* Stage Selector Boxes: Spawn sequentially 1 by 1 on scroll — sleek modern glass tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {scheduleData.map((day, idx) => {
            const isSelected = idx === activeDayIndex;
            const isDay2 = day.id === 2;

            return (
              <button
                key={day.id}
                onClick={() => {
                  setActiveDayIndex(idx);
                  setSelectedCategory('all');
                }}
                className={`stage-box-${idx} will-change-transform relative group text-left rounded-2xl p-4 transition-all duration-300 border backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-lg ${
                  isSelected
                    ? 'border-amber-400/50 bg-slate-950/85 shadow-[0_4px_25px_rgba(245,158,11,0.12)]'
                    : 'border-white/[0.08] bg-slate-950/50 hover:border-white/20 hover:bg-slate-900/60'
                }`}
              >
                {/* Active Top Accent Line */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500" />
                )}

                {/* Top Row: Stage Tag & Date */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-md border ${
                        isSelected
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                          : 'bg-white/[0.04] text-slate-400 border-white/10'
                      }`}
                    >
                      {day.stageNumber}
                    </span>

                    {isDay2 && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-300">
                        <Flame className="w-2.5 h-2.5 text-rose-400" />
                        24H LIVE
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-slate-400 tracking-wider">
                    {day.date.split(',')[0]}
                  </span>
                </div>

                {/* Middle: Title & Tagline */}
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg tracking-tight mb-0.5 text-white group-hover:text-amber-300 transition-colors">
                    {day.dayLabel.split('—')[1]?.trim() || day.dayLabel}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{day.tagline}</p>
                </div>

                {/* Bottom Row: Micro stats */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{day.events.length} Milestones</span>
                  <div className="flex items-center gap-1 font-medium text-slate-300 group-hover:text-amber-300 transition-colors">
                    <span>{day.duration}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400/80 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Lower Content: Appears smoothly AFTER all 3 stage boxes have spawned */}
        <div className="schedule-lower-content will-change-transform grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column (Stage Control HUD Panel) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-slate-950/75 backdrop-blur-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              {/* Stage Badge & Title */}
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className={`text-xs font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${stageTheme.badgeBg}`}
                >
                  {activeDay.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE RUN
                </span>
              </div>

              <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight mb-1.5">
                {activeDay.dayLabel}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeDay.tagline}
              </p>

              {/* Location & Details Info Rows — Modern, decluttered & sleek */}
              <div className="my-4 py-3.5 border-y border-white/[0.08] space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-medium">Zone Location</span>
                    <span className="text-xs text-slate-200 font-medium leading-snug">{activeDay.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-medium">Schedule Window</span>
                    <span className="text-xs text-slate-200 font-medium leading-snug">{activeDay.date} • {activeDay.duration}</span>
                  </div>
                </div>
              </div>

              {/* Category Filter Buttons */}
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  FILTER MILESTONES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: `All (${activeDay.events.length})` },
                    {
                      id: 'build',
                      label: `Build (${activeDay.events.filter((e) => e.category === 'build').length})`,
                    },
                    {
                      id: 'jury',
                      label: `Jury (${activeDay.events.filter((e) => e.category === 'jury').length})`,
                    },
                    {
                      id: 'break',
                      label: `Breaks (${activeDay.events.filter((e) => e.category === 'break').length})`,
                    },
                    {
                      id: 'ceremony',
                      label: `Ceremony (${
                        activeDay.events.filter((e) => e.category === 'ceremony').length
                      })`,
                    },
                  ]
                    .filter((btn) => btn.id === 'all' || !btn.label.endsWith('(0)'))
                    .map((btn) => {
                      const isFilterActive = selectedCategory === btn.id;
                      return (
                        <button
                          key={btn.id}
                          onClick={() => setSelectedCategory(btn.id)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg font-mono transition-all duration-200 border ${
                            isFilterActive
                              ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-sm'
                              : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {btn.label}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Quick Tip Footer */}
            <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-300/90 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Attendance Mandatory
              </span>
              <span className="text-slate-400 font-semibold">HACKNEX '26</span>
            </div>
          </div>

          {/* Right Column (Clean Milestone Cards Stream) */}
          <div
            ref={cardsContainerRef}
            className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-slate-950/75 backdrop-blur-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden"
          >
            {/* Header info */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  TIMELINE STREAM ({filteredEvents.length} OF {activeDay.events.length} EVENTS)
                </span>
              </div>
              <span className="text-xs font-mono text-amber-400/90 font-medium">IST (UTC +5:30)</span>
            </div>

            {/* Scrollable Milestone Stream (Clean modern list) */}
            <div className="space-y-2.5 max-h-[380px] lg:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredEvents.map((event, idx) => {
                const meta = getCategoryMeta(event.category);
                const IconComponent = meta.icon;
                const isHighlight = event.highlight;

                return (
                  <div
                    key={`${activeDay.id}-${idx}-${event.time}`}
                    className={`milestone-card relative group rounded-xl p-3.5 sm:p-4 border transition-all duration-200 ${
                      isHighlight
                        ? 'border-amber-400/40 bg-gradient-to-r from-amber-400/[0.08] via-slate-900/60 to-slate-900/50 border-l-4 border-l-amber-400 shadow-[0_4px_16px_rgba(245,158,11,0.06)]'
                        : 'border-white/[0.06] bg-slate-900/40 hover:bg-slate-900/70 hover:border-white/15'
                    }`}
                  >
                    {/* Top Row: Clean Time & Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-semibold">
                          <Clock className="w-3.5 h-3.5 text-amber-400/90" />
                          <span>{event.time}</span>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border ${meta.color}`}
                        >
                          <IconComponent className="w-2.5 h-2.5" />
                          {meta.label}
                        </span>
                      </div>

                      {isHighlight && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-400/15 text-amber-300 border border-amber-400/30 font-semibold tracking-wider">
                          KEY MILESTONE
                        </span>
                      )}
                    </div>

                    {/* Event Title */}
                    <h4 className="font-heading font-bold text-sm sm:text-base text-white tracking-tight mb-1 group-hover:text-amber-200 transition-colors">
                      {event.title}
                    </h4>

                    {/* Event Description */}
                    <p className="text-xs text-slate-300/90 leading-relaxed font-sans">
                      {event.description}
                    </p>
                  </div>
                );
              })}

              {filteredEvents.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-xs font-mono">
                  No events found in this category. Select "All" to view the full agenda.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


