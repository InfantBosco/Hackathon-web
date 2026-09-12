import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans px-2 md:px-4"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-6xl mx-auto pb-12">
        {data.map((item, index) => {
          const isRight = index % 2 === 0; // Index 0 (Oct 7) & 2 (Oct 9) on RIGHT, Index 1 (Oct 8) on LEFT

          return (
            <div
              key={index}
              className="relative pt-4 md:pt-6 pb-8 md:pb-12"
            >
              {/* Desktop Alternating Grid Layout (md:grid md:grid-cols-2) */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-16 items-start">
                {/* LEFT COLUMN */}
                <div className={isRight ? "order-1" : "order-1 text-right"}>
                  {!isRight && (
                    <div className="space-y-1.5 pr-6">
                      <h3 className="text-3xl lg:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-wide">
                        {item.title}
                      </h3>
                      {item.content}
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN */}
                <div className={isRight ? "order-2 text-left pl-6" : "order-2"}>
                  {isRight && (
                    <div className="space-y-1.5">
                      <h3 className="text-3xl lg:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-wide">
                        {item.title}
                      </h3>
                      {item.content}
                    </div>
                  )}
                </div>
              </div>

              {/* CENTER TIMELINE NODE PIN (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 top-4 md:top-6 -translate-x-1/2 z-40 items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-[#0b0c10] border border-white/40 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  <div className="h-3.5 w-3.5 rounded-full bg-white border border-slate-200 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                </div>
              </div>

              {/* Mobile Stacked Layout (Left line, Content on right) */}
              <div className="md:hidden flex justify-start gap-5 pl-2">
                <div className="sticky top-28 self-start z-40 -ml-[5px]">
                  <div className="h-9 w-9 rounded-full bg-[#0b0c10] border border-white/40 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <div className="h-3 w-3 rounded-full bg-white border border-slate-200 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                  </div>
                </div>

                <div className="w-full space-y-1.5 pl-2">
                  <h3 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
                    {item.title}
                  </h3>
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}

        {/* Center Vertical Timeline Line (Pure White Glow) */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-white/20 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-white via-slate-100 to-white/90 rounded-full shadow-[0_0_16px_rgba(255,255,255,0.95)]"
          />
        </div>
      </div>
    </div>
  );
};
