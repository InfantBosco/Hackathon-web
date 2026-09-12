import React, { useState } from 'react';
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
  const [showKarunyaNotice, setShowKarunyaNotice] = useState(false);

  const handleClose = () => {
    setShowKarunyaNotice(false);
    onClose();
  };

  const handleOptionClick = (type: 'karunya_student' | 'external_participant', url: string) => {
    trackEvent('register_option_click', { category: type });
    if (type === 'karunya_student') {
      setShowKarunyaNotice(true);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
      handleClose();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
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
                {showKarunyaNotice ? (
                  <motion.div
                    key="karunya-notice"
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 10 }}
                    transition={{ type: 'spring', stiffness: 170, damping: 22 }}
                    className="relative w-full max-w-md rounded-[2rem] bg-[#0c0914]/95 border border-white/20 p-8 sm:p-10 shadow-[0_0_60px_rgba(255,255,255,0.18)] backdrop-blur-2xl text-white outline-none overflow-hidden my-auto transform-gpu text-center"
                  >
                    {/* White Glow Ambient Accents inside Modal */}
                    <div className="absolute -top-24 -left-24 w-60 h-60 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-slate-300/10 blur-[80px] rounded-full pointer-events-none" />

                    {/* Close Button */}
                    <div className="absolute top-4 right-4 z-20">
                      <Dialog.Close asChild>
                        <button
                          onClick={handleClose}
                          className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 focus:outline-none touch-manipulation"
                          aria-label="Close"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* 1 Line Only in Royal Font */}
                    <div className="relative z-10 py-6 px-2 text-center font-royal font-black text-base sm:text-lg text-white uppercase tracking-wider leading-relaxed">
                      Registrations opens soon for Karunya University Participants!!!
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="category-selection"
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 15 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                    className="relative w-full max-w-lg rounded-[2rem] sm:rounded-[2.5rem] bg-[#0c0914]/95 border border-white/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(255,255,255,0.15)] backdrop-blur-2xl text-white outline-none overflow-hidden my-auto transform-gpu font-sans"
                  >
                    {/* White Glow Ambient Accents inside Modal */}
                    <div className="absolute -top-24 -left-24 w-60 h-60 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-slate-300/10 blur-[80px] rounded-full pointer-events-none" />

                    {/* Header & Close Button */}
                    <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10 relative z-10">
                      <div>
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-white">
                          REGISTRATION PORTAL
                        </span>
                        <Dialog.Title className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-tight mt-1">
                          Select Category
                        </Dialog.Title>
                      </div>

                      <Dialog.Close asChild>
                        <button
                          onClick={handleClose}
                          className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 focus:outline-none touch-manipulation"
                          aria-label="Close"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Options List */}
                    <div className="py-6 space-y-4 relative z-10">
                      {/* Option 1: Karunya Student */}
                      <div
                        onClick={() => handleOptionClick('karunya_student', siteConfig.karunyaStudentUrl)}
                        className="group relative p-5 rounded-2xl bg-[#130f21]/90 border border-white/15 hover:border-white/60 shadow-md hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer flex flex-row items-center justify-between gap-4 hover:-translate-y-0.5 active:scale-[0.99] touch-manipulation"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xl sm:text-2xl font-mono font-bold text-amber-400/80 group-hover:text-amber-300 shrink-0 transition-colors select-none">
                            /
                          </span>
                          <div>
                            <h4 className="text-sm sm:text-base font-heading font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                              Karunya Student
                            </h4>
                            <p className="text-xs text-slate-300 group-hover:text-slate-200 mt-0.5 font-sans">
                              If you are a Karunya University Student
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all shrink-0">
                          <span>OPEN FORM</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Option 2: External Participant */}
                      <div
                        onClick={() => handleOptionClick('external_participant', siteConfig.externalParticipantUrl)}
                        className="group relative p-5 rounded-2xl bg-[#130f21]/90 border border-white/15 hover:border-white/60 shadow-md hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer flex flex-row items-center justify-between gap-4 hover:-translate-y-0.5 active:scale-[0.99] touch-manipulation"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xl sm:text-2xl font-mono font-bold text-amber-400/80 group-hover:text-amber-300 shrink-0 transition-colors select-none">
                            /
                          </span>
                          <div>
                            <h4 className="text-sm sm:text-base font-heading font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                              External Participant
                            </h4>
                            <p className="text-xs text-slate-300 group-hover:text-slate-200 mt-0.5 font-sans">
                              If you are an external participant
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all shrink-0">
                          <span>OPEN FORM</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Footer note */}
                    <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 relative z-10">
                      <span>HACKNEX '26 • COIMBATORE</span>
                    </div>
                  </motion.div>
                )}
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
