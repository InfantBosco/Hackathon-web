import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useRegistrationStore } from '../store/useRegistrationStore';
import { AuthNavbar } from '../components/navigation/AuthNavbar';
import { GridBackground } from '../components/backgrounds/GridBackground';
import { NeuralNoise } from '../components/backgrounds/NeuralNoise';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  CreditCard,
  Lock,
  ArrowLeft,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { registrationId } = useParams<{ registrationId: string }>();
  const { user } = useAuthStore();
  const {
    activeRegistration,
    refreshRegistrationSummary,
    error,
  } = useRegistrationStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (registrationId && user?.id) {
      refreshRegistrationSummary(registrationId, user.id).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [registrationId, user?.id, refreshRegistrationSummary]);

  const handleCheckStatus = async () => {
    if (registrationId && user?.id) {
      const summary = await refreshRegistrationSummary(registrationId, user.id);
      if (summary.status === 'CONFIRMED' || summary.status === 'PAYMENT_VERIFIED') {
        navigate('/registration/confirmed');
      }
    }
  };

  if (loading) {
    return (
      <GridBackground className="min-h-screen flex flex-col justify-between relative overflow-hidden">
        <NeuralNoise opacity={0.25} />
        <AuthNavbar />
        <div className="flex-1 flex items-center justify-center p-8 relative z-10">
          <Loader2 className="w-8 h-8 text-[var(--color-accent-cyan)] animate-spin" />
        </div>
      </GridBackground>
    );
  }

  if (!activeRegistration) {
    return (
      <GridBackground className="min-h-screen flex flex-col justify-between relative overflow-hidden">
        <NeuralNoise opacity={0.25} />
        <AuthNavbar />
        <main className="flex-1 max-w-lg w-full mx-auto px-4 py-16 text-center relative z-10">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-heading font-bold text-white mb-2">Registration Not Found</h2>
          <Button onClick={() => navigate('/registration/status')} className="font-mono text-xs">
            Return to Status
          </Button>
        </main>
      </GridBackground>
    );
  }

  const amountPerPerson = activeRegistration.feeSummary.feePerPerson || 600;
  const totalAmount = activeRegistration.feeSummary.totalAmount || 2400;

  return (
    <GridBackground className="min-h-screen flex flex-col justify-between relative overflow-hidden">
      <NeuralNoise opacity={0.25} />
      <AuthNavbar />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 md:py-12 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/registration/status')}
          className="text-xs font-mono text-[var(--color-text-secondary)] hover:text-white mb-6 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Status
        </Button>

        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/20 rounded-[var(--radius-lg)] p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Cyber Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-cyan)]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center border-b border-[var(--color-border)] pb-6">
            <Badge variant="cyan" className="font-mono text-xs tracking-widest uppercase mb-2">
              SECURE PAYMENT GATEWAY
            </Badge>
            <h1 className="text-3xl font-heading font-bold text-white">
              Complete Your Registration
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Finalize team payment to lock in your squad's spot at HackNEX 2026.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-[var(--radius-md)] text-red-400 text-xs font-mono">
              {error}
            </div>
          )}

          {/* Summary Breakdown Card */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-5 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[var(--color-text-muted)] font-mono">Team Name</span>
              <span className="text-white font-bold text-sm">{activeRegistration.team.name}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-[var(--color-text-muted)] font-mono">Registration ID</span>
              <span className="text-[var(--color-accent-cyan)] font-mono font-bold">
                {activeRegistration.registrationId}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-[var(--color-text-muted)] font-mono">Participants</span>
              <span className="text-white font-semibold">4 Members (1 Captain + 3 Members)</span>
            </div>

            <div className="border-t border-[var(--color-border)] pt-3 flex justify-between items-center text-xs">
              <span className="text-[var(--color-text-muted)] font-mono">Rate per Participant</span>
              <span className="text-white font-mono">₹{amountPerPerson} INR</span>
            </div>

            <div className="bg-[rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.2)] rounded-[var(--radius-sm)] p-4 flex justify-between items-center">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-[var(--color-accent-cyan)]">
                  Total Payable Amount
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] block">
                  Authoritatively calculated by backend
                </span>
              </div>
              <span className="text-2xl font-mono font-bold text-[var(--color-accent-cyan)]">
                ₹{totalAmount} INR
              </span>
            </div>
          </div>

          {/* Karunya Gateway Integration Boundary Box */}
          <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-5 bg-[var(--color-surface)] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(0,240,255,0.1)] border border-[var(--color-accent-cyan)]/30 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-[var(--color-accent-cyan)]" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  Karunya Payment Interface
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-cyan)]" />
                </h4>
                <p className="text-[11px] text-[var(--color-text-secondary)] flex items-center gap-1 flex-wrap">
                  <span>Secure direct gateway integration for</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-white">
                    <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3 w-auto shrink-0 inline-block align-middle" />
                    NEXUS
                  </span>
                  <span>Club, KITS</span>
                </p>
              </div>
            </div>

            <div className="p-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-[var(--radius-sm)] text-[11px] text-[var(--color-text-muted)] flex items-start gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                All payment transactions are processed securely. Once completed, your team status transitions to <strong>CONFIRMED</strong> immediately.
              </span>
            </div>
          </div>

          {/* Non-Refundable Notice */}
          <div className="flex items-center gap-2 p-3 bg-amber-950/20 border border-amber-500/30 rounded-[var(--radius-sm)] text-[11px] text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>NO REFUND POLICY:</strong> Registration fees are non-refundable once payment is completed.
            </span>
          </div>

          {/* 2 Themed Karunya Eduserve Buttons */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider text-center">
              Select Your Student Category Below:
            </h4>

            {/* Button 1: Karunya Student */}
            <a
              href="https://eduserve.karunya.edu/online/PayAddOnFees.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group p-4 rounded-[var(--radius-md)] border border-cyan-400/40 bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-cyan-950/60 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all duration-300 text-left flex items-center justify-between cursor-pointer"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-heading font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                  Click here to pay if you are a Karunya Student
                </span>
                <p className="text-[10px] font-mono text-slate-300 pl-6">
                  For internal KITS Karunya Students via Eduserve Add-On Fees
                </p>
              </div>
            </a>

            {/* Button 2: External Student */}
            <a
              href="https://eduserve.karunya.edu/Online/ExternalEvents.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group p-4 rounded-[var(--radius-md)] border border-purple-400/40 bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-purple-950/60 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 text-left flex items-center justify-between cursor-pointer"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-heading font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  Click here to pay if you are an External Student
                </span>
                <p className="text-[10px] font-mono text-slate-300 pl-6">
                  For participants from other colleges/institutions via External Events
                </p>
              </div>
            </a>

            <Button
              variant="outline"
              onClick={handleCheckStatus}
              className="w-full py-3 font-mono text-xs uppercase"
            >
              Check Registration & Payment Status
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--color-text-muted)] pt-2">
            <span>256-Bit Encrypted Payment Transaction</span>
          </div>
        </div>
      </main>
    </GridBackground>
  );
};
