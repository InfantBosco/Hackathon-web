import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface SplitTextRevealProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  delay?: number;
  duration?: number;
  mode?: 'lines' | 'words' | 'container';
  viewportMargin?: string;
  once?: boolean;
}

/**
 * SplitTextReveal (Awwwards Curtain Split-Line Mask Reveal)
 * Hides text behind an overflow-hidden line mask and reveals words/lines sliding up on scroll.
 */
export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  children,
  text,
  className = '',
  delay = 0,
  duration = 0.75,
  mode = 'words',
  viewportMargin = '-40px',
  once = true,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once, margin: viewportMargin as any });
  const shouldReduceMotion = useReducedMotion();

  const contentText = text || (typeof children === 'string' ? children : null);

  if (shouldReduceMotion) {
    return <span className={className}>{contentText || children}</span>;
  }

  // If we have plain string text and mode is words, split into curtain-masked word blocks
  if (contentText && mode === 'words') {
    const words = contentText.split(' ');
    return (
      <span ref={containerRef} className={cn('inline-flex flex-wrap gap-x-[0.25em]', className)}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-0.5">
            <motion.span
              initial={{ y: '115%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
              transition={{
                duration,
                delay: delay + i * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block will-change-transform"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  // General element / line curtain mask reveal
  return (
    <span ref={containerRef} className={cn('inline-block overflow-hidden py-0.5', className)}>
      <motion.span
        initial={{ y: '115%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block w-full will-change-transform"
      >
        {children || contentText}
      </motion.span>
    </span>
  );
};

export default SplitTextReveal;
