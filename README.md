# Quinta Aura — website

A redesign of the website for **Quinta Aura, S.L.**, a technical architecture
and engineering practice in Marbella and San Pedro de Alcántara, founded 2001.

Built as a bilingual (ES/EN) statically-rendered Next.js site.

- **Stack** — Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion
- **Routes** — 37 prerendered pages: 5 top-level pages × 2 locales, 11 project
  dossiers × 2 locales, plus `sitemap.xml`, `robots.txt` and a 404

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs,
`hreflang` alternates, Open Graph URLs and the sitemap resolve correctly. It
falls back to the Vercel preview origin.

---

## How the content is organised

All copy lives in typed modules under `src/content/`. There is no CMS; the
practice's content is small, highly structured and changes rarely, so a typed
data layer gives better guarantees than a database.

| File | Holds |
| --- | --- |
| `site.ts` | Phone, emails, both offices, founding year, social |
| `dictionary.ts` | UI chrome in both languages |
| `work.ts` | The eleven project dossiers |
| `expertise.ts` | Four service families and the five Servipacks |
| `studio.ts` | Practice description, the four principals, timeline |
| `plates.ts` | Photography manifest (currently empty — see below) |

Every content entry carries a `source` field (`"es"`, `"en"` or `"both"`)
recording the language it was published in on the legacy site. Where the other
language was translated for this build, `needsReview()` in `src/lib/i18n.ts`
flags it, and the case-study pages render a review note.

### Content integrity

The legacy site contained **no named commissions and no project photography**.
Nothing here invents one. The Projects section presents dossiers by *programme
type* — all of which the legacy site explicitly claims — and the imagery is
hand-built architectural drawing rather than stock photography.

**Read [`docs/TRANSLATION-REVIEW.md`](docs/TRANSLATION-REVIEW.md) before
launch.** It lists every translation awaiting sign-off, every fact that needs
confirming (including whether the San Pedro office is still open), and every
item deliberately left off the new site, with the reason.

### Adding photography

Drop files in `public/plates/`, add an entry to `src/content/plates.ts` keyed by
the dossier slug, and they appear automatically — `<Plate>` serves them
responsively through `next/image` at the same crop the drawings use. Nothing
else changes.

---

## Design system

Tokens are defined once in `src/app/globals.css`. Colours and the type scale sit
in Tailwind's `@theme`, so they are emitted as CSS variables *and* available as
utilities (`bg-paper`, `text-ink`); the fine editorial composition is written in
CSS Modules against the same variables.

- **Palette** — warm white paper, warm near-black ink, cool concrete grey, and a
  single restrained terracotta accent used for one mark per view
- **Type** — Archivo (monumental display) · Newsreader (editorial body) ·
  IBM Plex Mono (technical labels), all self-hosted via `next/font`
- **Drawing language** — hairlines, blueprint fields and six SVG motifs
  (`axon`, `section`, `plan`, `elevation`, `grid`, `detail`) in
  `src/components/drawing/TechnicalDrawing.tsx`

### Motion

Three named easings, transform and opacity only, never layout. Every animated
component has an explicit `prefers-reduced-motion` branch that renders the
resting state with no movement.

One trap worth knowing about if you add reveals: an element whose initial state
is `clip-path: inset(0 0 100% 0)`, or one translated outside an
`overflow: hidden` parent, reports an IntersectionObserver ratio of **0**. Any
`whileInView` with an `amount` above 0 can therefore never fire, and the element
stays hidden permanently. The components here observe an *outer, uncollapsed*
wrapper with `useInView` and drive the animation from that boolean — see the
note at the top of `src/components/ui/Reveal.tsx`.

---

## Accessibility and SEO

- One `<h1>` per page, ordered headings, skip link, visible focus rings that
  never animate
- The index overlay is a labelled modal with focus trap, `Escape`, scroll lock
  and restored focus
- Contact form: real labels, `aria-invalid`, `aria-describedby` error wiring,
  focus moved to the first invalid field, and a live region that does not shift
  layout
- Interactive targets meet the 24px minimum; no horizontal scroll at 320px
- Per-locale `<html lang>`, canonical URLs, `hreflang` alternates including
  `x-default`, Open Graph, `ProfessionalService` JSON-LD built only from
  verified facts, and a generated sitemap with language alternates

### The contact form

It composes the enquiry and hands it to the visitor's own mail client, so it
works on a static deployment with no API key, no third-party form service, and
nothing to leak — the message never touches our infrastructure. To post
server-side instead, replace `handleSubmit` in
`src/components/contact/ContactForm.tsx` with a Server Action; the markup,
validation and states stay as they are.

---

## Localisation

Spanish is the default. `src/middleware.ts` redirects any unprefixed path to the
visitor's preferred language when we publish it, and to `/es` otherwise, so every
page is served under a locale segment and the root layout can set `<html lang>`
correctly. The language switch keeps the reader on the same page.
