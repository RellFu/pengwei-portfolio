"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  Bot,
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
    title: "商品标准化匹配",
    description: "统一商品命名，写回结构化结果",
    icon: Tags,
  },
  {
    title: "供应商比价 AI",
    description: "生成可追溯的比价总结",
    icon: Landmark,
  },
  {
    title: "艺人价格咨询 Agent",
    description: "检索历史案例，提供价格建议",
    icon: Bot,
  },
];

const overviewTags = ["更高效", "更可控", "更可追溯", "可复用"];

const problemCards = [
  {
    title: "商品命名不统一",
    description:
      "多来源商品名称混乱，标准缺失，影响检索、去重与业务分析准确性。",
    icon: Tags,
  },
  {
    title: "比价总结依赖人工",
    description:
      "历史报价分散在表格和记录中，人工整理耗时长，容易遗漏关键信息。",
    icon: BarChart3,
  },
  {
    title: "价格咨询缺少依据",
    description:
      "同类合作案例难以快速检索，价格建议缺乏证据支撑，难以统一和复用。",
    icon: FolderSearch2,
  },
];

const toolProjects = [
  {
    title: "项目一：采购商品标准化匹配系统",
    summary:
      "基于 RAG 架构，搭建标准SKU 映射知识库，自动完成商品标准化匹配与结果写回。",
    problem: "供应商给出的的商品命名不统一，SKU管理混乱，影响检索与业务分析。",
    solution: "RAG 检索 + 规则打分 + LLM 匹配，输出标准化结果并自动写回。",
    result:
      "支持批量自动化运行，按评分规则区分匹中与未匹中，结果可复核可追溯。",
    previewType: "matching" as const,
  },
  {
    title: "项目二：供应商比价 AI Summary",
    summary:
      "基于 RAG + 结构化报价数据，自动生成带 evidence 的供应商比价总结与谈判建议。",
    problem:
      "寻源系统原本更像报价和谈判流程工具，采购员需要自己查看报价表、历史轮次和异常价格，再人工整理比价结论，耗时且容易遗漏。",
    solution:
      "将输入拆成比价模板、本次比价指标、历史报价轮次和价格详情数据四类上下文，让 LLM 在明确数据协议下生成 PE1 客观总结与 PE2 谈判建议。",
    result:
      "系统从流程工具升级为数据分析与谈判辅助工具，减少人工写总结和找异常的成本；PE1 / PE2 分开评测，MOS 目标准确率不低于 90%。",
    previewType: "summary" as const,
  },
  {
    title: "项目三：艺人价格咨询 Agent",
    summary:
      "基于 RAG 检索历史案例，提供证据支撑的价格建议与参考。",
    problem: "历史案例分散，难以快速找到可参考的价格与合作条件。",
    solution: "RAG 检索相似案例 + 案例提取 + 可解释建议输出。",
    result: "大幅提升咨询响应效率与覆盖准确率，输出可解释可复用。",
    chips: [
      "10倍+ 响应效率",
      "90%+ 案例覆盖准确率",
      "100% 可解释输出",
    ],
    previewType: "agent" as const,
  },
];

const methodCards = [
  {
    title: "业务流程拆解",
    description:
      "从采购执行链路中拆解检索、匹配、判断、输出和回写等关键环节。",
    icon: Boxes,
  },
  {
    title: "RAG 与知识库设计",
    description:
      "围绕 SKU、报价和历史案例构建检索策略，提升召回与匹配准确率。",
    icon: FileSearch,
  },
  {
    title: "结构化输出与阈值控制",
    description:
      "统一输出字段和格式，结合阈值控制与人工兜底，提升结果可控性。",
    icon: ShieldCheck,
  },
  {
    title: "Workflow 产品化",
    description:
      "将 AI 能力封装为可批处理、可回写、可复核的业务工作流。",
    icon: Database,
  },
];

const resultCards = [
  {
    value: "96.45%+",
    title: "匹配准确率",
    description: "商品标准化匹配准确率显著提升。",
  },
  {
    value: "数十倍",
    title: "效率提升",
    description: "从小时级人工整理压缩到自动化秒级处理。",
  },
  {
    value: "100%",
    title: "可追溯输出",
    description: "核心结论绑定 evidence，支持复核与审计。",
  },
  {
    value: "10倍+",
    title: "咨询效率",
    description: "艺人价格咨询响应效率大幅提升。",
  },
];

