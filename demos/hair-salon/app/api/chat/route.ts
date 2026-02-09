import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/chat/completions";

import { weeklyHours, specialClosures } from "@/data/hours";
import { services, formatPrice } from "@/data/services";
import type { ServiceItem } from "@/data/services";
import { activeOffers } from "@/data/offers";
import { upcomingEvents } from "@/data/events";

/* ================================================================
   Config
   ================================================================ */

const MODEL = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";
const MAX_TOOL_ROUNDS = 6;

const openai = new OpenAI();

/* ================================================================
   System prompt
   ================================================================ */

const SYSTEM_PROMPT = `You are Luna, the friendly AI assistant for **Luna Hair Studio**, a premium hair salon in SoHo, New York City.

Rules you MUST follow:
1. Be warm, friendly, and concise. Use short paragraphs. Never produce walls of text.
2. When a client asks about hours, services, pricing, offers, or events — **ALWAYS call the appropriate tool**. Never guess or invent this information.
3. If the client's request is ambiguous (e.g. "book an appointment" without specifying a date, time, or service), **ask a clarifying question first**.
4. For appointment inquiries, collect **date, time, and type of service** before calling check_appointment_availability.
5. Prices are returned in USD cents. Convert to dollars for display (e.g. 8000 → $80). For price ranges, show "$X – $Y".
6. If asked about hair advice, give general tips but always recommend a consultation for personalised advice.
7. Stay on-topic. If asked about things unrelated to the salon, politely redirect.
8. Keep the tone warm, stylish, and inviting — match the Luna Hair Studio vibe.
9. Use emojis sparingly (1-2 per message max) to keep things approachable.

Studio details:
- Address: 78 Spring Street, SoHo, New York, NY 10012
- Phone: (555) 123-4567
- Email: hello@lunahairstudio.com
- WhatsApp: +1 (555) 123-4567`;

/* ================================================================
   Tool definitions
   ================================================================ */

const tools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_open_hours",
      description:
        "Get salon opening hours for a specific date. Returns regular schedule and any special closure / modified hours.",
      parameters: {
        type: "object",
        properties: {
          date: {
            type: "string",
            description: 'ISO date "YYYY-MM-DD". Defaults to today if omitted.',
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_services",
      description:
        "Return the full list of salon services organised by category (cuts, color, treatments, extensions). Each item includes price range and duration.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "find_services",
      description:
        "Search or filter salon services by category and/or a free-text query (name or description).",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description: "Filter by category key: cuts, color, treatments, extensions.",
          },
          query: {
            type: "string",
            description: "Free-text search matched against service name and description (case-insensitive).",
          },
          popular: {
            type: "boolean",
            description: "If true, return only popular / recommended services.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_offers",
      description: "Return currently active promotions and offers.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "get_events",
      description: "Return upcoming salon events within an optional date range.",
      parameters: {
        type: "object",
        properties: {
          from: { type: "string", description: 'Start date "YYYY-MM-DD". Defaults to today.' },
          to: { type: "string", description: 'End date "YYYY-MM-DD". Defaults to 90 days from now.' },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_appointment_availability",
      description:
        "Check appointment availability for a given date, time, and service type. Returns available, limited, or unavailable. (Stub — real integration pending.)",
      parameters: {
        type: "object",
        properties: {
          date: { type: "string", description: 'ISO date "YYYY-MM-DD".' },
          time: { type: "string", description: '"HH:mm" (24-hour).' },
          service: { type: "string", description: "Type of service requested." },
        },
        required: ["date", "time"],
      },
    },
  },
];

/* ================================================================
   Tool implementations
   ================================================================ */

function toolGetOpenHours(args: { date?: string }): string {
  const dateStr = args.date ?? new Date().toISOString().slice(0, 10);
  const d = new Date(dateStr + "T12:00:00");
  const dayOfWeek = d.getDay();
  const regular = weeklyHours[dayOfWeek];

  const special = specialClosures.find((c) => c.date === dateStr);

  const result: Record<string, unknown> = {
    date: dateStr,
    dayOfWeek: regular.label,
    regularHours: regular.open
      ? { open: regular.open, close: regular.close, note: regular.note }
      : { closed: true, note: regular.note ?? "Closed" },
  };

  if (special) {
    result.specialNotice = {
      reason: special.reason,
      closed: special.closed,
      ...(special.closed
        ? {}
        : { modifiedOpen: special.open, modifiedClose: special.close }),
    };
  }

  return JSON.stringify(result);
}

function toolGetServices(): string {
  const compact = services.map((cat) => ({
    category: cat.label,
    key: cat.key,
    icon: cat.icon,
    description: cat.description,
    items: cat.items.map((i) => ({
      id: i.id,
      name: i.name,
      description: i.description,
      price: i.priceTo
        ? `${formatPrice(i.priceFrom)} – ${formatPrice(i.priceTo)}`
        : `from ${formatPrice(i.priceFrom)}`,
      duration: i.duration,
      popular: i.popular ?? false,
    })),
  }));
  return JSON.stringify(compact);
}

function toolFindServices(args: {
  category?: string;
  query?: string;
  popular?: boolean;
}): string {
  let results: ServiceItem[] = services.flatMap((c) => c.items);

  if (args.category) {
    results = results.filter((i) => i.category === args.category);
  }

  if (args.popular) {
    results = results.filter((i) => i.popular);
  }

  if (args.query) {
    const q = args.query.toLowerCase();
    results = results.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q),
    );
  }

  const output = results.map((i) => ({
    id: i.id,
    name: i.name,
    description: i.description,
    price: i.priceTo
      ? `${formatPrice(i.priceFrom)} – ${formatPrice(i.priceTo)}`
      : `from ${formatPrice(i.priceFrom)}`,
    duration: i.duration,
    popular: i.popular ?? false,
  }));

  return JSON.stringify({
    count: output.length,
    items: output,
    note: output.length === 0 ? "No services matched these filters." : undefined,
  });
}

