"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CircleAlert,
  BadgeCheck,
  Bot,
  Database,
  FileSearch,
  ArrowRight,
  UserRound,
} from "lucide-react";
import { GlassSurface } from "@/components/design-system";
import type { CaseStudyProject } from "@/data/projects";

const toolProjects = [
  {
    index: "01",
    kicker: "Talent Pricing Agent",
    heading: "Turning scattered celebrity deal records into comparable pricing references",
    problem:
      "Historical celebrity collaboration quotes were scattered across sourcing-request records, making it hard for buyers to find comparable deals by talent tier, collaboration type, and budget.",
    built:
      "An AI pricing reference tool that structures historical sourcing records and retrieves comparable cases by talent, collaboration type, tier, and budget, then returns a reference price range. It also folds in audience signals and public-information summaries to support talent classification.",
    shipped:
      "I developed the workflow end to end: prompt-based field extraction from historical sourcing records, Python/Playwright data collection, pandas-based Excel batch processing, knowledge-base ingestion, and an AI query workflow for retrieving comparable cases.",
    metrics: [
      { value: "10x", label: "Faster consultation" },
      { value: "90%+", label: "Case coverage accuracy" },
    ],
    previewType: "agent" as const,
  },
  {
    index: "02",
    kicker: "Product Information Cleanup",
    heading: "The same product arrived under a dozen different names",
    problem:
      "Supplier records came in with messy name, unit, spec and price fields. The same item could be written many ways, so the team matched standard SKUs one row at a time.",
    built:
      "A RAG SKU mapping knowledge base that splits raw rows into structured fields, retrieves candidates, then combines rule scoring with LLM judgment. Low-score matches never write through to the table.",
    shipped:
      "Python for parsing and write-back into a multi-dimensional table. Scoring thresholds were tuned against real supplier data rather than guessed.",
    metrics: [
      { value: "96.45%", label: "Matching accuracy" },
      { value: "100%", label: "Traceable output" },
    ],
    previewType: "matching" as const,
  },
  {
    index: "03",
    kicker: "Supplier Comparison AI Summary",
    heading: "Buyers wrote every comparison summary themselves",
    problem:
      "The sourcing system managed quotes but stopped short of analysis. Buyers read quote tables and historical rounds themselves, compiled the comparison by hand, and often missed price changes.",
    built:
      "Split the input into four context types so the model returns an objective summary and negotiation advice as separate outputs, each one bound to the quote data behind it.",
    shipped:
      "A strict data protocol and output constraints in code, with the summary and the advice evaluated as separate tasks against an MOS target.",
    metrics: [
      { value: "90%+", label: "MOS target accuracy" },
      { value: "2", label: "Separately scored outputs" },
    ],
    previewType: "summary" as const,
  },
];

const matchingSteps = [
  { label: "Structured Fields", icon: Database },
  { label: "KB Retrieval", icon: FileSearch },
  { label: "Score & Write-back", icon: BadgeCheck },
];

