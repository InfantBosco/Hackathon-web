"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
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
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (timelineData.length > 0) {
      setExpandedItems({ 1: true });
    }
  }, [timelineData]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      
      const isCurrentlyExpanded = prev[id];
      if (!isCurrentlyExpanded) {
        newState[id] = true;
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 180;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.6,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusBadge = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">STAGE 1</Badge>;
      case "in-progress":
        return <Badge variant="error" className="animate-pulse">STAGE 2 (LIVE)</Badge>;
      case "pending":
        return <Badge variant="cyan">STAGE 3</Badge>;
      default:
        return <Badge variant="outline">SCHEDULED</Badge>;
    }
  };

  return (
    <div
      className={cn(
        "w-full min-h-[620px] py-8 flex flex-col items-center justify-center bg-[#070b14] rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-2xl relative overflow-hidden select-none",
        className
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative w-full max-w-4xl h-[520px] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* NEXUS LOGO IN THE CENTER */}
          <div className="absolute w-24 h-24 rounded-full bg-[#0b0f19]/95 border-2 border-[var(--color-accent-cyan)] shadow-[0_0_35px_rgba(0,240,255,0.6)] flex flex-col items-center justify-center z-10 group cursor-pointer overflow-hidden p-2 transition-transform hover:scale-110">
            <div className="absolute w-28 h-28 rounded-full border border-[rgba(0,240,255,0.4)] animate-ping opacity-60 pointer-events-none" />
            <div
              className="absolute w-32 h-32 rounded-full border border-[rgba(255,30,66,0.35)] animate-ping opacity-40 pointer-events-none"
              style={{ animationDelay: "0.5s" }}
            />
            <img
              src="/logomain_svg.png"
              alt="NEXUS Club Logo"
              className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]"
            />
            <span className="text-[9px] font-mono font-bold text-[#00f0ff] uppercase tracking-widest mt-0.5">NEXUS</span>
          </div>

          {/* Orbital Circle Ring */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-[rgba(0,240,255,0.2)] shadow-[0_0_20px_rgba(0,240,255,0.1)] pointer-events-none" />
          <div className="absolute w-[370px] h-[370px] rounded-full border border-dashed border-white/10 pointer-events-none" />

          {/* Timeline Nodes Circling Around */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer group"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy Pulse Aura */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(0,240,255,0.3) 0%, rgba(0,240,255,0) 70%)`,
                    width: `${item.energy * 0.4 + 40}px`,
                    height: `${item.energy * 0.4 + 40}px`,
                    left: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                  }}
                />

                {/* Node Orb Button */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-lg",
                    isExpanded
                      ? "bg-gradient-to-r from-[#FF1E42] to-[#E11D48] text-white border-white scale-125 shadow-[0_0_20px_rgba(255,30,66,0.8)]"
                      : isRelated
                      ? "bg-[rgba(0,240,255,0.2)] text-[#00f0ff] border-[#00f0ff] animate-pulse"
                      : "bg-[#0c1222] text-[#00f0ff] border-[rgba(0,240,255,0.4)] hover:border-[#00f0ff] hover:scale-110 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                  )}
                >
                  <Icon size={20} />
                </div>

                {/* Node Title Label */}
                <div
                  className={cn(
                    "absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono font-bold tracking-wider transition-all duration-300 px-2 py-0.5 rounded bg-[#0b0f19]/80 border border-white/10",
                    isExpanded
                      ? "text-[#00f0ff] scale-110 border-[rgba(0,240,255,0.4)] shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                      : "text-white/80 group-hover:text-white"
                  )}
                >
                  {item.title}
                </div>

                {/* Expanded Popup Card Details */}
                {isExpanded && (
                  <Card className="absolute top-22 left-1/2 -translate-x-1/2 w-80 bg-[#0b0f19]/95 backdrop-blur-xl border border-[rgba(0,240,255,0.4)] shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-visible z-50 rounded-xl">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[var(--color-accent-cyan)]" />
                    
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex justify-between items-center gap-2">
                        {getStatusBadge(item.status)}
                        <span className="text-xs font-mono text-[var(--color-accent-cyan)] font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-base font-heading font-bold text-white mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="text-xs text-white/90 px-4 pb-4 space-y-3">
                      <p className="leading-relaxed text-[var(--color-text-secondary)]">
                        {item.content}
                      </p>

                      {/* Detailed Timeline Breakdown List */}
                      {item.scheduleItems && item.scheduleItems.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-white/10">
                          <h5 className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-accent-cyan)] font-bold mb-1">
                            Detailed Itinerary
                          </h5>
                          {item.scheduleItems.map((sItem, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-1.5 text-[11px] text-white/90">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{sItem}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Energy Level Bar */}
                      <div className="pt-2 border-t border-white/10">
                        <div className="flex justify-between items-center text-[10px] font-mono mb-1 text-white/70">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1 text-[var(--color-accent-cyan)]" />
                            Activity Intensity
                          </span>
                          <span className="text-[var(--color-accent-cyan)] font-bold">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FF1E42] via-[#00f0ff] to-emerald-400"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {/* Connected Nodes */}
                      {item.relatedIds.length > 0 && (
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-white/50 flex items-center">
                            <Link size={10} className="mr-1" /> Next Stage:
                          </span>
                          <div className="flex gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2 py-0 text-[10px] font-mono rounded bg-white/5 hover:bg-[rgba(0,240,255,0.2)] border-white/20 text-[#00f0ff] transition-all flex items-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={10} className="ml-1" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
