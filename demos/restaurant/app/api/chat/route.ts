import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/chat/completions";

import { weeklyHours, happyHour, specialClosures } from "@/data/hours";
import { menu, formatPrice } from "@/data/menu";
import type { DietaryTags, MenuItem } from "@/data/menu";
import { activeOffers } from "@/data/offers";
import { events, formatTicketPrice } from "@/data/events";

/* ================================================================
   Config
   ================================================================ */

const MODEL = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";
const MAX_TOOL_ROUNDS = 6;

/* ================================================================
   OpenAI client (reads OPENAI_API_KEY from env)
   ================================================================ */

const openai = new OpenAI();

/* ================================================================
   System prompt
   ================================================================ */

const SYSTEM_PROMPT = `You are the concise, friendly AI concierge for **Tsuki Izakaya**, a premium Japanese izakaya and sushi bar.

Rules you MUST follow:
1. Be helpful and concise. Use short paragraphs. Never produce walls of text.
2. When a guest asks about hours, menu items, offers, or events — **ALWAYS call the appropriate tool**. Never guess or invent this information.
3. If the guest's request is ambiguous (e.g. "book a table" without a date, time, or party size), **ask a clarifying question first** before calling any tool.
4. ALLERGY GUIDANCE: When asked about allergens or dietary needs, provide information from the menu data, then **always** add:
   - "⚠️ Our dishes are prepared in a shared kitchen. Cross-contamination is possible. Please confirm directly with your server before ordering."
   - Never provide medical or health advice. If pressed, recommend the guest consult a healthcare professional and speak with the restaurant staff.
5. For reservation inquiries, collect **date, time, and party size** before calling check_table_availability.
6. Prices in tool results are in US cents. Convert to dollars for display (e.g. 1200 → $12.00).
7. Stay on-topic. If asked about things unrelated to the restaurant, politely redirect.
8. Keep the tone warm, inviting, and aligned with a premium late-night Japanese dining experience.`;

/* ================================================================
   Tool definitions (function calling)
   ================================================================ */

