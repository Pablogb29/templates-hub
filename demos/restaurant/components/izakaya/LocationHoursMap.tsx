"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Sparkles } from "lucide-react";

import { useTilt } from "@/lib/useTilt";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  sectionViewport,
} from "@/lib/motion";

/* ── Glass card with tilt ── */

function TiltGlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>({
    maxTilt: 4,
    scale: 1.01,
  });

  return (
    <motion.div variants={staggerItem}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`glass rounded-2xl will-change-transform hover:border-primary/15 neon-glow-hover transition-shadow ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ── Main component ── */

export default function LocationHoursMap() {
  return (
    <section
      id="location"
      className="py-28 px-4 sm:px-6 lg:px-8 bg-surface scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          custom={0}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            Find Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Visit Izakaya Yoru
          </h2>
        </motion.div>

        {/* Cards — staggered + tilt */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* ── Hours ── */}
          <TiltGlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">
                Hours
              </h3>
            </div>
            <ul className="space-y-3 text-sm mb-8">
              {[
                ["Mon – Thu", "5:00 PM – 11:00 PM"],
                ["Fri – Sat", "5:00 PM – 1:00 AM"],
                ["Sunday", "4:00 PM – 10:00 PM"],
              ].map(([day, hrs]) => (
                <li key={day} className="flex justify-between text-gray-400">
                  <span>{day}</span>
                  <span className="text-white font-medium">{hrs}</span>
                </li>
              ))}
            </ul>

            {/* Happy hour callout */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-wider">
                  Happy Hour
                </span>
              </div>
              <p className="text-gray-300 text-sm">Daily 5:00 – 7:00 PM</p>
              <p className="text-gray-500 text-xs mt-1">
                Special pricing on sake &amp; skewers.
              </p>
            </div>
          </TiltGlassCard>

          {/* ── Contact ── */}
          <TiltGlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">
                Location
              </h3>
            </div>
            <address className="not-italic space-y-5 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-gray-400">
                  123 Neon District Blvd,
                  <br />
                  Downtown, NY 10012
                </p>
              </div>
              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a
                  href="mailto:hello@izakayayoru.com"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  hello@izakayayoru.com
                </a>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a
                  href="tel:+15551234567"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </address>

            <div className="mt-8 flex gap-3">
              <a
                href="#"
                className="flex-1 text-center bg-primary/10 text-primary border border-primary/20 font-bold text-xs uppercase tracking-wider py-3 rounded-lg hover:bg-primary hover:text-dark transition-all neon-glow-hover"
              >
                Get Directions
              </a>
              <a
                href="tel:+15551234567"
                className="flex-1 text-center bg-white/5 text-white border border-white/10 font-bold text-xs uppercase tracking-wider py-3 rounded-lg hover:border-primary/30 hover:text-primary transition-all"
              >
                Call Us
              </a>
            </div>
          </TiltGlassCard>

          {/* ── Map ── */}
          <motion.div variants={staggerItem}>
            <div className="glass rounded-2xl overflow-hidden relative group min-h-[320px] lg:min-h-0 h-full">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                alt="Aerial night view of downtown city with glowing streets"
                fill
                className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                sizes="(max-width:1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center animate-bounce">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="bg-dark/70 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  View on Google Maps
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