const matchingSteps = [
  { label: "原始商品行", icon: PackageSearch },
  { label: "结构化处理", icon: Database },
  { label: "知识库检索", icon: FileSearch },
  { label: "规则打分", icon: ShieldCheck },
  { label: "LLM 匹配", icon: Sparkles },
  { label: "结果写回", icon: BadgeCheck },
];

function MatchingPreview() {
  return (
    <GlassSurface className="rounded-[1.6rem] border-orange-100/80 p-4 shadow-[0_18px_50px_rgba(180,83,9,0.08)]">
      <div className="grid gap-3 sm:grid-cols-6">
        {matchingSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.label} className="relative rounded-[1rem] border border-orange-100 bg-orange-50/72 px-3 py-3 text-center">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-orange-600 shadow-[0_8px_16px_rgba(180,83,9,0.06)]">
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-2 text-[12px] font-semibold text-amber-950">{step.label}</p>
              {index < matchingSteps.length - 1 ? (
                <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-orange-300 sm:block">
                  <ArrowRight className="h-4 w-4" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-[1.1rem] border border-dashed border-orange-200 bg-orange-50/55 px-3 py-2 text-[11px] leading-5 text-stone-600">
        <span className="font-medium text-orange-700">规则打分：</span>
        通过 prompt 定义相似度评分规则，并按分值区分匹中与未匹中。
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto_1.14fr] lg:items-center">
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-orange-700">
            原始商品数据
          </p>
          <div className="overflow-hidden rounded-[1.05rem] border border-orange-100 bg-[linear-gradient(180deg,rgba(255,247,237,0.96),rgba(255,237,213,0.78))]">
            <div className="grid grid-cols-[1.72fr_0.28fr] gap-1 border-b border-orange-100 px-3 py-2 text-[10px] font-medium text-stone-500">
              <span>商品名称（原始）</span>
              <span>单价</span>
            </div>
            {[
              ["旺旺 黑米雪饼 原味 425g 家庭装", "13"],
              ["盼盼 薄脆饼干 早餐代餐糕点 海盐味 600g/箱", "23"],
              ["无穷烤鸡翅根 蜂蜜味 20g*20个/盒", "44"],
              ["格力高 百醇巧克力味 48g*5条", "23"],
            ].map((row, index) => (
              <div
                key={row[0]}
                className={`grid grid-cols-[1.72fr_0.28fr] gap-1 px-3 py-2 text-[10px] leading-4 text-stone-600 ${
                  index < 3 ? "border-b border-orange-100" : ""
                }`}
              >
                <span>{row[0]}</span>
                <span>{row[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex items-center justify-center text-orange-400">
          <div className="flex items-center gap-0.5">
            <span className="h-0.5 w-3 rounded-full bg-orange-300 animate-[heroFloat_1.1s_ease-in-out_infinite]" />
            <ArrowRight className="h-8 w-8 animate-[heroFloat_1.1s_ease-in-out_infinite]" />
            <span className="h-0.5 w-3 rounded-full bg-orange-300 animate-[heroFloat_1.1s_ease-in-out_infinite]" />
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-orange-700">
            AI 匹配结果
          </p>
          <div className="overflow-hidden rounded-[1.05rem] border border-orange-200 bg-[linear-gradient(180deg,rgba(255,244,229,0.92),rgba(255,233,200,0.78))] shadow-[0_10px_28px_rgba(180,83,9,0.08)]">
            <div className="grid grid-cols-[0.64fr_1.58fr_0.38fr_0.7fr] gap-1 border-b border-orange-100 px-3 py-2 text-[10px] font-medium text-stone-500">
              <span>状态</span>
              <span>标准商品名</span>
              <span>匹配分</span>
              <span>编码</span>
            </div>
            {[
              ["匹中", "旺旺 黑米雪饼 原味 425g 家庭装", "100", "100215967295", "text-green-600"],
              ["匹中", "盼盼 薄脆饼干 平海苔味 600g/箱", "80", "10042066802", "text-green-600"],
              ["匹中", "无穷烤鸡翅根 蜂蜜味 20g*20个/盒", "60", "100271642222", "text-green-600"],
              ["未匹中", "格力高 百醇巧克力味 48g*5条", "0", "—", "text-red-500"],
            ].map((row, index) => (
              <div
                key={row[1]}
                className={`grid grid-cols-[0.64fr_1.58fr_0.38fr_0.7fr] gap-1 px-3 py-2 text-[10px] leading-4 text-stone-600 ${
                  index < 3 ? "border-b border-orange-100" : ""
                }`}
              >
                <span className={`flex items-center font-semibold ${row[4]}`}>{row[0]}</span>
                <span>{row[1]}</span>
                <span
                  className={`flex items-center font-semibold ${
                    row[2] === "0" ? "text-red-500" : "text-orange-600"
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

    </GlassSurface>
  );
}

function SummaryPreview() {
  return (
    <GlassSurface className="overflow-hidden rounded-[1.7rem] border-orange-100/80 p-4 shadow-[0_18px_50px_rgba(180,83,9,0.08)]">
      <div className="space-y-4">
        <div className="rounded-[1.25rem] border border-orange-100 bg-orange-50/70 p-4">
          <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] text-orange-700">
                输入
              </p>
              <div className="mt-3 grid gap-2">
                {[
                  ["比价模板", "报价维度 / 对比口径"],
                  ["本次比价指标", "价格 / 交付 / 风险"],
                  ["历史报价轮次", "多轮报价记录"],
                  ["价格详情", "异常价格与明细"],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="flex items-center justify-between rounded-[0.95rem] border border-orange-100 bg-white/88 px-3 py-2 text-[11px] text-stone-600"
                  >
                    <span className="font-medium text-amber-950">{row[0]}</span>
                    <span>{row[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] text-orange-700">
                输出
              </p>
              <div className="mt-3 grid gap-2">
                {[
                  ["PE1 总结", "客观总结"],
                  ["PE2 建议", "谈判建议"],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="rounded-[1rem] border border-orange-100 bg-white/90 px-3 py-3"
                  >
                    <p className="text-[12px] font-semibold text-amber-950">{row[0]}</p>
                    <p className="mt-1 text-[11px] leading-5 text-stone-600">
                      {row[1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[0.35fr_0.65fr] lg:gap-8 lg:items-start">
          <div className="rounded-[1.25rem] border border-orange-100 bg-orange-50/65 p-4">
            <p className="text-[11px] font-medium tracking-[0.16em] text-orange-700">
              输入示例
            </p>
            <div className="mt-3 space-y-2">
              {[
                ["供应商 A", "¥128,000"],
                ["供应商 B", "¥121,500"],
                ["供应商 C", "¥136,000"],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="flex items-center justify-between rounded-[0.95rem] border border-orange-100 bg-white/88 px-3 py-2 text-[11px] text-stone-600"
                >
                  <span>{row[0]}</span>
                  <span className="font-medium text-amber-950">{row[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-orange-100 bg-orange-50/70 p-4">
            <p className="text-[11px] font-medium tracking-[0.16em] text-orange-700">
              输出结果
            </p>
            <div className="mt-3 rounded-[1rem] border border-orange-100 bg-white/88 p-4">
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] text-orange-700">
                  PE1 价格总结
                </p>
                <ul className="mt-3 space-y-2 text-[11px] leading-5 text-stone-600">
                  <li>供应商 B 报价最低，A 交付周期更短。</li>
                </ul>
              </div>

              <div className="mt-4 border-t border-orange-100 pt-4">
                <p className="text-[11px] font-medium tracking-[0.16em] text-orange-700">
                  PE2 谈判建议
                </p>
                <ul className="mt-3 space-y-2 text-[11px] leading-5 text-stone-600">
                  <li>优先推进供应商 B，A 可作为备选，注意关注异常价格与交付周期。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-orange-100 bg-white/82 p-3">
          <p className="text-[11px] font-medium tracking-[0.16em] text-orange-700">
            评估与保障
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {[
              ["PE1", "仅总结，不给建议"],
              ["PE2", "仅基于价格详情给建议"],
              ["MOS", "置信度 / 完整性 / 格式"],
            ].map((item) => (
              <div
                key={item[0]}
                className="rounded-[0.95rem] border border-orange-100 bg-orange-50/75 px-3 py-2 text-[11px] text-stone-600"
              >
                <div className="font-medium text-amber-950">{item[0]}</div>
                <div className="mt-1 text-[10px] leading-5 text-stone-500">{item[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassSurface>
  );
}

function AgentPreview() {
  return (
    <GlassSurface className="overflow-hidden rounded-[1.7rem] border-orange-100/80 p-4 shadow-[0_18px_50px_rgba(180,83,9,0.08)]">
      <SectionLabel className="text-[11px]">ARTIST PRICE AGENT</SectionLabel>
      <div className="mt-4 space-y-3">
        <div className="ml-auto max-w-[88%] rounded-[1.2rem] border border-orange-100 bg-orange-50/80 px-4 py-3 text-[12px] leading-6 text-stone-600">
          某艺人在一线城市音乐节的合作报价大概在哪个区间？
        </div>
        <div className="max-w-[94%] rounded-[1.2rem] border border-orange-100 bg-white/88 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-950">
            <ScanSearch className="h-4 w-4 text-orange-500" />
            检索到相似案例
          </div>
          <div className="mt-3 grid gap-2">
            {[
              ["案例 A", "¥180k - ¥220k", "音乐节 / 一线城市"],
              ["案例 B", "¥210k - ¥240k", "品牌活动 / 一线城市"],
              ["案例 C", "¥190k - ¥230k", "演出季 / 新歌宣发"],
            ].map((row) => (
              <div
                key={row[0]}
                className="grid grid-cols-[0.72fr_0.86fr_1fr] gap-2 rounded-[0.95rem] bg-orange-50/65 px-3 py-2 text-[11px] text-stone-600"
              >
                <span className="font-medium text-amber-950">{row[0]}</span>
                <span>{row[1]}</span>
                <span className="truncate">{row[2]}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-[1rem] border border-orange-100 bg-white/80 px-3 py-3 text-[12px] leading-6 text-stone-600">
            建议参考区间为 <span className="font-semibold text-orange-600">¥200k - ¥230k</span>，
            依据是相似活动类型、城市等级与艺人近一年合作记录。
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
    <main className="relative min-h-screen overflow-hidden bg-[#fff8ef] text-stone-700">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_24%),linear-gradient(180deg,#fff8ef_0%,#fff2de_42%,#ffe8ca_100%)]" />
      <div className="absolute left-0 top-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-orange-300/18 blur-3xl" />
      <div className="absolute right-0 top-24 -z-10 h-[22rem] w-[22rem] rounded-full bg-amber-200/28 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-stone-600 shadow-[0_8px_24px_rgba(180,83,9,0.06)] transition hover:border-orange-300 hover:text-orange-800"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight text-amber-950 sm:text-5xl md:text-6xl md:leading-[1.04]">
              ByteDance AI Tools：把采购流程转化为可复用的 AI Workflow
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600 md:text-xl">
              针对字节跳动采购与业务决策场景，围绕商品标准化、供应商比价与艺人价格咨询三类高人工成本流程，独立设计并落地
              3 个从 0 到 1 的 AI 工具，让流程更高效、决策更可控、结果更可追溯。
            </p>
          </div>

          <GlassSurface className="p-6">
            <SectionLabel>三个 AI 工具概览</SectionLabel>
            <div className="mt-5 grid gap-3">
              {overviewCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="rounded-[1.5rem] border border-orange-100 bg-white/80 p-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-amber-950">
                      {card.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {overviewTags.map((tag) => (
                <CapabilityChip key={tag} className="bg-orange-50/75">
                  {tag}
                </CapabilityChip>
              ))}
            </div>
          </GlassSurface>
        </section>

        <div className="mt-16 grid gap-8">
          <section>
            <div className="max-w-4xl">
              <SectionLabel>一、业务问题</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950 md:text-[2.5rem] md:leading-[1.02]">
                采购数据分散、命名混乱、人工判断成本高
              </h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {problemCards.map((item) => {
                const Icon = item.icon;

                return (
                  <GlassSurface key={item.title} className="rounded-[1.8rem] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-amber-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-stone-600">
                      {item.description}
                    </p>
                  </GlassSurface>
                );
              })}
            </div>
          </section>

          <section>
            <div className="max-w-4xl">
              <SectionLabel>二、三个从 0 到 1 的 AI 工具</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950 md:text-[2.5rem] md:leading-[1.02]">
                围绕采购场景拆出 3 个可复用的 AI Workflow
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-stone-600">
                围绕采购数据标准化、比价总结和价格咨询三个场景，分别设计可批处理、可追溯、可复用的 AI Workflow。
              </p>
            </div>

            <div className="mt-8 grid gap-6">
              {toolProjects.map((item) => (
                <WarmSurface key={item.title} className="p-5 sm:p-6 lg:p-7">
                  <div
                    className={`grid gap-6 lg:items-start ${
                      "lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]"
                    }`}
                  >
                    <div>
                      <h3 className="text-[1.75rem] font-semibold tracking-tight text-amber-950">
                        {item.previewType === "matching" ? "项目一：商品信息整理系统" : item.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-stone-600">
                        {item.previewType === "summary"
                          ? "面向寻源比价场景，将报价表、历史轮次和价格明细转化为AI 总结能力，辅助采购员快速形成比价判断。"
                          : item.summary}
                      </p>

                      <div className="mt-6 space-y-3">
                        <div className="rounded-[1.35rem] border border-orange-100 bg-white/82 p-4">
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-700">
                            PROBLEM
                          </p>
                          <p className="mt-2 text-sm leading-7 text-stone-600">
                            寻源系统原本更偏报价和谈判流程管理，采购员仍需要手动查看报价表、历史轮次和异常价格，再整理比价结论，耗时且容易遗漏关键变化。
                          </p>
                        </div>
                        <div className="rounded-[1.35rem] border border-orange-100 bg-white/82 p-4">
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-700">
                            SOLUTION
                          </p>
                          <p className="mt-2 text-sm leading-7 text-stone-600">
                            参与上下文设计与输出约束，将输入拆成比价模板、本次比价指标、历史报价轮次和价格详情数据四类，让 LLM 在明确数据协议下生成 PE1 客观总结与 PE2 谈判建议。
                          </p>
                        </div>
                        <div className="rounded-[1.35rem] border border-orange-100 bg-white/82 p-4">
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-700">
                            RESULT
                          </p>
                          <p className="mt-2 text-sm leading-7 text-stone-600">
                            系统从流程工具升级为数据分析与谈判辅助工具，可自动生成当前价格总结、多轮报价变化总结和谈判建议；PE1 和 PE2 分开评测，MOS 目标准确率不低于 90%。
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

                    <div className={item.previewType === "matching" ? "mt-2 lg:mt-12" : ""}>
                      <ToolPreview type={item.previewType} />
                    </div>
                  </div>
                </WarmSurface>
              ))}
            </div>
          </section>

          <section>
            <div className="max-w-4xl">
              <SectionLabel>三、方法沉淀</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950 md:text-[2.5rem] md:leading-[1.02]">
                从数据整理到决策支持的 AI 产品方法
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {methodCards.map((item) => {
                const Icon = item.icon;

                return (
                  <GlassSurface key={item.title} className="rounded-[1.8rem] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-amber-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-stone-600">
                      {item.description}
                    </p>
                  </GlassSurface>
                );
              })}
            </div>
          </section>

          <section>
            <div className="max-w-4xl">
              <SectionLabel>四、核心结果</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950 md:text-[2.5rem] md:leading-[1.02]">
                效率、准确率与可追溯性同步提升
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {resultCards.map((card) => (
                <MetricCard
                  key={card.title}
                  value={card.value}
                  label={
                    <span className="space-y-1">
                      <span className="block text-sm font-semibold tracking-normal text-amber-950">
                        {card.title}
                      </span>
                      <span className="block text-[12px] leading-6 text-stone-500">
                        {card.description}
                      </span>
                    </span>
                  }
                  emphasis="primary"
                  className="rounded-[1.7rem] p-5"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
