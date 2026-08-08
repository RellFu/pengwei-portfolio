 "use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRightLeft,
  BadgeAlert,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Database,
  FileSearch,
  FileStack,
  Link2,
  MessageCircleMore,
  MessageSquareQuote,
  MessagesSquare,
  PhoneOff,
  PictureInPicture2,
  Plus,
  ShieldAlert,
  ShieldCheck,
  RefreshCcw,
  ScanText,
  ScanSearch,
  ScrollText,
  Target,
  Tags,
  Sparkles,
  UserRound,
  Waypoints,
  Wrench,
  X,
} from "lucide-react";
import {
  GlassSurface,
  SectionLabel,
  WarmSurface,
} from "@/components/design-system";
import { AgentArchitectureSection } from "@/components/agent-architecture-section";
import { BeforeAfterSection } from "@/components/before-after-section";
import type { CaseStudyProject } from "@/data/projects";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type MerchantOnboardingCaseStudyProps = {
  project: CaseStudyProject;
};

const competitorResearchDetails = [
  "Multimodal submission",
  "OCR recognition",
  "Real-time pre-check",
  "Flow pull-back",
  "Resume from breakpoint",
  "Knowledge-base Q&A",
  "Progress tracking",
  "Drop-off re-engagement",
];

const competitorLogos = [
  { name: "Uber Eats", src: "/logos/Uber_Eats_logo.svg" },
  { name: "Rappi", src: "/logos/Rappi_logo.svg" },
  { name: "Keeta", src: "/logos/Keeta_logo.png" },
  { name: "iFood", src: "/logos/IFood_logo.svg" },
  { name: "Taobao Instant", src: "/logos/Taobaoshangou.svg" },
  { name: "Meituan", src: "/logos/meituan.webp" },
];

const workflowSteps = [
  { title: "WhatsApp Outreach", icon: MessageCircleMore },
  { title: "Registration", icon: Bot },
  { title: "Doc & Image Capture", icon: ScanText },
  { title: "AI Validation", icon: CheckCircle2 },
  { title: "Submit & Review", icon: CircleHelp },
  { title: "CRM Status Sync", icon: Database },
];

const routingExamples = [
  { trigger: "Filling the form", agent: "Onboarding Agent" },
  { trigger: "Uploads storefront or menu", agent: "OCR Check" },
  { trigger: "Asks about platform rules", agent: "Q&A Agent" },
  { trigger: "Submits for review", agent: "Review Agent" },
  { trigger: "Goes silent or drops off", agent: "Re-engage Agent" },
];

// Each case is a concrete merchant input routed to a different specialist.
// The animation cycles through them on a loop while the panel is open.
const routingCases = [
  { input: "hey, how do i get my restaurant on DiDi?", thumb: null, target: 0, thought: "New merchant asking how to start. Routing to Onboarding." },
  { input: "pic of my storefront 👇", thumb: "storefront.jpg", target: 1, thought: "Merchant is uploading a storefront photo. Sending to OCR Check." },
  { input: "do i get to set my own delivery fee?", thumb: null, target: 2, thought: "Pricing question detected. Handing off to Q&A Agent." },
  { input: "sent everything, can u review pls?", thumb: null, target: 3, thought: "Submission ready for review. Escalating to Review Agent." },
  { input: "Merchant silent for 3 days", thumb: null, target: 4, muted: true, system: true, thought: "No response for 3 days. Triggering Re-engagement." },
];

const controlRules = [
  {
    trigger: "Risk control blocks",
    rule: "Stop all agents, freeze submission, and keep one fixed appeal path.",
  },
  {
    trigger: "CRM stage mismatch",
    rule: "Override the model's guess with the ground-truth flow state.",
  },
  {
    trigger: "Human takeover or audit",
    rule: "Agent yields control, context retained, every action logged with a trace ID.",
  },
];

const evaluationDimensions = [
  {
    title: "Reply Quality",
    items: ["Natural language", "Language mixing", "Parameter leakage", "Hallucination"],
  },
  {
    title: "Q&A",
    items: ["1:1 questions", "Mixed questions", "Ambiguous intent", "Rephrased questions"],
  },
  {
    title: "Flow Execution",
    items: ["Forward flow", "Backward flow", "Flow pull-back", "Field collection"],
  },
  {
    title: "Multimodal",
    items: ["Text & image", "Multi-image", "OCR", "Forgery detection"],
  },
  {
    title: "Consistency",
    items: ["CRM", "Tool calling", "Office sync", "BD response"],
  },
];

const reviewLoop = ["Locate issue", "Analyze root cause", "Fix bug", "Retest", "Back to locating"];

