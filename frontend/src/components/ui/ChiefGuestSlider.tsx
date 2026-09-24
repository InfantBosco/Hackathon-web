import React, { useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

const slidesData = [
  {
    id: 1,
    name: 'Mr. B. Raghava Srinivasan',
    title: 'Strategic Partnerships & Technology Ecosystem Professional',
    description:
      'Technology ecosystem and strategic partnerships professional with over 30+ years of experience spanning industry engagement, technology skilling, strategic partnerships, and human capital development.',
    linkedinUrl: 'https://www.linkedin.com/in/raghava-srinivasan-balakrishnan-6b84811a/',
    isReversed: false,
  },
  {
    id: 2,
    name: 'Mr. B. Raghava Srinivasan',
    title: 'Founder of SUDEET Foundation',
    description:
      'Announced the launch of SUDEET (Sustainable Development and Emerging Technology Foundation) in 2026, advancing technology-driven human capital development, student mentorship, and industry programs.',
    linkedinUrl: 'https://www.linkedin.com/in/raghava-srinivasan-balakrishnan-6b84811a/',
    isReversed: true, // Content on Left, Photo on Right for desktop layout
  },
];

export const ChiefGuestSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [linkedinGlow, setLinkedinGlow] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const photoUrl = 'https://res.cloudinary.com/demc5rxwn/image/upload/v1790268308/dyrvqyxbthmg4mt0lcum.png';

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slidesData.length);
  };

  // Auto-slide timer (pauses when user interacts or hovers)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const slide = slidesData[currentIndex];

  const smoothLayoutTransition = {
    type: 'spring' as const,
    stiffness: 85,
    damping: 17,
    mass: 0.9,
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-3 py-2 sm:p-4 min-h-[440px] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Pill Header Badge matching attachment styling */}
      <div className="mb-6 sm:mb-8 flex items-center justify-center">
        <span className="inline-flex items-center justify-center rounded-full border border-white/35 bg-slate-900/60 backdrop-blur-md px-5 sm:px-6 py-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white shadow-[0_0_20px_rgba(255,255,255,0.12)]">
          CHIEF GUEST
        </span>
      </div>

      <LayoutGroup>
        <motion.div
          layout
          transition={{ layout: smoothLayoutTransition }}
          className="relative w-full flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-6 md:gap-8 min-h-[380px]"
        >
          {/* Photo Card - Smooth layout position swap on desktop + touch swipeable */}
          <motion.div
            layout
            whileHover={{ scale: 1.02 }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              y: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 4,
                ease: 'easeInOut',
              },
              layout: smoothLayoutTransition,
            }}
            className={`relative w-full max-w-[260px] sm:max-w-xs md:w-[340px] aspect-[4/5] rounded-xl overflow-hidden border-2 border-white/20 shadow-[0_0_35px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.35)] hover:border-slate-200 shrink-0 z-0 group order-1 ${
              slide.isReversed ? 'md:order-2' : 'md:order-1'
            }`}
          >
            <img
              src={photoUrl}
              alt={slide.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
          </motion.div>

          {/* Content Box - Non-overlapping, optimized typography & layout for mobile */}
          <motion.div
            layout
            animate={{ y: [0, 6, 0] }}
            transition={{
              y: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 4.5,
                ease: 'easeInOut',
              },
              layout: smoothLayoutTransition,
            }}
            className={`w-full max-w-sm sm:max-w-md md:max-w-lg z-10 order-2 ${
              slide.isReversed ? 'md:order-1' : 'md:order-2'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="p-5 sm:p-8 bg-[#0a0c16]/95 backdrop-blur-2xl border border-slate-400/30 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_35px_rgba(255,255,255,0.2)] hover:border-slate-200 hover:shadow-[0_0_50px_rgba(255,255,255,0.35)] transition-colors duration-300"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-white tracking-tight mb-1.5 pt-0.5">
                  {slide.name}
                </h3>

                <p className="text-xs sm:text-sm font-sans font-semibold text-slate-200 mb-2.5 leading-snug">
                  {slide.title}
                </p>

                <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed mb-5 font-medium min-h-0 md:min-h-[72px]">
                  {slide.description}
                </p>

                {/* Social Link Button with Yellow Toggle Glow Effect on Hover / Tap */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setLinkedinGlow(true)}
                    onMouseLeave={() => setLinkedinGlow(false)}
                    onClick={() => setLinkedinGlow(!linkedinGlow)}
                    href={slide.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer shrink-0 ${
                      linkedinGlow
                        ? 'bg-amber-400 text-black border border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.95)]'
                        : 'bg-white text-slate-900 border border-white/40 hover:bg-amber-400 hover:text-black hover:border-amber-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.95)]'
                    }`}
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </motion.a>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    Connect on LinkedIn
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </LayoutGroup>

      {/* Touch-optimized Carousel Dot Indicators Navigation */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 mt-6 sm:mt-8 z-20">
        {slidesData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="p-2 -m-2 flex items-center justify-center cursor-pointer focus:outline-none"
          >
            <motion.span
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              className={`rounded-full transition-all duration-300 block ${
                idx === currentIndex
                  ? 'w-7 sm:w-8 h-3 sm:h-3.5 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.9)]'
                  : 'w-3 sm:w-3.5 h-3 sm:h-3.5 bg-white/30 hover:bg-white/70'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
