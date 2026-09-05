import React from 'react';

interface NexusTextProps {
  className?: string;
  logoClassName?: string;
  showClub?: boolean;
  suffix?: string;
  children?: React.ReactNode;
}

export const NexusText: React.FC<NexusTextProps> = ({
  className = '',
  logoClassName = 'h-4 w-auto inline-block align-middle shrink-0',
  showClub = false,
  suffix = '',
  children,
}) => {
  return (
    <span className={`inline-flex items-center gap-1.5 align-middle ${className}`}>
      <img
        src="/logomain_svg.png"
        alt="NEXUS Logo"
        className={logoClassName}
      />
      <span>
        NEXUS{showClub ? ' Club' : ''}{suffix ? ` ${suffix}` : ''}
        {children}
      </span>
    </span>
  );
};

export function withNexusLogo(text: string, logoClassName = 'h-4 w-auto inline-block align-middle mx-1') {
  // Matches "NEXUS" or "Nexus" when NOT part of "HackNEX" or "hacknex"
  const parts = text.split(/(?<!Hack|hack)(NEXUS|Nexus)/g);
  
  return parts.map((part, index) => {
    if (part === 'NEXUS' || part === 'Nexus') {
      return (
        <span key={index} className="inline-flex items-center gap-1 align-middle">
          <img src="/logomain_svg.png" alt="NEXUS Logo" className={logoClassName} />
          <span>{part}</span>
        </span>
      );
    }
    return part;
  });
}
