import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | TemplatesHub",
  description:
    "Get in touch to discuss your project, book a demo, or ask any questions about our AI-powered website templates.",
};

export default function ContactPage() {
  return <ContactContent />;
}
