/**
 * Build-output tests. Run with `npm test` (builds first, then checks dist/).
 * These use only Node's built-in test runner — no browser needed.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pricing, offer, formatPrice, navigation, integrations } from '../../src/config/site.ts';
import { projects } from '../../src/data/portfolio.ts';
import { validatePreviewForm } from '../../src/scripts/form-validation.ts';

const DIST = join(import.meta.dirname, '../../dist');
const PAGES = ['/', '/services/', '/portfolio/', '/pricing/', '/about/', '/faq/', '/contact/'];

const fileFor = (path: string) => join(DIST, path, 'index.html');
const html = (path: string) => readFileSync(fileFor(path), 'utf8');
const text = (path: string) =>
  html(path)
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;|&rsquo;|’/g, "'")
    .replace(/\s+/g, ' ');

describe('every required page is built', () => {
  for (const path of [...PAGES, '/thank-you/']) {
    test(`${path} exists`, () => assert.ok(existsSync(fileFor(path)), `missing ${fileFor(path)}`));
  }
  test('404 page exists', () => assert.ok(existsSync(join(DIST, '404.html'))));
});

describe('page basics (SEO and accessibility)', () => {
  for (const path of PAGES) {
    test(`${path} has lang, title, description, one h1, skip link and main landmark`, () => {
      const h = html(path);
      assert.match(h, /<html lang="en"/);
      assert.match(h, /<title>[^<]{10,}<\/title>/);
      assert.match(h, /<meta name="description" content="[^"]{40,}"/);
      assert.equal((h.match(/<h1[\s>]/g) ?? []).length, 1, 'exactly one <h1>');
      assert.match(h, /class="skip-link" href="#main"/);
      assert.match(h, /<main id="main"/);
      assert.match(h, /name="viewport" content="width=device-width, initial-scale=1"/);
    });
  }

  test('page titles are unique', () => {
    const titles = PAGES.map((p) => html(p).match(/<title>(.*?)<\/title>/)?.[1]);
    assert.equal(new Set(titles).size, titles.length);
  });

  test('all images have alt text', () => {
    for (const path of PAGES) {
      for (const img of html(path).match(/<img\b[^>]*>/g) ?? []) {
        assert.match(img, /\salt=/, `${path}: ${img}`);
      }
    }
  });
});

describe('internal links', () => {
  test('every internal link points at a built page', () => {
    const broken: string[] = [];
    for (const path of PAGES) {
      for (const [, href] of html(path).matchAll(/href="(\/[^"#?]*)"/g)) {
        if (href.startsWith('/_astro/') || /\.\w+$/.test(href)) continue;
        if (!existsSync(fileFor(href))) broken.push(`${path} → ${href}`);
      }
    }
    assert.deepEqual(broken, []);
  });

  test('navigation includes every main section', () => {
    const home = html('/');
    for (const item of navigation) assert.ok(home.includes(`href="${item.href}"`), item.href);
  });
});

describe('business content', () => {
  test('homepage shows the primary headline and call to action', () => {
    assert.match(text('/'), /Good business deserves a better website\./);
    assert.ok(text('/').includes(offer.primaryCta));
    assert.equal(offer.primaryHeadline, 'Good business deserves a better website.');
  });

  test('pricing page matches config', () => {
    const t = text('/pricing/');
    assert.ok(t.includes(formatPrice(pricing.monthly)), 'monthly price');
    assert.ok(t.includes(`${pricing.commitmentMonths} months, billed monthly`), 'commitment');
    assert.match(t, /Month to month/);
    assert.match(t, /third-party services/i);
  });

  test('current business terms are as agreed', () => {
    assert.equal(pricing.monthly, 129);
    assert.equal(pricing.setupFee, 0);
    assert.equal(pricing.commitmentMonths, 3);
    assert.equal(pricing.pages, 5);
    assert.equal(pricing.includedUpdateMinutes, 30);
  });

  test('every portfolio concept is labelled as a design concept', () => {
    const h = html('/portfolio/');
    const concepts = projects.filter((p) => p.kind === 'concept');
    const labels = h.match(/data-testid="project-label"[^>]*>Design concept · fictional business</g) ?? [];
    assert.equal(labels.length, concepts.length);
    assert.match(text('/portfolio/'), /fictional business/);
  });

  test('no fabricated social proof', () => {
    const banned = /testimonial|five[- ]star|5[- ]star|trusted by|clients served|happy customers|award[- ]winning|certified/i;
    for (const path of PAGES) assert.doesNotMatch(text(path), banned, path);
  });
});

describe('preview request form', () => {
  const h = html('/contact/');

  test('every form control has a matching label', () => {
    const ids = [...h.matchAll(/<(?:input|select|textarea)\b[^>]*\sid="([^"]+)"/g)].map((m) => m[1]);
    assert.ok(ids.length >= 8, 'expected the full form');
    for (const id of ids) assert.ok(h.includes(`for="${id}"`), `no <label for="${id}">`);
  });

  test('has a spam honeypot and a live status region', () => {
    assert.match(h, /name="_gotcha"/);
    assert.match(h, /role="status"/);
  });

  test('form endpoint state is reflected honestly', () => {
    if (!integrations.formEndpoint) {
      assert.match(h, /data-endpoint(=""|[\s>])/);
      assert.doesNotMatch(h, /<form[^>]*\saction=/);
    } else {
      assert.ok(h.includes(`data-endpoint="${integrations.formEndpoint}"`));
    }
  });
});

describe('form validation rules', () => {
  const valid = {
    name: 'Sam',
    email: 'sam@example.com',
    business: 'Example Detailing',
    business_type: 'Automotive detailing',
    area: 'Louisville',
    operating: 'Yes, taking customers now',
  };

  test('accepts a complete request', () => assert.deepEqual(validatePreviewForm(valid), {}));

  test('requires the key fields', () => {
    const errors = validatePreviewForm({});
    assert.deepEqual(Object.keys(errors).sort(), ['area', 'business', 'business_type', 'email', 'name', 'operating']);
  });

  test('rejects a malformed email', () => {
    assert.ok(validatePreviewForm({ ...valid, email: 'not-an-email' }).email);
  });

  test('ignores whitespace-only answers', () => {
    assert.ok(validatePreviewForm({ ...valid, name: '   ' }).name);
  });
});

describe('security hygiene', () => {
  test('no obvious secrets in the config file', () => {
    const src = readFileSync(join(import.meta.dirname, '../../src/config/site.ts'), 'utf8');
    assert.doesNotMatch(src, /(sk_live|sk_test|re_[A-Za-z0-9]{20}|api[_-]?key\s*[:=]\s*['"][^'"]+)/i);
  });

  test('Cloudflare headers file is published', () => {
    assert.ok(existsSync(join(DIST, '_headers')));
  });
});

describe('house style', () => {
  test('no em dashes in visible page copy', () => {
    for (const path of PAGES) assert.doesNotMatch(text(path), /—/, path);
  });
});
