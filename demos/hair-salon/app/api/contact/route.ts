import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    /* ---- Validation ---- */
    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || name.trim().length < 2)
      errors.name = "Name must be at least 2 characters.";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email address.";

    if (!phone || !/^[\d\s().+-]{7,20}$/.test(phone))
      errors.phone = "Please enter a valid phone number.";

    if (!message || typeof message !== "string" || message.trim().length < 10)
      errors.message = "Message must be at least 10 characters.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    /* ---- Log to server console (placeholder for email service) ---- */
    console.log("\n========================================");
    console.log("📩  NEW CONTACT FORM SUBMISSION");
    console.log("========================================");
    console.log(`Name:    ${name.trim()}`);
    console.log(`Email:   ${email.trim()}`);
    console.log(`Phone:   ${phone.trim()}`);
    console.log(`Message: ${message.trim()}`);
    console.log("========================================");
    console.log(
      `→ Placeholder: would send email to hello@lunahairstudio.com`
    );
    console.log("========================================\n");

    /* ---- Simulate slight network delay for realistic UX ---- */
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll get back to you within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { success: false, errors: { form: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
