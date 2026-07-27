"use client";

import { useMemo } from "react";
import {
  Bot,
  ChartNoAxesColumn,
  Code2,
  FlaskConical,
  GraduationCap,
  Heart,
  Mail,
  MessagesSquare,
  Smartphone,
  Target,
} from "lucide-react";
import { AnimatedSection, FadeInCard } from "@/components/animated-section";
import { WarmSurface } from "@/components/design-system";
import { SectionHeading } from "@/components/section-heading";
import { featuredProjects } from "@/data/projects";
import headshotImage from "../../AIheadshot/ChatGPT Image 2026年5月6日 16_49_54.png";
import cucLogo from "../../school_logos/Communication_Univ_of_China_Logo.svg";
import ucsdLogo from "../../school_logos/Seal_of_the_University_of_California,_San_Diego.svg";
import Image from "next/image";
import Link from "next/link";

const merchantOnboardingProject = featuredProjects.find(
  (project) => project.slug === "ai-merchant-onboarding-agent",
);

const byteDanceProject = featuredProjects.find(
  (project) => project.slug === "bytedance-ai-procurement-tools",
);

const capabilityIcons = {
  ai: Bot,
  data: ChartNoAxesColumn,
  engineering: Code2,
  business: Target,
} as const;

const achievementIcons = {
  bot: Bot,
  phone: Smartphone,
  lab: FlaskConical,
  teach: GraduationCap,
  care: Heart,
  language: MessagesSquare,
} as const;

