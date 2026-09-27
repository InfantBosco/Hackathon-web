import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Terminal, ShieldCheck, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface HacknexLoaderProps {
  onComplete: () => void;
}

const VERIFICATION_STEPS = [
  { step: '01', text: 'VERIFYING HACKNEX PROTOCOL CORE...', icon: ShieldCheck },
  { step: '02', text: 'INITIALIZING 24H ARENA & DEV ENVS...', icon: Cpu },
  { step: '03', text: 'CALIBRATING KARUNYA INNOVATION HUB SCENES...', icon: Sparkles },
  { step: '04', text: 'VERIFICATION COMPLETE · ACCESS GRANTED', icon: CheckCircle2 },
];

export const HacknexLoader: React.FC<HacknexLoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Disable body scroll while loading
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Counter animation from 0 to 100
      const counter = { val: 0 };

      gsap.to(counter, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const current = Math.floor(counter.val);
          setProgress(current);

          if (current < 30) {
            setStepIndex(0);
          } else if (current < 65) {
            setStepIndex(1);
          } else if (current < 92) {
            setStepIndex(2);
          } else {
            setStepIndex(3);
          }
        },
        onComplete: () => {
          // Hold at 100% briefly for visual impact, then exit smoothly
          gsap.delayedCall(0.3, () => {
            gsap.to(loaderRef.current, {
              opacity: 0,
              scale: 1.04,
              filter: 'blur(8px)',
              duration: 0.7,
              ease: 'power3.inOut',
              onComplete: () => {
                document.body.style.overflow = '';
                onComplete();
              },
            });
          });
        },
      });

      // Subtle pulse on cyber hexagon
      gsap.to('.loader-logo-ring', {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
      });
    }, loaderRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

  const CurrentIcon = VERIFICATION_STEPS[stepIndex].icon;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-[#030712] text-white select-none overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 40%, rgba(245, 158, 11, 0.08) 0%, transparent 60%),
          linear-gradient(to bottom, rgba(3, 7, 18, 0.95), rgba(3, 7, 18, 0.98))
        `,
      }}
    >
      {/* Top Header Row */}
      <div className="w-full max-w-2xl flex items-center justify-between border-b border-white/[0.08] pb-4 pt-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono tracking-widest text-slate-300 font-semibold uppercase">
            HACKNEX // BUILDATHON VERIFY
          </span>
        </div>
        <span className="text-[11px] font-mono text-amber-400/90 tracking-wider">
          v2.4.0 · KITS COIMBATORE
        </span>
      </div>

      {/* Center Hero Cyber Branding & Counter */}
      <div className="w-full max-w-md flex flex-col items-center text-center my-auto">
        {/* Animated Cyber Hexagon Logo */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 flex items-center justify-center">
          <div className="loader-logo-ring absolute inset-0 rounded-3xl border border-dashed border-amber-400/30" />
          <div className="absolute inset-1 rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] backdrop-blur-md" />
          {/* Hacknex Hexagon Icon */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="50,5 90,25 90,75 50,95 10,75 10,25"
                stroke="url(#amber-grad)"
                strokeWidth="6"
                fill="rgba(245, 158, 11, 0.12)"
              />
              <defs>
                <linearGradient id="amber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mb-1">
          HACKNE<span className="text-amber-400">X</span> 2026
        </h1>
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 mb-8">
          24H National Level Hackathon
        </p>

        {/* Digital Counter */}
        <div className="mb-4">
          <span
            className="font-hacknex font-black text-5xl sm:text-6xl text-white tracking-tight drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {progress < 10 ? `0${progress}` : progress}
            <span className="text-2xl sm:text-3xl text-amber-400 ml-1">%</span>
          </span>
        </div>

        {/* High-Precision Progress Bar */}
        <div className="w-full bg-white/[0.06] rounded-full h-1.5 p-0.5 border border-white/10 mb-6 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.8)] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Terminal Verification Step Log */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md">
          <CurrentIcon
            className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
              progress === 100 ? 'text-emerald-400' : 'text-amber-400'
            }`}
          />
          <span
            className={`text-xs font-mono tracking-wider transition-colors duration-300 ${
              progress === 100 ? 'text-emerald-300 font-semibold' : 'text-slate-300'
            }`}
          >
            {VERIFICATION_STEPS[stepIndex].text}
          </span>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full max-w-2xl flex items-center justify-between border-t border-white/[0.08] pt-4 text-[11px] font-mono text-slate-400">
        <span className="tracking-wider">KARUNYA INST. OF TECH. & SCIENCES</span>
        <span className="text-amber-400/80 font-medium">BUILD // INNOVATE // DEPLOY</span>
      </div>
    </div>
  );
};
