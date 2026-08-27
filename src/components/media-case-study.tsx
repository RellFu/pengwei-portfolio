"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Heart,
  Menu,
  MessageCircle,
  Play,
  Search,
  Share2,
} from "lucide-react";
import gsap from "gsap";
import { GlassSurface } from "@/components/design-system";
import type { CaseStudyProject } from "@/data/projects";

type WorkItem = {
  size: "featured" | "right";
  title?: string;
  source?: string;
  date?: string;
  imagePath?: string;
  imageAlt?: string;
  excerpt?: string;
  url?: string;
};

type MediaPortfolio = {
  role: string;
  responsibilities?: string;
  works: WorkItem[];
};

type ContentCase = {
  platform: string;
  logoSrc?: string;
  imagePath?: string;
  imageAlt?: string;
};

type GrowthStep = {
  step: number;
  label: string;
  detail: string;
};

type GrowthCaseStudy = {
  intro: string;
  contentCases: ContentCase[];
  promo?: {
    platform: string;
    logoSrc?: string;
    title: string;
    detail: string;
    cta: string;
    imagePath?: string;
    imageAlt?: string;
  };
  audience: { label: string; detail: string };
  channel: { label: string; detail: string };
  contentDirection: { label: string; detail: string };
  growthSteps: GrowthStep[];
  whyItWorks: string[];
  growthLogic: string;
};

type OfficialMediaCaseStudy = {
  brandLogos: { src: string; alt: string; className?: string }[];
  intro: string;
  socialBlock: {
    description: string;
  };
};

type Section = {
  index: string;
  kicker?: string;
  heading: string;
  subheading?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoClassName?: string;
  problem?: string;
  built?: string;
  shipped?: string;
  metrics?: { value: string; label: string }[];
  pending?: boolean;
  pendingNote?: string;
  mediaPortfolio?: MediaPortfolio;
  growthCaseStudy?: GrowthCaseStudy;
  officialMediaCaseStudy?: OfficialMediaCaseStudy;
};

