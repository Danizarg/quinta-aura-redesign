# Translation and content review

Everything on the site is traceable to the legacy Wix site
(`fern3353.wixsite.com/quintaaura-eng`) or to contact details supplied directly
by the client. **No projects, certifications, awards or credentials have been
invented.**

This document lists every item that needs the studio's sign-off before launch.
It is split into three parts:

1. **Translations to approve** — copy that existed in one language only.
2. **Facts to confirm** — things the legacy site stated that may be out of date.
3. **Deliberate omissions** — things that were on the old site but are *not* on
   the new one, and why.

The machine-readable version of part 1 lives in the content files: every entry
in `src/content/work.ts`, `expertise.ts` and `studio.ts` carries a `source`
field of `es`, `en` or `both`. `needsReview(source, locale)` in `src/lib/i18n.ts`
derives the flag the site uses.

---

## 1. Translations to approve

### 1a. Spanish needs review (English was the source)

The legacy site published these pages in English only. The Spanish is new and
should be read by a native speaker in the practice before launch.

| Where | Content |
| --- | --- |
| `studio.ts` → `studioIntro` | Company description, national scope, founding |
| `studio.ts` → `principals` | All four biographies and role titles |
| `work.ts` → `vivienda-unifamiliar` | Single-family housing dossier |
| `work.ts` → `vivienda-plurifamiliar` | Multi-family housing dossier |
| `work.ts` → `industrial` | Factories and warehouses dossier |
| `work.ts` → `urbanizacion` | Urbanisation dossier |
| `work.ts` → `eficiencia-energetica` | KNX and energy-saving dossier |
| `work.ts` → `certificacion-energetica` | Certification and audit dossier |
| `work.ts` → `peritaje` | Expert reports dossier |
| `work.ts` → `ingenieria-ambiental` | Environmental engineering dossier |
| `work.ts` → `interiorismo` | Interior design dossier |
| `expertise.ts` → families A, B, C | Service descriptions |
| `expertise.ts` → `servipacks` 01, 02, 03, 05 | Pack scope lists |

### 1b. English needs review (Spanish was the source)

The legacy site published these in Spanish only.

| Where | Content |
| --- | --- |
| `work.ts` → `comunidades` | Building Manual / communities dossier |
| `expertise.ts` → family D | Communities and property managers |
| `expertise.ts` → `servipack` 04 | Community management pack |

Two terms worth a decision, because they are legal instruments with no exact
English equivalent:

- **Libro del Edificio** → rendered as *Building Manual*. *Building Logbook* is
  also used in UK practice. Pick one and we will apply it throughout.
- **Administrador de fincas** → rendered as *property manager*. The Spanish role
  is regulated and broader than the UK/US usage; the studio may prefer to keep
  the Spanish term in the English text.

### 1c. Verified in both languages — no review needed

- The **due diligence** dossier. The legacy page published both a Spanish and an
  English text and both are carried over as written (lightly repunctuated).
- All UI chrome (navigation, form labels, buttons) — written natively in both
  languages for this build, not translated.

---

## 2. Facts to confirm

| Item | Status |
| --- | --- |
| Phone `+34 639 58 11 88` | Supplied by the client. Used site-wide. |
| `info@quintaaura.es`, `fernando@quintaaura.es` | Supplied by the client. |
| Marbella office — Avenida Ricardo Soriano 66, Oficina 5, 29602 | Supplied by the client. |
| **San Pedro de Alcántara office** — Calle Toledo 17, 2.º H, Edificio Rosamar II, 29670 | **From the legacy contact page only. Please confirm it is still current** — it is flagged `verified: false` in `src/content/site.ts`. If the office has closed, delete that entry and it disappears from the footer, contact page and nav. |
| Founded 2001 | From the legacy company page. |
| Professional registration and judicial technical list since 1992 | From the legacy architecture-projects page. |
| **Founder's statement** on Home and Studio | The legacy English was not written by a native speaker. It has been rendered readable in both languages and is **attributed to Fernando Artímez**, so it needs his explicit approval before launch. See `studio.ts` → `founderStatement`. |
| Andrea Artímez's biography | The legacy page said she was "currently combining her studies of architecture with her designs" — written around 2013. Softened to "has an architectural education". Please update with her current qualification. |

---

## 3. Deliberate omissions

Each of these was on the legacy site and is **not** on the new one. All are easy
to restore once the studio confirms.

### Project names and photography

The legacy site contained **no named commissions and no project photography** —
the two images on its Projects page were generic stock. Rather than invent
buildings, the Projects section presents eleven **work dossiers** by programme
type (all of which the legacy site explicitly claims), and the imagery is
hand-drawn architectural work: axonometrics, sections, plans, elevations,
control diagrams and construction details.

The Projects index carries a short studio note explaining that project-level
detail is available on request, framed around the confidentiality that normally
attaches to expert-witness and due-diligence work.

**To add real projects:** add entries to `src/content/work.ts` and photographs
to `src/content/plates.ts` (instructions are in the file). The page, grid,
parallax and responsive image pipeline are already built for them.

### Servipack prices

The legacy Servipack tables carry a 2013 copyright. Two problems:

1. The figures are thirteen years old.
2. In the published markup the price column cannot be reliably matched back to
   its line items, so re-publishing them risked attaching the wrong fee to the
   wrong service.

Every pack therefore shows its **scope** faithfully and reads *"Tarifa a
consultar" / "Fee on request"*. The legacy figures are recorded below so the
studio can confirm or replace them:

- Energy Savings Pack 1 — 650 € · Pack 2 — 850 € · Module installation Pack 3 —
  350 € · Pack 4 — 450 €
- Communities, monthly: up to 20 units — 225 € · 21–60 — 350 € · 61–120 — 525 €
  · over 120 — on request; a 10% discount against the other packs and an annual
  report included
- Servipack 3 line items ranged from 50 € to 250 €, with some priced as a
  percentage of the works budget (3%, 7%, 12%)
- Certification registration with the competent authority — +30 € per
  certificate (VAT excluded)

### Named clients and collaborators

The legacy Clients page named individual law firms, architects, estate agents
and suppliers. Those are third parties, so the new site lists **sectors** rather
than names, pending their consent to appear. Restoring the names is a small
change to `collaboratorSectors` in `src/content/studio.ts`.

### The "over 25 years" figure

The legacy site said "over 25 years of experience" on a page dated 2013, which
would now read as 35+. Rather than silently inflate or repeat a stale number,
the site uses the anchored dates the source gives: **founded 2001**, **registered
since 1992**. If the studio wants an experience figure, give us the number and
we will state it directly.

### Geothermal partner credential

The legacy page claimed "27 years of experience in the design and manufacture of
heat pumps with presence in over 10 European markets". That is a **partner
company's** credential, not Quinta Aura's, and it is also dated. The site now
says geothermal solutions are offered "through specialist partner companies"
without the figures.

### Social links

Only **Facebook** is carried over. The legacy Google+ link points at a service
that no longer exists, and the Twitter/X handle could not be verified as active.
Add any current accounts to `social` in `src/content/site.ts`.

### Blog and Terms of Use

The legacy Blog had no posts and the Terms of Use page was a Wix default. Both
were dropped. A legal notice should be added before launch — Spanish law
generally requires an *aviso legal* with company registration details and a
privacy notice covering the contact form. The footer has a `legal` label ready
in `src/content/dictionary.ts`.
