import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { GalleryItem, getOptimizedImageUrl } from '../../data/galleryData';

interface PhotoGridProps {
  items: GalleryItem[];
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Touch tracking for mobile swipe navigation in Lightbox
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % items.length);
  }, [selectedIndex, items.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + items.length) % items.length);
  }, [selectedIndex, items.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock background scroll when lightbox is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, handleNext, handlePrev, handleClose]);

  // Preload adjacent images in lightbox for instantaneous switching
  useEffect(() => {
    if (selectedIndex === null) return;
    const nextIdx = (selectedIndex + 1) % items.length;
    const prevIdx = (selectedIndex - 1 + items.length) % items.length;

    const imgNext = new Image();
    imgNext.src = getOptimizedImageUrl(items[nextIdx].imageFile, 1600);

    const imgPrev = new Image();
    imgPrev.src = getOptimizedImageUrl(items[prevIdx].imageFile, 1600);
  }, [selectedIndex, items]);

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSwipe = Math.abs(distance) > 50;

    if (isSwipe) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full relative">
      {/* 
        Solid Responsive CSS Grid:
        - 1 column on mobile (<640px)
        - 2 columns on tablet (640px - 1023px)
        - 4 columns on desktop (1024px+)
        Using consistent aspect ratio and spanning the 31st photo across 2 columns
        guarantees mathematically ZERO empty slots and ZERO gaps in any row!
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          const thumbUrl = getOptimizedImageUrl(item.imageFile, 600);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: (index % 4) * 0.04 }}
              onClick={() => setSelectedIndex(index)}
              className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 shadow-lg cursor-pointer transform-gpu transition-all duration-300 hover:border-amber-400/40 hover:shadow-amber-500/10 hover:shadow-2xl ${
                isLastItem ? 'sm:col-span-2 aspect-[16/7]' : 'col-span-1 aspect-[4/3]'
              }`}
            >
              {/* Photo Image with smooth hover zoom */}
              <img
                src={thumbUrl}
                alt={item.title || `HackNEX Photo ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Dark gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                <span className="text-xs font-mono font-medium text-slate-200 tracking-wider">
                  {item.title || `Moment #${index + 1}`}
                </span>
                <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Subtle border highlight line */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/25 transition-colors duration-300" />
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={handleClose}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Top Bar: Counter & Close Button */}
            <div
              className="w-full max-w-6xl mx-auto flex items-center justify-between py-2 relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono text-slate-300">
                <span className="text-white font-semibold">{selectedIndex + 1}</span>
                <span className="opacity-40">/</span>
                <span>{items.length}</span>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Media Stage */}
            <div
              className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-auto px-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Arrow Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous photo"
                className="hidden sm:flex absolute left-0 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white items-center justify-center transition-all hover:scale-110 active:scale-95 -translate-x-2 lg:-translate-x-6"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Active Image with Animated Entrance */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative max-h-[78vh] max-w-full flex items-center justify-center"
                >
                  <img
                    src={getOptimizedImageUrl(items[selectedIndex].imageFile, 1600)}
                    alt={items[selectedIndex].title || `HackNEX Photo ${selectedIndex + 1}`}
                    className="max-h-[76vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-xl shadow-2xl border border-white/10 select-none"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Arrow Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next photo"
                className="hidden sm:flex absolute right-0 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white items-center justify-center transition-all hover:scale-110 active:scale-95 translate-x-2 lg:translate-x-6"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Bar: Title, Hint, and Mobile Nav Controls */}
            <div
              className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-2 relative z-20 pt-2 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm font-medium text-slate-200">
                {items[selectedIndex].title || `HackNEX Moment #${selectedIndex + 1}`}
              </p>

              {/* Mobile Prev / Next Pills */}
              <div className="flex sm:hidden items-center gap-4 mt-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white flex items-center gap-1 active:bg-white/20"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white flex items-center gap-1 active:bg-white/20"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <p className="hidden sm:block text-[11px] font-mono text-slate-400">
                Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-300">←</kbd> and <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-300">→</kbd> to browse, <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-300">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGrid;
