import {
  ArrowDownRight,
  Bot,
  BrainCircuit,
  ChartNoAxesColumn,
  Database,
  FileSearch,
  LayoutTemplate,
  Mail,
  MessagesSquare,
  Route,
  Sparkles,
  Waypoints,
} from "lucide-react";
import { AnimatedSection, FadeInCard } from "@/components/animated-section";
import {
  CapabilityChip,
  GlassSurface,
  MetricCard,
  SectionLabel,
  WarmSurface,
} from "@/components/design-system";
import { MerchantCaseStudyCard } from "@/components/merchant-case-study-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SkillGroup } from "@/components/skill-group";
import { TimelineItem } from "@/components/timeline-item";
import { featuredProjects } from "@/data/projects";

const skills = [
  {
    title: "AI 产品",
    skills: [
      "智能体设计",
      "RAG 工作流设计",
      "LLM 评测",
      "提示词策略",
      "产品探索",
      "实验设计",
    ],
  },
  {
    title: "数据与分析",
    skills: [
      "ETL 数据链路",
      "会话分析",
      "指标设计",
      "A/B 灰度分析",
      "报表系统",
      "根因分析",
    ],
  },
  {
    title: "技术能力",
    skills: [
      "TypeScript",
      "Python",
      "SQL",
      "Next.js",
      "工作流编排",
      "结构化 JSON 输出",
    ],
  },
  {
    title: "UX / 产品设计",
    skills: [
      "用户旅程设计",
      "流程原型设计",
      "交互设计",
      "信息架构",
      "运营工具设计",
      "跨团队协作",
    ],
  },
];

const workflowSteps = [
  {
    title: "信号接入",
    description:
      "用户提问、批量输入或业务触发信号进入系统，并结合上下文完成路由。",
    icon: MessagesSquare,
  },
  {
    title: "检索与增强",
    description:
      "通过知识检索、来源打分和元数据增强建立证据层。",
    icon: FileSearch,
  },
  {
    title: "智能体推理",
    description:
      "利用专用提示词或智能体完成意图识别、结构化输出与异常处理。",
    icon: Bot,
  },
  {
    title: "流程编排",
    description:
      "通过业务规则、审批、人审节点与升级逻辑，将 AI 能力转化为可用的产品系统。",
    icon: Waypoints,
  },
  {
    title: "度量闭环",
    description:
      "通过 ETL、质检标签、转化指标和时延分析，把迭代反馈重新注入产品。",
    icon: Database,
  },
];

const approachCards = [
  {
    title: "用户旅程设计",
    description:
      "我会先定义用户卡点、缺失上下文，以及系统需要替用户完成的关键决策。",
    icon: Route,
  },
  {
    title: "工作流设计",
    description:
      "我把产品目标拆成带检索、提示、兜底、审核节点与运营可视性的分步流程。",
    icon: LayoutTemplate,
  },
  {
    title: "AI 能力映射",
    description:
      "我会明确哪些问题由检索、分类、生成、人审和确定性逻辑分别承担。",
    icon: BrainCircuit,
  },
  {
    title: "度量与迭代",
    description:
      "我会为转化、质量、覆盖率和时延建立指标，让优化建立在数据而不是直觉之上。",
    icon: Sparkles,
  },
];

const timeline = [
  {
    period: "现在",
    title: "AI 产品系统",
    subtitle: "智能体工作流、RAG 与运营工具",
    description:
      "聚焦将 LLM 能力转化为可衡量的产品工作流，覆盖评测、路由、异常处理与灰度策略。",
  },
  {
    period: "滴滴",
    title: "商家入驻智能化",
    subtitle: "AI 入驻、召回与 ETL 分析",
    description:
      "负责对话式入驻与后续跟进系统，打通产品设计、多智能体执行与转化导向分析。",
  },
  {
    period: "字节跳动",
    title: "采购智能工作流",
    subtitle: "RAG 匹配与批处理运营设计",
    description:
      "设计高吞吐采购匹配工作流，强调结构化证据、批量处理和稳健的异常机制。",
  },
  {
    period: "基础阶段",
    title: "计算机与 AI 背景",
    subtitle: "产品落地所需的技术底座",
    description:
      "在计算机与 AI 基础上形成产品视角，能够与工程、数据和应用 AI 团队高效协作。",
  },
];

