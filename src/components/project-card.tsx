"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

type ProjectCardProps = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  problem: string;
  solution: string;
  capabilities: string[];
  impact: string[];
  metrics: Array<{ label: string; value: string }>;
  delay?: number;
};

export function ProjectCard({
  slug,
  title,
  type,
  summary,
  problem,
  solution,
  capabilities,
  impact,
  metrics,
  delay = 0,
}: ProjectCardProps) {
  const leadMetrics = metrics.slice(0, 2);
  const supportMetrics = metrics.slice(2);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-[2rem] border border-orange-200/70 bg-white/88 p-6 shadow-[0_28px_90px_rgba(180,83,9,0.12)] backdrop-blur-xl sm:p-7"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/projects/${slug}`}
        className="block"
        aria-label={`View project details: ${title}`}
      >
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,237,213,0.7),rgba(255,255,255,0))]" />

        <div className="relative mb-7 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-3 inline-flex rounded-full border border-orange-300/70 bg-orange-100 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-orange-800">
              {type}
            </p>
            <h3 className="max-w-[18ch] text-2xl font-semibold leading-tight text-amber-950 sm:text-[1.7rem]">
              {title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
              {summary}
            </p>
          </div>
          <span className="mt-1 rounded-full border border-orange-200 bg-white/70 p-2 text-stone-500 transition-colors group-hover:text-orange-700">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="relative mb-7 grid gap-3 sm:grid-cols-2">
          {leadMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.4rem] border border-orange-100 bg-[linear-gradient(180deg,rgba(255,247,237,0.96),rgba(255,237,213,0.78))] p-4 sm:p-5"
            >
              <p className="text-3xl font-semibold tracking-tight text-amber-950">
                {metric.value}
              </p>
              <p className="mt-2 text-xs tracking-[0.14em] text-orange-700">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative grid gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-orange-100 bg-white/78 p-5">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-700">
                PROBLEM
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-600">{problem}</p>
            </div>
            <div className="rounded-[1.5rem] border border-orange-100 bg-white/78 p-5">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-700">
                SOLUTION
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-600">{solution}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.5rem] border border-orange-100 bg-orange-50/70 p-5">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-700">
                AI / PRODUCT CAPABILITIES
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {capabilities.map((capability) => (
                  <span
                    key={capability}
                    className="rounded-full border border-orange-200 bg-white/80 px-3 py-2 text-xs font-medium text-stone-700"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-orange-100 bg-white/78 p-5">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-orange-700">
                IMPACT
              </p>
              <ul className="mt-4 space-y-3">
                {impact.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-stone-600">
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {supportMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.2rem] border border-orange-100 bg-white/72 px-4 py-3"
              >
                <p className="text-lg font-semibold text-amber-950">{metric.value}</p>
                <p className="mt-1 text-xs tracking-[0.12em] text-stone-500">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
