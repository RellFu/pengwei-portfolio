"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CircleAlert,
  UserRound,
  RotateCcw,
} from "lucide-react";
import gsap from "gsap";
import { GlassSurface } from "@/components/design-system";
import type { CaseStudyProject } from "@/data/projects";

type ToolProject = {
  index: string;
  kicker: string;
  heading: string;
  problem: string;
  built: string;
  shipped: string;
  // Some projects are design-led rather than fully shipped, so the label varies
  shippedTitle?: string;
  metrics: { value: string; label: string }[];
  // Optional footnote for targets that should not read as shipped results
  metricsNote?: string;
  previewType: "agent" | "matching" | "summary";
};

const toolProjects: ToolProject[] = [
  {
    index: "01",
    kicker: "Talent Pricing Agent",
    heading: "Benchmark talent fees against comparable past deals",
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
    kicker: "RAG SKU Matching Workflow",
    heading: "Match changing product listings to standard SKUs",
    problem:
      "External product listings changed frequently because of inconsistent naming, relisting, and packaging updates. Analysts had to map each row manually to a stable internal SKU before the data could support price comparison and cost analysis.",
    built:
      "I built an entity-matching RAG workflow that maps changing e-commerce listings to a stable internal SKU library. For each product name, the workflow retrieves up to five plausible candidates and applies a predefined business rubric across brand, product name, specification, flavor, and price. It returns explainable, structured matches that buyers can use for price comparison and cost analysis.",
    shipped:
      "I designed the knowledge base around canonical product records, each linked to its standard SKU, product attributes, and awarded price. I then implemented the triggered workflow end to end, including query parsing, candidate retrieval, structured model output, JavaScript result expansion, threshold control, and table write-back. Candidates scoring below the business threshold are withheld.",
    metrics: [
      { value: "92.42%", label: "Accuracy on 132 labeled records" },
      { value: "<1 min", label: "Processing and write-back for the batch" },
    ],
    previewType: "matching" as const,
  },
  {
    index: "03",
    kicker: "AI Quote Summary & Analysis",
    heading: "Summarize quote changes and flag negotiation room",
    problem:
      "Buyers had to manually track shifting quotes, exceptions, and price gaps across multiple bidding rounds and category-specific templates, with price tables large enough to exceed the model's context window.",
    built:
      "I designed a two-path AI workflow that turns complex quote data into a factual summary and a separate, tightly scoped price analysis. Four structured inputs keep each output grounded in the data it is allowed to use: comparison rules, current metrics, quote history, and line-item prices.",
    shippedTitle: "How I designed it",
    shipped:
      "I encoded category-specific comparison logic through fields, SQL, formulas, and code annotations, then added token-aware prioritization for oversized price tables. I also defined separate prompts, data boundaries, and evaluation criteria to keep factual reporting distinct from action-oriented analysis.",
    metrics: [],
    previewType: "summary" as const,
  },
];

