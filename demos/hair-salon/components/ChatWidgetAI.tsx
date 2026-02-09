"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ── Types ── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const STORAGE_KEY = "luna-salon-chat-history";

/* ── Quick-action chips ── */
const QUICK_ACTIONS = [
  { label: "Book appointment", message: "I'd like to book an appointment" },
  { label: "Opening hours", message: "What are your opening hours?" },
  { label: "Services & prices", message: "What services do you offer and what are the prices?" },
  { label: "Offers", message: "Do you have any current offers or promotions?" },
  { label: "Events", message: "Are there any upcoming events?" },
  { label: "Balayage", message: "Tell me about your balayage service" },
  { label: "Keratin", message: "How much is a keratin treatment?" },
  { label: "Color correction", message: "I need a color correction. What's involved?" },
];

/* ── Lightweight Markdown → React (bold, italic, code, links, # headings) ── */
const TOKEN =
  /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

function renderInline(text: string, keyStart: number): { nodes: React.ReactNode[]; nextKey: number } {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let k = keyStart;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] != null) {
      nodes.push(<strong key={k++} className="font-semibold text-text">{m[1]}</strong>);
    } else if (m[2] != null) {
      nodes.push(<em key={k++}>{m[2]}</em>);
    } else if (m[3] != null) {
      nodes.push(
        <code key={k++} className="bg-primary/10 px-1 py-0.5 rounded text-[13px] text-text">{m[3]}</code>,
      );
    } else if (m[4] != null && m[5] != null) {
      nodes.push(
        <a key={k++} href={m[5]} target="_blank" rel="noopener noreferrer" className="text-primary-dark underline underline-offset-2 hover:text-primary">{m[4]}</a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return { nodes, nextKey: k };
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split(/\r?\n/);
  const result: React.ReactNode[] = [];
  let k = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const { nodes, nextKey } = renderInline(content, k);
      k = nextKey;
      const className = "font-bold text-text mt-2 mb-1 first:mt-0";
      if (level === 1) {
        result.push(<h1 key={k++} className={`text-base ${className}`}>{nodes}</h1>);
      } else if (level === 2) {
        result.push(<h2 key={k++} className={`text-sm ${className}`}>{nodes}</h2>);
      } else {
        result.push(<h3 key={k++} className={`text-sm ${className}`}>{nodes}</h3>);
      }
    } else {
      const { nodes, nextKey } = renderInline(line, k);
      k = nextKey;
      result.push(...nodes);
      if (i < lines.length - 1) result.push(<br key={k++} />);
    }
  }
  return result;
}

function fmtTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidgetAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* ── Load from localStorage ── */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch { /* empty */ }
  }, []);

  /* ── Persist to localStorage ── */
  useEffect(() => {
    if (messages.length > 0) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-100))); } catch { /* empty */ }
    }
  }, [messages]);

  /* ── Auto-scroll ── */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  /* ── Focus input when opened ── */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  /* ── ESC to close ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ── Send message ── */
  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed, timestamp: Date.now() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      const botMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.content ?? "Sorry, I didn't get a response.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: err instanceof Error ? err.message : "Connection error. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* ── Backdrop (mobile) ── */}
      {open && (
        <div
          className="fixed inset-0 z-[998] bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Chat Panel ── */}
      {open && (
        <div
          className={`fixed z-[999] flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-all duration-300
            bottom-24 right-4 w-[calc(100vw-2rem)] max-w-sm
            sm:bottom-24 sm:right-6 sm:w-[380px]
            max-h-[min(70vh,540px)]
          `}
          role="dialog"
          aria-label="Chat with Luna, your salon assistant"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-bg-dark px-5 py-4 text-white shrink-0">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-bg-dark">
              <span className="material-symbols-outlined !text-xl">content_cut</span>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight">Luna Hair Studio</p>
              <p className="text-[11px] text-gray-400">AI Assistant</p>
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
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
            {/* Welcome message if empty */}
            {messages.length === 0 && !loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-beige text-text px-3.5 py-2.5 text-sm leading-relaxed">
                  Hi! 👋 I&apos;m Luna, your virtual hair assistant. I can help you with appointments, services, pricing, and more. How can I help?
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    msg.role === "user"
                      ? "bg-primary text-bg-dark rounded-br-md"
                      : "bg-beige text-text rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
                </div>
                <span className="text-[10px] text-text-muted mt-1 px-1 select-none">{fmtTime(msg.timestamp)}</span>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-beige px-4 py-3">
                  <span className="size-2 animate-bounce rounded-full bg-text-muted/50 [animation-delay:0ms]" />
                  <span className="size-2 animate-bounce rounded-full bg-text-muted/50 [animation-delay:150ms]" />
                  <span className="size-2 animate-bounce rounded-full bg-text-muted/50 [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Quick-action chips */}
          {!loading && (
            <div className="shrink-0 px-3 pt-2 pb-0 border-t border-border overflow-x-auto hide-scrollbar">
              <div className="flex gap-1.5 w-max pb-2">
                {QUICK_ACTIONS.map((qa) => (
                  <button
                    key={qa.label}
                    type="button"
                    onClick={() => send(qa.message)}
                    className="whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full
                      border border-border text-text-muted
                      hover:border-primary hover:text-text hover:bg-primary/10
                      transition-colors shrink-0"
                  >
                    {qa.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input bar */}
          <form onSubmit={handleSubmit} className="shrink-0 px-3 py-3 border-t border-border">
            <div className="flex items-end gap-2 rounded-xl bg-bg border border-border px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message…"
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm text-text placeholder:text-text-muted outline-none max-h-24"
                disabled={loading}
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex size-8 items-center justify-center rounded-lg bg-primary text-bg-dark transition-all hover:bg-primary-dark disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <span className="material-symbols-outlined !text-lg">send</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with Luna"}
        className={`fixed bottom-5 right-5 z-[999] flex size-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 sm:bottom-6 sm:right-6 sm:size-[60px]
          ${open
            ? "rotate-0 bg-bg-dark text-white"
            : "bg-primary text-bg-dark hover:scale-110 hover:shadow-2xl hover:shadow-primary/30"
          }`}
      >
        <span className={`material-symbols-outlined !text-[28px] transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}>
          {open ? "close" : "chat"}
        </span>
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 pointer-events-none" />
        )}
      </button>
    </>
  );
}
