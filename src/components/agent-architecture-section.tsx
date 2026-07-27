"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  CircleGauge,
  Database,
  DatabaseZap,
  LayoutDashboard,
  FileSearch,
  Globe,
  GitBranch,
  Image as ImageIcon,
  Layers3,
  MessageCircleMore,
  Smartphone,
  QrCode,
  Route,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserRound,
  Waypoints,
} from "lucide-react";

import { GlassSurface, SectionLabel, WarmSurface } from "@/components/design-system";

type IconModule = {
  label: string;
  icon?: typeof Globe;
  imageSrc?: string;
  customIcon?: ReactNode;
  iconClassName?: string;
  iconBgClassName?: string;
  imageClassName?: string;
};

const entryModules: readonly IconModule[] = [
  {
    label: "WhatsApp",
    customIcon: (
      <svg viewBox="0 0 360 362" aria-hidden="true" className="h-4 w-4">
        <path
          fill="#25D366"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M307.546 52.5655C273.709 18.685 228.706 0.0171895 180.756 0C81.951 0 1.53846 80.404 1.50408 179.235C1.48689 210.829 9.74646 241.667 25.4319 268.844L0 361.736L95.0236 336.811C121.203 351.096 150.683 358.616 180.679 358.625H180.756C279.544 358.625 359.966 278.212 360 179.381C360.017 131.483 341.392 86.4547 307.546 52.5741V52.5655ZM180.756 328.354H180.696C153.966 328.346 127.744 321.16 104.865 307.589L99.4242 304.358L43.034 319.149L58.0834 264.168L54.5423 258.53C39.6304 234.809 31.749 207.391 31.7662 179.244C31.8006 97.1036 98.6334 30.2707 180.817 30.2707C220.61 30.2879 258.015 45.8015 286.145 73.9665C314.276 102.123 329.755 139.562 329.738 179.364C329.703 261.513 262.871 328.346 180.756 328.346V328.354ZM262.475 216.777C257.997 214.534 235.978 203.704 231.869 202.209C227.761 200.713 224.779 199.966 221.796 204.452C218.814 208.939 210.228 219.029 207.615 222.011C205.002 225.002 202.389 225.372 197.911 223.128C193.434 220.885 179.003 216.158 161.891 200.902C148.578 189.024 139.587 174.362 136.975 169.875C134.362 165.389 136.7 162.965 138.934 160.739C140.945 158.728 143.412 155.505 145.655 152.892C147.899 150.279 148.638 148.406 150.133 145.423C151.629 142.432 150.881 139.82 149.764 137.576C148.646 135.333 139.691 113.287 135.952 104.323C132.316 95.5909 128.621 96.777 125.879 96.6309C123.266 96.5019 120.284 96.4762 117.293 96.4762C114.302 96.4762 109.454 97.5935 105.346 102.08C101.238 106.566 89.6691 117.404 89.6691 139.441C89.6691 161.478 105.716 182.785 107.959 185.776C110.202 188.767 139.544 234.001 184.469 253.408C195.153 258.023 203.498 260.782 210.004 262.845C220.731 266.257 230.494 265.776 238.212 264.624C246.816 263.335 264.71 253.786 268.44 243.326C272.17 232.866 272.17 223.893 271.053 222.028C269.936 220.163 266.945 219.037 262.467 216.794L262.475 216.777Z"
        />
      </svg>
    ),
  },
  {
    label: "Website",
    imageSrc: "/icon/DiDi_symbol.svg",
    imageClassName: "h-4 w-4",
  },
  { label: "Merchant App", icon: Smartphone },
  { label: "BD Entry", icon: QrCode },
  { label: "Multimodal Input", icon: ImageIcon },
  { label: "Request Routing", icon: Route },
] as const;

const capabilityGroups = [
  {
    title: "Agent Orchestration & KB",
    modules: ["Prompt", "State-driven", "Orchestration", "Query Routing", "Glossary"],
  },
  {
    title: "AI Tools & Capabilities",
    modules: ["OCR", "Multilingual", "Memory Mgmt", "Resume", "RAG", "CoT", "API Calls"],
  },
];

