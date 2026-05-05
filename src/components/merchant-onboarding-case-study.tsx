 "use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeAlert,
  Bot,
  BrainCircuit,
  CheckCircle2,
  CircleHelp,
  Database,
  Link2,
  MessageCircleMore,
  Plus,
  RefreshCcw,
  ScanText,
  ScanSearch,
  Sparkles,
  UserRound,
  Waypoints,
  Wrench,
  X,
} from "lucide-react";
import {
  CapabilityChip,
  GlassSurface,
  MetricCard,
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

function ResponsibilityCard({
  title,
  description,
  expandable = false,
  variant = "default",
}: {
  title: string;
  description: string;
  expandable?: boolean;
  variant?: "default" | "market-insight" | "agent-workflow";
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
  const heroMetrics = project.metrics.slice(0, 4);
  const tags = project.tags ?? project.capabilities;
  const problemCards = project.problemCards ?? [];
  const responsibilities = project.responsibilities ?? [];
  const resultCards = project.resultCards ?? [];
  const productDecisionCards = project.productDecisionCards ?? [];
  const capabilityCards = project.capabilityCards ?? [];
  const funnelSteps = project.funnelSteps ?? [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff8ef] text-stone-700">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.1),transparent_22%),linear-gradient(180deg,#fff8ef_0%,#fff3df_42%,#ffe8ca_100%)]" />
      <div className="absolute left-0 top-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute right-0 top-20 -z-10 h-[20rem] w-[20rem] rounded-full bg-amber-200/30 blur-3xl" />

      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-stone-600 shadow-[0_8px_24px_rgba(180,83,9,0.06)] transition hover:border-orange-300 hover:text-orange-800"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:items-start">
          <div className="max-w-4xl">
            <SectionLabel className="inline-flex rounded-full border border-orange-300/70 bg-orange-100 px-4 py-2 text-xs font-medium tracking-[0.18em] text-orange-800">
              {project.type}
            </SectionLabel>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-amber-950 sm:text-5xl md:text-6xl md:leading-[1.04]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-stone-700 md:text-2xl">
              {project.subtitle}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-stone-600 md:text-lg">
              {project.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <CapabilityChip key={tag}>{tag}</CapabilityChip>
              ))}
            </div>
          </div>

          <GlassSurface className="p-6">
            <SectionLabel>核心指标</SectionLabel>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {heroMetrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  emphasis="primary"
                />
              ))}
            </div>
          </GlassSurface>
        </section>

        <div className="mt-18 grid gap-7">
          <section>
            <div className="max-w-3xl">
              <SectionLabel>一、业务问题</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-amber-950 md:text-4xl">
                业务问题：商家入驻流程长、理解成本高、注册后流失明显
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

            <WarmSurface className="mt-6 p-6">
              <SectionLabel>简化漏斗</SectionLabel>
              <div className="relative mt-6">
                <div className="absolute left-[1.1rem] top-3 bottom-3 w-px bg-gradient-to-b from-orange-300 via-orange-200 to-orange-100 lg:left-10 lg:right-10 lg:top-[1.1rem] lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r" />
                <div className="grid gap-5 lg:grid-cols-6 lg:gap-3">
                {funnelSteps.map((step, index) => (
                  <div
                    key={step}
                    className="relative grid grid-cols-[2.2rem_1fr] items-center gap-3 lg:grid-cols-1 lg:justify-items-center lg:text-center"
                  >
                    <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-orange-200 bg-white text-sm font-semibold text-orange-700 shadow-[0_8px_18px_rgba(180,83,9,0.08)] transition-transform duration-200 group-hover:scale-[1.02]">
                      {index + 1}
                    </div>
                    <span className="relative z-10 text-sm font-medium leading-6 text-amber-950 lg:max-w-[7.5rem]">
                      {step}
                    </span>
                  </div>
                ))}
                </div>
              </div>
            </WarmSurface>
          </section>

          <BeforeAfterSection
            title="从“商家理解平台”到“AI 理解商家”"
            description="让 AI 成为贴心客服，读懂商家的当前进度、辅助审核资料状态和跟进下一步任务，帮助入驻流程从被动填写变成主动推进。"
          />

          <AgentArchitectureSection />

          <section>
            <div className="max-w-3xl">
              <SectionLabel>四、我的产品职责</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-amber-950 md:text-4xl">
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
                    item.title === "Multi-Agent 产品流程设计"
                  }
                  variant={
                    item.title === "Multi-Agent 产品流程设计"
                      ? "agent-workflow"
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
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-amber-950 md:text-4xl">
                核心结果：效率、转化与审核质量同步提升
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {resultCards.map((item) => (
                <WarmSurface key={item.title} className="rounded-[1.8rem] p-6">
                  <SectionLabel>{item.category}</SectionLabel>
                  <p className="mt-5 text-4xl font-semibold tracking-tight text-amber-950">
                    {item.value}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-amber-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    {item.description}
                  </p>
                </WarmSurface>
              ))}
            </div>
          </section>

          <section>
            <div className="max-w-3xl">
              <SectionLabel>六、产品与 UX 设计决策</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-amber-950 md:text-4xl">
                产品与 UX 设计：降低认知负担，而不是简单替代表单
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {productDecisionCards.map((item) => (
                <GlassSurface key={item.title} className="rounded-[1.8rem] p-6">
                  <h3 className="text-xl font-semibold text-amber-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    {item.description}
                  </p>
                </GlassSurface>
              ))}
            </div>
          </section>

          <section>
            <div className="max-w-3xl">
              <SectionLabel>七、架构沉淀与复盘</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-amber-950 md:text-4xl">
                {project.reflectionTitle}
              </h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {capabilityCards.map((item) => (
                <WarmSurface key={item.title} className="rounded-[1.8rem] p-6">
                  <h3 className="text-xl font-semibold text-amber-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    {item.description}
                  </p>
                </WarmSurface>
              ))}
            </div>

            <GlassSurface className="mt-6 p-7">
              <SectionLabel>复盘</SectionLabel>
              <div className="mt-5 flex gap-3">
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-orange-500" />
                <p className="max-w-4xl text-base leading-8 text-stone-600 md:text-lg">
                  {project.reflection}
                </p>
              </div>
            </GlassSurface>
          </section>
        </div>
      </div>
    </main>
  );
}
