# Steadwell Studio

The website for Steadwell Studio, a Louisville web studio offering managed websites to small service
businesses, starting with automotive detailers. The project is also the starting point for
future client websites.

Built with [Astro](https://astro.build), TypeScript and plain CSS. The output is ordinary HTML files,
so it is fast and costs nothing to host on Cloudflare Pages's free plan.

> **Status:** in review on the branch `claude/steadwell-studio-website-tdru90`. It has **not** been
> published, and the contact form is **not connected yet** (see below).

---

## Pages

| Page | File | Address |
|---|---|---|
| Home | `src/pages/index.astro` | `/` |
| Services | `src/pages/services.astro` | `/services/` |
| Work (design concepts) | `src/pages/portfolio.astro` | `/portfolio/` |
| Pricing | `src/pages/pricing.astro` | `/pricing/` |
| About | `src/pages/about.astro` | `/about/` |
| FAQ | `src/pages/faq.astro` | `/faq/` |
| Contact / free preview | `src/pages/contact.astro` | `/contact/` |
| Thank you (after form) | `src/pages/thank-you.astro` | `/thank-you/` |

---

## Making everyday changes (from your iPhone)

You can edit text directly on GitHub in Safari or the GitHub app. No coding tools are needed.

1. Open the repository on github.com and switch to the branch you want to change.
2. Open the file (see the table below), tap the **pencil (Edit)** icon.
3. Change only the text **between the quote marks** `'like this'`.
4. Tap **Commit changes**. The automatic tests then run (see the **Actions** tab). A green tick means
   everything still works.

| To change… | Edit this file |
|---|---|
| Price, setup fee, commitment, update minutes | `src/config/site.ts` → `pricing` |
| Email, phone, service area, reply time | `src/config/site.ts` → `contact` |
| Form, booking or analytics connections | `src/config/site.ts` → `integrations` |
| Menu items | `src/config/site.ts` → `navigation` |
| What's included (services list) | `src/data/services.ts` |
| FAQ questions and answers | `src/data/faq.ts` |
| Portfolio / design concepts | `src/data/portfolio.ts` |
| Brand colours and fonts | `src/styles/global.css` (top of file) |

Tip: if a contact detail isn't ready, leave it as `''`. The site hides it instead of showing a
blank.

---

## ⚠️ Things that still need setting up

None of these involve putting passwords or keys in the code.

### 1. Preview request form (required before launch)
The form checks what people type, but **it does not send anywhere yet**. If someone fills it in, the
form tells them it isn't connected, so it never pretends a request was sent.

To connect it, choose a form service. **Formspree** is the simplest option: it has a free plan, and its
endpoint URL is public, so it's safe in code. Then:
1. Create a form in the service and copy its endpoint URL (looks like `https://formspree.io/f/abc123`).
2. Paste it into `integrations.formEndpoint` in `src/config/site.ts`.
3. Submit a test request and confirm the email arrives.

*Alternative:* a Cloudflare Pages Function that emails you via a service like Resend. This keeps
everything on Cloudflare, but it needs an API key stored as a Cloudflare **secret**, and more
setup. Ask for this if you prefer it.

### 2. Contact details
Add `contact.email` (and optionally `contact.phone`) in `src/config/site.ts`.

### 3. Booking link (optional)
If you use Cal.com, Calendly or similar for intro calls, paste the public link into
`integrations.bookingUrl`. A "Book a short intro call" link will appear on the Contact page.

### 4. Domain
Once you choose and register a domain (your decision, your account), add it in Cloudflare and set the
`SITE_URL` environment variable (see below). This switches on the sitemap and canonical links.

### 5. Content only you can provide
- A short, true founder introduction for the About page.
- Terms of service and a privacy policy. These cover things like the cancellation notice period and
  how form data is handled. Get legal advice before launch.

---

## Previewing and deploying with Cloudflare Pages (free)

You can do all of this from Safari on your iPhone. **Connecting Cloudflare is free, but please only do
it once you're happy to.** Nothing has been set up on your behalf.

1. Create a free account at **dash.cloudflare.com** (or sign in).
2. Go to **Workers & Pages → Create → Pages → Connect to Git**. Cloudflare's dashboard changes
   often, so the wording may differ slightly. Choose the Pages option that connects a Git
   repository.
3. Authorise GitHub and choose the **steadwell-studio** repository.
4. Use these build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION` = `22`
5. For **Production branch**, choose `main`.
6. Save and deploy.

Cloudflare then builds a **preview link** for every branch, including this review branch, at
an address like `https://claude-steadwell-studio-website-xxxx.steadwell-studio.pages.dev`. Open that
link on your iPhone to see the site exactly as visitors would.

**Going live** means merging the review branch into `main`. Then add your domain under the
project's **Custom domains** tab, and set `SITE_URL` (e.g. `https://www.yourdomain.com`) under
**Settings → Variables**.

> Preview addresses on `pages.dev` can be opened by anyone who has the link. They aren't listed
> anywhere, but treat them as semi-public.

---

## For developers

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev          # http://localhost:4321
npm run check        # type check
npm test             # build + unit/content tests (Node test runner)
npm run test:e2e     # Playwright: iPhone + desktop, axe accessibility, menu, FAQ, form
npm run test:all     # all of the above
```

GitHub Actions (`.github/workflows/ci.yml`) runs all checks on every push and pull request.

Project conventions, content rules and the component list are in **[CLAUDE.md](./CLAUDE.md)**.

### Reusing this for a client site
1. Copy the repository.
2. Replace `src/config/site.ts` and the files in `src/data/`.
3. Adjust the colour and type tokens at the top of `src/styles/global.css`.
4. Re-use or rearrange components in `src/components/`, then run the tests.
