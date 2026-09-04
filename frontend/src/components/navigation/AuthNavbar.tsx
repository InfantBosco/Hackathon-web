import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../branding/Logo';
import { ArrowLeft } from 'lucide-react';

export const AuthNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between z-20">
      <a href="/" className="hover:opacity-90 transition-opacity">
        <Logo variant="combined" size="md" />
      </a>

      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-text-secondary)] hover:text-white transition-colors focus:outline-none cursor-pointer"
        aria-label="Go to previous page"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK</span>
      </button>
    </header>
  );
};
