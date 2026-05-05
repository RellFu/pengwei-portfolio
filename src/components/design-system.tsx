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
      className={`text-xs font-medium tracking-[0.18em] text-orange-700 ${className}`.trim()}
    >
      {children}
    </p>
  );
}

export function GlassSurface({ children, className = "" }: SurfaceProps) {
  return (
    <div
      className={`rounded-[2rem] border border-orange-200/70 bg-white/80 shadow-[0_24px_80px_rgba(180,83,9,0.12)] backdrop-blur-xl ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function WarmSurface({ children, className = "" }: SurfaceProps) {
  return (
    <div
      className={`rounded-[2rem] border border-orange-200/70 bg-[linear-gradient(135deg,rgba(255,247,237,0.96),rgba(255,237,213,0.92))] shadow-[0_24px_80px_rgba(180,83,9,0.12)] backdrop-blur-xl ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function CapabilityChip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-medium tracking-[0.14em] text-stone-700 ${className}`.trim()}
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
      ? "border-orange-100 bg-[linear-gradient(180deg,rgba(255,247,237,0.96),rgba(255,237,213,0.78))]"
      : "border-orange-100 bg-white/78";

  const valueClass =
    emphasis === "primary"
      ? "text-3xl tracking-tight"
      : "text-lg";

  return (
    <div
      className={`rounded-[1.4rem] border ${variantClass} p-4 ${className}`.trim()}
    >
      <p className={`font-semibold text-amber-950 ${valueClass}`.trim()}>{value}</p>
      <p className="mt-2 text-xs tracking-[0.14em] text-stone-500">{label}</p>
    </div>
  );
}
