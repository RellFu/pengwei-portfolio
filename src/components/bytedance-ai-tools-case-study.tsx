"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CircleAlert,
  ChevronRight,
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
    kicker: "Entity-matching RAG",
    heading: "Turning inconsistent product listings into standard SKUs",
    problem:
      "External product listings changed frequently because of inconsistent naming, relisting, and packaging updates. Analysts had to map each row manually to a stable internal SKU before the data could support price comparison and cost analysis.",
    built:
      "I built an entity-matching RAG workflow. Each product name becomes a query key for hybrid retrieval and reranking against a standard-SKU knowledge base. The workflow augments the raw record with five candidate items, scores them against predefined business rules, and selects the best match.",
    shipped:
      "I designed the knowledge base with one canonical product mapping per retrieval unit, each bound to its SKU, specification, flavor, and awarded price. I implemented the retrieval, scoring, threshold control, structured output, and multidimensional-table write-back workflow end to end.",
    metrics: [
      { value: "92.42%", label: "Accuracy on 132 labeled records" },
      { value: "<1 min", label: "Processing and write-back for the batch" },
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

const ragStages = [
  { stage: "R", title: "RETRIEVE", body: "Hybrid Search" },
  { stage: "A", title: "AUGMENT", body: "Candidates + Rules" },
  { stage: "G", title: "SCORE", body: "100 · 80 · 60 · 40 · 0" },
];

const kbSlice = [
  ["Canonical name", "Black Rice Crackers"],
  ["Standard SKU", "100303701"],
  ["Specification", "425g"],
  ["Flavor", "Original"],
  ["Awarded price", "¥12.80"],
];

const retrievedCandidates = [
  { name: "Black Rice Crackers · 425g · Original", score: "100", decision: "Selected" },
  { name: "Black Rice Crackers · 400g · Original", score: "40", decision: "Rejected" },
  { name: "Rice Crackers · 425g · Seaweed", score: "0", decision: "Rejected" },
];

function MatchingPreview() {
  return (
    <GlassSurface className="h-full rounded-[1.6rem] border-black/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="space-y-4">
        {/* Horizontal RAG pipeline */}
        <div className="rounded-[1.1rem] border border-black/5 bg-white/88 px-3 py-3.5">
          {/* Inputs feeding into Retrieve */}
          <div className="flex items-stretch gap-2">
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="rounded-[0.7rem] border border-black/[0.07] bg-[#f5f5f7]/60 px-2.5 py-2">
                <p className="text-[10.5px] font-semibold leading-4 text-[#1d1d1f]">Raw Row</p>
                <p className="text-[9.5px] leading-4 text-[#86868b]">Name · Price</p>
              </div>
              <div className="rounded-[0.7rem] border border-dashed border-[#0071e3]/30 bg-[#0071e3]/[0.05] px-2.5 py-2">
                <p className="text-[10.5px] font-semibold leading-4 text-[#1d1d1f]">Standard SKU KB</p>
                <p className="text-[9.5px] leading-4 text-[#86868b]">Name · SKU · Price</p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center justify-center px-0.5">
              <ChevronRight className="h-3.5 w-3.5 text-[#c7c7cc]" />
              <span className="mt-0.5 text-[9px] font-medium text-[#a1a1a6]">Top 5</span>
            </div>

            {/* R A G stages */}
            <div className="flex flex-[2.2] items-center gap-1">
              {ragStages.map((step, index) => (
                <div key={step.stage} className="flex min-w-0 flex-1 items-center gap-1">
                  <div className="min-w-0 flex-1 rounded-[0.7rem] border border-black/[0.07] bg-[#f5f5f7]/60 px-2 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="flex h-[15px] w-[15px] items-center justify-center rounded-[4px] bg-[#0071e3] text-[9px] font-bold text-white">
                        {step.stage}
                      </span>
                      <p className="text-[10px] font-semibold leading-3 tracking-[0.04em] text-[#1d1d1f]">
                        {step.title}
                      </p>
                    </div>
                    <p className="mt-1 text-[9px] leading-3 text-[#86868b]">{step.body}</p>
                  </div>
                  {index < ragStages.length - 1 ? (
                    <ChevronRight className="h-3 w-3 shrink-0 text-[#c7c7cc]" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Decision branch */}
          <div className="mt-2 flex items-stretch gap-2">
            <div className="flex flex-1 items-center justify-center rounded-[0.7rem] border border-black/[0.07] bg-[#f5f5f7]/60 px-2.5 py-2">
              <p className="text-[10.5px] font-semibold leading-4 text-[#1d1d1f]">Select Top 1</p>
            </div>
            <div className="flex shrink-0 items-center px-0.5">
              <ChevronRight className="h-3.5 w-3.5 text-[#c7c7cc]" />
            </div>
            <div className="flex flex-[2.2] gap-1.5">
              <div className="min-w-0 flex-1 rounded-[0.7rem] border border-[#0071e3]/20 bg-[#0071e3]/[0.06] px-2.5 py-2">
                <p className="text-[10.5px] font-semibold leading-4 text-[#0071e3]">Write Back</p>
                <p className="text-[9.5px] leading-4 text-[#86868b]">SKU · Price · Score</p>
              </div>
              <div className="min-w-0 flex-1 rounded-[0.7rem] border border-black/[0.07] bg-[#f5f5f7]/50 px-2.5 py-2">
                <p className="text-[10.5px] font-semibold leading-4 text-[#86868b]">No Match</p>
                <p className="text-[9.5px] leading-4 text-[#a1a1a6]">Held for review</p>
              </div>
            </div>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-black/5 pt-2.5">
            <span className="rounded-full border border-[#0071e3]/25 bg-[#0071e3]/[0.06] px-2 py-0.5 text-[9.5px] font-medium text-[#0071e3]">
              Structured JSON, not a chat response
            </span>
            <span className="text-[9.5px] text-[#a1a1a6]">
              One canonical product mapping per retrieval unit
            </span>
          </div>
        </div>

        {/* Knowledge base slice */}
        <div className="rounded-[1.05rem] border border-black/5 bg-white/88 px-3 py-2.5">
          <p className="text-[11px] font-semibold text-[#1d1d1f]">
            Knowledge Base Record
          </p>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
            {kbSlice.map(([key, value]) => (
              <div key={key} className="flex justify-between gap-2 text-[10px] leading-4">
                <span className="text-[#86868b]">{key}</span>
                <span className="font-medium text-[#1d1d1f]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Entity matching example */}
        <div>
          <p className="text-[12px] font-semibold text-[#1d1d1f]">
            Entity Matching Example
          </p>
          <p className="mt-1.5 rounded-[0.7rem] bg-[#f5f5f7]/70 px-2.5 py-1.5 text-[10.5px] leading-4 text-[#6e6e73]">
            Query key: Want Want Black Rice Crackers 425g Family Pack
          </p>

          <div className="mt-2.5 overflow-hidden rounded-[1.05rem] border border-black/5 bg-white/88">
            <div className="grid grid-cols-[minmax(0,1fr)_2.2rem_3.6rem] gap-2 border-b border-black/5 bg-[#f5f5f7]/60 px-3 py-2 text-[10px] font-medium tracking-[0.08em] text-[#86868b]">
              <span>RETRIEVED CANDIDATES</span>
              <span className="text-right">SCORE</span>
              <span className="text-right">DECISION</span>
            </div>
            {retrievedCandidates.map((row, index) => {
              const selected = row.decision === "Selected";

              return (
                <div
                  key={row.name}
                  className={`grid grid-cols-[minmax(0,1fr)_2.2rem_3.6rem] items-center gap-2 px-3 py-2.5 text-[11px] leading-4 ${
                    index < retrievedCandidates.length - 1 ? "border-b border-black/5" : ""
                  }`}
                >
                  <span className={`min-w-0 ${selected ? "font-medium text-[#1d1d1f]" : "text-[#86868b]"}`}>
                    {row.name}
                  </span>
                  <span
                    className={`text-right font-semibold ${
                      selected ? "text-[#0071e3]" : "text-[#86868b]"
                    }`}
                  >
                    {row.score}
                  </span>
                  <span
                    className={`text-right text-[10px] font-medium ${
                      selected ? "text-[#0071e3]" : "text-[#a1a1a6]"
                    }`}
                  >
                    {row.decision}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Final structured write-back */}
          <div className="mt-2.5 rounded-[1.05rem] border border-[#0071e3]/20 bg-[#0071e3]/[0.05] px-3 py-3">
            <p className="text-[10px] font-medium tracking-[0.08em] text-[#0071e3]">
              STRUCTURED WRITE-BACK
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
              {[
                ["Standard item", "Black Rice Crackers, 425g"],
                ["Standard SKU", "100303701"],
                ["Awarded price", "¥12.80"],
                ["Match score", "100"],
              ].map(([key, value]) => (
                <div key={key}>
                  <p className="text-[10px] leading-4 text-[#86868b]">{key}</p>
                  <p className="text-[11px] font-medium leading-4 text-[#1d1d1f]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-2 text-[11px] leading-5 text-[#86868b]">
            The workflow retrieves five candidates, scores each against predefined business
            rules, selects the highest-confidence match, and writes back the metadata bound
            to that standard SKU.
          </p>
          <p className="mt-1.5 text-[10.5px] leading-4 text-[#a1a1a6]">
            Illustrative example using anonymized data.
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

function ByteDanceMark() {
  // Four bars matching the ByteDance logo palette and proportions
  const bars = [
    { color: "#3259b4", height: 15, delay: "0ms" },
    { color: "#3c8cff", height: 8, delay: "140ms" },
    { color: "#00c8d2", height: 10, delay: "280ms" },
    { color: "#78e6dd", height: 17, delay: "420ms" },
  ];

  return (
    <div className="flex h-[18px] items-center gap-[2px]">
      {bars.map((bar) => (
        <span
          key={bar.color}
          className="w-[2.5px] rounded-[1px]"
          style={{
            height: `${bar.height}px`,
            backgroundColor: bar.color,
            animation: `byteBarPulse 900ms ease-in-out ${bar.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

function AgentPreview() {
  const userQuery =
    "We're considering Pengwei Fu for a 5-minute guest set at TikTok Community Fest. What's a recent reference price?";

  const peerCases = [
    ["Case A", "¥160k - ¥190k", "TikTok LIVE event / 5min / guest appearance"],
    ["Case B", "¥200k - ¥240k", "Brand livestream / 10min / hosted segment"],
  ];

  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState({ profile: 0, tier: 0, reputation: 0 });
  const [visibleSections, setVisibleSections] = useState({
    aiBubble: false,
    thinking: false,
    profile: false,
    cases: false,
    refRange: false,
    reputation: false,
  });
  const startedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const profileText =
    "Pengwei Fu. AI product intern and content creator. Posts witty skits about the daily life of an AI product manager, building a loyal comedy audience online.";

  const tierText = "Signal tier: A";

  const reputationText =
    "A coworker reported that Pengwei dozed off during a PRD review. Worth watching how the sentiment trends before you commit.";

  const startAnimation = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // Phase 1: show user bubble
    setTimeout(() => setPhase(1), 200);

    // Phase 2: AI bubble appears with the analyzing state
    setTimeout(() => {
      setVisibleSections((s) => ({ ...s, aiBubble: true, thinking: true }));
      setPhase(2);
    }, 800);

    // Phase 3: after 3s of analyzing, start streaming the answer
    setTimeout(() => {
      setVisibleSections((s) => ({ ...s, thinking: false, profile: true }));
      setPhase(3);
    }, 3800);

    // Phase 4: show Comparable Cases (after profile + tier finish typing)
    setTimeout(() => {
      setVisibleSections((s) => ({ ...s, cases: true }));
    }, 6900);

    // Phase 5: show Reference range (no typing, just price)
    setTimeout(() => {
      setVisibleSections((s) => ({ ...s, refRange: true }));
      setPhase(4);
    }, 7500);

    // Phase 6: show + type Reputation note
    setTimeout(() => {
      setVisibleSections((s) => ({ ...s, reputation: true }));
      setPhase(5);
    }, 8100);

    // Mark complete
    setTimeout(() => setPhase(6), 9800);
  }, []);

  // Poll element position every frame. No scroll events, no missed samples, no race with scroll-to-top.
  useEffect(() => {
    let rafId = 0;
    const mountedAt = performance.now();

    const tick = () => {
      if (startedRef.current) return;

      // Grace period so the scroll-to-top logic settles first
      if (performance.now() - mountedAt < 600) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        // Fire when the preview block has scrolled up near the viewport top
        if (rect.top <= 140 && rect.bottom > 0) {
          startAnimation();
          return;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [startAnimation]);

  // Typewriter effect for each text block
  useEffect(() => {
    if (phase === 3) {
      if (typed.profile < profileText.length) {
        const t = setInterval(
          () =>
            setTyped((prev) => ({
              ...prev,
              profile: Math.min(prev.profile + 2, profileText.length),
            })),
          25
        );
        return () => clearInterval(t);
      }
      if (typed.tier < tierText.length) {
        const t = setInterval(
          () =>
            setTyped((prev) => ({
              ...prev,
              tier: Math.min(prev.tier + 1, tierText.length),
            })),
          40
        );
        return () => clearInterval(t);
      }
    }
  }, [phase, typed.profile, typed.tier, profileText.length, tierText.length]);

  useEffect(() => {
    if (phase === 5 && typed.reputation < reputationText.length) {
      const t = setInterval(
        () =>
          setTyped((prev) => ({
            ...prev,
            reputation: Math.min(prev.reputation + 2, reputationText.length),
          })),
        20
      );
      return () => clearInterval(t);
    }
  }, [phase, typed.reputation, reputationText.length]);

  return (
    <div ref={containerRef} className="space-y-4">
      {/* User message: avatar outside on the right, bubble left-aligned with AI */}
      <div
        className={`flex items-center justify-end gap-3 pl-[2.75rem] transition-all duration-500 ${
          phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <div
          className="rounded-[1.2rem] border border-[#0071e3]/25 bg-[#0071e3]/14 px-4 py-3 shadow-[0_4px_20px_rgba(0,113,227,0.08)]"
          style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        >
          <span className="text-[12px] leading-6 font-medium text-[#1d1d1f]">{userQuery}</span>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0071e3] text-white shadow-[0_2px_10px_rgba(0,113,227,0.25)]">
          <UserRound className="h-4 w-4" />
        </div>
      </div>

      {/* AI response: avatar outside top-left */}
      {visibleSections.aiBubble && (
        <div
          className={`flex items-start gap-3 pr-[2.75rem] transition-all duration-500 ${
            phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white border border-black/10 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <ByteDanceMark />
          </div>
          <div
            className="rounded-[1.2rem] border border-white/60 bg-white/80 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] overflow-visible flex-1"
            style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
          >
            <div className="space-y-2 overflow-visible">
            {/* Analyzing state */}
            {visibleSections.thinking && (
              <div className="flex items-center gap-2.5 rounded-[1rem] border border-black/5 bg-[#f5f5f7]/60 px-4 py-3">
                <span className="flex gap-1">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#86868b]"
                    style={{ animation: "heroDot 1.2s ease-in-out 0ms infinite" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#86868b]"
                    style={{ animation: "heroDot 1.2s ease-in-out 200ms infinite" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#86868b]"
                    style={{ animation: "heroDot 1.2s ease-in-out 400ms infinite" }}
                  />
                </span>
                <span className="text-[11px] text-[#86868b]">
                  Analyzing historical sourcing records
                </span>
              </div>
            )}

            {/* Talent Profile */}
            {visibleSections.profile && (
              <div
                className={`rounded-[1rem] border border-black/5 bg-white/90 p-4 transition-all duration-400`}
                style={{ opacity: visibleSections.profile ? 1 : 0 }}
              >
                <div className="text-[12px] font-semibold text-[#1d1d1f]">Talent Profile</div>
                <p className="mt-2 text-[11px] leading-5 text-[#6e6e73]">
                  {profileText.slice(0, typed.profile)}
                </p>
                <p className="mt-1 text-[11px] leading-5 text-[#86868b]">
                  {tierText.slice(0, typed.tier)}
                </p>
              </div>
            )}

            {/* Comparable Cases */}
            {visibleSections.cases && (
              <div
                className={`rounded-[1rem] border border-black/5 bg-white/90 p-4 transition-opacity duration-400`}
              >
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
            )}

            {/* Reference range */}
            {visibleSections.refRange && (
              <div className="rounded-[1rem] border border-black/5 bg-white/90 px-4 py-4 text-[12px] leading-6 text-[#6e6e73] overflow-visible">
                <p className="font-medium text-[#1d1d1f]">Reference range</p>
                <p className="mt-2">
                  <span className="text-[1.35rem] font-semibold text-[#0071e3]">¥180k - ¥210k</span>
                </p>
              </div>
            )}

            {/* Reputation note */}
            {visibleSections.reputation && (
              <div className="rounded-[1rem] border border-black/10 bg-[#f5f5f7]/70 px-4 py-4 text-[12px] leading-6 text-[#6e6e73]">
                <div className="flex items-center gap-2 font-medium text-[#1d1d1f]">
                  <CircleAlert className="h-4 w-4 text-[#86868b]" />
                  Reputation note
                </div>
                <p className="mt-2 text-[11px] leading-6">
                  {reputationText.slice(0, typed.reputation)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
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
  // Force scroll to top on page entry (override Next.js scroll restoration)
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    const t = setTimeout(() => {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = prevBehavior;
    }, 0);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
      html.style.scrollBehavior = prevBehavior;
    };
  }, []);

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
                      <p className="text-[15px] font-semibold tracking-[0.06em] text-[#1d1d1f]">
                        What I built
                      </p>
                      <p className="mt-2 text-[15px] leading-7 text-[#6e6e73]">
                        {item.built}
                      </p>
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold tracking-[0.06em] text-[#1d1d1f]">
                        How I shipped it
                      </p>
                      <p className="mt-2 text-[15px] leading-7 text-[#6e6e73]">
                        {item.shipped}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end gap-10 border-t border-black/[0.07] pt-4">
                    {item.metrics.map((metric) => (
                      <div key={metric.label} className="min-w-[5rem]">
                        <p className="text-[2rem] font-semibold tracking-tight text-[#1d1d1f] leading-none">
                          {metric.value}
                        </p>
                        <p className="mt-1.5 text-[13px] text-[#86868b]">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:sticky lg:top-8 overflow-visible">
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
