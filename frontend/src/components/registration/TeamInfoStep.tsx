import React from 'react';
import { Input } from '../ui/Input';
import { Users, Info, ShieldCheck } from 'lucide-react';

interface TeamInfoStepProps {
  teamName: string;
  onChange: (name: string) => void;
  error?: string;
}

export const TeamInfoStep: React.FC<TeamInfoStepProps> = ({
  teamName,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/15 pb-4">
        <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-white" />
          Step 1: Team Name & Structure
        </h3>
        <p className="text-xs text-neutral-200 mt-1">
          Choose a unique, creative team name for your 4-member squad.
        </p>
      </div>

      <div className="bg-[#121212]/95 border border-neutral-700/90 rounded-[var(--radius-md)] p-4.5 flex items-start gap-3 shadow-md">
        <Info className="w-5 h-5 text-white shrink-0 mt-0.5" />
        <div className="text-xs text-neutral-200 space-y-1.5">
          <p className="font-bold text-white text-sm">HackNEX Team Composition Rules:</p>
          <ul className="list-disc list-inside space-y-1 text-neutral-200 font-medium">
            <li>Every team must consist of <strong className="text-white font-bold">exactly 4 members</strong> (1 Captain + 3 Members).</li>
            <li>As team captain, you are initiating this registration on behalf of your team.</li>
            <li>Cross-college and cross-department team members are permitted and welcomed.</li>
            <li>Team names must be unique across the event.</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Team Name *"
          placeholder="e.g. CyberVanguard, Neural Knights, Quantum Bytes"
          value={teamName}
          onChange={(e) => onChange(e.target.value)}
          error={error}
          description="Minimum 2 characters. Only letters, numbers, spaces, and hyphens permitted."
          leftIcon={<Users className="w-4 h-4" />}
        />
      </div>

      <div className="flex items-center gap-2.5 p-3.5 bg-[#121212]/95 border border-neutral-700/90 rounded-[var(--radius-sm)] text-xs text-neutral-200 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Your account email will be set as Team Captain by default.</span>
      </div>
    </div>
  );
};
