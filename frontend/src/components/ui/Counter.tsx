import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // ms
  className?: string;
  label?: string;
}

export const Counter: React.FC<CounterProps> = ({
  end,
  prefix = '',
  suffix = '',
  duration = 2000,
  className,
  label,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return (
    <div className={cn('flex flex-col items-center justify-center text-center', className)}>
      <span className="text-4xl md:text-5xl font-heading font-black tracking-tight text-white">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
      {label && (
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mt-1">
          {label}
        </span>
      )}
    </div>
  );
};
