import React from 'react';
import { Logo } from '../branding/Logo';
import { ArrowLeft } from 'lucide-react';

export const AuthNavbar: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between z-20">
      <a href="/" className="hover:opacity-90 transition-opacity">
        <Logo variant="combined" size="md" />
      </a>

      <a
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-text-secondary)] hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO HOME</span>
      </a>
    </header>
  );
};
