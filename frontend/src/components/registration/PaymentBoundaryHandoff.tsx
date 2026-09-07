import React from 'react';
import { RegistrationSummary } from '../../services/registrationService';
import { CheckCircle2, CreditCard, ArrowLeft, Calendar, MapPin, Sparkles } from 'lucide-react';
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

      {/* Karunya Eduserve Payment Portals Card */}
      <div className="bg-[#0a0a0a]/95 border border-white/20 rounded-[var(--radius-lg)] p-6 text-left space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-cyan-400" />
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
              Karunya Eduserve Official Payment Portals
            </h4>
          </div>
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>

        <p className="text-xs text-[var(--color-text-secondary)]">
          Select your category below to complete your team payment of <strong className="text-white font-bold">₹{summary.feeSummary.totalAmount} INR</strong> via Karunya's secure payment portal:
        </p>

        {/* 2 Themed Buttons */}
        <div className="grid grid-cols-1 gap-3 pt-1">
          {/* Button 1: Karunya Student */}
          <a
            href="https://eduserve.karunya.edu/online/PayAddOnFees.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full group p-4 rounded-[var(--radius-md)] border border-cyan-400/40 bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-cyan-950/60 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all duration-300 text-left flex items-center justify-between cursor-pointer"
          >
            <div className="space-y-0.5">
              <span className="text-xs font-heading font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                Click here to pay if you are a Karunya Student
              </span>
              <p className="text-[10px] font-mono text-slate-300 pl-5">
                https://eduserve.karunya.edu/online/PayAddOnFees.aspx
              </p>
            </div>
          </a>

          {/* Button 2: External Student */}
          <a
            href="https://eduserve.karunya.edu/Online/ExternalEvents.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full group p-4 rounded-[var(--radius-md)] border border-purple-400/40 bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-purple-950/60 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-300 text-left flex items-center justify-between cursor-pointer"
          >
            <div className="space-y-0.5">
              <span className="text-xs font-heading font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                Click here to pay if you are an External Student
              </span>
              <p className="text-[10px] font-mono text-slate-300 pl-5">
                https://eduserve.karunya.edu/Online/ExternalEvents.aspx
              </p>
            </div>
          </a>
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
        <span className="flex items-center gap-1">
          <span>Organized by</span>
          <span className="inline-flex items-center gap-1 font-semibold text-white">
            <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3 w-auto shrink-0 inline-block align-middle" />
            NEXUS
          </span>
          <span>Club, KITS Coimbatore</span>
        </span>
      </div>
    </div>
  );
};
