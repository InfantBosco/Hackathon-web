import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface ContainerScrollBoxProps {
  children: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
}

/**
 * ContainerScrollBox
 * 3D perspective tilt & scale scroll reveal effect (Aceternity 3D Container Scroll pattern).
 * Fully responsive for mobile devices with touch scrolling support.
 * Pure container animation effect with NO added text overlays.
 */
export const ContainerScrollBox: React.FC<ContainerScrollBoxProps> = ({
  children,
  className = '',
  disableAnimation = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  // Dynamic responsive values for mobile & desktop to keep layout tight & elegant
  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [3, 0] : [5, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.98, 1] : [0.96, 1]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [0.7, 0.9, 1]
  );
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [4, 0] : [8, 0]
  );

  if (disableAnimation) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className="w-full [perspective:1000px] flex items-center justify-center"
    >
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          translateY,
          transformStyle: 'preserve-3d',
        }}
        className={`w-full will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ContainerScrollBox;
