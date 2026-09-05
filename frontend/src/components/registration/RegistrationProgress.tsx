import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

interface RegistrationProgressProps {
  currentStep: number; // 1 to 6
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { step: 1, label: 'Team Info', shortLabel: 'Team' },
  { step: 2, label: 'Captain', shortLabel: 'Captain' },
  { step: 3, label: 'Member 2', shortLabel: 'M2' },
  { step: 4, label: 'Member 3', shortLabel: 'M3' },
  { step: 5, label: 'Member 4', shortLabel: 'M4' },
  { step: 6, label: 'Review', shortLabel: 'Review' },
];

export const RegistrationProgress: React.FC<RegistrationProgressProps> = ({
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-2">
      <div className="relative flex items-center justify-between">
        {/* Progress Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-[var(--color-border)] -z-0" />
        
        {/* Active Line Fill */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-white transition-all duration-300 -z-0 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ width: `${((Math.min(currentStep, 6) - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((s) => {
          const isCompleted = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          const isClickable = s.step < currentStep && onStepClick;

          return (
            <div
              key={s.step}
              className="relative z-10 flex flex-col items-center group cursor-default"
              onClick={() => isClickable && onStepClick(s.step)}
            >
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all border-2 bg-neutral-950 backdrop-blur-md',
                  isCompleted && 'border-white bg-white text-black cursor-pointer hover:scale-105 shadow-[0_0_12px_rgba(255,255,255,0.4)]',
                  isCurrent && 'border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.8)] ring-4 ring-white/30',
                  !isCompleted && !isCurrent && 'border-neutral-700 text-neutral-300 bg-neutral-900'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 text-black stroke-[3]" /> : s.step}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-mono tracking-wider transition-colors hidden sm:block',
                  isCurrent ? 'text-white font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : isCompleted ? 'text-neutral-200 font-semibold' : 'text-neutral-300 font-medium'
                )}
              >
                {s.label}
              </span>
              <span
                className={cn(
                  'mt-1 text-[10px] font-mono tracking-tighter sm:hidden',
                  isCurrent ? 'text-white font-extrabold' : 'text-neutral-300 font-medium'
                )}
              >
                {s.shortLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
