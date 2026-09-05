import React from 'react';
import { siteConfig } from '../../data/siteConfig';
import { Linkedin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 border-t border-white/10 pt-16 pb-12 text-sm text-[var(--color-text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col without symbol near HACKNEX and using original logomain_svg.png */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 font-heading font-black tracking-wider select-none text-xl">
              <span className="text-white">
                HACK<span className="text-slate-300">NEX</span>
              </span>
              <span className="text-zinc-600 font-normal text-sm hidden sm:inline">|</span>
              <div className="flex items-center gap-2 text-xs tracking-widest text-slate-300 uppercase">
                <img
                  src="/logomain_svg.png"
                  alt="NEXUS Logo"
                  className="h-5 w-auto shrink-0 object-contain"
                />
                <span>NEXUS CLUB</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed max-w-sm text-[var(--color-text-muted)]">
              HackNEX 2026 is a 3-day national offline hackathon organized by{' '}
              <span className="inline-flex items-center gap-1 font-semibold text-white">
                <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3.5 w-auto shrink-0 inline-block align-middle" />
                NEXUS
              </span>{' '}
              Club at Karunya Institute of Technology and Sciences, Coimbatore.
            </p>
            <div className="text-xs font-mono text-slate-300 tracking-wider">
              OCTOBER 7–9, 2026 • COIMBATORE
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About HackNEX</a></li>
              <li><a href="#domains" className="hover:text-white transition-colors">Domain Tracks</a></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Event Schedule</a></li>
              <li><a href="#prizes" className="hover:text-white transition-colors">Prizes & Awards</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            <div className="flex flex-col gap-3 text-xs">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-white" />
                <span className="inline-flex items-center gap-1">
                  <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3.5 w-auto shrink-0 inline-block align-middle" />
                  NEXUS LinkedIn
                </span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>

              <a
                href={siteConfig.socials.university}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white transition-colors"
              >
                <span>Karunya KITS Official</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-text-muted)] gap-4">
          <p className="flex items-center gap-1 flex-wrap">
            © 2026 HackNEX •{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3.5 w-auto shrink-0 inline-block align-middle" />
              NEXUS
            </span>{' '}
            Club, Karunya Institute of Technology and Sciences. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
