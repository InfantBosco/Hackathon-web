import React from 'react';
import { siteConfig } from '../../data/siteConfig';
import { Linkedin, ExternalLink } from 'lucide-react';

export const CinematicFooter: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#030712] border-t border-white/[0.06] pt-12 pb-8 text-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logomain_svg.png" alt="NEXUS" className="h-6 w-auto" />
              <span className="font-heading font-black text-white tracking-tight">
                HACK<span className="text-slate-400">NEX</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              HackNEX 2026 is a 24 Hour National Level Hackathon organized by NEXUS Club at Karunya Institute of Technology and Sciences, Coimbatore.
            </p>
            <span className="block text-[11px] font-mono text-slate-600 mt-3 tracking-wider">
              OCTOBER 8–9, 2026 · COIMBATORE
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Tracks', href: '#tracks' },
                { label: 'Schedule', href: '#schedule' },
                { label: 'Prizes', href: '#prizes' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-4">
              Connect
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>NEXUS LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-40" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3 opacity-40" />
              </a>
              <a
                href={siteConfig.socials.university}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
              >
                <span>Karunya University</span>
                <ExternalLink className="w-3 h-3 opacity-40" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
          <p>
            © 2026 HackNEX · NEXUS Club, Karunya Institute of Technology and Sciences
          </p>
          <p className="font-mono tracking-wider">
            HACKNEX.ME
          </p>
        </div>
      </div>
    </footer>
  );
};