const heroBubbles = [
  {
    text: "Hi, please tell me your store name",
    className: "right-8 top-4 md:right-10 md:top-2",
    delayClassName: "animate-[heroBubble_8s_ease-in-out_infinite]",
  },
  {
    text: "Please upload your storefront photo",
    className: "right-0 top-52 md:right-2 md:top-56",
    delayClassName: "animate-[heroBubble_8s_ease-in-out_infinite_3.2s]",
  },
  {
    text: "Please upload your menu photo",
    className: "right-2 bottom-10 md:right-4 md:bottom-12",
    delayClassName: "animate-[heroBubble_8s_ease-in-out_infinite_1.6s]",
  },
  {
    text: "Let me help check your documents",
    className: "left-0 bottom-6 md:left-6 md:bottom-14",
    delayClassName: "animate-[heroBubble_8s_ease-in-out_infinite_0.8s]",
  },
];

const sessionPipeline = [
  { label: "Data Ingestion", icon: FileStack },
  { label: "Clean & Merge", icon: Wrench },
  { label: "Enrich States", icon: RefreshCcw },
  { label: "LLM Classify", icon: Bot },
  { label: "Diagnose Funnel", icon: ScrollText },
];

const attributionSources = [
  {
    label: "Passive reach",
    value: "12,558",
    percent: "64.7%",
    width: "64.7%",
    color: "bg-[#0071e3]",
  },
  {
    label: "Active click",
    value: "1,477",
    percent: "26.9%",
    width: "26.9%",
    color: "bg-[#6cb2f5]",
  },
  {
    label: "Form-page retention",
    value: "390",
    percent: "8.4%",
    width: "8.4%",
    color: "bg-[#d2d2d7]",
  },
];

