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
cp .env.example .env.local   # optional: fill in to enable contact-form email
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
| `RESEND_API_KEY` | For contact email | API key from [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | For contact email | Inbox that receives inquiries |
| `CONTACT_FROM_EMAIL` | For contact email | Verified sender, e.g. `DropTraQ Website <web@droptraq.com>` |

**The contact form never fakes success.** Until all three email variables are set, `/api/contact`
returns `503 not_configured` and the visitor sees *"Your message has not been sent"* with an option
to copy their message (plus a mailto link once a company email is configured). To use another
provider, replace the `deliver()` function in `src/app/api/contact/route.ts`.

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
    api/contact/route.ts    Contact endpoint (Resend)
    sitemap.ts robots.ts opengraph-image.tsx icon.png apple-icon.png
  components/
    layout/                 Header (mobile menu), footer
    ui/                     Buttons, headings, photo, status badges, reveal, etc.
    home/ technology/ problem/ about/ insights/ contact/   Page sections
  content/                  ← ALL company content lives here
    site.ts                 Company info, contact, socials, team, photo registry
    technology.ts           Architecture layers, roadmap, disciplines (with status)
    insights.ts             Articles and "in preparation" topics
  lib/                      Utilities, simulated-data generator, contact validation
  hooks/
public/images/              Optimised photos (EXIF/GPS stripped) and brand icon
assets/brand-originals/     Original logo files from the brand folder (not served)
```

## Editing content

Everything a non-developer is likely to change is in `src/content/`:

- **Company details** (`site.ts`): any value left as `null` is hidden on the site, so placeholders never go live.
- **Team** (`site.ts → team`): add the verified name, role, bio, photo and LinkedIn, then set
  `published: true`. Unpublished profiles appear only in `npm run dev`, as dashed "pending" cards.
- **Capability status** (`technology.ts`): every layer and roadmap phase is `prototyped`,
  `development` or `planned`. Update these as work progresses.
- **Insights** (`insights.ts`): write the body, set a real `date`, and change `status` to `"published"`.

Search the codebase for `TODO(company)` to find every item awaiting company input.

## Content and accuracy principles

- No invented metrics, customers, partners, endorsements, testimonials or funding.
- All dashboard, network and chart data is **simulated** (seeded generator in
  `src/lib/simulation.ts`) and labelled as such wherever it appears.
- Field-visit photographs are captioned as **learning visits**, with an explicit note that they do not
  show deployments or imply partnership or endorsement. No WASAC branding is shown.
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
