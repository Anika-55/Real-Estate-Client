import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary)]",
        className
      )}
      {...props}
    />
  );
}
