"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CircleAlert,
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
      "I designed the knowledge base with one canonical product mapping per retrieval unit, each bound to its SKU, pack size, flavor, and awarded price. Retrieval only finds similar products, so scoring is what identifies the same SKU. Candidates that read almost the same still fail on a single attribute, and the score has to carry that reason. I built the retrieval, scoring, threshold control, and JSON write-back end to end.",
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

const ragStages: { stage: string; title: string; body: string; body2?: string }[] = [
  { stage: "R", title: "Candidate Recall", body: "Hybrid Search · Top 5" },
  { stage: "A", title: "Attribute Scoring", body: "Name · Brand · Pack", body2: "Flavor · Price" },
  { stage: "G", title: "Structured Match", body: "Top 1 · Score · Reason" },
];

const RAG_SURFACE = "#f5f5f7";
const RAG_HAIRLINE = "rgba(0,0,0,0.07)";
const RAG_CONNECTOR = "#c7c7cc";
const RAG_INK = "#1d1d1f";
const RAG_MUTED = "#86868b";
const RAG_FAINT = "#a1a1a6";
const RAG_ACCENT = "#0071e3";

function RagStageNode({
  x,
  y,
  width,
  height,
  stage,
  title,
  body,
  body2,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  stage: string;
  title: string;
  body: string;
  body2?: string;
}) {
  const cx = x + width / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={13}
        fill={RAG_SURFACE}
        stroke={RAG_HAIRLINE}
      />
      {/* Stage letter and title on one centered line: "R · Candidate Recall" */}
      <text x={cx} y={y + 25} textAnchor="middle" dominantBaseline="middle">
        <tspan fontSize="23" fontWeight="700" fill={RAG_ACCENT}>
          {stage}
        </tspan>
        <tspan fontSize="18" fill={RAG_FAINT}>
          {" · "}
        </tspan>
        <tspan fontSize="18" fontWeight="600" fill={RAG_INK}>
          {title}
        </tspan>
      </text>
      <text
        x={cx}
        y={y + 47}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="18"
        fill={RAG_MUTED}
      >
        {body}
      </text>
      {body2 ? (
        <text
          x={cx}
          y={y + 65}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="18"
          fill={RAG_MUTED}
        >
          {body2}
        </text>
      ) : null}
    </g>
  );
}

function RagDecisionNode({
  cx,
  cy,
  halfWidth,
  halfHeight,
  label,
}: {
  cx: number;
  cy: number;
  halfWidth: number;
  halfHeight: number;
  label: string;
}) {
  const points = [
    `${cx},${cy - halfHeight}`,
    `${cx + halfWidth},${cy}`,
    `${cx},${cy + halfHeight}`,
    `${cx - halfWidth},${cy}`,
  ].join(" ");

  return (
    <g>
      <polygon points={points} fill={RAG_SURFACE} stroke={RAG_HAIRLINE} />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="18"
        fontWeight="600"
        fill={RAG_INK}
      >
        {label}
      </text>
    </g>
  );
}

function RagIoNode({
  x,
  y,
  width,
  height,
  title,
  body,
  tone = "neutral",
  shape = "card",
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  body: string;
  tone?: "neutral" | "accent" | "quiet";
  shape?: "card" | "cylinder";
}) {
  const fill = tone === "accent" ? "rgba(0,113,227,0.06)" : RAG_SURFACE;
  const stroke = tone === "accent" ? "rgba(0,113,227,0.22)" : RAG_HAIRLINE;
  const titleFill =
    tone === "accent" ? RAG_ACCENT : tone === "quiet" ? RAG_MUTED : RAG_INK;
  const bodyFill = tone === "quiet" ? RAG_FAINT : RAG_MUTED;

  if (shape === "cylinder") {
    const capRy = Math.min(height / 2, 12);
    const bodyTop = y + capRy;
    const bodyBottom = y + height - capRy;
    const cx = x + width / 2;
    const rx = width / 2;

    return (
      <g>
        {/* body fill only, no stroke: avoids a straight seam under the top ellipse */}
        <path
          d={`M ${x} ${bodyTop} L ${x} ${bodyBottom} A ${rx} ${capRy} 0 0 0 ${x + width} ${bodyBottom} L ${x + width} ${bodyTop} Z`}
          fill={fill}
        />
        {/* left and right side edges */}
        <line x1={x} y1={bodyTop} x2={x} y2={bodyBottom} stroke={stroke} />
        <line x1={x + width} y1={bodyTop} x2={x + width} y2={bodyBottom} stroke={stroke} />
        {/* visible front curve of the base */}
        <path
          d={`M ${x} ${bodyBottom} A ${rx} ${capRy} 0 0 0 ${x + width} ${bodyBottom}`}
          fill="none"
          stroke={stroke}
        />
        {/* top face: a real ellipse, fully stroked as its own rim */}
        <ellipse cx={cx} cy={bodyTop} rx={rx} ry={capRy} fill={fill} stroke={stroke} />
        <text x={x + 16} y={y + height / 2 - 2} fontSize="19" fontWeight="600" fill={titleFill}>
          {title}
        </text>
        <text x={x + 16} y={y + height / 2 + 18} fontSize="18" fill={bodyFill}>
          {body}
        </text>
      </g>
    );
  }

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={13} fill={fill} stroke={stroke} />
      <text x={x + 16} y={y + 27} fontSize="19" fontWeight="600" fill={titleFill}>
        {title}
      </text>
      <text x={x + 16} y={y + 48} fontSize="18" fill={bodyFill}>
        {body}
      </text>
    </g>
  );
}

