import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={cn(
              'relative z-10 w-full max-w-lg glass-panel rounded-[var(--radius-xl)] p-6 shadow-2xl border border-[var(--color-border)]',
              className
            )}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
              {title && <h3 className="text-xl font-heading font-bold text-white">{title}</h3>}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Close dialog"
                className="!p-1.5 rounded-full"
              >
                <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </Button>
            </div>

            <div className="py-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {children}
            </div>

            {footer && (
              <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
