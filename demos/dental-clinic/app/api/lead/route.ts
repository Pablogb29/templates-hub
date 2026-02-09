import { NextRequest, NextResponse } from "next/server";

/* ── Validation helpers ── */

function isNonEmpty(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidPhone(v: string): boolean {
  // At least 7 digits (allows +, spaces, dashes, parens)
  return /^[+\d][\d\s\-().]{6,}$/.test(v.trim());
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

const ALLOWED_TREATMENTS = [
  "cosmetic",
  "general",
  "orthodontics",
  "emergency",
] as const;

/* ── POST /api/lead ── */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, phone, email, date, treatment } = body as {
      name?: string;
      phone?: string;
      email?: string;
      date?: string;
      treatment?: string;
    };

    /* ---- Required fields ---- */
    const errors: Record<string, string> = {};

    if (!isNonEmpty(name)) {
      errors.name = "Full name is required.";
    }

    if (!isNonEmpty(phone)) {
      errors.phone = "Phone number is required.";
    } else if (!isValidPhone(phone)) {
      errors.phone = "Please enter a valid phone number.";
    }

    /* ---- Optional fields (validate only if provided) ---- */
    if (email && !isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (
      treatment &&
      !ALLOWED_TREATMENTS.includes(
        treatment.toLowerCase() as (typeof ALLOWED_TREATMENTS)[number],
      )
    ) {
      errors.treatment = "Invalid treatment selection.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, errors },
        { status: 422 },
      );
    }

    /* ---- Log the lead server-side ---- */
    const lead = {
      name: name!.trim(),
      phone: phone!.trim(),
      email: email?.trim() || null,
      preferredDate: date?.trim() || null,
      treatment: treatment?.trim() || null,
      receivedAt: new Date().toISOString(),
    };

    console.log("\n──────────────────────────────────");
    console.log("📋  NEW LEAD SUBMISSION");
    console.log("──────────────────────────────────");
    console.log(JSON.stringify(lead, null, 2));
    console.log("──────────────────────────────────\n");

    /* ---- Success response ---- */
    return NextResponse.json({
      ok: true,
      message:
        "Thank you! We'll contact you within 15 minutes during business hours.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: "Invalid request body." } },
      { status: 400 },
    );
  }
}
