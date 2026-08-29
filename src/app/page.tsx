"use client";

import {
  Bot,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Heart,
  Mail,
  Trophy,
} from "lucide-react";
import { AnimatedSection, FadeInCard } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { featuredProjects } from "@/data/projects";
import headshotImage from "../../AIheadshot/headshot-blue.png";
import cucLogo from "../../school_logos/Communication_Univ_of_China_Logo.svg";
import ucsdLogo from "../../school_logos/Seal_of_the_University_of_California,_San_Diego.svg";
import Image from "next/image";
import Link from "next/link";

const merchantOnboardingProject = featuredProjects.find(
  (project) => project.slug === "ai-merchant-onboarding-agent",
);

const alibabaProject = featuredProjects.find(
  (project) => project.slug === "alibaba-creative-ai-quality-system",
);

const byteDanceProject = featuredProjects.find(
  (project) => project.slug === "bytedance-ai-procurement-tools",
);

const mediaProject = featuredProjects.find(
  (project) => project.slug === "media-international-communications",
);

const achievementIcons = {
  trophy: Trophy,
  bot: Bot,
  lab: FlaskConical,
  book: BookOpen,
  care: Heart,
  grad: GraduationCap,
} as const;

const copy = {
  heroTitle: (
    <>
      Hi, I&apos;m Pengwei Fu.
      <br />
      I build reliable <span className="text-[#0071e3]">AI</span>{" "}
      <span className="text-[#0071e3]">products</span>.
    </>
  ),
  heroNav: ["Education", "Internship", "Project", "Contact"],
  education: {
    eyebrow: "Education",
    title: "Solid Foundations in Computer Science and AI",
    description:
      "Developed a strong technical foundation across computer science, machine learning, and AI through coursework and applied projects.",
    cucSchool: "Communication University of China",
    ucsdDegree: "M.S. in Computer Science and Engineering (CS75)",
    ucsdDescription: "Incoming M.S. student, Fall 2026.",
    cucBadge: "GPA 91/100",
    cucDegree: "B.Eng. in Computer Science with AI",
    cucDescription: (
      <>
        <strong className="font-semibold text-[#515154]">Key Coursework: </strong>
        Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI, Software Engineering, Operating Systems, Databases, and Computer Systems
      </>
    ),
    achievements: [
      "Gold Award, National Innovation Project",
      "National First Prize, AI Competition",
      "Research Assistant, Intelligent Media Lab",
      "Teaching Assistant, Computational Thinking",
      "AI Education Volunteer, UN She × Digital Future",
      "Beijing Outstanding Graduate",
    ],
  },
  projects: {
    heading: "Cross-Disciplinary Projects",
    subhead:
      "Selected work spanning media, product thinking, and full-stack AI development, from audience growth to agentic applications.",
    eyebrow: "Internship",
    title: "AI Products, From Infrastructure to Workflows",
    description:
      "Internship work spanning AI infrastructure, creative agents, merchant onboarding, and enterprise procurement.",
    alibabaTitle: "Screenwriting\nCo-Author Agent",
    alibabaDescription: "Made a screenwriting agent more reliable through reusable Skills, grounded knowledge, and systematic evaluation.",
    didiTitle: "Merchant\nOnboarding Agent",
    didiDescription:
      "Reworked merchant onboarding around a WhatsApp AI agent, replacing a long manual signup flow.",
    byteTitle: "Procurement\nAI Tools",
    byteDescription:
      "Delivered three procurement AI products: Talent Pricing Agent, SKU Matching Workflow, and Quote AI Summary.",
    tencentTitle: "Edge AI Infrastructure\nAI Gateway",
    tencentDescription:
      "Designed EdgeOne AI Gateway capabilities that made model access faster, safer, and easier to manage.",
    campusTitle: "New-Student Onboarding Agent",
    campusDescription:
      "Built a Python RAG support agent for incoming students with grounded citations, serving 1,000 students and up to 200 questions a day.",
    campusUrl:
      "https://github.com/cuchic-community-lab/campus-onboarding-copilot",
    csvTitle: "Multi-Agent Data Analysis Platform",
    csvDescription:
      "Built a TypeScript dual-agent CSV analysis app with Claude Agent SDK and custom MCP tools, streaming cited charts.",
    csvUrl: "https://github.com/RellFu/csv-analyze",
    button: "View Details",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build great AI products together",
    description:
      "Open to roles, internships, and project collaborations in AI and applied products. Happy to chat anytime.",
    secondaryButton: "LinkedIn",
  },
} as const;

