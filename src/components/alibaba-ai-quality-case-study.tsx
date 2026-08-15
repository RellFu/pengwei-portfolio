"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Cloud,
  Code2,
  Cog,
  Database,
  Eye,
  FileSearch,
  Folder,
  GitBranch,
  Layers3,
  LayoutTemplate,
  LockKeyhole,
  MessageSquareText,
  Network,
  Radar,
  Route,
  ScanSearch,
  Sparkles,
  Split,
  User,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatedSection, FadeInCard } from "@/components/animated-section";
import { AnalyticsDashboardSimulator } from "@/components/analytics-dashboard-simulator";
import { PhaiProductSimulator } from "@/components/phai-product-simulator";
import type { CaseStudyProject } from "@/data/projects";

type Props = { project: CaseStudyProject };
type DetailType = "knowledge" | null;
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
  ["Formalize", "Expert judgment into a Skill", Braces],
  ["Validate", "Real cases · rubric calibration", CheckCircle2],
  ["Operationalize", "Recurring quality infrastructure", CalendarClock],
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
          Structuring 4,700+ knowledge items for contextual retrieval
        </h2>

        <KnowledgeDetail />
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
  const capabilityLayer = [
    "Unified model abstraction",
    "Tool system",
    "Skill system",
    "Task scheduling",
    "Task management",
    "Screen automation",
    "Agent definitions",
    "Config & hot reload",
  ] as const;

  const infraLayer = [
    "Data storage",
    "Logging & tracing",
    "Unified error handling",
    "Event broadcasting",
    "Plugin framework",
    "Data migration",
    "Response validation",
    "Request signing",
    "Role identity core",
  ] as const;

  const externalLayer = [
    { title: "Local storage", text: "SQLite / JSON / JSONL / local files", icon: "folder" as const },
    { title: "Managed data", text: "PostgreSQL + Redis", icon: "database-cluster" as const },
    { title: "Skill market", text: "Repo pull + object storage", icon: "wrench" as const },
    { title: "Model providers", text: "Anthropic / OpenAI / regional models", icon: "models" as const },
    { title: "External channels", text: "Chat platform bridges", icon: "channels" as const },
    { title: "System automation", text: "OS / MCP / browser / Git", icon: "cog" as const },
  ];

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[108px_1fr_108px] items-stretch gap-2">
          <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#0071e3] p-3 text-center">
            <span className="text-[9px] font-medium text-white/70">01</span>
            <p className="text-[11px] font-medium leading-[1.3] text-white">Top layer</p>
            <p className="text-[9px] text-white/70">User &amp; delivery</p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-xl border border-black/8 bg-[#fafafa] p-2.5 px-3">
            <div className="rounded-lg border border-black/6 bg-white p-2 px-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#111318] font-serif text-[10px] font-semibold italic text-white">α</span>
                <p className="text-[11px] font-medium text-[#1d1d1f]">Desktop app</p>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {["Electron", "Vue", "tRPC", "Product surfaces"].map((tag) => (
                  <span key={tag} className="rounded border border-black/8 px-1 py-0.5 text-[7.5px] font-medium text-[#6e6e73]">{tag}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-black/6 bg-white p-2 px-2.5">
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 shrink-0 text-[#0071e3]" strokeWidth={2} />
                <p className="text-[11px] font-medium text-[#1d1d1f]">Cloud service</p>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {["Fastify 5", "Prisma", "PostgreSQL", "Redis"].map((tag) => (
                  <span key={tag} className="rounded border border-black/8 px-1 py-0.5 text-[7.5px] font-medium text-[#6e6e73]">{tag}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-black/6 bg-white p-2 px-2.5">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 shrink-0 text-[#0071e3]" strokeWidth={2} />
                <p className="text-[11px] font-medium text-[#1d1d1f]">Dev role CLI</p>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {["TypeScript CLI", "Role management", "Hook injection", "Skill sync"].map((tag) => (
                  <span key={tag} className="rounded border border-black/8 px-1 py-0.5 text-[7.5px] font-medium text-[#6e6e73]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-black/8 bg-[#fafafa] p-3 text-center">
            <User className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
            <p className="mt-0.5 text-[10px] font-medium text-[#1d1d1f]">User</p>
          </div>
        </div>

        <div className="grid grid-cols-[108px_1fr_auto] items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-1.5 self-stretch rounded-xl bg-[#0071e3] p-3 text-center">
            <span className="text-[9px] font-medium text-white/70">02</span>
            <p className="text-[11px] font-medium leading-[1.3] text-white">Ingress layer</p>
            <p className="text-[9px] text-white/70">Channel / CLI</p>
          </div>
          <div className="grid grid-cols-2 gap-2 self-stretch rounded-xl border border-black/8 bg-[#fafafa] p-2.5 px-3">
            <div className="rounded-lg border border-black/6 bg-white p-2 px-2.5">
              <p className="text-[11px] font-medium text-[#1d1d1f]">Channel adapters</p>
              <p className="mt-0.5 text-[9px] text-[#86868b]">IPC, SSE, cloud Stream bridge, chat long-poll</p>
            </div>
            <div className="rounded-lg border border-black/6 bg-white p-2 px-2.5">
              <p className="text-[11px] font-medium text-[#1d1d1f]">CLI entry</p>
              <p className="mt-0.5 text-[9px] text-[#86868b]">Sub-commands, prompt injection</p>
            </div>
          </div>
          <p className="whitespace-nowrap text-[9px] font-medium text-[#0071e3]">Unified ingress and routing</p>
        </div>

        <div className="grid grid-cols-[108px_1fr] gap-2">
          <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#534AB7] p-3 text-center">
            <span className="text-[9px] font-medium text-white/70">03</span>
            <p className="text-[11px] font-medium leading-[1.3] text-white">Agent core</p>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-[#534AB7]/15 bg-[#534AB7]/[0.06] p-2.5 px-3">
            <div className="rounded-lg border border-[#534AB7]/12 bg-white p-2.5 px-3">
              <div className="flex items-center gap-1.5">
                <Bot className="h-3.5 w-3.5 shrink-0 text-[#534AB7]" strokeWidth={2} />
                <p className="text-[11px] font-medium text-[#3c3489]">Agent runtime</p>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1">
                {["Session", "ContextEngine", "LLM routing", "Tool orchestration", "Hooks", "Token budget"].map((tag) => (
                  <span key={tag} className="rounded border border-[#534AB7]/15 bg-[#534AB7]/[0.04] px-1 py-1 text-center text-[7.5px] font-medium leading-[1.3] text-[#3c3489]">{tag}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-[#534AB7]/12 bg-white p-2.5 px-3">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 shrink-0 text-[#534AB7]" strokeWidth={2} />
                <p className="text-[11px] font-medium text-[#3c3489]">Actor dispatcher</p>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1">
                {["Dispatcher", "Inbox", "Lifecycle", "Parent / child", "Abort cascade"].map((tag) => (
                  <span key={tag} className="rounded border border-[#534AB7]/15 bg-[#534AB7]/[0.04] px-1 py-1 text-center text-[7.5px] font-medium leading-[1.3] text-[#3c3489]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[108px_1fr] gap-2">
          <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#0071e3] p-3 text-center">
            <span className="text-[9px] font-medium text-white/70">04</span>
            <p className="text-[11px] font-medium leading-[1.3] text-white">Capability</p>
          </div>
          <div className="grid grid-cols-4 gap-1.5 rounded-xl border border-black/8 bg-[#fafafa] p-2.5 px-3">
            {capabilityLayer.map((title) => (
              <div key={title} className="rounded-lg border border-black/6 bg-white px-1.5 py-1.5 text-center">
                <p className="text-[9.5px] font-medium text-[#1d1d1f]">{title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[108px_1fr] gap-2">
          <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#0071e3] p-3 text-center">
            <span className="text-[9px] font-medium text-white/70">05</span>
            <p className="text-[11px] font-medium leading-[1.3] text-white">Infrastructure</p>
          </div>
          <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-black/8 bg-[#fafafa] p-2.5 px-3">
            {infraLayer.map((title) => (
              <div key={title} className="rounded-lg border border-black/6 bg-white px-1.5 py-1.5 text-center">
                <p className="text-[9.5px] font-medium text-[#1d1d1f]">{title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[108px_1fr] gap-2">
          <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#0071e3] p-3 text-center">
            <span className="text-[9px] font-medium text-white/70">06</span>
            <p className="text-[11px] font-medium leading-[1.3] text-white">External systems</p>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-black/8 bg-[#fafafa] p-2.5 px-3 sm:grid-cols-3">
            {externalLayer.map(({ title, text, icon }) => (
              <div key={title} className="rounded-lg border border-black/6 bg-white p-2 px-2.5">
                <div className="flex items-center gap-1.5">
                  {icon === "folder" && <Folder className="h-4 w-4 shrink-0 text-[#0071e3]" strokeWidth={2} />}
                  {icon === "database-cluster" && (
                    <span className="flex shrink-0 items-center gap-1">
                      <Image src="/logos/postgresql.svg" alt="" width={16} height={16} className="h-4 w-4" />
                      <Image src="/logos/redis.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" />
                    </span>
                  )}
                  {icon === "wrench" && <Wrench className="h-4 w-4 shrink-0 text-[#0071e3]" strokeWidth={2} />}
                  {icon === "models" && (
                    <span className="flex shrink-0 items-center gap-1">
                      <Image src="/logos/claude.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" />
                      <Image src="/logos/openai.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" />
                      <Image src="/logos/deepseek.svg" alt="" width={16} height={16} className="h-3.5 w-4" />
                    </span>
                  )}
                  {icon === "channels" && (
                    <span className="flex shrink-0 items-center gap-0.5">
                      <Image src="/logos/slack.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" />
                      <Image src="/logos/telegram.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" />
                    </span>
                  )}
                  {icon === "cog" && <Cog className="h-4 w-4 shrink-0 text-[#0071e3]" strokeWidth={2} />}
                  <p className="text-[10.5px] font-medium text-[#1d1d1f]">{title}</p>
                </div>
                <p className="mt-1 text-[9px] leading-[1.4] text-[#86868b]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3.5 text-[9.5px] leading-[1.5] text-[#b0b0b5]">Six layers reconstructed from source. Anonymized for public use; real product name and package names are kept in a private evidence layer.</p>
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
              I designed the quality layer that made a 55-Skill Agent shippable.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#6e6e73] md:text-lg">
              I read the runtime from source, designed what to measure, built three Agents to keep that measurement honest, and proved the impact with data.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["AI Product", "Skill Engineering", "Agent Evaluation", "Product Analytics"].map((item) => (
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
              label="Entry Point"
              title="I had to learn this system before I could evaluate it."
              description="When I joined, Alpha was already a working desktop AI Agent for screenwriters and production teams, built on Skills, tools, and a knowledge base. Nobody handed me a spec. I had to trace how a request actually moved through the system before I could touch anything."
            />

            <PhaiProductSimulator />
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="02"
              label="Reading the Source"
              title="I went into the repo to see how the Agent actually reasons."
              description="I traced the runtime myself. An actor model with a dispatcher and inbox drives multi-agent coordination. A Skill router matches each request to the right capability. Context injection pulls in project files and prior turns before the model runs. This was not documentation I read. It was behavior I reconstructed from the codebase, because the instrumentation work ahead of me depended on knowing exactly where in that flow things could go wrong."
            />
            <div className="mt-8 flex items-baseline justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Runtime map I reconstructed · six layers</p>
              <span className="text-[10px] text-[#b0b0b5]">Anonymized for public use</span>
            </div>
            <ArchitectureDetail />
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="03"
              label="Designing the Evaluation Framework"
              title="I designed the evaluation framework, then built what it needed to run."
              description="A single quality score could not tell anyone where an Agent actually failed, so I designed a five-layer evaluation architecture: Task (did the end-to-end delivery satisfy the user), Query (was this one turn a good response), Agent (were orchestration and memory decisions correct), Skill (was the right capability triggered with the right parameters), and Sub-agent (did delegated work meet its own bar). Each layer traces to the next, so a failure at the top can be pushed down to the exact mechanism that caused it. I set four constraints going in: metrics inside a layer cannot overlap, every metric is attributable to AI, user, or system, every metric has a formula that real trace data can compute, and every metric holds up across versions and time."
            />
            <div className="mt-8 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Five-layer attribution stack</p>
                <GitBranch className="h-5 w-5 text-[#0071e3]" />
              </div>
              <div className="mt-6 grid gap-2 sm:grid-cols-5">
                {[
                  ["Task", "End-to-end delivery"],
                  ["Query", "Single-turn response"],
                  ["Agent", "Orchestration + memory"],
                  ["Skill", "Trigger + parameters"],
                  ["Sub-agent", "Delegated execution"],
                ].map(([layer, note], index) => (
                  <div key={layer} className="flex items-center gap-2 sm:contents">
                    <div className="flex-1 rounded-xl bg-[#f5f5f7] p-4 sm:flex-none">
                      <p className="text-sm font-semibold text-[#1d1d1f]">{layer}</p>
                      <p className="mt-1 text-[11px] leading-4 text-[#86868b]">{note}</p>
                    </div>
                    {index < 4 && <ChevronRight className="h-4 w-4 shrink-0 text-[#b0b0b5] sm:hidden" />}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 text-[#86868b]">A failure found at the Task layer gets pushed down through Query, Agent, and Skill until it reaches the mechanism responsible. That is the difference between a score and a diagnosis.</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {challengeCards.map(([title, text, Icon], index) => (
                <FadeInCard key={title} delay={index * 0.04} className="h-full rounded-[1.6rem] border border-black/8 bg-white p-6 shadow-[0_16px_44px_rgba(0,0,0,0.05)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#0071e3]"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-5 text-lg font-semibold text-[#1d1d1f]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6e6e73]">{text}</p>
                </FadeInCard>
              ))}
            </div>

            <div className="mt-5 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.07)] sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">The data layer underneath the framework</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">I designed the feedback instrumentation the framework needed to run on real usage.</h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6e6e73]">Each event ties back to a session, a run, and an Agent through a shared identifier scheme, so a like, a copy, a dislike, or a stop can be traced to the exact Skill and turn that produced it.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[["18", "product surfaces instrumented"], ["12", "positive touchpoints"], ["2", "negative signals"], ["6 + 4", "event types + trace contexts"]].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-black/8 bg-white px-4 py-3"><p className="text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">{value}</p><p className="mt-1 text-[11px] text-[#86868b]">{label}</p></div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.07)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Agent I built · 01</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">A scheme only holds if it stays correct, so I built a bot to patrol it.</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#30a46c] opacity-50 motion-reduce:animate-none" /><span className="relative inline-flex h-3 w-3 rounded-full bg-[#30a46c]" /></span>
                  <span className="rounded-full bg-[#eaf8ef] px-3 py-1.5 text-xs font-semibold text-[#207a4b]">Deployed · runs daily</span>
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6e6e73]">
                It cross-checks the event types, the documentation, and the analytics code for consistency, then reports coverage gaps to the work group before they become blind spots in the data.
              </p>
              <div className="mt-7 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
                {[
                  ["01", "Event spec", "18 surfaces · privacy boundary", Radar],
                  ["02", "Code callsite", "Verify implementation", Code2],
                  ["03", "Data pipeline", "Trace event to warehouse", Database],
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
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="04"
              label="Where the Cracks Showed Up"
              title="Instrumenting 55 Skills is where I found the real problem."
              description="Running checks across the full catalog, I found trigger words colliding between Skills, fast and expert variants that were indistinguishable to the router, and check versus generate entry points stepping on each other. I did not read this in a bug report. I found it by testing the catalog myself."
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Full ecosystem audit</p>
                    <p className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-[#1d1d1f]">55</p>
                    <p className="mt-2 text-sm text-[#6e6e73]">Skills × 10 engineering dimensions</p>
                  </div>
                  <FileSearch className="h-6 w-6 text-[#0071e3]" />
                </div>
                <div className="mt-7 grid gap-2">
                  {[
                    "Check and generation trigger conflicts",
                    "Fast and expert variants indistinguishable",
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
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Two findings that mattered</p>
                    <h3 className="mt-2 text-xl font-semibold">The router was guessing</h3>
                  </div>
                  <Split className="h-5 w-5 text-[#65b5ff]" />
                </div>
                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-[#ff6b6b]/20 bg-[#ff6b6b]/8 p-5">
                    <div className="flex items-center gap-2 text-[#ff9b9b]"><X className="h-4 w-4" /><span className="text-[10px] font-semibold uppercase tracking-[0.13em]">Identical descriptions</span></div>
                    <p className="mt-4 text-sm leading-6 text-white/75">Two expert whitepaper Skills shipped with the same description text. The Agent had no basis to prefer one, so selection was effectively random.</p>
                  </div>
                  <div className="rounded-2xl border border-[#ff9500]/25 bg-[#ff9500]/10 p-5">
                    <div className="flex items-center gap-2 text-[#ffc078]"><Split className="h-4 w-4" /><span className="text-[10px] font-semibold uppercase tracking-[0.13em]">Trigger collision</span></div>
                    <p className="mt-4 text-sm leading-6 text-white/75">On the story structure Skill, the words that should route to a diagnostic check overlapped the words that should route to generation. Users got the wrong mode.</p>
                  </div>
                  <div className="rounded-2xl border border-[#65b5ff]/20 bg-[#65b5ff]/10 p-4">
                    <p className="text-xs font-semibold text-[#a9d5ff]">Why it only appears at scale</p>
                    <p className="mt-2 text-xs leading-5 text-white/50">One Skill in isolation always looks correct. These failures are properties of the catalog, not of any single Skill.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="05"
              label="What I Built"
              title="Finding the cracks meant I needed a repeatable way to catch them."
              description="So I built skill-evaluator. It runs a five dimension diagnostic, produces a graded gap analysis, and returns a rewritten description. It writes a report and stops there. It never edits a Skill on its own, because I kept the human in the loop on purpose."
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-[2rem] bg-[#111318] p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Agent I built · 02</p>
                    <h3 className="mt-2 text-xl font-semibold">skill-evaluator</h3>
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
                <p className="mt-4 text-[11px] leading-5 text-white/35">Static review is used to catch catalog conflicts. It is not used to claim runtime quality.</p>
              </div>

              <div>
                <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">The Skill I authored</p>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">I turned narrative theory into something the Agent could execute</h3>
                    </div>
                    <Braces className="h-5 w-5 shrink-0 text-[#0071e3]" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#6e6e73]">
                    For the Three-Act and Bible Skills I owned product design, Skill authoring, and test iteration. The hard part was not writing the theory down. It was defining a check the model could not fake.
                  </p>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#ff6b6b]/25 bg-[#fff5f5] p-4">
                      <div className="flex items-center gap-2 text-[#b3251f]"><X className="h-3.5 w-3.5" /><span className="text-[9px] font-semibold uppercase tracking-[0.13em]">Event only</span></div>
                      <p className="mt-3 text-sm font-semibold text-[#1d1d1f]">The proposal is rejected.</p>
                      <p className="mt-2 text-xs leading-5 text-[#86868b]">Dramatic, but the previous plan can still resume.</p>
                    </div>
                    <div className="rounded-2xl border border-[#30d158]/30 bg-[#f2fbf5] p-4">
                      <div className="flex items-center gap-2 text-[#207a4b]"><Check className="h-3.5 w-3.5" /><span className="text-[9px] font-semibold uppercase tracking-[0.13em]">State change</span></div>
                      <p className="mt-3 text-sm font-semibold text-[#1d1d1f]">She decides to leave the company.</p>
                      <p className="mt-2 text-xs leading-5 text-[#86868b]">Goal, relationships, and available choices all shift.</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Episode + season", "Lazy references", "Anti-hallucination", "Graceful exit"].map((item) => (
                      <span key={item} className="rounded-full bg-[#f5f5f7] px-3 py-2 text-[11px] font-medium text-[#6e6e73]">{item}</span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDetail("knowledge")}
                  className="group mt-4 flex w-full items-center gap-4 rounded-[1.4rem] border border-black/8 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#0071e3]"><Database className="h-5 w-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#1d1d1f]">Open the knowledge Schema I proposed</span>
                    <span className="mt-1 block text-xs leading-5 text-[#86868b]">4,700+ unstructured items turned into retrievable entities with source context.</span>
                  </span>
                  <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-[#b0b0b5] transition group-hover:translate-x-1 group-hover:text-[#0071e3] motion-reduce:transform-none" />
                </button>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="06"
              label="Owning the Ground Truth"
              title="I owned the ground truth, then found out it was lying to me."
              description="The framework needed automated judgment on four things: which task a query belonged to, what the user's intent was, whether a task was complete, and whether feedback was positive or negative. Automating those judgments required a human-labeled baseline to check them against, so I owned the labeling effort end to end: what to label, how many annotators, how to resolve disagreement. I also weighed in on which model configurations to test against that baseline, three models across three context-window lengths, since a longer window means better recall at a real latency and cost tradeoff."
            />

            <div className="mt-8 rounded-[2rem] bg-[#111318] p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">The number that should have been a red flag</p>
                  <h3 className="mt-2 text-xl font-semibold">Eight model configurations. All of them at 100 percent.</h3>
                </div>
                <Split className="h-5 w-5 text-[#65b5ff]" />
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/65">
                Three models across three context-window lengths were compared against the human-labeled baseline. Every single configuration came back perfect. That is the moment I went back into the labeling data instead of trusting the number.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                {[
                  ["343", "labeled turns", "Across 19 sessions"],
                  ["19", "cross-checked", "5.5% of the dataset"],
                  ["1", "category covered", "All 19 were the same label"],
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
                The 100 percent was not measuring whether a model could tell a positive signal from a negative one. It could only ever say the model agreed on the easy case, because every cross-checked record happened to fall into the same feedback category. I flagged it and re-scoped the labeling work to a task-level design instead: roughly 70 sessions, six annotators, built to test task recognition and completion judgment rather than a single feedback label.
              </div>
              <p className="mt-4 text-[11px] leading-5 text-white/35">Ground truth is supposed to be the thing you trust without checking. I checked it anyway, and that is the habit that kept a false positive from becoming a shipped conclusion.</p>
            </div>

            <div className="mt-5 rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Attribution stack</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#1d1d1f]">Where the framework sends a failure</h3>
                </div>
                <GitBranch className="h-5 w-5 text-[#0071e3]" />
              </div>
              <div className="mt-6 grid gap-2 sm:grid-cols-5">
                {["Task", "Query", "Agent", "Skill", "Sub-agent"].map((layer, index) => (
                  <div key={layer} className="flex items-center gap-2 sm:contents">
                    <div className="flex-1 rounded-xl bg-[#f5f5f7] px-4 py-3 text-center text-sm font-semibold text-[#1d1d1f] sm:flex-none">{layer}</div>
                    {index < 4 && <ChevronRight className="h-4 w-4 shrink-0 text-[#b0b0b5] sm:hidden" />}
                  </div>
                ))}
              </div>
            </div>

            <SectionHeading
              number="07"
              label="Closing the Loop with Data"
              title="I did not just fix Skills. I proved it with data."
              description="I built and ran the analytics layer behind the product: a library of 29 user behavior metrics, funnel analysis that showed exactly where users dropped off, retention cohorts, and live feedback signals. Every finding became a product requirement, and every requirement shipped as a fix."
            />

            <AnalyticsDashboardSimulator />

            <div className="mt-5 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.07)] sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">From signal to shipped fix</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">I traced negative feedback to root cause.</h3>
                </div>
                <ScanSearch className="h-5 w-5 shrink-0 text-[#0071e3]" />
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6e6e73]">
                On one track, quality collapsed as a session went deep, character identities drifted between turns, and stale retrieval kept surfacing outdated versions. Each pattern became a requirement with an owner, not a dashboard observation.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  ["Depth collapse", "Output quality degraded as a single session ran long.", "Explicit constraint re-injection"],
                  ["Identity drift", "Character behavior became inconsistent across turns.", "Core profile pinned before generation"],
                  ["Stale retrieval", "Retrieval returned superseded versions of the same document.", "Version-aware recall"],
                ].map(([title, symptom, fix]) => (
                  <div key={title} className="rounded-[1.4rem] bg-[#f5f5f7] p-5">
                    <p className="text-sm font-semibold text-[#1d1d1f]">{title}</p>
                    <p className="mt-2 text-xs leading-5 text-[#86868b]">{symptom}</p>
                    <p className="mt-4 flex items-start gap-1.5 text-[11px] font-semibold leading-5 text-[#0071e3]"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />{fix}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {failureModes.map(([title, text]) => (
                  <div key={title} className="rounded-xl border border-black/8 px-4 py-3">
                    <p className="text-xs font-semibold text-[#1d1d1f]">{title}</p>
                    <p className="mt-1 text-[11px] leading-5 text-[#86868b]">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.07)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Agent I built · 03</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">Dashboards make data available. A bot makes it arrive.</h3>
                </div>
                <span className="rounded-full bg-[#eaf8ef] px-3 py-1.5 text-xs font-semibold text-[#207a4b]">Scheduled · in group use</span>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6e6e73]">
                I built a scheduled Agent that pulls usage statistics, renders them into a ranking card, and posts it straight into the team group chat. Usage signals reach the people who act on them without anyone pulling a report by hand.
              </p>
              <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
                {[
                  ["01", "Query stats", "Scheduled trigger", CalendarClock],
                  ["02", "Render card", "Ranking layout", LayoutTemplate],
                  ["03", "Capture image", "Browser automation", Camera],
                  ["04", "Post to group", "Delivered in chat", MessageSquareText],
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
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="08"
              label="What This Proves"
              title="I did not start with a spec. I read the system, then improved it."
              description="I traced the runtime myself, designed what to measure, built the tools that keep the measurement honest, and proved the impact with data that three Agents I built helped collect. That is the work of someone who learns a system fast enough to change it, not just operate it."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Learned the system", "Reconstructed a 23-package runtime from source before touching it.", Code2],
                ["Designed the signals", "Instrumented 18 surfaces with traceable session, run, and Agent context.", Radar],
                ["Built the tooling", "Three Agents: an instrumentation patrol, skill-evaluator, and a reporting bot.", Bot],
              ].map(([title, text, Icon], index) => (
                <FadeInCard key={title as string} delay={index * 0.05} className="h-full rounded-[1.6rem] border border-black/8 bg-white p-6 shadow-[0_16px_44px_rgba(0,0,0,0.05)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#0071e3]"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-5 text-base font-semibold text-[#1d1d1f]">{title as string}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6e6e73]">{text as string}</p>
                </FadeInCard>
              ))}
            </div>
            <div className="mt-5 rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm sm:p-8">
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