const capabilityChips = ["RAG", "Multi-Agent", "ETL", "Product Analytics", "UX Flow"];

const heroPreviewSteps = [
  {
    title: "用户入口",
    detail: "问题识别与场景路由",
    icon: MessagesSquare,
  },
  {
    title: "证据层",
    detail: "检索、打分、上下文增强",
    icon: FileSearch,
  },
  {
    title: "推理与产出",
    detail: "智能体决策与结构化输出",
    icon: Bot,
  },
];

const merchantOnboardingProject = featuredProjects.find(
  (project) => project.slug === "ai-merchant-onboarding-agent",
);

const otherProjects = featuredProjects.filter(
  (project) => project.slug !== "ai-merchant-onboarding-agent",
);

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.28),transparent_34%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.18),transparent_28%),linear-gradient(180deg,rgba(255,248,239,0.96),rgba(255,243,223,0.78),rgba(255,248,239,0.4))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] animate-[pulse_9s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),transparent_22%),radial-gradient(circle_at_70%_18%,rgba(251,146,60,0.18),transparent_24%)] blur-3xl" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-18 pt-6 sm:px-8 lg:px-12">
        <header className="mb-14 flex items-center justify-between rounded-full border border-orange-200/70 bg-white/76 px-5 py-3 shadow-[0_12px_40px_rgba(180,83,9,0.08)] backdrop-blur-xl">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-amber-950">
              傅鹏威
            </p>
            <p className="text-xs tracking-[0.16em] text-orange-700">
              AI 产品作品集
            </p>
          </div>
          <nav className="hidden gap-6 text-sm text-stone-600 md:flex">
            <a href="#projects" className="transition hover:text-orange-700">
              项目
            </a>
            <a href="#workflow" className="transition hover:text-orange-700">
              工作流
            </a>
            <a href="#experience" className="transition hover:text-orange-700">
              经验
            </a>
            <a href="#contact" className="transition hover:text-orange-700">
              联系我
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-14">
          <AnimatedSection className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/70 bg-white/85 px-4 py-2 text-sm text-orange-800 shadow-[0_10px_30px_rgba(251,146,60,0.08)]">
              <Sparkles className="h-4 w-4" />
              AI 产品经理候选人
            </div>
            <h1 className="mt-8 max-w-5xl text-[2.85rem] font-semibold tracking-tight text-amber-950 sm:text-[3.4rem] md:text-[4.7rem] md:leading-[1.02]">
              傅鹏威专注于智能体工作流、RAG 系统与数据驱动的 AI 产品设计。
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-stone-600 sm:text-lg md:text-[1.18rem]">
              具备计算机与 AI 背景，拥有 AI 入驻智能体、采购智能工作流、ETL 分析与证据约束型 RAG 应用的实战经验。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {capabilityChips.map((chip) => (
                <CapabilityChip
                  key={chip}
                  className="bg-white/78 shadow-[0_8px_24px_rgba(180,83,9,0.06)]"
                >
                  {chip}
                </CapabilityChip>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(249,115,22,0.28)] transition hover:bg-orange-400"
              >
                查看项目
                <ArrowDownRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:1104440542@qq.com?subject=Resume%20Request%20for%20Pengwei%20Fu"
                className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white/74 px-6 py-3.5 text-sm font-semibold text-orange-900 transition hover:border-orange-300 hover:bg-orange-50"
              >
                获取简历
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white/45 px-6 py-3.5 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-800"
              >
                联系我
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection className="grid gap-4 lg:justify-self-end">
            <FadeInCard className="relative overflow-hidden rounded-[2.2rem] shadow-[0_28px_90px_rgba(180,83,9,0.14)] sm:p-0">
              <GlassSurface className="relative overflow-hidden rounded-[2.2rem] bg-white/84 p-6 backdrop-blur-2xl sm:p-7">
              <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,237,213,0.72),rgba(255,255,255,0))]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <SectionLabel className="text-sm tracking-[0.18em]">
                      产品工作流预览
                    </SectionLabel>
                    <p className="mt-3 max-w-md text-sm leading-7 text-stone-600">
                      从用户信号到证据层、智能体推理和业务编排，我更关注整条链路如何形成产品闭环。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-orange-100 bg-orange-50 px-3 py-2 text-right">
                    <p className="text-xs tracking-[0.14em] text-orange-700">
                      FOCUS
                    </p>
                    <p className="mt-1 text-sm font-semibold text-amber-950">
                      Workflow System
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {heroPreviewSteps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.title}
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[1.4rem] border border-orange-100 bg-white/82 p-4"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-amber-950">
                            {step.title}
                          </p>
                          <p className="mt-1 text-xs leading-6 text-stone-500">
                            {step.detail}
                          </p>
                        </div>
                        <div className="text-xs font-medium text-orange-500">
                          0{index + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    ["78.39%", "AI 召回转化"],
                    ["96.45%", "匹配准确率"],
                    ["100%", "引用覆盖率"],
                  ].map(([value, label]) => (
                    <MetricCard
                      key={label}
                      value={value}
                      label={label}
                      emphasis="primary"
                      className="rounded-[1.3rem] px-4 py-4"
                    />
                  ))}
                </div>
              </div>
              </GlassSurface>
            </FadeInCard>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-28 px-6 pb-24 sm:px-8 lg:px-12">
        <AnimatedSection id="about" className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionHeading
            eyebrow="关于我"
            title="我更关注系统设计，而不只是提示词本身。"
            description="我关注的是 AI 能力与产品设计、运营流程、业务结果之间的连接层。我的工作通常落在用户旅程设计、LLM 行为塑造，以及支撑长期优化的数据基础设施之间。"
          />
          <div className="grid gap-4">
            {[
              "设计既对用户有用、又对业务运营安全可控的智能体工作流。",
              "构建证据约束、透明可解释、面向真实任务完成的 RAG 系统。",
              "通过 ETL 和分析体系理解失败模式、用户意图与上线后的迭代重点。",
            ].map((item, index) => (
              <FadeInCard
                key={item}
                delay={0.08 * index}
                className="rounded-3xl border border-orange-200/70 bg-white/80 p-5 backdrop-blur-xl"
              >
                <p className="text-sm leading-7 text-stone-600">{item}</p>
              </FadeInCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects" className="space-y-10">
          <SectionHeading
            eyebrow="精选项目"
            title="围绕产品结果与工作流设计展开的项目案例。"
            description="每个项目都同时包含产品思维、AI 能力设计和运营度量。重点不只是模型能做什么，而是这套工作流在真实环境中上线后表现如何。"
          />
          <div className="grid gap-7">
            {merchantOnboardingProject ? (
              <MerchantCaseStudyCard project={merchantOnboardingProject} />
            ) : null}

            <div className="grid gap-7 xl:grid-cols-2">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  {...project}
                  delay={index * 0.08}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="workflow" className="space-y-10">
          <SectionHeading
            eyebrow="AI 工作流图谱"
            title="我如何把 AI 能力转化成可上线的产品工作流。"
            description="这是我构建多数系统时采用的基本结构：接入、检索、推理、编排、度量。之所以强调结构，是因为产品可靠性往往不是坏在单点能力，而是坏在阶段衔接。"
          />
          <GlassSurface className="p-6 md:p-8">
            <div className="grid gap-4 lg:grid-cols-5">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="relative">
                    <div className="h-full rounded-3xl border border-orange-100 bg-orange-50/80 p-5">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-lg font-semibold text-amber-950">
                        {step.title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-stone-600">
                        {step.description}
                      </p>
                    </div>
                    {index < workflowSteps.length - 1 ? (
                      <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 bg-gradient-to-r from-orange-300/80 to-transparent lg:block" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </GlassSurface>
        </AnimatedSection>

        <AnimatedSection id="skills" className="space-y-10">
          <SectionHeading
            eyebrow="能力矩阵"
            title="产品判断、技术理解与数据分析能力的组合。"
            description="我最适合的位置通常在产品、AI、工程和数据的交界处。这意味着我既能设计用户流程，也能理解模型行为，并在上线后持续搭建度量体系。"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((group) => (
              <SkillGroup key={group.title} {...group} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="approach" className="space-y-10">
          <SectionHeading
            eyebrow="产品与体验方法"
            title="我会围绕采用率、信任感与可衡量提升来设计 AI 产品。"
            description="好的 AI 产品工作通常不只是增加模型输出，而是要决定系统该在什么时候行动、应该暴露哪些证据，以及最终如何定义成功。"
          />
          <WarmSurface className="relative overflow-hidden p-6 shadow-[0_28px_90px_rgba(180,83,9,0.1)] sm:p-8 lg:p-10">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
              <div className="space-y-5">
                <GlassSurface className="rounded-[1.8rem] bg-white/74 p-6 shadow-none">
                  <SectionLabel className="text-[11px]">PRODUCT LENS</SectionLabel>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight text-amber-950">
                    把 AI 能力放进可采用、可解释、可优化的产品系统里。
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    我更重视产品工作流的衔接质量，而不是单点模型能力的展示效果。核心问题通常是：用户何时需要系统介入、系统如何暴露证据、以及团队如何持续度量和优化。
                  </p>
                </GlassSurface>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    {
                      label: "Journey First",
                      value: "用户卡点与决策节点先于功能定义",
                      icon: Route,
                    },
                    {
                      label: "Measure Early",
                      value: "上线前就设计质量、转化和时延指标",
                      icon: ChartNoAxesColumn,
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-[1.4rem] border border-orange-100 bg-orange-50/70 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-orange-700">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs tracking-[0.16em] text-orange-700">
                              {item.label}
                            </p>
                            <p className="mt-1 text-sm font-medium text-stone-700">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {approachCards.map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <FadeInCard
                      key={card.title}
                      delay={index * 0.08}
                      className="rounded-[1.8rem] border border-orange-100 bg-white/82 p-6 backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-orange-700">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-amber-950">
                        {card.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-stone-600">
                        {card.description}
                      </p>
                    </FadeInCard>
                  );
                })}
              </div>
            </div>
          </WarmSurface>
        </AnimatedSection>

        <AnimatedSection id="experience" className="space-y-10">
          <SectionHeading
            eyebrow="经历时间线"
            title="贯穿这些经历的核心，是交付可评估、可优化的 AI 系统。"
            description="无论是入驻、采购智能还是政策报道场景，核心共性都是构建让模型行为、业务逻辑和业务指标紧密连接的产品工作流。"
          />
          <div className="relative space-y-6 before:absolute before:left-[calc(140px+0.5rem)] before:top-2 before:hidden before:h-[calc(100%-1rem)] before:w-px before:bg-orange-200 md:before:block">
            {timeline.map((item) => (
              <TimelineItem key={item.title} {...item} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="pb-8">
          <WarmSurface className="p-8 backdrop-blur-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <SectionLabel className="tracking-[0.24em]">联系方式</SectionLabel>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-amber-950 md:text-4xl">
                  期待参与打造真正有用、可衡量、可落地的 AI 产品。
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
                  如果你正在招聘 AI 产品、智能体工作流或 RAG 平台相关岗位，欢迎和我交流产品案例、工作流设计，以及我如何推动应用型 AI 系统落地。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="mailto:1104440542@qq.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                >
                  <Mail className="h-4 w-4" />
                  1104440542@qq.com
                </a>
                <a
                  href="mailto:1104440542@qq.com?subject=Portfolio%20Inquiry%20for%20Pengwei%20Fu"
                  className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white/75 px-6 py-3 text-sm font-semibold text-orange-900 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  发起交流
                </a>
              </div>
            </div>
          </WarmSurface>
        </AnimatedSection>
      </div>
    </main>
  );
}
