import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(siteConfig.eventStartDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsCompleted(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isCompleted) {
    return (
      <div className="glass-panel px-6 py-4 rounded-[var(--radius-lg)] text-center text-lg font-heading font-bold text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]">
        HACKNEX 2026 IS LIVE!
      </div>
    );
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
      {[
        { label: 'DAYS', value: formatNumber(timeLeft.days) },
        { label: 'HOURS', value: formatNumber(timeLeft.hours) },
        { label: 'MINUTES', value: formatNumber(timeLeft.minutes) },
        { label: 'SECONDS', value: formatNumber(timeLeft.seconds) },
      ].map((item) => (
        <div
          key={item.label}
          className="glass-panel border border-[var(--color-border-subtle)] p-3 sm:p-4 rounded-[var(--radius-md)] flex flex-col items-center justify-center text-center shadow-lg hover:border-[var(--color-accent-cyan)] transition-colors"
        >
          <span className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white font-mono">
            {item.value}
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
