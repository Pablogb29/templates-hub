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
  { day: 0, label: "Sunday",    open: null,    close: null,    note: "Closed" },
  { day: 1, label: "Monday",    open: "09:00", close: "20:00" },
  { day: 2, label: "Tuesday",   open: "09:00", close: "20:00" },
  { day: 3, label: "Wednesday", open: "09:00", close: "20:00" },
  { day: 4, label: "Thursday",  open: "09:00", close: "20:00" },
  { day: 5, label: "Friday",    open: "09:00", close: "20:00" },
  { day: 6, label: "Saturday",  open: "10:00", close: "18:00" },
];

export const specialClosures: SpecialClosure[] = [
  { date: "2026-01-01", reason: "New Year's Day — Closed", closed: true },
  { date: "2026-05-25", reason: "Memorial Day — Closed", closed: true },
  { date: "2026-07-04", reason: "Independence Day — Closed", closed: true },
  { date: "2026-09-07", reason: "Labor Day — Closed", closed: true },
  { date: "2026-11-26", reason: "Thanksgiving — Closed", closed: true },
  { date: "2026-12-25", reason: "Christmas Day — Closed", closed: true },
  { date: "2026-12-24", reason: "Christmas Eve — Early close", closed: false, open: "09:00", close: "14:00" },
  { date: "2026-12-31", reason: "New Year's Eve — Early close", closed: false, open: "09:00", close: "15:00" },
];
