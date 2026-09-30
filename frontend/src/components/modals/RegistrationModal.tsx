import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, AlertCircle, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [showExternalClosedNotice, setShowExternalClosedNotice] = useState(false);

  const handleClose = () => {
    setShowExternalClosedNotice(false);
    onClose();
  };

  const handleKarunyaClick = () => {
    trackEvent('register_option_click', { category: 'karunya_student' });
    window.open(siteConfig.karunyaStudentUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  const handleExternalClick = () => {
    trackEvent('register_option_click', { category: 'external_participant_closed' });
    setShowExternalClosedNotice(true);
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
                        {showExternalClosedNotice ? 'Notice' : 'Select Category'}
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

                  {/* Main Content Area */}
                  <div className="py-6 relative z-10">
                    <AnimatePresence mode="wait">
                      {!showExternalClosedNotice ? (
                        /* Categories View */
                        <motion.div
                          key="categories-list"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          {/* Option 1: Karunya Student */}
                          <div
                            onClick={handleKarunyaClick}
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

                          {/* Option 2: External Participant (Triggers closed notice popup) */}
                          <div
                            onClick={handleExternalClick}
                            className="group relative p-5 rounded-2xl bg-[#130f21]/90 border border-white/15 hover:border-amber-500/50 shadow-md hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-300 cursor-pointer flex flex-row items-center justify-between gap-4 hover:-translate-y-0.5 active:scale-[0.99] touch-manipulation"
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

                            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 group-hover:text-red-300 transition-colors shrink-0">
                              <span>REGISTRATION CLOSED</span>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        /* External Participant Closed Notice View */
                        <motion.div
                          key="external-closed-notice"
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                          className="space-y-6 text-center py-4"
                        >
                          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.2)]">
                            <AlertCircle className="w-8 h-8" />
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-tight">
                              Registration Closed
                            </h3>
                            <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed max-w-sm mx-auto font-medium">
                              Registration is closed for External Participants.
                            </p>
                            <p className="text-xs text-slate-400 font-sans">
                              Thank you for your interest in HackNEX 2026!
                            </p>
                          </div>

                          <div className="pt-2 flex justify-center">
                            <button
                              type="button"
                              onClick={() => setShowExternalClosedNotice(false)}
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors border border-white/20 cursor-pointer"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>Back to Categories</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer note */}
                  <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 relative z-10">
                    <span>HACKNEX '26 • COIMBATORE</span>
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
