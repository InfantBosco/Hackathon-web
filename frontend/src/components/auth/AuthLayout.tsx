import React from 'react';
import { motion } from 'framer-motion';
import { AuthNavbar } from '../navigation/AuthNavbar';
import { GridBackground } from '../backgrounds/GridBackground';
import { NeuralNoise } from '../backgrounds/NeuralNoise';
import { siteConfig } from '../../data/siteConfig';
import { Calendar, MapPin, Shield } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <GridBackground className="min-h-screen flex flex-col justify-between relative overflow-hidden">
      <AuthNavbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          {/* Left Panel: Branding & Event Identity (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex lg:col-span-6 flex-col justify-between pr-8 relative"
          >
            <NeuralNoise opacity={0.25} />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] text-[var(--color-accent-cyan)] font-mono text-xs uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                <span>OFFICIAL ACCOUNT PORTAL</span>
              </div>

              <h1 className="text-5xl font-heading font-black text-white tracking-tight uppercase leading-tight">
                HACK<span className="text-[var(--color-accent-cyan)]">NEX</span> 2026
              </h1>

              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-md font-medium flex items-center gap-1.5 flex-wrap">
                <span>National Level Offline Hackathon organized by</span>
                <span className="inline-flex items-center gap-1 font-semibold text-white">
                  <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-4 w-auto shrink-0 inline-block align-middle" />
                  NEXUS
                </span>
                <span>Club, Karunya Institute of Technology and Sciences.</span>
              </p>

              <div className="space-y-3 pt-4 border-t border-[var(--color-border-subtle)] text-xs font-mono text-white">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[var(--color-accent-cyan)]" />
                  <span>{siteConfig.dates}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[var(--color-accent-purple)]" />
                  <span>{siteConfig.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 text-xs font-mono text-[var(--color-text-muted)] flex items-center gap-1">
              <span>© 2026</span>
              <span className="inline-flex items-center gap-1 font-semibold text-white">
                <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3 w-auto shrink-0 inline-block align-middle" />
                NEXUS
              </span>
              <span>Club • All Rights Reserved</span>
            </div>
          </motion.div>

          {/* Right Panel: Centered Auth Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 w-full max-w-md mx-auto"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-2xl">
              <div className="mb-6 text-center lg:text-left">
                <h2 className="text-2xl font-heading font-bold text-white mb-1">{title}</h2>
                {subtitle && <p className="text-xs text-[var(--color-text-secondary)]">{subtitle}</p>}
              </div>

              {children}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-4 text-center text-[10px] font-mono text-[var(--color-text-muted)] border-t border-[var(--color-border-subtle)]">
        HackNEX 2026 • 4 Members / Team • ₹600 Fee
      </div>
    </GridBackground>
  );
};