const ragStages: { stage: string; title: string; body: string; body2?: string }[] = [
  { stage: "R", title: "Retrieve Candidates", body: "Hybrid Search · Top 5" },
  { stage: "A", title: "Add Context", body: "Item · Candidates · Rules" },
  { stage: "G", title: "Generate Match", body: "Score · Reason · SKU" },
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
  nodeId,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  stage: string;
  title: string;
  body: string;
  body2?: string;
  nodeId?: string;
}) {
  const cx = x + width / 2;

  return (
    <g data-node={nodeId}>
      <rect
        className="rag-node-surface"
        x={x}
        y={y}
        width={width}
        height={height}
        rx={13}
        fill={RAG_SURFACE}
        stroke={RAG_HAIRLINE}
      />
      {/* Stage letter and title on one centered line: "R · Retrieve Candidates" */}
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
  nodeId,
}: {
  cx: number;
  cy: number;
  halfWidth: number;
  halfHeight: number;
  label: string;
  nodeId?: string;
}) {
  const points = [
    `${cx},${cy - halfHeight}`,
    `${cx + halfWidth},${cy}`,
    `${cx},${cy + halfHeight}`,
    `${cx - halfWidth},${cy}`,
  ].join(" ");

  return (
    <g data-node={nodeId}>
      <polygon
        className="rag-node-surface"
        points={points}
        fill={RAG_SURFACE}
        stroke={RAG_HAIRLINE}
      />
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
  nodeId,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  body: string;
  tone?: "neutral" | "accent" | "quiet";
  shape?: "card" | "cylinder";
  nodeId?: string;
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
      <g data-node={nodeId}>
        {/* body fill only, no stroke: avoids a straight seam under the top ellipse */}
        <path
          className="rag-node-surface"
          d={`M ${x} ${bodyTop} L ${x} ${bodyBottom} A ${rx} ${capRy} 0 0 0 ${x + width} ${bodyBottom} L ${x + width} ${bodyTop} Z`}
          fill={fill}
        />
        {/* left and right side edges: also tagged so the active-step highlight
            reaches them, not just the body fill path */}
        <line
          className="rag-node-outline"
          x1={x}
          y1={bodyTop}
          x2={x}
          y2={bodyBottom}
          stroke={stroke}
        />
        <line
          className="rag-node-outline"
          x1={x + width}
          y1={bodyTop}
          x2={x + width}
          y2={bodyBottom}
          stroke={stroke}
        />
        {/* visible front curve of the base */}
        <path
          className="rag-node-outline"
          d={`M ${x} ${bodyBottom} A ${rx} ${capRy} 0 0 0 ${x + width} ${bodyBottom}`}
          fill="none"
          stroke={stroke}
        />
        {/* top face fill: full ellipse, no stroke here since its lower half
            sits right where the title text is and a stroke there would cut
            through the letters */}
        <ellipse cx={cx} cy={bodyTop} rx={rx} ry={capRy} fill={fill} />
        {/* top rim outline: only the upper half of that ellipse, bulging
            above the text line, so the outline stays on the outer edge */}
        <path
          className="rag-node-outline"
          d={`M ${x} ${bodyTop} A ${rx} ${capRy} 0 0 1 ${x + width} ${bodyTop}`}
          fill="none"
          stroke={stroke}
        />
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
    <g data-node={nodeId}>
      <rect
        className="rag-node-surface"
        x={x}
        y={y}
        width={width}
        height={height}
        rx={13}
        fill={fill}
        stroke={stroke}
      />
      <text x={x + 16} y={y + 27} fontSize="19" fontWeight="600" fill={titleFill}>
        {title}
      </text>
      <text x={x + 16} y={y + 48} fontSize="18" fill={bodyFill}>
        {body}
      </text>
    </g>
  );
}

const RAG_STEP_CAPTIONS = [
  "One raw listing, traced end to end through the pipeline.",
  "A vendor listing arrives as free text. Nothing about it is canonical yet.",
  "The product name becomes the query key against the standard SKU knowledge base.",
  "Hybrid retrieval returns the five closest candidates. Retrieval rank is not a verdict.",
  "Each candidate is expanded into its attributes: brand, short name, pack, flavor, price.",
  "Generation applies the buyer's scoring rubric and emits a score with its reason.",
  "The top score of 100 clears the threshold of 40, so this row is safe to commit.",
  "The canonical SKU, awarded price, and score are written back as JSON.",
];

const RAG_EDGES = [
  { id: "raw-to-r", d: "M312 40 C 330 40, 328 104, 346 104" },
  { id: "kb-to-r", d: "M312 192 C 330 192, 328 128, 346 128" },
  { id: "r-to-a", d: "M566 116 H 600" },
  { id: "a-to-g", d: "M820 116 H 854" },
  { id: "g-to-decision", d: "M1074 116 H 1106" },
  { id: "decision-yes", d: "M1278 88 C 1296 72, 1300 48, 1318 48" },
  { id: "decision-no", d: "M1278 144 C 1296 160, 1300 184, 1318 184" },
];

