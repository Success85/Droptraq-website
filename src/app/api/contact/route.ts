import { validateContact, type ContactInput, type ContactResponse } from "@/lib/contact";

/**
 * POST /api/contact
 *
 * Stores contact-form messages in Supabase (table public.contact_messages,
 * see supabase/migrations). A Supabase Database Webhook then triggers the
 * `notify-contact` Edge Function, which emails the team.
 *
 * Required server-side environment variables:
 *   SUPABASE_URL               – https://<project-ref>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY  – service-role key. SERVER ONLY: never expose it
 *                                with a NEXT_PUBLIC_ prefix.
 *
 * Without them the endpoint answers 503 "not_configured" and the form tells
 * the visitor honestly that the message was NOT sent. It never pretends.
 */

const json = (body: ContactResponse, status: number) => Response.json(body, { status });

async function store(input: ContactInput, userAgent: string | null, cfg: { url: string; key: string }) {
  const res = await fetch(`${cfg.url.replace(/\/$/, "")}/rest/v1/contact_messages`, {
    method: "POST",
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      organization: input.organization || null,
      inquiry_type: input.type,
      message: input.message,
      user_agent: userAgent?.slice(0, 400) ?? null,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Supabase responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, code: "bad_request", message: "The request could not be read." }, 400);
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return json({ ok: false, code: "bad_request", message: "The request could not be read." }, 400);
  }
  const body = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const input: ContactInput = {
    name: str(body.name).trim(),
    email: str(body.email).trim(),
    organization: str(body.organization).trim(),
    type: str(body.type) as ContactInput["type"],
    message: str(body.message).trim(),
    website: str(body.website),
  };

  // Honeypot filled: accept silently without storing.
  if (input.website) return json({ ok: true }, 200);

  const errors = validateContact(input);
  if (Object.keys(errors).length) return json({ ok: false, code: "validation", errors }, 422);

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return json(
      { ok: false, code: "not_configured", message: "Online message delivery is not connected yet, so your message was not sent." },
      503,
    );
  }

  try {
    await store(input, request.headers.get("user-agent"), { url, key });
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("[contact] store failed:", err instanceof Error ? err.message : err);
    return json({ ok: false, code: "delivery_failed", message: "We could not save your message just now. Please try again shortly." }, 502);
  }
}
