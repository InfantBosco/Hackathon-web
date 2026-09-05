import React, { useState } from 'react';
import { ParticipantInput } from '../../services/registrationService';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Users, User, Edit3, ShieldAlert, CreditCard, ArrowRight, Loader2 } from 'lucide-react';

interface ReviewStepProps {
  teamName: string;
  captain: ParticipantInput;
  member2: ParticipantInput;
  member3: ParticipantInput;
  member4: ParticipantInput;
  onEditStep: (step: number) => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  teamName,
  captain,
  member2,
  member3,
  member4,
  onEditStep,
  onSubmit,
  isSubmitting,
  error,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState('');

  const members = [
    { title: 'Team Captain', data: captain, step: 2 },
    { title: 'Member 2', data: member2, step: 3 },
    { title: 'Member 3', data: member3, step: 4 },
    { title: 'Member 4', data: member4, step: 5 },
  ];

  const handleSubmit = async () => {
    if (!agreed) {
      setAgreeError('You must confirm that all participant details are accurate before submitting.');
      return;
    }
    setAgreeError('');
    await onSubmit();
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-[var(--color-border)] pb-4">
        <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--color-accent-cyan)]" />
          Step 6: Review & Final Confirmation
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">
          Review all details carefully before submitting your team registration.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-[var(--radius-md)] text-red-400 text-xs font-mono flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold uppercase tracking-wider mb-1">Registration Submission Failed</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Team Summary Card */}
      <div className="bg-[#121212]/95 border border-neutral-700/90 rounded-[var(--radius-md)] p-5 relative shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white font-bold">
              Team Identifier
            </span>
            <h4 className="text-2xl font-heading font-bold text-white mt-0.5">{teamName}</h4>
            <p className="text-xs text-neutral-200 mt-1 font-medium">4 Confirmed Participants</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(1)}
            className="text-xs font-mono text-white hover:text-neutral-200 flex items-center gap-1.5 border border-neutral-700 bg-neutral-800/80"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Name
          </Button>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((m, idx) => (
          <div
            key={idx}
            className="bg-[#121212]/95 border border-neutral-700/90 rounded-[var(--radius-md)] p-4 relative flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-white" />
                  <span className="text-xs font-mono uppercase font-bold text-white">{m.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onEditStep(m.step)}
                  className="text-[11px] font-mono text-white hover:underline flex items-center gap-1 font-semibold"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="font-bold text-white text-sm">{m.data.name}</p>
                <p className="text-neutral-200 font-medium">{m.data.email}</p>
                <p className="text-neutral-300">📞 {m.data.phone}</p>
                <p className="text-neutral-300">🎓 {m.data.college}</p>
                <p className="text-neutral-300">
                  📚 {m.data.department} ({m.data.yearOfStudy})
                </p>
                {m.data.linkedinUrl && (
                  <p className="text-neutral-200 font-mono truncate">🔗 {m.data.linkedinUrl}</p>
                )}
                <div className="pt-2">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-neutral-800 border border-neutral-600 text-white font-semibold">
                    Food: {m.data.foodPreference === 'VEGETARIAN' ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Fee Summary Card */}
      <div className="bg-[#121212]/95 border border-neutral-700/90 rounded-[var(--radius-md)] p-5 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-white shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-mono uppercase font-bold text-white">Registration Fee Summary</h4>
              <p className="text-xs text-neutral-200 mt-0.5 font-medium">
                ₹600 per participant × 4 Team Members
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs font-mono uppercase text-neutral-300 block">Total Payable</span>
            <span className="text-2xl font-mono font-bold text-white">₹2,400 INR</span>
          </div>
        </div>
      </div>

      {/* Confirmation Checkbox */}
      <div className="space-y-2 pt-2">
        <Checkbox
          id="confirmAccuracy"
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked);
            if (e.target.checked) setAgreeError('');
          }}
          label="I confirm all participant details are accurate and agree to the HackNEX rules & code of conduct."
        />
        {agreeError && <p className="text-xs font-mono text-red-400 pl-7">{agreeError}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 text-sm font-mono uppercase tracking-wider font-bold bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-blue)] text-black hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              Submitting Team Details...
            </>
          ) : (
            <>
              Confirm & Submit Registration <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
