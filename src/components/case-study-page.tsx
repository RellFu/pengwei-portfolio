import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  BrainCircuit,
  ChevronRight,
  Database,
  FileSearch,
  LayoutTemplate,
  Sparkles,
  Target,
} from "lucide-react";
import {
  CapabilityChip,
  GlassSurface,
  MetricCard,
  SectionLabel,
  WarmSurface,
} from "@/components/design-system";
import type { CaseStudyProject } from "@/data/projects";

const workflowIcons = [Target, FileSearch, Bot, LayoutTemplate, Database];

type CaseStudyPageProps = {
  project: CaseStudyProject;
};

export function CaseStudyPage({ project }: CaseStudyPageProps) {
  const primaryMetrics = project.metrics.slice(0, 2);
  const secondaryMetrics = project.metrics.slice(2);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ffffff] text-[#515154]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0, 0, 0,0.2),transparent_28%),radial-gradient(circle_at_top_right,rgba(0, 0, 0,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f5f5f7_44%,#f5f5f7_100%)]" />
      <div className="absolute left-0 top-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-[#c7c7cc]/20 blur-3xl" />
      <div className="absolute right-0 top-24 -z-10 h-[22rem] w-[22rem] rounded-full bg-[#d2d2d7]/30 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2.5 text-sm font-medium text-[#6e6e73] shadow-[0_8px_24px_rgba(0, 0, 0,0.06)] transition hover:border-black/10 hover:text-[#6e6e73]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-black/10 bg-[#f5f5f7] px-4 py-2 text-xs font-medium tracking-[0.18em] text-[#6e6e73]">
              {project.type}
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl md:leading-[1.04]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#6e6e73] md:text-xl">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.capabilities.map((capability) => (
                <CapabilityChip key={capability} className="bg-white/82">
                  {capability}
                </CapabilityChip>
              ))}
            </div>
          </div>

          <GlassSurface className="p-6 backdrop-blur-2xl">
            <SectionLabel>CASE STUDY SNAPSHOT</SectionLabel>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {primaryMetrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  emphasis="primary"
                />
              ))}
            </div>
            <div className="mt-4 grid gap-3">
              {secondaryMetrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  className="rounded-[1.2rem] py-3"
                />
              ))}
            </div>
          </GlassSurface>
        </section>

        <div className="mt-16 grid gap-6">
          <GlassSurface className="p-7">
            <SectionLabel>PROJECT OVERVIEW</SectionLabel>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[#6e6e73] md:text-lg">
              {project.overview}
            </p>
          </GlassSurface>

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassSurface className="p-7">
              <SectionLabel>PROBLEM</SectionLabel>
              <p className="mt-5 text-base leading-8 text-[#6e6e73]">
                {project.problem}
              </p>
            </GlassSurface>

            <GlassSurface className="p-7">
              <SectionLabel>MY ROLE</SectionLabel>
              <p className="mt-5 text-base leading-8 text-[#6e6e73]">
                {project.role}
              </p>
            </GlassSurface>
          </div>

          <WarmSurface className="p-7">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <SectionLabel>PRODUCT SOLUTION</SectionLabel>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#1d1d1f] md:text-3xl">
                  Organizing AI capabilities into a product structure that can be launched, explained, and optimized.
                </h2>
                <p className="mt-5 text-base leading-8 text-[#6e6e73]">
                  {project.solution}
                </p>
              </div>

              <div className="grid gap-3">
                {project.impact.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-black/5 bg-white/78 p-4 shadow-[0_8px_24px_rgba(0, 0, 0,0.05)]"
                  >
                    <div className="flex gap-3">
                      <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#0071e3]" />
                      <p className="text-sm leading-7 text-[#6e6e73]">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WarmSurface>

          <GlassSurface className="p-7">
            <div className="max-w-3xl">
              <SectionLabel>AI WORKFLOW / ARCHITECTURE</SectionLabel>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#1d1d1f] md:text-3xl">
                A layered flow for a product system, not a single model call.
              </h2>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {project.architecture.map((step, index) => {
                const Icon = workflowIcons[index] ?? BrainCircuit;

                return (
                  <div
                    key={step.title}
                    className="relative rounded-[1.7rem] border border-black/5 bg-[#f5f5f7]/75 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f5f7] text-[#86868b]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-black/5 bg-white/75 px-3 py-1 text-[11px] tracking-[0.14em] text-[#86868b]">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-5 text-lg font-semibold text-[#1d1d1f]">{step.title}</p>
                    <p className="mt-3 text-sm leading-7 text-[#6e6e73]">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </GlassSurface>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <GlassSurface className="p-7">
              <SectionLabel>METRICS & IMPACT</SectionLabel>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.metrics.map((metric) => (
                  <MetricCard
                    key={metric.label}
                    value={metric.value}
                    label={metric.label}
                    emphasis="primary"
                  />
                ))}
              </div>
            </GlassSurface>

            <GlassSurface className="p-7">
              <SectionLabel>KEY PRODUCT DECISIONS</SectionLabel>
              <ul className="mt-6 space-y-4">
                {project.keyDecisions.map((decision) => (
                  <li
                    key={decision}
                    className="flex gap-3 rounded-[1.3rem] border border-black/5 bg-white/76 p-4"
                  >
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#0071e3]" />
                    <p className="text-sm leading-7 text-[#6e6e73]">{decision}</p>
                  </li>
                ))}
              </ul>
            </GlassSurface>
          </div>

          <WarmSurface className="p-7">
            <SectionLabel>REFLECTION</SectionLabel>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[#6e6e73] md:text-lg">
              {project.reflection}
            </p>
          </WarmSurface>
        </div>
      </div>
    </main>
  );
}
