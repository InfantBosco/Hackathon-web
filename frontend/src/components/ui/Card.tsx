import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  variant?: 'default' | 'hoverGlow' | 'interactive';
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', className, ...props }, ref) => {
    const variantStyles = {
      default:
        'glass-panel rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]',
      hoverGlow:
        'glass-panel border border-[var(--color-border)] hover:border-[var(--color-accent-cyan)] transition-all duration-300 hover:shadow-[var(--shadow-glow-cyan)] rounded-[var(--radius-lg)] p-6',
      interactive:
        'glass-panel border border-[var(--color-border)] hover:border-[var(--color-accent-gold)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] cursor-pointer rounded-[var(--radius-lg)] p-6',
    };

    return (
      <motion.div
        ref={ref}
        whileHover={variant === 'interactive' ? { y: -4 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={cn('will-change-transform', variantStyles[variant], className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-white",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--color-text-secondary)]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export default Card;
