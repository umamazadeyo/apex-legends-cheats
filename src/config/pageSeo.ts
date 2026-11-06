/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Apex Legends Cheats, ESP & Scripts | ApexLegendCheats',
    description:
      'Explore Apex Legends cheats for PC, including Legend ESP, minimap overlays, scripts and Auto Combo tools. Compare available tiers, features and compatibility with Steam and the EA app on Windows 10/11.',
  },
  '/products/apex-legends-cheats/': {
    title: 'Buy Apex Legends Cheats | Lite, Pro & Elite',
    description:
      'Buy Apex Legends cheat access: compare Lite (ESP & awareness), Pro (scripts) and Elite on the product hub. Utilities: HWID Spoofer, UGC, Skin Changer.',
  },
  '/pricing/': {
    title: 'Apex Legends Cheat Pricing & Subscriptions | ApexLegendCheats',
    description:
      'How Apex Legends cheat pricing works on apexlegendcheats.com: module lists on tier pages, plan length and price at secure checkout. Links to subscription and purchase guides.',
  },
  '/features/': {
    title: 'Apex Legends Cheat Features | ESP, Aim Scripts & Tiers',
    description:
      'Map Apex Legends cheat features (ESP, wallhack-style overlays, aim scripts, radar) to Lite, Pro and Elite using the same comparison table as the product hub.',
  },
  '/products/apex-legends-cheats/elite/': {
    title: 'Apex Legends Elite Cheats | Full Feature Build',
    description:
      'Elite tier: the full module list on the product page—automation, map hack suite, Skin Changer and priority patch delivery when available.',
  },
  '/products/apex-legends-cheats/utilities/': {
    title: 'Apex Legends Utilities | HWID, UGC & Skin Changer',
    description:
      'Compare HWID Spoofer, UGC and Skin Changer—when each utility fits with links to full Apex Legends product pages.',
  },
  '/blog/': {
    title: 'Apex Legends Cheat Guides | Comparisons & Patch Updates',
    description:
      'Fifteen guides: compare Apex Legends cheats and pricing, aimbot and ESP articles, Season 31 notes, purchase and subscription help—linked to live product pages.',
  },
  '/forum/': {
    title: 'Apex Legends Forum | Product & Support Q&A',
    description:
      'Read staff-written Q&A on Apex Legends products, installation, Season updates, and feedback—posting is disabled on-site.',
  },
  '/faq/': {
    title: 'FAQ | Apex Legends Cheats, Products & Setup',
    description:
      'Answers on cheat tiers, ESP, aim assist scripts, HWID tools, checkout, and guides at apexlegendcheats.com.',
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
    title: 'About ApexLegendCheats',
    description:
      'What ApexLegendCheats publishes: Apex Legends cheat tiers, utilities, guides, and status notes.',
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
