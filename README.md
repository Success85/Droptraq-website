# DropTraQ — Official Company Website

The website for **DropTraQ**, a Rwandan startup building IoT-enabled monitoring for water
distribution networks.

Built with **Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · Lucide · Recharts**. All pages are prerendered as static HTML. The only server code is the
contact-form endpoint.

---

## Quick start

Requirements: **Node.js 20.9+** (developed on Node 22) and npm.

```bash
git clone https://github.com/DropTraQ/droptraq-website.git
cd droptraq-website
npm install
cp .env.example .env.local   # optional: add Supabase keys to enable the contact form
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment variables

See `.env.example`.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for metadata, sitemap and Open Graph. Defaults to `https://droptraq.com`. |
| `SUPABASE_URL` | For the contact form | `https://<project-ref>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | For the contact form | Service-role key. **Secret, server-only**: never prefix it with `NEXT_PUBLIC_`. |

**The contact form never fakes success.** Until both Supabase variables are set, `/api/contact`
returns `503 not_configured` and the visitor sees *"Your message has not been sent"*, with your phone
numbers and an option to copy their message. "Sent" is shown only after Supabase has stored the row.

## Contact form: Supabase setup

Messages flow: **website form → `/api/contact` → Supabase table `contact_messages` → Database
Webhook → Edge Function `notify-contact` → email to the team (via Resend).** The database is the
source of truth; email is a notification on top, so no message is lost if email fails.

1. **Create a Supabase project** at https://supabase.com.
2. **Create the table.** In the SQL editor, run
   `supabase/migrations/20261118000000_contact_messages.sql`, or with the CLI:
   ```bash
   supabase link --project-ref <project-ref>
   ```
   ```bash
   supabase db push
   ```
   Row Level Security is on with no policies, so the public anon key cannot read or write it.
3. **Connect the website.** Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API)
   in `.env.local` and in Vercel. The form now stores messages. View them under Table Editor →
   `contact_messages`; use the `status` column (`new`, `read`, `replied`, `archived`) to track replies.
4. **Email notifications** (optional but recommended). Create a [Resend](https://resend.com) account and
   verify your sending domain, then:
   ```bash
   supabase secrets set RESEND_API_KEY=... CONTACT_TO_EMAIL=team@yourdomain CONTACT_FROM_EMAIL="DropTraQ Website <web@yourdomain>" WEBHOOK_SECRET=<long-random-string>
   ```
   ```bash
   supabase functions deploy notify-contact --no-verify-jwt
   ```
   In the dashboard, go to Database → Webhooks → Create: table `contact_messages`, event **Insert**,
   type **Supabase Edge Functions**, function `notify-contact`, and add the HTTP header
   `x-webhook-secret: <same long-random-string>`.

## Deploying to Vercel

1. Import the Git repository in Vercel.
2. Keep the default Root Directory (the repository root). The framework preset is detected as Next.js.
3. Add the environment variables above (Production and Preview).
4. Deploy, then attach your domain and set `NEXT_PUBLIC_SITE_URL` to match it.

## Project structure

```
src/
  app/                      Routes (server components by default)
    page.tsx                Home
    technology/ problem/ about/ insights/ contact/ privacy/ terms/
    insights/[slug]/        Published articles (static params)
    api/contact/route.ts    Contact endpoint (stores messages in Supabase)
    sitemap.ts robots.ts opengraph-image.tsx icon.png apple-icon.png
  components/
    layout/                 Header (mobile menu), footer
    ui/                     Buttons, headings, photo, status badges, reveal, etc.
    home/ technology/ problem/ about/ insights/ contact/   Page sections
  content/                  ← ALL company content lives here
    site.ts                 Company info, contact, socials, team, photo registry
    technology.ts           Architecture layers, roadmap, disciplines (with status)
    insights.ts             Published articles (drafts are never shown)
    milestones.ts           Traction timeline (verified facts only)
    sources.ts              References for every statistic on the site
  lib/                      Utilities, simulated-data generator, contact validation
  hooks/
public/images/              Optimised photos (EXIF/GPS stripped) and brand icon
assets/brand-originals/     Original logo files from the brand folder (not served)
supabase/                   Database migration and the notify-contact Edge Function (Deno)
```

## Editing content

Everything a non-developer is likely to change is in `src/content/`:

- **Company details** (`site.ts`): any value left as `null` is hidden on the site, so placeholders never go live.
- **Team** (`site.ts → team`): add the verified name, role, bio, photo and LinkedIn, then set
  `published: true`. Unpublished profiles appear only in `npm run dev`, as dashed "pending" cards.
- **Capability status** (`technology.ts`): every layer and roadmap phase is `prototyped`,
  `development` or `planned`. Update these as work progresses.
- **Insights** (`insights.ts`): write the body, set a real `date`, and change `status` to `"published"`.
- **Milestones** (`milestones.ts`): add verified achievements. Leave `date` out rather than guess.
- **Statistics** (`sources.ts`): every figure on the site cites an entry here. Add the source first.

Search the codebase for `TODO(company)` to find every item awaiting company input.

## Content and accuracy principles

- No invented metrics, customers, partners, endorsements, testimonials or funding.
- Every statistic is cited (`src/content/sources.ts`), preferring official reports.
- WASAC is named only as a research engagement and as a cited data source, never as a partner.
  Internal operational details from the April 2026 research meeting are not published.
- All dashboard, network and chart data is **simulated** (seeded generator in
  `src/lib/simulation.ts`) and labelled as such wherever it appears.
- Field-visit photographs are captioned as **learning visits**, with an explicit note that they do not
  show deployments or imply partnership or endorsement. No WASAC branding appears in photos.
- Technology is described at architecture level only. Component pricing and detailed designs from
  internal documents are not published.

## Quality checks performed

- `next build`, `tsc` and `eslint` pass with no errors.
- Playwright run over every page at 1440px and 390px: no console errors, no horizontal overflow,
  no broken images, exactly one `<h1>` per page.
- Interaction tests: mobile menu (focus, Escape, navigation), keyboard-operable tab sets, dashboard
  tabs, time ranges and alert acknowledgement, and contact validation plus the not-configured path.
- Light theme. Dashboard chart colours validated for colour-vision deficiency and contrast on the white surface;
  received flow is also dashed as a non-colour cue.
- `prefers-reduced-motion` disables animations and continuous effects.