function MatchingPreview() {
  return (
    <GlassSurface className="h-full rounded-[1.6rem] border-black/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-2">
          {matchingSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.label} className="relative rounded-[1rem] border border-black/5 bg-white/88 px-3 py-3 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#0071e3]">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-2 text-[12px] font-semibold leading-4 text-[#1d1d1f]">{step.label}</p>
                {index < matchingSteps.length - 1 ? (
                  <div className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 text-[#c7c7cc] sm:block">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
              Raw Input
            </p>
            <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
              Normalized Output
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.05rem] border border-black/5 bg-white/88">
            {[
              ["Want Want Rice Crackers Original 435g Black Rice Family Pack", "Want Want Black Rice Crackers 425g", "100"],
              ["Pan Pan Breakfast Crispy Crackers Sea Salt 600g/case", "Pan Pan Crispy Crackers Seaweed 600g/case", "80"],
              ["Glico Pocky Chocolate 48g*5 sticks", "No confident match", "0"],
            ].map((row, index) => (
              <div
                key={row[0]}
                className={`grid grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)_2rem] items-center gap-2 px-3 py-3 text-[11px] leading-4 ${
                  index < 2 ? "border-b border-black/5" : ""
                }`}
              >
                <span className="min-w-0 text-[#86868b]">{row[0]}</span>
                <ArrowRight className="h-3 w-3 text-[#c7c7cc]" />
                <span
                  className={`min-w-0 font-medium ${
                    row[2] === "0" ? "text-[#86868b]" : "text-[#1d1d1f]"
                  }`}
                >
                  {row[1]}
                </span>
                <span
                  className={`text-right font-semibold ${
                    row[2] === "0" ? "text-red-500" : "text-[#0071e3]"
                  }`}
                >
                  {row[2]}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] leading-5 text-[#86868b]">
            Scores below the threshold stay out of the table instead of writing a wrong match.
          </p>
        </div>
      </div>

    </GlassSurface>
  );
}

function SummaryPreview() {
  return (
    <GlassSurface className="h-full overflow-hidden rounded-[1.7rem] border-black/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="space-y-5">
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
            Quotes In
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["Supplier A", "¥128,000"],
              ["Supplier B", "¥121,500"],
              ["Supplier C", "¥136,000"],
            ].map((row) => (
              <div
                key={row[0]}
                className="rounded-[0.95rem] border border-black/5 bg-white/88 px-3 py-3"
              >
                <p className="text-[11px] text-[#86868b]">{row[0]}</p>
                <p className="mt-1 text-[13px] font-semibold text-[#1d1d1f]">{row[1]}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
            Two Separate Outputs
          </p>
          <div className="mt-3 space-y-2">
            <div className="rounded-[1rem] border border-black/5 bg-white/90 p-4">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#1d1d1f]">Objective summary</p>
                <span className="text-[10px] font-medium tracking-[0.14em] text-[#86868b]">
                  NO ADVICE
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-6 text-[#6e6e73]">
                Supplier B holds the lowest quote at ¥121,500. Supplier A runs ¥6,500 higher with a shorter delivery cycle.
              </p>
            </div>

            <div className="rounded-[1rem] border border-black/5 bg-white/90 p-4">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#1d1d1f]">Negotiation advice</p>
                <span className="text-[10px] font-medium tracking-[0.14em] text-[#86868b]">
                  PRICE DATA ONLY
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-6 text-[#6e6e73]">
                Lead with Supplier B and keep A as backup. Push B on delivery terms, and check C for an anomalous line item.
              </p>
            </div>
          </div>
          <p className="mt-2 text-[11px] leading-5 text-[#86868b]">
            Each output is scored on its own so a confident summary never carries an unsupported recommendation.
          </p>
        </div>
      </div>
    </GlassSurface>
  );
}

function AgentPreview() {
  const userQuery =
    "We're considering Pengwei Fu for a 5-minute guest set at TikTok Community Fest. What's a recent reference price?";

  const peerCases = [
    ["Case A", "¥160k - ¥190k", "TikTok LIVE event / 5min / guest appearance"],
    ["Case B", "¥200k - ¥240k", "Brand livestream / 10min / hosted segment"],
  ];

  return (
    <GlassSurface className="h-full overflow-hidden rounded-[1.7rem] border-black/5 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.05)]">
      <div className="space-y-4">
        <div className="rounded-[1.2rem] border border-black/10 bg-[#f5f5f7]/75 px-4 py-3">
          <div className="flex items-center gap-3 text-[12px] leading-6">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#0071e3]">
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
          <div className="mt-3 space-y-2">
            <div className="rounded-[1rem] border border-black/5 bg-white/90 p-4">
              <div className="text-[12px] font-semibold text-[#1d1d1f]">Talent Profile</div>
              <p className="mt-2 text-[11px] leading-5 text-[#6e6e73]">
                Pengwei Fu. AI product intern and content creator. Posts witty skits about
                the daily life of an AI product manager, building a loyal comedy audience online.
              </p>
            </div>

            <div className="rounded-[1rem] border border-black/5 bg-white/90 p-4">
              <div className="text-[12px] font-semibold text-[#1d1d1f]">Comparable Cases</div>
              <div className="mt-3 space-y-2">
                {peerCases.map((row) => (
                  <div
                    key={row[0]}
                    className="flex items-center justify-between rounded-[0.95rem] border border-black/5 bg-[#f5f5f7]/45 px-3 py-2.5 text-[11px]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-[#1d1d1f]">{row[0]}</span>
                      <span className="text-[#6e6e73]">{row[2]}</span>
                    </div>
                    <span className="shrink-0 font-semibold text-[#1d1d1f]">{row[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1rem] border border-black/5 bg-white/90 px-4 py-4 text-[12px] leading-6 text-[#6e6e73]">
              <p className="font-medium text-[#1d1d1f]">Reference range</p>
              <p className="mt-2">
                <span className="text-[1.35rem] font-semibold text-[#0071e3]">¥180k - ¥210k</span>
              </p>
              <p className="mt-1 text-[11px] text-[#86868b]">
                Tier A talent, with audience scale and engagement rate in the top quartile. Drawn from comparable deals in the last 3 months.
              </p>
            </div>

            <div className="rounded-[1rem] border border-black/10 bg-[#f5f5f7]/70 px-4 py-4 text-[12px] leading-6 text-[#6e6e73]">
              <div className="flex items-center gap-2 font-medium text-[#1d1d1f]">
                <CircleAlert className="h-4 w-4 text-[#86868b]" />
                Reputation note
              </div>
              <p className="mt-2 text-[11px] leading-6">
                A coworker reported that Pengwei dozed off during an AI-product requirements
                review. Worth watching how the sentiment trends before you commit.
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

        <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl md:leading-[1.12]">
              <span className="block">ByteDance</span>
              <span className="block">
                <span>Procurement </span>
                <span className="bg-gradient-to-r from-[#0071e3] via-[#af52de] via-[#ff2d55] to-[#ff9500] bg-clip-text text-transparent">
                  AI Tools
                </span>
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#6e6e73] md:text-lg">
              Shipped three 0-to-1 AI tools for a procurement team, taking pricing, product cleanup and supplier comparison off manual work. Owned the product judgment and wrote the code.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[1.6rem]">
            <img
              src="/images/A_clean_3D_rendered_illustrati_2026-08-09T02-36-04.png"
              alt="Three procurement AI tools feeding into one decision surface"
              className="h-full w-full scale-[1.12] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
            />
          </div>
        </section>

        <div className="mt-20 grid gap-16">
          {toolProjects.map((item) => (
            <section key={item.index}>
              <div className="max-w-3xl">
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] font-semibold tracking-[0.02em] text-[#0071e3]">
                    {item.index}
                  </span>
                  <span className="text-[13px] font-medium tracking-[0.01em] text-[#86868b]">
                    {item.kicker}
                  </span>
                </div>
                <h2 className="mt-2 text-[2rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.5rem] md:leading-[1.06]">
                  {item.heading}
                </h2>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
                <div className="flex flex-col gap-6">
                  <p className="text-base leading-8 text-[#6e6e73]">
                    {item.problem}
                  </p>

                  <div className="grid gap-4">
                    <div>
                      <p className="text-[12px] font-semibold tracking-[0.14em] text-[#86868b]">
                        WHAT I BUILT
                      </p>
                      <p className="mt-2 text-[15px] leading-7 text-[#6e6e73]">
                        {item.built}
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold tracking-[0.14em] text-[#86868b]">
                        HOW I SHIPPED IT
                      </p>
                      <p className="mt-2 text-[15px] leading-7 text-[#6e6e73]">
                        {item.shipped}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-8 border-t border-black/[0.07] pt-6">
                    {item.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="text-[2rem] font-semibold tracking-tight text-[#1d1d1f]">
                          {metric.value}
                        </p>
                        <p className="mt-1 text-[13px] text-[#86868b]">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:sticky lg:top-8">
                  <ToolPreview type={item.previewType} />
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
