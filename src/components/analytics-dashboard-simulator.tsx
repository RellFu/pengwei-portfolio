"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowDownRight,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Filter,
  Gauge,
  LayoutGrid,
  ListFilter,
  Search,
  Send,
  Users,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";

type BoardId = "health" | "funnel" | "retention" | "feedback";

gsap.registerPlugin(useGSAP);

const boards = {
  health: {
    nav: "Product health",
    title: "Product health",
    subtitle: "Daily active, session depth, and module reach",
  },
  funnel: {
    nav: "Conversion funnel",
    title: "Conversion funnel",
    subtitle: "Where users stop on the way to a finished draft",
  },
  retention: {
    nav: "Retention cohorts",
    title: "Retention cohorts",
    subtitle: "Day-over-day return rate by signup week",
  },
  feedback: {
    nav: "Feedback signals",
    title: "Feedback signals",
    subtitle: "Positive and negative events traced to skill and turn",
  },
} as const;

const healthTiles = [
  ["Daily active users", "1,284", "+6.2%", true],
  ["Avg session length", "18m 40s", "+2.1%", true],
  ["Tasks per session", "3.4", "-0.3", false],
  ["Skill invocations", "5,902", "+11.4%", true],
] as const;

const healthTrend = [42, 51, 47, 63, 58, 71, 66, 78, 74, 86, 81, 94];

const funnelSteps = [
  ["Landed on home", "100%", 100],
  ["Opened a module", "34.2%", 34],
  ["Started a task", "12.8%", 13],
  ["Reached knowledge base", "6.8%", 7],
  ["Shipped an artifact", "0.9%", 2],
] as const;

const retentionRows = [
  ["Week 1", [100, 62, 48, 41, 37]],
  ["Week 2", [100, 58, 44, 38, 34]],
  ["Week 3", [100, 66, 53, 47, 43]],
  ["Week 4", [100, 71, 59, 52, 0]],
] as const;

const feedbackEvents = [
  ["Copied output", "positive", "Three-Act Diagnosis", "turn 3"],
  ["Referenced answer", "positive", "Project Bible", "turn 5"],
  ["Saved to memory", "positive", "Character Map", "turn 2"],
  ["Stopped generation", "negative", "Scene Rewrite", "turn 7"],
  ["Marked unhelpful", "negative", "Scene Rewrite", "turn 9"],
] as const;

