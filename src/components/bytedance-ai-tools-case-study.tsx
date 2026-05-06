"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CircleAlert,
  BadgeCheck,
  BarChart3,
  Bot,
  Building2,
  Code2,
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
  UserRound,
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
    title: "成熟先例少",
    description:
      "AI 采购缺少成熟先例，需要从真实流程中拆场景，定义边界并验证可行性。",
    icon: Tags,
  },
  {
    title: "数据链路复杂",
    description:
      "报价、历史轮次和合同数据分散，字段口径不统一，影响检索与分析质量。",
    icon: BarChart3,
  },
  {
    title: "输出风险高",
    description:
      "价格和供应商信息高度敏感，AI 结果一旦误判，会影响采购决策和业务复盘。",
    icon: FolderSearch2,
  },
];

const toolProjects = [
  {
    title: "项目一：艺人价格咨询 Agent",
    summary:
      "基于历史合作案例与结构化价格信息，构建面向采购场景的艺人价格咨询 Agent。用户输入艺人、平台、活动形式及时长等需求后，系统自动召回相似案例，返回参考价格区间、案例依据与风险提示，帮助采购更快完成初步报价判断。",
    problem:
      "艺人报价案例分散在历史合作记录中，缺少统一检索与横向对比能力。采购在输入艺人、活动形式、平台及时长等需求后，仍需要人工翻查相似案例，判断成本高，报价咨询效率低。",
    solution:
      "围绕艺人名称、平台、活动类型、时长、城市等级与历史合作价格等关键信息，构建价格咨询 Agent。用户输入需求后，系统自动召回相似案例，提取价格区间与关键条件，并返回参考报价及依据。",
    result:
      "将原本依赖人工检索和经验判断的流程，升级为可快速查询、可解释的价格参考能力。报价咨询效率提升 10倍+，相似案例覆盖准确率 90%+，输出结果可解释、可复用，帮助采购更快完成初步报价判断。",
    chips: [],
    previewType: "agent" as const,
  },
  {
    title: "项目二：商品信息整理系统",
    summary:
      "基于 RAG 架构，搭建标准 SKU 映射知识库，自动完成商品标准化匹配与结果回写。",
    problem:
      "供应商出库记录和商品信息格式不统一，商品名称、单位、规格、价格字段经常混乱；同一商品可能存在多种表达方式，采购和数据同学需要人工逐条归类、匹配标准 SKU，耗时长且容易出错。",
    solution:
      "搭建标准 SKU / 食材映射知识库，将原始商品行拆解为结构化字段，通过知识库检索召回候选，再结合规则打分和 LLM 语义判断完成标准化匹配；低分结果不直接入表，最终将原始记录、匹配分和标准商品字段回写到多维表格。",
    result:
      "将混乱商品记录转化为可统计、可比价、可追溯的标准化数据，减少人工逐条整理成本，支持后续入口率统计、成本分析和供应商比价。",
    previewType: "matching" as const,
  },
  {
    title: "项目三：供应商比价 AI Summary",
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
];

const methodCards = [
  {
    title: "业务理解先行",
    description:
      "先和采购相关业务方对齐真实流程，理解报价和比价等规则，再把模糊诉求转成清晰的 AI 产品任务。",
    icon: PackageSearch,
  },
  {
    title: "从需求到可用工具",
    description:
      "将业务方需求拆成具体处理逻辑，独立交付可用工具，而非停留在原型阶段。",
    icon: Boxes,
  },
  {
    title: "代码驱动交付",
    description:
      "用 Python、JavaScript 完成结构化数据处理、JSON 拆解、规则判断和结果写回，让 AI 能力直接接入真实采购分析流程。",
    icon: Code2,
  },
  {
    title: "AI 工具协同开发",
    description:
      "结合 Codex，Cursor 等 coding 工具快速开发和调试，在产品判断与工程实现之间缩短交付周期，提升小团队落地效率。",
    icon: Bot,
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
    <GlassSurface className="h-full rounded-[1.6rem] border-orange-100/80 p-4 shadow-[0_18px_50px_rgba(180,83,9,0.08)]">
      <div className="space-y-4">
        <div className="rounded-[1.25rem] border border-orange-100 bg-orange-50/60 p-4">
          <p className="text-[11px] font-medium tracking-[0.16em] text-orange-700">
            工作流
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-6">
            {matchingSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.label} className="relative rounded-[1rem] border border-orange-100 bg-white/88 px-3 py-3 text-center">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 shadow-[0_8px_16px_rgba(180,83,9,0.06)]">
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

          <div className="mt-4 rounded-[1.1rem] border border-dashed border-orange-200 bg-white/88 px-3 py-2 text-[11px] leading-5 text-stone-600">
            <span className="font-medium text-orange-700">规则打分：</span>
            通过 prompt 定义相似度评分规则，并按分值区分匹中与未匹中。
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-orange-700">
              原始商品数据
            </p>
            <div className="overflow-hidden rounded-[1.05rem] border border-orange-100 bg-white/88">
              <div className="grid grid-cols-[minmax(0,1fr)_3rem] gap-1 border-b border-orange-100 px-3 py-2 text-[10px] font-medium text-stone-500">
                <span className="min-w-0">原始商品名称</span>
                <span>单价</span>
              </div>
              {[
                ["原味旺旺雪饼435克黑米家庭团聚送亲戚", "13"],
                ["早餐糕点盼盼薄脆饼干海盐口味600g/箱", "23"],
                ["无穷牌蜂蜜味烤鸡翅根20g*20个/盒", "44"],
                ["格力高 百醇巧克力味 48g*5条", "23"],
              ].map((row, index) => (
                <div
                  key={row[0]}
                  className={`grid grid-cols-[minmax(0,1fr)_3rem] gap-1 px-3 py-2 text-[10px] leading-4 text-stone-600 ${
                    index < 3 ? "border-b border-orange-100" : ""
                  }`}
                >
                  <span className="min-w-0">{row[0]}</span>
                  <span>{row[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-orange-700">
              AI 匹配结果
            </p>
            <div className="overflow-hidden rounded-[1.05rem] border border-orange-200 bg-white/88 shadow-[0_10px_28px_rgba(180,83,9,0.08)]">
              <div className="grid grid-cols-[2.75rem_minmax(0,1fr)_3rem_3.5rem] gap-1 border-b border-orange-100 px-3 py-2 text-[10px] font-medium text-stone-500">
                <span>状态</span>
                <span className="min-w-0">标准商品名</span>
                <span>匹配分</span>
                <span>编码</span>
              </div>
              {[
                ["匹中", "旺旺 黑米雪饼 原味 425g 家庭装", "100", "423", "text-green-600"],
                ["匹中", "盼盼 薄脆饼干 平海苔味 600g/箱", "80", "563", "text-green-600"],
                ["匹中", "无穷烤鸡翅根 蜂蜜味 20g*20个/盒", "60", "629", "text-green-600"],
                ["未匹中", "格力高 百醇巧克力味 48g*5条", "0", "—", "text-red-500"],
              ].map((row, index) => (
                <div
                  key={row[1]}
                  className={`grid grid-cols-[2.75rem_minmax(0,1fr)_3rem_3.5rem] gap-1 px-3 py-2 text-[10px] leading-4 text-stone-600 ${
                    index < 3 ? "border-b border-orange-100" : ""
                  }`}
                >
                  <span className={`flex items-center font-semibold ${row[4]}`}>{row[0]}</span>
                  <span className="min-w-0">{row[1]}</span>
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
      </div>

    </GlassSurface>
  );
}

function SummaryPreview() {
  return (
    <GlassSurface className="h-full overflow-hidden rounded-[1.7rem] border-orange-100/80 p-4 shadow-[0_18px_50px_rgba(180,83,9,0.08)]">
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
              <p className="text-[11px] leading-6 text-stone-600">
                供应商 B 报价最低，A 交付周期更短。建议优先推进供应商 B，A 可作为备选，注意关注异常价格与交付周期。
              </p>
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
  const userQuery =
    "如果请傅鹏伟参加抖音年度哈哈大会讲5分钟脱口秀，近期参考价是？";

  const peerCases = [
    ["案例 A", "¥180k - ¥220k", "线下活动 / 5min / 脱口秀表演"],
    ["案例 B", "¥210k - ¥240k", "品牌晚会 / 8min / 开场脱口秀"],
  ];

  return (
    <GlassSurface className="h-full overflow-hidden rounded-[1.7rem] border-orange-100/80 p-4 shadow-[0_12px_30px_rgba(180,83,9,0.05)]">
      <div className="space-y-4">
        <div className="rounded-[1.2rem] border border-orange-200 bg-orange-50/75 px-4 py-3 shadow-[0_6px_16px_rgba(120,53,15,0.04)]">
          <div className="flex items-center gap-3 text-[12px] leading-6 text-stone-700">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
              <UserRound className="h-4 w-4" />
            </div>
            <span className="flex-1 font-medium text-amber-950">{userQuery}</span>
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-orange-100 bg-orange-50/50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-950">
            <Bot className="h-4 w-4 text-orange-600" />
            Agent 分析结果
          </div>
            <div className="mt-3 space-y-3">
            <div className="rounded-[1rem] border border-orange-100 bg-white/90 p-4">
              <div className="text-[12px] font-semibold text-amber-950">艺人基本信息</div>
              <p className="mt-3 text-[11px] leading-5 text-stone-600">
                傅鹏伟，中国内地脱口秀演员。代表作有《需求评审睡着了》《我和研发做兄弟》等，还参加过《乘风破浪的AI产品实习生》等综艺；
              </p>
              <p className="mt-2 text-[11px] leading-5 text-stone-600">
                参考定级定价：抖音粉丝量为296.49万，话题播放量为207.65亿，定级为A
              </p>
            </div>

            <div className="rounded-[1rem] border border-orange-100 bg-white/90 p-4">
              <div className="text-[12px] font-semibold text-amber-950">同级案例表单</div>
              <div className="mt-3 grid gap-2">
                {peerCases.map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[0.72fr_0.86fr_1fr] gap-2 rounded-[0.95rem] border border-orange-100 bg-orange-50/45 px-3 py-2 text-[11px] text-stone-600"
                  >
                    <span className="font-medium text-amber-950">{row[0]}</span>
                    <span>{row[1]}</span>
                    <span className="truncate">{row[2]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1rem] border border-orange-100 bg-white/90 px-4 py-4 text-[12px] leading-6 text-stone-600">
              <p className="font-medium text-amber-950">建议结果</p>
              <p className="mt-3">
                建议参考区间为 <span className="font-semibold text-orange-600">¥200k - ¥230k</span>，
                依据是近 3 个月参考案例生成。
              </p>
            </div>

            <div className="rounded-[1rem] border border-amber-200 bg-amber-50/70 px-4 py-4 text-[12px] leading-6 text-stone-600 shadow-[0_6px_16px_rgba(180,83,9,0.04)]">
              <div className="flex items-center gap-2 font-medium text-amber-950">
                <CircleAlert className="h-4 w-4 text-amber-600" />
                舆论预警
              </div>
              <p className="mt-3">
                近期傅鹏伟在某场直播中坦言“产品经理可以完全代替研发”，引发公众舆论；且在 2025 年被媒体爆出在公司和运营 leader 有严重矛盾，被怀疑是人品问题，请注意合作舆情风险。
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

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight text-amber-950 sm:text-5xl md:text-6xl md:leading-[1.04]">
              ByteDance PSAI
              <br />
              赋能采购决策流程
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600 md:text-xl">
              面向字节采购业务中的商品匹配、比价总结和价格咨询场景，实现 3 个 AI 工具的产品设计与工程落地，将高人工成本流程转化为更高效、更稳定的 AI 工作流。
            </p>
          </div>

          <div className="relative min-h-[420px]">
            <div className="absolute inset-0 -z-10 rounded-[2.4rem] bg-[radial-gradient(circle_at_50%_50%,rgba(60,140,255,0.10),transparent_34%),radial-gradient(circle_at_18%_22%,rgba(251,146,60,0.12),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(120,230,221,0.16),transparent_26%)]" />
            <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2">
              <div className="h-full w-full animate-[byteTrackSpin_32s_linear_infinite] rounded-full border border-[#D6E7FF]/90" />
            </div>
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2">
              <div className="h-full w-full animate-[byteTrackSpinReverse_36s_linear_infinite] rounded-full border border-[#E6F0FF]/95" />
            </div>

            <GlassSurface className="absolute left-1/2 top-1/2 flex w-[260px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[2rem] border-white/80 bg-white/90 px-7 py-7 text-center shadow-[0_28px_70px_rgba(120,53,15,0.10),0_18px_50px_rgba(60,140,255,0.12)]">
              <img
                src="/ByteDance_logo_English.svg"
                alt="ByteDance"
                className="h-14 w-auto"
              />
              <h3 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950">
                Procurement
              </h3>
              <p className="mt-2 text-lg font-medium text-stone-600">
                采购 AI 工具矩阵
              </p>
            </GlassSurface>

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1 top-9 rounded-[1.2rem] border border-[#3C8CFF]/15 bg-white/90 px-4 py-3 shadow-[0_16px_34px_rgba(120,53,15,0.08)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3C8CFF]">
                    <Tags className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-amber-950">商品信息整理</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-1 top-16 rounded-[1.2rem] border border-[#3C8CFF]/15 bg-white/90 px-4 py-3 shadow-[0_16px_34px_rgba(120,53,15,0.08)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3C8CFF]">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="mt-1 text-sm font-semibold text-amber-950">供应商比价</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 left-6 rounded-[1.2rem] border border-[#3C8CFF]/15 bg-white/90 px-4 py-3 shadow-[0_16px_34px_rgba(120,53,15,0.08)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3C8CFF]">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-amber-950">价格咨询Agent</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-full w-full animate-[byteTrackSpin_32s_linear_infinite]">
              <div className="absolute left-[20%] top-[18%] h-2.5 w-2.5 rounded-full bg-[#8EC5FF]/65" />
              <div className="absolute right-[18%] top-[26%] h-3 w-3 rounded-full bg-[#7DB7FF]/55" />
              <div className="absolute right-[22%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-[#5AA8FF]/55" />
              <div className="absolute left-[18%] bottom-[24%] h-3 w-3 rounded-full bg-[#00C8D2]/35" />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16 grid gap-8">
          <section>
            <div className="max-w-4xl">
              <SectionLabel>一、业务问题</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950 md:text-[2.5rem] md:leading-[1.02]">
                采购场景复杂、数据敏感、AI 输出稳定性要求高
              </h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {problemCards.map((item) => {
                return (
                  <GlassSurface key={item.title} className="rounded-[1.8rem] p-6">
                    <h3 className="text-xl font-semibold text-amber-950">
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
                3 个 AI 工具赋能采购决策流程
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-stone-600">
                从艺人价格咨询、商品标准化到供应商比价，用 AI 降低人工成本，提升采购判断效率与结果一致性。
              </p>
            </div>

            <div className="mt-8 grid gap-6">
              {toolProjects.map((item) => (
                <WarmSurface key={item.title} className="p-5 sm:p-6 lg:p-7">
                  {(() => {
                    const shouldAdjustTextGroup = item.previewType !== "matching";

                    return (
                  <div
                    className={`grid gap-6 lg:items-start ${
                      "lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-stretch"
                    }`}
                  >
                    <div className="flex h-full flex-col">
                      <h3 className="text-[1.75rem] font-semibold tracking-tight text-amber-950">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-stone-600">
                        {item.previewType === "summary"
                          ? "面向寻源比价场景，将报价表、历史轮次和价格明细转化为AI 总结能力，辅助采购员快速形成比价判断。"
                          : item.summary}
                      </p>

                      <div className={shouldAdjustTextGroup ? "mt-8 space-y-3 lg:mt-9" : "mt-6 space-y-3"}>
                        <div className="rounded-[1.35rem] border border-orange-100 bg-white/82 p-4">
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-700">
                            PROBLEM
                          </p>
                          <p className="mt-2 text-sm leading-7 text-stone-600">
                            {item.previewType === "matching" || item.previewType === "agent"
                              ? item.problem
                              : "寻源系统原本更偏报价和谈判流程管理，采购员仍需要手动查看报价表、历史轮次和异常价格，再整理比价结论，耗时且容易遗漏关键变化。"}
                          </p>
                        </div>
                        <div className="rounded-[1.35rem] border border-orange-100 bg-white/82 p-4">
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-700">
                            SOLUTION
                          </p>
                          <p className="mt-2 text-sm leading-7 text-stone-600">
                            {item.previewType === "matching" || item.previewType === "agent"
                              ? item.solution
                              : "参与上下文设计与输出约束，将输入拆成比价模板、本次比价指标、历史报价轮次和价格详情数据四类，让 LLM 在明确数据协议下生成 PE1 客观总结与 PE2 谈判建议。"}
                          </p>
                        </div>
                        <div className="rounded-[1.35rem] border border-orange-100 bg-white/82 p-4">
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-700">
                            RESULT
                          </p>
                          <p className="mt-2 text-sm leading-7 text-stone-600">
                            {item.previewType === "matching" || item.previewType === "agent"
                              ? item.result
                              : "系统从流程工具升级为数据分析与谈判辅助工具，可自动生成当前价格总结、多轮报价变化总结和谈判建议；PE1 和 PE2 分开评测，MOS 目标准确率不低于 90%。"}
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

                    <div className="h-full">
                      <ToolPreview type={item.previewType} />
                    </div>
                  </div>
                    );
                  })()}
                </WarmSurface>
              ))}
            </div>
          </section>

          <section>
            <div className="max-w-4xl">
              <SectionLabel>三、方法沉淀</SectionLabel>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-tight text-amber-950 md:text-[2.5rem] md:leading-[1.02]">
                从业务理解到 AI 产品交付
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-stone-600">
                在采购这种高专业度场景中，把业务问题拆成 AI 工作流，并用代码交付团队可直接使用的工具。
              </p>
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

        </div>
      </div>
      <style jsx>{`
        @keyframes byteTrackSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes byteTrackSpinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </main>
  );
}
