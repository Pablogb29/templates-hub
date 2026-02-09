"use client";

import { useState, type FormEvent } from "react";

/* ── Types ── */
type Status = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
  treatment?: string;
  _form?: string;
}

const TREATMENT_OPTIONS = [
  { value: "", label: "Select a treatment…" },
  { value: "cosmetic", label: "Cosmetic Dentistry" },
  { value: "general", label: "General Dentistry" },
  { value: "orthodontics", label: "Orthodontics" },
  { value: "emergency", label: "Emergency" },
];

/* ── Component ── */

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [treatment, setTreatment] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState("");

  /* ── Submit handler ── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError("");
    setStatus("loading");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, date, treatment }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setFieldErrors(data.errors ?? {});
        setGlobalError(
          data.errors?._form ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setGlobalError("Network error — please check your connection.");
      setStatus("error");
    }
  }

  /* ── Success state ── */
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-6 gap-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/15">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <h3 className="text-lg font-bold text-secondary">
          Booking Request Received!
        </h3>
        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
          We&rsquo;ll contact you within{" "}
          <span className="font-semibold text-secondary">15 minutes</span>{" "}
          during business hours (Mon–Fri 8 am – 8 pm, Sat 9 am – 4 pm).
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setName("");
            setPhone("");
            setEmail("");
            setDate("");
            setTreatment("");
          }}
          className="mt-2 text-sm font-semibold text-accent hover:text-primary transition-colors"
        >
          Submit another request &rarr;
        </button>
      </div>
    );
  }

  /* ── Form state (idle / loading / error) ── */
  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Global error */}
      {globalError && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          <span className="material-symbols-outlined text-base mt-0.5 shrink-0">
            error
          </span>
          {globalError}
        </div>
      )}

      {/* Full Name (required) */}
      <Field
        icon="person"
        label="Full Name"
        required
        error={fieldErrors.name}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
          disabled={isLoading}
          className={inputClass(fieldErrors.name)}
        />
      </Field>

      {/* Phone (required) */}
      <Field
        icon="call"
        label="Phone Number"
        required
        error={fieldErrors.phone}
      >
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+352 691 000 000"
          required
          disabled={isLoading}
          className={inputClass(fieldErrors.phone)}
        />
      </Field>

      {/* Email (optional) */}
      <Field icon="mail" label="Email" error={fieldErrors.email}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          disabled={isLoading}
          className={inputClass(fieldErrors.email)}
        />
      </Field>

      {/* Two-col row: Date + Treatment */}
      <div className="grid grid-cols-2 gap-3">
        {/* Preferred Date (optional) */}
        <Field icon="calendar_month" label="Preferred Date">
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={isLoading}
            className={inputClass()}
          />
        </Field>

        {/* Treatment (dropdown) */}
        <Field
          icon="medical_services"
          label="Treatment"
          error={fieldErrors.treatment}
        >
          <select
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            disabled={isLoading}
            className={inputClass(fieldErrors.treatment)}
          >
            {TREATMENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="group mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-3 font-bold text-white shadow-lg transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
      >
        {isLoading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin text-primary"
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
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Schedule Visit
            <span className="material-symbols-outlined text-primary text-lg transition-transform group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        No payment required for booking requests.
      </p>
    </form>
  );
}

/* ── Shared field wrapper ── */

function Field({
  icon,
  label,
  required,
  error,
  children,
}: {
  icon: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <span className="material-symbols-outlined text-lg">{icon}</span>
        </span>
        {children}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}

/* ── Input class helper ── */

function inputClass(error?: string) {
  return [
    "w-full rounded-lg border bg-white/60 py-2.5 pl-10 pr-3 text-sm text-secondary placeholder-gray-400 transition-all",
    "focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    error ? "border-red-300 ring-1 ring-red-300" : "border-gray-200",
  ].join(" ");
}