function toolGetOffers(): string {
  const active = activeOffers();
  return JSON.stringify(
    active.map((o) => ({
      title: o.title,
      description: o.description,
      validFrom: o.validFrom,
      validTo: o.validTo,
      code: o.code ?? null,
    })),
  );
}

function toolGetEvents(args: { from?: string; to?: string }): string {
  const now = new Date();
  const from = args.from ?? now.toISOString().slice(0, 10);

  const defaultTo = new Date(now);
  defaultTo.setDate(defaultTo.getDate() + 90);
  const to = args.to ?? defaultTo.toISOString().slice(0, 10);

  const filtered = upcomingEvents(from).filter((e) => e.date <= to);

  return JSON.stringify(
    filtered.map((e) => ({
      title: e.title,
      date: e.date,
      time: e.time ?? null,
      description: e.description,
      bookingRequired: e.bookingRequired,
      free: e.free ?? false,
    })),
  );
}

function toolCheckAppointment(args: {
  date: string;
  time: string;
  service?: string;
}): string {
  // Stub implementation
  const seed =
    args.date.replace(/-/g, "").slice(-4) +
    args.time.replace(":", "") +
    (args.service ?? "").length;
  const hash = Array.from(String(seed)).reduce((a, c) => a + c.charCodeAt(0), 0);

  let status: "available" | "limited" | "unavailable";
  const mod = hash % 10;
  if (mod < 5) status = "available";
  else if (mod < 8) status = "limited";
  else status = "unavailable";

  return JSON.stringify({
    date: args.date,
    time: args.time,
    service: args.service ?? "general",
    status,
    message:
      status === "available"
        ? "That slot is available! Would you like to book it?"
        : status === "limited"
          ? "We have limited availability around that time. We recommend booking soon."
          : "That slot is fully booked. Would you like to try a different time?",
  });
}

function executeTool(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case "get_open_hours":
      return toolGetOpenHours(args as { date?: string });
    case "get_services":
      return toolGetServices();
    case "find_services":
      return toolFindServices(args as Parameters<typeof toolFindServices>[0]);
    case "get_offers":
      return toolGetOffers();
    case "get_events":
      return toolGetEvents(args as { from?: string; to?: string });
    case "check_appointment_availability":
      return toolCheckAppointment(
        args as { date: string; time: string; service?: string },
      );
    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}

