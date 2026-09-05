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
  ShieldCheck,
  Lock,
  ArrowLeft,
  AlertCircle,
  Loader2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { registrationId } = useParams<{ registrationId: string }>();
  const { user } = useAuthStore();
  const {
    activeRegistration,
    refreshRegistrationSummary,
    initiatePaymentForActiveRegistration,
    verifyPaymentForActiveRegistration,
    isSubmitting,
    error,
  } = useRegistrationStore();

  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (registrationId && user?.id) {
      refreshRegistrationSummary(registrationId, user.id).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [registrationId, user?.id, refreshRegistrationSummary]);

  const handlePayNow = async () => {
    if (!user?.id || !activeRegistration) return;

    setProcessingPayment(true);
    try {
      // 1. Initiate payment on backend
      const payment = await initiatePaymentForActiveRegistration(user.id);

      // 2. Simulate Karunya Gateway transaction processing
      const mockTxId = `TXN-HNX-${Date.now().toString().slice(-8)}`;
      await verifyPaymentForActiveRegistration(payment.id, mockTxId);

      setPaymentSuccess(true);
      setTimeout(() => {
        navigate('/registration/confirmed');
      }, 1500);
    } catch (err) {
      setProcessingPayment(false);
    }
  };

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

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={handlePayNow}
              disabled={processingPayment || paymentSuccess || isSubmitting}
              className="w-full py-4 font-mono text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[var(--color-accent-cyan)] via-blue-500 to-[var(--color-accent-blue)] text-black hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2"
            >
              {processingPayment ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  Processing Payment & Verifying...
                </>
              ) : paymentSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  Payment Verified! Redirecting...
                </>
              ) : (
                <>
                  Pay ₹{totalAmount} INR Now →
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleCheckStatus}
              className="w-full py-3 font-mono text-xs uppercase"
            >
              Check Payment Status
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--color-text-muted)] pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit Encrypted Payment Transaction</span>
          </div>
        </div>
      </main>
    </GridBackground>
  );
};
