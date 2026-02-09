"use client";

import { motion } from "framer-motion";
import { type Template } from "@/data/templates";
import { TemplateCard } from "@/components/templates/TemplateCard";

interface TemplateGridProps {
  templates: Template[];
}

export function TemplateGrid({ templates }: TemplateGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template, i) => (
        <motion.div
          key={template.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <TemplateCard template={template} />
        </motion.div>
      ))}
    </div>
  );
}
