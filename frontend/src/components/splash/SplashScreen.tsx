import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShaderAnimation } from '../ui/shader-animation';

export interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<'show' | 'exit'>('show');

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    // Phase 1 (3.2s): Display full ShaderAnimation
    const tExit = setTimeout(() => {
      setPhase('exit');
    }, 3200);

    // Phase 2 (4.0s): Smooth unmount to reveal landing page
    const tComplete = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-auto select-none bg-black"
        >
          {/* Main Three.js WebGL Shader Animation Canvas */}
          <div className="absolute inset-0 z-0 opacity-90">
            <ShaderAnimation />
          </div>

          {/* Central Red Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,30,66,0.25)_0%,rgba(255,255,255,0.05)_45%,transparent_70%)] blur-[90px] pointer-events-none z-0" />

          {/* Clean Solid Branding Title: HackNEX '26 */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-heading font-black tracking-tight uppercase select-none relative">
                <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                  HACK
                </span>
                <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-zinc-400 to-zinc-500">
                  NEX
                </span>
              </h1>
            </motion.div>

            {/* '26 Year Accent */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-[0.25em] pl-[0.25em] uppercase -mt-2"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                '26
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
