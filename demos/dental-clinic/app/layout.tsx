import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/dentist/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WhitePeak Dental — Exceptional Dentistry in Luxembourg",
  description:
    "Experience stress-free dental care in Luxembourg City. State-of-the-art technology, spa-like comfort, and transparent pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Material Symbols — icons from the Stitch design */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background-light text-secondary overflow-x-hidden`}
      >
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
