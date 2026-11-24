import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/services/', '/portfolio/', '/pricing/', '/about/', '/faq/', '/contact/'];

test.describe('every page', () => {
  // Fade-in animations briefly lower text opacity, which the contrast checker
  // would misread. Reduced motion shows the final, real colours.
  test.use({ reducedMotion: 'reduce' });
  for (const path of PAGES) {
    test(`${path} loads, has no accessibility violations and no sideways scrolling`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, 'page is wider than the screen').toBeLessThanOrEqual(1);

      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
});

test('homepage headline and call to action', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Good business deserves a better website.');
  await page.getByRole('main').getByRole('link', { name: 'Request your free design preview' }).first().click();
  await expect(page).toHaveURL(/\/contact\/$/);
});

test('mobile menu opens, navigates and closes with Escape', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Pricing' }).click();
  await expect(page).toHaveURL(/\/pricing\/$/);
  await expect(page.getByTestId('monthly-price')).toHaveText('$129');
});

test('FAQ answers expand', async ({ page }) => {
  await page.goto('/faq/');
  const first = page.locator('details').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
});

test.describe('preview request form', () => {
  test('shows errors for missing required fields', async ({ page }) => {
    await page.goto('/contact/');
    await page.getByRole('button', { name: 'Request your free design preview' }).click();
    await expect(page.getByText('Please enter your name.')).toBeVisible();
    await expect(page.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByLabel('Your name')).toBeFocused();
  });

  test('never claims success while the form is not connected', async ({ page }) => {
    await page.goto('/contact/');
    const endpoint = await page.locator('form[data-preview-form]').getAttribute('data-endpoint');
    test.skip(!!endpoint, 'form endpoint is configured');

    await page.getByLabel('Your name').fill('Test Person');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Business name').fill('Example Detailing');
    await page.getByLabel('Type of business').selectOption('Automotive detailing');
    await page.getByLabel('City or service area').fill('Louisville');
    await page.getByLabel('Is the business currently operating?').selectOption({ index: 1 });
    await page.getByRole('button', { name: 'Request your free design preview' }).click();

    await expect(page.getByRole('status')).toContainText('not connected yet');
    await expect(page).toHaveURL(/\/contact\/$/);
  });
});
