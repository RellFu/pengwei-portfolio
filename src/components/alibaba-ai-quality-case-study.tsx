"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Braces,
  CheckCircle2,
  CircleDot,
  Eye,
  FileSearch,
  Gauge,
  GitBranch,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Route,
  ScanSearch,
  ShieldCheck,
  Target,
  UsersRound,
  Workflow,
} from "lucide-react";
import { AnimatedSection, FadeInCard } from "@/components/animated-section";
import type { CaseStudyProject } from "@/data/projects";

type Props = { project: CaseStudyProject };

const metrics = [
  ["29", "product-behavior metrics"],
  ["55", "vertical AI Skills audited"],
  ["91", "query-response labels"],
  ["35", "task segments evaluated"],
] as const;

const loop = [
  ["Observe", "Turn product health, behavior paths, and feedback into visible signals.", Eye],
  ["Diagnose", "Trace a failure from the task down to the query, Agent, Skill, or sub-agent.", ScanSearch],
  ["Formalize", "Encode expert creative judgment as rules, branches, checks, and schemas.", Braces],
  ["Validate", "Calibrate rubrics on real multi-turn sessions and replay difficult cases.", CheckCircle2],
  ["Prioritize", "Translate recurring failure patterns into the next product decision.", Target],
] as const;

const dashboardFamilies = [
  ["Product", "DAU · engagement", Gauge],
  ["Role", "creator segments", UsersRound],
  ["Module", "feature adoption", Layers3],
  ["Behavior", "funnels · retention", Route],
  ["Performance", "errors · latency", BarChart3],
  ["Feedback", "positive · negative", CircleDot],
] as const;

const evaluationLayers = ["Task", "Query", "Agent", "Skill", "Sub-agent"];
const evaluatorChecks = [
  "Trigger overlap",
  "Variant differentiation",
  "Scope fit",
  "Validation coverage",
  "Domain & granularity",
];

function Intro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0071e3]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">{title}</h2>
      <p className="mt-5 text-base leading-8 text-[#6e6e73] md:text-lg">{description}</p>
    </div>
  );
}

