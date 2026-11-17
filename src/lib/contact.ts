/** Shared contact-form schema and validation, used by both client and server. */

export const inquiryTypes = [
  { value: "enterprise", label: "Enterprise & infrastructure", hint: "Utilities, operators, public institutions" },
  { value: "partnership", label: "Technology partnership", hint: "Hardware, connectivity, software, research" },
  { value: "talent", label: "Engineering talent", hint: "Co-founders, engineers, interns" },
  { value: "general", label: "General inquiry", hint: "Media, investors, everything else" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];

export type ContactInput = {
  name: string;
  email: string;
  organization: string;
  type: InquiryType | "";
  message: string;
  /** Honeypot: must stay empty. Bots tend to fill every field. */
  website?: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = { name: 120, email: 200, organization: 160, message: 4000, messageMin: 20 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isInquiryType(v: unknown): v is InquiryType {
  return inquiryTypes.some((t) => t.value === v);
}

export function validateContact(input: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) e.name = "Please enter your full name.";
  else if (name.length > LIMITS.name) e.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email) e.email = "Please enter a valid email address, like name@example.com.";

  if (input.organization.trim().length > LIMITS.organization) e.organization = `Please keep this under ${LIMITS.organization} characters.`;

  if (!isInquiryType(input.type)) e.type = "Please choose what your inquiry is about.";

  if (!message) e.message = "Please write a short message.";
  else if (message.length < LIMITS.messageMin) e.message = `Please add a little more detail (at least ${LIMITS.messageMin} characters).`;
  else if (message.length > LIMITS.message) e.message = `Please keep your message under ${LIMITS.message} characters.`;

  return e;
}

export type ContactResponse =
  | { ok: true }
  | { ok: false; code: "validation"; errors: ContactErrors }
  | { ok: false; code: "not_configured" | "delivery_failed" | "bad_request"; message: string };
