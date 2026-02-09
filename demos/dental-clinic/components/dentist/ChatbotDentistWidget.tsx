"use client";

import { useRef } from "react";
import Script from "next/script";

/**
 * Botpress Webchat — custom floating trigger.
 *
 * Reads from environment:
 *   NEXT_PUBLIC_BOTPRESS_BOT_ID   — required (get from Botpress Cloud)
 *   NEXT_PUBLIC_BOTPRESS_CLIENT_ID — optional (only needed for certain configs)
 *
 * When BOT_ID is not set the component renders nothing, so the site
 * works fine without Botpress credentials during development.
 */

const BOT_ID = process.env.NEXT_PUBLIC_BOTPRESS_BOT_ID ?? "";

export default function ChatbotDentistWidget() {
  const configInjected = useRef(false);

  /* ── No credentials → render nothing ── */
  if (!BOT_ID) return null;

  /* ── After inject.js loads, append the bot-specific config ── */
  function handleInjectLoad() {
    if (configInjected.current) return;
    configInjected.current = true;

    const cfg = document.createElement("script");
    cfg.src = `https://files.bpcontent.cloud/${BOT_ID}/webchat/v2.2/config.js`;
    cfg.defer = true;
    document.body.appendChild(cfg);
  }

  return (
    <>
      {/* Botpress inject (lazy, non-blocking) */}
      <Script
        src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"
        strategy="afterInteractive"
        onLoad={handleInjectLoad}
      />

      {/* ── Custom floating action button ── */}
      <button
        onClick={() => window.botpress?.toggle()}
        aria-label="Chat with AI receptionist"
        className="chatbot-fab fixed z-50 bottom-20 right-5 lg:bottom-6 lg:right-6 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-2xl text-secondary">
          smart_toy
        </span>
      </button>
    </>
  );
}
