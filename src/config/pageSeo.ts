/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

import { HOME_SITE_META } from './site-meta';

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': { ...HOME_SITE_META },
  '/products/apex-legends-cheats/': {
    title: 'ESP & Aimbot – Apex Legends Tier Hub | ApexLegendCheats',
    description:
      'Player ESP, aimbot scripts and wallhack-style overlays on Lite, Pro and Elite—compare each tier’s module list before secure checkout.',
  },
  '/pricing/': {
    title: 'Apex Legends Cheat Pricing & Subscriptions | ApexLegendCheats',
    description:
      'How Apex Legends cheat pricing works on apexlegendcheats.com: module lists on tier pages, plan length and price at secure checkout. Links to subscription and purchase guides.',
  },
  '/features/': {
    title: 'Apex Legends Cheat Features | ESP, Aim Scripts & Tiers',
    description:
      'Features: see how ESP, aim scripts and overlays map to Lite, Pro and Elite—same module names as the tier pages, without extra marketing claims.',
  },
  '/products/apex-legends-cheats/utilities/': {
    title: 'Apex Legends Utilities | HWID, UGC & Skin Changer',
    description:
      'Compare HWID Spoofer, UGC and Skin Changer—when each utility fits with links to full Apex Legends product pages.',
  },
  '/blog/': {
    title: 'Guides – Apex Legends Setup, Patch Notes & Tips',
    description:
      'Setup guides, tier comparisons, patch-day checks and purchase tips for Apex Legends on PC—complementing the homepage overview.',
  },
  '/forum/': {
    title: 'Product Q&A – Apex Legends Install & Patch Archive',
    description:
      'Product: staff-written answers on tiers, installs, Season 31 updates and troubleshooting. Read-only archive—use Support for private order help.',
  },
  '/faq/': {
    title: 'FAQ – Tiers & Setup for Apex Legends Cheats',
    description:
      'FAQ: frequently asked questions on Lite, Pro and Elite modules, HWID utilities, checkout, bans, refunds and Windows setup for Apex Legends.',
  },
  '/terms/': {
    title: 'Terms & Conditions | ApexLegendCheats',
    description:
      'Purchase terms, license use, and refund policy for ApexLegendCheats products sold through apexlegendcheats.com.',
  },
  '/privacy/': {
    title: 'Privacy Policy | ApexLegendCheats',
    description:
      'How apexlegendcheats.com uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'ApexLegendCheats – About Apex Legends PC Guides & Tools',
    description:
      'ApexLegendCheats: who publishes tier comparisons, utilities and patch notes for Apex Legends on PC, and how support and status updates work.',
  },
  '/support/': {
    title: 'Support | ApexLegendCheats',
    description:
      'Get help with loader setup, HWID, and checkout for Apex Legends cheat tiers and utilities.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
