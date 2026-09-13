import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FileText } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const DetailsSection: React.FC = () => {
  return (
    <Section id="details" variant="secondary">
      <SectionHeader
        badge="EVENT SPECIFICATIONS"
        title="Hackathon Rules & Overview"
        subtitle="Key guidelines, registration criteria, and downloadable event specifications."
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Core Event Rules */}
        <Card variant="default" className="space-y-6 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-zinc-950/80 flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-zinc-300" />
                <span>Core Event Rules</span>
              </h3>
              <Badge variant="default" className="bg-white/10 text-white border-white/20">
                OFFICIAL GUIDELINES
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 block mb-1">TEAM STRUCTURE</span>
                <p className="font-semibold text-white mb-1">Exactly {siteConfig.teamSize} Members</p>
                <p className="text-xs text-zinc-400">1 Team Leader + 3 Members mandatory.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 block mb-1">REGISTRATION FEE</span>
                <p className="font-semibold text-white mb-1">₹{siteConfig.registrationFee} / Person</p>
                <p className="text-xs text-zinc-400">₹500 × 4 members = ₹2,000 per team.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 block mb-1">CODE OF CONDUCT</span>
                <p className="font-semibold text-white mb-1">AI Tools Allowed</p>
                <p className="text-xs text-zinc-400 font-mono">
                  Participants are free to use AI tools; line-by-line code explanation is not forced.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 block mb-1">FOOD PREFERENCES</span>
                <p className="font-semibold text-white mb-1">Veg / Non-Veg Recorded</p>
                <p className="text-xs text-zinc-400">Specified per participant during registration.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Column: Rules & Regulations PDF Box */}
        <Card variant="default" className="space-y-6 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-zinc-950/80 flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-zinc-300" />
                <span>Rules & Regulations PDF</span>
              </h3>
              <Badge variant="default" className="bg-white/10 text-white border-white/20">
                OFFICIAL RULEBOOK
              </Badge>
            </div>

            {/* Inner Square PDF Display Box */}
            <div className="p-6 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-lg">
                <FileText className="w-9 h-9 text-white" />
              </div>

              <div>
                <h4 className="text-base font-semibold text-white">HackNEX 2026 Official Rulebook</h4>
                <p className="text-xs text-zinc-400 font-mono mt-1">PDF Document • Complete Specifications</p>
              </div>

              <ul className="text-xs text-zinc-300 space-y-2 text-left w-full pt-3 border-t border-zinc-800">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                  <span>Comprehensive Hackathon Code of Conduct</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                  <span>Judging Criteria & Evaluation Matrix</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                  <span>Sprint Rules, Check-in & Submission Guidelines</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={siteConfig.rulesPdfUrl || '#'}
              download="HackNEX_2026_Rules_and_Regulations.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-200 shadow-md cursor-pointer"
            >
              <FileText className="w-4 h-4 text-black" />
              <span>Download Rules & Regulations (PDF)</span>
            </a>
          </div>
        </Card>
      </div>
    </Section>
  );
};