export function AlibabaAiQualityCaseStudy({ project }: Props) {
  return (
    <main aria-label={`${project.title} case study`} className="min-h-screen overflow-hidden bg-[#f5f5f7] text-[#1d1d1f]">
      <section className="relative border-b border-black/8 bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-40 -top-52 h-[34rem] w-[34rem] rounded-full bg-[#0071e3]/10 blur-3xl" />
          <div className="absolute -bottom-64 left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-[#63e6be]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-6 sm:px-8 lg:px-12 lg:pb-28">
          <Link href="/#internship" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-[#515154] shadow-sm transition hover:bg-[#f5f5f7] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]">
            <ArrowLeft className="h-4 w-4" /> Back to Experience
          </Link>
          <div className="mt-16 grid items-end gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
            <AnimatedSection>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#1d1d1f] px-3 py-1.5 text-xs font-semibold text-white">Alibaba · Youku AI Content Creation</span>
                <span className="rounded-full border border-black/10 px-3 py-1.5 text-xs text-[#6e6e73]">AI Product Manager Intern</span>
                <span className="rounded-full border border-black/10 px-3 py-1.5 text-xs text-[#6e6e73]">Apr–Jun 2026</span>
              </div>
              <h1 className="mt-7 max-w-[12ch] text-[3.25rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4.25rem] lg:text-[5rem]">Making creative AI quality measurable.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#515154] md:text-xl md:leading-9">I helped build the quality operating loop for Phai, a creative AI agent—connecting product analytics, layered Agent evaluation, and expert-workflow productization so subjective feedback could become clearer product decisions.</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Product Analytics", "Agent Evaluation", "Skill Systems", "AI Product Delivery"].map((item) => <span key={item} className="rounded-full border border-black/10 bg-[#f5f5f7] px-4 py-2 text-sm text-[#515154]">{item}</span>)}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="rounded-[2rem] bg-[#111318] p-6 text-white shadow-[0_32px_90px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between"><div><p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Quality operating model</p><p className="mt-2 text-lg font-semibold">Signal → decision</p></div><Workflow className="h-5 w-5 text-[#65b5ff]" /></div>
                <div className="mt-7 space-y-2">
                  {loop.map(([title, , Icon], index) => <div key={title} className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-[#65b5ff]"><Icon className="h-4 w-4" /></div><div className="flex-1 rounded-xl border border-white/8 bg-white/[0.055] px-4 py-3 text-sm font-semibold">{title}<span className="float-right text-[10px] tracking-[0.14em] text-white/35">0{index + 1}</span></div>{index < 4 ? <ArrowRight className="h-4 w-4 text-white/25" /> : <span className="h-4 w-4 rounded-full bg-[#30d158] shadow-[0_0_0_5px_rgba(48,209,88,0.12)]" />}</div>)}
                </div>
                <div className="mt-6 flex gap-3 rounded-2xl bg-[#0071e3] p-4"><ShieldCheck className="h-5 w-5 shrink-0" /><p className="text-sm leading-6 text-white/90">Evidence at every layer. Sensitive prompts and user content stay out of the public case study.</p></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20 sm:px-8 lg:gap-32 lg:px-12 lg:py-28">
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{metrics.map(([value, label], i) => <FadeInCard key={label} delay={i * 0.05} className="rounded-[1.5rem] border border-black/8 bg-white p-5 shadow-[0_14px_44px_rgba(0,0,0,0.05)]"><p className="text-4xl font-semibold tracking-[-0.04em]">{value}</p><p className="mt-2 text-sm text-[#6e6e73]">{label}</p></FadeInCard>)}</div>
          <p className="mt-4 text-xs text-[#86868b]">Scope metrics describe the evaluation system and work completed—not causal business uplift.</p>
        </AnimatedSection>

        <AnimatedSection className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <Intro eyebrow="Context" title="Creative AI needs a different definition of quality." description="Phai supports professional content creation through conversational agents, reusable Skills, knowledge retrieval, and multi-agent collaboration. The product challenge was identifying which layer failed, why it failed, and what the team should change next." />
          <div className="grid gap-4">{([
            ["Quality was subjective", "A fluent response could still fail on structure, character consistency, or creative usefulness.", MessageSquareText],
            ["Failures crossed layers", "A bad outcome could begin in retrieval, routing, a Skill definition, context decay, or the underlying model.", Layers3],
            ["Expert knowledge was tacit", "Story frameworks needed explicit steps, branches, boundaries, and validation rules.", BookOpenCheck],
          ] as const).map(([title, text, Icon]) => <div key={title} className="rounded-[1.75rem] border border-black/8 bg-white p-6 shadow-[0_16px_50px_rgba(0,0,0,0.05)]"><div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#0071e3]"><Icon className="h-5 w-5" /></div><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-[#6e6e73]">{text}</p></div></div></div>)}</div>
        </AnimatedSection>

        <AnimatedSection>
          <Intro eyebrow="Product model" title="One loop connected signals, diagnosis, and product action." description="Analytics, evaluation, and Skill design became one shared operating loop. Each stage made the next decision more grounded and traceable." />
          <div className="mt-10 grid gap-3 lg:grid-cols-5">{loop.map(([title, text, Icon], i) => <FadeInCard key={title} delay={i * 0.05} className="h-full rounded-[1.6rem] border border-black/8 bg-white p-5 shadow-sm"><div className="flex justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1d1d1f] text-white"><Icon className="h-4 w-4" /></div><span className="text-xs text-[#b0b0b5]">0{i + 1}</span></div><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#6e6e73]">{text}</p></FadeInCard>)}</div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-[2.25rem] border border-black/8 bg-white p-6 shadow-[0_28px_90px_rgba(0,0,0,0.07)] sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]"><Intro eyebrow="01 · Product intelligence" title="Make product health visible before debating solutions." description="I built a product evaluation framework and organized dashboards across six lenses, connecting macro product health to the exact path, module, or cohort where friction appeared." />
              <div className="rounded-[1.75rem] bg-[#f5f5f7] p-5"><div className="flex justify-between"><div><p className="font-semibold">Product health map</p><p className="mt-1 text-xs text-[#86868b]">29 behavior metrics · 6 dashboard families</p></div><BarChart3 className="h-5 w-5 text-[#0071e3]" /></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{dashboardFamilies.map(([title, detail, Icon]) => <div key={title} className="rounded-[1.25rem] border border-black/8 bg-white p-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#0071e3]"><Icon className="h-4 w-4" /></div><div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-[#86868b]">{detail}</p></div></div></div>)}</div></div>
            </div>
            <div className="mt-8 grid gap-4 border-t border-black/8 pt-8 md:grid-cols-3">{[["18 surfaces", "Mapped instrumentation across core modules and Agent/LLM contexts."], ["Weekly analysis", "Segmented negative feedback by track, page, turn, user, action, artifact, and time."], ["Priority input", "Converted recurring patterns into P0/P1 diagnoses and product requirement inputs."]].map(([title, text]) => <div key={title} className="rounded-[1.4rem] bg-[#f5f5f7] p-5"><p className="font-semibold">{title}</p><p className="mt-2 text-sm leading-7 text-[#6e6e73]">{text}</p></div>)}</div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div><Intro eyebrow="02 · Agent evaluation" title="Diagnose the system layer—not just the final response." description="I contributed to a layered evaluation model spanning Task → Query → Agent → Skill → Sub-agent, then calibrated the rubric on real multi-turn sessions." /><div className="mt-8 grid gap-4 sm:grid-cols-3">{[["5", "multi-turn sessions"], ["32 / 35", "tasks marked complete"], ["71.4%", "initial rule agreement"]].map(([v, l]) => <div key={l} className="rounded-[1.5rem] bg-white p-5 shadow-sm"><p className="text-3xl font-semibold">{v}</p><p className="mt-2 text-sm text-[#6e6e73]">{l}</p></div>)}</div></div>
          <div className="rounded-[2rem] bg-[#111318] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]"><div className="flex justify-between"><div><p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Attribution stack</p><p className="mt-2 text-lg font-semibold">Where did quality break?</p></div><GitBranch className="h-5 w-5 text-[#65b5ff]" /></div><div className="mt-7 space-y-2">{evaluationLayers.map((layer, i) => <div key={layer} className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-[10px] text-white/55">{i + 1}</span><div className="flex-1 rounded-xl border border-white/8 bg-white/[0.055] px-4 py-3 text-sm font-semibold">{layer}</div>{i < 4 ? <ArrowRight className="h-4 w-4 text-white/25" /> : <CircleDot className="h-4 w-4 text-[#30d158]" />}</div>)}</div><div className="mt-6 rounded-2xl border border-[#65b5ff]/25 bg-[#65b5ff]/10 p-4"><p className="text-sm font-semibold text-[#a9d5ff]">Calibration, not decoration</p><p className="mt-2 text-sm leading-6 text-white/65">Disagreement revealed ambiguous definitions and gave the team rubric language to revisit.</p></div></div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-[2.25rem] bg-[#eaf4ff] p-6 sm:p-10"><Intro eyebrow="03 · Skill productization" title="Turn expert theory into an executable product contract." description="I audited 55 vertical AI Skills across 10 engineering dimensions, helped translate screenwriting frameworks into executable workflows, and built a reusable five-dimensional evaluator." /><div className="mt-10 grid gap-5 lg:grid-cols-2"><div className="rounded-[1.75rem] bg-white p-7 shadow-sm"><p className="text-[11px] uppercase tracking-[0.18em] text-[#86868b]">From theory to execution</p><div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4"><div className="rounded-[1.3rem] bg-[#f5f5f7] p-5"><BookOpenCheck className="h-5 w-5" /><p className="mt-4 font-semibold">Human framework</p><p className="mt-2 text-sm leading-7 text-[#6e6e73]">Principles, examples, and expert intuition.</p></div><ArrowRight className="h-5 w-5 text-[#0071e3]" /><div className="rounded-[1.3rem] bg-[#1d1d1f] p-5 text-white"><Workflow className="h-5 w-5 text-[#65b5ff]" /><p className="mt-4 font-semibold">Agent contract</p><p className="mt-2 text-sm leading-7 text-white/60">Steps, branches, checks, and schema.</p></div></div></div><div className="rounded-[1.75rem] bg-white p-7 shadow-sm"><div className="flex justify-between"><div><p className="text-[11px] uppercase tracking-[0.18em] text-[#86868b]">Reusable evaluator</p><h3 className="mt-3 text-xl font-semibold">Five checks before a Skill ships</h3></div><FileSearch className="h-5 w-5 text-[#0071e3]" /></div><div className="mt-6 space-y-3">{evaluatorChecks.map((check, i) => <div key={check} className="flex items-center gap-4 rounded-[1.15rem] bg-[#f5f5f7] px-4 py-3.5"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#0071e3]">{i + 1}</span><span className="text-sm font-semibold text-[#515154]">{check}</span></div>)}</div></div></div></div>
        </AnimatedSection>

        <AnimatedSection>
          <Intro eyebrow="Product judgment" title="The decisions behind the system mattered more than the dashboard count." description="The work stayed focused on trustworthy diagnosis and reusable product behavior rather than disconnected AI demos." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">{[["Measure the path, not only the answer", "Creative-agent quality needs both outcome judgment and trace-level evidence."], ["Treat disagreement as product data", "71.4% agreement was a calibration signal, not a quality win."], ["Turn theory into navigation", "A useful Skill guides the model through decisions, checks, and safe exits."], ["Instrument with privacy by default", "Events separated product context from sensitive prompts, outputs, credentials, and raw errors."]].map(([title, text], i) => <div key={title} className="rounded-[1.75rem] border border-black/8 bg-white p-7 shadow-sm"><div className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-xs text-white">0{i + 1}</span><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#6e6e73]">{text}</p></div></div></div>)}</div>
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.15rem] bg-[#1d1d1f] p-9 text-white shadow-xl"><p className="text-xs uppercase tracking-[0.18em] text-[#65b5ff]">What changed</p><h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">From scattered feedback to a repeatable quality conversation.</h2><p className="mt-6 text-base leading-8 text-white/65">Shared structures made product health, Agent failures, and Skill quality easier to discuss and prioritize across teams.</p></div>
          <div className="rounded-[2.15rem] border border-black/8 bg-white p-9 shadow-sm"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#0071e3]"><LockKeyhole className="h-5 w-5" /></div><h2 className="mt-6 text-2xl font-semibold">Evidence boundary</h2><p className="mt-4 text-sm leading-7 text-[#6e6e73]">This case reports verified work scope and evaluation artifacts. It does not turn planning estimates, internal snapshots, or team targets into personal outcome claims.</p></div>
        </AnimatedSection>

        <AnimatedSection><div className="rounded-[2.25rem] border border-black/8 bg-white p-8 shadow-sm sm:p-10"><p className="text-xs uppercase tracking-[0.18em] text-[#0071e3]">Reflection</p><h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Reliable AI products turn ambiguity into an operating system for learning.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-[#6e6e73]">Evaluation is not a final QA gate. When metrics, traces, expert rules, and product decisions share one structure, evaluation becomes part of how the product discovers what to build.</p><Link href="/#internship" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white active:scale-[0.97]">View other experience <ArrowRight className="h-4 w-4" /></Link></div></AnimatedSection>
      </div>
    </main>
  );
}
