import type { Metadata } from "next";
import { templates } from "@/data/templates";
import { TemplateGrid } from "./TemplateGrid";

export const metadata: Metadata = {
  title: "Templates | TemplatesHub",
  description:
    "Browse our collection of premium, AI-powered website templates for restaurants, salons, clinics, and more.",
};

export default function TemplatesPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
            Templates
          </span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Choose your starting point
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-muted)]">
            Every template includes responsive design, premium animations, and an
            AI chatbot trained on your business data.
          </p>
        </div>

        <TemplateGrid templates={templates} />
      </div>
    </section>
  );
}
