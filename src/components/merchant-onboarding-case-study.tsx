 "use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeAlert,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Database,
  FileSearch,
  FileStack,
  Link2,
  MessageCircleMore,
  MessageSquareQuote,
  MessagesSquare,
  PictureInPicture2,
  Plus,
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

type MerchantOnboardingCaseStudyProps = {
  project: CaseStudyProject;
};

const competitorResearchDetails = [
  "多模态提交",
  "OCR 识别",
  "实时预审",
  "流程拉回",
  "断点续接",
  "知识库答疑",
  "进度查看",
  "流失召回",
];

const competitorLogos = [
  { name: "Uber Eats", src: "/logos/Uber_Eats_logo.svg" },
  { name: "Rappi", src: "/logos/Rappi_logo.svg" },
  { name: "Keeta", src: "/logos/Keeta_logo.png" },
  { name: "iFood", src: "/logos/IFood_logo.svg" },
  { name: "淘宝闪购", src: "/logos/Taobaoshangou.svg" },
  { name: "美团", src: "/logos/meituan.webp" },
];

const workflowSteps = [
  { title: "WhatsApp 触达", icon: MessageCircleMore },
  { title: "对话式 AI 引导", icon: Bot },
  { title: "资料 AI 识别", icon: ScanText },
  { title: "智能预审纠错", icon: CheckCircle2 },
  { title: "实时答疑", icon: CircleHelp },
  { title: "数据回写 CRM", icon: Database },
];

const agentCards = [
  {
    title: "商家入驻 Agent",
    description: "资料收集与流程引导",
    icon: UserRound,
  },
  {
    title: "入驻预审 Agent",
    description: "预审纠错与补件提醒",
    icon: ScanSearch,
  },
  {
    title: "智能问答 Agent",
    description: "实时答疑并回拉主流程",
    icon: MessageCircleMore,
  },
  {
    title: "商机推进 Agent",
    description: "中断识别与召回推进",
    icon: Waypoints,
  },
];

const agentCapabilityChips = [
  { label: "上下文记忆", icon: BrainCircuit },
  { label: "工具调用", icon: Wrench },
  { label: "结果回写", icon: Database },
];
const stabilityChips = [
  { label: "断点续接", icon: Link2 },
  { label: "流程回拉", icon: RefreshCcw },
  { label: "异常兜底", icon: BadgeAlert },
];

const evaluationDimensions = [
  {
    title: "回复质量",
    items: ["语言自然", "语种混杂", "参数暴露", "幻觉情况"],
  },
  {
    title: "QA 问答",
    items: ["1:1 提问", "混合提问", "模糊语义", "变形问"],
  },
  {
    title: "流程执行",
    items: ["前向流程", "后向流程", "流程拉回", "字段收集"],
  },
  {
    title: "多模态理解",
    items: ["图文混发", "多图理解", "OCR", "伪造识别"],
  },
  {
    title: "系统一致性",
    items: ["CRM", "工具调用", "前后台", "BD 回应"],
  },
];

const reviewLoop = ["定位问题", "分析根因", "修复 Bug", "复测", "回到定位问题"];

const heroBubbles = [
  {
    text: "你好，请告诉我的店铺名称",
    className: "right-8 top-4 md:right-10 md:top-2",
    delayClassName: "animate-[heroBubble_8s_ease-in-out_infinite]",
  },
  {
    text: "请上传你的门头图",
    className: "right-0 top-52 md:right-2 md:top-56",
    delayClassName: "animate-[heroBubble_8s_ease-in-out_infinite_3.2s]",
  },
  {
    text: "请上传菜单图片",
    className: "right-2 bottom-10 md:right-4 md:bottom-12",
    delayClassName: "animate-[heroBubble_8s_ease-in-out_infinite_1.6s]",
  },
  {
    text: "我来帮你检查资料",
    className: "left-0 bottom-6 md:left-6 md:bottom-14",
    delayClassName: "animate-[heroBubble_8s_ease-in-out_infinite_0.8s]",
  },
];

const sessionPipeline = [
  { label: "Session ID 拉取", icon: FileStack },
  { label: "ETL 清洗", icon: Wrench },
  { label: "状态补齐", icon: RefreshCcw },
  { label: "LLM 分类", icon: Bot },
  { label: "自动报告", icon: ScrollText },
];