/* ================================================================
   Rate limiter
   ================================================================ */

const RATE_LIMIT = 20;
const RATE_WINDOW = 60_000;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function checkRate(ip: string): boolean {
  const now = Date.now();
  if (rateBuckets.size > 10_000) {
    for (const [k, v] of rateBuckets) {
      if (now > v.resetAt) rateBuckets.delete(k);
    }
  }
  const bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (bucket.count >= RATE_LIMIT) return false;
  bucket.count++;
  return true;
}

/* ================================================================
   Input validation
   ================================================================ */

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MAX_MESSAGES = 50;
const MAX_CONTENT_LEN = 2000;

function validateBody(body: unknown): { ok: true; messages: ChatMessage[] } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null || !("messages" in body)) {
    return { ok: false, error: "Body must contain a `messages` array." };
  }
  const { messages } = body as { messages: unknown };
  if (!Array.isArray(messages)) return { ok: false, error: "`messages` must be an array." };
  if (messages.length === 0) return { ok: false, error: "`messages` must not be empty." };
  if (messages.length > MAX_MESSAGES) return { ok: false, error: `Too many messages (max ${MAX_MESSAGES}).` };

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (typeof m !== "object" || m === null) return { ok: false, error: `messages[${i}] is not an object.` };
    const { role, content } = m as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return { ok: false, error: `messages[${i}].role must be "user" or "assistant".` };
    if (typeof content !== "string" || content.trim().length === 0) return { ok: false, error: `messages[${i}].content must be a non-empty string.` };
    if (content.length > MAX_CONTENT_LEN) return { ok: false, error: `messages[${i}].content exceeds ${MAX_CONTENT_LEN} chars.` };
  }
  return { ok: true, messages: messages as ChatMessage[] };
}

/* ================================================================
   Route handler
   ================================================================ */

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Server misconfiguration: missing OPENAI_API_KEY." }, { status: 500 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown";
  if (!checkRate(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Please wait a moment and try again." }, { status: 429 });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validateBody(body);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });

  const userMessages = validation.messages;

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...userMessages.map((m) => ({ role: m.role, content: m.content }) as ChatCompletionMessageParam),
  ];

  try {
    let round = 0;
    while (round < MAX_TOOL_ROUNDS) {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages,
        tools,
        tool_choice: "auto",
        temperature: 0.4,
        max_tokens: 1024,
      });

      const choice = completion.choices[0];
      if (!choice) return NextResponse.json({ error: "No response from the model." }, { status: 502 });

      const assistantMsg = choice.message;

      if (!assistantMsg.tool_calls || assistantMsg.tool_calls.length === 0) {
        return NextResponse.json({ role: "assistant", content: assistantMsg.content ?? "" });
      }

      messages.push(assistantMsg);

      for (const tc of assistantMsg.tool_calls) {
        if (tc.type !== "function") continue;
        let args: Record<string, unknown> = {};
        try { args = JSON.parse(tc.function.arguments); } catch { /* empty */ }
        const result = executeTool(tc.function.name, args);
        messages.push({ role: "tool", tool_call_id: tc.id, content: result });
      }

      round++;
    }

    messages.push({ role: "user", content: "(System note: tool-call budget reached — please summarise with the information you have.)" });
    const final = await openai.chat.completions.create({ model: MODEL, messages, temperature: 0.4, max_tokens: 1024 });
    return NextResponse.json({ role: "assistant", content: final.choices[0]?.message?.content ?? "Sorry, I couldn't complete that request." });
  } catch (err: unknown) {
    console.error("[chat] OpenAI error:", err);
    const status = err instanceof OpenAI.APIError ? err.status ?? 502 : 502;
    const message = status === 429 ? "Our AI service is busy. Please try again in a moment." : "Something went wrong while generating a response.";
    return NextResponse.json({ error: message }, { status });
  }
}
