/* ──────────────────────────────────────────────────────────
   data/hours.ts
   Weekly operating hours & special closures for Tsuki Izakaya
   ────────────────────────────────────────────────────────── */

export interface DayHours {
  /** Day of the week (0 = Sunday … 6 = Saturday) */
  day: number;
  label: string;
  /** ISO-style "HH:mm" or null if closed */
  open: string | null;
  close: string | null;
  /** Optional label shown next to the row */
  note?: string;
}

export interface SpecialClosure {
  /** ISO date "YYYY-MM-DD" */
  date: string;
  reason: string;
  /** true = fully closed, false = modified hours */
  closed: boolean;
  /** If not fully closed, override open/close */
  open?: string;
  close?: string;
}

/* ── Regular weekly schedule ── */

export const weeklyHours: DayHours[] = [
  { day: 0, label: "Sunday",    open: "16:00", close: "22:00", note: "Early close" },
  { day: 1, label: "Monday",    open: "17:00", close: "23:00" },
  { day: 2, label: "Tuesday",   open: "17:00", close: "23:00" },
  { day: 3, label: "Wednesday", open: "17:00", close: "23:00" },
  { day: 4, label: "Thursday",  open: "17:00", close: "23:30" },
  { day: 5, label: "Friday",    open: "17:00", close: "01:00", note: "Late night" },
  { day: 6, label: "Saturday",  open: "17:00", close: "01:00", note: "Late night" },
];

/* ── Happy-hour window ── */

export const happyHour = {
  label: "Happy Hour",
  start: "17:00",
  end: "19:00",
  days: [1, 2, 3, 4, 5], // Mon–Fri
  description: "Half-price house sake, $5 edamame & gyoza, $8 yakitori flights.",
} as const;

/* ── Special closures / modified hours ── */

export const specialClosures: SpecialClosure[] = [
  {
    date: "2026-03-20",
    reason: "Spring Equinox — Private Omakase Event",
    closed: true,
  },
  {
    date: "2026-04-29",
    reason: "Shōwa Day — Holiday Hours",
    closed: false,
    open: "16:00",
    close: "22:00",
  },
  {
    date: "2026-05-05",
    reason: "Children's Day — Closed for staff celebration",
    closed: true,
  },
  {
    date: "2026-07-04",
    reason: "Independence Day — Limited seating (roof-deck open)",
    closed: false,
    open: "18:00",
    close: "00:00",
  },
  {
    date: "2026-12-31",
    reason: "New Year's Eve — Toshikoshi Soba Special (ticketed)",
    closed: false,
    open: "19:00",
    close: "02:00",
  },
  {
    date: "2027-01-01",
    reason: "New Year's Day — Closed",
    closed: true,
  },
];

/* ── Helpers ── */

/** Returns today's regular hours */
export function todayHours(): DayHours {
  return weeklyHours[new Date().getDay()];
}

/** Returns true if the restaurant is currently open (regular schedule) */
export function isOpenNow(): boolean {
  const now = new Date();
  const h = weeklyHours[now.getDay()];
  if (!h.open || !h.close) return false;

  const mins = now.getHours() * 60 + now.getMinutes();
  const [oH, oM] = h.open.split(":").map(Number);
  const [cH, cM] = h.close.split(":").map(Number);

  let openMin = oH * 60 + oM;
  let closeMin = cH * 60 + cM;

  // Handle past-midnight close (e.g. 01:00)
  if (closeMin < openMin) closeMin += 24 * 60;
  const adjustedMins = mins < openMin ? mins + 24 * 60 : mins;

  return adjustedMins >= openMin && adjustedMins < closeMin;
}
