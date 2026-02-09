"use client";

/**
 * Inline CTA that opens the Botpress webchat.
 * Falls back to scrolling to #contact when Botpress isn't loaded.
 */
export default function ChatCTA() {
  function handleClick() {
    if (window.botpress) {
      window.botpress.open();
    } else {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-[13px] font-semibold text-accent transition-all hover:bg-primary/15 hover:text-secondary"
    >
      <span className="material-symbols-outlined text-primary text-[16px]">
        smart_toy
      </span>
      Chat with our AI receptionist
    </button>
  );
}
