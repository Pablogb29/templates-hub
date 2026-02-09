export interface DayHours {
  day: number;
  label: string;
  open: string | null;
  close: string | null;
  note?: string;
}

export interface SpecialClosure {
  date: string;
  reason: string;
  closed: boolean;
  open?: string;
  close?: string;
}

export const weeklyHours: DayHours[] = [
  { day: 0, label: "Sunday",    open: null,    close: null,    note: "Emergency line available" },
  { day: 1, label: "Monday",    open: "08:00", close: "20:00" },
  { day: 2, label: "Tuesday",   open: "08:00", close: "20:00" },
  { day: 3, label: "Wednesday", open: "08:00", close: "20:00" },
  { day: 4, label: "Thursday",  open: "08:00", close: "20:00" },
  { day: 5, label: "Friday",    open: "08:00", close: "20:00" },
  { day: 6, label: "Saturday",  open: "09:00", close: "16:00", note: "Half day" },
];

export const emergencyLine = {
  phone: "+352 123 456 789",
  available: "24/7 for registered patients",
} as const;

export const specialClosures: SpecialClosure[] = [
  { date: "2026-04-06", reason: "Easter Monday — Closed", closed: true },
  { date: "2026-05-01", reason: "Labour Day — Closed", closed: true },
  { date: "2026-06-23", reason: "Luxembourg National Day — Closed", closed: true },
  { date: "2026-08-15", reason: "Assumption Day — Closed", closed: true },
  { date: "2026-12-25", reason: "Christmas Day — Closed", closed: true },
  { date: "2026-12-26", reason: "St. Stephen's Day — Closed", closed: true },
  { date: "2026-12-31", reason: "New Year's Eve — Morning only", closed: false, open: "08:00", close: "13:00" },
];
