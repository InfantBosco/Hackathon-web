import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "./Spinner"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center font-heading tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary:
          "bg-gradient-to-r from-white via-slate-100 to-slate-200 text-black font-royal font-black shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_45px_rgba(255,30,66,0.75),0_0_25px_rgba(255,255,255,0.8)] hover:scale-[1.03] active:scale-95 uppercase tracking-[0.15em] border border-white/60 hover:border-red-500/80 transition-all duration-300",
        secondary:
          "glass-panel text-white border border-white/20 hover:border-white hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-95 uppercase tracking-wider transition-all duration-300",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        danger:
          "bg-zinc-800 text-white font-bold hover:bg-zinc-700 hover:border-red-500/50 active:scale-95 uppercase tracking-wider border border-white/10",
        outline:
          "bg-transparent text-white border border-white/20 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95 uppercase tracking-wider",
        ghost:
          "bg-transparent text-[var(--color-text-secondary)] hover:text-white hover:bg-white/10 active:scale-95 uppercase tracking-wider",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 px-3 text-xs gap-1.5 rounded-[var(--radius-sm)]",
        md: "h-11 px-5 text-sm gap-2 rounded-[var(--radius-md)]",
        lg: "h-14 px-8 text-base gap-3 rounded-[var(--radius-lg)]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Animated Glossy Sheen Beam overlay on hover */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none z-10" />

        {isLoading ? (
          <Spinner size={size === "lg" ? "md" : "sm"} />
        ) : (
          <span className="relative z-20 flex items-center justify-center gap-2">
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </span>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
