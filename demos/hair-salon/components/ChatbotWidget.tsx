"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  html?: boolean;
};

type QuickBtn = {
  label: string;
  icon: string;
  userText: string;
  botReply: string;
  html?: boolean;
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const quickButtons: QuickBtn[] = [
  {
    label: "Services & prices",
    icon: "content_cut",
    userText: "What services do you offer?",
    botReply: `Here's what we offer:\n\n✂️  <b>Modern Cut & Style</b> — from $80\n🎨  <b>Balayage & Color</b> — from $150\n💆  <b>Treatments</b> — from $65\n\nWould you like to book any of these?`,
    html: true,
  },
  {
    label: "Opening hours",
    icon: "schedule",
    userText: "What are your opening hours?",
    botReply: `Our studio hours:\n\n🗓  <b>Mon – Fri</b>: 9 am – 8 pm\n🗓  <b>Saturday</b>: 10 am – 6 pm\n🗓  <b>Sunday</b>: Closed\n\nWe recommend booking 2 weeks ahead for weekends!`,
    html: true,
  },
  {
    label: "Book appointment",
    icon: "calendar_month",
    userText: "I'd like to book an appointment",
    botReply: `Great! You can book right away:\n\n📞  Call us: <b>(555) 123-4567</b>\n💬  <a href="https://wa.me/15551234567" target="_blank" rel="noopener" class="text-primary underline underline-offset-2 font-semibold">Chat on WhatsApp</a>\n📝  Or fill out the <a href="#contact" class="text-primary underline underline-offset-2 font-semibold">contact form</a> below\n\nWe'll confirm within 24 hours!`,
    html: true,
  },
];

const WELCOME: Msg = {
  id: 0,
  from: "bot",
  text: "Hi! 👋 I'm Luna, your virtual assistant. How can I help you today?",
};

let nextId = 1;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  /* close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pushBot = useCallback((text: string, html?: boolean) => {
    setTyping(true);
    setTimeout(() => {
      setMsgs((prev) => [
        ...prev,
        { id: nextId++, from: "bot", text, html },
      ]);
      setTyping(false);
    }, 700);
  }, []);

  const handleQuick = useCallback(
    (btn: QuickBtn) => {
      /* user bubble */
      setMsgs((prev) => [
        ...prev,
        { id: nextId++, from: "user", text: btn.userText },
      ]);
      /* bot reply after typing indicator */
      pushBot(btn.botReply, btn.html);
    },
    [pushBot]
  );

  /* ---- Rendered quick-reply chips (show after last bot message) ---- */
  const lastMsg = msgs[msgs.length - 1];
  const showQuick = lastMsg?.from === "bot" && !typing;

  return (
    <>
      {/* ---- Backdrop (mobile) ---- */}
      {open && (
        <div
          className="fixed inset-0 z-[998] bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ---- Chat Panel ---- */}
      <div
        className={`fixed z-[999] flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-all duration-300 ease-out
          ${
            open
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-90 opacity-0"
          }
          bottom-24 right-5 w-[calc(100vw-2.5rem)] max-w-sm
          sm:bottom-24 sm:right-6 sm:w-96
        `}
        role="dialog"
        aria-label="Chat with Luna"
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-bg-dark px-5 py-4 text-white">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-bg-dark">
            <span className="material-symbols-outlined !text-xl">
              content_cut
            </span>
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold leading-tight">Luna Hair Studio</p>
            <p className="text-[11px] text-gray-400">
              Usually replies instantly
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
          >
            <span className="material-symbols-outlined !text-xl">close</span>
          </button>
        </div>

        {/* Messages */}
        <div className="hide-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4" style={{ maxHeight: "22rem" }}>
          {msgs.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line
                  ${
                    m.from === "bot"
                      ? "rounded-bl-md bg-beige text-text"
                      : "rounded-br-md bg-primary text-bg-dark"
                  }
                `}
                {...(m.html
                  ? { dangerouslySetInnerHTML: { __html: m.text } }
                  : { children: m.text })}
              />
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-beige px-4 py-3">
                <span className="size-2 animate-bounce rounded-full bg-text-muted/50 [animation-delay:0ms]" />
                <span className="size-2 animate-bounce rounded-full bg-text-muted/50 [animation-delay:150ms]" />
                <span className="size-2 animate-bounce rounded-full bg-text-muted/50 [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick-reply buttons */}
        {showQuick && (
          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {quickButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleQuick(btn)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-3.5 py-2 text-xs font-semibold text-text transition-all hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95"
              >
                <span className="material-symbols-outlined !text-[16px]">
                  {btn.icon}
                </span>
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ---- Floating Button ---- */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`fixed bottom-5 right-5 z-[999] flex size-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 sm:bottom-6 sm:right-6 sm:size-[60px]
          ${
            open
              ? "rotate-0 bg-bg-dark text-white"
              : "bg-primary text-bg-dark hover:scale-110 hover:shadow-2xl hover:shadow-primary/30"
          }
        `}
      >
        <span
          className={`material-symbols-outlined !text-[28px] transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}
        >
          {open ? "close" : "chat"}
        </span>

        {/* Ping animation when closed */}
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
        )}
      </button>
    </>
  );
}
