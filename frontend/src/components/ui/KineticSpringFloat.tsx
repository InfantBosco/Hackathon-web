import { motion, Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface KineticSpringFloatProps {
  children: string | React.ReactNode;
  className?: string;
  mode?: 'words' | 'chars';
  staggerDelay?: number;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

/**
 * KineticSpringFloat
 * Fluid, physics-driven spring assembly text & element reveal animation.
 * Features stiffness: 120, damping: 18 for an ultra-smooth, weightless floating entry.
 * Optimized with once-only viewport triggers and GPU acceleration to prevent scroll lag.
 */
export const KineticSpringFloat: React.FC<KineticSpringFloatProps> = ({
  children,
  className = '',
  mode = 'words',
  staggerDelay = 0.035,
  delay = 0,
  as: Component = 'div',
}) => {
  if (typeof children !== 'string') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 18,
          mass: 0.8,
          delay,
        }}
        className={cn('will-change-transform', className)}
      >
        {children}
      </motion.div>
    );
  }

  const items = mode === 'chars' ? Array.from(children) : children.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.96,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        mass: 0.8,
      },
    },
  };

  const MotionComponent = motion[Component] as typeof motion.div;

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={cn('inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] will-change-transform', className)}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block will-change-transform"
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

export default KineticSpringFloat;