const tools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_open_hours",
      description:
        "Get restaurant opening hours for a specific date. Returns regular schedule, happy-hour window, and any special closure / modified hours.",
      parameters: {
        type: "object",
        properties: {
          date: {
            type: "string",
            description:
              'ISO date "YYYY-MM-DD". Defaults to today if omitted.',
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_today_menu",
      description:
        "Return the full menu organised by category. Each item includes price, dietary tags, allergens, and optional badges.",
      parameters: {
        type: "object",
        properties: {
          date: {
            type: "string",
            description:
              "Optional ISO date (for seasonal filtering in the future). Defaults to today.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "find_dishes",
      description:
        "Search or filter menu items by dietary requirements and/or a free-text query (name or ingredient).",
      parameters: {
        type: "object",
        properties: {
          vegetarian: { type: "boolean", description: "Filter for vegetarian dishes." },
          vegan: { type: "boolean", description: "Filter for vegan dishes." },
          glutenFree: { type: "boolean", description: "Filter for gluten-free dishes." },
          lactoseFree: { type: "boolean", description: "Filter for lactose-free dishes." },
          query: {
            type: "string",
            description:
              "Free-text search matched against item name and description (case-insensitive).",
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
      description:
        "Return currently active promotions and offers.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_events",
      description:
        "Return upcoming events within an optional date range.",
      parameters: {
        type: "object",
        properties: {
          from: {
            type: "string",
            description: 'Start date "YYYY-MM-DD". Defaults to today.',
          },
          to: {
            type: "string",
            description: 'End date "YYYY-MM-DD". Defaults to 90 days from now.',
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_table_availability",
      description:
        "Check table availability for a given date, time, and party size. Returns available, limited, or unavailable. (Stub — real integration pending.)",
      parameters: {
        type: "object",
        properties: {
          date: { type: "string", description: 'ISO date "YYYY-MM-DD".' },
          time: { type: "string", description: '"HH:mm" (24-hour).' },
          partySize: { type: "number", description: "Number of guests (1–12)." },
        },
        required: ["date", "time", "partySize"],
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

  // Check for special closure
  const special = specialClosures.find((c) => c.date === dateStr);

  // Is it a happy-hour day?
  const hasHappy = (happyHour.days as readonly number[]).includes(dayOfWeek);

  const result: Record<string, unknown> = {
    date: dateStr,
    dayOfWeek: regular.label,
    regularHours: regular.open
      ? { open: regular.open, close: regular.close, note: regular.note }
      : "Closed",
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

  if (hasHappy) {
    result.happyHour = {
      start: happyHour.start,
      end: happyHour.end,
      description: happyHour.description,
    };
  }

  return JSON.stringify(result);
}

function toolGetTodayMenu(): string {
  const compact = menu.map((cat) => ({
    category: cat.label,
    icon: cat.icon,
    description: cat.description,
    items: cat.items
      .filter((i) => !i.soldOut)
      .map((i) => ({
        id: i.id,
        name: i.name,
        description: i.description,
        price: formatPrice(i.price),
        tags: tagSummary(i.tags),
        allergens: i.allergens.length > 0 ? i.allergens.join(", ") : "none listed",
        badge: i.badge ?? null,
      })),
  }));
  return JSON.stringify(compact);
}

function toolFindDishes(args: {
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  lactoseFree?: boolean;
  query?: string;
}): string {
  let results: MenuItem[] = menu.flatMap((c) => c.items.filter((i) => !i.soldOut));

  if (args.vegetarian) results = results.filter((i) => i.tags.vegetarian);
  if (args.vegan) results = results.filter((i) => i.tags.vegan);
  if (args.glutenFree) results = results.filter((i) => i.tags.glutenFree);
  if (args.lactoseFree) results = results.filter((i) => i.tags.lactoseFree);

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
    price: formatPrice(i.price),
    tags: tagSummary(i.tags),
    allergens: i.allergens.length > 0 ? i.allergens.join(", ") : "none listed",
    badge: i.badge ?? null,
  }));

  return JSON.stringify({
    count: output.length,
    items: output,
    note:
      output.length === 0
        ? "No dishes matched these filters."
        : undefined,
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
      dineInOnly: o.dineInOnly ?? false,
    })),
  );
}

function toolGetEvents(args: { from?: string; to?: string }): string {
  const now = new Date();
  const from = args.from ?? now.toISOString().slice(0, 10);

  const defaultTo = new Date(now);
  defaultTo.setDate(defaultTo.getDate() + 90);
  const to = args.to ?? defaultTo.toISOString().slice(0, 10);

  const filtered = events
    .filter((e) => e.date >= from && e.date <= to)
    .sort((a, b) => a.date.localeCompare(b.date));

  return JSON.stringify(
    filtered.map((e) => ({
      title: e.title,
      date: e.date,
      time: e.time ?? null,
      description: e.description,
      bookingRequired: e.bookingRequired,
      ticketPrice: e.ticketPrice ? formatTicketPrice(e.ticketPrice) : "Free / included",
      capacity: e.capacity ?? "Regular seating",
    })),
  );
}

function toolCheckAvailability(args: {
  date: string;
  time: string;
  partySize: number;
}): string {
  // ── Stub implementation ──
  // Deterministic-ish so the same input gives the same answer in a session.
  const seed =
    args.date.replace(/-/g, "").slice(-4) +
    args.time.replace(":", "") +
    String(args.partySize);
  const hash = Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0);

  let status: "available" | "limited" | "unavailable";
  const mod = hash % 10;
  if (mod < 5) status = "available";
  else if (mod < 8) status = "limited";
  else status = "unavailable";

  // Omakase counter: limited for >2 or unavailable for >4
  if (args.partySize > 4) {
    status = status === "available" ? "limited" : "unavailable";
  }

  return JSON.stringify({
    date: args.date,
    time: args.time,
    partySize: args.partySize,
    status,
    message:
      status === "available"
        ? "Great news — we have a table for you!"
        : status === "limited"
          ? "We have limited availability. We recommend booking soon."
          : "Unfortunately that slot is fully booked. Try a different time or date.",
  });
}

/** Concise dietary tag summary */
function tagSummary(t: DietaryTags): string {
  const flags: string[] = [];
  if (t.vegan) flags.push("Vegan");
  else if (t.vegetarian) flags.push("Vegetarian");
  if (t.glutenFree) flags.push("GF");
  if (t.lactoseFree) flags.push("LF");
  return flags.length > 0 ? flags.join(", ") : "—";
}

/** Dispatch a tool call to the right implementation */
function executeTool(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case "get_open_hours":
      return toolGetOpenHours(args as { date?: string });
    case "get_today_menu":
      return toolGetTodayMenu();
    case "find_dishes":
      return toolFindDishes(args as Parameters<typeof toolFindDishes>[0]);
    case "get_offers":
      return toolGetOffers();
    case "get_events":
      return toolGetEvents(args as { from?: string; to?: string });
    case "check_table_availability":
      return toolCheckAvailability(
        args as { date: string; time: string; partySize: number },
      );
    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}

/* ================================================================
   Rate limiter (in-memory, per IP)
   ================================================================ */

const RATE_LIMIT = 20; // max requests
const RATE_WINDOW = 60_000; // 1 minute
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function checkRate(ip: string): boolean {
  const now = Date.now();

  // Lazy cleanup when map grows large
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

function validateBody(body: unknown): {
  ok: true;
  messages: ChatMessage[];
} | {
  ok: false;
  error: string;
} {
  if (typeof body !== "object" || body === null || !("messages" in body)) {
    return { ok: false, error: "Body must contain a `messages` array." };
  }

  const { messages } = body as { messages: unknown };

  if (!Array.isArray(messages)) {
    return { ok: false, error: "`messages` must be an array." };
  }

  if (messages.length === 0) {
    return { ok: false, error: "`messages` must not be empty." };
  }

  if (messages.length > MAX_MESSAGES) {
    return { ok: false, error: `Too many messages (max ${MAX_MESSAGES}).` };
  }

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (typeof m !== "object" || m === null) {
      return { ok: false, error: `messages[${i}] is not an object.` };
    }

    const { role, content } = m as Record<string, unknown>;

    if (role !== "user" && role !== "assistant") {
      return {
        ok: false,
        error: `messages[${i}].role must be "user" or "assistant".`,
      };
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      return {
        ok: false,
        error: `messages[${i}].content must be a non-empty string.`,
      };
    }

    if (content.length > MAX_CONTENT_LEN) {
      return {
        ok: false,
        error: `messages[${i}].content exceeds ${MAX_CONTENT_LEN} chars.`,
      };
    }
  }

  return { ok: true, messages: messages as ChatMessage[] };
}

/* ================================================================
   Route handler
   ================================================================ */

export async function POST(req: NextRequest) {
  /* ── API key guard ── */
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Server misconfiguration: missing OPENAI_API_KEY." },
      { status: 500 },
    );
  }

  /* ── Rate limit ── */
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  /* ── Parse & validate ── */
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const validation = validateBody(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const userMessages = validation.messages;

  /* ── Build message array for OpenAI ── */
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...userMessages.map(
      (m) => ({ role: m.role, content: m.content }) as ChatCompletionMessageParam,
    ),
  ];

  /* ── Call OpenAI with tool-call loop ── */
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

      if (!choice) {
        return NextResponse.json(
          { error: "No response from the model." },
          { status: 502 },
        );
      }

      const assistantMsg = choice.message;

      // If no tool calls, return the final text
      if (!assistantMsg.tool_calls || assistantMsg.tool_calls.length === 0) {
        return NextResponse.json({
          role: "assistant",
          content: assistantMsg.content ?? "",
        });
      }

      // Otherwise, execute each tool call and loop
      messages.push(assistantMsg);

      for (const tc of assistantMsg.tool_calls) {
        if (tc.type !== "function") continue;

        let args: Record<string, unknown> = {};
        try {
          args = JSON.parse(tc.function.arguments);
        } catch {
          // malformed args — pass empty
        }

        const result = executeTool(tc.function.name, args);

        messages.push({
          role: "tool",
          tool_call_id: tc.id,
          content: result,
        });
      }

      round++;
    }

    // If we exhausted rounds, ask model to summarise what it has
    messages.push({
      role: "user",
      content: "(System note: tool-call budget reached — please summarise with the information you have.)",
    });

    const final = await openai.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.4,
      max_tokens: 1024,
    });

    return NextResponse.json({
      role: "assistant",
      content: final.choices[0]?.message?.content ?? "Sorry, I couldn't complete that request.",
    });
  } catch (err: unknown) {
    console.error("[chat] OpenAI error:", err);

    const status =
      err instanceof OpenAI.APIError ? err.status ?? 502 : 502;
    const message =
      status === 429
        ? "Our AI service is busy. Please try again in a moment."
        : "Something went wrong while generating a response.";

    return NextResponse.json({ error: message }, { status });
  }
}
