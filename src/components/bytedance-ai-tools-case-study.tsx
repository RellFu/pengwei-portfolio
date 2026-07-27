"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CircleAlert,
  BadgeCheck,
  BarChart3,
  Bot,
  Building2,
  Code2,
  Boxes,
  Database,
  FileSearch,
  FolderSearch2,
  Landmark,
  PackageSearch,
  ArrowRight,
  Route,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Tags,
  UserRound,
} from "lucide-react";
import {
  CapabilityChip,
  GlassSurface,
  MetricCard,
  SectionLabel,
  WarmSurface,
} from "@/components/design-system";
import type { CaseStudyProject } from "@/data/projects";

const overviewCards = [
  {
    title: "Product Normalization",
    description: "Unify product naming, write back structured results",
    icon: Tags,
  },
  {
    title: "Supplier Comparison AI",
    description: "Generate traceable comparison summaries",
    icon: Landmark,
  },
  {
    title: "Talent Pricing Agent",
    description: "Retrieve historical cases, provide pricing advice",
    icon: Bot,
  },
];

const overviewTags = ["More efficient", "More controllable", "More traceable", "Reusable"];

const problemCards = [
  {
    title: "Few mature precedents",
    description:
      "AI procurement lacks mature precedents; scenarios must be carved out of real workflows, with boundaries defined and feasibility validated.",
    icon: Tags,
  },
  {
    title: "Complex data pipeline",
    description:
      "Quotes, historical rounds, and contract data are scattered with inconsistent field definitions, hurting retrieval and analysis quality.",
    icon: BarChart3,
  },
  {
    title: "High output risk",
    description:
      "Price and supplier information are highly sensitive; a wrong AI result can affect procurement decisions and business reviews.",
    icon: FolderSearch2,
  },
];

const toolProjects = [
  {
    title: "Project 1: Talent Pricing Agent",
    summary:
      "Built a talent pricing consultation agent for procurement, based on historical collaboration cases and structured price information. After a user enters the talent, platform, activity format, and duration, the system automatically recalls similar cases and returns a reference price range, case basis, and risk alerts—helping procurement reach an initial pricing judgment faster.",
    problem:
      "Talent quote cases were scattered across historical collaboration records with no unified retrieval or cross-comparison. After entering the talent, activity format, platform, and duration, procurement still had to manually dig through similar cases—high judgment cost, low consultation efficiency.",
    solution:
      "Built the pricing agent around key information such as talent name, platform, activity type, duration, city tier, and historical collaboration price. After the user enters requirements, the system automatically recalls similar cases, extracts price ranges and key conditions, and returns a reference quote with its basis.",
    result:
      "Upgraded a process that relied on manual retrieval and gut judgment into a fast, explainable price-reference capability. Consultation efficiency improved 10x+, with 90%+ coverage accuracy on similar cases; outputs are explainable and reusable, helping procurement reach an initial pricing judgment faster.",
    chips: [],
    previewType: "agent" as const,
  },
  {
    title: "Project 2: Product Information Cleanup System",
    summary:
      "Built a standard SKU mapping knowledge base on a RAG architecture to automatically perform product normalization matching and write back results.",
    problem:
      "Supplier outbound records and product information were inconsistently formatted, with frequently messy name, unit, spec, and price fields; the same product could be expressed many ways, forcing procurement and data teammates to manually categorize and match standard SKUs one by one—slow and error-prone.",
    solution:
      "Built a standard SKU / ingredient mapping knowledge base, decomposed raw product rows into structured fields, recalled candidates via knowledge-base retrieval, then combined rule-based scoring with LLM semantic judgment to complete normalization matching; low-score results don't enter the table directly, and the raw record, match score, and standard product fields are written back to a multi-dimensional table.",
    result:
      "Turned messy product records into standardized data that is countable, comparable, and traceable, reducing manual line-by-line cleanup and supporting downstream entry-rate statistics, cost analysis, and supplier comparison.",
    previewType: "matching" as const,
  },
  {
    title: "Project 3: Supplier Comparison AI Summary",
    summary:
      "Automatically generates evidence-backed supplier comparison summaries and negotiation advice, based on RAG + structured quote data.",
    problem:
      "The sourcing system was more of a quoting and negotiation workflow tool; buyers had to review quote tables, historical rounds, and anomalous prices themselves, then manually compile comparison conclusions—time-consuming and easy to miss things.",
    solution:
      "Split the input into four context types—comparison template, current comparison metrics, historical quote rounds, and price detail data—so the LLM generates a PE1 objective summary and PE2 negotiation advice under a clear data protocol.",
    result:
      "Upgraded the system from a workflow tool into a data-analysis and negotiation-assist tool, cutting the cost of manually writing summaries and hunting anomalies; PE1 and PE2 are evaluated separately, with an MOS target accuracy of no less than 90%.",
    previewType: "summary" as const,
  },
];

