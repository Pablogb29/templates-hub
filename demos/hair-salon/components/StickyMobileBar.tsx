"use client";

export default function StickyMobileBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between rounded-2xl border border-white/10 bg-bg-dark p-2 text-white shadow-2xl md:hidden"
    >
      <a
        href="tel:+15551234567"
        className="flex flex-1 flex-col items-center justify-center py-2 text-[11px] font-medium text-gray-300 active:text-white"
      >
        <span className="material-symbols-outlined mb-0.5 !text-xl" aria-hidden="true">call</span>
        Call
      </a>

      <span className="h-8 w-px bg-white/10" aria-hidden="true" />

      <a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center justify-center py-2 text-[11px] font-medium text-gray-300 active:text-white"
      >
        <span className="material-symbols-outlined mb-0.5 !text-xl text-whatsapp" aria-hidden="true">
          chat
        </span>
        WhatsApp
      </a>

      <span className="h-8 w-px bg-white/10" aria-hidden="true" />

      <a
        href="#contact"
        className="mx-2 flex flex-[1.5] items-center justify-center rounded-xl bg-primary py-2.5 text-sm font-bold text-bg-dark shadow-lg shadow-primary/20"
      >
        Book Now
      </a>
    </nav>
  );
}