const copy = {
  heroTitle: (
    <>
      Hi, I&apos;m Pengwei Fu.
      <br />
      I turn <span className="text-orange-500">AI</span> capabilities
      <br />
      into reliable <span className="text-orange-500">products</span>.
    </>
  ),
  heroNav: ["Education", "Experience", "Capabilities", "Contact"],
  education: {
    eyebrow: "Education",
    title: "Strong Foundations in AI and Computer Science",
    description:
      "Trained in both AI and core computer science, with a continued focus on AI systems, intelligent products, and data-driven applications through graduate study at UCSD.",
    cucSchool: "Communication University of China",
    ucsdDegree: "M.S. in Computer Science and Engineering (CS75)",
    ucsdDescription: "Incoming M.S. student, Fall 2026.",
    cucBadge: "GPA 91/100",
    cucDegree: "B.Eng. in Computer Science with AI",
    cucDescription: (
      <>
        <strong className="font-semibold text-stone-700">Key Coursework: </strong>
        Machine Learning, Computer Vision, NLP, Deep Learning, AIGC, Software Engineering, Operating Systems, Databases, Computer Systems, and Intro to AI
      </>
    ),
    achievements: [
      "National Digital Human Project",
      "First Prize for an AI Health Assistant Product",
      "Research Assistant, Intelligent Media Lab",
      "Teaching Assistant, Computational Thinking",
      "AI Education Volunteer, UN She × Digital Future",
      "IELTS 7.5 / CET-4 / CET-6",
    ],
  },
  projects: {
    eyebrow: "Experience",
    title: "Internships Building Vertical AI Products",
    description:
      "Focused on DiDi's merchant onboarding agent and ByteDance's procurement AI tools, showing how AI products are designed, launched, and improved inside real business workflows.",
    didiTitle: "DiDi Merchant Onboarding Agent",
    didiDescription:
      "Rebuilt the merchant onboarding flow around WhatsApp and a multi-agent workflow.",
    byteTitle: "ByteDance Procurement AI",
    byteDescription:
      "Built three AI tools for product normalization, supplier comparison, and pricing consultation.",
    button: "View Details",
  },
  skills: {
    eyebrow: "Capabilities",
    title: "Cross-functional Strength in AI Product, Engineering, and Analytics",
    description:
      "Spanning agent design, RAG workflows, analytics, and product engineering, with the ability to turn business problems into AI solutions that can be launched, evaluated, and iterated.",
    cards: [
      {
        key: "ai",
        title: "AI Product & Agents",
        items: [
          "Multi-Agent Design",
          "RAG Workflow",
          "Prompt Guardrails",
          "Agent Evaluation",
          "Bad Case Review",
          "Automated Monitoring",
        ],
      },
      {
        key: "data",
        title: "Analytics & Evaluation",
        items: [
          "ETL Pipeline",
          "Conversation Analysis",
          "Metric Definition",
          "Experiment Analysis",
          "Gold Task Set",
          "Latency Analysis",
        ],
      },
      {
        key: "engineering",
        title: "Product Engineering",
        items: ["Python", "SQL", "TypeScript", "Next.js", "FastAPI", "JSON Schema"],
      },
      {
        key: "business",
        title: "Business Delivery",
        items: [
          "Requirement Breakdown",
          "Workflow Redesign",
          "Cross-functional Collaboration",
          "Post-launch Review",
          "Cost Optimization",
          "Efficiency Gains",
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Exploring More Possibilities for AI Products Together",
    description:
      "Focused on AI agents, intelligent workflows, and RAG applications. Open to conversations about product case studies, new opportunities, and how applied AI systems move from design to real-world deployment.",
    secondaryButton: "Get in Touch",
  },
} as const;

const achievementIconKeys = ["bot", "phone", "lab", "teach", "care", "language"] as const;

export default function Home() {
  const t = copy;

  const capabilityCards = useMemo(
    () =>
      t.skills.cards.map((card) => ({
        ...card,
        icon: capabilityIcons[card.key],
      })),
    [t.skills.cards],
  );

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.28),transparent_34%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.18),transparent_28%),linear-gradient(180deg,rgba(255,248,239,0.98)_0%,rgba(255,243,223,0.92)_48%,rgba(255,242,225,0.88)_72%,rgba(255,248,239,0.72)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[48rem] animate-[pulse_9s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),transparent_22%),radial-gradient(circle_at_70%_18%,rgba(251,146,60,0.18),transparent_24%)] blur-3xl" />

      <section className="mx-auto flex min-h-[720px] w-full max-w-6xl flex-col px-6 pb-10 pt-6 sm:px-8 lg:min-h-[760px] lg:px-12">
        <div className="grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.85fr)] lg:gap-14 lg:py-16">
          <AnimatedSection className="max-w-3xl">
            <h1 className="mt-6 max-w-4xl text-[2.55rem] font-semibold tracking-tight text-amber-950 sm:text-[3.05rem] md:text-[4.1rem] md:leading-[1.08]">
              {t.heroTitle}
            </h1>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                { href: "#education", label: t.heroNav[0] },
                { href: "#internship", label: t.heroNav[1] },
                { href: "#skills", label: t.heroNav[2] },
                { href: "#contact", label: t.heroNav[3] },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white/74 px-4 py-2.5 text-sm font-medium text-orange-900 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="w-full lg:justify-self-end">
            <FadeInCard className="h-full w-full">
              <div className="relative w-full max-w-[520px] overflow-hidden rounded-[2.4rem]">
                <Image
                  src={headshotImage}
                  alt="Pengwei Fu AI portrait"
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 520px, 100vw"
                  priority
                />
              </div>
            </FadeInCard>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 sm:px-8 lg:px-12">
        <AnimatedSection id="education" className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow={t.education.eyebrow}
              title={t.education.title}
              description={t.education.description}
            />

            <div className="mt-8 grid gap-4">
              <FadeInCard className="rounded-[2rem] border border-orange-200/70 bg-white/82 p-6 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <Image
                    src={ucsdLogo}
                    alt="UCSD logo"
                    className="h-14 w-14 shrink-0 object-contain"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold text-amber-950">
                        University of California, San Diego
                      </h3>
                    </div>
                    <p className="mt-2 text-sm font-medium text-stone-700">
                      {t.education.ucsdDegree}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {t.education.ucsdDescription}
                    </p>
                  </div>
                </div>
              </FadeInCard>

              <FadeInCard
                delay={0.08}
                className="rounded-[2rem] border border-orange-200/70 bg-white/82 p-6 backdrop-blur-xl"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={cucLogo}
                    alt="Communication University of China logo"
                    className="h-14 w-14 shrink-0 object-contain"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold text-amber-950">
                        {t.education.cucSchool}
                      </h3>
                      <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                        {t.education.cucBadge}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-stone-700">
                      {t.education.cucDegree}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {t.education.cucDescription}
                    </p>
                  </div>
                </div>
              </FadeInCard>
            </div>
          </div>

          <div className="grid gap-5 lg:mt-[7.5rem]">
            <FadeInCard className="rounded-[2rem] border border-orange-200/70 bg-white/88 p-6 shadow-[0_20px_70px_rgba(180,83,9,0.08)] backdrop-blur-xl">
              <div className="grid gap-3">
                {t.education.achievements.map((item, index) => {
                  const Icon = achievementIcons[achievementIconKeys[index]];

                  return (
                    <FadeInCard
                      key={item}
                      delay={0.06 * index}
                      className="rounded-2xl border border-orange-100/80 bg-orange-50/45 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 text-orange-600">
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="text-sm leading-7 text-stone-600">{item}</p>
                      </div>
                    </FadeInCard>
                  );
                })}
              </div>
            </FadeInCard>
          </div>
        </AnimatedSection>

        <AnimatedSection id="internship" className="space-y-10">
          <SectionHeading
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            description={t.projects.description}
          />
          <div className="grid gap-7 xl:grid-cols-2">
            {merchantOnboardingProject ? (
              <FadeInCard className="h-full rounded-[2rem] border border-orange-200/70 bg-white/88 p-7 shadow-[0_28px_90px_rgba(180,83,9,0.12)] backdrop-blur-xl sm:p-8">
                <div className="flex h-full flex-col">
                  <h3 className="text-3xl font-semibold tracking-tight text-amber-950">
                    {t.projects.didiTitle}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-stone-600">
                    {t.projects.didiDescription}
                  </p>
                  <div className="mt-auto pt-8">
                    <Link
                      href={`/projects/${merchantOnboardingProject.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(249,115,22,0.24)] transition hover:bg-orange-400"
                    >
                      {t.projects.button}
                    </Link>
                  </div>
                </div>
              </FadeInCard>
            ) : null}

            {byteDanceProject ? (
              <FadeInCard
                delay={0.08}
                className="h-full rounded-[2rem] border border-orange-200/70 bg-white/88 p-7 shadow-[0_28px_90px_rgba(180,83,9,0.12)] backdrop-blur-xl sm:p-8"
              >
                <div className="flex h-full flex-col">
                  <h3 className="text-3xl font-semibold tracking-tight text-amber-950">
                    {t.projects.byteTitle}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-stone-600">
                    {t.projects.byteDescription}
                  </p>
                  <div className="mt-auto pt-8">
                    <Link
                      href={`/projects/${byteDanceProject.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(249,115,22,0.24)] transition hover:bg-orange-400"
                    >
                      {t.projects.button}
                    </Link>
                  </div>
                </div>
              </FadeInCard>
            ) : null}
          </div>
        </AnimatedSection>

        <AnimatedSection id="skills" className="space-y-10">
          <SectionHeading
            eyebrow={t.skills.eyebrow}
            title={t.skills.title}
            description={t.skills.description}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {capabilityCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <FadeInCard
                  key={card.title}
                  delay={index * 0.06}
                  className="h-full rounded-[2rem] border border-orange-200/70 bg-white/88 p-6 shadow-[0_20px_70px_rgba(180,83,9,0.08)] backdrop-blur-xl sm:p-7"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-amber-950">
                        {card.title}
                      </h3>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {card.items.map((skill) => (
                        <div
                          key={skill}
                          className="rounded-2xl border border-orange-100/80 bg-orange-50/45 px-3 py-2.5 text-center text-sm font-medium text-stone-700"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInCard>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="pb-8">
          <WarmSurface className="p-8 backdrop-blur-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <SectionHeading
                  eyebrow={t.contact.eyebrow}
                  title={t.contact.title}
                  description={t.contact.description}
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="mailto:rell_fu@outlook.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                >
                  <Mail className="h-4 w-4" />
                  rell_fu@outlook.com
                </a>
                <a
                  href="mailto:rell_fu@outlook.com?subject=Portfolio%20Inquiry%20for%20Pengwei%20Fu"
                  className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white/75 px-6 py-3 text-sm font-semibold text-orange-900 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  {t.contact.secondaryButton}
                </a>
              </div>
            </div>
          </WarmSurface>
        </AnimatedSection>
      </div>
    </main>
  );
}
