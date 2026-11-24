// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * The public URL of the site, e.g. "https://www.example.com".
 * Set SITE_URL in Cloudflare (Settings → Variables) once a domain is chosen.
 * Until then the sitemap is skipped, because it needs absolute URLs.
 */
const site = process.env.SITE_URL || undefined;

export default defineConfig({
  site,
  // Static HTML output: works on Cloudflare Pages / Workers static assets with no adapter.
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: site ? [sitemap()] : [],
  devToolbar: { enabled: false },
});
