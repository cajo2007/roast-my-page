import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  accent?: boolean; // adds amber left border
};

export function Card({ children, className, accent = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-900 p-6",
        accent && "border-l-amber-500 border-l-2",
        className
      )}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  className?: string;
};

export function CardHeader({ title, subtitle, badge, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-4", className)}>
      <div>
        <h3 className="font-semibold text-zinc-100">{title}</h3>
        {subtitle && (
          <p className="text-zinc-400 text-sm mt-0.5 leading-relaxed">{subtitle}</p>
        )}
      </div>
      {badge && <div className="shrink-0">{badge}</div>}
    </div>
  );
}