const metricGroups = [
  ["Engagement", 8],
  ["Navigation", 6],
  ["Task flow", 7],
  ["Feedback", 4],
  ["Performance", 4],
] as const;

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 34 - (value / max) * 30;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="h-9 w-full" aria-hidden="true">
      <polyline points={points} fill="none" stroke="#0071e3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function BoardBody({ boardId }: { boardId: BoardId }) {
  if (boardId === "funnel") {
    return (
      <div>
        <div className="space-y-2">
          {funnelSteps.map(([label, value, width], index) => (
            <div key={label} data-board-item className="rounded-xl border border-black/8 bg-white p-3">
              <div className="flex items-baseline justify-between">
                <p className="text-[11px] font-semibold text-[#1d1d1f]">{label}</p>
                <p className="text-[11px] font-semibold tabular-nums text-[#0071e3]">{value}</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f0f0f2]">
                <span
                  className={`block h-full rounded-full ${index > 2 ? "bg-[#ff9500]" : "bg-[#0071e3]"}`}
                  style={{ width: `${Math.max(width, 2)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#fff4e5] p-3">
          <ArrowDownRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#a05a00]" />
          <p className="text-[10px] leading-4 text-[#8a5300]">
            The largest drop sits between opening a module and starting a task. That gap became a product requirement, not a dashboard note.
          </p>
        </div>
      </div>
    );
  }

  if (boardId === "retention") {
    return (
      <div>
        <div className="overflow-hidden rounded-xl border border-black/8 bg-white">
          <div className="grid grid-cols-6 border-b border-black/8 bg-[#f7f7f8] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#86868b]">
            <span>Cohort</span>
            {["D0", "D1", "D3", "D7", "D14"].map((day) => (
              <span key={day} className="text-center">{day}</span>
            ))}
          </div>
          {retentionRows.map(([cohort, values]) => (
            <div key={cohort} data-board-item className="grid grid-cols-6 items-center border-b border-black/[0.04] px-3 py-2 last:border-b-0">
              <span className="text-[10px] font-semibold text-[#1d1d1f]">{cohort}</span>
              {values.map((value, index) => (
                <span
                  key={`${cohort}-${index}`}
                  className="mx-auto flex h-7 w-full max-w-[3rem] items-center justify-center rounded-md text-[10px] font-semibold tabular-nums"
                  style={
                    value === 0
                      ? { background: "#f7f7f8", color: "#c7c7cc" }
                      : { background: `rgba(0,113,227,${0.06 + (value / 100) * 0.5})`, color: value > 60 ? "#ffffff" : "#0058b8" }
                  }
                >
                  {value === 0 ? "" : `${value}%`}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-[#f5f5f7] p-3 text-[10px] leading-4 text-[#6e6e73]">
          Cohorts are read against the release calendar, so a retention dip can be tied to the version that caused it.
        </div>
      </div>
    );
  }

  if (boardId === "feedback") {
    return (
      <div>
        <div className="grid grid-cols-2 gap-2">
          {[["Positive events", "12", "#eaf8ef", "#207a4b"], ["Negative events", "2", "#ffeceb", "#b3251f"]].map(([label, value, bg, fg]) => (
            <div key={label} data-board-item className="rounded-xl p-3" style={{ background: bg }}>
              <p className="text-2xl font-semibold tracking-[-0.04em]" style={{ color: fg }}>{value}</p>
              <p className="mt-1 text-[10px] font-medium" style={{ color: fg }}>{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 space-y-1.5">
          {feedbackEvents.map(([event, tone, skill, turn]) => (
            <div key={`${event}-${turn}`} data-board-item className="flex items-center gap-2.5 rounded-xl border border-black/8 bg-white px-3 py-2.5">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone === "positive" ? "bg-[#30a46c]" : "bg-[#e5484d]"}`} />
              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold text-[#1d1d1f]">{event}</p>
                <p className="mt-0.5 truncate text-[9px] text-[#86868b]">{skill}</p>
              </div>
              <span className="ml-auto shrink-0 rounded bg-[#f5f5f7] px-1.5 py-0.5 text-[8px] font-medium text-[#6e6e73]">{turn}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-[#eaf4ff] p-3 text-[10px] leading-4 text-[#3f5f78]">
          Every event carries a session, run, and agent identifier, so a single dislike can be traced to the exact skill and turn that produced it.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {healthTiles.map(([label, value, delta, isUp]) => (
          <div key={label} data-board-item className="rounded-xl border border-black/8 bg-white p-3">
            <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-[#86868b]">{label}</p>
            <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">{value}</p>
            <p className={`mt-1 text-[10px] font-semibold ${isUp ? "text-[#207a4b]" : "text-[#b3251f]"}`}>{delta}</p>
          </div>
        ))}
      </div>
      <div data-board-item className="mt-2 rounded-xl border border-black/8 bg-white p-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#1d1d1f]">Active users · 12 weeks</p>
          <span className="rounded bg-[#eaf4ff] px-1.5 py-0.5 text-[8px] font-semibold text-[#0071e3]">Weekly</span>
        </div>
        <div className="mt-2"><Sparkline values={healthTrend} /></div>
      </div>
      <div data-board-item className="mt-2 rounded-xl border border-black/8 bg-white p-3">
        <p className="text-[10px] font-semibold text-[#1d1d1f]">Metric library · 29 tracked behaviors</p>
        <div className="mt-2.5 space-y-1.5">
          {metricGroups.map(([group, count]) => (
            <div key={group} className="flex items-center gap-2">
              <span className="w-[4.6rem] shrink-0 text-[9px] text-[#6e6e73]">{group}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f0f0f2]">
                <span className="block h-full rounded-full bg-[#0071e3]" style={{ width: `${(count / 8) * 100}%` }} />
              </span>
              <span className="w-4 shrink-0 text-right text-[9px] font-semibold tabular-nums text-[#1d1d1f]">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnalyticsDashboardSimulator() {
  const [boardId, setBoardId] = useState<BoardId>("funnel");
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-board-item]", rootRef.current);
      gsap.killTweensOf(targets);
      if (reduceMotion) {
        gsap.set(targets, { clearProps: "all" });
        return;
      }
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.03, ease: "power3.out", overwrite: "auto" },
      );
    },
    { scope: rootRef, dependencies: [boardId, reduceMotion], revertOnUpdate: true },
  );

  const board = boards[boardId];

  return (
    <div ref={rootRef} className="mt-9">
      <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f5f5f7] shadow-[0_34px_100px_rgba(0,0,0,0.13)]">
        <div className="flex h-12 items-center gap-3 border-b border-black/8 bg-white/85 px-4 backdrop-blur-2xl sm:px-5">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1d1d1f]">
            <BarChart3 className="h-4 w-4 text-[#0071e3]" />
            Analytics
          </div>
          <div className="ml-2 hidden items-center gap-1.5 rounded-lg bg-[#f5f5f7] px-2.5 py-1.5 text-[10px] text-[#86868b] sm:flex">
            <Search className="h-3 w-3" />
            Search metrics
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-lg border border-black/8 bg-white px-2.5 py-1.5 text-[9px] font-medium text-[#515154] sm:flex">
              <Calendar className="h-3 w-3" />
              Last 30 days
              <ChevronDown className="h-3 w-3 text-[#b0b0b5]" />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f5f5f7] text-[#6e6e73]"><Bell className="h-3.5 w-3.5" /></span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto border-b border-black/8 bg-white px-3 py-2 lg:hidden">
          {(Object.entries(boards) as [BoardId, (typeof boards)[BoardId]][]).map(([id, item]) => (
            <button
              key={id}
              type="button"
              onClick={() => setBoardId(id)}
              className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold transition active:scale-[0.97] motion-reduce:transition-none ${boardId === id ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7] text-[#6e6e73]"}`}
            >
              {item.nav}
            </button>
          ))}
        </div>

        <div className="grid bg-white lg:min-h-[32rem] lg:grid-cols-[12rem_minmax(0,1fr)_17rem]">
          <aside className="hidden border-r border-black/8 bg-[#f7f7f8] p-3 lg:flex lg:flex-col">
            <p className="px-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#b0b0b5]">Dashboards</p>
            <div className="mt-1.5 space-y-1">
              {(Object.entries(boards) as [BoardId, (typeof boards)[BoardId]][]).map(([id, item]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={boardId === id}
                  onClick={() => setBoardId(id)}
                  className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2.5 text-left text-[10px] font-medium transition active:scale-[0.98] motion-reduce:transition-none ${boardId === id ? "bg-[#dedee1] text-[#1d1d1f]" : "text-[#6e6e73] hover:bg-black/[0.035]"}`}
                >
                  {id === "health" ? <Gauge className="h-3.5 w-3.5" /> : id === "funnel" ? <ListFilter className="h-3.5 w-3.5" /> : id === "retention" ? <Users className="h-3.5 w-3.5" /> : <LayoutGrid className="h-3.5 w-3.5" />}
                  <span>{item.nav}</span>
                </button>
              ))}
            </div>
            <div className="mt-auto space-y-1 border-t border-black/8 pt-3 text-[10px] text-[#6e6e73]">
              {["Metric library", "Event spec", "Scheduled reports"].map((item) => (
                <div key={item} className="rounded-lg px-2.5 py-2">{item}</div>
              ))}
            </div>
          </aside>

          <section className="flex min-w-0 flex-col border-b border-black/8 lg:border-b-0 lg:border-r">
            <div className="flex min-h-12 flex-wrap items-center gap-2 border-b border-black/8 px-4 py-2.5 sm:px-5">
              <span data-board-item className="text-[11px] font-semibold text-[#1d1d1f]">{board.title}</span>
              <span className="text-[#d2d2d7]">/</span>
              <span data-board-item className="text-[10px] text-[#86868b]">{board.subtitle}</span>
              <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-black/8 bg-white px-2.5 py-1.5 text-[9px] font-medium text-[#515154]">
                <Filter className="h-3 w-3 text-[#0071e3]" />
                All roles
              </span>
            </div>
            <div className="flex-1 p-4 sm:p-5">
              <BoardBody boardId={boardId} />
            </div>
          </section>

          <aside className="min-w-0 bg-[#fbfbfc] p-3 sm:p-4">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">Scheduled agent</p>
            <div className="mt-2.5 rounded-xl border border-black/8 bg-white p-3 shadow-[0_6px_20px_rgba(0,0,0,0.035)]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#30a46c] opacity-50 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#30a46c]" />
                </span>
                <p className="text-[10px] font-semibold text-[#1d1d1f]">Usage ranking push</p>
              </div>
              <p className="mt-2 text-[9px] leading-4 text-[#86868b]">
                Pulls usage stats, renders a ranking card, and posts it to the team group on a schedule.
              </p>
              <div className="mt-2.5 space-y-1">
                {[["Pull stats", "done"], ["Render card", "done"], ["Post to group", "done"]].map(([step, state]) => (
                  <div key={step} className="flex items-center gap-2 text-[9px] text-[#6e6e73]">
                    <span className="h-1 w-1 rounded-full bg-[#30a46c]" />
                    {step}
                    <span className="ml-auto text-[8px] text-[#b0b0b5]">{state}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-[#eaf4ff] px-2.5 py-2 text-[9px] font-medium text-[#0066cc]">
                <Send className="h-3 w-3" />
                Delivered to work group
              </div>
            </div>

            <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">Instrumentation patrol</p>
            <div className="mt-2.5 rounded-xl border border-black/8 bg-white p-3 shadow-[0_6px_20px_rgba(0,0,0,0.035)]">
              <p className="text-[10px] font-semibold text-[#1d1d1f]">Daily consistency check</p>
              <div className="mt-2.5 space-y-1.5">
                {[["Event types", "in sync"], ["Documentation", "in sync"], ["Analytics code", "1 gap"]].map(([layer, state]) => (
                  <div key={layer} className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${state === "in sync" ? "bg-[#30a46c]" : "bg-[#ff9500]"}`} />
                    <span className="text-[9px] text-[#515154]">{layer}</span>
                    <span className={`ml-auto text-[8px] font-medium ${state === "in sync" ? "text-[#86868b]" : "text-[#a05a00]"}`}>{state}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 text-[9px] leading-4 text-[#86868b]">
                Coverage gaps are flagged before they turn into blind spots in the data.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="text-[10px] leading-5 text-[#86868b]">Interactive dashboard simulation · representative values, public-safe</p>
        <span className="text-[9px] text-[#b0b0b5]">Internal boards and identifiers are not reproduced</span>
      </div>
    </div>
  );
}
