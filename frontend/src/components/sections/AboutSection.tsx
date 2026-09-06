import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Card } from '../ui/Card';
import { Counter } from '../ui/Counter';
import { aboutData } from '../../data/aboutData';
import { CheckCircle2, Target, Award } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';

export const AboutSection: React.FC = () => {
  return (
    <Section id="about" variant="secondary">
      <SectionHeader
        badge={aboutData.badge}
        title={aboutData.title}
        subtitle={aboutData.description}
      />

      {/* Agenda & Why Participate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <FadeIn delay={0.1} direction="up">
          <Card variant="hoverGlow" className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-4 text-[var(--color-accent-cyan)]">
                <Target className="w-6 h-6" />
                <h3 className="text-xl font-heading font-bold text-white">Event Agenda</h3>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {aboutData.agenda}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] font-mono text-xs text-[var(--color-accent-cyan)]">
              OCTOBER 7 — 9, 2026 • COIMBATORE
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <Card variant="hoverGlow" className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-4 text-[var(--color-accent-purple)]">
                <Award className="w-6 h-6" />
                <h3 className="text-xl font-heading font-bold text-white">Why Participate?</h3>
              </div>
              <ul className="space-y-3">
                {aboutData.whyParticipate.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] font-mono text-xs text-[var(--color-accent-purple)]">
              100% OFFLINE INNOVATION SPRINT
            </div>
          </Card>
        </FadeIn>
      </div>

      {/* 4 Animated Statistics Counters */}
      <FadeIn delay={0.3} direction="up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 glass-panel rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)]">
          {aboutData.stats.map((stat) => (
            <Counter
              key={stat.id}
              end={stat.end}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </FadeIn>
    </Section>
  );
};