function RagFlowDiagram() {
  return (
    <div className="rounded-[1.5rem] border border-black/5 bg-white/70 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1624 232"
          role="img"
          aria-label="A raw row becomes a query key and the standard SKU knowledge base is searched. Candidate recall returns the top five, attribute scoring compares name, brand, spec, flavor and price, and structured match returns the top result with a score and reason. If the best score is at least 40 the record is written back, otherwise it is flagged for review."
          className="h-auto w-full min-w-[980px]"
        >
          <defs>
            <marker
              id="ragArrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={RAG_CONNECTOR} />
            </marker>
          </defs>

          <g fill="none" stroke={RAG_CONNECTOR} strokeWidth="1.4" markerEnd="url(#ragArrow)">
            {/* Raw Row and KB both feed Candidate Recall */}
            <path d="M312 40 C 330 40, 328 104, 346 104" />
            <path d="M312 192 C 330 192, 328 128, 346 128" />
            {/* R to A to G */}
            <path d="M566 116 H 600" />
            <path d="M820 116 H 854" />
            {/* G to decision diamond */}
            <path d="M1074 116 H 1106" />
            {/* diamond to the two outcomes */}
            <path d="M1278 88 C 1296 72, 1300 48, 1318 48" />
            <path d="M1278 144 C 1296 160, 1300 184, 1318 184" />
          </g>

          <RagIoNode
            x={12}
            y={8}
            width={300}
            height={64}
            title="Raw Row"
            body="Product Name · Price"
          />
          <RagIoNode
            x={12}
            y={160}
            width={300}
            height={64}
            title="Standard SKU KB"
            body="Canonical Name · SKU · Price"
            shape="cylinder"
          />

          {ragStages.map((step, index) => (
            <RagStageNode
              key={step.stage}
              x={346 + index * 254}
              y={78}
              width={220}
              height={76}
              stage={step.stage}
              title={step.title}
              body={step.body}
              body2={step.body2}
            />
          ))}

          {/* Edge labels sit right beside their own source box, far apart vertically */}
          <g>
            <rect x={328} y={29} width={82} height={22} rx={11} fill="#ffffff" />
            <text x={369} y={40} textAnchor="middle" dominantBaseline="middle" fontSize="15" fontWeight="500" fill={RAG_FAINT}>
              Query Key
            </text>
          </g>
          <g>
            <rect x={328} y={181} width={58} height={22} rx={11} fill="#ffffff" />
            <text x={357} y={192} textAnchor="middle" dominantBaseline="middle" fontSize="15" fontWeight="500" fill={RAG_FAINT}>
              Search
            </text>
          </g>

          {/* Threshold decision */}
          <RagDecisionNode
            cx={1198}
            cy={116}
            halfWidth={84}
            halfHeight={46}
            label="Score ≥ 40?"
          />

          {/* Yes / No labels */}
          <g>
            <text x={1286} y={60} textAnchor="middle" fontSize="15" fontWeight="600" fill={RAG_ACCENT}>
              Yes
            </text>
            <text x={1286} y={180} textAnchor="middle" fontSize="15" fontWeight="600" fill={RAG_FAINT}>
              No
            </text>
          </g>

          <RagIoNode
            x={1322}
            y={16}
            width={290}
            height={64}
            title="Write Back"
            body="SKU · Awarded Price · Score"
            tone="accent"
          />
          <RagIoNode
            x={1322}
            y={152}
            width={290}
            height={64}
            title="No Match"
            body="Flag for Review"
            tone="quiet"
          />
        </svg>
      </div>
    </div>
  );
}

const retrievedCandidates: {
  name: string;
  score: string;
  note: string;
  highlight?: string;
  selected: boolean;
}[] = [
  {
    name: "Doritos Nacho Cheese · 1 oz × 40",
    score: "100",
    note: "Exact match",
    selected: true,
  },
  {
    name: "Doritos Cool Ranch · 1 oz × 40",
    score: "60",
    note: "Flavor mismatch",
    highlight: "Cool Ranch",
    selected: false,
  },
  {
    name: "Doritos Nacho Cheese · 9.25 oz × 8",
    score: "40",
    note: "Pack mismatch",
    highlight: "9.25 oz × 8",
    selected: false,
  },
];

