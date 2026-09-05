"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  href: string;
}

const defaultNavItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Domains", href: "#domains" },
  { name: "Schedule", href: "#schedule" },
  { name: "Prizes", href: "#prizes" },
  { name: "Sponsors", href: "#sponsors" },
  { name: "FAQ", href: "#faq" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 20, stiffness: 300 },
      opacity: { duration: 0.2 },
      type: "spring",
      damping: 22,
      stiffness: 350,
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 350,
      when: "afterChildren",
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 18, stiffness: 350 } },
  collapsed: { opacity: 0, x: -15, scale: 0.9, transition: { duration: 0.15 } },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.7, transition: { duration: 0.15 } },
  collapsed: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 350,
      delay: 0.1,
    }
  },
};

interface AnimatedNavFramerProps {
  items?: NavItem[];
  className?: string;
  onNavClick?: (href: string) => void;
}

export function AnimatedNavFramer({
  items = defaultNavItems,
  className,
  onNavClick
}: AnimatedNavFramerProps) {
  const [isExpanded, setExpanded] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("home");
  
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);
  const ticking = React.useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    
    // Fast state evaluation
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest; 
    } 
    else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
      setExpanded(true);
    }
    
    lastScrollY.current = latest;

    // Fast throttled active section check using requestAnimationFrame
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const sections = items.map((l) => l.href.replace(/^#/, ""));
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 180 && rect.bottom >= 180) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  });

  const handleContainerClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.stopPropagation();
    if (onNavClick) {
      onNavClick(href);
    } else if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={cn("fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] will-change-transform", className)}>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.12 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleContainerClick}
        className={cn(
          "flex items-center overflow-hidden rounded-full border border-[rgba(255,30,66,0.35)] bg-[#0b0f19]/90 shadow-[0_0_30px_rgba(0,0,0,0.6)] backdrop-blur-lg h-12 px-3 transition-colors duration-200",
          !isExpanded && "cursor-pointer justify-center px-0"
        )}
      >
        <motion.div
          className={cn(
            "flex items-center gap-1 sm:gap-2 px-1 py-0.5",
            !isExpanded && "pointer-events-none opacity-0"
          )}
        >
          {items.map((item) => {
            const isActive = activeSection === item.href.replace(/^#/, "");
            return (
              <motion.a
                key={item.name}
                href={item.href}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={cn(
                  "text-xs sm:text-sm font-medium transition-all duration-200 ease-out px-3 py-1 rounded-full relative select-none cursor-pointer border border-transparent whitespace-nowrap",
                  isActive
                    ? "text-[#00f0ff] font-semibold bg-[rgba(0,240,255,0.15)] border-[rgba(0,240,255,0.4)] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    : "text-[var(--color-text-secondary)] hover:text-white hover:bg-[rgba(0,240,255,0.1)] hover:border-[rgba(0,240,255,0.25)] hover:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                )}
              >
                {item.name}
              </motion.a>
            );
          })}
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
            className="text-[var(--color-accent-cyan)]"
          >
            <Menu className="h-5 w-5" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}

export default AnimatedNavFramer;