const sections: Section[] = [
  {
    index: "01",
    heading: "Telling the human side of AI boom",
    subheading: "AI Technology Reporter",
    logoSrc: "/thepaper-logo.svg",
    logoAlt: "The Paper",
    logoClassName: "h-12 w-auto shrink-0 sm:h-14",
    mediaPortfolio: {
      role:
        "Covered AI and emerging technology for the science desk, owning the full editorial cycle from pitch development and research through interviewing, fact-checking, and long-form writing. Tracked breaking AI developments closely and translated technical shifts into accessible narratives, using source-driven reporting to surface the human and societal impact behind each story.",
      works: [
        {
          size: "featured",
          title:
            "Two Years Into ChatGPT, College Papers Are Starting to Sound Like AI",
          source: "The Paper (澎湃新闻)",
          date: "2024-12-19",
          url: "https://www.thepaper.cn/newsDetail_forward_29682838",
          imagePath: "/media-screenshots/thepaper-chatgpt-college-laptop.jpg",
          imageAlt:
            "Feature story screenshot: how AI is reshaping student writing on Chinese university campuses",
          excerpt:
            "Two years after ChatGPT's debut, AI has become a routine part of college life, helping students write papers, code and study faster than ever before. But as professors see more assignments stripped of original thought, universities are struggling to draw a workable line between useful assistance and academic outsourcing. The challenge is how institutions can preserve critical thinking and authorship in an environment where the tools of writing are rapidly being automated.",
        },
        { size: "right", title: "Who Owns an AI-Generated Image? A Chinese Court Offers an Early Answer", source: "The Paper (澎湃新闻)", date: "2024", url: "https://www.thepaper.cn/newsDetail_forward_25963744", imagePath: "/media-screenshots/thepaper-ai-copyright-court.jpg", excerpt: "China's first copyright ruling on an AI-generated image recognized a Stable Diffusion user as the work's author, reigniting debate over whether prompts and parameters amount to human creativity." },
        { size: "right", title: "AI Models Took China's Gaokao. Math Was Their Weak Spot.", source: "The Paper (澎湃新闻)", date: "2024", url: "https://www.thepaper.cn/newsDetail_forward_27784210", imagePath: "/media-screenshots/thepaper-gaokao-ai-math.jpg", excerpt: "In a full-length test based on China's college entrance exam, leading AI models performed well in language subjects but struggled with math, exposing persistent gaps in reasoning and nuance." },
        { size: "right", title: "AI Is Running Out of High-Quality Training Data", source: "The Paper (澎湃新闻)", date: "2024", url: "https://www.thepaper.cn/newsDetail_forward_28259689", imagePath: "/media-screenshots/thepaper-training-data-exhaustion.jpg", excerpt: "Researchers warn that the supply of high-quality text used to train large AI models could be largely exhausted within years, raising new questions about synthetic data and the risk of \"model collapse.\"" },
        { size: "right", title: "DeepSeek Became AI's Breakout Challenger. Can It Last?", source: "PANews", date: "2025", url: "https://www.panewslab.com/zh/articles/99mi3f3u", imagePath: "/media-screenshots/deepseek-challenger-phone.png", excerpt: "The Chinese AI startup won attention with efficient models, an open-source strategy and unusually low costs. Its next test is turning that momentum into a lasting edge." },
      ],
    },
  },
  {
    index: "02",
    subheading: "TrainPal Growth Operations",
    logoSrc: "/tripcom-logo.svg",
    logoAlt: "Trip.com Group",
    logoClassName: "h-6 w-auto shrink-0 sm:h-7",
    heading:
      "Content-led growth for UK rail travelers",
    growthCaseStudy: {
      intro:
        "Built a social content engine across TikTok and Xiaohongshu (RED) to grow TrainPal in the UK. TikTok scaled reach among a broader UK travel audience, while RED helped reach Chinese students in the UK. Travel-focused content attracted high-intent travelers, and TrainPal fare promotions were woven into the content to move users from discovery to clicks and ticket purchases.",
      contentCases: [
        {
          platform: "TikTok",
          logoSrc: "/tiktok-logo.svg",
          imagePath: "/media-screenshots/ctrip-trainpal-profile.jpg",
          imageAlt: "TrainPal official TikTok profile",
        },
        {
          platform: "TikTok",
          logoSrc: "/tiktok-logo.svg",
          imagePath: "/media-screenshots/ctrip-trainpal-tiktok-split.jpg",
          imageAlt: "Creator video on TrainPal's split-ticketing feature",
        },
        {
          platform: "Xiaohongshu",
          logoSrc: "/xiaohongshu-logo.png",
          imagePath: "/media-screenshots/ctrip-trainpal-xhs-railcard.jpg",
          imageAlt: "Creator post on TrainPal railcard discount",
        },
      ],
      promo: {
        platform: "Xiaohongshu",
        logoSrc: "/xiaohongshu-logo.png",
        title: "TrainPal UK Rail Ticket Discount",
        detail: "Up to £10 off for new users",
        cta: "Claim offer",
        imagePath: "/media-screenshots/ctrip-trainpal-xhs-search.jpg",
        imageAlt: "Xiaohongshu search results for TrainPal railcard discount content",
      },
      audience: {
        label: "Target audience",
        detail: "UK local travelers and Chinese international students in the UK",
      },
      channel: {
        label: "Core channels",
        detail:
          "TikTok as the primary growth channel; Xiaohongshu (RED) as a supplementary channel reaching students",
      },
      contentDirection: {
        label: "Content direction",
        detail:
          "Scenic travel content, trip-planning guides, and budget travel tips for students",
      },
      growthSteps: [
        {
          step: 1,
          label: "Travel-focused content",
          detail: "Scenic destinations, travel guides, and student budget travel",
        },
        {
          step: 2,
          label: "Distribute across platforms",
          detail: "TikTok for scale, Xiaohongshu (RED) to reach Chinese students in the UK",
        },
        {
          step: 3,
          label: "Embed a promo hook",
          detail: "Promotions woven into the content, either subtly or explicitly",
        },
        {
          step: 4,
          label: "Drive discovery and purchase",
          detail: "Turn TrainPal awareness into clicks and ticket purchases",
        },
        {
          step: 5,
          label: "Growth outcomes",
          detail: "Higher brand awareness, new user acquisition, and ticket purchases",
        },
      ],
      whyItWorks: [
        "Travel content naturally attracts people who are already planning a trip",
        "Social content plants the seed first, then hands off to conversion",
        "A discounted ticket makes it easy to turn interest into a purchase",
      ],
      growthLogic:
        "Travel content attracts high-intent audiences. Cross-platform distribution expands reach. Promotional hooks turn interest into action, while TrainPal converts that demand into ticket purchases.",
    },
  },
  {
    index: "03",
    subheading: "International Editorial & Social Media",
    heading: "Bringing newsroom rigor to global social storytelling",
    officialMediaCaseStudy: {
      brandLogos: [
        {
          src: "/rmrb-logo.png",
          alt: "People's Daily",
          className: "h-9 w-auto sm:h-10",
        },
        {
          src: "/xinhua-logo.png",
          alt: "Xinhua News Agency",
          className: "h-9 w-auto sm:h-10",
        },
      ],
      intro:
        "Produced English-language culture and feature stories for People’s Daily, with a focus on clear, accurate, and internationally accessible reporting.",
      socialBlock: {
        description:
          "Created platform-native content for People’s Daily and Xinhua News Agency across TikTok, X, Facebook, and YouTube.",
      },
    },
  },
];

