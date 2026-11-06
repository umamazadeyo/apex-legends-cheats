import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup'
  | 'pricing'
  | 'purchase'
  | 'support';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const elite = link('Apex Legends Elite', productPath('elite'));
const lite = link('Lite', productPath('lite'));
const pro = link('Pro', productPath('pro'));
const productsHub = link('Apex Legends products', ROUTES.products);
const pricingHub = link('Pricing overview', ROUTES.pricing);
const featuresHub = link('Features overview', ROUTES.features);
const hwid = link('HWID Spoofer', productPath('hwid-spoofer'));
const ugc = link('UGC', productPath('ugc'));
const skin = link('Skin Changer', productPath('unlock-all'));
const faqPage = link('FAQ', ROUTES.faq);
const blog = link('Blog', ROUTES.blog);
const terms = link('Terms & Conditions', ROUTES.terms);
const supportPage = link('Support', ROUTES.support);

/** Twenty site FAQs — copy matches the product/term text on apexlegendcheats.com. */
export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'spec-01-products-available',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Which Apex Legends products are available on ApexLegendCheats.com?',
    a: `${productsHub} lists <strong>Lite</strong>, <strong>Pro</strong>, <strong>Elite</strong>, plus utilities: ${hwid}, ${ugc} and ${skin}. Each page prints the module list we sell—if a module is not on that page, it is not part of that product.`,
  },
  {
    id: 'spec-02-season-31',
    topic: 'setup',
    icon: 'faqVacUpdate',
    q: 'Are the products compatible with Apex Legends Season 31: Cipher?',
    a: `Treat <strong>Season 31: Cipher</strong> like any other live patch: read Respawn’s notes, then check the <strong>homepage status banner</strong> and Discord <strong>#status</strong> before you launch. We do not guarantee compatibility on unreleased builds; after Cipher ships, use the portal build staff mark as online.`,
  },
  {
    id: 'spec-03-steam',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Does the product support the Steam version of Apex Legends?',
    a: a(
      'Yes—product pages list Apex Legends on Windows through Steam when the live status shows an online build. Still repair the client if vanilla Apex fails before you troubleshoot the loader.',
    ),
  },
  {
    id: 'spec-04-ea-app',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Does the product support the EA app version of Apex Legends?',
    a: a(
      'Yes—the same Windows requirement blocks list the EA app path. Follow the portal launch order for whichever client you use.',
    ),
  },
  {
    id: 'spec-05-windows',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which Windows versions are supported?',
    a: `Supported editions are <strong>64-bit Windows 10 and Windows 11</strong> as printed in each product’s system requirements. Older builds, ARM-only PCs, or non-Windows OS installs are outside what the pages document.`,
  },
  {
    id: 'spec-06-modes',
    topic: 'plans',
    icon: 'faqTurboRanked',
    q: 'Are all Apex Legends game modes supported?',
    a: `Documentation targets the <strong>standard PC playlists</strong> you can enter with a supported client. Limited-time modes, labs or experimental queues can change after hotfixes—test in firing range or casual after each patch, and read patch notes for Season 31 updates such as <strong>ranked legend bans</strong> or <strong>map rotations</strong>.`,
  },
  {
    id: 'spec-07-aimbot',
    topic: 'scripts',
    icon: 'faqWhichTierScripts',
    q: 'What is included in the Apex Legends aimbot product?',
    a: `“Aimbot” searches map to the <strong>script stack</strong> we list on ${pro} and ${elite}: Auto Combo, movement assist, Smart Cast with Prediction, Target Selector, Activator and related rows on those pages. ${lite} does <strong>not</strong> list that engine—choose Pro or Elite when you need those modules.`,
  },
  {
    id: 'spec-08-esp-display',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What does the Apex Legends ESP product display?',
    a: `ESP layers match the bullet lists on ${lite} (and carry through higher tiers): legend boxes, minimap overlay, distance readouts, ring context, stream-proof mode and other rows printed there. For a feature-style map of names like wallhack or radar, open ${featuresHub}.`,
  },
  {
    id: 'spec-09-radar-esp',
    topic: 'esp',
    icon: 'faqZoomHack',
    q: 'Are Apex Legends radar and ESP separate products or included features?',
    a: `There is no separate “radar-only” SKU on this site—<strong>minimap / radar-style overlays</strong> sit inside the ESP stack on ${productsHub}. If the product page does not list a standalone radar product, assume it is part of the tier’s awareness modules.`,
  },
  {
    id: 'spec-10-patch-updates',
    topic: 'setup',
    icon: 'faqVacUpdate',
    q: 'Are Apex Legends product features updated after major game patches?',
    a: a(
      'Yes, modules can change when Respawn or Easy Anti-Cheat ship updates. Always pull the newest loader from your portal after a patch and re-read the tier page if notes change.',
    ),
  },
  {
    id: 'spec-11-subscription-plans',
    topic: 'pricing',
    icon: 'faqComparePlans',
    q: 'What Apex Legends subscription plans are available?',
    a: `<strong>Plan names, prices and durations</strong> are shown on the <strong>external checkout</strong> when you click through from ${productsHub}. This site does not duplicate those numbers—read the payment page carefully, or ask in Discord before paying. ${pricingHub} explains that split.`,
  },
  {
    id: 'spec-12-how-purchase',
    topic: 'purchase',
    icon: 'faqAfterBuy',
    q: 'How do I purchase an Apex Legends product?',
    a: `Choose a tier or utility on ${productsHub}, then continue through <strong>secure checkout</strong> from that page. ApexLegendCheats.com does not host the card form—see our ${terms} for how checkout works.`,
  },
  {
    id: 'spec-13-access-after',
    topic: 'purchase',
    icon: 'faqAfterBuy',
    q: 'How do I receive access after purchasing?',
    a: a(
      'After payment completes, follow the operator portal and setup guide linked from your order flow to download the supported loader. Do not install files from random links or DMs.',
    ),
  },
  {
    id: 'spec-14-subscription-status',
    topic: 'purchase',
    icon: 'faqLicenseMove',
    q: 'How can I check my subscription or purchase status?',
    a: a(
      'Use the email from checkout and the operator portal session described in your confirmation flow. If you cannot sign in, contact support with your order email—do not post transaction IDs publicly.',
    ),
  },
  {
    id: 'spec-15-payment-failed',
    topic: 'purchase',
    icon: 'faqDiscordHelp',
    q: 'What should I do if my purchase or payment is unsuccessful?',
    a: a(
      'Retry from the same product page, confirm your bank or processor did not block the charge, then open a ticket through Support with timestamps and any error text the checkout shows.',
    ),
  },
  {
    id: 'spec-16-ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can using third-party cheats result in an Apex Legends account ban?',
    a: a(
      'Yes. Third-party software can break EA’s rules and anti-cheat policies. You can lose access to your account or face other enforcement—we do not describe that risk as “safe” or “only cosmetic.”',
    ),
  },
  {
    id: 'spec-17-no-guarantee',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Does ApexLegendCheats guarantee that an account will never be banned?',
    a: a(
      'No. We never promise undetected or ban-proof use. Follow the live status banner, use conservative settings, and stop if builds are offline or testing.',
    ),
  },
  {
    id: 'spec-18-compat-after-update',
    topic: 'setup',
    icon: 'faqVacUpdate',
    q: 'What should I do if an Apex Legends update causes compatibility problems?',
    a: a(
      'Check vanilla Apex first. If the game alone fails, repair Steam or the EA app. If only the loader fails, read Discord #status, download the newest portal build, and open Support with patch numbers and error text.',
    ),
  },
  {
    id: 'spec-19-report-issue',
    topic: 'support',
    icon: 'faqDiscordHelp',
    q: 'How do I report a product issue?',
    a: `Use ${supportPage} or Discord with your <strong>order email</strong>, Windows version, Steam or EA client build, Apex patch version, and screenshots of the error. See the forum thread “What should I include when reporting an installation error?” for a checklist.`,
  },
  {
    id: 'spec-20-refund',
    topic: 'support',
    icon: 'faqMore',
    q: 'How can I request a refund?',
    a: `Refund rules are spelled out in ${terms}: sales are final in most cases, with limited exceptions when support confirms a fault on a supported setup. Contact ${supportPage} with order details—never share card numbers in public channels.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    [
      'spec-01-products-available',
      'spec-11-subscription-plans',
      'spec-12-how-purchase',
      'spec-16-ban-risk',
      'spec-17-no-guarantee',
      'spec-18-compat-after-update',
    ].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs;
}

/** Shared FAQ block copy + filters (home, /faq/, products, blog). */
export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Filter products, setup, ESP, scripts, pricing, purchases, safety and support.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'products',
  'setup',
  'esp',
  'scripts',
  'plans',
  'pricing',
  'purchase',
  'safety',
  'support',
  'blog',
];

/** Section copy when FAQ list is scoped to the current page (not /faq/). */
export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter(
    (f) => !f.scopes && ['setup', 'safety', 'plans', 'esp', 'scripts', 'pricing', 'purchase'].includes(f.topic),
  );
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const tierCompare = siteFaqs.filter((f) =>
    ['spec-10-patch-updates', 'spec-16-ban-risk', 'spec-17-no-guarantee', 'spec-08-esp-display'].includes(f.id),
  );

  const combined =
    kind === 'tier'
      ? [...scoped, ...tierCompare, ...general.slice(0, 8)]
      : [...scoped, ...general.slice(0, 6)];

  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Guides: [
    {
      id: 'blog-guide-start',
      topic: 'blog',
      icon: 'faqBlogGuideStart',
      q: 'Should I enable modules in ranked before testing?',
      a: a('No. Test in firing range or casual playlists first. Ranked queues are for stable profiles only.'),
    },
    {
      id: 'blog-guide-tier',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Which tier matches this guide?',
      a: `Awareness-focused guides → ${lite}. Script guides → ${pro}. Automation and Skin Changer topics → ${elite} when those modules appear on the Elite page.`,
    },
    {
      id: 'blog-guide-status',
      topic: 'blog',
      icon: 'faqBlogGuideStatus',
      q: 'Is this guide still valid after a patch?',
      a: a('Check the article date and the live status banner. Discord #status lists the newest loader builds.'),
    },
  ],
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download the loader?',
      a: a('Only from your operator portal after checkout—not from links in email spam or DMs.'),
    },
    {
      id: 'blog-setup-lobby',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Should I test outside ranked first?',
      a: a('Yes. Load conservative presets in firing range or casual before ranked playlists.'),
    },
  ],
  Security: [
    {
      id: 'blog-sec-vac',
      topic: 'blog',
      icon: 'faqBlogSecVac',
      q: 'Does this article guarantee undetected status?',
      a: a('No article replaces the live status banner. Stop if status shows testing or offline.'),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official product documentation?',
    a: `Articles explain workflows and link to ${lite}, ${pro}, ${elite} and ${productsHub}. Feature lists on product pages are authoritative for checkout.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying this guide?',
    a: a('Open Discord with your order email and the article slug. Staff reference the same portal presets mentioned in guides.'),
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings in this article work next patch?',
    a: a('Re-check status after every Apex Legends update. Reload portal presets instead of copying old sliders blindly.'),
  },
];

