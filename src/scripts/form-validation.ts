/**
 * Validation rules for the design preview request form.
 * Kept free of browser APIs so it can be unit-tested and reused
 * (for example in a future Cloudflare Pages Function).
 */
export type FormValues = Record<string, string | undefined>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validatePreviewForm(values: FormValues): Record<string, string> {
  const v = (key: string) => (values[key] ?? '').toString().trim();
  const errors: Record<string, string> = {};

  if (!v('name')) errors.name = 'Please enter your name.';
  if (!v('email')) errors.email = 'Please enter your email address.';
  else if (!EMAIL.test(v('email'))) errors.email = 'Please enter a valid email address, like name@example.com.';
  if (!v('business')) errors.business = 'Please enter your business name.';
  if (!v('business_type')) errors.business_type = 'Please choose the type of business.';
  if (!v('area')) errors.area = 'Please enter your city or service area.';
  if (!v('operating')) errors.operating = 'Please let us know if the business is operating.';

  return errors;
}