const matchedRecord: [string, string][] = [
  ["SKU", "SNK-1042"],
  ["Awarded price", "$24.80/case"],
  ["Match score", "100"],
];

function MatchingPreview() {
  return (
    <GlassSurface className="rounded-[1.4rem] border-black/5 p-6 shadow-[0_16px_44px_rgba(0,0,0,0.06)] sm:p-7">
      <div>
        {/* Raw query reads like an input object */}
        <div className="rounded-[0.85rem] bg-[#f5f5f7] px-4 py-2.5">
          <p className="text-[11px] font-medium tracking-[0.06em] text-[#a1a1a6]">
            RAW QUERY
          </p>
          <p className="mt-0.5 text-[14px] leading-5 text-[#1d1d1f]">
            DORITOS Nacho Chz 1oz Bags, 40ct
          </p>
        </div>

        {/* Candidates: no outer frame, no per-field borders */}
        <div className="mt-6">
            <div className="flex items-baseline justify-between gap-4 px-4 text-[11px] font-medium tracking-[0.06em] text-[#a1a1a6]">
              <span>CANDIDATE</span>
              <span>SCORE</span>
            </div>

            <div className="mt-1 space-y-0">
              {retrievedCandidates.map((row) => (
                <div
                  key={row.name}
                  className={`rounded-[0.85rem] px-4 py-2 ${
                    row.selected ? "bg-[#0071e3]/[0.06]" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="min-w-0 text-[14px] leading-5 text-[#1d1d1f]">
                      {row.highlight ? (
                        <>
                          {row.name.split(row.highlight)[0]}
                          <span className="font-medium text-[#c2571b]">
                            {row.highlight}
                          </span>
                          {row.name.split(row.highlight)[1]}
                        </>
                      ) : (
                        row.name
                      )}
                    </p>
                    <span
                      className={`shrink-0 text-[15px] tabular-nums ${
                        row.selected
                          ? "font-semibold text-[#0071e3]"
                          : "font-medium text-[#6e6e73]"
                      }`}
                    >
                      {row.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completion feedback, light material and no heavy shadow */}
          <div className="mt-6 rounded-[0.85rem] bg-[#0071e3]/[0.05] px-4 py-3">
            <p className="text-[11px] font-medium tracking-[0.06em] text-[#0071e3]">
              &#10003; MATCHED
            </p>
            <p className="mt-2 text-[16px] font-semibold leading-5 text-[#1d1d1f]">
              Doritos Nacho Cheese
            </p>

            <div className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[12px] leading-5">
              <span className="text-[#6e6e73]">1 oz &times; 40</span>
              {matchedRecord.map(([key, value]) => (
                <span key={key} className="flex items-baseline gap-1">
                  <span className="text-[#c7c7cc]">&middot;</span>
                  <span className="text-[#86868b]">{key}</span>
                  <span className="tabular-nums text-[#1d1d1f]">{value}</span>
                </span>
              ))}
            </div>
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

function MetricRow({
  metrics,
}: {
  metrics: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-end gap-10 border-t border-black/[0.07] pt-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="min-w-[5rem]">
          <p className="text-[2rem] font-semibold tracking-tight text-[#1d1d1f] leading-none">
            {metric.value}
          </p>
          <p className="mt-1.5 text-[13px] text-[#86868b]">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}

function NarrativeBlock({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="text-[15px] font-semibold tracking-[0.06em] text-[#1d1d1f]">
        {title}
      </p>
      <p className="mt-2 text-base leading-8 text-[#6e6e73]">{body}</p>
    </div>
  );
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

              {item.previewType === "matching" ? (
                <div className="mt-8 flex flex-col gap-8">
                  <p className="text-base leading-8 text-[#6e6e73]">
                    {item.problem}
                  </p>

                  <NarrativeBlock title="What I built" body={item.built} />

                  <RagFlowDiagram />

                  <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
                    <div className="lg:sticky lg:top-8">
                      <NarrativeBlock title="How I shipped it" body={item.shipped} />
                    </div>
                    <div className="overflow-visible">
                      <ToolPreview type={item.previewType} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
                  <div className="flex flex-col gap-6">
                    <p className="text-base leading-8 text-[#6e6e73]">
                      {item.problem}
                    </p>

                    <div className="grid gap-4">
                      <NarrativeBlock title="What I built" body={item.built} />
                      <NarrativeBlock
                        title="How I shipped it"
                        body={item.shipped}
                      />
                    </div>

                    <MetricRow metrics={item.metrics} />
                  </div>

                  <div className="lg:sticky lg:top-8 overflow-visible">
                    <ToolPreview type={item.previewType} />
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
