import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShaderAnimation } from '../ui/shader-animation';

export interface SplashScreenProps {
  onComplete: () => void;
}

interface StructuredLetter {
  char: string;
  startX: number;
  startY: number;
  delay: number;
  colorClass: string;
}

// Royal structured grid trajectories:
// Left letters glide from left to right along horizontal baselines
// Right letters glide from right to left along horizontal baselines
// Center accent descends vertically into place
const WORDMARK_LETTERS: StructuredLetter[] = [
  // HACK
  { char: 'H', startX: -260, startY: 0, delay: 0.0, colorClass: 'text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.45)]' },
  { char: 'A', startX: -190, startY: 0, delay: 0.25, colorClass: 'text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.45)]' },
  { char: 'C', startX: -120, startY: 0, delay: 0.50, colorClass: 'text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.45)]' },
  { char: 'K', startX: -60,  startY: 0, delay: 0.75, colorClass: 'text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.45)]' },

  // NEX
  { char: 'N', startX: 60,  startY: 0, delay: 1.00, colorClass: 'text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-300 to-zinc-400 drop-shadow-[0_0_25px_rgba(255,30,66,0.35)]' },
  { char: 'E', startX: 130, startY: 0, delay: 1.25, colorClass: 'text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-300 to-zinc-400 drop-shadow-[0_0_25px_rgba(255,30,66,0.35)]' },
  { char: 'X', startX: 200, startY: 0, delay: 1.50, colorClass: 'text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-400 to-zinc-500 drop-shadow-[0_0_25px_rgba(255,30,66,0.35)]' },
];

const ACCENT_LETTERS: StructuredLetter[] = [
  // '26
  { char: "'", startX: 0, startY: 80, delay: 1.75, colorClass: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-500' },
  { char: '2', startX: 0, startY: 80, delay: 2.00, colorClass: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-500' },
  { char: '6', startX: 0, startY: 80, delay: 2.25, colorClass: 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500' },
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<'assembling' | 'ripple' | 'shaderWave' | 'exit'>('assembling');

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    // Phase 1 (0.0s - 4.0s): Neat & disciplined letter assembly along architectural axes
    const tRipple = setTimeout(() => {
      setPhase('ripple');
    }, 4000);

    // Phase 2 (4.8s): Shader animation plays 1 time in slow majestic motion
    const tShader = setTimeout(() => {
      setPhase('shaderWave');
    }, 4800);

    // Phase 3 (6.3s): Smooth fade out exit transition
    const tExit = setTimeout(() => {
      setPhase('exit');
    }, 6300);

    // Phase 4 (7.1s): Direct user cleanly to landing page
    const tComplete = setTimeout(() => {
      onComplete();
    }, 7100);

    return () => {
      clearTimeout(tRipple);
      clearTimeout(tShader);
      clearTimeout(tExit);
      clearTimeout(tComplete);
    };
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-auto select-none bg-black font-royal"
        >
          {/* Slower Three.js WebGL Shader Animation Canvas */}
          <motion.div
            initial={{ opacity: 0.35 }}
            animate={{
              opacity: phase === 'shaderWave' ? 1.0 : phase === 'ripple' ? 0.85 : 0.5,
            }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute inset-0 z-0"
          >
            <ShaderAnimation />
          </motion.div>

          {/* Precision Royal Concentric Shockwave Ripple */}
          <AnimatePresence>
            {(phase === 'ripple' || phase === 'shaderWave') && (
              <motion.div
                key="royal-ripple-ring"
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 3.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border-2 border-[#ff1e42] shadow-[0_0_60px_#ff1e42,inset_0_0_40px_rgba(255,30,66,0.5)] pointer-events-none z-10"
              />
            )}
          </AnimatePresence>

          {/* Central Red Ambient Radial Glow */}
          <motion.div
            animate={{
              scale: phase === 'shaderWave' ? [1, 1.25, 1] : 1,
              opacity: phase === 'shaderWave' ? 0.85 : 0.4,
            }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,30,66,0.32)_0%,rgba(255,255,255,0.06)_45%,transparent_70%)] blur-[100px] pointer-events-none z-0"
          />

          {/* Royal Centered Typography Container */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
            
            {/* HACKNEX Title in Royal Serif Cinzel */}
            <div className="relative flex items-center justify-center">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-royal font-extrabold tracking-[0.15em] sm:tracking-[0.22em] uppercase select-none flex items-center justify-center">
                {WORDMARK_LETTERS.map((item, idx) => (
                  <motion.span
                    key={`royal-word-${idx}-${item.char}`}
                    initial={{
                      x: item.startX,
                      y: item.startY,
                      opacity: 0,
                      scale: 1.15,
                    }}
                    animate={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      filter: phase === 'ripple' ? ['brightness(1)', 'brightness(2.2)', 'brightness(1)'] : 'brightness(1)',
                    }}
                    transition={{
                      x: { duration: 2.2, delay: item.delay, ease: [0.22, 1, 0.36, 1] },
                      y: { duration: 2.2, delay: item.delay, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 1.4, delay: item.delay, ease: 'easeOut' },
                      scale: { duration: 2.2, delay: item.delay, ease: [0.22, 1, 0.36, 1] },
                      filter: { duration: 0.6, ease: 'easeInOut' },
                    }}
                    className={`inline-block ${item.colorClass}`}
                  >
                    {item.char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Accent Year: '26 */}
            <div className="relative flex items-center justify-center space-x-2 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-royal font-black tracking-[0.3em] pl-[0.3em] uppercase mt-2 sm:mt-4">
              {ACCENT_LETTERS.map((item, idx) => (
                <motion.span
                  key={`royal-accent-${idx}-${item.char}`}
                  initial={{
                    x: item.startX,
                    y: item.startY,
                    opacity: 0,
                    scale: 1.2,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: phase === 'ripple' ? ['brightness(1)', 'brightness(2.5)', 'brightness(1)'] : 'brightness(1)',
                  }}
                  transition={{
                    x: { duration: 2.0, delay: item.delay, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 2.0, delay: item.delay, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 1.2, delay: item.delay, ease: 'easeOut' },
                    scale: { duration: 2.0, delay: item.delay, ease: [0.22, 1, 0.36, 1] },
                    filter: { duration: 0.6, ease: 'easeInOut' },
                  }}
                  className={`inline-block ${item.colorClass} drop-shadow-[0_0_30px_rgba(245,158,11,0.65)]`}
                >
                  {item.char}
                </motion.span>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
