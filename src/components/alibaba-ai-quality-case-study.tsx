"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Bot,
  Braces,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Code2,
  Database,
  Eye,
  FileSearch,
  GitBranch,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Network,
  Radar,
  Route,
  ScanSearch,
  Sparkles,
  Split,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { AnimatedSection, FadeInCard } from "@/components/animated-section";
import { PhaiProductSimulator } from "@/components/phai-product-simulator";
import type { CaseStudyProject } from "@/data/projects";

type Props = { project: CaseStudyProject };
type DetailType = "knowledge" | "architecture" | null;
type ProductScenarioId = "diagnose" | "bible" | "brief";
type InspectorTab = "artifact" | "trace" | "knowledge" | "files";
type CapabilityId = "context" | "skills" | "knowledge" | "action" | "orchestration";

gsap.registerPlugin(useGSAP);

const productScenarios = {
  diagnose: {
    eyebrow: "Pinned",
    title: "Diagnose Episode 1",
    project: "Glass Harbor · Episode 01",
    prompt: "Review the first episode. Find the real Act I turning point and explain why the middle loses momentum.",
    response: "The first irreversible choice happens later than the apparent inciting event. Moving the commitment beat forward would give the investigation a clearer dramatic engine.",
    steps: [
      ["Read", "episode-01.md and project context"],
      ["Loaded", "@Three-Act Diagnosis"],
      ["Compared", "3 turning-point candidates"],
      ["Checked", "8 linked narrative dimensions"],
      ["Delivered", "evidence-backed diagnosis"],
    ],
  },
  bible: {
    eyebrow: "Recent",
    title: "Build Project Bible",
    project: "Glass Harbor · Development",
    prompt: "Turn the approved concept and character notes into a project Bible. Infer what is supported; flag what still needs a creative decision.",
    response: "I organized the material into a seven-part creative blueprint, preserved source-backed decisions, and separated inferred placeholders from decisions the team still needs to make.",
    steps: [
      ["Read", "concept.md and character-notes.docx"],
      ["Loaded", "@Project Bible"],
      ["Mapped", "7 development decisions"],
      ["Checked", "Bible ↔ script consistency"],
      ["Created", "project-bible.md"],
    ],
  },
  brief: {
    eyebrow: "Scheduled",
    title: "Daily Industry Brief",
    project: "Entertainment intelligence",
    prompt: "Every weekday at 09:00, collect the most relevant industry updates, remove duplicates, and deliver a source-linked brief.",
    response: "The scheduled Agent collected current sources, delegated topic scans, removed repeated coverage, and prepared a concise brief with traceable links.",
    steps: [
      ["Triggered", "weekday schedule · 09:00"],
      ["Browsed", "12 public sources"],
      ["Delegated", "3 topic scans"],
      ["Deduplicated", "21 candidate updates"],
      ["Prepared", "source-linked daily brief"],
    ],
  },
} as const;

const productCapabilities = {
  context: ["Work in context", "Conversation, attachments, project workspaces, file trees, quotes, clipboard history, and global search."],
  skills: ["Apply expertise", "Built-in and custom Skills turn professional methods into reusable, shareable workflows."],
  knowledge: ["Ground with knowledge", "Official and personal knowledge bases can be cited directly inside a task through @ mentions."],
  action: ["Take action", "Alpha can work with files, commands, images, web research, and browser automation. It does more than return text."],
  orchestration: ["Orchestrate work", "Sub-agents, group collaboration, schedules, and messaging channels keep longer workflows moving."],
} as const;

const challengeCards = [
  ["Subjective quality", "A fluent response could still be structurally weak or creatively unusable.", Sparkles],
  ["Layered failures", "Retrieval, routing, context, Skills, tools, and models could all be responsible.", Layers3],
  ["Long-horizon work", "One conversation could contain dozens of separate creative tasks and revisions.", Route],
  ["Tacit expertise", "Professional story judgment lived in examples and intuition, not executable rules.", BookOpenCheck],
] as const;

const failureModes = [
  ["Intent drift", "Missed a requested change or pursued the wrong subtask."],
  ["Creative quality", "Layout, readability, repetition, or narrative structure failed."],
  ["Execution failure", "Dependencies, files, tools, or long-horizon context broke the workflow."],
] as const;

const qualityLoop = [
  ["Observe", "Behavior · feedback · traces", Eye],
  ["Diagnose", "Task · query · Agent layer", ScanSearch],
  ["Formalize", "Expert judgment → Skill", Braces],
  ["Validate", "Real cases · rubric calibration", CheckCircle2],
  ["Operationalize", "Recurring quality infrastructure", CalendarClock],
] as const;

const threeActSteps = [
  ["01", "Identify the form", "Single episode or full-season arc"],
  ["02", "Generate candidates", "List at least three possible turning points"],
  ["03", "Test irreversibility", "Does the character situation truly change?"],
  ["04", "Diagnose in context", "Evaluate eight linked narrative dimensions"],
  ["05", "Check false signals", "Activity and event count are not structure"],
  ["06", "Return a contract", "Structured output, self-check, and safe exit"],
] as const;

const evaluatorChecks = [
  ["D1", "Trigger overlap"],
  ["D2", "Variant distinction"],
  ["D3", "Scope fit"],
  ["D4", "Validation coverage"],
  ["D5", "Domain & granularity"],
] as const;

function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-baseline gap-2">
        <span className="text-[13px] font-semibold text-[#0071e3]">{number}</span>
        <span className="text-[13px] font-medium text-[#86868b]">{label}</span>
      </div>
      <h2 className="mt-2 text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f] sm:text-[2.5rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-8 text-[#6e6e73]">{description}</p>
      )}
    </div>
  );
}

