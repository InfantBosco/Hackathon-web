import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import RadialOrbitalTimeline from '../ui/radial-orbital-timeline';
import { orbitalTimelineData } from '../../data/scheduleData';

export const ScheduleSection: React.FC = () => {
  return (
    <Section id="schedule" variant="primary">
      <SectionHeader
        badge="TIMELINE"
        title="EVENT SCHEDULE"
        subtitle="October 7–9, 2026 • KITS, Coimbatore"
      />

      <div className="max-w-5xl mx-auto">
        <RadialOrbitalTimeline timelineData={orbitalTimelineData} />
      </div>
    </Section>
  );
};
