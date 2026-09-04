import React from 'react';
import { cn } from '../../lib/utils';
import { Check, Clock, ShieldCheck } from 'lucide-react';

interface StatusTimelineProps {
  registrationStatus: 'DRAFT' | 'READY_FOR_PAYMENT' | 'PAYMENT_PENDING' | 'PAYMENT_VERIFIED' | 'CONFIRMED' | 'CANCELLED' | string;
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({ registrationStatus }) => {
  const isRegistrationComplete = registrationStatus !== 'DRAFT';
  const isPaymentComplete = registrationStatus === 'PAYMENT_VERIFIED' || registrationStatus === 'CONFIRMED';
  const isConfirmed = registrationStatus === 'CONFIRMED';

  const steps = [
    {
      title: 'Registration Submitted',
      description: '4-member team profile saved',
      isDone: isRegistrationComplete,
      isCurrent: registrationStatus === 'READY_FOR_PAYMENT' || registrationStatus === 'PAYMENT_PENDING',
    },
    {
      title: 'Payment Verification',
      description: '₹2,400 team fee (₹600 × 4)',
      isDone: isPaymentComplete,
      isCurrent: registrationStatus === 'PAYMENT_PENDING',
    },
    {
      title: 'Registration Confirmed',
      description: 'Official ticket & confirmation email dispatched',
      isDone: isConfirmed,
      isCurrent: registrationStatus === 'PAYMENT_VERIFIED',
    },
  ];

  return (
    <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-6">
      <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold mb-6 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[var(--color-accent-cyan)]" />
        Registration Progress Lifecycle
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex flex-col items-start space-y-2">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 transition-all',
                  step.isDone && 'border-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)] text-black shadow-[0_0_12px_rgba(0,240,255,0.4)]',
                  step.isCurrent && !step.isDone && 'border-amber-400 bg-amber-950/40 text-amber-400 animate-pulse',
                  !step.isDone && !step.isCurrent && 'border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]'
                )}
              >
                {step.isDone ? (
                  <Check className="w-4 h-4 text-black stroke-[3]" />
                ) : step.isCurrent ? (
                  <Clock className="w-4 h-4 animate-spin text-amber-400" />
                ) : (
                  idx + 1
                )}
              </div>
              <div className="flex flex-col">
                <span className={cn('text-sm font-heading font-bold', step.isDone ? 'text-white' : step.isCurrent ? 'text-amber-400' : 'text-[var(--color-text-muted)]')}>
                  {step.title}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">{step.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