export function getBlogFaqs(tag: string, slug: string): SiteFaqItem[] {
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('esp') || slug.includes('map') || slug.includes('awareness') || slug.includes('wallhack')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which tier covers ESP from this article?',
      a: `${lite} includes legend ESP and minimap overlays. ${pro} adds combat scripts on the same stack.`,
    });
  }
  if (slug.includes('script') || slug.includes('combo') || slug.includes('aim') || slug.includes('trigger')) {
    slugHints.push({
      id: 'blog-slug-scripts',
      topic: 'scripts',
      icon: 'faqBlogSlugScripts',
      q: 'Which tier includes the scripts in this article?',
      a: `${pro} and ${elite} ship Auto Combo and related modules when listed. ${lite} is ESP-focused without those scripts.`,
    });
  }
  if (slug.includes('hwid') || slug.includes('ban') || slug.includes('anti-cheat') || slug.includes('eac')) {
    slugHints.push({
      id: 'blog-slug-hwid',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Does this article replace HWID or UGC products?',
      a: `Recovery guides complement ${hwid} and ${ugc}—read those product pages for workflow scope and realistic outcomes.`,
    });
  }

  return [...slugHints, ...topicFaqs, ...defaultBlogFaqs].slice(0, 8);
}

export const compareRows = [
  { feature: 'Player ESP & legend boxes', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Ability & hazard indicators', icon: 'compareAbilityIndicators' as const, lite: true, pro: true, elite: true },
  { feature: 'Ring and objective context', icon: 'compareRuneTimer' as const, lite: true, pro: true, elite: true },
  { feature: 'Extended view', icon: 'compareZoomHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Streamproof overlay', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
  { feature: 'Minimap hack overlay', icon: 'compareMinimapHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Auto Combo scripts', icon: 'compareAutoCombo' as const, lite: false, pro: true, elite: true },
  { feature: 'Movement assist & Smart Cast', icon: 'compareMovementSmartCast' as const, lite: false, pro: true, elite: true },
  { feature: 'Target Selector', icon: 'compareTargetSelector' as const, lite: false, pro: true, elite: true },
  { feature: 'Activator (shield swap / heal / ordnance)', icon: 'compareActivator' as const, lite: false, pro: true, elite: true },
  { feature: 'Ability radius drawing', icon: 'compareAbilityRadius' as const, lite: false, pro: true, elite: true },
  { feature: 'Smoke alert integration', icon: 'compareSmokeAlert' as const, lite: false, pro: true, elite: true },
  { feature: 'Auto Farm Bot', icon: 'compareAutoFarm' as const, lite: false, pro: false, elite: true },
  { feature: 'Auto Kill Steal', icon: 'compareAutoKillSteal' as const, lite: false, pro: false, elite: true },
  { feature: 'Quick execute (elite)', icon: 'compareQuickExecute' as const, lite: false, pro: false, elite: true },
  { feature: 'Full map hack suite', icon: 'compareFullMapHack' as const, lite: false, pro: false, elite: true },
  { feature: 'Skin Changer (Unlock All)', icon: 'compareSkinChanger' as const, lite: false, pro: false, elite: true },
  { feature: 'Priority patch queue', icon: 'comparePriorityPatch' as const, lite: false, pro: false, elite: true },
  { feature: 'Direct dev Discord support', icon: 'compareDevSupport' as const, lite: false, pro: false, elite: true },
  { feature: 'Cloud config backup', icon: 'compareCloudBackup' as const, lite: true, pro: true, elite: true },
];