const attributionSources = [
  {
    label: "被动触达",
    value: "12,558",
    percent: "64.7%",
    width: "64.7%",
    color: "bg-orange-400",
  },
  {
    label: "主动点击",
    value: "1,477",
    percent: "26.9%",
    width: "26.9%",
    color: "bg-amber-400",
  },
  {
    label: "表单页挽留",
    value: "390",
    percent: "8.4%",
    width: "8.4%",
    color: "bg-orange-200",
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

  if (!expandable) {
    return (
      <GlassSurface className="rounded-[1.8rem] p-6">
        <h3 className="text-xl font-semibold text-amber-950">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-stone-600">{description}</p>
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
        <GlassSurface className="rounded-[1.8rem] p-6 transition duration-300 hover:border-orange-300/90 hover:shadow-[0_26px_60px_rgba(180,83,9,0.14)]">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold text-amber-950">{title}</h3>
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
              <Plus className="h-4 w-4 stroke-[2.4]" />
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-stone-600">{description}</p>
        </GlassSurface>
      </button>

      <div
        className={`fixed inset-0 z-40 transition duration-300 ${
          expanded ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="关闭详情"
          onClick={() => setExpanded(false)}
          className={`absolute inset-0 bg-[rgba(66,39,18,0.18)] backdrop-blur-md transition duration-300 ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-center px-4 py-8 sm:px-6">
          <GlassSurface
            className={`relative max-h-[calc(100vh-80px)] w-full max-w-5xl overflow-y-auto rounded-[2rem] border-orange-300/80 bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(255,243,225,0.96))] p-6 shadow-[0_40px_120px_rgba(120,53,15,0.24)] transition duration-300 sm:p-7 md:p-8 ${
              expanded
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-[0.98] opacity-0"
            }`}
          >
            <button
              type="button"
              aria-label="关闭详情"
              onClick={() => setExpanded(false)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white transition hover:scale-[1.03]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pr-1">
              {variant === "agent-workflow" ? (
                <div className="mx-auto flex w-full max-w-4xl flex-col items-start space-y-5 text-left">
                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      AI 入驻链路重构
                    </h4>
                    <div className="mt-4 grid grid-cols-3 items-start gap-x-2 gap-y-3 md:grid-cols-6 md:gap-x-3">
                      {workflowSteps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                          <div key={step.title} className="relative">
                            <div className="flex flex-col items-center text-center">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-200 bg-white/86 text-orange-600 shadow-[0_10px_20px_rgba(180,83,9,0.05)]">
                                <Icon className="h-6 w-6" />
                              </div>
                              <p className="mt-2 text-[12px] font-medium leading-5 text-amber-950">
                                {step.title}
                              </p>
                            </div>
                            {index < workflowSteps.length - 1 ? (
                              <span className="absolute -right-2 top-4 hidden text-xl text-orange-400 md:block">
                                →
                              </span>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      Multi-Agent 协同调度
                    </h4>
                    <div className="mt-4 space-y-4">
                      <div className="mx-auto max-w-3xl rounded-[1.15rem] border border-orange-100/90 bg-white/88 px-4 py-2.5 text-center shadow-[0_10px_20px_rgba(180,83,9,0.05)]">
                        <div>
                          <h5 className="text-base font-semibold text-amber-950 sm:text-lg">
                            主控 Agent
                          </h5>
                          <p className="mt-1 text-[13px] leading-5 text-stone-600">
                            识别商家意图，结合当前进度拆解任务，并路由到对应业务 Agent。
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                        {agentCards.map((item) => {
                          const Icon = item.icon;

                          return (
                            <div
                              key={item.title}
                              className="rounded-[1.05rem] border border-orange-100/90 bg-white/88 px-3 py-3 text-center shadow-[0_10px_20px_rgba(180,83,9,0.05)]"
                            >
                              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                <Icon className="h-4.5 w-4.5" />
                              </div>
                              <h6 className="mt-2 text-[15px] font-semibold text-amber-950">
                                {item.title}
                              </h6>
                              <p className="mt-1 text-[12px] leading-5 text-stone-600">
                                {item.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap justify-center gap-2">
                        {[...agentCapabilityChips, ...stabilityChips].map((item) => {
                          const Icon = item.icon;

                          return (
                            <div
                              key={item.label}
                              className="flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/84 px-4 py-2 text-sm font-medium text-amber-950"
                            >
                              <Icon className="h-4 w-4 text-orange-600" />
                              {item.label}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      设计价值
                    </h4>
                    <p className="mt-3 text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                      将 Agent 从单轮问答升级为
                      <span className="mx-1 font-semibold text-orange-700">
                        流程执行层
                      </span>
                      ，让它能够
                      <span className="mx-1 font-semibold text-orange-700">
                        理解商家状态
                      </span>
                      、
                      <span className="mx-1 font-semibold text-orange-700">
                        路由任务
                      </span>
                      、
                      <span className="mx-1 font-semibold text-orange-700">
                        调用能力
                      </span>
                      ，并
                      <span className="mx-1 font-semibold text-orange-700">
                        持续推进入驻完成
                      </span>
                      。
                    </p>
                  </div>
                </div>
              ) : variant === "agent-evaluation" ? (
                <div className="mx-auto flex w-full max-w-4xl flex-col items-start space-y-5 text-left">
                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      评测体系设计
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
                            className="rounded-[1rem] border border-orange-100/90 bg-white/82 px-3 py-3 shadow-[0_10px_20px_rgba(180,83,9,0.05)]"
                          >
                            <div className="flex items-center gap-2 text-amber-950">
                              <Icon className="h-4 w-4 text-orange-600" />
                              <h5 className="text-[14px] font-semibold">{group.title}</h5>
                            </div>
                            <div className="mt-3 grid w-full grid-cols-2 gap-2">
                              {group.items.map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full border border-orange-200/80 bg-orange-50/60 px-2.5 py-1 text-center text-[11px] font-medium text-stone-700"
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
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      AI 自动巡检
                    </h4>
                    <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                      主导设计自动巡检 Agent，定义评测口径，自动识别异常会话，实现用 AI 检 AI。
                    </p>
                    <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-stretch">
                      <div className="rounded-[1.15rem] border border-orange-100/90 bg-white/82 p-4 shadow-[0_10px_20px_rgba(180,83,9,0.05)]">
                        <div className="rounded-[0.95rem] bg-orange-50/60 px-3 py-2.5">
                          <p className="flex items-center gap-1.5 text-[12px] font-medium text-stone-500">
                            <UserRound className="h-3.5 w-3.5 text-orange-500" />
                            用户
                          </p>
                          <p className="mt-1 text-[13px] leading-6 text-stone-700">
                            我想找一下你们这边的顾问。
                          </p>
                        </div>
                        <div className="mt-3 rounded-[0.95rem] border border-orange-100/80 bg-white px-3 py-2.5">
                          <p className="flex items-center gap-1.5 text-[12px] font-medium text-stone-500">
                            <Bot className="h-3.5 w-3.5 text-orange-500" />
                            Agent
                          </p>
                          <p className="mt-1 text-[13px] leading-6 text-stone-700">
                            我理解你的心情，但是请先上传菜单照片。
                          </p>
                        </div>
                      </div>

                      <div className="rounded-[1.15rem] border border-orange-100/90 bg-white/82 p-4 shadow-[0_10px_20px_rgba(180,83,9,0.05)]">
                        <h5 className="text-[15px] font-semibold text-amber-950">
                          AI 巡检结果
                        </h5>
                        <div className="mt-3 space-y-2 text-[13px] leading-6 text-stone-700">
                          <p>未正确理解用户诉求</p>
                          <p>未触发兜底机制</p>
                          <p>应提供客服电话但未给出</p>
                          <p className="font-semibold text-orange-700">
                            风险等级：中
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      Bad Case 归因
                    </h4>
                    <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                      将问题从表层现象进一步归因到 Prompt、知识库、Agent 路由、OCR、多模态处理或后台系统链路。
                    </p>
                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      研发复盘闭环
                    </h4>
                    <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                      独立组织每周 Bad Case 复盘，结合 session、traceId 与异常归因，引导研发定位问题、修复与复测。
                    </p>
                  </div>
                </div>
              ) : variant === "data-analytics" ? (
                <div className="mx-auto flex w-full max-w-4xl flex-col items-start space-y-5 text-left">
                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      会话数据分析
                    </h4>
                    <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                      独立开发会话级分析脚本，分析用户和Agent的会话数据以定位用户卡点，推进功能优化。
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[13px] font-medium text-amber-950">
                      {sessionPipeline.map((item, index) => {
                        const Icon = item.icon;

                        return (
                          <div key={item.label} className="flex items-center gap-3">
                            <div className="flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/84 px-3 py-2 shadow-[0_10px_20px_rgba(180,83,9,0.04)]">
                              <Icon className="h-4 w-4 text-orange-600" />
                              <span>{item.label}</span>
                            </div>
                            {index < sessionPipeline.length - 1 ? (
                              <span className="text-orange-400">→</span>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-[1.15rem] border border-orange-100/90 bg-white/82 p-4 shadow-[0_10px_20px_rgba(180,83,9,0.05)]">
                      <h5 className="text-[15px] font-semibold text-amber-950">
                        数据洞察
                      </h5>
                      <p className="mt-3 text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                        门头图AI审核被拒率高达50%
                        <span className="mx-1 text-orange-400">→</span>
                        放宽OCR容错
                        <span className="mx-1 text-orange-400">→</span>
                        商家入驻完成率从21.9%提升至76.6%
                      </p>
                    </div>
                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      官网入口埋点归因
                    </h4>
                    <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                      与数据产品经理协作定义官网入口埋点，分析用户行为以优化功能
                    </p>

                    <div className="mt-5 rounded-[1.15rem] border border-orange-100/90 bg-white/82 p-4 shadow-[0_10px_20px_rgba(180,83,9,0.05)]">
                      <h5 className="text-[15px] font-semibold text-amber-950">
                        来源拆分（UV）
                      </h5>
                      <div className="mt-3 overflow-hidden rounded-full bg-orange-100/70">
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
                          <div key={item.label} className="flex items-center gap-2 text-[12px] text-stone-700">
                            <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                            <span className="font-medium text-amber-950">{item.label}</span>
                            <span>{item.value}</span>
                            <span className="text-stone-500">({item.percent})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto flex w-full max-w-4xl flex-col items-start space-y-5 text-left">
                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      本地场景洞察
                    </h4>
                    <p className="mt-4 max-w-3xl text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                      墨西哥商家以中小家庭餐厅为主，数字化能力有限，复杂表单和人工跟进容易造成入驻流失。
                    </p>
                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      竞品能力参考
                    </h4>
                    <p className="mt-4 max-w-3xl text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                      横向参考
                    </p>
                    <div className="mt-3 grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-6">
                      {competitorLogos.map((item) => (
                        <div
                          key={item.name}
                          className="flex h-14 items-center justify-center rounded-[1rem] bg-white/82 px-3 shadow-[0_10px_20px_rgba(180,83,9,0.05)]"
                        >
                          <img
                            src={item.src}
                            alt={item.name}
                            className="max-h-7 w-auto max-w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 max-w-3xl text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                      的商家入驻链路，重点分析：
                    </p>
                    <div className="mt-4 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
                      {competitorResearchDetails.map((item) => (
                        <div
                          key={item}
                          className="flex h-14 items-center justify-center rounded-[1rem] bg-white/82 px-3 text-center text-[13px] font-medium text-amber-950 shadow-[0_10px_20px_rgba(180,83,9,0.05)]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-amber-950 sm:text-xl">
                      核心判断
                    </h4>
                    <div className="mt-4 max-w-3xl space-y-3 text-[13px] leading-6 text-stone-600 sm:text-[14px] sm:leading-7">
                      <p>
                        <span className="mr-2 font-semibold text-amber-950">1.</span>
                        墨西哥商家入驻需要
                        <span className="mx-1 font-semibold text-orange-700">
                          AI Agent
                        </span>
                        降低
                        <span className="mx-1 font-semibold text-orange-700">
                          资料提交
                        </span>
                        与
                        <span className="mx-1 font-semibold text-orange-700">
                          流程理解门槛
                        </span>
                        。
                      </p>
                      <p>
                        <span className="mr-2 font-semibold text-amber-950">2.</span>
                        Agent 更适合嵌入
                        <span className="mx-1 font-semibold text-orange-700">WhatsApp</span>
                        ，复用
                        <span className="mx-1 font-semibold text-orange-700">图片上传</span>
                        、
                        <span className="mx-1 font-semibold text-orange-700">即时消息</span>
                        、
                        <span className="mx-1 font-semibold text-orange-700">会话触达</span>
                        和
                        <span className="mx-1 font-semibold text-orange-700">用户熟悉度</span>
                        优势。
                      </p>
                      <p>
                        <span className="mr-2 font-semibold text-amber-950">3.</span>
                        自由对话容易造成
                        <span className="mx-1 font-semibold text-orange-700">流程发散</span>
                        ，因此更依赖意图识别、上下文记忆与异常兜底。
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
    <main className="relative min-h-screen overflow-hidden bg-[#fff8ef] text-stone-700">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.1),transparent_22%),linear-gradient(180deg,#fff8ef_0%,#fff3df_42%,#ffe8ca_100%)]" />
      <div className="absolute left-0 top-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute right-0 top-20 -z-10 h-[20rem] w-[20rem] rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute right-16 top-12 -z-10 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl" />

      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 pb-16 pt-6 sm:px-8 lg:px-12">
        <div className="mb-7">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-stone-600 shadow-[0_8px_24px_rgba(180,83,9,0.06)] transition hover:border-orange-300 hover:text-orange-800"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>

        <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="max-w-2xl">
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-amber-950 sm:text-5xl md:text-6xl md:leading-[1.04]">
              <span className="block">DiDi Food Agent</span>
              <span className="block">重构商家入驻体验</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-stone-600 md:text-lg">
              DiDi Food Agent 基于 WhatsApp 与 Multi-Agent 协同，将原本依赖表单填写和人工跟进的流程，重构为对话式入驻、资料识别、实时答疑与审核推进的一体化体验。
            </p>
          </div>

          <div className="relative flex min-h-[430px] items-center justify-center lg:min-h-[500px]">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.16),transparent_44%),radial-gradient(circle_at_72%_28%,rgba(245,158,11,0.08),transparent_18%)]" />
            <div className="relative h-[420px] w-full max-w-[720px]">
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.98)_0%,rgba(255,248,239,0.94)_48%,rgba(255,248,239,0)_72%)] shadow-[0_0_90px_rgba(251,146,60,0.22)]" />
              <div className="absolute left-1/2 top-1/2 h-[338px] w-[338px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/45 animate-[heroPulse_6s_ease-in-out_infinite]" />
              <div className="absolute left-1/2 top-1/2 h-[278px] w-[278px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/70 bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(255,246,234,0.92))] shadow-[0_26px_80px_rgba(251,146,60,0.14)]" />
              <div className="absolute left-1/2 top-1/2 h-[242px] w-[242px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/70 bg-[radial-gradient(circle,rgba(255,255,255,0.98),rgba(255,247,237,0.96))] shadow-[inset_0_0_28px_rgba(251,146,60,0.08)]" />

              <div className="absolute left-1/2 top-1/2 flex w-[240px] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                <img
                  src="/icon/DiDi_Logo.svg"
                  alt="DiDi"
                  className="h-12 w-auto"
                />
                <h3 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950">
                  外卖商家端
                </h3>
                <p className="mt-2 text-lg font-medium text-stone-600">智能入驻助手</p>
              </div>

              <div className="absolute left-[18%] top-[18%] h-3 w-3 rounded-full bg-orange-200/80 animate-[heroGlow_7s_ease-in-out_infinite]" />
              <div className="absolute right-[14%] top-[24%] h-5 w-5 rounded-full bg-orange-200/70 animate-[heroGlow_8s_ease-in-out_infinite_1s]" />
              <div className="absolute left-[22%] bottom-[20%] h-4 w-4 rounded-full bg-orange-100/90 animate-[heroGlow_7.5s_ease-in-out_infinite_2s]" />
              <div className="absolute right-[18%] bottom-[14%] h-6 w-6 rounded-full bg-orange-100/80 animate-[heroGlow_8.2s_ease-in-out_infinite_1.7s]" />

              {heroBubbles.map((bubble) => (
                <div
                  key={bubble.text}
                  className={`absolute max-w-[280px] rounded-[1.35rem] border border-orange-100/80 bg-white/92 px-5 py-4 text-[15px] font-medium leading-6 text-amber-950 shadow-[0_18px_40px_rgba(120,53,15,0.08)] ${bubble.className} ${bubble.delayClassName}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span>{bubble.text}</span>
                    <span className="mt-1 flex shrink-0 gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-[heroDot_1.1s_ease-in-out_infinite]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-[heroDot_1.1s_ease-in-out_infinite_0.18s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-[heroDot_1.1s_ease-in-out_infinite_0.36s]" />
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
              <SectionLabel>一、业务问题</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950 md:whitespace-nowrap md:text-[2.5rem] md:leading-[1.02]">
                痛点：商家入驻流程长、理解成本高、注册后流失明显
              </h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {problemCards.map((item) => (
                <GlassSurface key={item.title} className="rounded-[1.8rem] p-6">
                  <h3 className="text-xl font-semibold text-amber-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    {item.description}
                  </p>
                </GlassSurface>
              ))}
            </div>
          </section>

          <BeforeAfterSection
            title="从“商家理解平台”到“AI 理解商家”"
            description="让 AI 成为贴心客服，读懂商家的当前进度、辅助审核资料状态和跟进下一步任务，帮助入驻流程从被动填写变成主动推进。"
          />

          <AgentArchitectureSection />

          <section>
            <div className="max-w-3xl">
              <SectionLabel>四、我的产品职责</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950 md:text-[2.5rem] md:leading-[1.02]">
                从竞品洞察到 Agent 迭代
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {responsibilities.map((item) => (
                <ResponsibilityCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  expandable={
                    item.title === "市场洞察与方案定义" ||
                    item.title === "Multi-Agent 产品流程设计" ||
                    item.title === "Agent 评测与 Bad Case 分析" ||
                    item.title === "数据分析与埋点监控"
                  }
                  variant={
                    item.title === "Multi-Agent 产品流程设计"
                      ? "agent-workflow"
                      : item.title === "Agent 评测与 Bad Case 分析"
                        ? "agent-evaluation"
                      : item.title === "数据分析与埋点监控"
                        ? "data-analytics"
                      : item.title === "市场洞察与方案定义"
                        ? "market-insight"
                        : "default"
                  }
                />
              ))}
            </div>
          </section>

          <section>
            <div className="max-w-3xl">
              <SectionLabel>五、核心数据结果</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950 md:text-[2.5rem]">
                效率、转化与审核质量同步提升
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-stone-600 md:text-[15px] md:leading-7">
                从自然入驻到流失召回，再到 AI 预审，关键链路均验证有效。
              </p>
            </div>

            <WarmSurface className="mt-6 overflow-hidden rounded-[2rem] border border-orange-200/80 p-0">
              <div className="grid lg:grid-cols-2">
                <div className="p-6 md:p-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-700">
                    <Clock3 className="h-4 w-4" />
                    效率提升
                  </div>
                  <h3 className="mt-4 text-[1.65rem] font-semibold text-amber-950 md:text-[1.9rem]">
                    平均入驻耗时下降
                  </h3>
                  <p className="mt-3 text-[3.6rem] font-semibold tracking-tight text-orange-600 md:text-[4rem]">
                    69.53%
                  </p>
                </div>

                <div className="border-t border-orange-100/80 p-6 lg:border-l lg:border-t-0 md:p-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-700">
                    <Waypoints className="h-4 w-4" />
                    转化提升
                  </div>
                  <h3 className="mt-4 text-[1.65rem] font-semibold text-amber-950 md:text-[1.9rem]">
                    从商机创建到审核通过率
                  </h3>
                  <div className="mt-4 flex items-center gap-3 text-[2.8rem] font-semibold tracking-tight md:text-[3.4rem]">
                    <span className="text-amber-950">55.48%</span>
                    <span className="flex items-center text-2xl font-normal text-orange-400 md:text-3xl">
                      →
                    </span>
                    <span className="text-orange-600">78.46%</span>
                  </div>
                </div>
              </div>
            </WarmSurface>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <GlassSurface className="rounded-[1.9rem] p-5 md:p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-700">
                      <RefreshCcw className="h-4 w-4" />
                      低意愿流失召回
                    </div>
                    <p className="mt-4 text-[3.4rem] font-semibold tracking-tight text-orange-600 md:text-[4rem]">
                      51.47%
                    </p>
                    <p className="mt-2 text-[2rem] font-semibold text-orange-600">+30.84pp</p>
                  </div>
                  <div className="hidden min-w-[220px] flex-1 lg:flex lg:items-center lg:justify-center lg:translate-y-10">
                    <div className="flex h-32 items-end justify-center gap-5">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-stone-500">20.63%</span>
                        <div className="h-12 w-14 rounded-t-2xl bg-orange-200/70" />
                        <span className="text-sm text-stone-600">传统召回</span>
                      </div>
                      <div className="relative flex flex-col items-center gap-2">
                        <span className="absolute -left-10 top-0 text-4xl text-orange-300">↗</span>
                        <span className="text-sm text-stone-500">51.47%</span>
                        <div className="h-24 w-14 rounded-t-2xl bg-orange-500/85" />
                        <span className="text-sm text-stone-600">AI 召回</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassSurface>

              <GlassSurface className="rounded-[1.9rem] p-5 md:p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-700">
                      <CheckCircle2 className="h-4 w-4" />
                      AI 预审有效
                    </div>
                    <p className="mt-4 text-[3.4rem] font-semibold tracking-tight text-orange-600 md:text-[4rem]">
                      97.6%
                    </p>
                    <p className="mt-3 text-base font-medium text-amber-950 md:text-lg">
                      AI 预审后人工通过率
                    </p>
                  </div>
                  <div className="hidden min-w-[220px] flex-1 lg:flex lg:items-center lg:justify-center lg:translate-y-10">
                    <div className="relative mx-auto h-32 w-full max-w-[260px] overflow-hidden rounded-[1.4rem] border border-orange-100/80 bg-orange-50/40 p-4">
                      <div className="absolute left-10 right-4 top-8 h-px bg-orange-100" />
                      <div className="absolute left-10 right-4 top-16 h-px bg-orange-100" />
                      <div className="absolute left-10 right-4 top-24 h-px bg-orange-100" />
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] font-medium text-stone-400">
                        95%
                      </div>
                      <svg viewBox="0 0 220 120" className="absolute bottom-4 left-10 right-4 top-4 h-[calc(100%-2rem)] w-[calc(100%-3.5rem)]">
                        <polyline
                          fill="none"
                          stroke="rgba(249,115,22,0.75)"
                          strokeWidth="3"
                          points="0,70 40,54 80,63 120,50 160,62 220,55"
                        />
                        {[0, 40, 80, 120, 160, 220].map((x, idx) => {
                          const y = [70, 54, 63, 50, 62, 55][idx];
                          return <circle key={x} cx={x} cy={y} r="4" fill="rgba(249,115,22,0.9)" />;
                        })}
                      </svg>
                    </div>
                  </div>
                </div>
              </GlassSurface>
            </div>

            <WarmSurface className="mt-4 rounded-[1.8rem] p-0">
              <div className="grid divide-y divide-orange-100/80 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <p className="text-base font-medium text-amber-950 md:text-lg">
                    <span className="mr-2 text-[2.6rem] font-semibold tracking-tight text-orange-600 md:text-[3rem]">
                      3318
                    </span>
                    家商户覆盖
                  </p>
                </div>
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <p className="text-base font-medium text-amber-950 md:text-lg">
                    核心城市
                    <span className="mx-2 text-[2.6rem] font-semibold tracking-tight text-orange-600 md:text-[3rem]">
                      50%
                    </span>
                    灰度放量
                  </p>
                </div>
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-base font-medium text-amber-950 md:text-lg">
                    已进入真实业务流量验证
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
