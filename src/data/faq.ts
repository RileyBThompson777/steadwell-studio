import { pricing, formatPrice, business } from '../config/site';

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'What does the free design preview include?',
    answer:
      'For qualified businesses, we design a preview of your homepage using your name, services and the look we think suits you. There is no cost and no obligation. If you like it, we build the rest; if not, you owe nothing.',
  },
  {
    question: 'Who qualifies for a free preview?',
    answer: `Currently operating service businesses in or near ${business.city} that are ready to have a website within the next few months. We are starting with automotive detailers, but we are happy to hear from other local service businesses.`,
  },
  {
    question: 'What does it cost?',
    answer: `${formatPrice(pricing.monthly)} per month with a ${formatPrice(pricing.setupFee)} setup fee. The first ${pricing.commitmentMonths} months are a commitment, billed monthly. After that, the service continues month to month and you can cancel with notice.`,
  },
  {
    question: 'Why is there a three-month commitment?',
    answer:
      'Designing and building a site is most of the work, and it happens at the start. The short commitment lets us offer it without a setup fee.',
  },
  {
    question: 'What costs extra?',
    answer:
      'Premium third-party services may carry their own fees, for example a paid booking platform, a premium email inbox, licensed stock photography or domain registration. We will always tell you about any extra cost before anything is set up.',
  },
  {
    question: 'Do I own my domain name?',
    answer:
      'Yes. Your domain should be registered in your name. If you already have one, we connect it. If not, we help you register it in your own account.',
  },
  {
    question: 'What counts as a monthly update?',
    answer: `Content changes such as new prices, photos, service descriptions, hours or a seasonal promotion, up to ${pricing.includedUpdateMinutes} minutes of work each month. Bigger changes, like a new page or a redesign, are quoted first.`,
  },
  {
    question: 'How long does it take to launch?',
    answer:
      'It depends on how quickly we receive your photos and details. We will give you a realistic timeline once we have reviewed your preview together.',
  },
  {
    question: 'Will you guarantee I show up first on Google?',
    answer:
      'No. We set up the local search fundamentals properly and explain what helps, but no honest provider can guarantee rankings.',
  },
  {
    question: 'What happens if I cancel?',
    answer:
      'After the initial three months you can cancel at any time with notice. Your domain stays yours. We will discuss options for your content and site files at that point.',
  },
];