const achievementIconKeys = [
  "trophy",
  "bot",
  "lab",
  "book",
  "care",
  "grad",
] as const;

export default function Home() {
  const t = copy;

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f7_100%)]" />

      <section className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-6 pb-12 pt-6 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.85fr)] lg:gap-14">
          <AnimatedSection className="max-w-3xl">
            <h1 className="mt-6 max-w-4xl text-[2.55rem] font-semibold tracking-tight text-[#1d1d1f] sm:text-[3.05rem] md:text-[4.1rem] md:leading-[1.08]">
              {t.heroTitle}
            </h1>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                { href: "#education", label: t.heroNav[0] },
                { href: "#internship", label: t.heroNav[1] },
                { href: "#project-experience", label: t.heroNav[2] },
                { href: "#contact", label: t.heroNav[3] },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/74 px-4 py-2.5 text-sm font-medium text-[#1d1d1f] transition hover:border-black/20 hover:bg-[#f5f5f7] active:scale-[0.97]"
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
              <FadeInCard className="rounded-[2rem] border border-black/10 bg-white/82 p-6 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <Image
                    src={ucsdLogo}
                    alt="UCSD logo"
                    className="h-14 w-14 shrink-0 object-contain"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold text-[#1d1d1f]">
                        University of California, San Diego
                      </h3>
                    </div>
                    <p className="mt-2 text-sm font-medium text-[#515154]">
                      {t.education.ucsdDegree}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#6e6e73]">
                      {t.education.ucsdDescription}
                    </p>
                  </div>
                </div>
              </FadeInCard>

              <FadeInCard
                delay={0.08}
                className="rounded-[2rem] border border-black/10 bg-white/82 p-6 backdrop-blur-xl"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={cucLogo}
                    alt="Communication University of China logo"
                    className="h-14 w-14 shrink-0 object-contain"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold text-[#1d1d1f]">
                        {t.education.cucSchool}
                      </h3>
                      <span className="rounded-full border border-black/5 bg-[#f5f5f7] px-3 py-1 text-xs font-medium text-[#86868b]">
                        {t.education.cucBadge}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-[#515154]">
                      {t.education.cucDegree}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#6e6e73]">
                      {t.education.cucDescription}
                    </p>
                  </div>
                </div>
              </FadeInCard>
            </div>
          </div>

          <div className="grid gap-5 lg:mt-[7.5rem]">
            <FadeInCard className="rounded-[2rem] border border-black/10 bg-white/88 p-6 shadow-[0_20px_70px_rgba(0, 0, 0,0.08)] backdrop-blur-xl">
              <div className="grid gap-3">
                {t.education.achievements.map((item, index) => {
                  const Icon = achievementIcons[achievementIconKeys[index]];

                  return (
                    <FadeInCard
                      key={item}
                      delay={0.06 * index}
                      className="rounded-2xl border border-black/5 bg-[#f5f5f7]/45 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#0071e3]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="text-sm leading-7 text-[#6e6e73]">{item}</p>
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
          <div className="grid gap-7 md:grid-cols-2">
            <FadeInCard className="h-full rounded-[2rem] border border-black/10 bg-white/88 p-7 backdrop-blur-xl sm:p-8">
              <div className="flex h-full flex-col items-start">
                <img src="/logos/tencent.png" alt="Tencent" className="mt-4 block h-8 w-auto shrink-0 self-start" />
                <h3 className="mt-3 whitespace-pre-line text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                  {t.projects.tencentTitle}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-8 text-[#6e6e73]">
                  {t.projects.tencentDescription}
                </p>
                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    aria-disabled="true"
                    title="Case study coming soon"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-full bg-[#0071e3] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0077ed] active:scale-[0.97]"
                  >
                    {t.projects.button}
                  </button>
                </div>
              </div>
            </FadeInCard>
            {alibabaProject ? (
              <FadeInCard delay={0.06} className="h-full rounded-[2rem] border border-black/10 bg-white/88 p-7 backdrop-blur-xl sm:p-8">
                <div className="flex h-full flex-col items-start">
                  <img src="/logos/alibaba.svg" alt="Alibaba" className="mt-4 block h-8 w-auto shrink-0 self-start" />
                  <h3 className="mt-3 whitespace-pre-line text-3xl font-semibold tracking-tight text-[#1d1d1f]">{t.projects.alibabaTitle}</h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#6e6e73]">{t.projects.alibabaDescription}</p>
                  <div className="mt-auto pt-8"><Link href={`/projects/${alibabaProject.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0077ed] active:scale-[0.97]">{t.projects.button}</Link></div>
                </div>
              </FadeInCard>
            ) : null}
            {merchantOnboardingProject ? (
              <FadeInCard delay={0.12} className="h-full rounded-[2rem] border border-black/10 bg-white/88 p-7 backdrop-blur-xl sm:p-8">
                <div className="flex h-full flex-col items-start">
                  <img src="/logos/didi.svg" alt="DiDi" className="mt-4 block h-8 w-auto shrink-0 self-start" />
                  <h3 className="mt-3 whitespace-pre-line text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                    {t.projects.didiTitle}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#6e6e73]">
                    {t.projects.didiDescription}
                  </p>
                  <div className="mt-auto pt-8">
                    <Link
                      href={`/projects/${merchantOnboardingProject.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0077ed] active:scale-[0.97]"
                    >
                      {t.projects.button}
                    </Link>
                  </div>
                </div>
              </FadeInCard>
            ) : null}

            {byteDanceProject ? (
              <FadeInCard
                delay={0.18}
                className="h-full rounded-[2rem] border border-black/10 bg-white/88 p-7 backdrop-blur-xl sm:p-8"
              >
                <div className="flex h-full flex-col items-start">
                  <img src="/logos/bytedance.svg" alt="ByteDance" className="mt-4 block h-8 w-auto shrink-0 self-start" />
                  <h3 className="mt-3 whitespace-pre-line text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                    {t.projects.byteTitle}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#6e6e73]">
                    {t.projects.byteDescription}
                  </p>
                  <div className="mt-auto pt-8">
                    <Link
                      href={`/projects/${byteDanceProject.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0077ed] active:scale-[0.97]"
                    >
                      {t.projects.button}
                    </Link>
                  </div>
                </div>
              </FadeInCard>
            ) : null}
          </div>
        </AnimatedSection>

        {mediaProject ? (
          <AnimatedSection id="project-experience" className="space-y-10">
            <SectionHeading
              eyebrow="Project"
              title={t.projects.heading}
              description={t.projects.subhead}
            />
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              <FadeInCard className="h-full rounded-[2rem] border border-black/10 bg-white/88 p-7 backdrop-blur-xl sm:p-8">
                <div className="flex h-full flex-col items-start">
                  <h3 className="whitespace-pre-line text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                    {mediaProject.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#6e6e73]">
                    {mediaProject.summary}
                  </p>
                  <div className="mt-auto pt-8">
                    <Link
                      href={`/projects/${mediaProject.slug}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0077ed] active:scale-[0.97]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </FadeInCard>

              <FadeInCard delay={0.06} className="h-full rounded-[2rem] border border-black/10 bg-white/88 p-7 backdrop-blur-xl sm:p-8">
                <div className="flex h-full flex-col items-start">
                  <h3 className="whitespace-pre-line text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                    {t.projects.campusTitle}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#6e6e73]">
                    {t.projects.campusDescription}
                  </p>
                  <div className="mt-auto pt-8">
                    <a
                      href={t.projects.campusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0077ed] active:scale-[0.97]"
                    >
                      {t.projects.button}
                    </a>
                  </div>
                </div>
              </FadeInCard>

              <FadeInCard delay={0.12} className="h-full rounded-[2rem] border border-black/10 bg-white/88 p-7 backdrop-blur-xl sm:p-8">
                <div className="flex h-full flex-col items-start">
                  <h3 className="whitespace-pre-line text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                    {t.projects.csvTitle}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#6e6e73]">
                    {t.projects.csvDescription}
                  </p>
                  <div className="mt-auto pt-8">
                    <a
                      href={t.projects.csvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0077ed] active:scale-[0.97]"
                    >
                      {t.projects.button}
                    </a>
                  </div>
                </div>
              </FadeInCard>
            </div>
          </AnimatedSection>
        ) : null}

        <AnimatedSection id="contact" className="pb-8">
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
                href="mailto:pengwei_fu@outlook.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0077ed] active:scale-[0.97]"
              >
                <Mail className="h-4 w-4" />
                pengwei_fu@outlook.com
              </a>
              <a
                href="https://www.linkedin.com/in/pengweifu/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0077ed] active:scale-[0.97]"
              >
                <img
                  src="/logos/linkedin-white.svg"
                  alt=""
                  className="h-5 w-auto shrink-0"
                />
                {t.contact.secondaryButton}
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