const methodCards = [
  {
    title: "Business understanding first",
    description:
      "Align with procurement stakeholders on the real workflow, understand quoting and comparison rules, then turn vague asks into clear AI product tasks.",
    icon: PackageSearch,
  },
  {
    title: "From requirements to usable tools",
    description:
      "Break stakeholder needs into concrete processing logic and independently deliver usable tools, rather than stopping at the prototype stage.",
    icon: Boxes,
  },
  {
    title: "Code-driven delivery",
    description:
      "Use Python and JavaScript for structured data processing, JSON parsing, rule-based judgment, and result write-back, plugging AI capabilities directly into the real procurement analysis workflow.",
    icon: Code2,
  },
  {
    title: "AI-assisted development",
    description:
      "Used coding tools like Codex and Cursor for fast development and debugging, shortening the delivery cycle between product judgment and engineering, and boosting a small team's execution efficiency.",
    icon: Bot,
  },
];

const resultCards = [
  {
    value: "96.45%+",
    title: "Matching accuracy",
    description: "Significant improvement in product normalization matching accuracy.",
  },
  {
    value: "Tens of x",
    title: "Efficiency gain",
    description: "Compressed hours of manual cleanup into automated second-level processing.",
  },
  {
    value: "100%",
    title: "Traceable output",
    description: "Core conclusions bound to evidence, supporting review and audit.",
  },
  {
    value: "10x+",
    title: "Consultation efficiency",
    description: "Major improvement in talent pricing consultation response efficiency.",
  },
];

const matchingSteps = [
  { label: "Raw Product Row", icon: PackageSearch },
  { label: "Structured Processing", icon: Database },
  { label: "KB Retrieval", icon: FileSearch },
  { label: "Rule Scoring", icon: ShieldCheck },
  { label: "LLM Matching", icon: Sparkles },
  { label: "Result Write-back", icon: BadgeCheck },
];

