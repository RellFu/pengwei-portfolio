"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  CapabilityChip,
  GlassSurface,
  MetricCard,
  SectionLabel,
  WarmSurface,
} from "@/components/design-system";
import type { CaseStudyProject } from "@/data/projects";

type MerchantCaseStudyCardProps = {
  project: CaseStudyProject;
};

export function MerchantCaseStudyCard({
  project,
}: MerchantCaseStudyCardProps) {
  const tags = project.tags ?? [];
  const metrics = project.metrics.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <GlassSurface className="overflow-hidden rounded-[2rem] p-6 sm:p-7 lg:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionLabel className="inline-flex rounded-full border border-orange-300/70 bg-orange-100 px-4 py-2 text-xs font-medium tracking-[0.18em] text-orange-800">
              {project.type}
            </SectionLabel>
            <h3 className="mt-5 text-3xl font-semibold tracking-tight text-amber-950 md:text-4xl">
              {project.title}
            </h3>
            <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600 md:text-lg">
              {project.summary}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-orange-100 bg-white/76 p-5">
                <SectionLabel>问题</SectionLabel>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {project.problem}
                </p>
              </div>
              <WarmSurface className="rounded-[1.5rem] p-5 shadow-none">
                <SectionLabel>方案</SectionLabel>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {project.solution}
                </p>
              </WarmSurface>
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-orange-100 bg-orange-50/70 p-5">
              <SectionLabel>效果</SectionLabel>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                平均入驻耗时下降 69.53%，AI 预审后人工通过率达到 97.6%，AI 召回提审转化率达到 78.39%，高于标准召回流程的 64.65%，并在核心城市实现 50% 灰度放量。
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <CapabilityChip key={tag} className="px-3 py-2 tracking-normal">
                  {tag}
                </CapabilityChip>
              ))}
            </div>

            <div className="mt-7">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(249,115,22,0.24)] transition hover:bg-orange-400"
              >
                查看案例
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                value={metric.value}
                label={metric.label}
                emphasis="primary"
                className="rounded-[1.6rem] p-5"
              />
            ))}
          </div>
        </div>
      </GlassSurface>
    </motion.div>
  );
}
