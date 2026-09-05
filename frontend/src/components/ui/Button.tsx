import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "./Spinner"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-heading tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary:
          "bg-gradient-to-r from-[#FF1E42] via-[#E11D48] to-[#9F1239] text-white font-bold shadow-[0_0_25px_rgba(255,30,66,0.45)] hover:brightness-110 active:scale-95 uppercase tracking-wider",
        secondary:
          "glass-panel text-white border border-[rgba(255,30,66,0.3)] hover:border-[#FF1E42] hover:shadow-[0_0_20px_rgba(255,30,66,0.3)] active:scale-95 uppercase tracking-wider",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        danger:
          "bg-red-700 text-white font-bold hover:bg-red-600 active:scale-95 uppercase tracking-wider",
        outline:
          "bg-transparent text-white border border-[var(--color-border)] hover:border-[var(--color-accent-cyan)] hover:shadow-[var(--shadow-glow-cyan)] active:scale-95 uppercase tracking-wider",
        ghost:
          "bg-transparent text-[var(--color-text-secondary)] hover:text-white hover:bg-[rgba(255,30,66,0.1)] active:scale-95 uppercase tracking-wider",
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
        {isLoading ? (
          <Spinner size={size === "lg" ? "md" : "sm"} />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
