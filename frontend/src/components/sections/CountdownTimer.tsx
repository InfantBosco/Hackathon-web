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
      <div className="glass-panel px-6 py-4 rounded-[var(--radius-lg)] text-center text-lg font-heading font-bold text-white border border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.4)]">
        HACKNEX 2026 IS LIVE!
      </div>
    );
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
      {[
        { label: 'DAYS', value: formatNumber(timeLeft.days), colorClass: 'border-[#4285F4]/40 shadow-[0_0_20px_rgba(66,133,244,0.25)] hover:border-[#4285F4] hover:shadow-[0_0_30px_rgba(66,133,244,0.45)]' },
        { label: 'HOURS', value: formatNumber(timeLeft.hours), colorClass: 'border-[#EA4335]/40 shadow-[0_0_20px_rgba(234,67,53,0.25)] hover:border-[#EA4335] hover:shadow-[0_0_30px_rgba(234,67,53,0.45)]' },
        { label: 'MINUTES', value: formatNumber(timeLeft.minutes), colorClass: 'border-[#FBBC05]/40 shadow-[0_0_20px_rgba(251,188,5,0.25)] hover:border-[#FBBC05] hover:shadow-[0_0_30px_rgba(251,188,5,0.45)]' },
        { label: 'SECONDS', value: formatNumber(timeLeft.seconds), colorClass: 'border-[#34A853]/40 shadow-[0_0_20px_rgba(52,168,83,0.25)] hover:border-[#34A853] hover:shadow-[0_0_30px_rgba(52,168,83,0.45)]' },
      ].map((item) => (
        <div
          key={item.label}
          className={`glass-panel p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center hover:scale-105 sm:hover:scale-110 transition-all duration-300 select-none bg-zinc-950/85 backdrop-blur-md cursor-pointer ${item.colorClass}`}
        >
          <span className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
            {item.value}
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-300 mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
