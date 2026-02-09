# WhitePeak Dental — Next.js Template

A premium dental-clinic landing page built with **Next.js 16**, **Tailwind CSS v4**, and the **Stitch** design system.

## Quick Start

```bash
npm install
npm run dev          # → http://localhost:3000
```

## Project Structure

```
app/
├── api/lead/route.ts        # Lead-capture API (POST)
├── globals.css              # Tailwind + Stitch design tokens
├── layout.tsx               # Root layout (Inter font, Material Symbols)
└── page.tsx                 # Home page — composes dentist components

components/dentist/
├── NavbarDentist.tsx         # Emergency strip + glassmorphism nav
├── HeroSplitBooking.tsx      # Hero copy + booking card
├── BookingForm.tsx           # Lead-capture form (client component)
├── ChatbotDentistWidget.tsx  # Botpress webchat FAB (client component)
├── ChatCTA.tsx               # "Chat with AI receptionist" inline CTA
├── TrustStats.tsx            # Trust metrics strip
├── TreatmentsNavigator.tsx   # Tabbed treatment cards (client component)
├── BeforeAfterSlider.tsx     # Before/after drag slider (client component)
├── Doctors.tsx               # Team section
├── TimelineHowItWorks.tsx    # Patient journey timeline
├── PartnersLogos.tsx         # Insurance partner logos
├── ReviewsCarousel.tsx       # Testimonial carousel (client component)
├── FAQAccordion.tsx          # FAQ accordion (native details/summary)
├── ContactEmergency.tsx      # Map + contact + emergency card
├── FooterDentist.tsx         # Site footer
└── StickyCTA.tsx             # Mobile bottom bar (Call / WhatsApp / Book)
```

## Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BOTPRESS_BOT_ID` | For chatbot | Your Botpress Cloud Bot ID |
| `NEXT_PUBLIC_BOTPRESS_CLIENT_ID` | Optional | Webchat Client ID (if needed) |

### How to get your Botpress credentials

1. Sign in to [Botpress Cloud](https://app.botpress.cloud).
2. Open (or create) a bot for your dental clinic.
3. Go to **Integrations → Webchat**.
4. Copy the **Bot ID** — it appears in the embed snippet URL:
   ```
   https://files.bpcontent.cloud/<BOT_ID>/webchat/v2.2/config.js
                                  ^^^^^^^^
   ```
5. Paste it into `.env.local` as `NEXT_PUBLIC_BOTPRESS_BOT_ID`.
6. If your webchat configuration requires a **Client ID**, copy that too.

> **Note:** When `NEXT_PUBLIC_BOTPRESS_BOT_ID` is empty the chatbot widget
> simply doesn't render — the rest of the site works perfectly.

## Lead Capture API

**`POST /api/lead`** accepts JSON:

```json
{
  "name": "John Doe",
  "phone": "+352 691 000 000",
  "email": "john@example.com",
  "date": "2026-03-15T10:00",
  "treatment": "cosmetic"
}
```

- `name` and `phone` are required; the rest are optional.
- Returns `{ ok: true, message: "..." }` on success.
- Returns `422` with `{ ok: false, errors: { field: "..." } }` on validation failure.
- Submissions are logged to the server console.

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + Stitch design tokens |
| Icons | Material Symbols Outlined |
| Font | Inter (via `next/font`) |
| Chatbot | Botpress Cloud Webchat v2 |
| Images | Unsplash (placeholder) |

## Deployment

```bash
npm run build
npm start
```

Or deploy to [Vercel](https://vercel.com) — just set the environment variables in the dashboard.
