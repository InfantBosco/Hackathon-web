import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[500] bg-black/85 backdrop-blur-md transform-gpu"
              />
            </Dialog.Overlay>

            {/* Modal Box */}
            <div className="fixed inset-0 z-[510] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ type: 'spring', stiffness: 170, damping: 22 }}
                  className="relative w-full max-w-md rounded-3xl bg-[#0c0a12]/95 border border-white/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(255,255,255,0.18)] backdrop-blur-2xl text-white outline-none overflow-hidden my-auto text-center font-sans transform-gpu"
                >
                  {/* Glowing Ambient Accents */}
                  <div className="absolute -top-20 -left-20 w-48 h-48 bg-amber-500/15 blur-[80px] rounded-full pointer-events-none" />
                  <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-white/10 blur-[80px] rounded-full pointer-events-none" />

                  {/* Close Icon */}
                  <div className="absolute top-4 right-4 z-20">
                    <Dialog.Close asChild>
                      <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-none touch-manipulation"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Title & Badge */}
                  <div className="relative z-10 space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-white">
                      REGISTRATION PORTAL
                    </span>
                    <Dialog.Title className="text-2xl sm:text-3xl font-royal font-black text-white uppercase tracking-wider">
                      COMING SOON!!!
                    </Dialog.Title>
                  </div>

                  {/* Description */}
                  <div className="relative z-10 mt-4 mb-6">
                    <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                      Official registrations for <strong className="text-amber-400 font-royal font-bold">HackNEX '26</strong> will open soon! Stay tuned and get your team ready.
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="relative z-10 pt-2">
                    <button
                      onClick={onClose}
                      className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-white via-slate-100 to-slate-200 text-black font-royal font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                      GOT IT
                    </button>
                  </div>

                  {/* Footer note */}
                  <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 relative z-10">
                    <span>HACKNEX '26 • KITS, COIMBATORE</span>
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
