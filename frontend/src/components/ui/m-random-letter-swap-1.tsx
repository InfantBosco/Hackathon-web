"use client";

import * as React from "react";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  href: string;
}

const defaultLinks: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Domains", href: "#domains" },
  { name: "Schedule", href: "#schedule" },
  { name: "Prizes", href: "#prizes" },
  { name: "Sponsors", href: "#sponsors" },
  { name: "Contact", href: "#contact" },
  { name: "FAQ", href: "#faq" },
];

interface RandomLetterSwapNavProps {
  items?: NavItem[];
  className?: string;
  onNavClick?: (href: string) => void;
}

export default function RandomLetterSwapNav({
  items = defaultLinks,
  className,
  onNavClick,
}: RandomLetterSwapNavProps) {
  const [activeSection, setActiveSection] = React.useState("home");
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);

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
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/90 border-b border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.85)] backdrop-blur-md py-3.5"
          : "bg-black/60 border-b border-white/5 py-4 backdrop-blur-sm",
        className
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-center">
        <nav className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-6 flex-wrap">
          {items.map((item) => {
            const isActive = activeSection === item.href.replace(/^#/, "");
            return (
              <RandomLetterSwap
                key={item.name}
                label={item.name}
                isActive={isActive}
                staggerDuration={0.025}
                transition={{ duration: 0.6, type: "spring", damping: 18, stiffness: 250 }}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={cn(
                  "cursor-pointer font-medium text-sm transition-all duration-300 rounded-full px-3 py-1 border select-none",
                  isActive
                    ? "bg-gradient-to-r from-zinc-800 via-zinc-900 to-black text-white font-semibold border-zinc-600 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                    : "text-zinc-300 border-transparent hover:bg-gradient-to-r hover:from-zinc-800 hover:to-black hover:text-white hover:border-zinc-700 hover:shadow-md"
                )}
              />
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export { RandomLetterSwapNav };
