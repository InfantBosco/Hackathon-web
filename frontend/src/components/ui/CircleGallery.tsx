import React, { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../../data/galleryData';

export interface CircleGalleryProps {
  items: GalleryItem[];
  radius?: number;
  itemWidth?: number;
  itemHeight?: number;
  sensitivity?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  gap?: number;
  magneticSnapping?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  blurStrength?: number;
  scaleStrength?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOpacity?: number;
  inactiveOpacity?: number;
  captionSize?: number;
  captionColor?: string;
  captionWeight?: number;
  captionLetterSpacing?: number;
  captionGap?: number;
  gradientIntensity?: number;
  verticalOffset?: number;
  showNavButtons?: boolean;
  className?: string;
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return (((v - min) % range) + range) % range + min;
};

const applyOpacity = (color: string, opacity: number) => {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  if (color.startsWith('rgba')) {
    return color.replace(/[\d\.]+\)$/g, `${opacity})`);
  }
  if (color.startsWith('rgb')) {
    return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
  }
  return color;
};

export const CircleGallery: React.FC<CircleGalleryProps> = ({
  items,
  radius = 1500,
  itemWidth = 480,
  itemHeight = 300,
  sensitivity = 0.55,
  stiffness = 55,
  damping = 26,
  mass = 1,
  gap = 30,
  magneticSnapping = true,
  backgroundColor = 'transparent',
  borderRadius = 22,
  borderWidth = 1,
  borderColor = 'rgba(255, 255, 255, 0.15)',
  blurStrength = 6,
  scaleStrength = 1.1,
  shadowColor = '#000000',
  shadowBlur = 35,
  shadowOpacity = 0.7,
  inactiveOpacity = 0.35,
  captionSize = 14,
  captionColor = '#ffffff',
  captionWeight = 600,
  captionLetterSpacing = -0.01,
  captionGap = 14,
  gradientIntensity = 0.35,
  verticalOffset = -5,
  showNavButtons = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawRotation = useMotionValue(0);
  const rotation = useSpring(rawRotation, { stiffness, damping, mass });

  const totalRange = Math.max(items.length * gap, 360);
  const halfRange = totalRange / 2;

  // Responsive state & detection
  const [isMobile, setIsMobile] = useState(false);
  const [baseDimensions, setBaseDimensions] = useState({
    height: itemHeight,
    radius: radius,
  });

  useEffect(() => {
    const handleResize = () => {
      const screenW = window.innerWidth;
      const mobile = screenW < 640;
      setIsMobile(mobile);

      if (mobile) {
        setBaseDimensions({
          height: 190,
          radius: Math.max(screenW * 1.5, 560),
        });
      } else if (screenW < 1024) {
        setBaseDimensions({
          height: 250,
          radius: 1150,
        });
      } else {
        setBaseDimensions({
          height: itemHeight,
          radius: radius,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [itemHeight, radius]);

  // Robust touch pan detection (doesn't block vertical page scroll)
  const panDistance = useRef({ x: 0, y: 0 });
  const isHorizontalPan = useRef<boolean | null>(null);

  const handlePanStart = () => {
    panDistance.current = { x: 0, y: 0 };
    isHorizontalPan.current = null;
  };

  const handlePan = useCallback(
    (_: any, info: PanInfo) => {
      panDistance.current.x += Math.abs(info.delta.x);
      panDistance.current.y += Math.abs(info.delta.y);

      // Lock in horizontal gesture only when horizontal movement exceeds vertical
      if (isHorizontalPan.current === null) {
        if (panDistance.current.x > 3 || panDistance.current.y > 3) {
          isHorizontalPan.current = panDistance.current.x >= panDistance.current.y;
        }
      }

      if (isHorizontalPan.current) {
        rawRotation.set(rawRotation.get() + info.delta.x * sensitivity);
      }
    },
    [sensitivity, rawRotation]
  );

  const handlePanEnd = useCallback(
    (_: any, info: PanInfo) => {
      if (!magneticSnapping || !isHorizontalPan.current) return;
      const current = rawRotation.get();
      const velocity = info.velocity.x * sensitivity * 0.08;
      const target = Math.round((current + velocity) / gap) * gap;
      rawRotation.set(target);
    },
    [magneticSnapping, gap, sensitivity, rawRotation]
  );

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      const delta = e.deltaX * 0.1 * sensitivity;
      rawRotation.set(rawRotation.get() - delta);
      if (magneticSnapping) {
        const win = window as any;
        clearTimeout(win.wheelSnapTimeout);
        win.wheelSnapTimeout = setTimeout(() => {
          rawRotation.set(Math.round(rawRotation.get() / gap) * gap);
        }, 150);
      }
    }
  };

  const handlePrev = () => {
    const current = rawRotation.get();
    rawRotation.set(Math.round(current / gap) * gap + gap);
  };

  const handleNext = () => {
    const current = rawRotation.get();
    rawRotation.set(Math.round(current / gap) * gap - gap);
  };

  return (
    <div
      className={`relative w-full overflow-hidden flex items-center justify-center select-none touch-pan-y ${className}`}
      style={{
        background: backgroundColor,
        cursor: 'grab',
        touchAction: 'pan-y',
        WebkitTapHighlightColor: 'transparent',
      }}
      onWheel={handleWheel}
    >
      {/* Subtle Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, transparent 75%)',
          opacity: gradientIntensity,
        }}
      />

      {/* Main Pan Surface */}
      <motion.div
        ref={containerRef}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        className="w-full h-full flex items-center justify-center relative z-10"
        whileTap={{ cursor: 'grabbing' }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translateY(${verticalOffset}%)`,
            width: 0,
            height: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {items.map((item, idx) => {
            const cardHeight = baseDimensions.height;
            let cardWidth = itemWidth;

            if (item.aspectRatio) {
              if (item.orientation === 'portrait') {
                cardWidth = Math.round(cardHeight * Math.max(item.aspectRatio, 0.64));
              } else {
                cardWidth = Math.round(cardHeight * Math.min(item.aspectRatio, 1.65));
              }
            }

            return (
              <GalleryItemView
                key={`${idx}-${item.id || item.title || idx}`}
                item={item}
                index={idx}
                scrollRotation={rotation}
                radius={baseDimensions.radius}
                width={cardWidth}
                height={cardHeight}
                gap={gap}
                halfRange={halfRange}
                borderRadius={borderRadius}
                borderWidth={borderWidth}
                borderColor={borderColor}
                blurStrength={isMobile ? 0 : blurStrength}
                scaleStrength={scaleStrength}
                shadowColor={shadowColor}
                shadowBlur={shadowBlur}
                shadowOpacity={shadowOpacity}
                inactiveOpacity={inactiveOpacity}
                captionSize={isMobile ? 12 : captionSize}
                captionColor={captionColor}
                captionWeight={captionWeight}
                captionLetterSpacing={captionLetterSpacing}
                captionGap={captionGap}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Navigation Arrow Controls */}
      {showNavButtons && (
        <div className="absolute inset-x-3 sm:inset-x-8 bottom-4 sm:bottom-6 z-20 flex items-center justify-between pointer-events-none">
          <button
            onClick={handlePrev}
            aria-label="Previous Photo"
            className="pointer-events-auto p-2.5 sm:p-3.5 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 hover:border-white/50 backdrop-blur-md shadow-xl transition-all duration-200 active:scale-90 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Photo"
            className="pointer-events-auto p-2.5 sm:p-3.5 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 hover:border-white/50 backdrop-blur-md shadow-xl transition-all duration-200 active:scale-90 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

interface GalleryItemViewProps {
  item: GalleryItem;
  index: number;
  scrollRotation: any;
  radius: number;
  width: number;
  height: number;
  gap: number;
  halfRange: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  blurStrength: number;
  scaleStrength: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOpacity: number;
  inactiveOpacity: number;
  captionSize: number;
  captionColor: string;
  captionWeight: number;
  captionLetterSpacing: number;
  captionGap: number;
  isMobile: boolean;
}

const GalleryItemView: React.FC<GalleryItemViewProps> = ({
  item,
  index,
  scrollRotation,
  radius,
  width,
  height,
  gap,
  halfRange,
  borderRadius,
  borderWidth,
  borderColor,
  blurStrength,
  scaleStrength,
  shadowColor,
  shadowBlur,
  shadowOpacity,
  inactiveOpacity,
  captionSize,
  captionColor,
  captionWeight,
  captionLetterSpacing,
  captionGap,
  isMobile,
}) => {
  const initialAngle = index * gap;
  const itemAngle = useTransform(scrollRotation, (r: number) =>
    wrap(-halfRange, halfRange, initialAngle + r)
  );

  // Performance Virtualization: Skip rendering/compositing completely if far off-screen
  const display = useTransform(itemAngle, (a: number) =>
    Math.abs(a) > (isMobile ? 55 : 65) ? 'none' : 'flex'
  );

  const x = useTransform(itemAngle, (a: number) => Math.sin((a * Math.PI) / 180) * radius);
  const y = useTransform(itemAngle, (a: number) => (1 - Math.cos((a * Math.PI) / 180)) * radius);
  const rotate = useTransform(itemAngle, (a: number) => a);
  const opacity = useTransform(itemAngle, [-55, -28, 0, 28, 55], [0, inactiveOpacity, 1, inactiveOpacity, 0]);
  const scale = useTransform(itemAngle, [-45, 0, 45], [0.88, scaleStrength, 0.88]);

  // Blur is disabled on mobile for zero-lag 60fps/120fps GPU performance
  const blurValue = useTransform(itemAngle, [-35, 0, 35], [blurStrength, 0, blurStrength]);
  const filter = useTransform(blurValue, (b: number) => (b > 0 ? `blur(${b}px)` : 'none'));

  const zIndex = useTransform(opacity, (o: number) => Math.round(o * 100));
  const finalShadowColor = applyOpacity(shadowColor, shadowOpacity);

  // Lightweight mobile image resolution (reduces RAM & decode latency by 70%)
  const rawUrl = item.imageFile || '';
  const mediaSrc = isMobile
    ? rawUrl.replace('w_1200', 'w_600,q_auto:good')
    : rawUrl.replace('w_1200', 'w_800,q_auto');

  return (
    <motion.div
      style={{
        position: 'absolute',
        x,
        y,
        rotate,
        opacity,
        scale,
        filter,
        zIndex,
        width,
        height: height + 60,
        display: display as any,
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Card Frame with Edge-to-Edge Image */}
        <div
          style={{
            position: 'relative',
            width,
            height,
            borderRadius,
            overflow: 'hidden',
            background: '#0d1017',
            border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none',
            boxShadow: shadowOpacity > 0 ? `0 20px ${shadowBlur}px -12px ${finalShadowColor}` : 'none',
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          <img
            src={mediaSrc}
            alt={item.title || 'HackNEX Gallery'}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center select-none pointer-events-none block"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>

        {/* Caption */}
        {item.title && (
          <div
            style={{
              marginTop: captionGap,
              width: '100%',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <motion.span
              style={{
                display: 'block',
                color: captionColor,
                fontSize: captionSize,
                fontWeight: captionWeight,
                letterSpacing: `${captionLetterSpacing}em`,
                opacity: useTransform(itemAngle, [-18, 0, 18], [0, 1, 0]),
                y: useTransform(itemAngle, [-8, 0, 8], [6, 0, 6]),
              }}
            >
              {item.title}
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CircleGallery;
