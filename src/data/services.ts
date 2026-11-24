/**
 * What every subscription includes. Shown on the Home, Services and Pricing pages.
 * Edit wording here; keep claims accurate to what is actually delivered.
 */
export interface Service {
  id: string;
  title: string;
  summary: string;
  detail: string;
}

export const services: Service[] = [
  {
    id: 'design',
    title: 'A five-page website, designed for you',
    summary: 'Home, services, about, gallery and contact — written and designed around your business.',
    detail:
      'We plan the structure, write clear copy with you and design every page to match your business. No off-the-shelf theme with your logo dropped in.',
  },
  {
    id: 'responsive',
    title: 'Built for phones first',
    summary: 'Most of your customers will find you on a phone. The site is designed for that screen first.',
    detail:
      'Every page is tested on small and large screens, with tap-friendly buttons, readable type and fast load times on mobile data.',
  },
  {
    id: 'hosting',
    title: 'Managed hosting and SSL',
    summary: 'Fast, secure hosting with an SSL certificate, handled for you.',
    detail:
      'We host the site on a global network, keep the security certificate current and watch for problems, so there is nothing for you to renew or patch.',
  },
  {
    id: 'forms',
    title: 'Contact and quote forms',
    summary: 'Simple forms that let customers ask for a quote without picking up the phone.',
    detail:
      'Forms are set up to ask the questions you need answered — vehicle type, service, preferred dates — and send enquiries straight to you.',
  },
  {
    id: 'booking',
    title: 'Online booking',
    summary: 'Connect the booking tool you already use, or we help you choose one.',
    detail:
      'We integrate a scheduling service so customers can book directly from your site. Some booking platforms charge their own subscription fee.',
  },
  {
    id: 'seo',
    title: 'Local search basics',
    summary: 'The groundwork that helps nearby customers find you on Google.',
    detail:
      'Page titles, descriptions, structured business details, a sitemap and guidance on your Google Business Profile. We do not promise rankings — nobody honest can.',
  },
  {
    id: 'reporting',
    title: 'A short monthly report',
    summary: 'Plain-English numbers: visits, enquiries and what we changed.',
    detail:
      'Each month you get a brief summary of how the site performed and any updates made, without jargon.',
  },
  {
    id: 'updates',
    title: '30 minutes of updates each month',
    summary: 'New prices, photos, seasonal offers — just send them over.',
    detail:
      'Up to 30 minutes of content changes every month are included. Larger projects are quoted separately before any work begins.',
  },
  {
    id: 'support',
    title: 'Maintenance and support',
    summary: 'Ongoing care so the site keeps working while you keep working.',
    detail:
      'Software updates, uptime checks, backups and a real person to talk to when something needs attention.',
  },
];

export interface ProcessStep {
  title: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Request a preview',
    text: 'Tell us about your business. If it is a good fit, we design a homepage preview at no cost.',
  },
  {
    title: 'Review together',
    text: 'We walk through the preview, gather your photos and details, and agree on the five pages.',
  },
  {
    title: 'Build and launch',
    text: 'We build, test and launch the site on your domain. You approve everything before it goes live.',
  },
  {
    title: 'Ongoing care',
    text: 'Hosting, updates, reports and support continue month to month after the first three months.',
  },
];
