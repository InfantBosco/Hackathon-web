import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const handleOptionClick = (type: 'karunya_student' | 'external_participant', url: string) => {
    trackEvent('register_option_click', { category: type });
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

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
            <div className="fixed inset-0 z-[510] flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ type: 'spring', stiffness: 170, damping: 22 }}
                  className="relative w-full max-w-lg rounded-[1.75rem] sm:rounded-[2.5rem] bg-[#0c0a12]/95 border border-white/20 p-5 sm:p-8 shadow-[0_0_60px_rgba(255,255,255,0.18)] backdrop-blur-xl sm:backdrop-blur-2xl text-white outline-none overflow-hidden my-auto font-royal transform-gpu"
                >
                  {/* Subtle White Ambient Radial Accents */}
                  <div className="absolute -top-24 -left-24 w-60 h-60 bg-white/10 blur-[90px] rounded-full pointer-events-none" />
                  <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

                  {/* Header & Close Button */}
                  <div className="flex items-start justify-between gap-4 pb-4 sm:pb-5 border-b border-white/10 relative z-10">
                    <div>
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400">
                        REGISTRATION PORTAL
                      </span>
                      <Dialog.Title className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
                        Select Category
                      </Dialog.Title>
                      <Dialog.Description className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1 font-medium">
                        Please choose your participant category to continue.
                      </Dialog.Description>
                    </div>

                    <Dialog.Close asChild>
                      <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all shrink-0 focus:outline-none touch-manipulation"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Options List */}
                  <div className="py-5 sm:py-6 space-y-3.5 sm:space-y-4 relative z-10">
                    {/* Option 1: Karunya Student */}
                    <div
                      onClick={() => handleOptionClick('karunya_student', siteConfig.karunyaStudentUrl)}
                      className="group relative p-4 sm:p-5 rounded-2xl bg-[#14101d]/90 border border-white/15 hover:border-white/70 shadow-md hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-4 hover:-translate-y-0.5 touch-manipulation"
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4">
                        <span className="text-amber-400 group-hover:text-white font-mono text-xl sm:text-2xl font-bold select-none shrink-0 group-hover:scale-110 transition-all pl-0.5 sm:pl-1">
                          /
                        </span>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                            Karunya Student
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-400 group-hover:text-slate-200 mt-0.5 transition-colors">
                            If you are a Karunya University Student
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-amber-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 self-end sm:self-center">
                        <span>OPEN FORM</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Option 2: External Participant */}
                    <div
                      onClick={() => handleOptionClick('external_participant', siteConfig.externalParticipantUrl)}
                      className="group relative p-4 sm:p-5 rounded-2xl bg-[#14101d]/90 border border-white/15 hover:border-white/70 shadow-md hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-4 hover:-translate-y-0.5 touch-manipulation"
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4">
                        <span className="text-amber-400 group-hover:text-white font-mono text-xl sm:text-2xl font-bold select-none shrink-0 group-hover:scale-110 transition-all pl-0.5 sm:pl-1">
                          /
                        </span>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                            External Participant
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-400 group-hover:text-slate-200 mt-0.5 transition-colors">
                            If you are an external participant
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-amber-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 self-end sm:self-center">
                        <span>OPEN FORM</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Footer note */}
                  <div className="pt-3.5 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400 relative z-10">
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
