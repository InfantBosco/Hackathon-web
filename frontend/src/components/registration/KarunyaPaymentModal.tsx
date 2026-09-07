import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ExternalLink, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface KarunyaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrationId?: string;
  teamName?: string;
  amount?: number;
}

export const KarunyaPaymentModal: React.FC<KarunyaPaymentModalProps> = ({
  isOpen,
  onClose,
  registrationId,
  teamName,
  amount = 2400,
}) => {
  const navigate = useNavigate();

  const handleKarunyaStudentPay = () => {
    window.open('https://eduserve.karunya.edu/online/PayAddOnFees.aspx', '_blank', 'noopener,noreferrer');
  };

  const handleExternalStudentPay = () => {
    window.open('https://eduserve.karunya.edu/Online/ExternalEvents.aspx', '_blank', 'noopener,noreferrer');
  };

  const handleGoToStatus = () => {
    onClose();
    navigate('/registration/status');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl">
      <div className="space-y-6 text-left">
        {/* Header */}
        <div className="text-center space-y-2 border-b border-white/10 pb-4">
          <Badge variant="cyan" className="font-mono text-[10px] tracking-widest uppercase">
            KARUNYA EDUSERVE PAYMENT GATEWAY
          </Badge>
          <h3 className="text-2xl font-heading font-bold text-white">
            Select Student Category
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Choose your student category to complete your team registration fee.
          </p>
        </div>

        {/* Team & Fee Summary Card */}
        {(teamName || registrationId) && (
          <div className="p-4 bg-[#121212]/90 border border-white/15 rounded-[var(--radius-md)] space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center text-white">
              <span className="text-[var(--color-text-muted)]">Team Name:</span>
              <span className="font-bold text-white">{teamName}</span>
            </div>
            {registrationId && (
              <div className="flex justify-between items-center">
                <span className="text-[var(--color-text-muted)]">Registration ID:</span>
                <span className="text-[var(--color-accent-cyan)] font-bold">{registrationId}</span>
              </div>
            )}
            <div className="flex justify-between items-center border-t border-white/10 pt-2 text-sm">
              <span className="text-white font-semibold">Total Fee (4 Members):</span>
              <span className="text-[var(--color-accent-cyan)] font-black">₹{amount} INR</span>
            </div>
          </div>
        )}

        {/* 2 Themed Payment Gateway Buttons */}
        <div className="space-y-4">
          {/* Button 1: Karunya Student */}
          <button
            onClick={handleKarunyaStudentPay}
            className="w-full group p-4.5 rounded-[var(--radius-lg)] border border-cyan-400/40 bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-cyan-950/60 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all duration-300 text-left flex items-center justify-between cursor-pointer"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Click here to pay if you are a Karunya Student
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-300 pl-6">
                For internal KITS Karunya students via Eduserve Add-On Fees
              </p>
            </div>
            <ExternalLink className="w-5 h-5 text-cyan-400 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Button 2: External Student */}
          <button
            onClick={handleExternalStudentPay}
            className="w-full group p-4.5 rounded-[var(--radius-lg)] border border-purple-400/40 bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-purple-950/60 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 text-left flex items-center justify-between cursor-pointer"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-heading font-bold text-white group-hover:text-purple-300 transition-colors">
                  Click here to pay if you are an External Student
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-300 pl-6">
                For participants from other colleges/institutions via External Events
              </p>
            </div>
            <ExternalLink className="w-5 h-5 text-purple-400 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Verification Note */}
        <div className="p-3 bg-white/5 border border-white/10 rounded-[var(--radius-sm)] text-[11px] font-mono text-[var(--color-text-secondary)] flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            After completing payment, save your receipt number/transaction reference to verify status on your dashboard.
          </span>
        </div>

        {/* Action Button to Status */}
        <div className="pt-2 flex items-center justify-end">
          <Button
            onClick={handleGoToStatus}
            className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider font-bold bg-white text-black hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
          >
            Go to Registration Status <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};
