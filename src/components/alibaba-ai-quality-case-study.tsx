"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  AtSign,
  BarChart3,
  BookOpenCheck,
  Bot,
  Braces,
  CalendarClock,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Cloud,
  Code2,
  Cog,
  Database,
  Eye,
  FileText,
  Film,
  Folder,
  GitBranch,
  Globe,
  Info,
  Layers3,
  LayoutTemplate,
  LockKeyhole,
  MessageSquareText,
  Network,
  Radar,
  Route,
  ScanSearch,
  Search,
  ShieldCheck,
  Sparkles,
  Split,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatedSection, FadeInCard } from "@/components/animated-section";
import { GlassSurface, SectionLabel, WarmSurface } from "@/components/design-system";
import { AnalyticsDashboardSimulator } from "@/components/analytics-dashboard-simulator";
import { PhaiProductSimulator } from "@/components/phai-product-simulator";
import type { CaseStudyProject } from "@/data/projects";

type Props = { project: CaseStudyProject };
type DetailType = "script" | "report" | "characterBio" | null;
type ProductScenarioId = "diagnose" | "bible" | "brief";
type InspectorTab = "artifact" | "trace" | "knowledge" | "files";
type CapabilityId = "context" | "skills" | "knowledge" | "action" | "orchestration";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

  const eyebrow = detail === "script" ? "Input, attached to the request" : detail === "characterBio" ? "Knowledge base record, ip channel" : "Skill output, generated";
  const title = detail === "script" ? "bad_parasite_v2.txt" : detail === "characterBio" ? "character-biography.md" : "three-act-diagnostic-report.md";

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
          {eyebrow}
        </p>
        <h2 id="alibaba-detail-title" className="mt-4 pr-12 font-mono text-xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-2xl">
          {title}
        </h2>

        {detail === "script" && <ScriptDetail />}
        {detail === "report" && <ReportDetail />}
        {detail === "characterBio" && <CharacterBioDetail />}
      </motion.div>
    </motion.div>
  );
}

