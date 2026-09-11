import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Users, ExternalLink } from 'lucide-react';
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
                className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-md"
              />
            </Dialog.Overlay>

            {/* Modal Box */}
            <div className="fixed inset-0 z-[510] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                  className="relative w-full max-w-lg rounded-[2rem] sm:rounded-[2.5rem] bg-[#0c0914]/95 border border-amber-500/35 p-6 sm:p-8 shadow-[0_0_80px_rgba(245,158,11,0.3)] backdrop-blur-2xl text-white outline-none overflow-hidden my-auto"
                >
                  {/* Glowing Background Radial Accents inside Modal */}
                  <div className="absolute -top-24 -left-24 w-60 h-60 bg-amber-500/20 blur-[80px] rounded-full pointer-events-none" />
                  <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />

                  {/* Header & Close Button */}
                  <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10 relative z-10">
                    <div>
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                        REGISTRATION PORTAL
                      </span>
                      <Dialog.Title className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-tight mt-1">
                        Select Category
                      </Dialog.Title>
                      <Dialog.Description className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
                        Please choose your participant category to continue.
                      </Dialog.Description>
                    </div>

                    <Dialog.Close asChild>
                      <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 focus:outline-none"
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
                      className="group relative p-5 rounded-2xl bg-[#130f21]/90 border border-amber-500/30 hover:border-amber-400 shadow-md hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-heading font-bold text-white group-hover:text-amber-300 transition-colors">
                            Karunya Student
                          </h4>
                          <p className="text-xs text-slate-300 mt-0.5 font-sans">
                            If you are a Karunya University Student{' '}
                            <span className="text-amber-400 font-bold underline group-hover:text-amber-300">
                              Click Here
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all shrink-0 self-end sm:self-center">
                        <span>OPEN FORM</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Option 2: External Participant */}
                    <div
                      onClick={() => handleOptionClick('external_participant', siteConfig.externalParticipantUrl)}
                      className="group relative p-5 rounded-2xl bg-[#130f21]/90 border border-cyan-500/30 hover:border-cyan-400 shadow-md hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                          <Users className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                            External Participant
                          </h4>
                          <p className="text-xs text-slate-300 mt-0.5 font-sans">
                            If you are an external participant{' '}
                            <span className="text-cyan-400 font-bold underline group-hover:text-cyan-300">
                              Click Here
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all shrink-0 self-end sm:self-center">
                        <span>OPEN FORM</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Footer note */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 relative z-10">
                    <span>HACKNEX '26 • COIMBATORE</span>
                    <span className="text-amber-400 font-semibold">OCTOBER 7–9</span>
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
