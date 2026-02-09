import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templates, getTemplateBySlug } from "@/data/templates";
import { TemplateDetail } from "./TemplateDetail";

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
    title: `${template.name} — ${template.niche} Template | TemplatesHub`,
    description: template.pitch,
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return <TemplateDetail template={template} />;
}
