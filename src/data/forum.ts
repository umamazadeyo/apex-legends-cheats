export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'Product Questions & Discussions', tone: 'purple', icon: 'layers' },
  { name: 'Installation & Technical Support', tone: 'blue', icon: 'settings' },
  { name: 'Apex Legends Updates', tone: 'orange', icon: 'refresh' },
  { name: 'Customer Feedback', tone: 'green', icon: 'messageCircle' },
] as const;

const productsPath = '/products/apex-legends-cheats/';

/** Staff-written reference topics; on-site posting and voting stay disabled (see forum pages). */
function staffThread(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  flair: string;
  relatedTopic: string;
  body: string[];
  sourceTitle?: string;
  sourcePath?: string;
}): ForumPost {
  return {
    slug: input.slug,
    category: input.category,
    categoryTone: input.categoryTone,
    title: input.title,
    excerpt: input.excerpt,
    author: 'staff',
    age: 'Reference',
    commentsCount: 0,
    upvotes: 0,
    flair: input.flair,
    body: input.body,
    comments: [],
    sourceTitle: input.sourceTitle,
    sourcePath: input.sourcePath,
  };
}

export const forumPosts: ForumPost[] = [
  staffThread({
    slug: 'apex-legends-product-features-available',
    category: 'Product Questions & Discussions',
    categoryTone: 'purple',
    title: 'Which Apex Legends tier modules are currently available?',
    excerpt: 'Use the live tier pages as the source of truth—this thread summarizes how to read Lite, Pro and Elite lists.',
    flair: 'Apex Legends cheat features',
    relatedTopic: 'Apex Legends cheat features',
    sourceTitle: 'Apex Legends Cheats: Compare Available Products and Features',
    sourcePath: '/blog/apex-legends-cheats-compare-available-products-and-features/',
    body: [
      'Every module ships under a tier name on apexlegendcheats.com. Open the Lite, Pro and Elite tier pages and scroll to the full module list—marketing copy elsewhere restates that same list.',
      'If a module is not printed on your tier page, assume it is unavailable for that license until the page changes.',
    ],
  }),
  staffThread({
    slug: 'apex-product-plans-difference',
    category: 'Product Questions & Discussions',
    categoryTone: 'purple',
    title: 'What is the difference between the available Apex tier plans?',
    excerpt: 'Lite focuses on ESP and overlays; Pro adds scripts; Elite lists the remaining automation and cosmetic tools.',
    flair: 'Apex cheats comparison',
    relatedTopic: 'Apex cheats comparison',
    sourceTitle: 'Best Apex Legends Cheats: Product Comparison and Buying Guide',
    sourcePath: '/blog/best-apex-legends-cheats-product-comparison-buying-guide/',
    body: [
      `Lite covers awareness-style modules (legend ESP, minimap overlay, extended view, stream proof) as enumerated on [Lite](${productsPath}lite/).`,
      `Pro inherits Lite and adds script engines such as Auto Combo, movement assist and Smart Cast where listed on [Pro](${productsPath}pro/).`,
      `Elite includes the full stack on its page—including automation and Skin Changer only when they appear on [Elite](${productsPath}elite/).`,
    ],
  }),
  staffThread({
    slug: 'apex-season-31-cipher-compatibility',
    category: 'Apex Legends Updates',
    categoryTone: 'orange',
    title: 'Does the current build support Season 31: Cipher?',
    excerpt: 'Season numbering tracks the live game—confirm the banner and Discord #status after Respawn ships Cipher.',
    flair: 'Apex Season 31 compatibility',
    relatedTopic: 'Apex Season 31 compatibility',
    body: [
      'We do not pre-claim compatibility with unreleased builds. When Season 31: Cipher is live, check the homepage status banner and Discord #status for the loader revision that matches that patch.',
      'If the banner shows testing or offline, finish your session without third-party modules until staff publish an “online” note.',
    ],
  }),
  staffThread({
    slug: 'apex-steam-ea-app-compatibility',
    category: 'Installation & Technical Support',
    categoryTone: 'blue',
    title: 'Is the cheat compatible with Steam and the EA app?',
    excerpt: 'Windows clients are supported; follow the portal guide for whichever launcher you use.',
    flair: 'Apex Steam compatibility',
    relatedTopic: 'Apex Steam compatibility',
    sourceTitle: 'Apex Legends Cheats for PC: Compatibility and Requirements',
    sourcePath: '/blog/apex-legends-cheats-for-pc-compatibility-requirements/',
    body: [
      'Tier pages state support for Apex Legends on Windows through Steam or the EA app. The portal describes any required launch order for each client.',
      'Switching launchers on the same machine may require separate portal profiles so configs do not collide.',
    ],
  }),
  staffThread({
    slug: 'apex-cheats-windows-compatibility',
    category: 'Installation & Technical Support',
    categoryTone: 'blue',
    title: 'Which Windows versions are supported?',
    excerpt: 'Match the system requirements block on each tier page before installing the loader.',
    flair: 'Apex cheats PC compatibility',
    relatedTopic: 'Apex cheats PC compatibility',
    body: [
      'Supported editions are the 64-bit Windows 10 and Windows 11 builds listed with each tier. Older or ARM SKUs are outside the documented requirements.',
      'Run Windows Update and chipset drivers before troubleshooting loader issues—many “failed to attach” cases are stale graphics or chipset packages.',
    ],
  }),
  staffThread({
    slug: 'apex-cheat-updates-after-patch',
    category: 'Installation & Technical Support',
    categoryTone: 'blue',
    title: 'How are tier updates delivered after an Apex patch?',
    excerpt: 'Expect portal builds and Discord announcements—reload the loader instead of reusing an old installer.',
    flair: 'Apex cheat updates',
    relatedTopic: 'Apex cheat updates',
    sourceTitle: 'Apex Legends Cheat Updates: Current Version and Compatibility Information',
    sourcePath: '/blog/apex-legends-cheat-updates-current-version-compatibility/',
    body: [
      'Updates publish through the operator portal after anti-cheat and game compatibility checks. Discord #status lists build numbers when reviewers finish QA.',
      'Always download the newest package from the portal after a patch; copying an old folder from another PC bypasses the checksum checks that keep you on a supported build.',
    ],
  }),
  staffThread({
    slug: 'apex-purchase-subscription-details',
    category: 'Product Questions & Discussions',
    categoryTone: 'purple',
    title: 'Where can I find my purchase and subscription details?',
    excerpt: 'Use the email from checkout and the operator portal—apexlegendcheats.com does not host a separate account vault.',
    flair: 'Apex product access',
    relatedTopic: 'Apex product access',
    sourceTitle: 'Apex Legends Cheat Purchase Guide: Payment, Delivery and Access',
    sourcePath: '/blog/apex-legends-cheat-purchase-guide-payment-delivery-access/',
    body: [
      'Your purchase receipt and portal login flow arrive from the secure checkout path linked on the tier pages.',
      'If you cannot locate the email, contact support from the same address you used to pay and include approximate purchase time.',
    ],
  }),
  staffThread({
    slug: 'apex-installation-error-report',
    category: 'Installation & Technical Support',
    categoryTone: 'blue',
    title: 'What should I include when reporting an installation error?',
    excerpt: 'Give support enough context to reproduce the issue—order email, OS build, launcher, and exact error strings.',
    flair: 'Apex cheat troubleshooting',
    relatedTopic: 'Apex cheat troubleshooting',
    body: [
      'Attach your order email, Windows version, Steam or EA app build, Apex patch version, antivirus status, and a screenshot or copy/paste of the loader error.',
      'Mention whether vanilla Apex launches cleanly without the loader—this tells engineers if the issue is environmental.',
    ],
  }),
  staffThread({
    slug: 'apex-customer-support-order',
    category: 'Installation & Technical Support',
    categoryTone: 'blue',
    title: 'How can I contact support about an order?',
    excerpt: 'Use the Support page routes—do not post transaction IDs publicly in this read-only archive.',
    flair: 'Apex customer support',
    relatedTopic: 'Apex customer support',
    body: [
      'Open a ticket through the contact options on [/support/](/support/) and reference the email tied to checkout.',
      'For security, never paste payment details or license keys into forum threads or public Discord channels.',
    ],
  }),
  staffThread({
    slug: 'apex-subscription-expiry',
    category: 'Customer Feedback',
    categoryTone: 'green',
    title: 'What happens when my subscription expires?',
    excerpt: 'Portal access follows the license window defined at purchase—renew or upgrade through checkout when eligible.',
    flair: 'Apex cheat subscription',
    relatedTopic: 'Apex cheat subscription',
    body: [
      'When a subscription lapses, the operator portal stops serving new downloads until you renew or upgrade through the storefront linked from the tier pages.',
      'Local files may remain on disk but are not licensed for continued use—follow the terms that accompanied checkout.',
    ],
  }),
  staffThread({
    slug: 'apex-modes-compatibility',
    category: 'Product Questions & Discussions',
    categoryTone: 'purple',
    title: 'Which Apex Legends modes are supported by the current build?',
    excerpt: 'Modes supported are the playlists you can join with a standard PC client—still confirm status after each patch.',
    flair: 'Apex product mode compatibility',
    relatedTopic: 'Apex product mode compatibility',
    body: [
      'Documentation refers to playing Apex Legends through the supported PC clients; individual LTMs or experimental playlists may behave differently after hotfixes.',
      'Treat firing range and casual playlists as the safest venues whenever you change presets.',
    ],
  }),
  staffThread({
    slug: 'apex-feature-requests',
    category: 'Product Questions & Discussions',
    categoryTone: 'purple',
    title: 'How can I request a module feature or improvement?',
    excerpt: 'Send structured feedback through Support or Discord so engineers can track it—avoid vague “make it stronger” notes.',
    flair: 'Apex product feature requests',
    relatedTopic: 'Apex product feature requests',
    body: [
      'Include your tier, why the request helps gameplay, and any tradeoffs you are willing to accept (performance, readability, etc.).',
      'Feature parity can shift when Respawn changes APIs; requests are triaged against patch stability first.',
    ],
  }),
  staffThread({
    slug: 'apex-ranked-season-31-legend-bans',
    category: 'Apex Legends Updates',
    categoryTone: 'orange',
    title: 'Season 31: What changed in Ranked with Legend Bans?',
    excerpt: 'This thread links high-level patch discussion to compatibility checks—read official patch notes first.',
    flair: 'Apex Ranked Season 31',
    relatedTopic: 'Apex Ranked Season 31',
    body: [
      'Legend bans and ranked rotation rules come from Respawn patch notes. After Season 31 ships, re-read the official changelog, then align loader presets with whatever weapons and legends remain available—watch weapon meta notes too (for example Akimbo Wingman when listed in patch notes).',
      'Our modules describe mechanics (ESP, scripts), not ranked policy—never assume a cheat feature bypasses playlist restrictions.',
    ],
  }),
  staffThread({
    slug: 'apex-crypto-cipher-update',
    category: 'Apex Legends Updates',
    categoryTone: 'orange',
    title: 'What changed with Crypto in the Cipher update?',
    excerpt: 'Drone and ability tweaks flow from Respawn—update configs after you read the official ability notes.',
    flair: 'Apex Crypto changes',
    relatedTopic: 'Apex Crypto changes',
    body: [
      'Cipher Season updates can adjust Crypto’s drone economy, EMP tuning, or hitboxes. Review Respawn’s patch notes before importing old script chains.',
      'If abilities change pace, increase Delay Setting values temporarily until muscle memory catches up.',
    ],
  }),
  staffThread({
    slug: 'apex-report-issue-after-update',
    category: 'Installation & Technical Support',
    categoryTone: 'blue',
    title: 'How do I report a loader issue after a game update?',
    excerpt: 'Capture logs immediately after the failure and confirm vanilla Apex still launches.',
    flair: 'Apex update support',
    relatedTopic: 'Apex update support',
    sourceTitle: 'Apex Legends Cheat Updates: Current Version and Compatibility Information',
    sourcePath: '/blog/apex-legends-cheat-updates-current-version-compatibility/',
    body: [
      'First verify that Apex and Easy Anti-Cheat run without the loader. If vanilla fails, repair the client before opening a cheat-related ticket.',
      'When the loader is the variable, send support the new patch number, console/log output, and the last working build noted in Discord #status.',
    ],
  }),
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}

/** Threads that mainly restate an indexed blog guide should not compete in search. */
export function forumPostShouldNoindex(post: ForumPost): boolean {
  return Boolean(post.sourcePath);
}