function ScriptDetail() {
  const pages = [
    { page: "p.1", heading: "INT. KIM FAMILY HALF-BASEMENT APARTMENT, DAY", lines: ["KI-WOO scrolls his phone. A friend texts: the Parks need an English tutor for their daughter. \u201cSure, why not.\u201d"] },
    { page: "p.5", heading: "INT. PARK HOME, STUDY, DAY", lines: ["MRS. PARK reviews his transcript. \u201cYour grades are solid. Start Monday?\u201d He accepts. Easy."] },
    { page: "p.12", heading: "INT. PARK HOME, STUDIO, DAY", lines: ["KI-JUNG lays out an art portfolio for DA-SONG. MRS. PARK is impressed. \u201cYou\u2019re hired.\u201d"] },
    { page: "p.20", heading: "INT. PARK HOME, KITCHEN, DAY", lines: ["Through a staffing agency, CHUNG-SOOK is introduced as the new live-in housekeeper."] },
    { page: "p.28", heading: "EXT. PARK HOME, DRIVEWAY, DAY", lines: ["KI-TAEK gets the driver job via a neighbor\u2019s referral. MR. PARK: \u201cDon\u2019t scratch it.\u201d"] },
    { page: "p.44", heading: "INT. PARK HOME, KITCHEN, NIGHT", lines: ["MOON-GWANG mentions her husband has lived in the basement for years, \u201cjust a quirky thing about this house.\u201d CHUNG-SOOK: \u201cHuh. Okay.\u201d The secret sits there, harmless."] },
    { page: "p.55", heading: "INT. PARK HOME, DINING ROOM, NIGHT", lines: ["The Kims, now all on staff, share a quiet meal. Warm. MR. PARK joins for a toast: \u201cGood team we\u2019ve got.\u201d"] },
    { page: "p.75", heading: "INT. PARK HOME, LIVING ROOM, NIGHT", lines: ["KI-WOO worries he might be found out, hides his fake diploma deeper in the drawer, then shrugs it off. Nothing happens."] },
    { page: "p.88", heading: "INT. PARK HOME, LIVING ROOM, NIGHT", lines: ["MOON-GWANG finds the diploma while tidying. She reads it, sighs. \u201cI think the tutor isn\u2019t who he said.\u201d"] },
    { page: "p.95", heading: "INT. PARK HOME, STUDY, NIGHT", lines: ["MR. PARK sits the Kims down. \u201cWe suspected something. It\u2019s alright. Everyone deserves a chance.\u201d He writes a reference letter and counts out severance."] },
    { page: "p.110", heading: "EXT. KIM HALF-BASEMENT APARTMENT, DAY", lines: ["The Kims return, poorer but wiser, smiling as they unlock their door. FADE OUT."] },
  ] as const;

  return (
    <div className="mt-8">
      <p className="max-w-3xl text-base leading-8 text-[#6e6e73]">
        A screenplay excerpt I wrote specifically to break, a competent surface with a structural collapse underneath, so I could verify the Skill catches what a friendly read-through would miss. Eleven key beats, 110 pages.
      </p>
      <div className="mt-7 space-y-4 rounded-[1.4rem] border border-black/8 bg-[#fbfbfc] p-5 font-mono text-[12px] leading-6 text-[#3a3a3c] sm:p-7">
        {pages.map((beat) => (
          <div key={beat.page}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0071e3]">{beat.page} · {beat.heading}</p>
            {beat.lines.map((line) => (
              <p key={line} className="mt-1.5 text-[#515154]">{line}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportDetail() {
  const scorecard = [
    ["D1", "Act 1 proportion and setup", "FAIL", "Major"],
    ["D2", "Inciting incident placement", "PASS", "-"],
    ["D3", "Plot Point 1 irreversibility", "FAIL", "Critical"],
    ["D4", "Midpoint reversal", "FAIL", "Critical"],
    ["D5", "Act 2 escalation and pinch", "FAIL", "Major"],
    ["D6", "Plot Point 2 lowest point", "FAIL", "Critical"],
    ["D7", "Act 3 resolution and early-wrap", "FAIL", "Critical"],
    ["D8", "Rhythmic deviation intent", "FAIL", "Major"],
  ] as const;

  const checklist = [
    ["Midpoint vs. escalation", "PASSED", "Correctly rejected the p.44 reveal as a midpoint. It adds information, it does not reverse anything."],
    ["Open ending", "N/A", "This is an early wrap, not an open ending."],
    ["Creative choice vs. execution flaw", "FLAGGED", "The happy ending is an execution flaw, premise abandonment, not a protected creative choice."],
  ] as const;

  const strategy = [
    ["D3", "Install an irreversible lock. The family engineers the firing of the real housekeeper so returning home means total exposure. Plot Point 1 lands near p.31."],
    ["D4", "Demote the basement reveal to an Act 2 pinch. Install a later, higher-stakes event as the true midpoint that flips comedy to thriller."],
    ["D5", "Let the fired housekeeper return and expose the secret. Escalate every beat toward irreversible cost."],
    ["D6", "Move the darkest hour to roughly 75 percent through the script, with an irreversible loss the family cannot undo."],
    ["D7", "Cut the reconciliation. Close the thematic loop the story opened instead of resolving it with a heart-to-heart."],
  ] as const;

  return (
    <div className="mt-8">
      <div className="rounded-2xl bg-[#fdeae9] p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d70015]">Verdict</p>
        <p className="mt-2 text-base font-semibold leading-7 text-[#1d1d1f]">NOT PASSED. Five critical structural failures.</p>
        <p className="mt-2 text-sm leading-6 text-[#6e6e73]">The draft is a competent family-gets-jobs dramedy, but it collapses its class thesis into a feel-good reconciliation. The blocker is structure, not prose. The Skill does not rewrite the script. It returns this report and a revision strategy for the author to execute.</p>
      </div>

      <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Scorecard, 8 dimensions</p>
      <div className="mt-3 overflow-hidden rounded-2xl border border-black/8">
        {scorecard.map(([id, name, verdict, severity], index) => (
          <div key={id} className={`flex items-center gap-3 px-4 py-3 text-sm ${index % 2 === 0 ? "bg-white" : "bg-[#fbfbfc]"}`}>
            <span className="w-7 shrink-0 text-[10px] font-semibold text-[#0071e3]">{id}</span>
            <span className="flex-1 text-[#1d1d1f]">{name}</span>
            <span className={`shrink-0 text-[10px] font-semibold ${verdict === "PASS" ? "text-[#248a3d]" : "text-[#d70015]"}`}>{verdict}</span>
            {severity !== "-" && <span className="w-16 shrink-0 text-right text-[9px] text-[#86868b]">{severity}</span>}
          </div>
        ))}
      </div>

      <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Misjudgment checklist</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {checklist.map(([name, status, note]) => (
          <div key={name} className="rounded-2xl bg-[#f5f5f7] p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-[#1d1d1f]">{name}</p>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[8px] font-semibold ${status === "PASSED" ? "bg-[#dff2e5] text-[#248a3d]" : status === "FLAGGED" ? "bg-[#fff3df] text-[#9a6400]" : "bg-[#eeeeef] text-[#86868b]"}`}>{status}</span>
            </div>
            <p className="mt-2 text-[10px] leading-4 text-[#86868b]">{note}</p>
          </div>
        ))}
      </div>

      <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Revision strategy, author executes</p>
      <div className="mt-3 space-y-2">
        {strategy.map(([id, text]) => (
          <div key={id} className="flex items-start gap-3 rounded-xl bg-[#f5f5f7] p-3.5">
            <span className="mt-0.5 shrink-0 text-[10px] font-semibold text-[#0071e3]">{id}</span>
            <p className="text-xs leading-5 text-[#515154]">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CharacterBioDetail() {
  const sections = [
    ["Basic profile", "A recent college graduate who dresses plainly at the start, her signature garment a loose blue sweater. After her makeover she carries Chanel and other elite labels with polished confidence. Intelligent, quick to learn, hardworking, and strongly principled, but initially carries an intellectual's pride, prejudging a field she does not understand."],
    ["Education, work, and family", "A Northwestern University graduate and former editor in chief of the student newspaper, admitted to Stanford Law School. Wants to become a serious journalist but currently works as second assistant to a formidable fashion editor. Her family is close, her father deeply concerned about the hardship of the job."],
    ["Psychological profile", "Begins protected by a sense of intellectual superiority, treating the assistant job as a stepping-stone toward real journalism. Her employer's criticism and her coworkers' scorn expose a deeper need, to prove she is capable and worthy of recognition even in an arena she once despised."],
    ["Core desire and deeper need", "Core desire: survive the job for one year and earn the r\u00e9sum\u00e9 line that could open the door to a top news organization. Deeper need: prove her value in a field she once looked down on, and learn what professionalism actually requires."],
  ] as const;

  const arc = [
    ["Scenes 1\u20132", "An outsider who does not belong", "Parallel editing contrasts her plain clothes with the fashion world's refined luxury, establishing her as an outsider."],
    ["Scene 16", "The cerulean humiliation", "During a wardrobe review she laughs at two belts that look identical. Her editor crushes her with a precise explanation of the cerulean fashion supply chain. She recognizes, for the first time, the professional depth of the field she dismissed."],
    ["Scenes 20\u201324", "Collapse and the wake-up call", "An impossible assignment during a hurricane ends in failure. After being battered at work, a mentor's blunt rebuke wakes her up: her failure comes from not trying, not from the environment."],
    ["Scene 25", "Transformation", "A complete fashion makeover under a mentor's guidance. Her efficiency and initiative rise sharply, she starts anticipating her employer's needs instead of merely reacting to them."],
  ] as const;

  return (
    <div className="mt-8">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#dbeafe] to-[#93c5fd] text-sm font-bold text-[#0756a4] shadow-sm"><CircleUserRound className="absolute h-11 w-11 opacity-25" />AS</span>
        <div>
          <h3 className="text-lg font-semibold text-[#1d1d1f]">Andrea &ldquo;Andy&rdquo; Sachs</h3>
          <p className="mt-1 text-xs text-[#86868b]">Protagonist &middot; second assistant &middot; aspiring journalist</p>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-7 text-[#6e6e73]">
        An ambitious would-be journalist who dismisses fashion must become the assistant to its most formidable editor in order to establish herself in New York media. Under extreme pressure, she is forced to remake both her outward image and her inner assumptions.
      </p>

      <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Character biography</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {sections.map(([title, text]) => (
          <div key={title} className="rounded-2xl bg-[#f5f5f7] p-4">
            <p className="text-xs font-semibold text-[#1d1d1f]">{title}</p>
            <p className="mt-2 text-[11px] leading-5 text-[#86868b]">{text}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Arc, beginning to resolution</p>
      <div className="mt-3 space-y-2">
        {arc.map(([scene, phase, text]) => (
          <div key={phase} className="grid gap-2 rounded-xl border border-black/8 bg-white p-3.5 sm:grid-cols-[6.5rem_10rem_1fr]">
            <span className="text-[10px] font-semibold text-[#0071e3]">{scene}</span>
            <span className="text-xs font-semibold text-[#1d1d1f]">{phase}</span>
            <span className="text-[11px] leading-5 text-[#6e6e73]">{text}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-[#eaf4ff] p-5 text-sm leading-7 text-[#3f5f78]">
        This is the same record the Agent pulled for the demo above, addressed by field from the character dimension of the knowledgeFile, not summarized on the fly.
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
    { title: "Local storage", tags: ["SQLite", "JSON", "JSONL", "Local files"], icon: "folder" as const },
    { title: "Managed data", tags: ["PostgreSQL", "Redis"], icon: "database-cluster" as const },
    { title: "Skill market", tags: ["Repo pull", "Object storage"], icon: "wrench" as const },
    { title: "Model providers", tags: ["Anthropic", "OpenAI", "Regional models"], icon: "models" as const },
    { title: "External channels", tags: ["Chat platform bridges"], icon: "channels" as const },
    { title: "System automation", tags: ["OS", "MCP", "Browser", "Git"], icon: "cog" as const },
  ];

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[108px_1fr] items-stretch gap-2">
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
        </div>

        <div className="grid grid-cols-[108px_1fr] items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-1.5 self-stretch rounded-xl bg-[#0071e3] p-3 text-center">
            <span className="text-[9px] font-medium text-white/70">02</span>
            <p className="text-[11px] font-medium leading-[1.3] text-white">Ingress layer</p>
            <p className="text-[9px] text-white/70">Channel / CLI</p>
          </div>
          <div className="grid grid-cols-2 gap-2 self-stretch rounded-xl border border-black/8 bg-[#fafafa] p-2.5 px-3">
            <div className="rounded-lg border border-black/6 bg-white p-2 px-2.5">
              <p className="text-[11px] font-medium text-[#1d1d1f]">Channel adapters</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {["IPC", "SSE", "Cloud Stream bridge", "Chat long-poll"].map((tag) => (
                  <span key={tag} className="rounded border border-black/8 px-1 py-0.5 text-[7.5px] font-medium text-[#6e6e73]">{tag}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-black/6 bg-white p-2 px-2.5">
              <p className="text-[11px] font-medium text-[#1d1d1f]">CLI entry</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {["Sub-commands", "Prompt injection"].map((tag) => (
                  <span key={tag} className="rounded border border-black/8 px-1 py-0.5 text-[7.5px] font-medium text-[#6e6e73]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
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
                {["Dispatcher", "Inbox", "Lifecycle", "Parent Agent", "Child Agent", "Abort cascade"].map((tag) => (
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
            {externalLayer.map(({ title, tags, icon }) => (
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
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded border border-black/8 px-1 py-0.5 text-[7.5px] font-medium text-[#6e6e73]">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3.5 text-[9.5px] leading-[1.5] text-[#b0b0b5]">Six layers reconstructed from source. Anonymized for public use; real product name and package names are kept in a private evidence layer.</p>
    </div>
  );
}

const SCRIPT_PAGE = `INT. OFFICE - DAY

ANDY sits at her desk.
MIRANDA enters.

        MIRANDA
  We need that story
  by noon.

        ANDY
  Yes, Miranda.
     (beat)
  I'll have it.

EXT. STREET - DAY

Andy walks quickly
through the crowd.

        FADE OUT.`;

const PAPER_LINE_WIDTHS = [96, 88, 92, 74, 90, 84, 66, 94, 80, 88] as const;

function PaperLines({ count, seed = 0 }: { count: number; seed?: number }) {
  return (
    <div className="mt-1.5 space-y-[3px]">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-[2px] rounded-full bg-[#e3e3e8]"
          style={{ width: `${PAPER_LINE_WIDTHS[(index + seed) % PAPER_LINE_WIDTHS.length]}%` }}
        />
      ))}
    </div>
  );
}

function PileSheet({
  left,
  top,
  rotate,
  width,
  z,
  children,
}: {
  left: string;
  top: string;
  rotate: number;
  width: string;
  z: number;
  children: React.ReactNode;
}) {
  return (
    <div
      data-pile-front
      data-rotate={rotate}
      className="absolute overflow-hidden rounded-xl border border-black/[0.06] bg-white p-3 shadow-[0_8px_22px_rgba(0,0,0,0.10)]"
      style={{ left, top, width, zIndex: z, transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

function RawMaterialPile() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const backSheets = [
    { left: "-8%", top: "1%", rotate: -13, width: "54%", lines: 7 },
    { left: "50%", top: "-5%", rotate: 9, width: "52%", lines: 6 },
    { left: "60%", top: "20%", rotate: -6, width: "48%", lines: 8 },
    { left: "-12%", top: "33%", rotate: 11, width: "52%", lines: 7 },
    { left: "20%", top: "57%", rotate: -10, width: "56%", lines: 8 },
    { left: "58%", top: "60%", rotate: 6, width: "50%", lines: 7 },
    { left: "2%", top: "78%", rotate: 4, width: "60%", lines: 6 },
    { left: "44%", top: "84%", rotate: -4, width: "54%", lines: 5 },
  ] as const;

  useGSAP(
    () => {
      const back = gsap.utils.toArray<HTMLElement>("[data-pile-back]", rootRef.current);
      const front = gsap.utils.toArray<HTMLElement>("[data-pile-front]", rootRef.current);
      const targetRotation = (el: HTMLElement) => Number(el.dataset.rotate ?? 0);

      if (reduceMotion) {
        [...back, ...front].forEach((el) => {
          gsap.set(el, { autoAlpha: 1, y: 0, scale: 1, rotation: targetRotation(el) });
        });
        return;
      }

      [...back, ...front].forEach((el) => {
        gsap.set(el, { autoAlpha: 0, y: 26, scale: 0.95, rotation: 0 });
      });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          back.forEach((el, index) => {
            tl.to(el, { autoAlpha: 1, y: 0, scale: 1, rotation: targetRotation(el), duration: 0.5, ease: "power3.out" }, index * 0.045);
          });
          front.forEach((el, index) => {
            tl.to(el, { autoAlpha: 1, y: 0, scale: 1, rotation: targetRotation(el), duration: 0.55, ease: "power3.out" }, 0.24 + index * 0.09);
          });
        },
      });
    },
    { scope: rootRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      className="relative h-full min-h-[27rem] overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-[#f1f1f4] to-[#e5e5ea]"
    >
      {backSheets.map((sheet, index) => (
        <div
          key={`${sheet.left}-${sheet.top}`}
          data-pile-back
          data-rotate={sheet.rotate}
          className="absolute rounded-xl border border-black/[0.05] bg-white/85 p-3 shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
          style={{ left: sheet.left, top: sheet.top, width: sheet.width, zIndex: index, transform: `rotate(${sheet.rotate}deg)` }}
        >
          <PaperLines count={sheet.lines} seed={index * 3} />
        </div>
      ))}

      <PileSheet left="-3%" top="7%" rotate={-7} width="57%" z={20}>
        <p className="font-mono text-[10px] font-semibold text-[#1d1d1f]">script</p>
        <p className="mt-2 whitespace-pre font-mono text-[7px] leading-[1.55] text-[#6e6e73]">{SCRIPT_PAGE}</p>
      </PileSheet>

      <PileSheet left="32%" top="2%" rotate={4} width="55%" z={21}>
        <p className="text-[10px] font-semibold text-[#1d1d1f]">synopsis</p>
        <p className="mt-2 font-mono text-[7px] leading-[1.6] text-[#6e6e73]">
          Andy Sachs, a recent college graduate, lands a job as assistant to the powerful editor in chief of Runway magazine. Over time she navigates the demanding world of fashion journalism, struggles with identity and values, and ultimately chooses her own path.
        </p>
        <PaperLines count={5} seed={2} />
      </PileSheet>

      <PileSheet left="6%" top="38%" rotate={-2} width="56%" z={22}>
        <p className="text-[10px] font-semibold text-[#1d1d1f]">character notes</p>
        <div className="mt-2 space-y-1.5 font-mono text-[7px] leading-[1.5] text-[#6e6e73]">
          <div>
            <p className="font-semibold text-[#515154]">Andy Sachs</p>
            <p>Smart, earnest, hard-working. Needs growth in confidence.</p>
          </div>
          <div>
            <p className="font-semibold text-[#515154]">Miranda Priestly</p>
            <p>Commanding, perfectionist, intimidating.</p>
          </div>
          <div>
            <p className="font-semibold text-[#515154]">Nigel</p>
            <p>Witty, loyal, creative director.</p>
          </div>
          <div>
            <p className="font-semibold text-[#515154]">Nate Cooper</p>
            <p>Warm, supportive, grounded.</p>
          </div>
        </div>
      </PileSheet>

      <PileSheet left="43%" top="52%" rotate={7} width="54%" z={23}>
        <p className="text-[10px] font-semibold text-[#1d1d1f]">story materials</p>
        <p className="mt-2 font-mono text-[7px] font-semibold text-[#515154]">Key Scenes / Ideas</p>
        <div className="mt-1 space-y-[3px] font-mono text-[7px] leading-[1.5] text-[#6e6e73]">
          {["Andy's interview", "First day at Runway", "The cerulean speech", "Meeting the designers", "Paris Fashion Week", "The choice"].map((item) => (
            <p key={item}>&middot; {item}</p>
          ))}
        </div>
        <p className="mt-2 font-mono text-[7px] font-semibold text-[#515154]">Notes</p>
        <PaperLines count={4} seed={5} />
      </PileSheet>
    </div>
  );
}

function SchemaDimensionGrid() {
  const character = [
    ["Summary and tags", ["One-line summary", "Core trait tags", "Growth type"]],
    ["Basic profile", ["Name", "Gender", "Age", "Appearance", "Personality", "Regional traits", "Role and occupation", "Education", "Family background", "Skills"]],
    ["Psychology", ["Psychological portrait", "Core desire", "Core need"]],
    ["History and action", ["Backstory", "Action-line summary"]],
    ["Arc", ["Arc type", "Arc analysis", "Core lie", "Core fear"]],
  ] as const;

  const relationship = [
    ["Fields", ["Counterpart character", "Relationship definition", "Relationship description"]],
    ["Evolution beats", ["Stage label", "Scene anchor", "Beat description"]],
  ] as const;

  const world = [
    ["Part I, setting", ["Physical law and geography", "Science and technology", "Social structure and class ecology", "Political and legal system", "Economic system and livelihood", "Culture, belief, and history"]],
    ["High concept, when the genre calls for it", ["Core concept summary", "Custom fields, itemized"]],
    ["Part II, themes", ["One field per core theme"]],
  ] as const;

  const plotline = [
    ["Fields", ["Line name", "Primary or secondary", "Core dramatic question"]],
    ["Arc, each beat scene-anchored", ["Beginning", "Rising action", "Climax", "Resolution"]],
  ] as const;

  const dimensions = [
    { title: "Character", count: "22 fields", icon: CircleUserRound, groups: character, span: "lg:col-span-12" },
    { title: "World", count: "6 + 1 fields, plus themes", icon: Globe, groups: world, span: "lg:col-span-4" },
    { title: "Relationship", count: "3 fields + beats", icon: Users, groups: relationship, span: "lg:col-span-4" },
    { title: "Plotline", count: "4 fields", icon: Route, groups: plotline, span: "lg:col-span-4" },
  ] as const;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
      {dimensions.map((dimension) => (
        <div
          key={dimension.title}
          className={`rounded-[1.3rem] border border-black/[0.06] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)] ${dimension.span}`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0071e3]"><dimension.icon className="h-3 w-3" /></span>
            <p className="text-[11.5px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">{dimension.title}</p>
            <span className="ml-auto shrink-0 text-[8.5px] font-medium text-[#a1a1a6]">{dimension.count}</span>
          </div>

          <div className="mt-3 space-y-2">
            {dimension.groups.map(([group, fields]) => (
              <div key={group}>
                <p className="text-[8px] font-semibold uppercase tracking-[0.11em] text-[#86868b]">{group}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {fields.map((field) => (
                    <span key={field} className="rounded-md bg-[#f5f5f7] px-1.5 py-[3px] text-[8.5px] leading-[1.35] text-[#515154]">{field}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function KnowledgeBeforeAfter() {
  const rationale = [
    {
      title: "Wording match dilutes, field match does not",
      body: "Searching prose for \u201coppression\u201d misses a work that wrote \u201csevere demands.\u201d Across 4,700 works, any hit rate that depends on word choice gets worse as the library grows. A field query does not.",
    },
    {
      title: "Relationship stages become a defined value",
      body: "In prose, asking how many stages Andy and Miranda go through means the model segments 3,322 words itself, and it might answer three or five. Structured, the stage count, the labels, and the scene anchors are all fixed. It reads them instead of guessing.",
    },
    {
      title: "World rules become comparable across works",
      body: "With class ecology as its own field, you can pull every work that names a top tier, a power circle, and an outsider, then compare how each one draws the lines. Reading 4,700 worldbuilding documents by hand is not an option.",
    },
    {
      title: "Structure becomes a Skill input, not a parsing task",
      body: "The Three-Act Diagnosis Skill in section 03 has to identify plotlines from raw script text first. Hand it plotlines that already carry a dramatic question and a scene-anchored arc, and its input precision moves up a level.",
    },
  ] as const;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.58fr_1.42fr]">
        <GlassSurface className="flex flex-col overflow-hidden rounded-[1.9rem] p-0">
          <div className="border-b border-black/5 px-5 py-4">
            <SectionLabel>
              Before: <span className="font-semibold text-[#1d1d1f]">Long-form documents</span>
            </SectionLabel>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <RawMaterialPile />
          </div>
        </GlassSurface>

        <WarmSurface className="overflow-hidden rounded-[1.9rem] p-0">
          <div className="border-b border-black/5 px-5 py-4">
            <SectionLabel>
              After: <span className="font-semibold text-[#1d1d1f]">The Schema I designed</span>
            </SectionLabel>
          </div>
          <div className="p-4">
            <SchemaDimensionGrid />
          </div>
        </WarmSurface>
      </div>

      <p className="mt-9 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Why cut it this way</p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {rationale.map((item) => (
          <div key={item.title} className="rounded-[1.4rem] border border-black/8 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-[#1d1d1f]">{item.title}</p>
            <p className="mt-2 text-[10.5px] leading-[1.55] text-[#86868b]">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function KnowledgeFoundationDetail() {
  return (
    <div className="mt-8">
      <KnowledgeBeforeAfter />
    </div>
  );
}

function AgenticRetrievalDiagram() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const agentStages = ["Intent", "Entity", "Router"] as const;

  const routes = [
    {
      icon: Film,
      name: "IP Retrieval",
      bullets: ["Specific IP", "Full context", "Full Docs"],
      note: "Full knowledge documents",
    },
    {
      icon: ScanSearch,
      name: "RAG Search",
      bullets: ["Pattern", "Inspiration", "Relevant Chunks"],
      note: "Chunk-level retrieval",
    },
    {
      icon: Globe,
      name: "Web Fallback",
      bullets: ["Internal KB insufficient", "External Web"],
      note: "Fallback only",
    },
  ] as const;

  useGSAP(
    () => {
      const spineTargets = gsap.utils.toArray<HTMLElement>("[data-retrieval-spine]", rootRef.current);
      const routeTargets = gsap.utils.toArray<HTMLElement>("[data-retrieval-route]", rootRef.current);
      const mergeTargets = gsap.utils.toArray<HTMLElement>("[data-retrieval-merge]", rootRef.current);

      if (reduceMotion) {
        gsap.set([...spineTargets, ...routeTargets, ...mergeTargets], { clearProps: "all" });
        return;
      }

      gsap.set(spineTargets, { autoAlpha: 0, y: 12 });
      gsap.set(routeTargets, { autoAlpha: 0, y: 14 });
      gsap.set(mergeTargets, { autoAlpha: 0, y: 10 });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(spineTargets, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.1, ease: "power3.out" });
          tl.to(routeTargets, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.08, ease: "power3.out" }, "-=0.1");
          tl.to(mergeTargets, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.08, ease: "power3.out" }, "-=0.14");
        },
      });
    },
    { scope: rootRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="mt-8 overflow-hidden rounded-[2rem] border border-black/8 bg-gradient-to-br from-white via-white to-[#f5f9ff] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-9">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">System map</p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">Not every question should be solved with RAG.</h3>

      <div className="mt-7 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
        <div data-retrieval-spine className="flex items-center gap-3 rounded-[1.4rem] border border-black/8 bg-white px-5 py-4 shadow-sm">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#0071e3]"><MessageSquareText className="h-[18px] w-[18px]" /></span>
          <p className="text-sm font-semibold text-[#1d1d1f]">User Query</p>
        </div>

        <div className="flex items-center justify-center py-1 sm:w-16 sm:py-0" aria-hidden="true">
          <div className="hidden h-px flex-1 bg-[#d8d8dc] sm:block" />
          <ArrowRight className="h-3.5 w-3.5 shrink-0 rotate-90 text-[#b0b0b5] sm:rotate-0" />
        </div>

        <div data-retrieval-spine className="flex items-start gap-3 rounded-[1.4rem] border border-black/8 bg-white px-5 py-4 shadow-sm">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#0071e3]"><Bot className="h-[18px] w-[18px]" /></span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#1d1d1f]">Phai Agent</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {agentStages.map((stage) => (
                <span key={stage} className="rounded-md bg-[#f5f5f7] px-2.5 py-1 text-[10px] font-medium text-[#515154]">{stage}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 hidden h-8 lg:block" aria-hidden="true">
        <div className="relative h-full">
          <div className="absolute left-[16.667%] right-[16.667%] top-0 h-px bg-[#d8d8dc]" />
          <div className="absolute left-[16.667%] top-0 h-8 w-px bg-[#d8d8dc]" />
          <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-[#d8d8dc]" />
          <div className="absolute left-[83.333%] top-0 h-8 w-px bg-[#d8d8dc]" />
        </div>
      </div>
      <div className="mt-3 flex justify-center lg:hidden">
        <ArrowDown className="h-3.5 w-3.5 text-[#b0b0b5]" />
      </div>

      <div className="mt-1 grid gap-3 lg:mt-0 lg:grid-cols-3">
        {routes.map((route) => (
          <div key={route.name} data-retrieval-route className="flex flex-col rounded-[1.5rem] border border-black/8 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] motion-reduce:transform-none motion-reduce:transition-none">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#0071e3]"><route.icon className="h-[17px] w-[17px]" /></span>
              <p className="text-sm font-semibold text-[#1d1d1f]">{route.name}</p>
            </div>
            <div className="mt-3.5 space-y-1.5">
              {route.bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#0071e3]" />
                  <p className="text-[11px] leading-4 text-[#515154]">{bullet}</p>
                </div>
              ))}
            </div>
            <p className="mt-auto border-t border-black/5 pt-2.5 text-[10px] font-medium text-[#86868b] lg:pt-3.5">{route.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 hidden h-8 lg:block" aria-hidden="true">
        <div className="relative h-full">
          <div className="absolute left-[16.667%] top-0 h-8 w-px bg-[#d8d8dc]" />
          <div className="absolute left-[83.333%] top-0 h-8 w-px bg-[#d8d8dc]" />
          <div className="absolute left-[16.667%] right-[16.667%] bottom-0 h-px bg-[#d8d8dc]" />
          <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-[#d8d8dc]" />
        </div>
      </div>
      <div className="mt-3 flex justify-center lg:hidden">
        <ArrowDown className="h-3.5 w-3.5 text-[#b0b0b5]" />
      </div>

      <div className="mt-1 flex flex-col items-center lg:mt-0">
        <div data-retrieval-merge className="w-full max-w-2xl rounded-[1.4rem] border border-black/8 bg-white px-5 py-4 text-center shadow-sm">
          <p className="text-sm font-semibold text-[#1d1d1f]">Context Assembly</p>
          <p className="mt-1 text-[10px] text-[#86868b]">Query rewrite, rerank, dedupe, then assemble what the model sees</p>
        </div>

        <div className="flex flex-col items-center py-1" aria-hidden="true">
          <div className="h-4 w-px bg-[#d8d8dc]" />
          <ArrowDown className="h-3.5 w-3.5 text-[#b0b0b5]" />
        </div>

        <div data-retrieval-merge className="w-full max-w-sm rounded-[1.4rem] border border-black/8 bg-white px-5 py-4 text-center shadow-sm">
          <p className="text-sm font-semibold text-[#1d1d1f]">LLM Response</p>
          <p className="mt-1 text-[10px] text-[#86868b]">Written against grounded material</p>
        </div>
      </div>

      <div className="mt-7 rounded-2xl bg-[#eaf4ff] p-5 text-sm leading-7 text-[#3f5f78]">
        We designed a hybrid retrieval system that routes between IP-level retrieval, chunk-level RAG, and web fallback based on user intent.
      </div>
    </div>
  );
}

function KnowledgeAssistantDemo({ onOpenDetail }: { onOpenDetail: (detail: "characterBio") => void }) {
  const steps = [
    ["IP detected", "The Devil Wears Prada"],
    ["Knowledge source found", "ip channel, structural match"],
    ["Character biography", "loaded from the knowledgeFile"],
    ["Story overview", "loaded for narrative context"],
  ] as const;

  return (
    <div className="ml-auto mt-8 w-full max-w-[36rem] overflow-hidden rounded-[1.6rem] border border-black/10 bg-[#f5f5f7] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="flex h-11 items-center gap-2 border-b border-black/8 bg-white/85 px-4 backdrop-blur-2xl">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] font-medium text-[#86868b]">Alpha desktop app</span>
      </div>

      <div className="bg-white p-5 sm:p-6">
        <div className="flex justify-end">
          <div className="max-w-[28rem] rounded-2xl bg-[#eaf4ff] px-4 py-3">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold text-[#0071e3]"><AtSign className="h-3 w-3" />The Devil Wears Prada</p>
            <p className="mt-1.5 text-sm leading-6 text-[#1d1d1f]">Analyze Andy&apos;s character arc.</p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#111318] font-serif text-xs italic text-white">α</span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-[#1d1d1f]">Understanding your request&hellip;</p>

            <div className="mt-3 space-y-1.5">
              {steps.map(([verb, detail]) => (
                <div key={verb} className="flex items-center gap-2 rounded-lg px-1 py-1 text-[10px] text-[#86868b]">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e8f7ee] text-[#248a3d]">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  <span><strong className="font-semibold text-[#515154]">{verb}</strong> · {detail}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 max-w-[31rem] text-[11px] leading-[1.65] text-[#515154]">
              <h4 className="text-[13px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">Andy Sachs, character arc</h4>
              <div className="mt-3 space-y-2.5">
                <div className="rounded-lg bg-[#f5f5f7] p-3">
                  <p className="text-[10px] font-semibold text-[#1d1d1f]">Initial state</p>
                  <p className="mt-1.5 text-[10px] leading-4 text-[#86868b]">An ambitious journalist who dismisses fashion as superficial, treating the assistant job as a stepping-stone she has to endure.</p>
                </div>
                <div className="rounded-lg bg-[#f5f5f7] p-3">
                  <p className="text-[10px] font-semibold text-[#1d1d1f]">Turning point</p>
                  <p className="mt-1.5 text-[10px] leading-4 text-[#86868b]">Miranda&apos;s cerulean-sweater speech exposes Andy&apos;s ignorance, revealing the professional depth of a field she had already judged.</p>
                </div>
                <div className="rounded-lg bg-[#f5f5f7] p-3">
                  <p className="text-[10px] font-semibold text-[#1d1d1f]">Transformation</p>
                  <p className="mt-1.5 text-[10px] leading-4 text-[#86868b]">Andy gradually masters the rules of the fashion world, and the same competence that saves her career starts to cost her the relationships outside it.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenDetail("characterBio")}
                className="mt-4 flex w-full items-center gap-2 rounded-xl border border-black/8 bg-white px-3 py-2 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
              >
                <FileText className="h-3.5 w-3.5 shrink-0 text-[#0071e3]" />
                <span className="min-w-0 flex-1 truncate text-[10px] font-semibold text-[#0066cc]">character-biography.md</span>
                <span className="shrink-0 text-[9px] text-[#86868b]">Full record</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-black/8 bg-[#fafafa] p-3.5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">Behind the scenes</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[9.5px] text-[#6e6e73]">
            <span className="rounded-full bg-white px-2 py-1 font-medium shadow-sm">@ IP</span>
            <ArrowRight className="h-3 w-3 text-[#b0b0b5]" />
            <span className="rounded-full bg-white px-2 py-1 font-medium shadow-sm">IP retrieval</span>
            <ArrowRight className="h-3 w-3 text-[#b0b0b5]" />
            <span className="rounded-full bg-white px-2 py-1 font-medium shadow-sm">Character biography</span>
            <ArrowRight className="h-3 w-3 text-[#b0b0b5]" />
            <span className="rounded-full bg-white px-2 py-1 font-medium shadow-sm">Context</span>
            <ArrowRight className="h-3 w-3 text-[#b0b0b5]" />
            <span className="rounded-full bg-[#111318] px-2 py-1 font-medium text-white shadow-sm">LLM analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillEcosystemAuditPanel() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLParagraphElement>(null);

  const scopeStats = [
    { icon: Layers3, label: "55 Skills in catalog" },
    { icon: Cog, label: "10 engineering dimensions" },
    { icon: Split, label: "3 variant types analyzed" },
    { icon: ShieldCheck, label: "Automated conflict detection" },
  ] as const;

  const compassIcons = [Search, Zap, ShieldCheck, BarChart3] as const;

  const findings = [
    {
      icon: X,
      tone: "critical" as const,
      label: "Identical descriptions",
      title: "Two expert whitepaper Skills shipped with the same description.",
      body: "The Agent had no basis to prefer one, so selection was effectively random.",
    },
    {
      icon: Split,
      tone: "warning" as const,
      label: "Trigger collision",
      title: "Overlapping trigger words across the story structure Skill.",
      body: "The words that should route to a diagnostic check overlapped with generation mode.",
    },
    {
      icon: Info,
      tone: "info" as const,
      label: "Scale insight",
      title: "Failures only show up at scale.",
      body: "One Skill in isolation always looks correct. These are catalog-level properties.",
    },
  ] as const;

  const toneClasses: Record<(typeof findings)[number]["tone"], { border: string; bg: string; iconBg: string; iconText: string; label: string }> = {
    critical: { border: "border-[#ff6b6b]/20", bg: "bg-[#fff5f5]", iconBg: "bg-white", iconText: "text-[#e5484d]", label: "text-[#e5484d]" },
    warning: { border: "border-[#ff9500]/20", bg: "bg-[#fffaf0]", iconBg: "bg-white", iconText: "text-[#c2760c]", label: "text-[#c2760c]" },
    info: { border: "border-[#0071e3]/15", bg: "bg-[#f5f9ff]", iconBg: "bg-white", iconText: "text-[#0071e3]", label: "text-[#0071e3]" },
  };

  useGSAP(
    () => {
      const iconTargets = gsap.utils.toArray<HTMLElement>("[data-audit-icon]", rootRef.current);
      const findingTargets = gsap.utils.toArray<HTMLElement>("[data-audit-finding]", rootRef.current);
      const scopeTargets = gsap.utils.toArray<HTMLElement>("[data-audit-scope]", rootRef.current);
      const ring = rootRef.current?.querySelector<HTMLElement>("[data-audit-ring]");

      if (reduceMotion) {
        gsap.set([...iconTargets, ...findingTargets, ...scopeTargets, ring].filter(Boolean), { clearProps: "all" });
        if (countRef.current) countRef.current.textContent = "55";
        return;
      }

      gsap.set(iconTargets, { autoAlpha: 0, scale: 0.6 });
      gsap.set(findingTargets, { autoAlpha: 0, y: 14 });
      gsap.set(scopeTargets, { autoAlpha: 0, y: 8 });
      if (ring) gsap.set(ring, { scale: 0.85, autoAlpha: 0 });
      if (countRef.current) countRef.current.textContent = "0";

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          if (ring) tl.to(ring, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "power3.out" });
          tl.to(iconTargets, { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.25");
          if (countRef.current) {
            const counter = { value: 0 };
            tl.to(counter, {
              value: 55,
              duration: 0.7,
              ease: "power2.out",
              onUpdate: () => {
                if (countRef.current) countRef.current.textContent = String(Math.round(counter.value));
              },
            }, "-=0.35");
          }
          tl.to(scopeTargets, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" }, "-=0.3");
          tl.to(findingTargets, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.09, ease: "power3.out" }, "-=0.15");
        },
      });
    },
    { scope: rootRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="mt-4 overflow-hidden rounded-[2rem] border border-black/8 bg-gradient-to-br from-white via-white to-[#f2f6ff] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-9">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Full ecosystem audit</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">Testing the catalog, not one Skill</h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#6e6e73]">Running comprehensive checks across the full catalog to make sure fast, expert, and generate variants stay cleanly distinguishable to the router.</p>
        </div>

        <div className="relative mx-auto flex h-56 w-56 shrink-0 items-center justify-center">
          <div data-audit-ring className="absolute inset-0 rounded-full border border-black/8 bg-[conic-gradient(from_180deg,#eaf4ff,#ffffff,#eaf4ff)]" />
          <div className="absolute inset-3 rounded-full border border-[#0071e3]/12" />
          <div className="relative flex flex-col items-center">
            <p ref={countRef} className="text-6xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">55</p>
            <p className="mt-1 text-xs font-semibold text-[#515154]">Skills audited</p>
            <p className="mt-0.5 text-[10px] text-[#86868b]">10 engineering dimensions</p>
          </div>
          {compassIcons.map((Icon, index) => {
            const angle = index * 90 - 45;
            const radius = 96;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <span
                key={index}
                data-audit-icon
                className="absolute flex h-9 w-9 items-center justify-center rounded-full border border-black/8 bg-white text-[#0071e3] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <Icon className="h-4 w-4" />
              </span>
            );
          })}
        </div>

        <div className="space-y-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Audit scope</p>
          {scopeStats.map((stat) => (
            <div key={stat.label} data-audit-scope className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0071e3]"><stat.icon className="h-3.5 w-3.5" /></span>
              <span className="text-xs font-medium text-[#515154]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-9 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#0071e3]" />
          <p className="text-sm font-semibold text-[#1d1d1f]">Key findings</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {findings.map((finding) => {
          const tone = toneClasses[finding.tone];
          return (
            <div key={finding.label} data-audit-finding className={`rounded-[1.4rem] border ${tone.border} ${tone.bg} p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)]`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${tone.iconBg} ${tone.iconText} shadow-sm`}><finding.icon className="h-4 w-4" /></span>
              <p className={`mt-3 text-[10px] font-semibold uppercase tracking-[0.13em] ${tone.label}`}>{finding.label}</p>
              <p className="mt-2 text-sm font-semibold leading-5 text-[#1d1d1f]">{finding.title}</p>
              <p className="mt-2 text-xs leading-5 text-[#86868b]">{finding.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SkillDiagnosisPanel({ onOpenDetail }: { onOpenDetail: (detail: "script" | "report") => void }) {
  const commands = [
    ["Read file", "bad_parasite_v2.txt · attached"],
    ["Loaded Skill", "Three-Act Diagnosis, explicit @mention"],

    ["Parsed script", "110 pages · 12 beats extracted"],
    ["Evaluated", "8 dimensions against the misjudgment checklist"],
    ["Checked checklist", "midpoint-vs-escalation triggered, correctly rejected p.44"],
    ["Generated report", "three-act-diagnostic-report.md + revision strategy"],
  ] as const;

  return (
    <div className="ml-auto w-full max-w-[34rem] overflow-hidden rounded-[1.6rem] border border-black/10 bg-[#f5f5f7] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="flex h-11 items-center gap-2 border-b border-black/8 bg-white/85 px-4 backdrop-blur-2xl">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] font-medium text-[#86868b]">Alpha desktop app</span>
      </div>

      <div className="bg-white p-5 sm:p-6">
        <div className="flex justify-end">
          <div className="max-w-[27rem] rounded-2xl bg-[#eaf4ff] px-4 py-3">
            <p className="text-sm leading-6 text-[#1d1d1f]">
              Run the three-act diagnostic on this draft. <span className="font-semibold text-[#0071e3]">@Three-Act Diagnosis</span>
            </p>
            <button
              type="button"
              onClick={() => onOpenDetail("script")}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-white/70 px-2.5 py-1.5 transition hover:bg-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
            >
              <FileText className="h-3 w-3 text-[#0071e3]" />
              <span className="text-[10px] font-medium text-[#0066cc]">bad_parasite_v2.txt</span>
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#111318] font-serif text-xs italic text-white">α</span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-[#1d1d1f]">Loaded. I&apos;ll run the full eight-dimension contract before returning a verdict.</p>

            <div className="mt-3 space-y-1.5">
              {commands.map(([verb, detail]) => (
                <div key={`${verb}-${detail}`} className="flex items-center gap-2 rounded-lg px-1 py-1 text-[10px] text-[#86868b]">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e8f7ee] text-[#248a3d]">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  <span><strong className="font-semibold text-[#515154]">{verb}</strong> · {detail}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 max-w-[30rem] text-[11px] leading-[1.65] text-[#515154]">
              <h4 className="text-[13px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">NOT PASSED. Five critical structural failures.</h4>
              <p className="mt-2">The draft is a competent family-gets-jobs dramedy, but it collapses its own class thesis into a feel-good reconciliation. By page 28 the family is employed through ordinary, at-will jobs, so there is no irreversible Plot Point 1. The basement reveal at page 44 reads as a midpoint, but the checklist correctly rejects it. It only adds information, it does not reverse anything, so Act 2 has no spine.</p>

              <button
                type="button"
                onClick={() => onOpenDetail("report")}
                className="mt-4 flex w-full items-center gap-2 rounded-xl border border-black/8 bg-white px-3 py-2 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
              >
                <FileText className="h-3.5 w-3.5 shrink-0 text-[#0071e3]" />
                <span className="min-w-0 flex-1 truncate text-[10px] font-semibold text-[#0066cc]">three-act-diagnostic-report.md</span>
                <span className="shrink-0 text-[9px] text-[#86868b]">created</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#b0b0b5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
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
              label="Skills, from One to Fifty-Five"
              title="I owned one Skill end to end, then found what only shows up at scale."
            />

            <p className="mt-8 max-w-3xl text-sm leading-7 text-[#6e6e73]">
              Screenwriters already know three-act theory. Knowing the theory and applying it to your own draft without bias are different things. A writer under deadline will call the loudest scene a turning point and the busiest stretch good pacing, because gut instinct has no way to check itself.
            </p>

            <div className="mt-6 flex items-baseline justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Three-Act Diagnosis, the Skill I own</p>
            </div>

            <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
              <div className="lg:pr-4">
                <p className="text-sm leading-7 text-[#6e6e73]">
                  On the product side, a Skill only runs if the Agent picks it. The router matches on description text alone, so I wrote the trigger language to fire on structural intent, not just the words &quot;three-act,&quot; and paired it with an explicit @mention path for writers who want to call it directly.
                </p>
                <p className="mt-4 text-sm leading-7 text-[#6e6e73]">
                  On the technical side, I built an eight-dimension manual covering setup proportion, plot points, midpoint, and resolution, backed by a misjudgment checklist that catches the traps writers fall into on their own work, and a strategy library that turns each failure into a concrete fix instead of a vague note.
                </p>
                <p className="mt-4 text-sm leading-7 text-[#6e6e73]">
                  The panel on the right is a real run against a draft I deliberately broke to test the Skill. It returned the same verdict every time, caught five critical structural failures a writer&apos;s gut call would likely miss, and handed back a revision strategy instead of just a grade.
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0071e3]">
                  <Braces className="h-4 w-4" />
                  Why a forced check, not free analysis
                </div>
              </div>
              <SkillDiagnosisPanel onOpenDetail={setDetail} />
            </div>

            <div className="mt-5 rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm leading-7 text-[#6e6e73]">
                I also designed two companion Skills, script-bible and project-bible, that apply the same anti-hallucination logic to a generative workflow instead of a diagnostic one. One walks a writer through unresolved story decisions turn by turn. The other assembles a pitch document once the material is ready, without the back and forth.
              </p>
            </div>

            <div className="mt-10 flex items-baseline justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Where the cracks showed up, all 55 Skills together</p>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6e6e73]">
              Running checks across the full catalog, I found trigger words colliding between Skills, fast and expert variants that were indistinguishable to the router, and check versus generate entry points stepping on each other. I did not read this in a bug report. I found it by testing the catalog myself, and I built the tool that catches it going forward.
            </p>
            <SkillEcosystemAuditPanel />

            <div className="mt-5 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.07)] sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Agent I built · 02</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">skill-evaluator, so finding a crack is not a one-time act</h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#0071e3]"><Zap className="h-4 w-4" /></span>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6e6e73]">It runs a five dimension diagnostic, produces a graded gap analysis, and returns a rewritten description. It writes a report and stops there. It never edits a Skill on its own, because I kept the human in the loop on purpose.</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-5">
                {evaluatorChecks.map(([code, label]) => (
                  <div key={code} className="flex items-center gap-2 rounded-xl border border-black/8 bg-[#f5f5f7] px-3 py-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0071e3] text-[9px] font-semibold text-white">{code}</span>
                    <span className="text-xs font-semibold text-[#1d1d1f]">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="rounded-xl border border-black/8 bg-[#f5f5f7] p-4"><p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#0071e3]">Input</p><p className="mt-2 text-xs text-[#6e6e73]">Directory or CSV</p></div>
                <ArrowRight className="m-auto hidden h-4 w-4 text-[#b0b0b5] sm:block" />
                <div className="rounded-xl border border-black/8 bg-[#f5f5f7] p-4"><p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#0071e3]">Output</p><p className="mt-2 text-xs text-[#6e6e73]">Conflicts · severity · rewrite</p></div>
              </div>
              <p className="mt-4 text-[11px] leading-5 text-[#86868b]">Static review is used to catch catalog conflicts. It is not used to claim runtime quality.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="04"
              label="Designing the Knowledge Base"
              title="Build the knowledge, make it intelligent, show how a writer experiences it."
              description="This is the other thing I own in this project besides the Skill catalog. It breaks into three layers: the knowledge design that turns raw stories into queryable fields, the Agent routing that decides which retrieval channel a question actually needs, and the moment a writer sees it work inside a real request."
            />

            <div className="mt-8 flex items-baseline gap-2">
              <span className="text-[13px] font-semibold text-[#0071e3]">01</span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Knowledge Foundation</p>
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">Building a domain-specific knowledge base for storytelling.</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6e6e73]">
              The library already held 4,700-plus works, and each one arrived as prose. A work was stored as a short record, title, type, genre tags, cover, and a synopsis under 300 characters, plus a map pointing each knowledge dimension to one complete text file on object storage. A single story overview ran 3,322 words, a character biography closer to 8,000, and one work could carry tens of thousands.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6e6e73]">
              The information was in there. It was just paragraphs. The passage describing this world&apos;s class ecology names a top tier, an inner power circle, and an outsider at the bottom, but as prose nothing can filter on it, rank it, or line it up against another work. Recommendation and precise citation both need fields, not the hope that the right words show up in a wall of text.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6e6e73]">
              So I designed the entity Schema below. Every work breaks into the same four dimensions, and every field is queryable on its own, comparable across works, and readable by the Agent without inference.
            </p>
            <KnowledgeFoundationDetail />

            <div className="mt-12 flex items-baseline gap-2">
              <span className="text-[13px] font-semibold text-[#0071e3]">02</span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Agentic Retrieval</p>
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">Routing every question to the right knowledge source.</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6e6e73]">
              Knowing the fields is not enough. The Agent still has to decide, per request, whether it needs a full document, a matched fragment, or the open web. I designed the three-channel retrieval architecture that makes that call, so a named-work question and an open-ended one never hit the same path.
            </p>
            <AgenticRetrievalDiagram />

            <div className="mt-12 flex items-baseline gap-2">
              <span className="text-[13px] font-semibold text-[#0071e3]">03</span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Knowledge Assistant in Action</p>
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">Turning structured knowledge into an intuitive creative experience.</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6e6e73]">
              This is where the first two layers meet a real request. One @ mention, a visible retrieval trace, and an answer grounded in the actual character record instead of a plausible-sounding guess.
            </p>
            <KnowledgeAssistantDemo onOpenDetail={setDetail} />

            <div className="mt-8 rounded-2xl bg-[#eaf4ff] p-5 text-sm leading-7 text-[#3f5f78]">
              Boundary: I designed the entity Schema and the three-channel retrieval architecture. This does not claim I personally shipped the full production extraction and storage pipeline behind it.
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading
              number="05"
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
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6e6e73]">Each event ties back to a session, a run, and an Agent through a shared identifier scheme, so a like, a copy, a dislike, or a stop can be traced to the exact Skill and turn that produced it. Positive signals span four event types (likes, copies, references, memory saves, and shares) across 12 interaction points. Negative signals cover two (dislikes and stopped generations).</p>
              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[["18", "product surfaces instrumented"], ["12", "positive touchpoints · 4 event types"], ["2", "negative signals · 2 event types"], ["6 + 4", "event types + trace contexts"]].map(([value, label]) => (
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
