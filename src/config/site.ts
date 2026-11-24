/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  STEADWELL STUDIO — BUSINESS SETTINGS
 *  This is the main file to edit when business details change.
 *  Everything on the website (prices, contact details, menus) reads from here.
 *
 *  Rules:
 *   • Never put passwords, API keys or secret tokens in this file.
 *   • Leave a value as an empty string "" if it is not ready yet — the website
 *     will hide that detail instead of showing something wrong.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const business = {
  name: 'Steadwell Studio',
  tagline: 'Websites for good local businesses',
  city: 'Louisville',
  region: 'Kentucky',
  regionShort: 'KY',
  /** Short description used in search results and link previews. */
  description:
    'Steadwell Studio designs, hosts and maintains websites for small service businesses in Louisville, Kentucky — starting with automotive detailers. $129 a month, no setup fee.',
  initialNiche: 'automotive detailing',
};

export const contact = {
  /** TODO(owner): add a business email once the domain/email is set up. */
  email: '',
  /** TODO(owner): optional business phone number, e.g. "(502) 555-0100". */
  phone: '',
  serviceArea: 'Louisville and the surrounding Kentuckiana area',
  /** Typical reply time shown near the form. Keep this a promise you can keep. */
  responseTime: 'within two business days',
};

export const pricing = {
  monthly: 129,
  setupFee: 0,
  currency: 'USD',
  /** Initial commitment in months, billed monthly. */
  commitmentMonths: 3,
  includedUpdateMinutes: 30,
  pages: 5,
  planName: 'The Steadwell Plan',
};

/** Derived values — do not edit; they update automatically. */
export const pricingDerived = {
  firstTermTotal: pricing.monthly * pricing.commitmentMonths,
};

export const offer = {
  primaryHeadline: 'Good business deserves a better website.',
  primaryCta: 'Request your free design preview',
  primaryCtaHref: '/contact/',
};

/**
 * Third-party integrations.
 * Each one stays switched off (empty) until it is configured.
 * See README.md → "Things that still need setting up".
 */
export const integrations = {
  /**
   * Where the preview request form sends submissions.
   * Leave empty until a form service is chosen (e.g. a Formspree or
   * Web3Forms endpoint URL, or a Cloudflare Pages Function such as "/api/preview").
   * When empty, the form shows a friendly "not connected yet" message
   * and does NOT pretend the request was sent.
   */
  formEndpoint: '',
  /** Optional public booking link (e.g. Cal.com or Calendly) for intro calls. */
  bookingUrl: '',
  /** Optional privacy-friendly analytics token (e.g. Cloudflare Web Analytics). Public token only. */
  cloudflareAnalyticsToken: '',
};

export const navigation = [
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/portfolio/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
] as const;

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(amount);
