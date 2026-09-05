import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';

export const ChiefGuestSection: React.FC = () => {
  return (
    <Section id="chief-guest" variant="primary">
      <SectionHeader
        badge="HONORED GUEST"
        title="Chief Guest"
        subtitle="Distinguished dignitary presiding over HACKNEX 2026"
      />

      <div className="flex justify-center items-center py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[280px] sm:max-w-[300px] h-[380px] sm:h-[420px] rounded-3xl bg-[#181920]/90 border border-white/10 shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(255,30,66,0.35)] cursor-pointer"
        />
      </div>
    </Section>
  );
};
