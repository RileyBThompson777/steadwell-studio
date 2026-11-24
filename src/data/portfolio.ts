/**
 * Portfolio entries.
 *
 * IMPORTANT: Every entry below is a DESIGN CONCEPT for a FICTIONAL business.
 * They are not real clients and must always be labelled as concepts.
 * When real client work exists (with the client's permission), add it with
 * `kind: 'client'` and remove or keep the concepts as appropriate.
 */
export interface Project {
  slug: string;
  kind: 'concept' | 'client';
  name: string;
  industry: string;
  summary: string;
  focus: string[];
  /** Colours used to draw the illustrated mock-up (not a photo). */
  palette: { bg: string; ink: string; accent: string };
  layout: 'split' | 'stacked' | 'gallery';
}

export const projects: Project[] = [
  {
    slug: 'mobile-detailing-concept',
    kind: 'concept',
    name: 'Mobile detailing service',
    industry: 'Automotive detailing',
    summary:
      'A homepage concept for a fictional mobile detailer that comes to the customer. The design leads with service area and a quick quote form so a phone visitor can ask for a price in under a minute.',
    focus: ['Quote form above the fold', 'Service-area map section', 'Package comparison'],
    palette: { bg: '#E9E6DC', ink: '#1F2A24', accent: '#3E5A48' },
    layout: 'split',
  },
  {
    slug: 'ceramic-coating-concept',
    kind: 'concept',
    name: 'Paint correction & ceramic coating studio',
    industry: 'Automotive detailing',
    summary:
      'A concept for a fictional high-end studio. Large before-and-after imagery, a calm dark palette and a clear explanation of each coating tier and its care plan.',
    focus: ['Before-and-after gallery', 'Tiered packages', 'Booking deposit flow'],
    palette: { bg: '#1E1F1D', ink: '#F4F1E8', accent: '#A5AE9E' },
    layout: 'gallery',
  },
  {
    slug: 'fleet-detailing-concept',
    kind: 'concept',
    name: 'Fleet & dealership detailing',
    industry: 'Automotive detailing (B2B)',
    summary:
      'A concept for a fictional business serving dealerships and company fleets. Plain language, recurring service schedules and a simple request-a-proposal form.',
    focus: ['Recurring service plans', 'Proposal request form', 'Service checklist'],
    palette: { bg: '#F4F1E8', ink: '#252525', accent: '#24392D' },
    layout: 'stacked',
  },
];
