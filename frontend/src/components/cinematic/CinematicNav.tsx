import React, { useState, useEffect } from 'react';
import { StaggeredMenu } from '../ui/staggered-menu';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'FAQ', href: '#faq' },
];

const staggeredItems = navLinks.map((link) => ({
  label: link.name,
  link: link.href,
}));

const socialItems = [
  { label: 'Instagram', link: siteConfig.socials.instagram },
  { label: 'LinkedIn', link: siteConfig.socials.linkedin },
  { label: 'University', link: siteConfig.socials.university },
];

interface CinematicNavProps {
  onRegisterClick: () => void;
}

export const CinematicNav: React.FC<CinematicNavProps> = ({ onRegisterClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section detection
      const sections = ['home', 'about', 'tracks', 'schedule', 'prizes', 'sponsors', 'faq'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.getElementById(href.substring(1));
      if (el) {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(el);
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleRegister = () => {
    trackEvent('register_cta_click', { location: 'nav' });
    onRegisterClick();
  };

  return (
    <>
      {/* Mobile — preserved StaggeredMenu */}
      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          items={staggeredItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          colors={['#05070f', '#0d111e', '#161c2e']}
          accentColor="#f59e0b"
          logoUrl="/logomain_svg.png"
          isFixed={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          onItemClick={(link) => handleNavClick(link)}
        />
      </div>

      {/* Desktop — cinematic fixed nav */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-[200] items-center justify-between px-8 lg:px-12 transition-all duration-500 ${
          scrolled
            ? 'h-16 bg-[#030712]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'h-20 bg-transparent'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <img
            src="/logomain_svg.png"
            alt="NEXUS"
            className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="font-hacknex text-base tracking-tight text-white">
            HACK<span className="text-slate-400">NEX</span>
          </span>
        </button>

        {/* Center links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-300 rounded-lg ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Register CTA */}
        <button
          onClick={handleRegister}
          className="px-5 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-black bg-white rounded-lg hover:bg-slate-200 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
        >
          Register
        </button>
      </nav>
    </>
  );
};
