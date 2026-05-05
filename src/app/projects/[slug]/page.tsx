import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ByteDanceAiToolsCaseStudy } from "@/components/bytedance-ai-tools-case-study";
import { CaseStudyPage } from "@/components/case-study-page";
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
      title: "项目未找到 | 傅鹏威作品集",
    };
  }

  return {
    title: `${project.title} | 傅鹏威作品集`,
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

  if (slug === "bytedance-ai-procurement-tools") {
    return <ByteDanceAiToolsCaseStudy project={project} />;
  }

  return <CaseStudyPage project={project} />;
}
