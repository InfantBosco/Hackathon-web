import React from 'react';
import { motion } from 'framer-motion';
import RandomLetterSwapNav from '../ui/m-random-letter-swap-1';
import { StaggeredMenu } from '../ui/staggered-menu';
import { siteConfig } from '../../data/siteConfig';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Domains', href: '#domains' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'Contact', href: '#contact' },
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
    <>
      {/* Mobile Animated GSAP Staggered Menu */}
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

      {/* Desktop Random Letter Swap Navigation Bar */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.05 }}
        >
          <RandomLetterSwapNav items={navLinks} onNavClick={handleNavClick} />
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
