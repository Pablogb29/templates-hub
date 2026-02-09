import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import ChatWidgetAI from "@/components/ChatWidgetAI";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://www.lunahairstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Luna Hair Studio — Premium Hair Styling in SoHo, NYC",
    template: "%s | Luna Hair Studio",
  },

  description:
    "Experience luxury hair care in a modern, relaxing atmosphere. Expert cuts, bespoke color, and treatments tailored exclusively to you. Located in SoHo, New York.",

  keywords: [
    "hair salon",
    "SoHo",
    "NYC",
    "balayage",
    "haircut",
    "hair color",
    "keratin treatment",
    "hair stylist New York",
    "Luna Hair Studio",
  ],

  authors: [{ name: "Luna Hair Studio" }],

  creator: "Luna Hair Studio",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Luna Hair Studio",
    title: "Luna Hair Studio — Premium Hair Styling in SoHo, NYC",
    description:
      "Expert cuts, bespoke color, and treatments tailored exclusively to you. Book your appointment today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luna Hair Studio — Premium Hair Styling",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Luna Hair Studio — Premium Hair Styling in SoHo, NYC",
    description:
      "Expert cuts, bespoke color, and treatments tailored exclusively to you.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        {children}
        <ChatWidgetAI />
      </body>
    </html>
  );
}
