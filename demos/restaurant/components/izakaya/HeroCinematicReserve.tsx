"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ProImage from "@/components/ui/ProImage";
import {
  ArrowRight,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import AmbientBackground from "@/components/izakaya/AmbientBackground";
import {
  heroText,
  heroCTA,
  fadeInUp,
  cinematic,
  smooth,
  sectionViewport,
} from "@/lib/motion";

/* ── Defaults ── */
function defaultDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
}
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const SEATING = ["Counter", "Table", "Omakase"] as const;

/* ── Types ── */
interface FormState {
  name: string;
  phone: string;
  email: string;
  partySize: string;
  date: string;
  time: string;
  seating: string;
  notes: string;
}
type Status = "idle" | "loading" | "success" | "error";

/* ── Shared input classes ── */
const INPUT =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 transition-colors hover:border-primary/30 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 focus:outline-none";
const LABEL =
  "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5";

/* ================================================================== */

export default function HeroCinematicReserve() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    partySize: "2",
    date: defaultDate(),
    time: "19:00",
    seating: "Table",
    notes: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  /* ── Submit ── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrors([]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? ["Something went wrong."]);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrors(["Network error — please try again."]);
      setStatus("error");
    }
  }

  /* PRO: Parallax scroll offset for hero background */
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 150]);

  /* ================================================================ */
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* PRO: Background photo with parallax + blur placeholder */}
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <ProImage
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
            alt="Atmospheric Japanese restaurant interior with warm ambient lighting"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-dark/80" />
        </motion.div>

        {/* Ambient floating glow blobs */}
        <AmbientBackground variant="hero" />

        {/* Copy — cinematic staggered entrance */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-32 pb-48"
        >
          <motion.span
            variants={heroText}
            custom={0.1}
            className="inline-block text-primary text-xs font-bold tracking-[0.3em] uppercase mb-6 opacity-80"
          >
            Welcome to Yoru
          </motion.span>

          <motion.h1
            variants={heroText}
            custom={0.25}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.08] tracking-tight mb-6 drop-shadow-2xl"
          >
            Tokyo Nightlife
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white">
              Heart of the City
            </span>
          </motion.h1>

          <motion.p
            variants={heroText}
            custom={0.45}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Experience the finest sushi and authentic izakaya dishes in an
            ambient, neon-lit atmosphere where tradition meets modern Tokyo.
          </motion.p>

          <motion.div
            variants={heroCTA}
            custom={0.65}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 bg-primary text-dark font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:scale-105 neon-glow neon-glow-hover transition-all"
            >
              View Menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-primary/40 text-white hover:text-primary backdrop-blur-sm font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg transition-all hover:bg-white/5"
            >
              Explore
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-white" />
        </div>
      </section>

      {/* ── Floating Reservation Form ── */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        custom={0}
        className="relative z-20 max-w-4xl mx-auto px-4 -mt-20"
      >
        <div className="glass rounded-2xl shadow-2xl shadow-black/60 overflow-hidden neon-glow-hover">
          <AnimatePresence mode="wait">
            {/* ─── Success state ─── */}
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={smooth}
                className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center"
              >
                <CheckCircle2 className="w-14 h-14 text-primary" />
                <h3 className="text-white text-xl font-bold">
                  Reservation Request Received
                </h3>
                <p className="text-gray-400 text-sm max-w-md">
                  Reservation request received. We&apos;ll confirm shortly.
                  <br />
                  Check your phone for a confirmation text.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm((f) => ({
                      ...f,
                      name: "",
                      phone: "",
                      email: "",
                      notes: "",
                    }));
                  }}
                  className="mt-2 text-primary text-sm font-bold uppercase tracking-wider hover:underline cursor-pointer"
                >
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              /* ─── Form state ─── */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="p-6 md:p-8"
                aria-label="Reserve a table"
                noValidate
              >
                {/* Row 1 — Name / Phone / Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="res-name" className={LABEL}>
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Tanaka Yuki"
                      value={form.name}
                      onChange={set("name")}
                      className={INPUT}
                    />
                  </div>
                  <div>
                    <label htmlFor="res-phone" className={LABEL}>
                      Phone <span className="text-primary">*</span>
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 123-4567"
                      value={form.phone}
                      onChange={set("phone")}
                      className={INPUT}
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label htmlFor="res-email" className={LABEL}>
                      Email <span className="text-gray-600">(optional)</span>
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={set("email")}
                      className={INPUT}
                    />
                  </div>
                </div>

                {/* Row 2 — Party / Date / Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="res-party" className={LABEL}>
                      Party Size <span className="text-primary">*</span>
                    </label>
                    <select
                      id="res-party"
                      required
                      value={form.partySize}
                      onChange={set("partySize")}
                      className={`${INPUT} appearance-none cursor-pointer`}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option
                          key={n}
                          value={n}
                          className="bg-dark text-white"
                        >
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="res-date" className={LABEL}>
                      Date <span className="text-primary">*</span>
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      required
                      min={todayISO()}
                      value={form.date}
                      onChange={set("date")}
                      className={`${INPUT} cursor-pointer`}
                    />
                  </div>
                  <div>
                    <label htmlFor="res-time" className={LABEL}>
                      Time <span className="text-primary">*</span>
                    </label>
                    <input
                      id="res-time"
                      type="time"
                      required
                      value={form.time}
                      onChange={set("time")}
                      className={`${INPUT} cursor-pointer`}
                    />
                  </div>
                </div>

                {/* Row 3 — Seating preference */}
                <fieldset className="mb-4">
                  <legend className={LABEL}>
                    Seating Preference <span className="text-primary">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {SEATING.map((opt) => (
                      <label
                        key={opt}
                        className={`cursor-pointer px-5 py-2.5 rounded-lg text-sm font-bold transition-all border ${
                          form.seating === opt
                            ? "bg-primary/15 border-primary/40 text-primary neon-glow-sm"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="seating"
                          value={opt}
                          checked={form.seating === opt}
                          onChange={set("seating")}
                          className="sr-only"
                        />
                        {opt === "Omakase" && "🍣 "}
                        {opt === "Counter" && "🪑 "}
                        {opt === "Table" && "🍽️ "}
                        {opt}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Row 4 — Notes */}
                <div className="mb-5">
                  <label htmlFor="res-notes" className={LABEL}>
                    Notes{" "}
                    <span className="text-gray-600">
                      (optional — allergies, celebrations, etc.)
                    </span>
                  </label>
                  <textarea
                    id="res-notes"
                    rows={2}
                    maxLength={500}
                    placeholder="Any allergies or special requests…"
                    value={form.notes}
                    onChange={set("notes")}
                    className={`${INPUT} resize-none`}
                  />
                </div>

                {/* Errors */}
                <AnimatePresence>
                  {status === "error" && errors.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 overflow-hidden"
                      role="alert"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <ul className="text-sm text-red-300 space-y-1">
                          {errors.map((err) => (
                            <li key={err}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-dark font-bold py-4 rounded-xl hover:scale-[1.01] active:scale-[0.99] neon-glow neon-glow-hover transition-all text-sm uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    "Reserve Now"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