type MediaCaseStudyProps = {
  project: CaseStudyProject;
};

export function MediaCaseStudy({ project }: MediaCaseStudyProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ffffff] text-[#515154]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(0,0,0,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f5f5f7_44%,#f5f5f7_100%)]" />
      <div className="absolute left-0 top-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-[#c7c7cc]/20 blur-3xl" />
      <div className="absolute right-0 top-24 -z-10 h-[22rem] w-[22rem] rounded-full bg-[#d2d2d7]/30 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2.5 text-sm font-medium text-[#6e6e73] shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition hover:text-[#1d1d1f]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl md:leading-[1.04]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6e6e73] md:text-xl">
              {project.summary}
            </p>
          </div>

          <div className="relative flex items-center justify-center py-4">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.12),transparent_50%)]" />
            <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[1.6rem]">
              <img
                src="/media-screenshots/reporter-hero.png"
                alt="Illustration of a reporter holding a microphone in front of a TV camera"
                className="h-full w-full object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
              />
            </div>
          </div>
        </section>

        <div className="mt-20 space-y-16">
          {sections.map((section) => {
            if (section.mediaPortfolio) {
              return <MediaPortfolioSection key={section.index} section={section} />;
            }
            if (section.growthCaseStudy) {
              return <GrowthCaseStudySection key={section.index} section={section} />;
            }
            if (section.officialMediaCaseStudy) {
              return (
                <OfficialMediaSection key={section.index} section={section} />
              );
            }
            return <DefaultSection key={section.index} section={section} />;
          })}
        </div>
      </div>
    </main>
  );
}

type DefaultSectionProps = {
  section: Section;
};

/* ── Shared header: logo (optional) + subheading on line 1, heading on line 2 ── */
function SectionHeader({ section }: { section: Section }) {
  return (
    <div className="w-full">
      {section.subheading ? (
        <div className="flex items-center gap-3">
          {section.logoSrc ? (
            <img
              src={section.logoSrc}
              alt={section.logoAlt ?? ""}
              className={section.logoClassName ?? "h-10 w-auto shrink-0 sm:h-12"}
            />
          ) : null}
          <h2 className="text-[1.75rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.25rem] md:leading-[1.08]">
            {section.subheading}
          </h2>
        </div>
      ) : null}
      <h2 className="mt-1 text-[1.75rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.25rem] md:leading-[1.08]">
        {section.heading}
      </h2>
    </div>
  );
}

