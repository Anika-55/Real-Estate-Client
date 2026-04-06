import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-orange-600 text-white hover:bg-orange-500 focus-visible:ring-orange-500",
  outline:
    "border border-white/50 text-white hover:bg-white/10 focus-visible:ring-white/60",
  ghost: "text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-11 px-5 text-sm font-semibold",
  sm: "h-9 px-4 text-xs font-semibold",
  lg: "h-12 px-6 text-base font-semibold",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "ring-offset-slate-950",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
