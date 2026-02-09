import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import MotionProvider from "@/components/providers/MotionProvider";
import ChatWidget from "@/components/chat/ChatWidget";
import "./globals.css";

/* ── Fonts ──
   Plus Jakarta Sans  → modern geometric sans for body / UI
   Playfair Display   → high-contrast serif for headings           */

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Izakaya Yoru — Premium Japanese Dining",
  description:
    "Experience the finest sushi and authentic izakaya dishes in an ambient, neon-lit atmosphere where tradition meets modern Tokyo.",
  openGraph: {
    title: "Izakaya Yoru — Premium Japanese Dining",
    description:
      "Tokyo nightlife in the heart of the city. Reserve your table now.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.variable} ${playfair.variable} font-sans antialiased`}
      >
        <MotionProvider>
          {children}
          <ChatWidget />
        </MotionProvider>
      </body>
    </html>
  );
}
