import { NextRequest, NextResponse } from "next/server";

/* ── Helpers ── */

const SEATING_OPTIONS = ["Counter", "Table", "Omakase"] as const;

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isValidPhone(v: string) {
  // allow digits, spaces, dashes, parens, plus – 7‑20 chars
  return /^[\d\s\-+()]{7,20}$/.test(v);
}

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

/* ── Route handler ── */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      partySize,
      date,
      time,
      seating,
      notes,
    } = body as Record<string, unknown>;

    const errors: string[] = [];

    /* ── Name ── */
    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > 100
    ) {
      errors.push("Full name is required (2–100 characters).");
    }

    /* ── Phone ── */
    if (typeof phone !== "string" || !isValidPhone(phone.trim())) {
      errors.push("A valid phone number is required.");
    }

    /* ── Email (optional) ── */
    if (email !== undefined && email !== "") {
      if (typeof email !== "string" || !isValidEmail(email.trim())) {
        errors.push("If provided, email must be a valid address.");
      }
    }

    /* ── Party size ── */
    const size = Number(partySize);
    if (!Number.isInteger(size) || size < 1 || size > 12) {
      errors.push("Party size must be between 1 and 12.");
    }

    /* ── Date ── */
    if (typeof date !== "string" || !date) {
      errors.push("Preferred date is required.");
    } else if (date < todayISO()) {
      errors.push("Date cannot be in the past.");
    }

    /* ── Time ── */
    if (typeof time !== "string" || !time) {
      errors.push("Preferred time is required.");
    }

    /* ── Seating ── */
    if (
      typeof seating !== "string" ||
      !(SEATING_OPTIONS as readonly string[]).includes(seating)
    ) {
      errors.push("Seating preference must be Counter, Table, or Omakase.");
    }

    /* ── Notes (optional, capped) ── */
    if (notes !== undefined && notes !== "") {
      if (typeof notes !== "string" || notes.length > 500) {
        errors.push("Notes must be under 500 characters.");
      }
    }

    /* ── Return errors ── */
    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    /* ── Log to server console ── */
    const trimmed = {
      name: (name as string).trim(),
      phone: (phone as string).trim(),
      email: email ? (email as string).trim() : "(not provided)",
      partySize: size,
      date,
      time,
      seating,
      notes: notes ? (notes as string).trim() : "(none)",
    };

    console.log("");
    console.log("━━━━━━━ New Reservation Request ━━━━━━━");
    console.log(`  Name      ${trimmed.name}`);
    console.log(`  Phone     ${trimmed.phone}`);
    console.log(`  Email     ${trimmed.email}`);
    console.log(`  Party     ${trimmed.partySize}`);
    console.log(`  Date      ${trimmed.date}`);
    console.log(`  Time      ${trimmed.time}`);
    console.log(`  Seating   ${trimmed.seating}`);
    console.log(`  Notes     ${trimmed.notes}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("");

    return NextResponse.json({
      ok: true,
      message: "Reservation request received. We'll confirm shortly.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Invalid request body."] },
      { status: 400 },
    );
  }
}
