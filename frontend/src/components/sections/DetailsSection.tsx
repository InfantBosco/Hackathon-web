import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { FileText, Download, Check } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const DetailsSection: React.FC = () => {
  return (
    <Section id="details" variant="secondary">
      <SectionHeader
        badge="EVENT SPECIFICATIONS"
        title="Hackathon Rules & Overview"
        subtitle="Key guidelines, registration criteria, and downloadable event specifications."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Core Rules Overview */}
        <Card variant="default" className="md:col-span-2 space-y-6 border-red-500/20 shadow-[0_0_20px_rgba(255,30,66,0.15)]">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
            <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-white" />
              <span>Core Event Rules</span>
            </h3>
            <Badge variant="cyan">OFFICIAL GUIDELINES</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)]">
              <span className="text-xs font-mono text-slate-300 block mb-1">TEAM STRUCTURE</span>
              <p className="font-semibold text-white mb-1">Exactly {siteConfig.teamSize} Members</p>
              <p className="text-xs text-[var(--color-text-secondary)]">1 Team Captain + 3 Members mandatory.</p>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)]">
              <span className="text-xs font-mono text-slate-300 block mb-1">REGISTRATION FEE</span>
              <p className="font-semibold text-white mb-1">₹{siteConfig.registrationFee} / Person</p>
              <p className="text-xs text-[var(--color-text-secondary)]">₹600 × 4 members = ₹2,400 per team.</p>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)]">
              <span className="text-xs font-mono text-slate-300 block mb-1">CODE OF CONDUCT</span>
              <p className="font-semibold text-white mb-1">Original Work Only</p>
              <p className="text-xs text-[var(--color-text-secondary)] font-mono">All code must be written during the 36-hour sprint.</p>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)]">
              <span className="text-xs font-mono text-slate-300 block mb-1">FOOD PREFERENCES</span>
              <p className="font-semibold text-white mb-1">Veg / Non-Veg Recorded</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Specified per participant during registration.</p>
            </div>
          </div>
        </Card>

        {/* Downloadable PDF Area */}
        <Card variant="hoverGlow" className="flex flex-col justify-between border-red-500/20 shadow-[0_0_20px_rgba(255,30,66,0.15)]">
          <div>
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-white/10 border border-white/20 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">Detailed Rulebook PDF</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
              Download the complete HackNEX 2026 rulebook, scoring rubric, and submission guidelines.
            </p>
            <div className="p-3 rounded-md bg-[var(--color-surface-elevated)] text-xs font-mono text-[var(--color-text-muted)] flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Version 1.0 (PDF)</span>
            </div>
          </div>

          <Button
            variant="secondary"
            className="w-full mt-6"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Official HackNEX 2026 Rulebook PDF will be available upon registration lock.')}
          >
            Download Document
          </Button>
        </Card>
      </div>
    </Section>
  );
};
