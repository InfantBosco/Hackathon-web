import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

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
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-amber-400 to-red-500 origin-left z-[100] pointer-events-none shadow-[0_0_12px_rgba(251,191,36,0.6)]"
      />
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.05 }}
      >
        <RandomLetterSwapNav items={navLinks} onNavClick={handleNavClick} />
      </motion.div>
    </>
  );
};

export default Navbar;
