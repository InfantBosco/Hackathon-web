import React from 'react';
import { RegistrationSummary } from '../../services/registrationService';
import { CheckCircle2, ShieldCheck, CreditCard, ArrowLeft, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface PaymentBoundaryHandoffProps {
  summary: RegistrationSummary;
  onReturnHome: () => void;
}

export const PaymentBoundaryHandoff: React.FC<PaymentBoundaryHandoffProps> = ({
  summary,
  onReturnHome,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 text-center py-6">
      {/* Success Badge & Animated Glow */}
      <div className="relative inline-block">
        <div className="absolute inset-0 rounded-full bg-[var(--color-accent-cyan)]/20 blur-xl animate-pulse" />
        <div className="relative w-20 h-20 mx-auto rounded-full bg-[rgba(0,240,255,0.1)] border-2 border-[var(--color-accent-cyan)] flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-[var(--color-accent-cyan)]" />
        </div>
      </div>

      <div>
        <Badge variant="cyan" className="font-mono text-xs tracking-widest uppercase mb-3">
          REGISTRATION SUBMITTED SUCCESSFULLY
        </Badge>
        <h2 className="text-3xl font-heading font-bold text-white">
          Team Registered!
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-lg mx-auto">
          Your team <strong className="text-white font-semibold">{summary.team.name}</strong> has been successfully registered for HackNEX 2026.
        </p>
      </div>

      {/* Registration Details Card */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-6 text-left space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[var(--color-border)] pb-4 gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
              Registration Reference ID
            </span>
            <p className="text-xl font-mono font-bold text-[var(--color-accent-cyan)]">
              {summary.registrationId}
            </p>
          </div>
          <div className="sm:text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] block">
              Registration Status
            </span>
            <Badge variant="warning" className="font-mono text-[11px] mt-0.5">
              READY FOR PAYMENT
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[var(--color-text-muted)] font-mono block mb-0.5">Team Name</span>
            <span className="text-white font-semibold">{summary.team.name}</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)] font-mono block mb-0.5">Total Members</span>
            <span className="text-white font-semibold">{summary.participantCount} Participants (1 Captain + 3 Members)</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)] font-mono block mb-0.5">Event Dates</span>
            <span className="text-white font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[var(--color-accent-cyan)]" /> Oct 7–9, 2026
            </span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)] font-mono block mb-0.5">Venue</span>
            <span className="text-white font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-accent-cyan)]" /> KITS Campus, Coimbatore
            </span>
          </div>
        </div>
      </div>

      {/* Payment Gateway Handoff Card */}
      <div className="bg-gradient-to-r from-[rgba(0,240,255,0.06)] via-[rgba(59,130,246,0.06)] to-[rgba(0,240,255,0.06)] border border-[var(--color-accent-cyan)]/40 rounded-[var(--radius-md)] p-6 text-left space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[rgba(0,240,255,0.1)] flex items-center justify-center shrink-0 border border-[var(--color-accent-cyan)]/30">
            <CreditCard className="w-5 h-5 text-[var(--color-accent-cyan)]" />
          </div>
          <div>
            <h4 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              Payment Gateway Boundary Hand-Off
              <Sparkles className="w-4 h-4 text-[var(--color-accent-cyan)]" />
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Phase 11 Registration Complete — Payment Gateway Pending Phase 12
            </p>
          </div>
        </div>

        <div className="p-4 bg-[var(--color-surface)]/80 border border-[var(--color-border)] rounded-[var(--radius-sm)] text-xs text-[var(--color-text-secondary)] space-y-2">
          <div className="flex justify-between items-center text-white font-mono border-b border-[var(--color-border)] pb-2">
            <span>Total Registration Fee</span>
            <span className="text-[var(--color-accent-cyan)] font-bold text-sm">
              ₹{summary.feeSummary.totalAmount} INR
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-[var(--color-text-muted)]">
            Your team submission is stored safely in our database. The Karunya payment gateway integration will open in <strong>Phase 12</strong>, where you can finalize payment and receive your official registration confirmation ticket.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          onClick={onReturnHome}
          className="w-full sm:w-auto px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-white hover:text-[var(--color-accent-cyan)] transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Website
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[var(--color-text-muted)]">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Organized by NEXUS Club, KITS Coimbatore</span>
      </div>
    </div>
  );
};
