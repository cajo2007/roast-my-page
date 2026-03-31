import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "critical" | "warning" | "minor" | "good" | "brand";

type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-zinc-800 text-zinc-300 border-zinc-700",
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  minor: "bg-zinc-800 text-zinc-400 border-zinc-700",
  good: "bg-green-500/10 text-green-400 border-green-500/20",
  brand: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
