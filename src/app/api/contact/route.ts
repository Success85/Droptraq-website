import { inquiryTypes, validateContact, type ContactInput, type ContactResponse } from "@/lib/contact";

/**
 * POST /api/contact
 *
 * Delivers contact-form messages by email through Resend (https://resend.com)
 * when these environment variables are set:
 *   RESEND_API_KEY      – Resend API key
 *   CONTACT_TO_EMAIL    – inbox that receives messages
 *   CONTACT_FROM_EMAIL  – verified sender, e.g. "DropTraQ Website <web@yourdomain>"
 *
 * Without them the endpoint answers 503 "not_configured" and the form tells
 * the visitor honestly that the message was NOT sent. It never pretends to
 * deliver. To use a different provider, replace `deliver()` only.
 */

const json = (body: ContactResponse, status: number) => Response.json(body, { status });

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function deliver(input: ContactInput, cfg: { key: string; to: string; from: string }) {
  const typeLabel = inquiryTypes.find((t) => t.value === input.type)?.label ?? input.type;
  const rows: [string, string][] = [
    ["Name", input.name], ["Email", input.email], ["Organization", input.organization || "—"], ["Inquiry", typeLabel],
  ];
  const html = `<h2>New website inquiry · ${escapeHtml(typeLabel)}</h2>
<table>${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("")}</table>
<p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${input.message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: cfg.from,
      to: [cfg.to],
      reply_to: input.email,
      subject: `[DropTraQ website] ${typeLabel} — ${input.name}`,
      html,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, code: "bad_request", message: "The request could not be read." }, 400);
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const input: ContactInput = {
    name: str(raw.name).trim(),
    email: str(raw.email).trim(),
    organization: str(raw.organization).trim(),
    type: str(raw.type) as ContactInput["type"],
    message: str(raw.message).trim(),
    website: str(raw.website),
  };

  // Honeypot filled: accept silently without delivering.
  if (input.website) return json({ ok: true }, 200);

  const errors = validateContact(input);
  if (Object.keys(errors).length) return json({ ok: false, code: "validation", errors }, 422);

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) {
    return json(
      { ok: false, code: "not_configured", message: "Online message delivery is not connected yet, so your message was not sent." },
      503,
    );
  }

  try {
    await deliver(input, { key, to, from });
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("[contact] delivery failed:", err instanceof Error ? err.message : err);
    return json({ ok: false, code: "delivery_failed", message: "We could not deliver your message just now. Please try again shortly." }, 502);
  }
}
