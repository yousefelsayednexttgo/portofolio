import { NextRequest, NextResponse } from "next/server";
import { emptyContact, validateContact, type ContactFields } from "@/lib/contact";

export const runtime = "nodejs";
const reply = (message: string, status: number) => NextResponse.json({ message }, { status });

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const trustedOrigin = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin : request.nextUrl.origin;
  if (origin && origin !== trustedOrigin) return reply("This request couldn’t be verified. Please submit the form from the portfolio.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return reply("Please send a valid inquiry.", 415);
  let body: unknown;
  try { const raw = await request.text(); if (raw.length > 15000) return reply("Your inquiry is too long.", 413); body = JSON.parse(raw); }
  catch { return reply("Please send a valid inquiry.", 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply("Please send a valid inquiry.", 400);
  const fields = { ...emptyContact };
  for (const key of Object.keys(fields) as (keyof ContactFields)[]) { const value = (body as Record<string, unknown>)[key]; if (value !== undefined && typeof value !== "string") return reply("Please check your inquiry details.", 400); fields[key] = typeof value === "string" ? value.trim() : ""; }
  if (fields.honeypot) return reply("Thanks for your inquiry.", 200);
  const errors = validateContact(fields);
  if (Object.keys(errors).length) return NextResponse.json({ message: "Please check the highlighted fields.", errors }, { status: 422 });
  const resendReady = process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL;
  const formspree = process.env.FORMSPREE_FORM_ID;
  if (!resendReady && !formspree) return reply("Email delivery isn’t connected yet. Please use the available contact links.", 503);
  // Optional durable rate limiting for production. Configure all 3 values together.
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const key = `portfolio:contact:${ip}:${Math.floor(Date.now() / 600000)}`;
      const limited = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/pipeline`, { method: "POST", headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, "Content-Type": "application/json" }, body: JSON.stringify([["INCR", key], ["EXPIRE", key, 600]]), signal: AbortSignal.timeout(5000) });
      if (!limited.ok) throw new Error();
      const counts = await limited.json();
      if (counts[0]?.error || typeof counts[0]?.result !== "number") throw new Error();
      if (counts[0].result > 5) return reply("Too many inquiries. Please try again in 10 minutes.", 429);
    } catch { return reply("The inquiry service is temporarily unavailable. Please try again shortly.", 503); }
  }
  const text = `New portfolio inquiry\n\nName: ${fields.name}\nEmail: ${fields.email}\nCompany: ${fields.company || "Not provided"}\nWebsite: ${fields.website || "Not provided"}\nService: ${fields.service}\nMonthly ad budget: ${fields.adBudget || "Not provided"}\nProject budget: ${fields.projectBudget || "Not provided"}\n\n${fields.message}`;
  try {
    const response = resendReady ? await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: [process.env.CONTACT_TO_EMAIL], reply_to: fields.email, subject: `Portfolio inquiry: ${fields.service}`, text }), signal: AbortSignal.timeout(12000) }) : await fetch(`https://formspree.io/f/${encodeURIComponent(formspree!)}`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...fields, _subject: `Portfolio inquiry: ${fields.service}` }), signal: AbortSignal.timeout(12000) });
    if (!response.ok) return reply("Your inquiry couldn’t be delivered. Please try again or use the contact links.", 502);
    return reply("Your inquiry has been sent.", 200);
  } catch { return reply("Connection interrupted. Please try again or use the contact links.", 502); }
}