function DetailModal({ detail, onClose }: { detail: Exclude<DetailType, null>; onClose: () => void }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const isKnowledge = detail === "knowledge";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-md sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.22 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="alibaba-detail-title"
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-8"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 18 }}
        transition={{ type: "spring", bounce: 0, duration: 0.38 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#0071e3] text-white transition active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0071e3]">
          {isKnowledge ? "Knowledge system" : "Engineering lens"}
        </p>
        <h2 id="alibaba-detail-title" className="mt-4 pr-12 text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-4xl">
          {isKnowledge
            ? "Structuring 4,700+ knowledge items for contextual retrieval"
            : "Mapping product behavior to a 23-package Agent runtime"}
        </h2>

        {isKnowledge ? <KnowledgeDetail /> : <ArchitectureDetail />}
      </motion.div>
    </motion.div>
  );
}

function KnowledgeDetail() {
  return (
    <div className="mt-8">
      <p className="max-w-3xl text-base leading-8 text-[#6e6e73]">
        I proposed the knowledge-base Schema and advanced it through review. The design converted an unstructured creative corpus into entities with source context, scene anchors, confidence, and explicit relationships.
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Character", "Identity · motivation · arc", "CH"],
          ["Relationship", "Actors · state · evolution", "RE"],
          ["World", "Rules · entities · constraints", "WO"],
          ["Plotline", "Beats · scenes · dependencies", "PL"],
        ].map(([title, text, code]) => (
          <div key={code} className="rounded-[1.4rem] bg-[#f5f5f7] p-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[10px] font-semibold text-[#0071e3] shadow-sm">{code}</span>
            <h3 className="mt-5 font-semibold text-[#1d1d1f]">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-[#86868b]">{text}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 grid gap-2 md:grid-cols-5">
        {[
          ["1", "LLM extraction"],
          ["2", "Confidence gate"],
          ["3", "Consistency check"],
          ["4", "Dual storage"],
          ["5", "Filtered recall"],
        ].map(([number, title], index) => (
          <div key={number} className="relative rounded-2xl border border-black/8 bg-white p-4">
            <span className="text-[10px] font-semibold text-[#0071e3]">{number}</span>
            <p className="mt-2 text-sm font-semibold text-[#1d1d1f]">{title}</p>
            {index < 4 && <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-[#b0b0b5] md:block" />}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-[#eaf4ff] p-5 text-sm leading-7 text-[#3f5f78]">
        Boundary: I proposed the Schema and drove review. This does not claim that I personally shipped the full production extraction and retrieval pipeline.
      </div>
    </div>
  );
}

function ArchitectureDetail() {
  return (
    <div className="mt-8">
      <p className="max-w-3xl text-base leading-8 text-[#6e6e73]">
        I translated the runtime into a seven-layer product architecture so requirements and quality failures could be traced to orchestration, context, tools, Skills, scheduling, and observability.
      </p>
      <div className="mt-7 rounded-[1.6rem] bg-[#111318] p-5 text-white sm:p-7">
        <div className="grid gap-2 md:grid-cols-7">
          {[
            ["01", "Entry"],
            ["02", "Actor"],
            ["03", "Context"],
            ["04", "Tool"],
            ["05", "Skill"],
            ["06", "Schedule"],
            ["07", "Observe"],
          ].map(([number, title]) => (
            <div key={number} className="rounded-xl border border-white/8 bg-white/[0.055] p-4">
              <span className="text-[9px] text-[#65b5ff]">{number}</span>
              <p className="mt-3 text-sm font-semibold">{title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["Actor / Inbox / Dispatcher", "How requests enter, queue, and route", Network],
          ["ContextEngine", "Ingest → assemble → afterTurn", Layers3],
          ["Tool + Skill runtime", "Capability selection and execution", Bot],
          ["Scheduler + observability", "Recurring work and quality traces", CalendarClock],
        ].map(([title, text, Icon]) => (
          <div key={title as string} className="rounded-[1.35rem] border border-black/8 bg-white p-5">
            <Icon className="h-5 w-5 text-[#0071e3]" />
            <h3 className="mt-4 text-sm font-semibold text-[#1d1d1f]">{title as string}</h3>
            <p className="mt-2 text-xs leading-5 text-[#86868b]">{text as string}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs leading-5 text-[#86868b]">
        Boundary: this is a product-to-engineering architecture map, not a claim that I authored the underlying runtime framework.
      </p>
    </div>
  );
}

function ProductInspector({ scenarioId, tab }: { scenarioId: ProductScenarioId; tab: InspectorTab }) {
  if (tab === "trace") {
    return (
      <div className="space-y-2">
        {productScenarios[scenarioId].steps.map(([verb, detail], index) => (
          <div key={`${verb}-${detail}`} className="flex items-start gap-3 rounded-xl bg-[#f5f5f7] p-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dff2e5] text-[#248a3d]">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#1d1d1f]">{verb}</p>
              <p className="mt-0.5 text-[10px] leading-4 text-[#86868b]">{detail}</p>
            </div>
            <span className="ml-auto text-[9px] tabular-nums text-[#b0b0b5]">0{index + 1}</span>
          </div>
        ))}
      </div>
    );
  }

  if (tab === "knowledge") {
    return (
      <div className="space-y-3">
        {[
          ["Story structure handbook", "Official knowledge · 8 sections"],
          ["Glass Harbor story world", "My knowledge · 14 files"],
          ["Character relationship map", "Structured knowledge · 9 entities"],
        ].map(([title, detail], index) => (
          <div key={title} className="rounded-xl border border-black/8 bg-white p-3 shadow-[0_6px_20px_rgba(0,0,0,0.035)]">
            <div className="flex items-center gap-3">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${index === 0 ? "bg-[#eaf4ff] text-[#0071e3]" : "bg-[#f5f5f7] text-[#6e6e73]"}`}>
                <Database className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-[#1d1d1f]">{title}</p>
                <p className="mt-0.5 text-[9px] text-[#86868b]">{detail}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="rounded-xl bg-[#eaf4ff] p-3 text-[10px] leading-5 text-[#3f5f78]">
          Knowledge is attached with source context so the Agent can distinguish retrieved evidence from its own inference.
        </div>
      </div>
    );
  }

  if (tab === "files") {
    return (
      <div className="space-y-1 text-[11px] text-[#515154]">
        {[
          ["Glass Harbor", "folder"],
          ["episode-01.md", "final"],
          ["concept.md", "file"],
          ["character-notes.docx", "file"],
          ["project-bible.md", "new"],
          ["research", "folder"],
        ].map(([name, state], index) => (
          <div key={name} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${index === 1 ? "bg-[#eaf4ff] text-[#0066cc]" : "hover:bg-[#f5f5f7]"}`}>
            {state === "folder" ? <BookOpenCheck className="h-3.5 w-3.5" /> : <MessageSquareText className="h-3.5 w-3.5" />}
            <span className="truncate">{name}</span>
            {state === "final" && <span className="ml-auto rounded bg-[#dff2e5] px-1.5 py-0.5 text-[8px] font-semibold text-[#248a3d]">FINAL</span>}
            {state === "new" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#0071e3]" />}
          </div>
        ))}
      </div>
    );
  }

  if (scenarioId === "diagnose") {
    return (
      <div>
        <div className="rounded-xl bg-[#f5f5f7] p-4">
          <div className="flex items-center justify-between text-[9px] font-medium text-[#86868b]"><span>ACT I</span><span>ACT II</span><span>ACT III</span></div>
          <div className="relative mt-3 flex h-2 overflow-visible rounded-full bg-[#e2e2e5]">
            <span className="w-[31%] rounded-l-full bg-[#65b5ff]" />
            <span className="w-[45%] bg-[#0071e3]" />
            <span className="flex-1 rounded-r-full bg-[#111318]" />
            <span className="absolute left-[31%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#0071e3] shadow" />
            <span className="absolute left-[76%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#111318] shadow" />
          </div>
          <p className="mt-4 text-[10px] font-semibold leading-4 text-[#1d1d1f]">The apparent incident is not yet an irreversible commitment.</p>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="rounded-xl border border-[#ffcc00]/30 bg-[#fff9df] p-3"><p className="text-[9px] font-semibold text-[#8a6500]">STRUCTURE</p><p className="mt-1 text-[10px] leading-4 text-[#6e5b23]">Act I commitment arrives late.</p></div>
          <div className="rounded-xl border border-black/8 p-3"><p className="text-[9px] font-semibold text-[#86868b]">EVIDENCE</p><p className="mt-1 text-[10px] leading-4 text-[#515154]">Scene 18 changes the goal and closes the old path.</p></div>
        </div>
      </div>
    );
  }

  if (scenarioId === "bible") {
    return (
      <div>
        <div className="grid grid-cols-4 gap-1.5">
          {["Question", "Overview", "World", "Tone", "Characters", "Arcs", "Episodes"].map((item, index) => (
            <div key={item} className={`rounded-lg p-2 ${index < 5 ? "bg-[#eaf4ff] text-[#0066cc]" : "bg-[#f5f5f7] text-[#86868b]"}`}>
              <span className="text-[8px] font-semibold">0{index + 1}</span>
              <p className="mt-1 truncate text-[9px] font-medium">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-black/8 bg-white p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">Project Bible</p>
          <h4 className="mt-2 text-sm font-semibold text-[#1d1d1f]">Glass Harbor</h4>
          <div className="mt-3 space-y-2">
            {["Core dramatic question", "World rules", "Character engine", "Season trajectory"].map((item, index) => (
              <div key={item} className="flex items-center gap-2 text-[10px] text-[#515154]"><span className={`h-1.5 w-1.5 rounded-full ${index < 3 ? "bg-[#34c759]" : "bg-[#ffcc00]"}`} />{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {[["12", "Sources"], ["3", "Agents"], ["7", "Updates"]].map(([value, label]) => (
          <div key={label} className="rounded-xl bg-[#f5f5f7] p-3 text-center"><p className="text-lg font-semibold tracking-[-0.04em] text-[#1d1d1f]">{value}</p><p className="text-[8px] uppercase tracking-[0.12em] text-[#86868b]">{label}</p></div>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {["Streaming platforms expand short-form slates", "New creator tooling enters private beta", "Weekly audience trend snapshot"].map((item, index) => (
          <div key={item} className="rounded-xl border border-black/8 p-3"><div className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0071e3]" /><p className="text-[10px] font-medium leading-4 text-[#1d1d1f]">{item}</p></div><p className="mt-1 pl-3.5 text-[8px] text-[#86868b]">Public source {index + 1} · verified</p></div>
        ))}
      </div>
    </div>
  );
}

export function PhaiProductDemoLegacy() {
  const [scenarioId, setScenarioId] = useState<ProductScenarioId>("diagnose");
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>("artifact");
  const [activeCapability, setActiveCapability] = useState<CapabilityId>("skills");
  const [isReplaying, setIsReplaying] = useState(false);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const replayTimeline = useRef<gsap.core.Timeline | null>(null);
  const scenario = productScenarios[scenarioId];

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-demo-change]", rootRef.current);
      gsap.killTweensOf(targets);
      if (reduceMotion) {
        gsap.set(targets, { clearProps: "all" });
        return;
      }
      gsap.fromTo(targets, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.035, ease: "power3.out", overwrite: "auto" });
    },
    { scope: rootRef, dependencies: [scenarioId, inspectorTab, activeCapability, reduceMotion], revertOnUpdate: true },
  );

  const replay = () => {
    const steps = gsap.utils.toArray<HTMLElement>("[data-demo-step]", rootRef.current);
    replayTimeline.current?.kill();
    setIsReplaying(true);

    if (reduceMotion) {
      gsap.set(steps, { autoAlpha: 1, y: 0 });
      setIsReplaying(false);
      return;
    }

    replayTimeline.current = gsap.timeline({
      onComplete: () => setIsReplaying(false),
      onInterrupt: () => setIsReplaying(false),
    });
    replayTimeline.current
      .set(steps, { autoAlpha: 0, y: 8 })
      .to(steps, { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.28, ease: "power3.out", overwrite: "auto" });
  };

  const selectScenario = (nextId: ProductScenarioId) => {
    replayTimeline.current?.kill();
    setIsReplaying(false);
    setInspectorTab("artifact");
    setScenarioId(nextId);
  };

  const selectCapability = (id: CapabilityId) => {
    setActiveCapability(id);
    if (id === "context") setInspectorTab("files");
    if (id === "skills" || id === "action" || id === "orchestration") setInspectorTab("trace");
    if (id === "knowledge") setInspectorTab("knowledge");
  };

  return (
    <div ref={rootRef} className="mt-9">
      <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f5f5f7] shadow-[0_34px_100px_rgba(0,0,0,0.13)]">
        <div className="flex h-12 items-center border-b border-black/8 bg-white/80 px-4 backdrop-blur-2xl sm:px-5">
          <div className="flex gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></div>
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 font-serif text-[13px] font-semibold italic text-[#1d1d1f]"><span className="text-sm">α</span>Alpha</div>
          <div className="ml-auto flex items-center gap-2 text-[9px] text-[#86868b]"><LockKeyhole className="h-3 w-3" /><span className="hidden sm:inline">Local workspace</span></div>
        </div>

        <div className="flex gap-2 overflow-x-auto border-b border-black/8 bg-white px-3 py-2 lg:hidden">
          {(Object.entries(productScenarios) as [ProductScenarioId, (typeof productScenarios)[ProductScenarioId]][]).map(([id, item]) => (
            <button key={id} type="button" onClick={() => selectScenario(id)} className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold transition active:scale-[0.97] motion-reduce:transition-none ${scenarioId === id ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7] text-[#6e6e73]"}`}>{item.title}</button>
          ))}
        </div>

        <div className="grid bg-white lg:min-h-[38rem] lg:grid-cols-[13rem_minmax(0,1fr)_19rem]">
          <aside className="hidden border-r border-black/8 bg-[#f7f7f8] p-3 lg:flex lg:flex-col">
            <button type="button" className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-left text-[11px] font-semibold text-[#1d1d1f] shadow-sm transition active:scale-[0.97] motion-reduce:transition-none"><span className="text-base font-normal">＋</span>New task</button>
            <div className="mt-5 space-y-5">
              {(["Pinned", "Recent", "Scheduled"] as const).map((group) => (
                <div key={group}>
                  <p className="px-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#b0b0b5]">{group}</p>
                  <div className="mt-1.5 space-y-1">
                    {(Object.entries(productScenarios) as [ProductScenarioId, (typeof productScenarios)[ProductScenarioId]][]).filter(([, item]) => item.eyebrow === group).map(([id, item]) => (
                      <button key={id} type="button" aria-pressed={scenarioId === id} onClick={() => selectScenario(id)} className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2.5 text-left text-[10px] font-medium transition active:scale-[0.98] motion-reduce:transition-none ${scenarioId === id ? "bg-[#dedee1] text-[#1d1d1f]" : "text-[#6e6e73] hover:bg-black/[0.035]"}`}>
                        {id === "brief" ? <CalendarClock className="h-3.5 w-3.5" /> : id === "bible" ? <BookOpenCheck className="h-3.5 w-3.5" /> : <GitBranch className="h-3.5 w-3.5 text-[#0071e3]" />}
                        <span>{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto space-y-1 border-t border-black/8 pt-3 text-[10px] text-[#6e6e73]">
              {["Skills", "Knowledge", "My Agents"].map((item) => <div key={item} className="rounded-lg px-2.5 py-2">{item}</div>)}
            </div>
          </aside>

          <section className="flex min-w-0 flex-col border-b border-black/8 lg:border-b-0 lg:border-r">
            <div className="flex min-h-12 items-center gap-2 border-b border-black/8 px-4 sm:px-5">
              <span data-demo-change className="truncate text-[11px] font-semibold text-[#1d1d1f]">{scenario.project}</span>
              <span className="text-[#d2d2d7]">/</span>
              <span data-demo-change className="truncate text-[10px] text-[#86868b]">{scenario.title}</span>
              <button type="button" onClick={replay} disabled={isReplaying} className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-black/8 bg-white px-2.5 py-1.5 text-[9px] font-semibold text-[#515154] shadow-sm transition active:scale-[0.96] disabled:opacity-50 motion-reduce:transition-none">
                <Zap className="h-3 w-3 text-[#0071e3]" />{isReplaying ? "Replaying" : "Replay"}
              </button>
            </div>

            <div className="flex-1 p-4 sm:p-6">
              <div data-demo-change className="ml-auto max-w-[30rem] rounded-[1.1rem] bg-[#eaf4ff] px-4 py-3 text-[11px] leading-5 text-[#0066cc]">{scenario.prompt}</div>
              <div className="mt-5 space-y-2">
                {scenario.steps.map(([verb, detail], index) => (
                  <div key={`${verb}-${detail}`} data-demo-change data-demo-step className="flex items-center gap-2 text-[10px] text-[#86868b]">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#dff2e5] text-[#248a3d]"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
                    <span><strong className="font-semibold text-[#515154]">{verb}</strong> {detail}</span>
                    <span className="ml-auto hidden text-[8px] tabular-nums text-[#c7c7cc] sm:block">0{index + 1}</span>
                  </div>
                ))}
              </div>
              <div data-demo-change className="mt-5 max-w-[36rem] text-[11px] leading-6 text-[#515154]">
                <p>{scenario.response}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(scenarioId === "diagnose" ? ["3 acts", "2 turning points", "8 dimensions"] : scenarioId === "bible" ? ["7 decisions", "source-backed", "review required"] : ["12 sources", "3 sub-agents", "scheduled"]).map((item) => <span key={item} className="rounded-full bg-[#f5f5f7] px-2.5 py-1 text-[9px] font-medium text-[#6e6e73]">{item}</span>)}
                </div>
              </div>
            </div>

            <div className="m-4 mt-0 rounded-[1.15rem] border border-black/10 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:m-5 sm:mt-0">
              <p className="text-[10px] text-[#b0b0b5]">Describe a task or @ mention context</p>
              <div className="mt-3 flex items-center gap-2">
                {["@ Files", "Skills", "Knowledge"].map((item) => <span key={item} className="rounded-lg bg-[#f5f5f7] px-2 py-1 text-[8px] text-[#6e6e73]">{item}</span>)}
                <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#111318] text-white"><ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </div>
          </section>

          <aside className="min-w-0 bg-[#fbfbfc] p-3 sm:p-4">
            <div className="flex gap-1 overflow-x-auto rounded-xl bg-[#efeff1] p-1">
              {(["artifact", "trace", "knowledge", "files"] as InspectorTab[]).map((tab) => (
                <button key={tab} type="button" aria-pressed={inspectorTab === tab} onClick={() => setInspectorTab(tab)} className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[8px] font-semibold capitalize transition active:scale-[0.96] motion-reduce:transition-none ${inspectorTab === tab ? "bg-white text-[#1d1d1f] shadow-sm" : "text-[#86868b]"}`}>{tab}</button>
              ))}
            </div>
            <div data-demo-change className="mt-4"><ProductInspector scenarioId={scenarioId} tab={inspectorTab} /></div>
          </aside>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 px-1">
        <p className="text-[10px] leading-5 text-[#86868b]">Interactive product simulation · fictional project data</p>
        <span className="hidden items-center gap-1.5 text-[9px] text-[#b0b0b5] sm:flex"><LockKeyhole className="h-3 w-3" />Public-safe representation</span>
      </div>

      <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {(Object.entries(productCapabilities) as [CapabilityId, (typeof productCapabilities)[CapabilityId]][]).map(([id, [title]]) => (
          <button key={id} type="button" aria-pressed={activeCapability === id} onClick={() => selectCapability(id)} className={`rounded-2xl border p-4 text-left transition active:scale-[0.97] motion-reduce:transition-none ${activeCapability === id ? "border-[#0071e3]/25 bg-[#eaf4ff] text-[#0066cc] shadow-[0_10px_28px_rgba(0,113,227,0.08)]" : "border-black/8 bg-white text-[#6e6e73] hover:border-black/15"}`}>
            <p className="text-[10px] font-semibold">{title}</p>
          </button>
        ))}
      </div>
      <div data-demo-change className="mt-3 rounded-2xl bg-[#f5f5f7] px-5 py-4 text-xs leading-6 text-[#6e6e73]"><strong className="font-semibold text-[#1d1d1f]">{productCapabilities[activeCapability][0]}.</strong> {productCapabilities[activeCapability][1]}</div>

      <div className="mt-6 rounded-[1.5rem] bg-[#111318] px-5 py-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-6">
        <p className="max-w-3xl text-sm leading-7 text-white/65">One request can cross files, knowledge, Skills, tools, and multiple Agents. That is why evaluating only the final answer was never enough.</p>
        <span className="mt-3 inline-flex shrink-0 items-center gap-2 text-[10px] font-semibold text-[#65b5ff] sm:mt-0">Next · the quality problem <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </div>
  );
}

export function AlibabaAiQualityCaseStudy({ project }: Props) {
  const [detail, setDetail] = useState<DetailType>(null);

  return (
    <main aria-label={`${project.title} case study`} className="relative min-h-screen overflow-hidden bg-white text-[#515154]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(90,200,250,0.08),transparent_22%),linear-gradient(180deg,#ffffff_0%,#ffffff_38%,#f5f5f7_100%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 pb-20 pt-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <Link
            href="/#internship"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2.5 text-sm font-medium text-[#6e6e73] shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl transition hover:text-[#1d1d1f] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] motion-reduce:transition-none"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Experience
          </Link>
        </div>

        <section className="grid min-h-[38rem] items-center gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#1d1d1f] px-3 py-1.5 text-xs font-semibold text-white">Alibaba · Youku AI Content Creation</span>
              <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs text-[#6e6e73]">AI Product Manager Intern</span>
            </div>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#1d1d1f] sm:text-5xl md:text-6xl">
              Building the quality system behind a creative AI Agent.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#6e6e73] md:text-lg">
              I turned ambiguous creative feedback into task-level evaluation, executable expert Skills, and recurring quality infrastructure.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["AI Product", "Prompt / Skill", "Agent Evaluation", "Workflow Engineering"].map((item) => (
                <span key={item} className="rounded-full bg-[#f5f5f7] px-3 py-2 text-xs font-medium text-[#515154]">{item}</span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-[2rem] border border-black/8 bg-white/80 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.09)] backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Alpha product anatomy</p>
                  <p className="mt-2 text-lg font-semibold text-[#1d1d1f]">One request, many systems</p>
                </div>
                <Bot className="h-6 w-6 text-[#0071e3]" />
              </div>
              <div className="mt-7 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
                {[
                  ["INPUT", "Creative task", MessageSquareText],
                  ["AGENT", "Alpha runtime", Network],
                  ["OUTPUT", "Creative artifact", Sparkles],
                ].map(([label, value, Icon], index) => (
                  <div key={label as string} className="contents">
                    <div className={`rounded-2xl p-5 ${index === 1 ? "bg-[#111318] text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"}`}>
                      <Icon className={`h-5 w-5 ${index === 1 ? "text-[#65b5ff]" : "text-[#0071e3]"}`} />
                      <p className={`mt-6 text-[9px] font-semibold tracking-[0.16em] ${index === 1 ? "text-white/40" : "text-[#86868b]"}`}>{label as string}</p>
                      <p className="mt-1 text-sm font-semibold">{value as string}</p>
                    </div>
                    {index < 2 && <ChevronRight className="m-auto hidden h-5 w-5 text-[#b0b0b5] sm:block" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {["Files", "Tools", "Skills", "Sub-agents", "Knowledge"].map((item) => (
                  <span key={item} className="rounded-xl border border-black/8 px-3 py-3 text-center text-[11px] font-medium text-[#6e6e73]">{item}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        <div className="mt-16 grid min-w-0 gap-20 lg:mt-20 lg:gap-28">
          <AnimatedSection>
            <SectionHeading
              number="01"
              label="Product Context"
              title="An AI workspace for film and TV story development."
              description="Built for writers and production teams, Alpha brings task-running Agents, reusable storytelling Skills, structured IP knowledge, and project files into one desktop workspace. It supports the full workflow from script analysis to production-ready artifacts."
            />

            <PhaiProductSimulator />
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="02"
              label="Why Quality Was Hard"
              title="The team did not need another score. It needed a diagnosis."
              description="Creative quality was subjective, and Alpha operated across a layered runtime. A weak final artifact did not explain what failed or what the team should change next."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {challengeCards.map(([title, text, Icon], index) => (
                <FadeInCard key={title} delay={index * 0.04} className="h-full rounded-[1.6rem] border border-black/8 bg-white p-6 shadow-[0_16px_44px_rgba(0,0,0,0.05)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#0071e3]"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-5 text-lg font-semibold text-[#1d1d1f]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6e6e73]">{text}</p>
                </FadeInCard>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="03"
              label="The Evidence That Changed the Model"
              title="One session looked successful. Then I decomposed it into 34 tasks."
              description="Session-level scoring hid what the Agent actually completed. I rebuilt the unit of evaluation around independently judgeable user tasks."
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
              <div className="rounded-[2rem] bg-[#111318] p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Real creative session</p>
                    <h3 className="mt-2 text-xl font-semibold">Conversation → evidence</h3>
                  </div>
                  <Split className="h-5 w-5 text-[#65b5ff]" />
                </div>
                <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                  {[
                    ["119", "turns", "One long session"],
                    ["34", "tasks", "Independently judged"],
                    ["32 / 2", "complete / incomplete", "Failures isolated"],
                  ].map(([value, label, note], index) => (
                    <div key={label} className="contents">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.055] p-5">
                        <p className="text-3xl font-semibold tracking-[-0.04em]">{value}</p>
                        <p className="mt-1 text-sm font-semibold text-[#a9d5ff]">{label}</p>
                        <p className="mt-3 text-xs text-white/40">{note}</p>
                      </div>
                      {index < 2 && <ArrowRight className="m-auto hidden h-4 w-4 text-white/25 sm:block" />}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-[#65b5ff]/20 bg-[#65b5ff]/10 p-4 text-sm leading-6 text-white/65">
                  Across five sessions, I labeled <strong className="text-white">91 query–response pairs</strong>. Initial rubric agreement was <strong className="text-white">65 / 91 (71.4%)</strong>. This showed that the definitions needed calibration, not that the system had succeeded.
                </div>
              </div>

              <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Attribution stack</p>
                    <h3 className="mt-2 text-xl font-semibold text-[#1d1d1f]">Where did quality break?</h3>
                  </div>
                  <GitBranch className="h-5 w-5 text-[#0071e3]" />
                </div>
                <div className="mt-6 space-y-2">
                  {["Task", "Query", "Agent", "Skill", "Sub-agent"].map((layer, index) => (
                    <div key={layer} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-[10px] text-[#86868b]">{index + 1}</span>
                      <div className="flex-1 rounded-xl bg-[#f5f5f7] px-4 py-3 text-sm font-semibold text-[#1d1d1f]">{layer}</div>
                      {index < 4 ? <ArrowRight className="h-4 w-4 text-[#b0b0b5]" /> : <CircleDot className="h-4 w-4 text-[#30a46c]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {failureModes.map(([title, text]) => (
                <div key={title} className="rounded-[1.4rem] bg-[#f5f5f7] p-5">
                  <p className="text-sm font-semibold text-[#1d1d1f]">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#86868b]">{text}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="04"
              label="Quality System Architecture"
              title="Evaluation only mattered when it changed the product."
              description="I connected signal collection, failure attribution, expert-method design, validation, and recurring operations into one quality loop."
            />
            <div className="mt-8 rounded-[2rem] border border-black/8 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-7">
              <div className="grid gap-3 lg:grid-cols-5">
                {qualityLoop.map(([title, text, Icon], index) => (
                  <div key={title} className="relative rounded-[1.45rem] bg-[#f5f5f7] p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1d1d1f] text-white"><Icon className="h-4 w-4" /></div>
                      <span className="text-[10px] text-[#b0b0b5]">0{index + 1}</span>
                    </div>
                    <p className="mt-5 font-semibold text-[#1d1d1f]">{title}</p>
                    <p className="mt-2 text-xs leading-5 text-[#86868b]">{text}</p>
                    {index < 4 && <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-[#b0b0b5] lg:block" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {[
                  "Task-level evaluation",
                  "Failure attribution",
                  "Three-Act / Bible",
                  "55-Skill governance",
                  "Daily patrol",
                ].map((item) => (
                  <p key={item} className="rounded-xl border border-black/8 px-3 py-3 text-center text-[11px] font-medium text-[#6e6e73]">{item}</p>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="05"
              label="Deep Dive · Three-Act Skill"
              title="I turned narrative theory into a Skill the Agent could execute."
              description="For the Three-Act Structure and Bible Skills, I owned product design, Prompt/Skill authoring, and test iteration."
            />
            <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
              <div>
                <div className="space-y-3">
                  {threeActSteps.map(([number, title, detail]) => (
                    <div key={number} className="flex gap-4 rounded-[1.35rem] border border-black/8 bg-white p-4 shadow-sm">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf4ff] text-[10px] font-semibold text-[#0071e3]">{number}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#1d1d1f]">{title}</p>
                        <p className="mt-1 text-xs leading-5 text-[#86868b]">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Episode + season", "Lazy references", "Anti-hallucination", "Graceful exit"].map((item) => (
                    <span key={item} className="rounded-full bg-[#f5f5f7] px-3 py-2 text-[11px] font-medium text-[#6e6e73]">{item}</span>
                  ))}
                </div>
              </div>

              <div className="lg:sticky lg:top-8">
                <div className="rounded-[2rem] bg-[#111318] p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Skill execution preview</p>
                      <h3 className="mt-2 text-xl font-semibold">Find the real turning point</h3>
                    </div>
                    <Braces className="h-5 w-5 text-[#65b5ff]" />
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.055] p-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">User input</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">Which event is the true end of Act One?</p>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#ff6b6b]/20 bg-[#ff6b6b]/8 p-5">
                      <div className="flex items-center gap-2 text-[#ff9b9b]"><X className="h-4 w-4" /><span className="text-[10px] font-semibold uppercase tracking-[0.13em]">Event only</span></div>
                      <p className="mt-5 font-semibold">“The proposal is rejected.”</p>
                      <p className="mt-3 text-xs leading-5 text-white/45">Dramatic, but the previous plan can still resume.</p>
                    </div>
                    <div className="rounded-2xl border border-[#30d158]/25 bg-[#30d158]/10 p-5">
                      <div className="flex items-center gap-2 text-[#8ee9a9]"><Check className="h-4 w-4" /><span className="text-[10px] font-semibold uppercase tracking-[0.13em]">State change</span></div>
                      <p className="mt-5 font-semibold">“She decides to leave the company.”</p>
                      <p className="mt-3 text-xs leading-5 text-white/50">Goal, relationships, and available choices all shift.</p>
                    </div>
                  </div>
                  <div className="mt-3 rounded-2xl border border-[#65b5ff]/20 bg-[#65b5ff]/10 p-4">
                    <p className="text-xs font-semibold text-[#a9d5ff]">Anti-pattern check</p>
                    <p className="mt-2 text-xs leading-5 text-white/50">Many events can still produce a flat second act. Event count is not structural progression.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="06"
              label="From One Skill to System Governance"
              title="I audited all 55 Skills, then built the evaluator I wished I had."
              description="The full audit and skill-evaluator were independently completed. The goal was to make ecosystem quality repeatable before release."
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Full ecosystem audit</p>
                    <p className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-[#1d1d1f]">55</p>
                    <p className="mt-2 text-sm text-[#6e6e73]">Skills × 10 engineering dimensions</p>
                  </div>
                  <FileSearch className="h-6 w-6 text-[#0071e3]" />
                </div>
                <div className="mt-7 grid gap-2 sm:grid-cols-2">
                  {[
                    "Check and generation trigger conflicts",
                    "Fast / expert variants indistinguishable",
                    "Missing domain and task granularity",
                    "Capability promises exceeded execution",
                    "Validation and exit rules missing",
                    "Duplicate workflow patterns",
                  ].map((item) => (
                    <div key={item} className="flex gap-2 rounded-xl bg-[#f5f5f7] p-3 text-xs leading-5 text-[#6e6e73]"><CircleDot className="mt-1 h-3 w-3 shrink-0 text-[#0071e3]" />{item}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-[#111318] p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">skill-evaluator</p>
                    <h3 className="mt-2 text-xl font-semibold">Audit logic, packaged as a tool</h3>
                  </div>
                  <Zap className="h-5 w-5 text-[#65b5ff]" />
                </div>
                <div className="mt-6 space-y-2">
                  {evaluatorChecks.map(([code, label]) => (
                    <div key={code} className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.055] px-4 py-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0071e3] text-[9px] font-semibold">{code}</span>
                      <span className="text-sm font-semibold">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div className="rounded-xl bg-white/[0.055] p-4"><p className="text-[9px] text-[#65b5ff]">INPUT</p><p className="mt-2 text-xs text-white/55">Directory or CSV</p></div>
                  <ArrowRight className="m-auto hidden h-4 w-4 text-white/25 sm:block" />
                  <div className="rounded-xl bg-white/[0.055] p-4"><p className="text-[9px] text-[#65b5ff]">OUTPUT</p><p className="mt-2 text-xs text-white/55">Conflicts · severity · rewrite</p></div>
                </div>
                <p className="mt-4 text-[11px] leading-5 text-white/35">Does not auto-write files or use static review to claim runtime quality.</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="07"
              label="From Manual Governance to Daily Operations"
              title="The quality check now runs every day and reports to the work group."
              description="I designed the instrumentation list, authored the patrol Skill, and configured the recurring task. This is deployed workflow infrastructure, not a future concept."
            />
            <div className="mt-8 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.07)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#30a46c] opacity-50 motion-reduce:animate-none" /><span className="relative inline-flex h-3 w-3 rounded-full bg-[#30a46c]" /></span>
                  <p className="text-sm font-semibold text-[#1d1d1f]">Deployed · recurring · in group use</p>
                </div>
                <span className="rounded-full bg-[#eaf8ef] px-3 py-1.5 text-xs font-semibold text-[#207a4b]">Daily patrol</span>
              </div>
              <div className="mt-7 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
                {[
                  ["01", "Event spec", "18 surfaces · privacy boundary", Radar],
                  ["02", "Code callsite", "Verify implementation", Code2],
                  ["03", "Data pipeline", "Trace event to DWD", Database],
                  ["04", "Group report", "Changes · gaps · severity", MessageSquareText],
                ].map(([number, title, text, Icon], index) => (
                  <div key={number as string} className="contents">
                    <div className="h-full rounded-[1.4rem] bg-[#f5f5f7] p-5">
                      <div className="flex justify-between"><Icon className="h-5 w-5 text-[#0071e3]" /><span className="text-[10px] text-[#b0b0b5]">{number as string}</span></div>
                      <p className="mt-5 text-sm font-semibold text-[#1d1d1f]">{title as string}</p>
                      <p className="mt-2 text-xs leading-5 text-[#86868b]">{text as string}</p>
                    </div>
                    {index < 3 && <ArrowRight className="m-auto hidden h-4 w-4 text-[#b0b0b5] lg:block" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[["18", "product surfaces"], ["12", "positive touchpoints"], ["2", "negative signals"], ["6 + 4", "event types + trace contexts"]].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-black/8 px-4 py-3"><p className="text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">{value}</p><p className="mt-1 text-[11px] text-[#86868b]">{label}</p></div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="08"
              label="Supporting Systems"
              title="The main story is quality. These systems show how far it reached."
              description="Open either layer when an interviewer wants to go deeper into knowledge design or Agent engineering."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setDetail("knowledge")}
                className="group rounded-[2rem] border border-black/8 bg-white p-7 text-left shadow-[0_18px_50px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(0,0,0,0.09)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#0071e3]"><Database className="h-5 w-5" /></div>
                  <ArrowRight className="h-5 w-5 text-[#b0b0b5] transition group-hover:translate-x-1 group-hover:text-[#0071e3] motion-reduce:transform-none" />
                </div>
                <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Knowledge Schema</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">4,700+ unstructured items → contextual entities</h3>
                <p className="mt-4 text-sm leading-7 text-[#6e6e73]">Character, relationship, world, and plotline entities with scene anchors and reviewed retrieval logic.</p>
                <p className="mt-6 text-xs font-semibold text-[#0071e3]">Proposed and advanced through review</p>
              </button>

              <button
                type="button"
                onClick={() => setDetail("architecture")}
                className="group rounded-[2rem] border border-black/8 bg-white p-7 text-left shadow-[0_18px_50px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(0,0,0,0.09)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#0071e3]"><Workflow className="h-5 w-5" /></div>
                  <ArrowRight className="h-5 w-5 text-[#b0b0b5] transition group-hover:translate-x-1 group-hover:text-[#0071e3] motion-reduce:transform-none" />
                </div>
                <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Product-to-Engineering Map</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">23 packages → seven runtime layers</h3>
                <p className="mt-4 text-sm leading-7 text-[#6e6e73]">Actor routing, ContextEngine, tool and Skill runtime, scheduling, and observability.</p>
                <p className="mt-6 text-xs font-semibold text-[#0071e3]">Architecture analysis, not framework authorship</p>
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="rounded-[2rem] bg-[#111318] p-8 text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#65b5ff]">The throughline</p>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Product judgment became an executable system.</h2>
                <p className="mt-5 text-base leading-8 text-white/55">I moved from real user traces to evaluation design, Prompt/Skill implementation, ecosystem tooling, and deployed quality operations. Reliable AI products fail at the seams between those layers.</p>
              </div>
              <div className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-sm sm:p-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5f5f7] text-[#0071e3]"><LockKeyhole className="h-5 w-5" /></div>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">Evidence boundary</h2>
                <p className="mt-4 text-sm leading-7 text-[#6e6e73]">The page separates independent ownership, deployed workflows, reviewed proposals, system-scale numbers, and team context. Targets and corpus size are not presented as personal outcome claims.</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-[2rem] border border-black/8 bg-white p-8 text-center shadow-sm sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0071e3]">Reflection</p>
              <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-4xl">
                Evaluation is not the final QA gate. It is how an AI product learns what to build next.
              </h2>
              <Link
                href="/#internship"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0077ed] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                View other experience <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <AnimatePresence>
        {detail && <DetailModal detail={detail} onClose={() => setDetail(null)} />}
      </AnimatePresence>
    </main>
  );
}
