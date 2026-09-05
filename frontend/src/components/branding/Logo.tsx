import React from 'react';
import { cn } from '../../lib/utils';

interface LogoProps {
  variant?: 'hacknex' | 'nexus' | 'combined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'combined',
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'h-6 text-lg',
    md: 'h-8 text-xl',
    lg: 'h-12 text-3xl',
  };

  const logoImageSize = {
    sm: 'h-4 w-auto',
    md: 'h-5 w-auto',
    lg: 'h-7 w-auto',
  };

  return (
    <div className={cn('flex items-center gap-3 font-heading font-black tracking-wider select-none', sizeClasses[size], className)}>
      {(variant === 'hacknex' || variant === 'combined') && (
        <div className="flex items-center gap-2">
          {/* HackNEX Futuristic Hexagon Icon */}
          <svg className="w-8 h-8 text-white shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L29.8564 10V26L16 34L2.14359 26V10L16 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M11 11L21 21M21 11L11 21" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="text-white">
            HACK<span className="text-white">NEX</span>
          </span>
        </div>
      )}

      {variant === 'combined' && (
        <span className="text-[var(--color-text-muted)] font-normal text-sm hidden sm:inline">|</span>
      )}

      {(variant === 'nexus' || variant === 'combined') && (
        <div className="flex items-center gap-1.5 text-xs tracking-widest text-[var(--color-text-secondary)] uppercase">
          <img
            src="/logomain_svg.png"
            alt="NEXUS Logo"
            className={cn('shrink-0 object-contain invert brightness-200', logoImageSize[size])}
          />
          <span>NEXUS CLUB</span>
        </div>
      )}
    </div>
  );
};
