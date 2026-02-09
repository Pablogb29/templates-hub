"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

import { fadeInUp, staggerContainer, staggerItem, sectionViewport } from "@/lib/motion";

const FAQS = [
  {
    q: "Do you accept walk-ins?",
    a: "While we always try to accommodate walk-ins, we strongly recommend reservations — especially on Friday and Saturday evenings. Our omakase counter is reservation-only and requires 48 hours advance notice.",
  },
  {
    q: "What is the dress code?",
    a: "We maintain a smart-casual dress code. Think elevated evening wear — no athletic wear or flip-flops. Dark, stylish attire fits perfectly with our ambiance.",
  },
  {
    q: "Can you accommodate dietary restrictions?",
    a: "Absolutely. Please inform us of any allergies or dietary needs when making your reservation. Our chefs are experienced in crafting beautiful alternatives for vegetarian, vegan, gluten-free, and other dietary requirements.",
  },
  {
    q: "Do you offer private dining?",
    a: "Yes! Our private tatami room seats up to 12 guests and includes a dedicated server, custom menu options, and a premium sake pairing. Contact us directly for private event pricing.",
  },
  {
    q: "Is there a corkage fee?",
    a: "We charge a $40 corkage fee per 750ml bottle, limited to two bottles per table. We do not allow outside sake or Japanese spirits as we pride ourselves on our curated collection.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Cancellations made more than 24 hours in advance are fully refundable. Late cancellations or no-shows for omakase reservations will be charged a $75 per person fee.",
  },
];

function AccordionItem({
  faq,
  isOpen,
  toggle,
}: {
  faq: (typeof FAQS)[number];
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <motion.div variants={staggerItem} className="border-b border-white/5 last:border-0">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`text-lg font-medium transition-colors ${
            isOpen ? "text-primary" : "text-white group-hover:text-primary"
          }`}
        >
          {faq.q}
        </span>
        <span className="shrink-0 ml-4 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:border-primary/30 group-hover:text-primary transition-colors">
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm leading-relaxed pb-5 pr-12">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-28 px-4 sm:px-6 lg:px-8 bg-dark scroll-mt-20"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          custom={0}
          className="text-center mb-14"
        >
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            Need to Know
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Frequently Asked
          </h2>
        </motion.div>

        {/* Accordion — staggered reveal */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="glass rounded-2xl p-6 md:p-8"
        >
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
