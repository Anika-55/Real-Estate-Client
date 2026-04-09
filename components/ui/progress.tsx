import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-[var(--border)]/70",
        className
      )}
    >
      <div
        className="h-full bg-[var(--primary)] transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
