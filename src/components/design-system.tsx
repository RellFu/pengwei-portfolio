import type { ReactNode } from "react";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
};

type LabelProps = {
  children: ReactNode;
  className?: string;
};

type MetricCardProps = {
  value: ReactNode;
  label: ReactNode;
  emphasis?: "primary" | "secondary";
  className?: string;
};

type ChipProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: LabelProps) {
  return (
    <p
      className={`text-xs font-medium tracking-[0.18em] text-[#86868b] ${className}`.trim()}
    >
      {children}
    </p>
  );
}

export function GlassSurface({ children, className = "" }: SurfaceProps) {
  return (
    <div
      className={`rounded-[2rem] border border-black/8 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function WarmSurface({ children, className = "" }: SurfaceProps) {
  return (
    <div
      className={`rounded-[2rem] border border-black/8 bg-[#f5f5f7] shadow-[0_8px_30px_rgba(0,0,0,0.05)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function CapabilityChip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium tracking-[0.14em] text-[#6e6e73] ${className}`.trim()}
    >
      {children}
    </span>
  );
}

export function MetricCard({
  value,
  label,
  emphasis = "secondary",
  className = "",
}: MetricCardProps) {
  const variantClass =
    emphasis === "primary"
      ? "border-black/8 bg-[#f5f5f7]"
      : "border-black/8 bg-white";

  const valueClass =
    emphasis === "primary"
      ? "text-3xl tracking-tight"
      : "text-lg";

  return (
    <div
      className={`rounded-[1.4rem] border ${variantClass} p-4 ${className}`.trim()}
    >
      <p className={`font-semibold text-[#1d1d1f] ${valueClass}`.trim()}>{value}</p>
      <p className="mt-2 text-xs tracking-[0.14em] text-[#86868b]">{label}</p>
    </div>
  );
}
