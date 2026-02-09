"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";

import AmbientBackground from "@/components/izakaya/AmbientBackground";
import { fadeInUp, scaleIn, sectionViewport, smooth } from "@/lib/motion";

export default function OmakaseHighlight() {
  return (
    <section
      id="omakase"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0f0f] scroll-mt-20 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <AmbientBackground variant="subtle" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          custom={0}
          className="relative rounded-2xl overflow-hidden bg-surface border border-white/5 shadow-2xl neon-glow-hover"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* ── Image ── */}
            <div className="relative h-80 lg:h-auto min-h-[420px] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
                alt="Chef carefully preparing sushi at an intimate counter"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-transparent lg:bg-gradient-to-l lg:from-surface/20 lg:to-transparent" />

              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                custom={0.3}
                className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              >
                <Flame className="w-3.5 h-3.5 text-primary" />
                Chef&apos;s Selection
              </motion.div>
            </div>

            {/* ── Content ── */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              {/* Decorative glow */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-secondary/8 rounded-full blur-[80px] pointer-events-none" />

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                custom={0.15}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 relative z-10">
                  The Omakase Experience
                </h2>
                <div className="w-16 h-1 bg-primary mb-6 rounded-full" />
                <p className="text-gray-300 text-lg mb-2 font-medium">
                  12-Course Seasonal Tasting Menu
                </p>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Embark on a culinary journey prepared right before your eyes at
                  the chef&apos;s counter. Our omakase changes daily based on the
                  highest quality ingredients available from the market.
                </p>
              </motion.div>

              {/* Urgency */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                custom={0.35}
                className="flex items-center gap-3 mb-8 p-3 rounded-lg bg-primary/5 border border-primary/10 w-fit"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
                <span className="text-primary text-sm font-bold uppercase tracking-wider">
                  Only 8 seats — book 48 h in advance
                </span>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                custom={0.5}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#reserve"
                  className="group inline-flex items-center justify-center gap-2 bg-transparent border border-primary text-primary hover:bg-primary hover:text-dark px-6 py-3 rounded-lg transition-all font-bold text-sm uppercase tracking-wider cursor-pointer neon-glow-hover"
                >
                  Reserve Omakase
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
