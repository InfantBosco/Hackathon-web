import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, description, error, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-mono uppercase tracking-wider text-slate-100 font-semibold">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 pointer-events-none text-slate-300">
              {leftIcon}
            </span>
          )}
          <input
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full h-11 px-4 bg-[#121212]/95 text-white placeholder-neutral-400 text-sm border border-neutral-700/90 rounded-[var(--radius-md)] transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed shadow-inner",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-slate-300 flex items-center justify-center z-10">
              {rightIcon}
            </span>
          )}
        </div>
        {description && !error && (
          <p className="text-xs text-slate-300 font-medium">{description}</p>
        )}
        {error && <p className="text-xs font-mono text-red-400 font-medium">{error}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
