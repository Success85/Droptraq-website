// Supabase Edge Function: notify-contact
//
// Emails the DropTraQ team whenever a new row is inserted into
// public.contact_messages. Triggered by a Supabase Database Webhook.
//
// Secrets (set with `supabase secrets set ...`):
//   RESEND_API_KEY      – API key from https://resend.com
//   CONTACT_TO_EMAIL    – inbox that receives inquiries (comma-separate several)
//   CONTACT_FROM_EMAIL  – verified sender, e.g. "DropTraQ Website <web@droptraq.com>"
//   WEBHOOK_SECRET      – shared secret; the webhook sends it in `x-webhook-secret`
//
// Deploy:  supabase functions deploy notify-contact --no-verify-jwt
// (JWT verification is replaced by the WEBHOOK_SECRET header check.)

type ContactRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organization: string | null;
  inquiry_type: string;
  message: string;
};

type WebhookPayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: ContactRow | null;
};

const LABELS: Record<string, string> = {
  enterprise: "Enterprise & infrastructure",
  partnership: "Technology partnership",
  talent: "Engineering talent",
  general: "General inquiry",
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const secret = Deno.env.get("WEBHOOK_SECRET");
  if (!secret || req.headers.get("x-webhook-secret") !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  if (payload.type !== "INSERT" || payload.table !== "contact_messages" || !payload.record) {
    return new Response("Ignored", { status: 200 });
  }

  const key = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("CONTACT_TO_EMAIL");
  const from = Deno.env.get("CONTACT_FROM_EMAIL");
  if (!key || !to || !from) {
    console.error("[notify-contact] missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return new Response("Not configured", { status: 500 });
  }

  const r = payload.record;
  const type = LABELS[r.inquiry_type] ?? r.inquiry_type;
  const rows: [string, string][] = [
    ["Name", r.name],
    ["Email", r.email],
    ["Organization", r.organization || "—"],
    ["Inquiry", type],
    ["Received", new Date(r.created_at).toUTCString()],
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: r.email,
      subject: `[DropTraQ website] ${type} — ${r.name}`,
      html: `<h2>New website inquiry · ${esc(type)}</h2>
<table>${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${esc(v)}</td></tr>`).join("")}</table>
<p style="white-space:pre-wrap">${esc(r.message)}</p>
<p style="color:#66798a;font-size:12px">Message id ${esc(r.id)} · stored in Supabase table public.contact_messages</p>`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${r.message}\n\nMessage id ${r.id}`,
    }),
  });

  if (!res.ok) {
    console.error("[notify-contact] Resend responded", res.status, await res.text());
    return new Response("Email delivery failed", { status: 502 });
  }
  return new Response("Sent", { status: 200 });
});
