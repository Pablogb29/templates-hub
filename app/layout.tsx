import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Templates Hub | AI-Powered Websites Delivered in Days",
  description:
    "Premium, AI-powered website templates for restaurants, salons, clinics, and more. Each site comes with an intelligent chatbot and is ready to deploy in days, not months.",
  openGraph: {
    title: "Templates Hub | AI-Powered Websites Delivered in Days",
    description:
      "Premium website templates with built-in AI chatbots. Restaurant, salon, and clinic templates ready for deployment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
