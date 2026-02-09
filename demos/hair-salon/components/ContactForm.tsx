"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "loading" | "success" | "error";
type FieldErrors = Record<string, string>;

const inputBase =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const set = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    // Clear field error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrors({});

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setState("error");
        setErrors(data.errors ?? { form: "Something went wrong." });
        return;
      }

      setState("success");
      setSuccessMsg(data.message);
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setState("error");
      setErrors({ form: "Network error. Please try again." });
    }
  };

  /* ---- Success State ---- */
  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined !text-4xl">
            check_circle
          </span>
        </span>
        <h3 className="text-xl font-bold font-serif">Message Sent!</h3>
        <p className="max-w-xs text-sm leading-relaxed text-text-muted">
          {successMsg}
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-2 text-sm font-semibold text-primary underline underline-offset-4 transition-colors hover:text-primary-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  /* ---- Form ---- */
  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="cf-name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={set("name")}
          className={`${inputBase} ${errors.name ? "border-red-400 focus:ring-red-200" : ""}`}
          required
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={set("email")}
          className={`${inputBase} ${errors.email ? "border-red-400 focus:ring-red-200" : ""}`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium">
          Phone
        </label>
        <input
          id="cf-phone"
          type="tel"
          placeholder="(555) 000-0000"
          value={form.phone}
          onChange={set("phone")}
          className={`${inputBase} ${errors.phone ? "border-red-400 focus:ring-red-200" : ""}`}
          required
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="cf-message"
          className="mb-1.5 block text-sm font-medium"
        >
          Message
        </label>
        <textarea
          id="cf-message"
          rows={4}
          placeholder="How can we help you?"
          value={form.message}
          onChange={set("message")}
          className={`${inputBase} resize-none ${errors.message ? "border-red-400 focus:ring-red-200" : ""}`}
          required
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Global error */}
      {errors.form && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {errors.form}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-bg-dark shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? (
          <>
            <svg
              className="size-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          <>
            <span className="material-symbols-outlined !text-xl">send</span>
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
