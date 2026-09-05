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
  const [hoveredId, setHoveredId] = useState<number | null>(1); // Default hover Node 1
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.2) % 360);
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 175;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.7,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  return (
    <div
      className={cn(
        "w-full min-h-[580px] py-4 flex flex-col items-center justify-center bg-transparent relative select-none",
        className
      )}
      ref={containerRef}
    >
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center transition-all duration-300"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* NEXUS LOGO IN THE CENTER CORE */}
          <div className="absolute w-22 h-22 rounded-full bg-[#0b0f19]/90 border border-[rgba(0,240,255,0.4)] shadow-[0_0_25px_rgba(0,240,255,0.4)] flex flex-col items-center justify-center z-10 group overflow-hidden p-2 transition-transform duration-300 hover:scale-110">
            <div className="absolute w-24 h-24 rounded-full border border-[rgba(0,240,255,0.3)] animate-ping opacity-50 pointer-events-none" />
            <img
              src="/logomain_svg.png"
              alt="NEXUS Club Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
            />
            <span className="text-[9px] font-mono font-bold text-[#00f0ff] uppercase tracking-widest mt-0.5">NEXUS</span>
          </div>

          {/* Orbital Circle Ring */}
          <div className="absolute w-[350px] h-[350px] rounded-full border border-[rgba(0,240,255,0.2)] pointer-events-none" />
          <div className="absolute w-[358px] h-[358px] rounded-full border border-dashed border-white/10 pointer-events-none" />

          {/* Timeline Nodes (1, 2, 3) */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isHovered = hoveredId === item.id;
            const nodeNumber = index + 1;

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
                  setAutoRotate(false);
                }}
                onMouseLeave={() => {
                  setAutoRotate(true);
                }}
              >
                {/* Node Orb Button (Displays 1, 2, 3) */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-heading font-extrabold text-lg transition-all duration-300 border-2 shadow-md",
                    isHovered
                      ? "bg-[#00f0ff] text-black border-white scale-125 shadow-[0_0_20px_rgba(0,240,255,0.8)]"
                      : "bg-[#0b0f19] text-[#00f0ff] border-[rgba(0,240,255,0.4)] group-hover:border-[#00f0ff] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                  )}
                >
                  {nodeNumber}
                </div>

                {/* Node Title Label Below Node */}
                <div
                  className={cn(
                    "absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono font-bold tracking-wider transition-all duration-300 px-2 py-0.5 rounded bg-[#0b0f19]/90 border border-white/10",
                    isHovered
                      ? "text-[#00f0ff] border-[rgba(0,240,255,0.4)] shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                      : "text-white/80 group-hover:text-white"
                  )}
                >
                  {item.title}
                </div>

                {/* Information Card Shown on Hover */}
                {isHovered && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-[#0b0f19]/95 backdrop-blur-md border border-[rgba(0,240,255,0.4)] shadow-[0_0_25px_rgba(0,0,0,0.8)] overflow-hidden z-50 rounded-xl p-4 transition-all duration-300 ease-out animate-in fade-in zoom-in-95">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-[#00f0ff]" />
                    
                    <h4 className="text-sm font-heading font-bold text-white border-b border-white/10 pb-2 mb-3 flex items-center justify-between">
                      <span>{item.title}</span>
                    </h4>

                    <div className="space-y-2">
                      {item.scheduleItems?.map((sItem, sIdx) => (
                        <div key={sIdx} className="text-xs font-medium text-white/90 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] mt-1.5 shrink-0" />
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
