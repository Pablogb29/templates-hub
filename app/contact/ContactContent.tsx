"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  Phone,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactContent() {
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    // TODO: Connect to your email/CRM API (e.g., Resend, SendGrid, HubSpot)
    // Simulate success for now
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
  };

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
            Contact
          </span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s build your website
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-muted)]">
            Tell us about your business and we&apos;ll get back to you within 24 hours
            with a plan to get you online.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/5 p-16 text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-green-400" />
                <h2 className="text-2xl font-bold">Message sent!</h2>
                <p className="mt-2 text-[var(--color-text-muted)]">
                  We&apos;ll review your details and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] px-4 py-3 text-sm text-white placeholder:text-[var(--color-text-dim)] transition-colors focus:border-[var(--color-primary)] focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] px-4 py-3 text-sm text-white placeholder:text-[var(--color-text-dim)] transition-colors focus:border-[var(--color-primary)] focus:outline-none"
                      placeholder="john@business.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="business"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]"
                  >
                    Business Name
                  </label>
                  <input
                    id="business"
                    name="business"
                    type="text"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] px-4 py-3 text-sm text-white placeholder:text-[var(--color-text-dim)] transition-colors focus:border-[var(--color-primary)] focus:outline-none"
                    placeholder="My Restaurant / Salon / Clinic"
                  />
                </div>

                <div>
                  <label
                    htmlFor="template"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]"
                  >
                    Template of Interest
                  </label>
                  <select
                    id="template"
                    name="template"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] px-4 py-3 text-sm text-white transition-colors focus:border-[var(--color-primary)] focus:outline-none"
                  >
                    <option value="">Select a template (optional)</option>
                    <option value="restaurant">Izakaya Pro (Restaurant)</option>
                    <option value="hair-salon">Salon Studio (Hair Salon)</option>
                    <option value="dental-clinic">WhitePeak Dental (Dental Clinic)</option>
                    <option value="custom">Custom / Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tier"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]"
                  >
                    Pricing Tier
                  </label>
                  <select
                    id="tier"
                    name="tier"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] px-4 py-3 text-sm text-white transition-colors focus:border-[var(--color-primary)] focus:outline-none"
                  >
                    <option value="">Select a tier (optional)</option>
                    <option value="starter">Starter (€1,200)</option>
                    <option value="pro">Pro (€2,400)</option>
                    <option value="pro-plus">Pro+ (€3,800)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] px-4 py-3 text-sm text-white placeholder:text-[var(--color-text-dim)] transition-colors focus:border-[var(--color-primary)] focus:outline-none"
                    placeholder="Tell us about your business and what you're looking for..."
                  />
                </div>

                {formState === "error" && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {formState === "submitting" ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Direct contact */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6">
              <h3 className="mb-4 text-lg font-semibold">Direct Contact</h3>
              <div className="space-y-4">
                <a
                  href="mailto:hello@templateshub.com"
                  className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[var(--color-primary-light)]" />
                  hello@templateshub.com
                </a>
                <a
                  href="tel:+352000000000"
                  className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[var(--color-primary-light)]" />
                  +352 000 000 000
                </a>
              </div>
            </div>

            {/* Calendly */}
            <div className="rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[var(--color-primary-light)]" />
                <h3 className="font-semibold">Prefer a call?</h3>
              </div>
              <p className="mb-4 text-sm text-[var(--color-text-muted)]">
                Book a free 15-minute discovery call. We&apos;ll discuss your
                needs and recommend the best solution.
              </p>
              {/* TODO: Replace with actual Calendly embed link */}
              <Button
                href="https://calendly.com"
                variant="secondary"
                size="sm"
              >
                Book a Call
              </Button>
            </div>

            {/* What happens next */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6">
              <h3 className="mb-4 text-lg font-semibold">What happens next?</h3>
              <ol className="space-y-3 text-sm text-[var(--color-text-muted)]">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-hover)] text-xs font-bold">
                    1
                  </span>
                  We review your request within 24 hours
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-hover)] text-xs font-bold">
                    2
                  </span>
                  We send you a proposal with timeline & pricing
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-hover)] text-xs font-bold">
                    3
                  </span>
                  Upon approval, we start building your site
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-hover)] text-xs font-bold">
                    4
                  </span>
                  Your site goes live in 5-10 business days
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