function RagFlowDiagram({
  activeStep,
  onReplay,
  isPlaying,
}: {
  activeStep: number;
  onReplay: () => void;
  isPlaying: boolean;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Each step lights up its own nodes and edges. Index maps to the narrative:
  // 0 idle, 1 raw row, 2 KB search, 3 recall, 4 scoring, 5 match, 6 threshold, 7 write back.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      const activeNodesByStep: Record<number, string[]> = {
        1: ["raw"],
        2: ["raw", "kb"],
        3: ["kb", "stage-R"],
        4: ["stage-R", "stage-A"],
        5: ["stage-A", "stage-G"],
        6: ["stage-G", "decision"],
        7: ["decision", "write-back"],
      };
      const activeEdgesByStep: Record<number, string[]> = {
        2: ["raw-to-r"],
        3: ["kb-to-r"],
        4: ["r-to-a"],
        5: ["a-to-g"],
        6: ["g-to-decision"],
        7: ["decision-yes"],
      };

      const active = new Set(activeNodesByStep[activeStep] ?? []);
      const activeEdges = new Set(activeEdgesByStep[activeStep] ?? []);

      svg.querySelectorAll<SVGGElement>("[data-node]").forEach((node) => {
        const isOn = active.has(node.dataset.node ?? "");
        const surface = node.querySelector<SVGElement>(".rag-node-surface");
        gsap.to(node, {
          opacity: activeStep === 0 ? 1 : isOn ? 1 : 0.42,
          duration: 0.4,
          ease: "power2.out",
        });
        if (surface) {
          gsap.to(surface, {
            stroke: isOn && activeStep !== 0 ? RAG_ACCENT : RAG_HAIRLINE,
            strokeWidth: isOn && activeStep !== 0 ? 1.8 : 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
        // Cylinder shapes (the KB node) split their rim across side lines,
        // the base curve, and the top ellipse, since a single path can't
        // describe all three without a visible seam. Keep them in sync with
        // the body fill so the highlight reads as one continuous outline.
        const outlineParts = node.querySelectorAll<SVGElement>(".rag-node-outline");
        if (outlineParts.length) {
          gsap.to(outlineParts, {
            stroke: isOn && activeStep !== 0 ? RAG_ACCENT : RAG_HAIRLINE,
            strokeWidth: isOn && activeStep !== 0 ? 1.8 : 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });

      svg.querySelectorAll<SVGPathElement>("[data-edge]").forEach((edge) => {
        const isOn = activeEdges.has(edge.dataset.edge ?? "");
        gsap.to(edge, {
          stroke: isOn ? RAG_ACCENT : RAG_CONNECTOR,
          strokeWidth: isOn ? 2.2 : 1.4,
          opacity: activeStep === 0 ? 1 : isOn ? 1 : 0.45,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, [activeStep]);

  return (
    <div className="rounded-[1.5rem] border border-black/5 bg-white/70 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-[13px] text-[#86868b]">
          {RAG_STEP_CAPTIONS[activeStep]}
        </p>
        <button
          type="button"
          onClick={onReplay}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/80 px-3 py-1.5 text-[12px] font-medium text-[#1d1d1f] transition-colors duration-200 hover:bg-white active:scale-[0.97]"
        >
          <RotateCcw
            className={`h-3 w-3 ${isPlaying ? "text-[#0071e3]" : "text-[#86868b]"}`}
          />
          Replay
        </button>
      </div>

      <div className="overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox="0 0 1624 232"
          role="img"
          aria-label="A raw row becomes a query key and the standard SKU knowledge base is searched. Retrieve candidates returns the top five, add context expands the item, the candidates, and the buyer's rules, and generate match applies the rubric to emit a score, a reason, and the matched SKU. If the best score is at least 40 the record is written back, otherwise it is flagged for review."
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

          <g fill="none" strokeWidth="1.4" markerEnd="url(#ragArrow)">
            {RAG_EDGES.map((edge) => (
              <path
                key={edge.id}
                data-edge={edge.id}
                d={edge.d}
                stroke={RAG_CONNECTOR}
              />
            ))}
          </g>

          <RagIoNode
            nodeId="raw"
            x={12}
            y={8}
            width={300}
            height={64}
            title="Raw Row"
            body="Product Name · Price"
          />
          <RagIoNode
            nodeId="kb"
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
              nodeId={`stage-${step.stage}`}
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
            nodeId="decision"
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
            nodeId="write-back"
            x={1322}
            y={16}
            width={290}
            height={64}
            title="Write Back"
            body="SKU · Awarded Price · Score"
            tone="accent"
          />
          <RagIoNode
            nodeId="no-match"
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
    note: "Same product on every attribute",
    selected: true,
  },
  {
    name: "Doritos Cool Ranch · 1 oz × 40",
    score: "60",
    note: "Same series, different flavor",
    highlight: "Cool Ranch",
    selected: false,
  },
  {
    name: "Doritos Nacho Cheese · 9.25 oz × 8",
    score: "40",
    note: "Related candidate, pack differs",
    highlight: "9.25 oz × 8",
    selected: false,
  },
  {
    name: "Doritos Spicy Sweet Chili · 1 oz × 40",
    score: "60",
    note: "Same series, different flavor",
    highlight: "Spicy Sweet Chili",
    selected: false,
  },
  {
    name: "Tostitos Nacho Cheese Dip · 15 oz × 12",
    score: "0",
    note: "Different brand",
    highlight: "Tostitos",
    selected: false,
  },
];

const matchedRecord: [string, string][] = [
  ["SKU", "SNK-1042"],
  ["Awarded price", "$24.80/case"],
  ["Match score", "100"],
];

function MatchingPreview({ activeStep = 7 }: { activeStep?: number }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Reveal stages mirror the pipeline: query at 1, candidates at 3, attribute
  // highlights at 4, and scores only at 5, because scoring happens in
  // generation against the buyer's rubric rather than during retrieval.
  const showQuery = activeStep >= 1;
  const showCandidates = activeStep >= 3;
  const showAttributes = activeStep >= 4;
  const showScores = activeStep >= 5;
  const showWinner = activeStep >= 5;
  const showMatched = activeStep >= 7;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !showCandidates) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-candidate-row]"),
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.06,
          overwrite: "auto",
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [showCandidates]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !showMatched) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-matched-card]"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [showMatched]);

  return (
    <GlassSurface className="rounded-[1.4rem] border-black/5 p-6 shadow-[0_16px_44px_rgba(0,0,0,0.06)] sm:p-7">
      <div ref={rootRef}>
        {/* Raw query reads like an input object */}
        <div
          className="rounded-[0.85rem] bg-[#f5f5f7] px-4 py-2.5 transition-opacity duration-500"
          style={{ opacity: showQuery ? 1 : 0.25 }}
        >
          <p className="text-[11px] font-medium tracking-[0.06em] text-[#a1a1a6]">
            RAW QUERY
          </p>
          <p className="mt-0.5 text-[12px] font-medium leading-5 text-[#1d1d1f]">
            DORITOS Nacho Chz 1oz Bags, 40ct
          </p>
        </div>

        {/* Candidates: no outer frame, no per-field borders */}
        <div className="mt-6">
            <div className="flex items-baseline justify-between gap-4 px-4 text-[11px] font-medium tracking-[0.06em] text-[#a1a1a6]">
              <span>CANDIDATE</span>
              <span
                className="transition-opacity duration-400"
                style={{ opacity: showScores ? 1 : 0 }}
              >
                SCORE
              </span>
            </div>

            <div className="mt-1 h-[240px] overflow-hidden space-y-0">
              {showCandidates
                ? retrievedCandidates.map((row) => {
                    const isWinner = showWinner && row.selected;
                    const isDimmed = showWinner && !row.selected;
                    return (
                      <div
                        key={row.name}
                        data-candidate-row
                        className={`rounded-[0.85rem] px-4 py-1 transition-all duration-500 ${
                          isWinner ? "bg-[#0071e3]/[0.06]" : ""
                        }`}
                        style={{ opacity: isDimmed ? 0.4 : 1 }}
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="min-w-0 text-[12px] font-medium leading-5 text-[#1d1d1f]">
                            {row.highlight ? (
                              <>
                                {row.name.split(row.highlight)[0]}
                                <span
                                  className="font-medium transition-colors duration-500"
                                  style={{
                                    color: showAttributes ? "#c2571b" : "#1d1d1f",
                                  }}
                                >
                                  {row.highlight}
                                </span>
                                {row.name.split(row.highlight)[1]}
                              </>
                            ) : (
                              row.name
                            )}
                          </p>
                          <span
                            className={`shrink-0 text-[12px] tabular-nums transition-all duration-400 ${
                              isWinner
                                ? "font-semibold text-[#0071e3]"
                                : "font-medium text-[#6e6e73]"
                            }`}
                            style={{ opacity: showScores ? 1 : 0 }}
                          >
                            {row.score}
                          </span>
                        </div>

                        {/* The rubric's reason travels with the score */}
                        <p
                          className="mt-0.5 text-[11px] leading-4 text-[#a1a1a6] transition-opacity duration-500"
                          style={{ opacity: showScores ? 1 : 0 }}
                        >
                          {row.note}
                        </p>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>

          {/* Completion feedback, light material and no heavy shadow */}
          <div className="mt-6 min-h-[92px]">
            {showMatched ? (
              <div
                data-matched-card
                className="rounded-[0.85rem] bg-[#0071e3]/[0.05] px-4 py-3"
              >
                <p className="text-[11px] font-medium tracking-[0.06em] text-[#0071e3]">
                  &#10003; MATCHED
                </p>
                <p className="mt-2 text-[12px] font-semibold leading-5 text-[#1d1d1f]">
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
            ) : null}
          </div>
      </div>
    </GlassSurface>
  );
}

// The four structured inputs, each showing the concrete value the outputs
// below actually cite. Deliberately uncolored so the reading path stays on
// PE1 and PE2, and so input and output read as one mapping.
const quoteInputs: { title: string; example: string }[] = [
  { title: "Comparison Rules", example: "Same model · Unit price" },
  { title: "Current Snapshot", example: "3 suppliers · $121.5K to $136K" },
  { title: "Quote History", example: "Supplier A · $134K to $128K" },
  { title: "Line-item Prices", example: "Dell 27\" · $220 / $205 / $260" },
];

function SummaryPreview() {
  return (
    <GlassSurface className="h-full overflow-hidden rounded-[1.7rem] border-black/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="space-y-5">
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-[#86868b]">
            Structured Inputs
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {quoteInputs.map((input) => (
              <div
                key={input.title}
                className="rounded-[0.95rem] border border-black/5 bg-white/88 px-3 py-3"
              >
                <p className="text-[12px] font-semibold leading-4 text-[#1d1d1f]">
                  {input.title}
                </p>
                <p className="mt-1 text-[11px] leading-4 tabular-nums text-[#86868b]">
                  {input.example}
                </p>
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
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] font-semibold text-[#1d1d1f]">
                  <span className="text-[#0071e3]">PE1</span> Quote Summary
                </p>
                <span className="shrink-0 text-[10px] font-medium tracking-[0.14em] text-[#86868b]">
                  FACTS ONLY
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-6 text-[#6e6e73]">
                Three suppliers submitted total quotes ranging from $121,500 to $136,000. In its second round, Supplier A reduced its total from $134,000 to $128,000 and its flagged line items from three to one.
              </p>
            </div>

            <div className="rounded-[1rem] border border-black/5 bg-white/90 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] font-semibold text-[#1d1d1f]">
                  <span className="text-[#0071e3]">PE2</span> Price Analysis
                </p>
                <span className="shrink-0 text-[10px] font-medium tracking-[0.14em] text-[#86868b]">
                  FOR REFERENCE ONLY
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-6 text-[#6e6e73]">
                Dell 27-inch monitor: Supplier A quoted $220 per unit, Supplier B $205, and Supplier C $260. Supplier C may have negotiation room on this line item.
              </p>
            </div>
          </div>
          <p className="mt-2 text-[11px] leading-5 text-[#86868b]">
            PE1 and PE2 use different data boundaries and are evaluated separately.
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

const RAG_TOTAL_STEPS = 7;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function RagWalkthrough({
  built,
  shipped,
}: {
  built: string;
  shipped: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Reduced motion skips the walkthrough and renders the finished state.
  const [activeStep, setActiveStep] = useState(() =>
    prefersReducedMotion() ? RAG_TOTAL_STEPS : 0,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    // A paused timeline whose only job is to advance the step index on a
    // comfortable reading cadence, then hold on the final state.
    const tl = gsap.timeline({
      paused: true,
      onStart: () => setIsPlaying(true),
      onComplete: () => setIsPlaying(false),
    });

    for (let step = 1; step <= RAG_TOTAL_STEPS; step += 1) {
      tl.call(() => setActiveStep(step), undefined, step === 1 ? 0 : "+=1.15");
    }
    // Let the last frame breathe before the timeline reports completion.
    tl.to({}, { duration: 0.9 });

    timelineRef.current = tl;

    // Start the walkthrough as soon as the block is meaningfully in view.
    // An IntersectionObserver fires on load as well as on scroll, so it works
    // whether the visitor lands mid-page or scrolls down to this section.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          tl.play(0);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      tl.kill();
      timelineRef.current = null;
    };
  }, []);

  const handleReplay = useCallback(() => {
    const tl = timelineRef.current;
    if (!tl) {
      setActiveStep(RAG_TOTAL_STEPS);
      return;
    }
    setActiveStep(0);
    tl.restart(true);
  }, []);

  return (
    <div ref={containerRef} data-rag-walkthrough className="flex flex-col gap-8">
      <RagFlowDiagram
        activeStep={activeStep}
        onReplay={handleReplay}
        isPlaying={isPlaying}
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="lg:sticky lg:top-8 flex flex-col gap-6">
          <NarrativeBlock title="What I built" body={built} />
          <NarrativeBlock title="How I shipped it" body={shipped} />
        </div>
        <div className="overflow-visible">
          <MatchingPreview activeStep={activeStep} />
        </div>
      </div>
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
  note,
}: {
  metrics: { value: string; label: string }[];
  note?: string;
}) {
  if (metrics.length === 0) return null;

  return (
    <div className="border-t border-black/[0.07] pt-4">
      <div className="flex items-end gap-10">
        {metrics.map((metric) => (
          <div key={metric.label} className="min-w-[5rem]">
            <p className="text-[2rem] font-semibold tracking-tight text-[#1d1d1f] leading-none">
              {metric.value}
            </p>
            <p className="mt-1.5 text-[13px] text-[#86868b]">{metric.label}</p>
          </div>
        ))}
      </div>
      {note ? (
        <p className="mt-3 text-[12px] leading-5 text-[#a1a1a6]">{note}</p>
      ) : null}
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
              <span className="block">Procurement</span>
              <span className="block bg-gradient-to-r from-[#0071e3] via-[#af52de] via-[#ff2d55] to-[#ff9500] bg-clip-text text-transparent">
                AI Tools
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#6e6e73] md:text-lg">
              Designed and implemented three AI workflows for benchmarking talent fees, matching product listings to standard SKUs, and turning supplier quotes into grounded summaries and price analysis, owning the product design end to end and building the core data pipelines and AI logic.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[1.6rem]">
            <video
              src="/videos/bytedance-hero-glass-tiles.mp4"
              poster="/images/bytedance-hero-glass-icons.png"
              aria-label="A large frosted-glass tile with a four-bar brand mark at the center, surrounded by three smaller glass tiles: a talent price tag, a matched SKU barcode pair, and a bar chart with a magnifying glass, gently floating in place to echo the three procurement AI tools"
              className="h-full w-full scale-[1.12] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </section>

        <div className="mt-20 grid gap-16">
          {toolProjects.map((item) => (
            <section key={item.index}>
              <div className="max-w-none">
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

                  <RagWalkthrough built={item.built} shipped={item.shipped} />
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
                        title={item.shippedTitle ?? "How I shipped it"}
                        body={item.shipped}
                      />
                    </div>

                    <MetricRow metrics={item.metrics} note={item.metricsNote} />
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