function DefaultSection({ section }: DefaultSectionProps) {
  return (
    <section className="space-y-6">
      <SectionHeader section={section} />

      <div className="space-y-6">
        {section.problem ? (
          <p className="max-w-3xl text-base leading-7 text-[#515154] md:text-lg md:leading-8">
            <span className="font-semibold text-[#1d1d1f]">Problem. </span>
            {section.problem}
          </p>
        ) : null}

        {section.built || section.shipped ? (
          <GlassSurface className="grid gap-6 p-7 sm:p-8 md:grid-cols-2 md:gap-8">
            {section.built ? (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#86868b]">
                  What I CONTRIBUTED
                </p>
                <p className="mt-3 text-base leading-7 text-[#1d1d1f]">
                  {section.built}
                </p>
              </div>
            ) : null}
            {section.shipped ? (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#86868b]">
                  How it SHIPPED
                </p>
                <p className="mt-3 text-base leading-7 text-[#1d1d1f]">
                  {section.shipped}
                </p>
              </div>
            ) : null}
          </GlassSurface>
        ) : null}

        {section.pending && section.pendingNote ? (
          <div className="flex gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
            <span>{section.pendingNote}</span>
          </div>
        ) : null}

        {section.metrics && section.metrics.length > 0 ? (
          <div className="flex flex-wrap gap-5 pt-1">
            {section.metrics.map((metric) => (
              <div key={metric.label} className="min-w-[120px]">
                <p className="text-2xl font-semibold tracking-tight text-[#1d1d1f] md:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#86868b]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ── Growth operations case study (Ctrip / TrainPal-style layout) ── */
function GrowthCaseStudySection({ section }: { section: Section }) {
  if (!section.growthCaseStudy) return null;
  const gc = section.growthCaseStudy;
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: reduce)",
      () => {
        gsap.set(".gc-reveal", { opacity: 1, y: 0 });
      },
      containerRef,
    );
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.from(".gc-reveal", {
          y: 16,
          opacity: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
        });
      },
      containerRef,
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="space-y-8">
      <SectionHeader section={section} />

      <p className="max-w-3xl text-base leading-7 text-[#6e6e73] md:text-lg md:leading-8">
        {gc.intro}
      </p>

      {/* Content cases + promo card */}
      <div className="gc-reveal grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {gc.contentCases.map((c, i) => (
          <ContentCaseCard key={i} caseItem={c} />
        ))}
        {gc.promo ? <PromoCard promo={gc.promo} /> : null}
      </div>

      {/* Growth mechanism */}
      <div className="gc-reveal">
        <GlassSurface className="p-6 sm:p-7">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#86868b]">
            Growth mechanism: from travel content to ticket purchase
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-stretch sm:gap-1.5">
            {gc.growthSteps.map((step, i) => (
              <div key={step.step} className="flex flex-1 items-center gap-1.5">
                <div className="flex-1 rounded-xl border border-black/[0.07] bg-white p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0071e3] text-[11px] font-semibold text-white">
                      {step.step}
                    </span>
                    <p className="text-[12px] font-semibold leading-tight text-[#1d1d1f]">{step.label}</p>
                  </div>
                </div>
                {i < gc.growthSteps.length - 1 ? (
                  <ArrowUpRight className="hidden h-3.5 w-3.5 shrink-0 rotate-45 text-[#c7c7cc] sm:block" />
                ) : null}
              </div>
            ))}
          </div>
        </GlassSurface>
      </div>
    </section>
  );
}

/* ── Official media × social platforms case study ── */
/* ── Official media internship: newsroom + social operations ── */
function OfficialMediaSection({ section }: { section: Section }) {
  const om = section.officialMediaCaseStudy;
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: reduce)",
      () => {
        gsap.set(".om-reveal", { opacity: 1, y: 0 });
      },
      containerRef,
    );
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.from(".om-reveal", {
          y: 16,
          opacity: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
        });
      },
      containerRef,
    );
    return () => mm.revert();
  }, []);

  if (!om) return null;

  return (
    <section ref={containerRef} className="space-y-10">
      {/* Header: brand logos + subheading (row 1) + heading (row 2) + intro */}
      <div className="w-full">
        <div className="flex items-center gap-3">
          {om.brandLogos.map((logo, i) => (
            <div key={logo.alt} className="flex items-center gap-3">
              {i > 0 ? <span className="h-1 w-1 rounded-full bg-[#c7c7cc]" /> : null}
              <img
                src={logo.src}
                alt={logo.alt}
                className={logo.className ?? "h-6 w-auto sm:h-7"}
              />
            </div>
          ))}
          {section.subheading ? (
            <h2 className="ml-2 text-[1.75rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.25rem] md:leading-[1.08]">
              {section.subheading}
            </h2>
          ) : null}
        </div>

        <h2 className="mt-1 text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-[#1d1d1f] md:text-[2.25rem] md:leading-[1.08]">
          {section.heading}
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-[#6e6e73] md:text-[17px] md:leading-8">
          {om.intro}
        </p>
      </div>

      {/* Screen 01: People's Daily newsroom */}
      <div className="om-reveal">
        <NewsroomMockup />
      </div>

      {/* Screen 02: social media content display */}
      <div className="om-reveal">
        <p className="max-w-2xl text-base leading-7 text-[#6e6e73] md:text-[17px] md:leading-8">
          {om.socialBlock.description}
        </p>

        <div className="mt-6">
          <SocialMockup />
        </div>
      </div>
    </section>
  );
}