const businessAgents = [
  "Onboarding Agent",
  "Review Agent",
  "Opportunity Agent",
  "Q&A Agent",
  "Acquisition Agent",
  "Operations Agent",
  "Evaluation Agent",
  "Worker Agent+",
];

const closeLoopModules = [
  { label: "Risk Control", icon: ShieldCheck },
  { label: "Human Intervention", icon: UserRound },
  { label: "Audit Trail", icon: FileSearch },
  { label: "System Write-back", icon: DatabaseZap },
  { label: "State Sync", icon: TimerReset },
  { label: "ETL Analysis", icon: BarChart3 },
  { label: "Agent Dashboard", icon: LayoutDashboard },
  { label: "LLMOps Eval", icon: CircleGauge },
] as const;

function SideLabel({
  title,
  subtitle,
  emphasis = false,
}: {
  title: string;
  subtitle: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col justify-center rounded-[1rem] border px-3 py-3 ${
        emphasis
          ? "border-black/10 bg-[linear-gradient(160deg,#0a84ff_0%,#0071e3_100%)] text-white shadow-[0_14px_28px_rgba(0,113,227,0.24)]"
          : "border-black/10 bg-white/88 text-[#1d1d1f]"
      }`}
    >
      <h3 className={`text-sm font-semibold leading-tight ${emphasis ? "text-white" : "text-[#1d1d1f]"}`}>
        {title}
      </h3>
      <p className={`mt-1 text-[11px] leading-5 ${emphasis ? "text-white/84" : "text-[#86868b]"}`}>
        {subtitle}
      </p>
    </div>
  );
}

function LayerFrame({
  title,
  subtitle,
  emphasis = false,
  children,
}: {
  title: string;
  subtitle: string;
  emphasis?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.32 }}
      className="grid gap-1.5 lg:grid-cols-[132px_minmax(0,1fr)]"
    >
      <SideLabel title={title} subtitle={subtitle} emphasis={emphasis} />
      {children}
    </motion.div>
  );
}

function FlatChip({ label, strong = false }: { label: string; strong?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.16 }}
      className={`flex min-h-[34px] items-center justify-center whitespace-nowrap rounded-full border px-2.5 py-1.5 text-center text-[11px] font-medium leading-none shadow-[0_8px_16px_rgba(0, 0, 0,0.04)] transition-all duration-200 hover:border-black/10 ${
        strong
          ? "border-black/10 bg-[#f5f5f7] text-[#1d1d1f]"
          : "border-black/5 bg-white/92 text-[#515154]"
      }`}
    >
      {label}
    </motion.div>
  );
}

function IconChip({
  label,
  icon: Icon,
  imageSrc,
  customIcon,
  strong = false,
  iconClassName = "text-[#86868b]",
  iconBgClassName = "bg-[#f5f5f7]",
  imageClassName = "h-3.5 w-3.5",
}: {
  label: string;
  icon?: typeof Globe;
  imageSrc?: string;
  customIcon?: ReactNode;
  strong?: boolean;
  iconClassName?: string;
  iconBgClassName?: string;
  imageClassName?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.16 }}
      className={`flex min-h-[42px] items-center gap-2 rounded-[0.875rem] border px-3 py-2 text-xs font-medium shadow-[0_8px_16px_rgba(0, 0, 0,0.04)] transition-all duration-200 hover:border-black/10 ${
        strong
          ? "border-black/10 bg-[#f5f5f7] text-[#1d1d1f]"
          : "border-black/5 bg-white/92 text-[#515154]"
      }`}
    >
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${iconBgClassName} ${iconClassName}`}
      >
        {customIcon ? (
          customIcon
        ) : imageSrc ? (
          <div className="flex h-5 w-5 items-center justify-center overflow-hidden">
            <img src={imageSrc} alt="" className={imageClassName} />
          </div>
        ) : Icon ? (
          <Icon className="h-3.5 w-3.5" />
        ) : null}
      </div>
      <span className="leading-tight">{label}</span>
    </motion.div>
  );
}

function SectionShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[1rem] border border-black/10 bg-white/92 p-2 shadow-[0_12px_22px_rgba(0, 0, 0,0.05)] backdrop-blur-xl">
      {children}
    </div>
  );
}

