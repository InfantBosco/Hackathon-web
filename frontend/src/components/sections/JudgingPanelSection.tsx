import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';

export const JudgingPanelSection: React.FC = () => {
  return (
    <Section id="judging-panel" variant="secondary">
      <SectionHeader
        badge="EVALUATION BOARD"
        title="Judging Panel"
        subtitle="Industry experts & technical leaders evaluating HACKNEX 2026 projects"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto justify-items-center py-4">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full max-w-[280px] sm:max-w-[300px] h-[380px] sm:h-[420px] rounded-3xl bg-[#181920]/90 border border-white/10 shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(255,30,66,0.35)] cursor-pointer"
          />
        ))}
      </div>
    </Section>
  );
};