/* ── Newsroom site mockup (pure CSS) ── */
function NewsroomMockup() {
  const navItems = ["Home", "China", "World", "Opinion", "Business", "Culture", "Travel"];

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {/* Masthead */}
      <div className="flex items-center justify-between border-b border-black/[0.06] px-7 py-5">
        <img
          src="/peopelsdailylogo.svg"
          alt="People's Daily"
          className="h-7 w-auto"
        />
        <div className="flex items-center gap-4 text-[#86868b]">
          <Search className="h-[18px] w-[18px]" />
          <Menu className="h-[18px] w-[18px]" />
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center gap-5 overflow-hidden border-b border-black/[0.06] px-7 py-3.5">
        {navItems.map((item) => (
          <span
            key={item}
            className={
              item === "Home"
                ? "shrink-0 border-b-2 border-[#c7262c] pb-1.5 text-[13px] font-semibold text-[#c7262c]"
                : "shrink-0 pb-1.5 text-[13px] text-[#6e6e73]"
            }
          >
            {item}
          </span>
        ))}
      </div>

      {/* Hero: Timeless Traditions | Bamboo drifting */}
      <div className="grid grid-cols-1 gap-6 p-7 sm:grid-cols-[1.5fr_1fr]">
        <a
          href="https://peoplesdaily.pdnews.cn/china/er/30046886171"
          target="_blank"
          rel="noreferrer"
          className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-xl bg-[#3f4d58]"
        >
          <Image
            src="/media-screenshots/pd-news/timeless-bamboo.png"
            alt="Timeless Traditions | Bamboo drifting: ballet dancing on water"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          <div className="relative p-5">
            <span className="mb-2 inline-block rounded bg-white/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
              China
            </span>
            <p className="text-[21px] font-semibold leading-tight text-white">
              Timeless Traditions
            </p>
            <p className="mt-1.5 text-[16px] leading-snug text-white/85">
              Bamboo drifting: ballet dancing on water
            </p>
          </div>
        </a>

        {/* Side stories: Hezhe + Wing Chun */}
        <div className="flex flex-col gap-4">
          <a
            href="https://peoplesdaily.pdnews.cn/culture/er/30043939591"
            target="_blank"
            rel="noreferrer"
            className="group flex gap-3"
          >
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#c7262c]">
                Culture
              </p>
              <p className="mt-1 text-[14px] font-semibold leading-tight text-[#1d1d1f]">
                China Up Close
              </p>
              <p className="mt-1 text-[13px] leading-snug text-[#1d1d1f]">
                Ancient fashion resurrected: Hezhe people&apos;s fish skin craft brings tradition into modern wear
              </p>
            </div>
            <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/media-screenshots/pd-news/hezhe-fish-skin.jpg"
                alt="Hezhe fish skin craft"
                fill
                className="object-cover"
                sizes="88px"
              />
            </div>
          </a>

          <a
            href="https://peoplesdaily.pdnews.cn/culture/er/30046443196"
            target="_blank"
            rel="noreferrer"
            className="group flex gap-3 border-t border-black/[0.06] pt-4"
          >
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#c7262c]">
                Culture
              </p>
              <p className="mt-1 text-[14px] font-semibold leading-tight text-[#1d1d1f]">
                Wing Chun
              </p>
              <p className="mt-1 text-[13px] leading-snug text-[#1d1d1f]">
                The dance drama &lsquo;Wing Chun&rsquo; brings Chinese artistry to London&apos;s West End, blending kung fu with theater
              </p>
            </div>
            <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/media-screenshots/pd-news/wing-chun.jpg"
                alt="Wing Chun dance drama in London"
                fill
                className="object-cover"
                sizes="88px"
              />
            </div>
          </a>

          <a
            href="https://peoplesdaily.pdnews.cn/china/er/30002033401"
            target="_blank"
            rel="noreferrer"
            className="group flex gap-3 border-t border-black/[0.06] pt-4"
          >
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#c7262c]">
                Travel
              </p>
              <p className="mt-1 text-[14px] font-semibold leading-tight text-[#1d1d1f]">
                Harbin
              </p>
              <p className="mt-1 text-[13px] leading-snug text-[#1d1d1f]">
                Winter tourism booms in China&apos;s ice city as visitors flock to the world-famous Harbin Ice and Snow Festival
              </p>
            </div>
            <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/media-screenshots/pd-news/harbin-winter.jpg"
                alt="Harbin winter tourism and ice festival"
                fill
                className="object-cover"
                sizes="88px"
              />
            </div>
          </a>
        </div>
      </div>

      {/* Latest stories: Gen Z, Creation of the God, Rock in Rio */}
      <div className="border-t border-black/[0.06] px-7 pb-7 pt-5">
        <div className="grid grid-cols-3 gap-4">
          <a
            href="https://peoplesdaily.pdnews.cn/china/er/30047383770"
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <Image
                src="/media-screenshots/pd-news/genz-music.jpg"
                alt="Chinese teacher bridges China-Brazil friendship"
                fill
                className="object-cover object-[center_30%] transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 33vw, 12vw"
              />
            </div>
            <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#86868b]">
              China
            </p>
            <p className="mt-1 text-[13px] font-semibold leading-snug text-[#1d1d1f]">
              Chinese teacher bridges China-Brazil friendship
            </p>
          </a>

          <a
            href="https://peoplesdaily.pdnews.cn/china/-creation-of-the-god-striving-for-excellence-in-filmmaking-310857.html"
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <Image
                src="/media-screenshots/pd-news/creation-of-god.jpg"
                alt="Creation of the Gods: striving for excellence in filmmaking"
                fill
                className="object-cover object-[center_top] transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 33vw, 12vw"
              />
            </div>
            <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#86868b]">
              Cinema
            </p>
            <p className="mt-1 text-[13px] font-semibold leading-snug text-[#1d1d1f]">
              Creation of the Gods: striving for excellence in filmmaking
            </p>
          </a>

          <a
            href="https://peoplesdaily.pdnews.cn/culture/er/30046728827"
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <Image
                src="/media-screenshots/pd-news/rock-in-rio.jpg"
                alt="Rock in Rio music festival in Brazil"
                fill
                className="object-cover object-[center_30%] transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 33vw, 12vw"
              />
            </div>
            <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#86868b]">
              Culture
            </p>
            <p className="mt-1 text-[13px] font-semibold leading-snug text-[#1d1d1f]">
              Rock in Rio concludes in Brazil, US$476M impact
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Social platform mockups (pure CSS) ── */
function SocialMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {/* Platform tabs + post cards, aligned in 4 columns */}
      <div className="grid grid-cols-2 items-start gap-x-2.5 sm:grid-cols-4">
        {[
          { logo: "/tiktok-logo.svg", src: "/media-screenshots/social-tiktok.jpeg", alt: "People's Daily TikTok post: fairy performance in Luoyang" },
          { logo: "/x-logo.svg", src: "/media-screenshots/social-x.jpeg", alt: "Xinhua News X post: dryland terraced fields in Ningxia" },
          { logo: "/facebook-logo.svg", src: "/media-screenshots/social-facebook.jpeg", alt: "People's Daily Facebook post: Chongqing drone light show" },
          { logo: "/youtube-logo.svg", src: "/media-screenshots/social-youtube.jpeg", alt: "New China TV YouTube channel about China" },
        ].map((p) => (
          <div key={p.src} className="flex flex-col">
            <div className="flex h-9 items-center justify-center border-b border-black/[0.06] pb-3">
              <img src={p.logo} alt="" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="relative mt-3 overflow-hidden rounded-lg border border-black/[0.07] bg-[#f5f5f7]">
              <Image
                src={p.src}
                alt={p.alt}
                width={1170}
                height={2400}
                className="block h-auto w-full"
                sizes="(max-width: 640px) 50vw, 22vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentCaseCard({ caseItem }: { caseItem: ContentCase }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="relative flex aspect-[12/25] items-center justify-center bg-[#f0f0f2]">
        {caseItem.imagePath ? (
          <Image
            src={caseItem.imagePath}
            alt={caseItem.imageAlt ?? caseItem.platform}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 21vw"
          />
        ) : (
          <p className="px-4 text-center text-xs text-[#c7c7cc]">Add screenshot</p>
        )}
        {caseItem.logoSrc ? (
          <img
            src={caseItem.logoSrc}
            alt={caseItem.platform}
            className="absolute left-2.5 top-2.5 h-5 w-auto rounded-sm bg-white/90 p-0.5 object-contain"
          />
        ) : (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
            {caseItem.platform}
          </span>
        )}
      </div>
    </div>
  );
}

function PromoCard({
  promo,
}: {
  promo: {
    platform: string;
    logoSrc?: string;
    title: string;
    detail: string;
    cta: string;
    imagePath?: string;
    imageAlt?: string;
  };
}) {
  if (promo.imagePath) {
    return (
      <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="relative flex aspect-[12/25] items-center justify-center bg-[#f0f0f2]">
          <Image
            src={promo.imagePath}
            alt={promo.imageAlt ?? promo.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 21vw"
          />
          {promo.logoSrc ? (
            <img
              src={promo.logoSrc}
              alt={promo.platform}
              className="absolute left-2.5 top-2.5 h-5 w-auto rounded-sm bg-white/90 p-0.5 object-contain"
            />
          ) : (
            <span className="absolute left-2.5 top-2.5 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
              {promo.platform}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-black/8 bg-[#f5f5f7] p-4">
      <div>
        <p className="text-xs font-semibold tracking-[0.1em] text-[#0071e3]">
          {promo.platform}
        </p>
        <p className="mt-2 text-sm font-semibold leading-snug text-[#1d1d1f]">
          {promo.title}
        </p>
        <p className="mt-1.5 text-xs leading-5 text-[#86868b]">
          {promo.detail}
        </p>
      </div>
      <span className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0071e3] px-4 py-2 text-xs font-semibold text-white">
        {promo.cta}
      </span>
    </div>
  );
}

function MediaPortfolioSection({ section }: { section: Section }) {
  if (!section.mediaPortfolio) return null;
  const { role, works, responsibilities } = section.mediaPortfolio;

  return (
    <section className="space-y-8">
      <SectionHeader section={section} />

      <p className="max-w-3xl text-base leading-7 text-[#6e6e73] md:text-lg md:leading-8">
        {role}
      </p>

      {responsibilities ? (
        <div className="max-w-3xl rounded-2xl border-l-2 border-[#0071e3] bg-[#f5f5f7]/60 px-5 py-4 text-[15px] leading-7 text-[#515154]">
          {responsibilities}
        </div>
      ) : null}

      <GreatestHitsGallery works={works} />
    </section>
  );
}

function GreatestHitsGallery({ works }: { works: WorkItem[] }) {
  const featured = works.find((w) => w.size === "featured");
  const smalls = works.filter((w) => w.size === "right").slice(0, 4);

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: reduce)",
      () => {
        gsap.set(".gh-card", { opacity: 1, y: 0 });
      },
      containerRef,
    );
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.from(".gh-card", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
        });
      },
      containerRef,
    );
    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="mt-6">
      {/* Grid: featured left (~58%), 2 cols of small cards right */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.4fr)_1fr_1fr] lg:gap-5">
        {/* Featured — spans both rows */}
        {featured ? (
          <FeaturedWorkCard
            work={featured}
            className="gh-card lg:row-span-2"
          />
        ) : (
          <div className="gh-card lg:row-span-2 flex min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/12 bg-[#f9fafb] p-8 text-center">
            <p className="text-sm font-medium text-[#86868b]">Add a featured piece</p>
            <p className="mt-1 text-xs text-[#a1a1a6]">Image, headline, dek, source</p>
          </div>
        )}

        {/* Right column: 2×2 small cards */}
        {smalls.map((work, i) => (
          <SmallCard key={i} work={work} className="gh-card" />
        ))}

        {/* Fill empty slots if fewer than 4 small items */}
        {smalls.length < 4
          ? Array.from({ length: 4 - smalls.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="gh-card flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-[#f9fafb] p-4 text-center"
              >
                <p className="text-xs font-medium text-[#c7c7cc]">Add piece</p>
              </div>
            ))
          : null}
      </div>

      {/* See All button removed */}
    </div>
  );
}

/* ── Featured card (left, spans 2 rows) ─────────────────── */
function FeaturedWorkCard({
  work,
  className,
}: {
  work: WorkItem;
  className?: string;
}) {
  if (!work.title) {
    return (
      <div
        className={`flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white ${className ?? ""}`}
      >
        <div className="flex aspect-[16/10] items-center justify-center bg-[#f5f5f7]">
          <p className="text-sm text-[#c7c7cc]">Add featured image</p>
        </div>
        <div className="space-y-3 p-5">
          <div className="h-5 w-3/4 rounded bg-black/5" />
          <div className="h-4 w-full rounded bg-black/4" />
          <div className="h-4 w-2/3 rounded bg-black/4" />
        </div>
      </div>
    );
  }

  const Inner = (
    <>
      {/* Image area */}
      <div className="relative aspect-[1/1] overflow-hidden rounded-t-2xl bg-[#f0f0f2]">
        {work.imagePath ? (
          <Image
            src={work.imagePath}
            alt={work.imageAlt ?? work.title ?? ""}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        ) : null}
      </div>
      {/* Text area */}
      <div className="space-y-2.5 p-5 pb-6">
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-[#1d1d1f] md:text-2xl">
          {work.title}
        </h3>
        {work.excerpt ? (
          <p className="max-w-none text-sm leading-6 text-[#515154] md:text-[15px] md:leading-7">
            {work.excerpt}
          </p>
        ) : null}
      </div>
    </>
  );

  if (work.url) {
    return (
      <a
        href={work.url}
        target="_blank"
        rel="noreferrer"
        className={`group block overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_6px_24px_rgba(0,0,0,0.09)] ${className ?? ""}`}
      >
        {Inner}
      </a>
    );
  }
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] ${className ?? ""}`}
    >
      {Inner}
    </div>
  );
}

/* ── Small card (right column, image-on-top) ─────────────── */
function SmallCard({
  work,
  className,
}: {
  work: WorkItem;
  className?: string;
}) {
  if (!work.title) {
    return (
      <div
        className={`flex flex-col overflow-hidden rounded-xl border border-black/7 bg-white ${className ?? ""}`}
      >
        <div className="flex flex-1 items-center justify-center bg-[#f5f5f7]">
          <p className="text-xs text-[#d2d2d7]">Add image</p>
        </div>
        <div className="p-3">
          <div className="h-3.5 w-full rounded bg-black/5" />
          <div className="mt-2 h-3 w-2/3 rounded bg-black/4" />
        </div>
      </div>
    );
  }

  const Inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f0f2]">
        {work.imagePath ? (
          <Image
            src={work.imagePath}
            alt={work.imageAlt ?? work.title ?? ""}
            fill
            className="object-cover object-center transition-transform duration-400 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 50vw, 21vw"
          />
        ) : null}
      </div>
      <div className="space-y-1.5 p-3">
        <h4 className="text-sm font-semibold leading-snug tracking-tight text-[#1d1d1f] line-clamp-3">
          {work.title}
        </h4>
        {work.excerpt ? (
          <p className="text-xs leading-5 text-[#86868b]">
            {work.excerpt}
          </p>
        ) : null}
      </div>
    </>
  );

  if (work.url) {
    return (
      <a
        href={work.url}
        target="_blank"
        rel="noreferrer"
        className={`group block overflow-hidden rounded-xl border border-black/7 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_3px_14px_rgba(0,0,0,0.07)] ${className ?? ""}`}
      >
        {Inner}
      </a>
    );
  }
  return (
    <div
      className={`overflow-hidden rounded-xl border border-black/7 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] ${className ?? ""}`}
    >
      {Inner}
    </div>
  );
}
