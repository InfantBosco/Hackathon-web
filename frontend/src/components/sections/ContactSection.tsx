import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Card } from '../ui/Card';
import { Phone, GraduationCap, User, Award } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <Section id="contact" variant="primary">
      <SectionHeader
        badge="GET IN TOUCH"
        title="Contact Us"
        subtitle="Have questions about HackNEX 2026? Reach out to our event coordinators."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* 1st Box: Faculty Coordinator */}
        <Card variant="hoverGlow" className="flex flex-col items-center justify-between p-8 text-center min-h-[220px] relative overflow-hidden group">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform">
            <GraduationCap className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
              Faculty Coordinator
            </h4>
            <h3 className="text-xl font-heading font-bold text-white">
              Dr. Eben Sophia
            </h3>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 w-full">
            <a
              href="tel:9789814239"
              className="inline-flex items-center justify-center gap-2 text-xs font-mono font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Contact no : 97898 14239</span>
            </a>
          </div>
        </Card>

        {/* 2nd Box: Nexus - President */}
        <Card variant="hoverGlow" className="flex flex-col items-center justify-between p-8 text-center min-h-[220px] relative overflow-hidden group">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform">
            <User className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center justify-center gap-1.5">
              <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-4 w-auto shrink-0 inline-block align-middle invert brightness-200" />
              <span>NEXUS - President</span>
            </h4>
            <h3 className="text-xl font-heading font-bold text-white">
              Mr. Jason Balamurugan
            </h3>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 w-full">
            <a
              href="tel:9442129572"
              className="inline-flex items-center justify-center gap-2 text-xs font-mono font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Contact No : 94421 29572</span>
            </a>
          </div>
        </Card>

        {/* 3rd Box: Nexus - Vice President */}
        <Card variant="hoverGlow" className="flex flex-col items-center justify-between p-8 text-center min-h-[220px] relative overflow-hidden group">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform">
            <Award className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center justify-center gap-1.5">
              <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-4 w-auto shrink-0 inline-block align-middle invert brightness-200" />
              <span>NEXUS - Vice President</span>
            </h4>
            <h3 className="text-xl font-heading font-bold text-white">
              Ms. Sancia
            </h3>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 w-full">
            <a
              href="tel:9384200824"
              className="inline-flex items-center justify-center gap-2 text-xs font-mono font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Contact no : 9384200824</span>
            </a>
          </div>
        </Card>
      </div>
    </Section>
  );
};
