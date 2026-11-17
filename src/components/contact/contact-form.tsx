"use client";

import { useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Check, CheckCircle2, Copy, Loader2, Send } from "lucide-react";
import {
  LIMITS, inquiryTypes, isInquiryType, validateContact,
  type ContactErrors, type ContactInput, type ContactResponse,
} from "@/lib/contact";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; undelivered: boolean };

const empty: ContactInput = { name: "", email: "", organization: "", type: "", message: "", website: "" };

/** Reads ?type= so links like /contact?type=talent preselect the inquiry type. */
export function ContactFormWithParams() {
  const params = useSearchParams();
  const t = params.get("type");
  return <ContactForm initialType={isInquiryType(t) ? t : ""} />;
}

export function ContactForm({ initialType = "" }: { initialType?: ContactInput["type"] }) {
  const [values, setValues] = useState<ContactInput>({ ...empty, type: initialType });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [state, setState] = useState<State>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const set = <K extends keyof ContactInput>(k: K, v: ContactInput[K]) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k]) setErrors((e) => ({ ...e, [k]: validateContact(next)[k] }));
  };
  const blur = (k: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validateContact(values)[k] }));
  };

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    setTouched({ name: true, email: true, organization: true, type: true, message: true });
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as ContactResponse;
      if (data.ok) {
        setState({ kind: "success" });
      } else if (data.code === "validation") {
        setErrors(data.errors);
        setState({ kind: "idle" });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      } else {
        setState({ kind: "error", message: data.message, undelivered: true });
      }
    } catch {
      setState({ kind: "error", message: "We could not reach the server. Check your connection and try again.", undelivered: true });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(values.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  if (state.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-2xl border border-ok/40 bg-ok/5 p-8 outline-none sm:p-10">
        <CheckCircle2 aria-hidden className="size-8 text-ok" />
        <h2 className="mt-5 font-display text-2xl text-fg">Message sent. Thank you.</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Your message has been delivered to the DropTraQ team. We will reply to <span className="text-fg">{values.email}</span>.
        </p>
        <button type="button" onClick={() => { setValues({ ...empty }); setTouched({}); setErrors({}); setState({ kind: "idle" }); }}
          className="mt-8 min-h-10 rounded-full border border-line-strong px-5 text-sm text-fg hover:border-cyan">
          Send another message
        </button>
      </div>
    );
  }

  const errorList = (Object.entries(errors) as [keyof ContactInput, string | undefined][]).filter(([, v]) => v);
  const showSummary = errorList.length > 0 && Object.values(touched).filter(Boolean).length >= 5;

  const field = "mt-2 block w-full rounded-xl border bg-ink-850 px-4 py-3 text-[0.95rem] text-fg placeholder:text-subtle transition-colors focus:border-cyan focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-cyan/25";
  const fieldState = (k: keyof ContactInput) => (errors[k] ? "border-alert/70" : "border-line-strong hover:border-line-strong/80");
  const label = "text-sm font-medium text-fg";
  const err = (k: keyof ContactInput) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className="mt-2 flex items-start gap-1.5 text-sm text-alert">
        <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />{errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={id("req")} className="space-y-6">
      {showSummary && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-alert/40 bg-alert/5 p-4 outline-none">
          <p className="text-sm font-medium text-fg">Please fix {errorList.length === 1 ? "1 field" : `${errorList.length} fields`}:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errorList.map(([k, v]) => <li key={k}><a href={`#${id(k)}`} className="text-alert underline-offset-2 hover:underline">{v}</a></li>)}
          </ul>
        </div>
      )}

      <p id={id("req")} className="text-xs text-subtle">Fields marked <span aria-hidden className="text-cyan">*</span><span className="sr-only">with an asterisk</span> are required.</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={label}>Full name <span aria-hidden className="text-cyan">*</span></label>
          <input id={id("name")} name="name" autoComplete="name" required maxLength={LIMITS.name}
            value={values.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-err") : undefined}
            className={cn(field, fieldState("name"))} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={id("email")} className={label}>Email address <span aria-hidden className="text-cyan">*</span></label>
          <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" required maxLength={LIMITS.email}
            value={values.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? id("email-err") : undefined}
            className={cn(field, fieldState("email"))} />
          {err("email")}
        </div>
      </div>

      <div>
        <label htmlFor={id("organization")} className={label}>Organization <span className="font-normal text-subtle">(optional)</span></label>
        <input id={id("organization")} name="organization" autoComplete="organization" maxLength={LIMITS.organization}
          value={values.organization} onChange={(e) => set("organization", e.target.value)} onBlur={() => blur("organization")}
          aria-invalid={!!errors.organization} aria-describedby={errors.organization ? id("organization-err") : undefined}
          className={cn(field, fieldState("organization"))} />
        {err("organization")}
      </div>

      <fieldset aria-describedby={errors.type ? id("type-err") : undefined}>
        <legend className={label}>Inquiry type <span aria-hidden className="text-cyan">*</span></legend>
        <div id={id("type")} className="mt-3 grid gap-2 sm:grid-cols-2">
          {inquiryTypes.map((t) => {
            const on = values.type === t.value;
            return (
              <label key={t.value}
                className={cn("flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan",
                  on ? "border-cyan/60 bg-cyan/[0.07]" : errors.type ? "border-alert/50" : "border-line-strong hover:border-cyan/30")}>
                <input type="radio" name="type" value={t.value} checked={on}
                  onChange={() => { set("type", t.value); setTouched((x) => ({ ...x, type: true })); setErrors((e) => ({ ...e, type: undefined })); }}
                  className="sr-only" />
                <span aria-hidden className={cn("mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full border", on ? "border-cyan" : "border-muted")}>
                  {on && <span className="size-2 rounded-full bg-cyan" />}
                </span>
                <span>
                  <span className="block text-sm font-medium text-fg">{t.label}</span>
                  <span className="mt-0.5 block text-xs text-subtle">{t.hint}</span>
                </span>
              </label>
            );
          })}
        </div>
        {err("type")}
      </fieldset>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={id("message")} className={label}>Message <span aria-hidden className="text-cyan">*</span></label>
          <span className={cn("font-mono text-[11px] tabular-nums", values.message.length > LIMITS.message ? "text-alert" : "text-subtle")} aria-hidden>
            {values.message.length}/{LIMITS.message}
          </span>
        </div>
        <textarea id={id("message")} name="message" rows={6} required
          value={values.message} onChange={(e) => set("message", e.target.value)} onBlur={() => blur("message")}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? id("message-err") : undefined}
          placeholder="Tell us a little about what you're working on and how we might help each other."
          className={cn(field, fieldState("message"), "resize-y")} />
        {err("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} /></label>
      </div>

      {state.kind === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-xl border border-amber/40 bg-amber/5 p-5 outline-none">
          <p className="flex items-start gap-2 font-medium text-fg"><AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-amber" />Your message has not been sent.</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{state.message}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {site.contact.email && (
              <a className="inline-flex min-h-10 items-center rounded-full bg-cyan px-4 text-sm font-medium text-white"
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Website inquiry")}&body=${encodeURIComponent(values.message)}`}>
                Email us instead
              </a>
            )}
            <button type="button" onClick={copyMessage} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm text-fg">
              {copied ? <Check aria-hidden className="size-4 text-ok" /> : <Copy aria-hidden className="size-4" />}{copied ? "Copied" : "Copy my message"}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-subtle">
          We use your details only to reply to you. See our <a href="/privacy" className="underline underline-offset-2 hover:text-fg">Privacy Policy</a>.
        </p>
        <button type="submit" disabled={state.kind === "submitting"}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-cyan px-7 font-medium text-white transition-colors hover:bg-cyan-soft disabled:opacity-70">
          {state.kind === "submitting" ? <><Loader2 aria-hidden className="size-4 animate-spin" />Sending…</> : <>Send message<Send aria-hidden className="size-4" /></>}
        </button>
      </div>
    </form>
  );
}
