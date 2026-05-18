import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: "neutral" | "low" | "medium" | "high" | "critical";
}) {
  const variants = {
    neutral: "border-white/15 bg-white/5 text-white/80",
    low: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    medium: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    high: "border-orange-400/20 bg-orange-400/10 text-orange-300",
    critical: "border-red-400/20 bg-red-400/10 text-red-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}
