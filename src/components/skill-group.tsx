import { CapabilityChip, GlassSurface } from "@/components/design-system";

type SkillGroupProps = {
  title: string;
  skills: string[];
};

export function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <GlassSurface className="rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-amber-950">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <CapabilityChip key={skill} className="px-3 py-2 text-sm tracking-normal">
            {skill}
          </CapabilityChip>
        ))}
      </div>
    </GlassSurface>
  );
}
