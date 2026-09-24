import React from 'react';
import { Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ChiefGuestCardProps {
  avatar: string;
  name: string;
  title: string;
  description: string;
  linkedinUrl: string;
}

export const ChiefGuestCard: React.FC<ChiefGuestCardProps> = ({
  avatar,
  name,
  title,
  description,
  linkedinUrl,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center p-2 sm:p-4">
      {/* Left Photo Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-xs sm:max-w-sm md:w-[340px] aspect-[4/5] rounded-[32px] overflow-hidden border-2 border-white/30 shadow-[0_0_35px_rgba(255,255,255,0.15)] shrink-0 z-0 group"
      >
        <img
          src={avatar}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* Right Overlapping Info Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md md:max-w-lg -mt-10 md:mt-0 md:-ml-14 z-10 p-6 sm:p-8 bg-[#0a0c16]/95 backdrop-blur-2xl border border-white/20 rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:border-amber-400/50"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400 block mb-2">
          CHIEF GUEST & KEYNOTE SPEAKER
        </span>

        <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight mb-2">
          {name}
        </h3>

        <p className="text-xs sm:text-sm font-sans font-semibold text-slate-200 mb-3 leading-snug">
          {title}
        </p>

        <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed mb-6 font-medium">
          {description}
        </p>

        {/* Social Link Button */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/10">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-md hover:scale-110"
          >
            <Linkedin className="w-5 h-5 fill-current" />
          </a>
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            Connect on LinkedIn (12.9K+ Followers)
          </span>
        </div>
      </motion.div>
    </div>
  );
};