function MasterAgentCore() {
  return (
    <div className="rounded-[1rem] border-2 border-black/10 bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f7_100%)] p-2.5 shadow-[0_16px_32px_rgba(0, 0, 0,0.09)]">
      <div className="flex justify-center">
        <div className="rounded-[0.875rem] border border-black/10 bg-white/92 px-4 py-2.5 text-center shadow-[0_10px_18px_rgba(0, 0, 0,0.06)]">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-[#f5f5f7] text-[#86868b]">
              <Layers3 className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold leading-none text-[#1d1d1f]">Master Agent</p>
          </div>
          <p className="mt-1 text-[11px] leading-none text-[#86868b]">
            Intent recognition · State judgment · Task routing
          </p>
        </div>
      </div>

      <div className="mt-2.5">
        <div className="grid grid-cols-2 gap-1.5 md:grid-cols-4">
          {businessAgents.map((agent, index) => (
            <motion.div
              key={agent}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              transition={{ duration: 0.24, delay: index * 0.02 }}
              whileHover={{ y: -2 }}
            className="relative flex min-h-[52px] items-center justify-center rounded-[0.875rem] border border-black/10 bg-white/94 px-2.5 py-2 text-center shadow-[0_10px_18px_rgba(0, 0, 0,0.05)] transition-all duration-200 hover:border-black/10"
            >
              <p className="text-[11px] font-semibold leading-snug text-[#1d1d1f]">{agent}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CapabilityBand() {
  return (
    <SectionShell>
      <div className="grid gap-2 xl:grid-cols-2">
        {capabilityGroups.map((group, index) => (
          <div
            key={group.title}
            className="rounded-[0.875rem] border border-black/5 bg-white/92 p-2"
          >
            <div className="mb-1.5 flex items-center gap-2">
              <div className="flex h-5.5 w-5.5 items-center justify-center rounded-lg bg-[#f5f5f7] text-[#86868b]">
                {index === 0 ? (
                  <Database className="h-3.5 w-3.5" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
              </div>
              <p className="text-[11px] font-semibold leading-none text-[#1d1d1f]">{group.title}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.modules.map((module) => (
                <FlatChip key={module} label={module} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function CloseLoopBand() {
  return (
    <SectionShell>
      <div className="grid gap-1.5 md:grid-cols-2 xl:grid-cols-4">
        {closeLoopModules.map((module) => (
          <IconChip
            key={module.label}
            label={module.label}
            icon={module.icon}
          />
        ))}
      </div>
    </SectionShell>
  );
}

export function AgentArchitectureSection() {
  return (
    <section>
      <div className="max-w-5xl">
        <SectionLabel>
          3. Multi-Agent Product Architecture
        </SectionLabel>
        <h2 className="mt-2 text-[2rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.5rem] md:leading-[1.02]">
          A <span className="text-[#0071e3]">Multi-Agent</span> architecture from conversation entry to business loop
        </h2>
        <p className="mt-3 max-w-5xl text-[15px] leading-7 text-[#6e6e73] md:text-base">
          A master agent orchestrates multiple specialized agents; the entry, capability, and loop layers together support the full product architecture.
        </p>
      </div>

      <div className="mt-6 space-y-2">
        <LayerFrame title="Entry Layer" subtitle="Channels & Reach">
          <SectionShell>
            <div className="grid gap-1.5 md:grid-cols-3 xl:grid-cols-6">
              {entryModules.map((module) => (
                <IconChip
                  key={module.label}
                  label={module.label}
                  icon={module.icon}
                  imageSrc={module.imageSrc}
                  customIcon={module.customIcon}
                  imageClassName={module.imageClassName}
                />
              ))}
            </div>
          </SectionShell>
        </LayerFrame>

        <LayerFrame title="Agent Layer" subtitle="Core Orchestration" emphasis>
          <MasterAgentCore />
        </LayerFrame>

        <LayerFrame title="Capability Layer" subtitle="Infrastructure">
          <CapabilityBand />
        </LayerFrame>

        <LayerFrame title="Compliance & Data Loop" subtitle="Risk & Integration">
          <CloseLoopBand />
        </LayerFrame>
      </div>
    </section>
  );
}
