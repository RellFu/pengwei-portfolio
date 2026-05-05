import { GlassSurface } from "@/components/design-system";

type TimelineItemProps = {
  period: string;
  title: string;
  subtitle: string;
  description: string;
};

export function TimelineItem({
  period,
  title,
  subtitle,
  description,
}: TimelineItemProps) {
  return (
    <div className="grid gap-4 md:grid-cols-[140px_1fr]">
      <div className="text-sm font-medium tracking-[0.16em] text-orange-700">
        {period}
      </div>
      <GlassSurface className="relative rounded-3xl p-6">
        <span className="absolute -left-2 top-8 hidden h-4 w-4 rounded-full border-4 border-orange-50 bg-orange-400 md:block" />
        <p className="text-xl font-semibold text-amber-950">{title}</p>
        <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
        <p className="mt-4 text-sm leading-7 text-stone-600">{description}</p>
      </GlassSurface>
    </div>
  );
}
