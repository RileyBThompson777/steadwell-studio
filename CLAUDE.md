# CLAUDE.md — Steadwell Studio

Guidance for anyone (human or AI) working in this repository.

## The business

| | |
|---|---|
| Name | Steadwell Studio (working name) |
| Location | Louisville, Kentucky |
| Model | Website as a service for small service-based businesses |
| Initial niche | Automotive detailing |
| Price | $129/month, $0 setup fee |
| Commitment | 3 months, billed monthly, then month to month |
| Offer | Complimentary design preview for qualified prospects |
| Headline | "Good business deserves a better website." |
| Primary CTA | "Request your free design preview" |

**Included in the subscription:** five-page custom website; mobile and desktop optimisation; managed
hosting and SSL; contact and quote forms; online booking integration; basic local SEO; monthly
performance report; 30 minutes of monthly updates; ongoing maintenance and support. Premium
third-party services may require additional fees.

The owner manages the business from an iPhone and has limited coding experience. Keep explanations
plain, keep edits easy, and document anything that needs their action.

## Non-negotiable content rules

1. **Never fabricate** customer reviews, testimonials, client projects, statistics, awards,
   certifications or credentials. Tests fail on common phrases like "testimonial" or "trusted by".
2. **Portfolio concepts must be labelled** "Design concept · fictional business" (`kind: 'concept'`
   in `src/data/portfolio.ts`). Only add `kind: 'client'` for real, permitted client work.
3. **No rankings promises.** Local SEO copy must not guarantee search positions.
4. **No secrets in source.** API keys and tokens go in Cloudflare environment variables / secrets,
   never in the repo. `src/config/site.ts` holds only public values.
5. **Do not** purchase services, register domains, enable billing, deploy to production or contact
   customers without the owner's explicit approval.
6. The form must never claim a request was sent unless it actually was.

## Where things live

```
src/config/site.ts      ← business details, pricing, contact, integrations, navigation (EDIT HERE FIRST)
src/data/services.ts    ← included services + process steps
src/data/faq.ts         ← FAQ questions and answers
src/data/portfolio.ts   ← design concepts / client projects
src/styles/global.css   ← brand tokens (colours, type scale, spacing) + base styles
src/layouts/BaseLayout.astro  ← <head>, SEO meta, JSON-LD, header/footer wrapper
src/components/         ← reusable building blocks (see below)
src/pages/              ← one file per page (file name = URL)
src/scripts/            ← small client-side scripts (reveal animation, form validation)
public/                 ← static files copied as-is (favicon, robots.txt, Cloudflare _headers)
tests/unit/             ← Node test runner: build output, content rules, validation
tests/e2e/              ← Playwright: iPhone + desktop, accessibility (axe), menu, forms
```

### Reusable components

| Component | Purpose |
|---|---|
| `Header`, `Footer`, `Wordmark` | Site chrome; nav comes from `navigation` in config |
| `PageHero` | Inner-page title block (eyebrow, h1, lede, optional slot) |
| `SectionHeading` | Numbered editorial section heading |
| `Button` | Link button: `primary`, `ghost`, `text` |
| `ServiceList`, `ProcessSteps` | Render `src/data/services.ts` |
| `PricingPlan` | Plan card driven entirely by `pricing` config |
| `FaqList` | Native `<details>` accordion |
| `ProjectCard`, `ConceptMockup` | Portfolio entry + illustrated (CSS) mock-up |
| `PreviewForm` | Lead form with validation; endpoint from config |
| `CtaBand` | Closing call-to-action section |

These are intended as the foundation for client sites: copy the project, replace `src/config` and
`src/data`, adjust tokens in `global.css`.

## Design standards

- Palette: forest `#24392D`, ivory `#F4F1E8`, charcoal `#252525`, sage `#A5AE9E`
  (use `--c-sage-ink` `#5D6857` for sage-coloured *text* on ivory — plain sage fails contrast).
- Type: Fraunces (display, self-hosted variable font) + Inter (body). Italic display for emphasis.
- Editorial layout: hairline rules, numbered sections, generous whitespace, near-square corners
  (`--radius: 2px`).
- Avoid: gradients as decoration, rounded "SaaS" cards, robot/AI imagery, buzzwords, stock-startup tropes.
- Motion: subtle `data-reveal` fade-up only; must respect `prefers-reduced-motion` and content must be
  visible without JavaScript.

## Engineering standards

- Astro (static output) + TypeScript (strict) + plain CSS. No UI framework unless clearly needed.
- Mobile-first CSS; min tap target 44px; form inputs ≥16px to avoid iOS zoom.
- Accessibility target: WCAG 2.1 AA. One `<h1>` per page, labelled form controls, skip link,
  visible focus, landmarks. axe runs in CI.
- Performance: no client framework, self-hosted fonts, minimal JS (menu, reveal, form).
- Hosting: Cloudflare Pages (static `dist/`). Headers in `public/_headers`.
- Set `SITE_URL` env var once a domain exists to enable canonical URLs and the sitemap.

## Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server at http://localhost:4321
npm run check        # TypeScript / Astro type check
npm test             # build + unit tests (no browser)
npm run test:e2e     # browser tests (builds and serves automatically)
npm run test:all     # everything
```

Before committing: `npm run check && npm test && npm run test:e2e` must pass. Never skip or weaken a
test to get green — fix the cause.

## Outstanding configuration (keep updated)

- [ ] `integrations.formEndpoint` — form currently NOT delivering submissions
- [ ] `contact.email` / `contact.phone` — not yet set
- [ ] `integrations.bookingUrl` — optional intro-call booking link
- [ ] Domain + `SITE_URL` (enables sitemap/canonical)
- [ ] Cloudflare Pages project connected to this repo
- [ ] Founder introduction on About page (true details only)
- [ ] Terms of service / privacy policy (cancellation notice period, data handling) — needs owner/legal input
