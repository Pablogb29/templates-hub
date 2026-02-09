"use client";

import { Phone, Navigation, CalendarCheck } from "lucide-react";

export default function StickyCTA() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden glass border-t border-white/10 safe-bottom"
      role="toolbar"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href="tel:+15551234567"
          className="flex flex-col items-center gap-1 py-3 text-gray-300 hover:text-primary active:text-primary transition-colors"
          aria-label="Call restaurant"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Call
          </span>
        </a>
        <a
          href="#location"
          className="flex flex-col items-center gap-1 py-3 text-gray-300 hover:text-primary active:text-primary transition-colors"
          aria-label="Get directions"
        >
          <Navigation className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Directions
          </span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center gap-1 py-3 text-primary transition-colors"
          aria-label="Reserve a table"
        >
          <CalendarCheck className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Reserve
          </span>
        </a>
      </div>
    </div>
  );
}
