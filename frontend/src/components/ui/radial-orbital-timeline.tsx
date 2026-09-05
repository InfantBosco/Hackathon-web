"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon?: React.ElementType;
  relatedIds?: number[];
  status?: "completed" | "in-progress" | "pending";
  energy?: number;
  scheduleItems?: string[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className,
}: RadialOrbitalTimelineProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // 1. Orbit Rotation Never Stops - Runs Continuously
  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.2) % 360);
    }, 50);

    return () => {
      clearInterval(rotationTimer);
    };
  }, []);

  // 2. Click anywhere else on document closes the info card
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setHoveredId(null);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 215; // Scaled up radius for bigger component
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.75,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  return (
    <div
      className={cn(
        "w-full min-h-[700px] py-6 flex flex-col items-center justify-center bg-transparent relative select-none",
        className
      )}
      ref={containerRef}
    >
      <div className="relative w-full max-w-5xl h-[620px] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center transition-all duration-300"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* NEXUS LOGO IN THE CENTER CORE (Original logomain_svg.png) */}
          <div className="absolute w-26 h-26 rounded-full bg-zinc-950/90 border border-white/30 shadow-[0_0_30px_rgba(255,30,66,0.35)] flex flex-col items-center justify-center z-10 group overflow-hidden p-2 transition-transform duration-300 hover:scale-110">
            <div className="absolute w-28 h-28 rounded-full border border-red-500/30 animate-ping opacity-50 pointer-events-none" />
            <img
              src="/logomain_svg.png"
              alt="NEXUS Club Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="text-[9px] font-mono font-bold text-white uppercase tracking-widest mt-1">NEXUS</span>
          </div>

          {/* Scaled Orbital Circle Rings */}
          <div className="absolute w-[430px] h-[430px] rounded-full border border-white/20 pointer-events-none" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-white/10 pointer-events-none" />

          {/* Timeline Nodes (1, 2, 3) */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isHovered = hoveredId === item.id;
            const nodeNumber = index + 1;
            const isLowerHalf = position.y > 0;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isHovered ? 200 : position.zIndex,
              opacity: isHovered ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                className="absolute transition-transform duration-500 ease-out cursor-pointer group"
                style={nodeStyle}
                onMouseEnter={() => {
                  setHoveredId(item.id);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setHoveredId(item.id);
                }}
              >
                {/* Node Orb Button (Displays 1, 2, 3) */}
                <div
                  className={cn(
                    "w-13 h-13 rounded-full flex items-center justify-center font-heading font-extrabold text-xl transition-all duration-300 border-2 shadow-md",
                    isHovered
                      ? "bg-white text-black border-white scale-125 shadow-[0_0_25px_rgba(255,255,255,0.9)]"
                      : "bg-zinc-950 text-white border-white/30 group-hover:border-white group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.5)]"
                  )}
                >
                  {nodeNumber}
                </div>

                {/* Node Title Label Below/Above Node */}
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono font-bold tracking-wider transition-all duration-300 px-2.5 py-0.5 rounded bg-zinc-950/90 border border-white/10",
                    isLowerHalf ? "top-15" : "top-15",
                    isHovered
                      ? "text-white border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                      : "text-white/80 group-hover:text-white"
                  )}
                >
                  {item.title}
                </div>

                {/* Smart Positioning Information Card (Opens Upwards if in Lower Half of Orbit) */}
                {isHovered && (
                  <div
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 w-80 bg-zinc-950/95 backdrop-blur-md border border-white/30 shadow-[0_0_30px_rgba(0,0,0,0.95)] z-50 rounded-xl p-4.5 transition-all duration-300 ease-out animate-in fade-in zoom-in-95",
                      isLowerHalf ? "bottom-20" : "top-22"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-white",
                        isLowerHalf ? "-bottom-2" : "-top-2"
                      )}
                    />
                    
                    <h4 className="text-sm font-heading font-bold text-white border-b border-white/15 pb-2 mb-3 flex items-center justify-between">
                      <span>{item.title}</span>
                    </h4>

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {item.scheduleItems?.map((sItem, sIdx) => (
                        <div key={sIdx} className="text-xs font-medium text-white/90 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                          <span className="leading-snug">{sItem}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
