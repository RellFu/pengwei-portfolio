import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlibabaAiQualityCaseStudy } from "@/components/alibaba-ai-quality-case-study";
import { ByteDanceAiToolsCaseStudy } from "@/components/bytedance-ai-tools-case-study";
import { CaseStudyPage } from "@/components/case-study-page";
import { MediaCaseStudy } from "@/components/media-case-study";
import { MerchantOnboardingCaseStudy } from "@/components/merchant-onboarding-case-study";
import { featuredProjects, projectMap } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectMap[slug];

  if (!project) {
    return {
      title: "Project Not Found | Pengwei Fu Portfolio",
    };
  }

  return {
    title: `${project.title} | Pengwei Fu Portfolio`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectMap[slug];

  if (!project) {
    notFound();
  }

  if (slug === "ai-merchant-onboarding-agent") {
    return <MerchantOnboardingCaseStudy project={project} />;
  }

  if (slug === "alibaba-creative-ai-quality-system") {
    return <AlibabaAiQualityCaseStudy project={project} />;
  }

  if (slug === "bytedance-ai-procurement-tools") {
    return <ByteDanceAiToolsCaseStudy project={project} />;
  }

  if (slug === "media-international-communications") {
    return <MediaCaseStudy project={project} />;
  }

  return <CaseStudyPage project={project} />;
}
