import { notFound } from "next/navigation";
import { templates, getTemplateBySlug } from "@/data/templates";
import { DemoEmbed } from "./DemoEmbed";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return {};

  return {
    title: `${template.name} Demo | TemplatesHub`,
    description: `Live demo of the ${template.name} template for ${template.niche.toLowerCase()} businesses.`,
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return <DemoEmbed template={template} />;
}
