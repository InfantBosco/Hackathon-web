import React, { useState } from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Timeline } from '../ui/Timeline';
import { Button } from '../ui/Button';
import { scheduleData } from '../../data/scheduleData';

export const ScheduleSection: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const currentDay = scheduleData[activeDayIndex];

  return (
    <Section id="schedule" variant="primary">
      <SectionHeader
        badge="EVENT SCHEDULE"
        title="3-Day Event Itinerary"
        subtitle="October 7–9, 2026 • Karunya Auditorium & Innovation Hub"
      />

      {/* Day Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {scheduleData.map((day, index) => (
          <Button
            key={day.date}
            variant={activeDayIndex === index ? 'primary' : 'outline'}
            size="md"
            onClick={() => setActiveDayIndex(index)}
          >
            {day.date}
          </Button>
        ))}
      </div>

      {/* Day Schedule Content */}
      <div className="max-w-3xl mx-auto glass-panel p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)]">
        <h3 className="text-xl font-heading font-bold text-[var(--color-accent-cyan)] mb-6 border-b border-[var(--color-border-subtle)] pb-3">
          {currentDay.dayLabel}
        </h3>

        <Timeline
          items={currentDay.events.map((e, idx) => ({
            id: `${activeDayIndex}-${idx}`,
            date: e.time,
            title: e.title,
            description: e.description,
            status: e.status,
          }))}
        />
      </div>
    </Section>
  );
};
