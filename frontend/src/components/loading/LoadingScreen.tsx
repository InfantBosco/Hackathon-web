import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  videoSrc?: string;
  onComplete?: () => void;
  isLoading?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  videoSrc = '/assets/loadingscreen.mp4',
  onComplete,
  isLoading = true,
}) => {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleEnded = () => {
    setVideoEnded(true);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <AnimatePresence>
      {isLoading && !videoEnded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-primary)] overflow-hidden"
        >
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            {/* Fallback visual if video format unsupported */}
            <div className="flex flex-col items-center gap-4 text-white">
              <div className="w-12 h-12 border-4 border-[var(--color-accent-cyan)] border-t-transparent rounded-full animate-spin" />
              <span className="font-heading font-bold text-xl tracking-wider">HACKNEX 2026</span>
            </div>
          </video>

          {/* Skip button for accessibility */}
          <button
            onClick={handleEnded}
            className="absolute bottom-6 right-6 px-4 py-2 text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-surface-glass)] border border-[var(--color-border-subtle)] rounded-full hover:text-white transition-colors"
          >
            SKIP INTRO →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
