import React from 'react';
import { motion } from 'framer-motion';
import RandomLetterSwapNav from '../ui/m-random-letter-swap-1';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Chief Guest', href: '#chief-guest' },
  { name: 'Domains', href: '#domains' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'Contact', href: '#contact' },
  { name: 'FAQ', href: '#faq' },
];

export const Navbar: React.FC = () => {
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.05 }}
    >
      <RandomLetterSwapNav items={navLinks} onNavClick={handleNavClick} />
    </motion.div>
  );
};

export default Navbar;
