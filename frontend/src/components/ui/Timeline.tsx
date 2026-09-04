import React from 'react';
import { cn } from '../../lib/utils';

export interface TimelineItem {
  id: string;
  date: string;
  time?: string;
  title: string;
  description: string;
  status?: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div className={cn('relative border-l-2 border-[var(--color-border)] ml-4 pl-6 space-y-8', className)}>
      {items.map((item) => {
        const isCurrent = item.status === 'current';

        return (
          <div key={item.id} className="relative group">
            {/* Timeline Dot */}
            <span
              className={cn(
                'absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-[var(--color-bg-primary)] transition-all',
                item.status === 'completed' && 'border-emerald-500 bg-emerald-500',
                isCurrent && 'border-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)] shadow-[0_0_12px_rgba(0,240,255,0.8)] scale-125',
                (!item.status || item.status === 'upcoming') && 'border-[var(--color-border)]'
              )}
            />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[var(--color-accent-cyan)]">
                <span>{item.date}</span>
                {item.time && <span>• {item.time}</span>}
              </div>
              <h4 className="text-lg font-heading font-bold text-white group-hover:text-[var(--color-accent-cyan)] transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
