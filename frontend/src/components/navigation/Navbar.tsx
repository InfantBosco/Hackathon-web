import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';
import { Logo } from '../branding/Logo';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Domains', href: '#domains' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'FAQ', href: '#faq' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section highlight calculation
      const sections = navLinks.map((l) => l.href.substring(1));
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterClick = () => {
    trackEvent('register_cta_click', { location: 'navbar' });
    window.location.href = siteConfig.registerRoute;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'glass-panel border-b border-[var(--color-border-subtle)] py-3 shadow-xl'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
          <Logo variant="combined" size="md" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={cn(
                  'text-sm font-medium transition-colors relative py-1',
                  isActive ? 'text-[var(--color-accent-cyan)] font-semibold' : 'text-[var(--color-text-secondary)] hover:text-white'
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent-cyan)] rounded-full shadow-[0_0_8px_#00f0ff]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTAs: Login, Sign Up, Register Now */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/login"
            className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-mono font-semibold text-[var(--color-text-secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            LOGIN
          </a>
          <a
            href="/signup"
            className="px-3 rounded-[var(--radius-sm)] border border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] hover:bg-[rgba(255,30,66,0.15)] text-xs font-mono font-semibold py-1.5 transition-colors"
          >
            SIGN UP
          </a>
          <Button variant="primary" size="sm" onClick={handleRegisterClick} leftIcon={<Rocket className="w-4 h-4" />}>
            REGISTER NOW
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[var(--color-text-secondary)] hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel border-b border-[var(--color-border)] px-4 pt-4 pb-6 overflow-hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-base font-heading font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors py-2 border-b border-[var(--color-border-subtle)]"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[var(--color-border-subtle)]">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/login"
                    className="text-center py-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] text-xs font-mono font-semibold text-[var(--color-text-secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                  >
                    LOGIN
                  </a>
                  <a
                    href="/signup"
                    className="text-center py-2 rounded-[var(--radius-sm)] border border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] text-xs font-mono font-semibold hover:bg-[rgba(255,30,66,0.15)] transition-colors"
                  >
                    SIGN UP
                  </a>
                </div>
                <Button variant="primary" size="md" onClick={handleRegisterClick} className="w-full mt-1" leftIcon={<Rocket className="w-4 h-4" />}>
                  REGISTER NOW
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
