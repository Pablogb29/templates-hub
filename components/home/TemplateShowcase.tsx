"use client";

import { motion } from "framer-motion";
import { templates } from "@/data/templates";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TemplateShowcase() {
  return (
    <section className="relative py-32" id="templates">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          label="Templates"
          title="Ready-to-launch websites"
          subtitle="Each template is production-ready with an AI chatbot, responsive design, and premium animations. Pick one and go live in days."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, i) => (
            <motion.div
              key={template.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TemplateCard template={template} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