function MatchingPreview() {
  return (
    <GlassSurface className="h-full rounded-[1.6rem] border-black/5 p-4 shadow-[0_18px_50px_rgba(0, 0, 0,0.08)]">
      <div className="space-y-4">
        <div className="rounded-[1.25rem] border border-black/5 bg-[#f5f5f7]/60 p-4">
          <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
            Workflow
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-6">
            {matchingSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.label} className="relative rounded-[1rem] border border-black/5 bg-white/88 px-3 py-3 text-center">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#0071e3] shadow-[0_8px_16px_rgba(0, 0, 0,0.06)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-[12px] font-semibold text-[#1d1d1f]">{step.label}</p>
                  {index < matchingSteps.length - 1 ? (
                    <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-[#c7c7cc] sm:block">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-[1.1rem] border border-dashed border-black/10 bg-white/88 px-3 py-2 text-[11px] leading-5 text-[#6e6e73]">
            <span className="font-medium text-[#86868b]">Rule Scoring: </span>
            Define similarity scoring rules via prompt, and separate matched vs. unmatched by score.
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
              Raw Product Data
            </p>
            <div className="overflow-hidden rounded-[1.05rem] border border-black/5 bg-white/88">
              <div className="grid grid-cols-[minmax(0,1fr)_3rem] gap-1 border-b border-black/5 px-3 py-2 text-[10px] font-medium text-[#86868b]">
                <span className="min-w-0">Raw Product Name</span>
                <span>Price</span>
              </div>
              {[
                ["Want Want Rice Crackers Original 435g Black Rice Family Pack for Gifting", "13"],
                ["Pan Pan Breakfast Crispy Crackers Sea Salt 600g/case", "23"],
                ["Wuqiong Roasted Chicken Wings Honey 20g*20pcs/box", "44"],
                ["Glico Pocky Chocolate 48g*5 sticks", "23"],
              ].map((row, index) => (
                <div
                  key={row[0]}
                  className={`grid grid-cols-[minmax(0,1fr)_3rem] gap-1 px-3 py-2 text-[10px] leading-4 text-[#6e6e73] ${
                    index < 3 ? "border-b border-black/5" : ""
                  }`}
                >
                  <span className="min-w-0">{row[0]}</span>
                  <span>{row[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
              AI Matching Result
            </p>
            <div className="overflow-hidden rounded-[1.05rem] border border-black/10 bg-white/88 shadow-[0_10px_28px_rgba(0, 0, 0,0.08)]">
              <div className="grid grid-cols-[2.75rem_minmax(0,1fr)_3rem_3.5rem] gap-1 border-b border-black/5 px-3 py-2 text-[10px] font-medium text-[#86868b]">
                <span>Status</span>
                <span className="min-w-0">Standard Name</span>
                <span>Score</span>
                <span>Code</span>
              </div>
              {[
                ["Matched", "Want Want Black Rice Crackers Original 425g Family Pack", "100", "423", "text-green-600"],
                ["Matched", "Pan Pan Crispy Crackers Seaweed 600g/case", "80", "563", "text-green-600"],
                ["Matched", "Wuqiong Roasted Chicken Wings Honey 20g*20pcs/box", "60", "629", "text-green-600"],
                ["Unmatched", "Glico Pocky Chocolate 48g*5 sticks", "0", "—", "text-red-500"],
              ].map((row, index) => (
                <div
                  key={row[1]}
                  className={`grid grid-cols-[2.75rem_minmax(0,1fr)_3rem_3.5rem] gap-1 px-3 py-2 text-[10px] leading-4 text-[#6e6e73] ${
                    index < 3 ? "border-b border-black/5" : ""
                  }`}
                >
                  <span className={`flex items-center font-semibold ${row[4]}`}>{row[0]}</span>
                  <span className="min-w-0">{row[1]}</span>
                  <span
                    className={`flex items-center font-semibold ${
                      row[2] === "0" ? "text-red-500" : "text-[#0071e3]"
                    }`}
                  >
                    {row[2]}
                  </span>
                  <span className="flex items-center">{row[3]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </GlassSurface>
  );
}

function SummaryPreview() {
  return (
    <GlassSurface className="h-full overflow-hidden rounded-[1.7rem] border-black/5 p-4 shadow-[0_18px_50px_rgba(0, 0, 0,0.08)]">
      <div className="space-y-4">
        <div className="rounded-[1.25rem] border border-black/5 bg-[#f5f5f7]/70 p-4">
          <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
                Input
              </p>
              <div className="mt-3 grid gap-2">
                {[
                  ["Comparison Template", "Quote dimensions / comparison basis"],
                  ["Comparison Metrics", "Price / Delivery / Risk"],
                  ["Historical Quote Rounds", "Multi-round quote records"],
                  ["Price Details", "Anomalous prices & line items"],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="flex items-center justify-between rounded-[0.95rem] border border-black/5 bg-white/88 px-3 py-2 text-[11px] text-[#6e6e73]"
                  >
                    <span className="font-medium text-[#1d1d1f]">{row[0]}</span>
                    <span>{row[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
                Output
              </p>
              <div className="mt-3 grid gap-2">
                {[
                  ["PE1 Summary", "Objective summary"],
                  ["PE2 Advice", "Negotiation advice"],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="rounded-[1rem] border border-black/5 bg-white/90 px-3 py-3"
                  >
                    <p className="text-[12px] font-semibold text-[#1d1d1f]">{row[0]}</p>
                    <p className="mt-1 text-[11px] leading-5 text-[#6e6e73]">
                      {row[1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[0.35fr_0.65fr] lg:gap-8 lg:items-start">
          <div className="rounded-[1.25rem] border border-black/5 bg-[#f5f5f7]/65 p-4">
            <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
              Input Example
            </p>
            <div className="mt-3 space-y-2">
              {[
                ["Supplier A", "¥128,000"],
                ["Supplier B", "¥121,500"],
                ["Supplier C", "¥136,000"],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="flex items-center justify-between rounded-[0.95rem] border border-black/5 bg-white/88 px-3 py-2 text-[11px] text-[#6e6e73]"
                >
                  <span>{row[0]}</span>
                  <span className="font-medium text-[#1d1d1f]">{row[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-black/5 bg-[#f5f5f7]/70 p-4">
            <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
              Output Result
            </p>
            <div className="mt-3 rounded-[1rem] border border-black/5 bg-white/88 p-4">
              <p className="text-[11px] leading-6 text-[#6e6e73]">
                Supplier B has the lowest quote; A has a shorter delivery cycle. Recommend prioritizing Supplier B with A as backup; watch for anomalous prices and delivery timelines.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-black/5 bg-white/82 p-3">
          <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
            Evaluation & Safeguards
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {[
              ["PE1", "Summary only, no advice"],
              ["PE2", "Advice based only on price details"],
              ["MOS", "Confidence / Completeness / Format"],
            ].map((item) => (
              <div
                key={item[0]}
                className="rounded-[0.95rem] border border-black/5 bg-[#f5f5f7]/75 px-3 py-2 text-[11px] text-[#6e6e73]"
              >
                <div className="font-medium text-[#1d1d1f]">{item[0]}</div>
                <div className="mt-1 text-[10px] leading-5 text-[#86868b]">{item[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassSurface>
  );
}

function AgentPreview() {
  const userQuery =
    "If we invited Pengwei Fu to perform a 5-minute standup set at Douyin's annual comedy gala, what's a recent reference price?";

  const peerCases = [
    ["Case A", "¥180k - ¥220k", "Offline event / 5min / standup performance"],
    ["Case B", "¥210k - ¥240k", "Brand gala / 8min / opening standup"],
  ];

  return (
    <GlassSurface className="h-full overflow-hidden rounded-[1.7rem] border-black/5 p-4 shadow-[0_12px_30px_rgba(0, 0, 0,0.05)]">
      <div className="space-y-4">
        <div className="rounded-[1.2rem] border border-black/10 bg-[#f5f5f7]/75 px-4 py-3 shadow-[0_6px_16px_rgba(0, 0, 0,0.04)]">
          <div className="flex items-center gap-3 text-[12px] leading-6 text-[#515154]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[#0071e3]">
              <UserRound className="h-4 w-4" />
            </div>
            <span className="flex-1 font-medium text-[#1d1d1f]">{userQuery}</span>
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-black/5 bg-[#f5f5f7]/50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1d1d1f]">
            <Bot className="h-4 w-4 text-[#0071e3]" />
            Agent Analysis
          </div>
            <div className="mt-3 space-y-3">
            <div className="rounded-[1rem] border border-black/5 bg-white/90 p-4">
              <div className="text-[12px] font-semibold text-[#1d1d1f]">Talent Profile</div>
              <p className="mt-3 text-[11px] leading-5 text-[#6e6e73]">
                Pengwei Fu, a mainland Chinese standup comedian. Known for sets like &ldquo;Falling Asleep in the Requirements Review&rdquo; and &ldquo;Bros with the Engineers,&rdquo; and appearances on variety shows such as &ldquo;Riding the Winds and Waves: AI Product Interns.&rdquo;
              </p>
              <p className="mt-2 text-[11px] leading-5 text-[#6e6e73]">
                Reference tier/pricing: 2.9649M Douyin followers, 20.765B topic views, rated Tier A.
              </p>
            </div>

            <div className="rounded-[1rem] border border-black/5 bg-white/90 p-4">
              <div className="text-[12px] font-semibold text-[#1d1d1f]">Comparable Cases</div>
              <div className="mt-3 grid gap-2">
                {peerCases.map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[0.72fr_0.86fr_1fr] gap-2 rounded-[0.95rem] border border-black/5 bg-[#f5f5f7]/45 px-3 py-2 text-[11px] text-[#6e6e73]"
                  >
                    <span className="font-medium text-[#1d1d1f]">{row[0]}</span>
                    <span>{row[1]}</span>
                    <span className="truncate">{row[2]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1rem] border border-black/5 bg-white/90 px-4 py-4 text-[12px] leading-6 text-[#6e6e73]">
              <p className="font-medium text-[#1d1d1f]">Recommendation</p>
              <p className="mt-3">
                Suggested reference range: <span className="font-semibold text-[#0071e3]">¥200k - ¥230k</span>,
                based on comparable cases from the last 3 months.
              </p>
            </div>

            <div className="rounded-[1rem] border border-black/10 bg-[#f5f5f7]/70 px-4 py-4 text-[12px] leading-6 text-[#6e6e73] shadow-[0_6px_16px_rgba(0, 0, 0,0.04)]">
              <div className="flex items-center gap-2 font-medium text-[#1d1d1f]">
                <CircleAlert className="h-4 w-4 text-[#86868b]" />
                Public Sentiment Alert
              </div>
              <p className="mt-3">
                Recently, in a livestream, Pengwei Fu openly claimed that &ldquo;product managers can fully replace engineers,&rdquo; sparking public controversy; he was also reported in 2025 to have had a serious conflict with an operations lead at his company, raising questions about his character. Please note the reputational risk of collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassSurface>
  );
}

function ToolPreview({ type }: { type: (typeof toolProjects)[number]["previewType"] }) {
  if (type === "matching") {
    return <MatchingPreview />;
  }

  if (type === "summary") {
    return <SummaryPreview />;
  }

  return <AgentPreview />;
}

type ByteDanceCaseStudyProps = {
  project: CaseStudyProject;
};

export function ByteDanceAiToolsCaseStudy({
  project,
}: ByteDanceCaseStudyProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ffffff] text-[#515154]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0, 0, 0,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(0, 0, 0,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f5f5f7_42%,#f5f5f7_100%)]" />
      <div className="absolute left-0 top-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-[#c7c7cc]/18 blur-3xl" />
      <div className="absolute right-0 top-24 -z-10 h-[22rem] w-[22rem] rounded-full bg-[#d2d2d7]/28 blur-3xl" />

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

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl md:leading-[1.04]">
              ByteDance PSAI
              <br />
              Empowering Procurement Decisions
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#6e6e73] md:text-xl">
              For product matching, comparison summaries, and pricing consultation in ByteDance procurement, delivered the product design and engineering of three AI tools, turning high-labor processes into more efficient, more stable AI workflows.
            </p>
          </div>

          <div className="relative min-h-[420px]">
            <div className="absolute inset-0 -z-10 rounded-[2.4rem] bg-[radial-gradient(circle_at_50%_50%,rgba(60,140,255,0.10),transparent_34%),radial-gradient(circle_at_18%_22%,rgba(0, 0, 0,0.12),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(120,230,221,0.16),transparent_26%)]" />
            <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2">
              <div className="h-full w-full animate-[byteTrackSpin_32s_linear_infinite] rounded-full border border-[#D6E7FF]/90" />
            </div>
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2">
              <div className="h-full w-full animate-[byteTrackSpinReverse_36s_linear_infinite] rounded-full border border-[#E6F0FF]/95" />
            </div>

            <GlassSurface className="absolute left-1/2 top-1/2 flex w-[260px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[2rem] border-white/80 bg-white/90 px-7 py-7 text-center shadow-[0_28px_70px_rgba(0, 0, 0,0.10),0_18px_50px_rgba(60,140,255,0.12)]">
              <img
                src="/ByteDance_logo_English.svg"
                alt="ByteDance"
                className="h-14 w-auto"
              />
              <h3 className="mt-4 text-[2rem] font-semibold tracking-tight text-[#1d1d1f]">
                Procurement
              </h3>
              <p className="mt-2 text-lg font-medium text-[#6e6e73]">
                Procurement AI Tool Matrix
              </p>
            </GlassSurface>

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1 top-9 rounded-[1.2rem] border border-[#3C8CFF]/15 bg-white/90 px-4 py-3 shadow-[0_16px_34px_rgba(0, 0, 0,0.08)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3C8CFF]">
                    <Tags className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1d1d1f]">Product Cleanup</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-1 top-16 rounded-[1.2rem] border border-[#3C8CFF]/15 bg-white/90 px-4 py-3 shadow-[0_16px_34px_rgba(0, 0, 0,0.08)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3C8CFF]">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="mt-1 text-sm font-semibold text-[#1d1d1f]">Supplier Comparison</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 left-6 rounded-[1.2rem] border border-[#3C8CFF]/15 bg-white/90 px-4 py-3 shadow-[0_16px_34px_rgba(0, 0, 0,0.08)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3C8CFF]">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1d1d1f]">Pricing Agent</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-full w-full animate-[byteTrackSpin_32s_linear_infinite]">
              <div className="absolute left-[20%] top-[18%] h-2.5 w-2.5 rounded-full bg-[#8EC5FF]/65" />
              <div className="absolute right-[18%] top-[26%] h-3 w-3 rounded-full bg-[#7DB7FF]/55" />
              <div className="absolute right-[22%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-[#5AA8FF]/55" />
              <div className="absolute left-[18%] bottom-[24%] h-3 w-3 rounded-full bg-[#00C8D2]/35" />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16 grid gap-8">
          <section>
            <div className="max-w-4xl">
              <SectionLabel>1. Business Problem</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.5rem] md:leading-[1.02]">
                Complex procurement scenarios, sensitive data, high demands on AI output stability
              </h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {problemCards.map((item) => {
                return (
                  <GlassSurface key={item.title} className="rounded-[1.8rem] p-6">
                    <h3 className="text-xl font-semibold text-[#1d1d1f]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#6e6e73]">
                      {item.description}
                    </p>
                  </GlassSurface>
                );
              })}
            </div>
          </section>

          <section>
            <div className="max-w-4xl">
              <SectionLabel>2. Three 0-to-1 AI Tools</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.5rem] md:leading-[1.02]">
                Three AI tools empowering procurement decisions
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-[#6e6e73]">
                From talent pricing to product normalization to supplier comparison, using AI to lower labor cost and improve the efficiency and consistency of procurement judgment.
              </p>
            </div>

            <div className="mt-8 grid gap-6">
              {toolProjects.map((item) => (
                <WarmSurface key={item.title} className="p-5 sm:p-6 lg:p-7">
                  {(() => {
                    const shouldAdjustTextGroup = item.previewType !== "matching";

                    return (
                  <div
                    className={`grid gap-6 lg:items-start ${
                      "lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-stretch"
                    }`}
                  >
                    <div className="flex h-full flex-col">
                      <h3 className="text-[1.75rem] font-semibold tracking-tight text-[#1d1d1f]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-[#6e6e73]">
                        {item.previewType === "summary"
                          ? "For sourcing and comparison, turns quote tables, historical rounds, and price details into AI summary capability, helping buyers quickly form a comparison judgment."
                          : item.summary}
                      </p>

                      <div className={shouldAdjustTextGroup ? "mt-8 space-y-3 lg:mt-9" : "mt-6 space-y-3"}>
                        <div className="rounded-[1.35rem] border border-black/5 bg-white/82 p-4">
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#86868b]">
                            PROBLEM
                          </p>
                          <p className="mt-2 text-sm leading-7 text-[#6e6e73]">
                            {item.previewType === "matching" || item.previewType === "agent"
                              ? item.problem
                              : "The sourcing system leaned toward quoting and negotiation workflow management; buyers still had to manually review quote tables, historical rounds, and anomalous prices, then compile comparison conclusions—time-consuming and easy to miss key changes."}
                          </p>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/5 bg-white/82 p-4">
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#86868b]">
                            SOLUTION
                          </p>
                          <p className="mt-2 text-sm leading-7 text-[#6e6e73]">
                            {item.previewType === "matching" || item.previewType === "agent"
                              ? item.solution
                              : "Contributed to context design and output constraints, splitting input into four types—comparison template, current comparison metrics, historical quote rounds, and price detail data—so the LLM generates a PE1 objective summary and PE2 negotiation advice under a clear data protocol."}
                          </p>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/5 bg-white/82 p-4">
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#86868b]">
                            RESULT
                          </p>
                          <p className="mt-2 text-sm leading-7 text-[#6e6e73]">
                            {item.previewType === "matching" || item.previewType === "agent"
                              ? item.result
                              : "Upgraded the system from a workflow tool into a data-analysis and negotiation-assist tool that auto-generates current-price summaries, multi-round change summaries, and negotiation advice; PE1 and PE2 are evaluated separately, with an MOS target accuracy of no less than 90%."}
                          </p>
                        </div>
                      </div>

                      {item.previewType === "matching" || item.previewType === "summary" ? null : (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {(item.chips ?? []).map((chip) => (
                            <CapabilityChip
                              key={chip}
                              className="bg-white/86 px-3 py-2 tracking-normal"
                            >
                              {chip}
                            </CapabilityChip>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="h-full">
                      <ToolPreview type={item.previewType} />
                    </div>
                  </div>
                    );
                  })()}
                </WarmSurface>
              ))}
            </div>
          </section>

          <section>
            <div className="max-w-4xl">
              <SectionLabel>3. Methodology</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.5rem] md:leading-[1.02]">
                From business understanding to AI product delivery
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-[#6e6e73]">
                In a highly specialized domain like procurement, break business problems into AI workflows and deliver ready-to-use tools to the team through code.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {methodCards.map((item) => {
                const Icon = item.icon;

                return (
                  <GlassSurface key={item.title} className="rounded-[1.8rem] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f5f7] text-[#0071e3]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#1d1d1f]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#6e6e73]">
                      {item.description}
                    </p>
                  </GlassSurface>
                );
              })}
            </div>
          </section>

        </div>
      </div>
      <style jsx>{`
        @keyframes byteTrackSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes byteTrackSpinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </main>
  );
}