function ResponsibilityCard({
  title,
  description,
  expandable = false,
  variant = "default",
}: {
  title: string;
  description: string;
  expandable?: boolean;
  variant?:
    | "default"
    | "market-insight"
    | "agent-workflow"
    | "agent-evaluation"
    | "data-analytics";
}) {
  const [expanded, setExpanded] = useState(false);
  const [activeCase, setActiveCase] = useState(0);
  const activeCaseData = routingCases[activeCase];
  const orchestrationRef = useRef(null);

  useGSAP(
    () => {
      if (!expanded) return;
      const cards = gsap.utils.toArray<HTMLElement>(".routing-card");
      gsap.set(cards, { opacity: 1, scale: 1, clearProps: "boxShadow" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        // When this case finishes, advance to the next one. The dependency on
        // activeCase re-runs the whole sequence, so it loops through every case.
        onComplete: () => {
          setActiveCase((c) => (c + 1) % routingCases.length);
        },
      });
      tl.from(".routing-bubble", { opacity: 0, y: 14, duration: 0.5 })
        .from(".routing-master", { opacity: 0, scale: 0.95, duration: 0.4 }, "-=0.2")
        .to(".routing-master", { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1 }, "-=0.05")
        .to(cards, { opacity: 0.3, duration: 0.3 }, "<")
        .to(".routing-card--target", { opacity: 1, scale: 1.05, duration: 0.3 }, "<")
        .to(
          ".routing-card--target",
          {
            boxShadow: "0 0 0 2px #0071e3, 0 12px 24px rgba(0,113,227,0.22)",
            duration: 0.3,
          },
          "<"
        )
        .to({}, { duration: 1.6 });
    },
    { dependencies: [expanded, activeCase], scope: orchestrationRef }
  );

  if (!expandable) {
    return (
      <GlassSurface className="rounded-[1.8rem] p-6">
        <h3 className="text-xl font-semibold tracking-[-0.01em] text-[#1d1d1f]">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-[#6e6e73]">{description}</p>
      </GlassSurface>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="block w-full text-left"
        aria-expanded={expanded}
      >
        <GlassSurface className="rounded-[1.8rem] p-6 transition duration-300 hover:border-black/10 hover:shadow-[0_26px_60px_rgba(0, 0, 0,0.14)] active:scale-[0.99]">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-[#1d1d1f]">{title}</h3>
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0071e3] text-white">
              <Plus className="h-4 w-4 stroke-[2.4]" />
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[#6e6e73]">{description}</p>
        </GlassSurface>
      </button>

      <div
        className={`fixed inset-0 z-40 transition duration-300 ${
          expanded ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close details"
          onClick={() => setExpanded(false)}
          className={`absolute inset-0 bg-[rgba(0,0,0,0.18)] backdrop-blur-md transition duration-300 ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-center px-4 py-8 sm:px-6">
          <GlassSurface
            className={`relative max-h-[calc(100vh-80px)] w-full max-w-5xl overflow-y-auto rounded-[2rem] border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,245,247,0.96))] p-6 shadow-[0_40px_120px_rgba(0, 0, 0,0.24)] transition duration-300 sm:p-7 md:p-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-display:none] ${
              expanded
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-[0.98] opacity-0"
            }`}
          >
            <button
              type="button"
              aria-label="Close details"
              onClick={() => setExpanded(false)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#0071e3] text-white transition duration-150 active:scale-90 hover:scale-[1.03]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pr-1">
              {variant === "agent-workflow" ? (
                <div className="mx-auto flex w-full max-w-4xl flex-col items-start space-y-5 text-left">
                    <div className="w-full">
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-xl">
                      AI Onboarding Flow Redesign
                    </h4>
                    <p className="mt-1 text-[13px] leading-6 text-[#6e6e73]">
                      Two capabilities run through every step:{" "}
                      <span className="font-semibold text-[#1d1d1f]">
                        Real-Time Q&amp;A &amp; RAG Support
                      </span>{" "}
                      and{" "}
                      <span className="font-semibold text-[#1d1d1f]">
                        Risk Controls, Human Handoff &amp; Traceability
                      </span>
                      .
                    </p>
                    <div className="mt-3 w-full md:px-7">
                      <div className="grid grid-cols-3 items-start gap-x-2 gap-y-3 md:grid-cols-6 md:gap-x-3">
                        {workflowSteps.map((step, index) => {
                          const Icon = step.icon;

                          return (
                            <div key={step.title} className="relative">
                              <div className="flex flex-col items-center text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/86 text-[#0071e3] shadow-[0_10px_20px_rgba(0, 0, 0,0.05)]">
                                  <Icon className="h-6 w-6" />
                                </div>
                                <p className="mt-2 text-[12px] font-medium leading-5 text-[#1d1d1f]">
                                  {step.title}
                                </p>
                              </div>
                              {index < workflowSteps.length - 1 ? (
                                <span className="absolute -right-2 top-4 hidden md:block">
                                  <ChevronRight className="h-4 w-4 text-[#c7c7cc]" />
                                </span>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-xl">
                      Multi-Agent Orchestration
                    </h4>
                    <div className="mt-4 space-y-5">
                      {/* Block 1: Routing logic */}
                      <div ref={orchestrationRef}>
                        <p className="mt-0.5 text-[12px] font-medium uppercase tracking-wide text-[#86868b]">
                          Routing logic
                        </p>
                        <p className="mt-3 text-[13px] leading-6 text-[#6e6e73] sm:text-[14px] sm:leading-7">
                          Master Agent reads intent and stage, then routes the merchant to the right specialist. It does not run every task itself.
                        </p>
                        <div className="mt-3 flex flex-col items-center">
                          {activeCaseData.system ? (
                            <div className="routing-bubble flex w-full max-w-md items-start gap-2">
                              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#86868b]/[0.1]">
                                <Clock3 className="h-3.5 w-3.5 text-[#86868b]" />
                              </div>
                              <div className="rounded-2xl rounded-tl-sm border border-black/6 bg-[#f5f5f7] px-3.5 py-2 shadow-[0_8px_18px_rgba(0,0,0,0.03)]">
                                <p className="text-[13px] leading-snug text-[#86868b]">
                                  {activeCaseData.input}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="routing-bubble flex w-full max-w-md items-start gap-2">
                              <img
                                src="/whatsapp-logo.webp"
                                alt="WhatsApp"
                                className="mt-0.5 h-7 w-7 shrink-0 object-contain"
                              />
                              <div className={`rounded-2xl rounded-tl-sm border border-black/[0.08] bg-white px-3.5 py-2 shadow-[0_8px_18px_rgba(0,0,0,0.05)] ${activeCaseData.muted ? "opacity-50" : ""}`}>
                                <div className={`flex items-baseline gap-1 text-[13px] leading-snug ${activeCaseData.muted ? "text-[#86868b]" : "text-[#1d1d1f]"}`}>
                                  {activeCaseData.input}
                                  {activeCaseData.thumb && (
                                    <span className="inline-flex shrink-0 items-center gap-0.5 rounded border border-black/8 bg-white/70 px-1 py-[1px] text-[10px] text-[#6e6e73] leading-none">
                                      <PictureInPicture2 className="h-2.5 w-2.5 text-[#86868b]" />
                                      {activeCaseData.thumb}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="routing-master mt-2 w-full max-w-md rounded-[1.1rem] border border-black/5 bg-[#0071e3]/[0.06] px-4 py-2.5 text-center shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
                            <h6 className="text-[14px] font-semibold text-[#0071e3]">
                              Master Agent
                            </h6>
                            <p className="mt-0.5 text-[13px] leading-6 text-[#6e6e73]">
                              {activeCaseData.thought}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
                          {routingExamples.map((r, i) => (
                            <div
                              key={r.agent}
                              className={`routing-card rounded-[1rem] border border-black/5 bg-white/88 px-3 py-2.5 text-center shadow-[0_8px_18px_rgba(0,0,0,0.04)] ${
                                i === activeCaseData.target ? "routing-card--target" : ""
                              }`}
                            >
                              <p className="text-[13px] font-semibold text-[#1d1d1f]">
                                {r.agent}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Block 2: Deterministic control layer */}
                      <div>
                        <p className="text-[12px] font-medium uppercase tracking-wide text-[#86868b]">
                          Deterministic control layer
                        </p>
                        <div className="mt-2 space-y-1.5 rounded-[1.15rem] border border-black/5 bg-white/82 px-4 py-3 shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
                          {controlRules.map((c) => (
                            <div key={c.trigger} className="flex items-start gap-2 text-[12px] leading-5">
                              <span className="shrink-0 font-medium uppercase tracking-wide text-[#0071e3]">
                                {c.trigger}
                              </span>
                              <span className="text-[#6e6e73]">{c.rule}</span>
                            </div>
                          ))}
                          <p className="border-t border-black/5 pt-1.5 text-[13px] leading-6 text-[#6e6e73]">
                            LLMs decide what to say. Rules decide what is allowed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ) : variant === "agent-evaluation" ? (
                <div className="mx-auto flex w-full max-w-4xl flex-col items-start space-y-5 text-left">
                  <div className="w-full">
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-xl">
                      Evaluation Framework Design
                    </h4>
                    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                      {evaluationDimensions.map((group, index) => {
                        const icons = [
                          MessageSquareQuote,
                          MessagesSquare,
                          Waypoints,
                          PictureInPicture2,
                          ShieldCheck,
                        ];
                        const Icon = icons[index];

                        return (
                          <div
                            key={group.title}
                            className="rounded-[1.15rem] border border-black/5 bg-white/82 px-3 py-3 shadow-[0_10px_20px_rgba(0, 0, 0,0.05)]"
                          >
                            <div className="flex items-center gap-2 text-[#1d1d1f]">
                              <Icon className="h-4 w-4 text-[#0071e3]" />
                              <h5 className="text-[14px] font-semibold">{group.title}</h5>
                            </div>
                            <div className="mt-3 flex flex-col gap-2">
                              {group.items.map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full border border-black/10 bg-[#f5f5f7]/60 px-2.5 py-1 text-center text-[11px] font-medium text-[#515154]"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-xl">
                      AI Automated Monitoring
                    </h4>
                    <p className="mt-3 text-[13px] leading-6 text-[#6e6e73] sm:text-[14px] sm:leading-7">
                      Designed an LLM-as-judge monitoring agent that flags abnormal conversations and catches issues rule-based systems would miss.
                    </p>
                    <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch">
                      <div className="rounded-[1.15rem] border border-black/5 bg-white/82 p-4 shadow-[0_10px_20px_rgba(0, 0, 0,0.05)]">
                        <div className="space-y-3">
                          <div className="rounded-[0.95rem] bg-[#f5f5f7]/60 px-3 py-2">
                            <p className="flex items-center gap-1.5 text-[12px] font-medium text-[#86868b]">
                              <UserRound className="h-3.5 w-3.5 text-[#0071e3]" />
                              User
                            </p>
                            <p className="mt-1 text-[13px] leading-6 text-[#515154]">
                              I need to talk to your consultant.
                            </p>
                          </div>
                          <div className="rounded-[0.95rem] border border-black/5 bg-white px-3 py-2">
                            <p className="flex items-center gap-1.5 text-[12px] font-medium text-[#86868b]">
                              <Bot className="h-3.5 w-3.5 text-[#0071e3]" />
                              Agent
                            </p>
                            <p className="mt-1 text-[13px] leading-6 text-[#515154]">
                              Could you send your storefront photo first?
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1.15rem] border border-black/5 bg-white/82 p-4 shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="h-4 w-4 text-[#ff9f0a]" />
                          <h5 className="text-[14px] font-semibold text-[#1d1d1f]">
                            AI Monitoring Result
                          </h5>
                        </div>
                        <div className="mt-3 text-[13px] leading-6 text-[#515154]">
                          <p>
                            The agent <strong>failed to match user intent</strong>, routing a support request as onboarding instead of escalating. It also <strong>missed the fallback trigger</strong> and <strong>omitted required info</strong> (support phone number).
                          </p>
                          <p className="mt-1.5 text-[13px] leading-6 font-medium text-[#c45c00]">
                            Risk level: Medium
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-xl">
                      Bad Case Attribution and Review Loop
                    </h4>
                    <p className="mt-3 text-[13px] leading-6 text-[#6e6e73] sm:text-[14px] sm:leading-7">
                      Traced bad cases to root causes, then worked with engineering to file CE IDs, fix, and retest.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[13px] font-medium text-[#1d1d1f]">
                      {reviewLoop.map((step, index) => (
                        <div key={step} className="flex items-center gap-2.5">
                          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/84 px-3 py-1.5 shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
                            <span>{step}</span>
                          </div>
                          {index < reviewLoop.length - 1 ? (
                            <ChevronRight className="h-4 w-4 text-[#c7c7cc]" />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : variant === "data-analytics" ? (
                <div className="mx-auto flex w-full max-w-4xl flex-col items-start space-y-5 text-left">
                  <div className="w-full">
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-xl">
                      Automated Session-Level Onboarding Analysis
                    </h4>
                    <p className="mt-3 text-[13px] leading-6 text-[#6e6e73] sm:text-[14px] sm:leading-7">
                      Built a pipeline that linked merchant-agent conversations with CRM funnel states, then used LLM-assisted classification to diagnose where merchants dropped off and why.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[13px] font-medium text-[#1d1d1f]">
                      {sessionPipeline.map((item, index) => {
                        const Icon = item.icon;

                        return (
                          <div key={item.label} className="flex items-center gap-3">
                            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/84 px-3 py-2 shadow-[0_10px_20px_rgba(0, 0, 0,0.04)]">
                              <Icon className="h-4 w-4 text-[#0071e3]" />
                              <span>{item.label}</span>
                            </div>
                            {index < sessionPipeline.length - 1 ? (
                              <ChevronRight className="h-4 w-4 text-[#c7c7cc]" />
                            ) : null}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-[1.15rem] border border-black/5 bg-white/82 p-4 shadow-[0_10px_20px_rgba(0, 0, 0,0.05)]">
                        <h5 className="text-[14px] font-semibold text-[#1d1d1f]">
                        From Drop-off Signal to Product Decision
                      </h5>
                      <p className="mt-3 text-[13px] leading-6 text-[#6e6e73] sm:text-[14px] sm:leading-7">
                        CRM data pinpointed the biggest drop-off at storefront-photo collection. Conversation analysis tied it to 50% OCR rejection and repeated uploads, leading to a more tolerant validation workflow. Post-release completion rose to 76.6% from 21.9%.
                      </p>
                    </div>
                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-xl">
                      Website Entry Event-Tracking Attribution
                    </h4>
                    <p className="mt-3 text-[13px] leading-6 text-[#6e6e73] sm:text-[14px] sm:leading-7">
                      Defined event tracking for user clicks, behavioral prompts, and form-exit rescue to analyze how merchants reached AI onboarding support.
                    </p>

                    <div className="mt-5 rounded-[1.15rem] border border-black/5 bg-white/82 p-4 shadow-[0_10px_20px_rgba(0, 0, 0,0.05)]">
                        <h5 className="text-[14px] font-semibold text-[#1d1d1f]">
                        Source Breakdown (UV)
                      </h5>
                      <div className="mt-3 overflow-hidden rounded-full bg-[#f5f5f7]/70">
                        <div className="flex h-3 w-full">
                          {attributionSources.map((item) => (
                            <div
                              key={item.label}
                              className={item.color}
                              style={{ width: item.width }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-3">
                        {attributionSources.map((item) => (
                          <div key={item.label} className="flex items-center gap-2 text-[12px] text-[#515154]">
                            <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                            <span className="font-medium text-[#1d1d1f]">{item.label}</span>
                            <span>{item.value}</span>
                            <span className="text-[#86868b]">({item.percent})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto flex w-full max-w-4xl flex-col items-start space-y-5 text-left">
                  <div className="w-full">
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-xl">
                      Local Scenario Insight
                    </h4>
                      <p className="mt-3 w-full text-[13px] leading-6 text-[#6e6e73] sm:text-[14px] sm:leading-7">
                      Most Mexico merchants are <span className="font-semibold text-[#1d1d1f]">small family restaurants</span> with <span className="font-semibold text-[#1d1d1f]">low digital literacy</span>, so <span className="font-semibold text-[#1d1d1f]">complex forms</span> drive <span className="font-semibold text-[#1d1d1f]">onboarding drop-off</span>.
                    </p>
                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-xl">
                      Competitor Capability Reference
                    </h4>
                      <p className="mt-3 w-full text-[13px] leading-6 text-[#6e6e73] sm:text-[14px] sm:leading-7">
                      Benchmarked leading competitors&apos; merchant-onboarding flows.
                      </p>
                    <div className="mt-3 grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-6">
                      {competitorLogos.map((item) => (
                        <div
                          key={item.name}
                          className="flex h-14 items-center justify-center rounded-[1rem] border border-black/[0.08] bg-white/82 px-3 shadow-[0_10px_20px_rgba(0, 0, 0,0.05)]"
                        >
                          <img
                            src={item.src}
                            alt={item.name}
                            className="max-h-7 w-auto max-w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 w-full text-[13px] leading-6 text-[#6e6e73] sm:text-[14px] sm:leading-7">
                      Merchant onboarding flows, focusing on:
                    </p>
                    <div className="mt-4 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
                      {competitorResearchDetails.map((item) => (
                        <div
                          key={item}
                          className="flex h-14 items-center justify-center rounded-[1rem] border border-black/[0.08] bg-white/82 px-3 text-center text-[13px] font-medium text-[#1d1d1f] shadow-[0_10px_20px_rgba(0, 0, 0,0.05)]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-xl">
                      Core Judgment
                    </h4>
                    <div className="mt-4 w-full space-y-3 text-[13px] leading-6 text-[#6e6e73] sm:text-[14px] sm:leading-7">
                      <p>
                        <span className="mr-2 font-semibold text-[#1d1d1f]">1.</span>
                        Mexico onboarding needs an
                        <span className="mx-1 font-semibold text-[#86868b]">AI Agent</span>
                        to lower
                        <span className="mx-1 font-semibold text-[#86868b]">document barriers</span>
                        and simplify the flow.
                      </p>
                      <p>
                        <span className="mr-2 font-semibold text-[#1d1d1f]">2.</span>
                        <span className="font-semibold text-[#86868b]">WhatsApp</span>
                        is the right channel, leveraging
                        <span className="mx-1 font-semibold text-[#86868b]">image upload</span>
                        ,
                        <span className="mx-1 font-semibold text-[#86868b]">messaging</span>
                        ,
                        <span className="mx-1 font-semibold text-[#86868b]">reach</span>
                        , and
                        <span className="mx-1 font-semibold text-[#86868b]">familiarity</span>
                        .
                      </p>
                      <p>
                        <span className="mr-2 font-semibold text-[#1d1d1f]">3.</span>
                        Free-form chat causes
                        <span className="mx-1 font-semibold text-[#86868b]">flow divergence</span>
                        , requiring
                        <span className="mx-1 font-semibold text-[#86868b]">intent recognition</span>
                        ,
                        <span className="mx-1 font-semibold text-[#86868b]">context memory</span>
                        , and
                        <span className="mx-1 font-semibold text-[#86868b]">error fallback</span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </GlassSurface>
        </div>
      </div>
    </div>
  );
}

export function MerchantOnboardingCaseStudy({
  project,
}: MerchantOnboardingCaseStudyProps) {
  const problemCards = project.problemCards ?? [];
  const responsibilities = project.responsibilities ?? [];
  const productDecisionCards = project.productDecisionCards ?? [];
  const capabilityCards = project.capabilityCards ?? [];
  const funnelSteps = project.funnelSteps ?? [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ffffff] text-[#515154]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0, 0, 0,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(0, 0, 0,0.1),transparent_22%),linear-gradient(180deg,#ffffff_0%,#ffffff_42%,#f5f5f7_100%)]" />
      <div className="absolute left-0 top-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-[#c7c7cc]/20 blur-3xl" />
      <div className="absolute right-0 top-20 -z-10 h-[20rem] w-[20rem] rounded-full bg-[#d2d2d7]/30 blur-3xl" />
      <div className="absolute right-16 top-12 -z-10 h-72 w-72 rounded-full bg-[#d2d2d7]/25 blur-3xl" />

      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 pb-16 pt-6 sm:px-8 lg:px-12">
        <div className="mb-7">
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
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl md:leading-[1.04]">
              <span className="block">DiDi Food</span>
              <span className="block">Merchant Onboarding Agent</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#6e6e73] md:text-lg">
              A WhatsApp multi-agent system that replaced manual forms with conversational onboarding, document recognition, and real-time Q&A.
            </p>
          </div>

          <div className="relative flex min-h-[430px] items-center justify-center lg:min-h-[500px]">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0, 0, 0,0.16),transparent_44%),radial-gradient(circle_at_72%_28%,rgba(0, 0, 0,0.08),transparent_18%)]" />
            <div className="relative h-[420px] w-full max-w-[720px]">
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_48%,rgba(255,255,255,0)_72%)] shadow-[0_0_90px_rgba(0, 0, 0,0.22)]" />
              <div className="absolute left-1/2 top-1/2 h-[338px] w-[338px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 animate-[heroPulse_6s_ease-in-out_infinite]" />
              <div className="absolute left-1/2 top-1/2 h-[278px] w-[278px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(255,255,255,0.92))] shadow-[0_26px_80px_rgba(0, 0, 0,0.14)]" />
              <div className="absolute left-1/2 top-1/2 h-[242px] w-[242px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-[radial-gradient(circle,rgba(255,255,255,0.98),rgba(255,255,255,0.96))] shadow-[inset_0_0_28px_rgba(0, 0, 0,0.08)]" />

              <div className="absolute left-1/2 top-1/2 flex w-[240px] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                <img
                  src="/icon/DiDi_Logo.svg"
                  alt="DiDi"
                  className="h-12 w-auto"
                />
                <h3 className="mt-4 text-[2rem] font-semibold tracking-tight text-[#1d1d1f]">
                  Merchant Side
                </h3>
                <p className="mt-2 text-lg font-medium text-[#6e6e73]">Smart Onboarding Assistant</p>
              </div>

              <div className="absolute left-[18%] top-[18%] h-3 w-3 rounded-full bg-[#d2d2d7]/80 animate-[heroGlow_7s_ease-in-out_infinite]" />
              <div className="absolute right-[14%] top-[24%] h-5 w-5 rounded-full bg-[#d2d2d7]/70 animate-[heroGlow_8s_ease-in-out_infinite_1s]" />
              <div className="absolute left-[22%] bottom-[20%] h-4 w-4 rounded-full bg-[#f5f5f7]/90 animate-[heroGlow_7.5s_ease-in-out_infinite_2s]" />
              <div className="absolute right-[18%] bottom-[14%] h-6 w-6 rounded-full bg-[#f5f5f7]/80 animate-[heroGlow_8.2s_ease-in-out_infinite_1.7s]" />

              {heroBubbles.map((bubble) => (
                <div
                  key={bubble.text}
                  className={`absolute max-w-[280px] rounded-[1.35rem] border border-black/5 bg-white/92 px-5 py-4 text-[15px] font-medium leading-6 text-[#1d1d1f] shadow-[0_18px_40px_rgba(0, 0, 0,0.08)] ${bubble.className} ${bubble.delayClassName}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span>{bubble.text}</span>
                    <span className="mt-1 flex shrink-0 gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3] animate-[heroDot_1.1s_ease-in-out_infinite]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3] animate-[heroDot_1.1s_ease-in-out_infinite_0.18s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3] animate-[heroDot_1.1s_ease-in-out_infinite_0.36s]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-7">
          <section>
            <div className="max-w-3xl">
              <SectionLabel>1. Business Problem</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.5rem] md:leading-[1.02]">
                Merchants signed up, then dropped off
              </h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {problemCards.map((item) => (
                <GlassSurface key={item.title} className="rounded-[1.8rem] p-6">
                  <h3 className="text-xl font-semibold text-[#1d1d1f]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6e6e73]">
                    {item.description}
                  </p>
                </GlassSurface>
              ))}
            </div>
          </section>

          <BeforeAfterSection
            title={"From passive forms to proactive AI guidance"}
            description="Built as a multi-agent system on WhatsApp, the AI reads merchant documents, tracks progress, and guides each step to approval. Onboarding finishes through conversation, not forms."
          />

          <AgentArchitectureSection />

          <section>
            <div className="max-w-3xl">
              <SectionLabel>4. My Product Responsibilities</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.5rem] md:leading-[1.02]">
                From competitor insight to agent iteration
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {responsibilities.map((item) => (
                <ResponsibilityCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  expandable={
                    item.title === "Market Insight & Solution Definition" ||
                    item.title === "Multi-Agent Product Flow Design" ||
                    item.title === "Agent Evaluation & Bad Case Analysis" ||
                    item.title === "Data Analysis & Event Tracking"
                  }
                  variant={
                    item.title === "Multi-Agent Product Flow Design"
                      ? "agent-workflow"
                      : item.title === "Agent Evaluation & Bad Case Analysis"
                        ? "agent-evaluation"
                      : item.title === "Data Analysis & Event Tracking"
                        ? "data-analytics"
                      : item.title === "Market Insight & Solution Definition"
                        ? "market-insight"
                        : "default"
                  }
                />
              ))}
            </div>
          </section>

          <section>
            <div className="max-w-3xl">
              <SectionLabel>5. Core Data Results</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.5rem]">
                Efficiency, conversion, and review quality improved together
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-[#6e6e73] md:text-[15px] md:leading-7">
                From organic onboarding to drop-off re-engagement to AI pre-check, the key paths were all validated as effective.
              </p>
            </div>

            <WarmSurface className="mt-6 overflow-hidden rounded-[2rem] border border-black/10 p-0">
              <div className="grid lg:grid-cols-2">
                <div className="p-6 md:p-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-3 py-1.5 text-sm font-medium text-[#86868b]">
                    <Clock3 className="h-4 w-4" />
                    Efficiency gain
                  </div>
                  <h3 className="mt-4 text-[1.65rem] font-semibold text-[#1d1d1f] md:text-[1.9rem]">
                    Reduction in avg. onboarding time
                  </h3>
                  <p className="mt-3 text-[3.6rem] font-semibold tracking-tight text-[#0071e3] md:text-[4rem]">
                    69.53%
                  </p>
                </div>

                <div className="border-t border-black/5 p-6 lg:border-l lg:border-t-0 md:p-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-3 py-1.5 text-sm font-medium text-[#86868b]">
                    <Waypoints className="h-4 w-4" />
                    Conversion gain
                  </div>
                  <h3 className="mt-4 text-[1.65rem] font-semibold text-[#1d1d1f] md:text-[1.9rem]">
                    Opportunity-to-approval rate
                  </h3>
                  <div className="mt-4 flex items-center gap-3 text-[2.8rem] font-semibold tracking-tight md:text-[3.4rem]">
                    <span className="text-[#1d1d1f]">55.48%</span>
                    <ChevronRight className="h-7 w-7 text-[#0071e3] md:h-9 md:w-9" />
                    <span className="text-[#0071e3]">78.46%</span>
                  </div>
                </div>
              </div>
            </WarmSurface>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <GlassSurface className="rounded-[1.9rem] p-5 md:p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-3 py-1.5 text-sm font-medium text-[#86868b]">
                      <RefreshCcw className="h-4 w-4" />
                      Low-intent drop-off re-engagement
                    </div>
                    <p className="mt-4 text-[3.4rem] font-semibold tracking-tight text-[#0071e3] md:text-[4rem]">
                      51.47%
                    </p>
                    <p className="mt-2 text-[2rem] font-semibold text-[#0071e3]">+30.84pp</p>
                  </div>
                  <div className="hidden min-w-[220px] flex-1 lg:flex lg:items-center lg:justify-center lg:translate-y-10">
                    <div className="flex h-32 items-end justify-center gap-5">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-[#86868b]">20.63%</span>
                        <div className="h-12 w-14 rounded-t-2xl bg-[#d2d2d7]/70" />
                        <span className="text-sm text-[#6e6e73]">Standard re-engagement</span>
                      </div>
                      <div className="relative flex flex-col items-center gap-2">
                        <span className="absolute -left-10 top-0 text-4xl text-[#c7c7cc]">↗</span>
                        <span className="text-sm text-[#86868b]">51.47%</span>
                        <div className="h-24 w-14 rounded-t-2xl bg-[#0071e3]/85" />
                        <span className="text-sm text-[#6e6e73]">AI re-engagement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassSurface>

              <GlassSurface className="rounded-[1.9rem] p-5 md:p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-3 py-1.5 text-sm font-medium text-[#86868b]">
                      <CheckCircle2 className="h-4 w-4" />
                      AI pre-check effective
                    </div>
                    <p className="mt-4 text-[3.4rem] font-semibold tracking-tight text-[#0071e3] md:text-[4rem]">
                      97.6%
                    </p>
                    <p className="mt-3 text-base font-medium text-[#1d1d1f] md:text-lg">
                      Manual pass rate after AI pre-check
                    </p>
                  </div>
                  <div className="hidden min-w-[220px] flex-1 lg:flex lg:items-center lg:justify-center lg:translate-y-10">
                    <div className="relative mx-auto h-32 w-full max-w-[260px] overflow-hidden rounded-[1.4rem] border border-black/5 bg-[#f5f5f7]/40 p-4">
                      <div className="absolute left-10 right-4 top-8 h-px bg-[#f5f5f7]" />
                      <div className="absolute left-10 right-4 top-16 h-px bg-[#f5f5f7]" />
                      <div className="absolute left-10 right-4 top-24 h-px bg-[#f5f5f7]" />
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[#a1a1a6]">
                        95%
                      </div>
                      <svg viewBox="0 0 220 120" className="absolute bottom-4 left-10 right-4 top-4 h-[calc(100%-2rem)] w-[calc(100%-3.5rem)]">
                        <polyline
                          fill="none"
                          stroke="rgba(0, 113, 227,0.75)"
                          strokeWidth="3"
                          points="0,70 40,54 80,63 120,50 160,62 220,55"
                        />
                        {[0, 40, 80, 120, 160, 220].map((x, idx) => {
                          const y = [70, 54, 63, 50, 62, 55][idx];
                          return <circle key={x} cx={x} cy={y} r="4" fill="rgba(0, 113, 227,0.9)" />;
                        })}
                      </svg>
                    </div>
                  </div>
                </div>
              </GlassSurface>
            </div>

            <WarmSurface className="mt-4 rounded-[1.8rem] p-0">
              <div className="grid divide-y divide-black/5 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f7] text-[#0071e3]">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <p className="text-base font-medium text-[#1d1d1f] md:text-lg">
                    <span className="mr-2 text-[2.6rem] font-semibold tracking-tight text-[#0071e3] md:text-[3rem]">
                      3318
                    </span>
                    merchants covered
                  </p>
                </div>
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f7] text-[#0071e3]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <p className="text-base font-medium text-[#1d1d1f] md:text-lg">
                    <span className="mr-2 text-[2.6rem] font-semibold tracking-tight text-[#0071e3] md:text-[3rem]">
                      50%
                    </span>
                    gray rollout in core cities
                  </p>
                </div>
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f7] text-[#0071e3]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-base font-medium text-[#1d1d1f] md:text-lg">
                    In validation on real business traffic
                  </p>
                </div>
              </div>
            </WarmSurface>
          </section>

        </div>
      </div>
    </main>
  );
}
