import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShaderAnimation } from '../ui/shader-animation';

export interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 4.2s total duration for slower, elegant animation
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3400);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="shader-splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-auto select-none bg-black"
        >
          {/* Three.js WebGL Shader Animation Canvas */}
          <div className="absolute inset-0 z-0 opacity-80">
            <ShaderAnimation />
          </div>

          {/* Centered HackNEX '26 Typography Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <motion.h1
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-8xl lg:text-9xl font-heading font-black tracking-tighter uppercase select-none text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]"
            >
              <span className="text-white">HACK</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-zinc-400 to-zinc-500 ml-0.5">
                NEX
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-[0.25em] pl-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_0_35px_rgba(245,158,11,0.65)] uppercase -mt-2"
            >
              '26
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
