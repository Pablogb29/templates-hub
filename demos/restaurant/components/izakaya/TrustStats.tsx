"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { Star, Clock, Flame, CalendarDays } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  sectionViewport,
  hoverLiftSubtle,
} from "@/lib/motion";

/* ── PRO: Animated counter with eased spring ── */

function AnimatedNumber({
  target,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    damping: 30,
    stiffness: 80,
    mass: 0.8,
  });
  const display = useTransform(springVal, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, motionVal, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

/* ── Stats data ── */

const STATS = [
  {
    icon: Star,
    value: 4.8,
    decimals: 1,
    suffix: " ★",
    label: "Google Rating",
    sublabel: "230+ Reviews",
  },
  {
    icon: Clock,
    value: 1,
    decimals: 0,
    suffix: " AM",
    label: "Open Late",
    sublabel: "Fri & Sat",
  },
  {
    icon: Flame,
    value: 12,
    decimals: 0,
    suffix: "",
    label: "Omakase Courses",
    sublabel: "Nightly",
  },
  {
    icon: CalendarDays,
    value: 12,
    decimals: 0,
    suffix: "+",
    prefix: "",
    label: "Years",
    sublabel: "Est. 2014",
  },
];

/* ── PRO: Component with hover depth & refined animations ── */

export default function TrustStats() {
  return (
    <section
      aria-label="Restaurant highlights"
      className="py-12 px-4 sm:px-6 lg:px-8 bg-dark relative overflow-hidden"
    >
      {/* PRO: Subtle layered glow behind stats */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/5 rounded-full blur-[100px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        className="relative max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            whileHover={hoverLiftSubtle}
            className="glass rounded-xl p-5 sm:p-6 flex items-center gap-4 group hover:border-primary/20 transition-colors cursor-default"
          >
            {/* PRO: Icon with pulse animation on view */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/25 group-hover:shadow-[0_0_20px_rgba(13,242,242,0.15)] transition-all duration-300">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-lg sm:text-xl font-bold leading-tight">
                <AnimatedNumber
                  target={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  prefix={stat.prefix ?? ""}
                />
              </p>
              <p className="text-gray-400 text-xs sm:text-sm font-medium truncate">
                {stat.label}
              </p>
              <p className="text-gray-600 text-[10px] sm:text-xs truncate">
                {stat.sublabel}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
