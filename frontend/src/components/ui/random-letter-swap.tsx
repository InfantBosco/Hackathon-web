"use client";

import React, { useState } from "react";
import { motion, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: Transition;
  onClick?: (e: React.MouseEvent) => void;
  isActive?: boolean;
}

export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: "spring", damping: 18, stiffness: 250 },
  onClick,
  isActive = false,
}: RandomLetterSwapProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isAnimated = isHovered || isActive;

  return (
    <motion.span
      className={cn(
        "inline-flex overflow-hidden relative cursor-pointer select-none py-1.5 px-2.5 rounded-md transition-colors",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      <span className="flex items-center aria-hidden:true font-heading font-medium tracking-wide">
        {label.split("").map((char, index) => {
          if (char === " ") {
            return <span key={index}>&nbsp;</span>;
          }
          return (
            <span key={index} className="relative inline-block overflow-hidden h-[1.25em]">
              <motion.span
                className="inline-block"
                initial={{ y: "0%" }}
                animate={{ y: isAnimated ? "-100%" : "0%" }}
                transition={{
                  ...transition,
                  delay: index * staggerDuration,
                }}
              >
                {char}
              </motion.span>
              <motion.span
                className={cn(
                  "absolute top-0 left-0 inline-block font-semibold",
                  isActive ? "text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" : "text-[#00f0ff]"
                )}
                initial={{ y: "100%" }}
                animate={{ y: isAnimated ? "0%" : "100%" }}
                transition={{
                  ...transition,
                  delay: index * staggerDuration,
                }}
              >
                {char}
              </motion.span>
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}

export default RandomLetterSwap;
