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
    "bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-110 focus-visible:ring-[var(--ring)]",
  outline:
    "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] focus-visible:ring-[var(--ring)]",
  ghost:
    "text-[var(--foreground)] hover:bg-[var(--muted)] focus-visible:ring-[var(--ring)]",
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
          "ring-offset-[var(--background)]",
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
