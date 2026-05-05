import { SectionLabel } from "@/components/design-system";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <SectionLabel className="mb-4 tracking-[0.24em]">{eyebrow}</SectionLabel>
      <h2 className="text-3xl font-semibold tracking-tight text-amber-950 md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-stone-600 md:text-lg">
        {description}
      </p>
    </div>
  );
}
