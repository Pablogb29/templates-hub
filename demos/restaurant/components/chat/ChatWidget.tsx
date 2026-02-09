"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
  type FormEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

/* ================================================================
   Types
   ================================================================ */

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

/* ================================================================
   Constants
   ================================================================ */

const STORAGE_KEY = "tsuki-chat-history";
const MAX_STORED = 100;

const SUGGESTIONS = [
  "What\u2019s on the menu?",
  "Are you open tonight?",
  "Book a table",
];

/** Quick-action chips shown above the input bar */
const QUICK_ACTIONS = [
  { label: "Table for today", message: "I\u2019d like to book a table for today" },
  { label: "Open hours", message: "What are your opening hours?" },
  { label: "Today\u2019s menu", message: "Show me today\u2019s menu" },
  { label: "Offers", message: "Any current offers or promotions?" },
  { label: "Events", message: "What upcoming events do you have?" },
  { label: "Vegetarian / Gluten-free", message: "What vegetarian and gluten-free options do you have?" },
];

/* ================================================================
   Helpers
   ================================================================ */

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(-MAX_STORED) : [];
  } catch {
    return [];
  }
}

function persistHistory(msgs: ChatMessage[]) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(msgs.slice(-MAX_STORED)),
    );
  } catch {
    /* storage full or unavailable */
  }
}

function fmtTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Lightweight inline-Markdown → React renderer.
 * Handles **bold**, *italic*, `code`, [links](url), and # / ## / ### headings.
 * No external dependency needed.
 */
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
      nodes.push(
        <strong key={k++} className="font-semibold text-white">
          {m[1]}
        </strong>,
      );
    } else if (m[2] != null) {
      nodes.push(<em key={k++}>{m[2]}</em>);
    } else if (m[3] != null) {
      nodes.push(
        <code
          key={k++}
          className="bg-white/10 px-1 py-0.5 rounded text-[13px] text-primary/90"
        >
          {m[3]}
        </code>,
      );
    } else if (m[4] != null && m[5] != null) {
      nodes.push(
        <a
          key={k++}
          href={m[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          {m[4]}
        </a>,
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
      const className = "font-bold text-white mt-2 mb-1 first:mt-0";
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

/* ================================================================
   Animation variants
   ================================================================ */

const overlayV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelV = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const btnV = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

/* ================================================================
   ChatWidget
   ================================================================ */

export default function ChatWidget() {
  /* ── State ── */
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /* ── Refs ── */
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const msgsRef = useRef<ChatMessage[]>(messages);

  // Keep ref in sync so async callbacks always read latest
  useEffect(() => {
    msgsRef.current = messages;
  }, [messages]);

  /* ── Hydrate from localStorage (client only) ── */
  useEffect(() => {
    setMessages(loadHistory());
    setHydrated(true);
  }, []);

  /* ── Persist on change ── */
  useEffect(() => {
    if (hydrated) persistHistory(messages);
  }, [messages, hydrated]);

  /* ── Auto-scroll to newest ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ── Focus input when panel opens ── */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* ── ESC to close  +  focus trap ── */
  useEffect(() => {
    if (!open) return;

    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const els = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* ── Core send ── */
  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      const updated = [...msgsRef.current, userMsg];
      setMessages(updated);
      setInput("");
      setLoading(true);

      // Reset textarea height
      if (inputRef.current) inputRef.current.style.height = "auto";

      const payload = updated.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: payload }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong.");

        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: data.content,
            timestamp: Date.now(),
          },
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content:
              err instanceof Error
                ? err.message
                : "Something went wrong. Please try again.",
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  /* ── Textarea helpers ── */
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }

  function clearHistory() {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  /* ============================================================
     Render
     ============================================================ */

  return (
    <>
      {/* ─────────── Floating trigger button ─────────── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chat-fab"
            variants={btnV}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setOpen(true)}
            className="fixed bottom-[4.5rem] right-4 md:bottom-6 md:right-6 z-50
              w-14 h-14 rounded-full bg-primary/90 text-dark
              flex items-center justify-center
              shadow-lg neon-glow cursor-pointer
              transition-transform hover:scale-105 active:scale-95"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
            {/* pulse ring */}
            <span
              className="absolute inset-0 rounded-full bg-primary/25
                animate-ping pointer-events-none opacity-75"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─────────── Chat panel ─────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop – mobile only */}
            <motion.div
              key="chat-backdrop"
              variants={overlayV}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="chat-panel"
              ref={panelRef}
              role="dialog"
              aria-label="Chat with Tsuki Izakaya"
              aria-modal="true"
              variants={panelV}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed z-50
                inset-0 md:inset-auto
                md:bottom-6 md:right-6
                md:w-[380px] md:h-[560px] md:max-h-[calc(100vh-3rem)]
                md:rounded-2xl
                flex flex-col
                glass border border-white/10
                shadow-2xl shadow-black/60
                overflow-hidden"
            >
              {/* ── Header ── */}
              <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/25 to-secondary/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-white leading-tight">
                      Tsuki Concierge
                    </h2>
                    <p className="text-[10px] text-gray-400 leading-tight mt-0.5">
                      Hours · Menu · Reservations
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-[10px] text-gray-500 hover:text-gray-300
                        transition-colors px-2 py-1 rounded"
                      aria-label="Clear chat history"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center
                      text-gray-400 hover:text-white hover:bg-white/10
                      transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </header>

              {/* ── Messages area ── */}
              <div
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar"
                role="log"
                aria-live="polite"
                aria-label="Chat messages"
              >
                {/* Empty state */}
                {messages.length === 0 && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary/60" />
                    </div>
                    <p className="text-sm text-gray-400 max-w-[260px]">
                      Hi! I&apos;m the Tsuki concierge. Ask about our menu,
                      hours, events, or make a reservation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-1">
                      {SUGGESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => send(q)}
                          className="text-xs px-3 py-1.5 rounded-full
                            border border-primary/25 text-primary/80
                            hover:bg-primary/10 hover:border-primary/50
                            transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bubbles */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        msg.role === "user"
                          ? "bg-primary/20 text-white rounded-br-md"
                          : "bg-white/[0.06] text-gray-200 rounded-bl-md border border-white/[0.06]"
                      }`}
                    >
                      {msg.role === "assistant"
                        ? renderMarkdown(msg.content)
                        : msg.content}
                    </div>
                    <span className="text-[10px] text-gray-600 mt-1 px-1 select-none">
                      {fmtTime(msg.timestamp)}
                    </span>
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="flex items-start" aria-label="Assistant is typing">
                    <div className="bg-white/[0.06] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} aria-hidden="true" />
              </div>

              {/* ── Quick-action chips ── */}
              {messages.length > 0 && !loading && (
                <div className="shrink-0 px-3 pt-2 pb-0 border-t border-white/10 overflow-x-auto no-scrollbar">
                  <div className="flex gap-1.5 w-max">
                    {QUICK_ACTIONS.map((qa) => (
                      <button
                        key={qa.label}
                        type="button"
                        onClick={() => send(qa.message)}
                        className="whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full
                          border border-white/10 text-gray-400
                          hover:border-primary/40 hover:text-primary/90 hover:bg-primary/5
                          transition-colors shrink-0"
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Input bar ── */}
              <form
                onSubmit={handleSubmit}
                className="shrink-0 px-3 py-3 border-t border-white/[0.04]"
              >
                <div
                  className="flex items-end gap-2 bg-white/[0.05] rounded-xl
                    border border-white/10 focus-within:border-primary/40
                    transition-colors px-3 py-2"
                >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      autoResize(e.target);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything…"
                    rows={1}
                    disabled={loading}
                    className="flex-1 bg-transparent text-sm text-white
                      placeholder-gray-500 resize-none outline-none
                      max-h-24 leading-relaxed"
                    aria-label="Type your message"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                      text-dark bg-primary
                      disabled:bg-gray-700 disabled:text-gray-500
                      transition-colors hover:bg-primary/80
                      active:scale-95"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
