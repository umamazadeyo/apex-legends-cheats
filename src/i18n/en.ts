import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { DISCORD_INVITE_URL, PRODUCT_BASE } from '../config/site';
import { HOME_SITE_META } from '../config/site-meta';

const productBase = PRODUCT_BASE;

export const en: Translations = {
  site: {
    name: 'ApexLegendCheats',
    domain: 'apexlegendcheats.com',
    title: HOME_SITE_META.title,
    description: HOME_SITE_META.description,
    discord: DISCORD_INVITE_URL,
  },
  nav: [
    { href: '/', label: 'Home' },
    { href: `${productBase}`, label: 'Products' },
    { href: '/blog/', label: 'Blog' },
    { href: '/forum/', label: 'Forum' },
    { href: '/faq/', label: 'FAQ' },
    { href: '/support/', label: 'Support' },
  ],
  hero: {
    status: 'Apex Legends — check status before launch',
    eyebrow: 'APEX LEGENDS CHEATS FOR PC',
    titleLine1: 'Apex Legends Cheats, ESP & Scripts',
    titleLine2: 'ApexLegendCheats',
    subtitle:
      'Explore Apex Legends cheats for PC, including Legend ESP, minimap overlays, scripts and Auto Combo tools. Compare available tiers, features and compatibility with Steam and the EA app on Windows 10/11.',
    ctaPrimary: 'View products',
    ctaDiscord: 'Join Discord',
    modesLabel: 'Playlists',
    modes: ['Battle Royale', 'Ranked', 'Mixtape', 'Firing range'],
    metrics: [
      { label: 'Stream-safe', strong: 'Yes' },
      { label: 'Patch speed', strong: '<24h' },
      { label: 'Users', strong: '300+' },
      { label: 'Live support', strong: '24/7' },
    ],
  },
  features: {
    eyebrow: 'Apex cheat features',
    title: 'Everything you need in one package',
    subtitle: 'Scripts, ESP and utility tools for Apex Legends—updated when patches ship.',
    items: [
      {
        title: 'Scripts & aim assist',
        subtitle: 'Track. Click. Reset.',
        desc: 'Script engine for gunfights and ability timing—tuned with delay sliders so inputs stay readable under pressure.',
        bullets: [
          'Auto Combo chains for common loadouts',
          'Movement assist and recoil smoothing',
          'Smart Cast with humanized delay sliders',
          'Prediction for projectiles and movement',
          'Portal presets per legend and role where available',
        ],
        tags: ['Apex aimbot', 'auto combo', 'smart cast'],
        bento: 'sm:col-span-2 lg:col-span-12 lg:col-start-1 lg:row-start-1',
      },
      {
        title: 'ESP / map awareness',
        subtitle: 'Read fights earlier.',
        desc: 'Legend and squad context on one overlay—keeps readability when multiple teams collapse on your POI.',
        bullets: [
          'Legend boxes, shield bars and cooldown readouts',
          'Minimap and positional cues where configured',
          'Third-party and ring-edge alerts where available',
        ],
        tags: ['Apex ESP', 'Apex Legends cheats', 'map awareness'],
        bento: 'sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:row-start-2',
      },
      {
        title: 'Ring & rotations',
        subtitle: 'Stay ahead of the zone.',
        desc: 'Timers and overlays for ring timing and repositioning—so you rotate with information, not guesswork.',
        bullets: ['Objective and ring context where enabled', 'Squad positioning cues on minimap', 'Audio-adjacent callouts where configured'],
        tags: ['Apex Legends Hacks', 'rotations', 'zone'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-3',
      },
      {
        title: 'Auto Combo',
        subtitle: 'Chain under pressure.',
        desc: 'Burst and swap chains with defaults you can tighten—paired with Target Selector for focus fire.',
        bullets: ['Target Selector for duos and trios', 'Activator for shields, heals and ordnance', 'Per-legend chains in the portal where listed'],
        tags: ['Apex cheat features', 'activator', 'target selector'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-3',
      },
      {
        title: 'Utility suite',
        subtitle: 'Finishers and cosmetics.',
        desc: 'Skin Changer preview, elimination assists and more—listed per tier on product pages.',
        bullets: [
          'Skin Changer: preview skins and heirlooms locally where included',
          'Auto Kill Steal: threshold-based knock finishes where included',
          'Stream Proof: hide overlays from capture software',
        ],
        tags: ['skin changer', 'elimination assist', 'stream proof'],
        bento:
          'sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:col-start-1 lg:row-start-4',
      },
      {
        title: 'Loot & route assist',
        subtitle: 'Keep tempo after bad drops.',
        desc: 'Where Elite includes automation modules, presets stay conservative by default—see the feature list before enabling.',
        bullets: ['Route and loot assists where included in Elite', 'Portal tuning before ranked queues', 'Safe retreat cues when ESP shows nearby squads'],
        tags: ['Apex Legends cheats', 'loot', 'automation'],
        bento:
          'sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:col-start-9 lg:row-start-4',
      },
      {
        title: 'Stream proof',
        subtitle: 'Creators stay in control.',
        desc: 'Keep overlays on your monitor while OBS or capture records a clean feed—verify with a local recording first.',
        bullets: ['OBS and Game Bar oriented modes', 'Toggle stream proof per module', 'Checklist in portal docs'],
        tags: ['obs safe', 'stream proof', 'capture hide'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-6',
      },
      {
        title: 'Extended view',
        subtitle: 'See more of the fight.',
        desc: 'Wider field of view for positioning—reset to default quickly when you need familiar muscle memory.',
        bullets: ['Distance caps per profile', 'Quick reset to default FOV', 'Pairs with minimap ESP where enabled'],
        tags: ['camera', 'vision', 'Apex ESP'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-6',
      },
      {
        title: 'Cloud config & updates',
        subtitle: 'Patch day ready.',
        desc: 'Same presets on every PC—portal updates track Apex Legends and anti-cheat patch windows.',
        bullets: ['Cloud backup for slider profiles', 'Loader updates after patches', 'Discord #status for build notes'],
        tags: ['cloud sync', 'auto update', 'presets'],
        bento: 'sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-2',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why us',
    title: 'Ranked tooling backed by patches—not promises',
    subtitle:
      'Most cheat shops ship stale loaders and ticket bots. We built apexlegendcheats.com around patch-day delivery, humanized scripts, and live operators.',
    usLabel: 'ApexLegendCheats',
    otherLabel: 'Typical provider',
    rows: [
      {
        title: 'Patch-day loader updates',
        desc: 'Builds aligned with Apex Legends updates—check Discord #status before you queue ranked.',
      },
      {
        title: 'Humanized scripts & delays',
        desc: 'Delay Setting, Target Selector and conservative defaults reduce obvious automation—tune up slowly.',
      },
      {
        title: 'Live Discord operators',
        desc: 'Real engineers for loader setup, legend profiles and HWID resets—not copy-paste FAQ tickets.',
      },
      {
        title: 'External loader + stream proof',
        desc: 'Overlay suite with capture-safe modes—architecture details are in the setup guide.',
      },
      {
        title: 'Cloud preset sync',
        desc: 'Ranked and casual profiles backup to the portal—same sliders on any PC.',
      },
      {
        title: 'HWID reset & license moves',
        desc: 'HWID clears and machine transfers handled through Discord ops—limits depend on your tier.',
      },
    ],
    metrics: [
      {
        value: '<24h',
        title: 'Patch turnaround',
        desc: 'Typical window to ship a loader build after major game or anti-cheat changes—confirm on #status.',
      },
      {
        value: '24/7',
        title: 'Operator support',
        desc: 'Discord engineers on shift for setup, configs and account issues.',
      },
      {
        value: '300+',
        title: 'Active operators',
        desc: 'PC players using our Apex Legends cheat tiers and utilities.',
      },
    ],
  },
  setup: {
    eyebrow: 'Setup guide',
    titleLead: 'From checkout to ranked queue in just',
    titleHighlight: 'three simple steps',
    intro:
      'Follow the operator portal to download the loader, load presets, and launch Apex Legends on Windows—with live Discord help if anything blocks you.',
    ctaPrimary: 'View products',
    ctaSecondary: 'Setup FAQ',
    ctaPrimaryHref: productBase,
    ctaSecondaryHref: '/faq/',
    steps: [
      {
        step: 'Step 1',
        title: 'Unlock portal & download loader',
        desc: 'Complete checkout, open your operator dashboard, and pull the latest patch loader build for Windows.',
      },
      {
        step: 'Step 2',
        title: 'Launch & configure modules',
        desc: 'Run the external loader, import ranked or casual presets, and tune scripts plus ESP sliders in firing range.',
      },
      {
        step: 'Step 3',
        title: 'Verify status & queue Apex',
        desc: 'Check the live status banner, launch Apex Legends from Steam or the EA app, and play with cloud-backed profiles.',
      },
    ],
  },
  compatibility: {
    eyebrow: 'Platform support',
    title: 'Runs on your rig.',
    subtitle: 'Check the live status banner before launching Apex Legends after updates.',
    items: [
      'Windows 10 & 11',
      'Steam',
      'EA app',
      'Apex Legends client',
      'Auto updater',
      'Config cloud sync',
      'Discord support',
      'HWID reset',
      'External loader',
    ],
  },
  cheats: {
    eyebrow: 'Cheat tiers',
    title: 'Apex Legends cheat tiers',
    subtitle: 'Lite for ESP, Pro adds scripts, Elite adds the full module list—including bots and Skin Changer where enabled.',
    viewAll: 'View all tiers',
    explore: 'Explore',
    items: [
      {
        badge: 'Awareness',
        tier: 'Lite',
        name: 'Lite',
        title: 'Apex Legends Lite Cheats | ESP & Map Awareness',
        desc: 'Player ESP, minimap overlay, extended view and stream proof—awareness without script automation.',
        features: [
          'Legend ESP & boxes',
          'Minimap hack overlay',
          'Extended view',
          'Streamproof mode',
          'Cloud config backup',
        ],
        more: 8,
        href: `${productBase}lite/`,
        variant: 'essential',
      },
      {
        badge: 'Popular',
        tier: 'Pro',
        name: 'Pro',
        title: 'Apex Legends Pro Cheats | Aimbot & Script Automation',
        desc: 'Everything in Lite plus Auto Combo, movement assist, Smart Cast, Target Selector and Activator—ranked-focused scripts.',
        features: ['All Lite modules', 'Auto Combo & movement assist', 'Smart Cast', 'Target Selector', 'Activator'],
        more: 11,
        href: `${productBase}pro/`,
        variant: 'popular',
      },
      {
        badge: 'Limited slots',
        tier: 'Private',
        name: 'Elite',
        title: 'Apex Legends Elite Cheats | Full Feature Build',
        desc: 'Private build with Auto Farm Bot, Auto Kill Steal, quick execute, Skin Changer, full map hack suite and priority patches.',
        features: ['Auto Farm Bot', 'Auto Kill Steal', 'Quick execute', 'Full map hack suite', 'Skin Changer', 'Priority patch queue'],
        more: 42,
        href: `${productBase}elite/`,
        variant: 'limited',
      },
    ],
  },
  products: {
    eyebrow: 'Products',
    title: 'Buy Apex Legends Cheats',
    subtitle: 'Cheat tiers plus HWID, UGC recovery, Skin Changer, and utility tools.',
    viewAll: 'View all products',
    get: 'Get',
    explore: 'Explore',
    items: [
      {
        badge: 'Available',
        category: 'System utility',
        title: 'HWID Spoofer',
        subtitle: 'Clean slate for your PC',
        desc: 'Hardware ID spoofing for disk serials, MAC addresses and GPU IDs—follow the portal setup guide before launching Apex Legends.',
        features: ['Spoofer & cleanup tools', 'Serial profile rotation', 'Compatibility scan', 'Post-spoof verification'],
        more: 9,
        href: `${productBase}hwid-spoofer/`,
      },
      {
        badge: 'Available',
        category: 'Account recovery',
        title: 'UGC',
        subtitle: 'Unban & governance control',
        desc: 'Appeal workspace for Steam or EA restrictions, anti-cheat flags and security holds—custom workflows and dispute automation.',
        features: ['Custom appeal workflows', 'Dispute automation', 'Case documentation', 'Status tracking dashboard'],
        more: 6,
        href: `${productBase}ugc/`,
      },
      {
        badge: 'Available',
        category: 'Cosmetic',
        title: 'Skin Changer',
        subtitle: 'Unlock cosmetics locally',
        desc: 'Lightweight Skin Changer for legend outfits, weapons and charms—local preview without mirror-store purchases.',
        features: ['Legend skin swap', 'Weapon & charm customizer', 'Heirloom preview', 'Loadout favorites export'],
        more: 7,
        href: `${productBase}unlock-all/`,
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Guides and updates',
    subtitle: 'Aimbot and ESP setup, tier comparisons, and patch-day checks for Apex Legends.',
    latestTitle: 'Apex Legends cheat guides & updates',
    latestSubtitle: 'Filter by topic or sort to find setup guides, feature notes, and patch windows.',
    filterAll: 'All articles',
    sortLabel: 'Sort by',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    sortShortRead: 'Shortest read',
    sortLongRead: 'Longest read',
    emptyFilter: 'No articles match this filter.',
    viewAll: 'View all articles',
    read: 'Read',
    items: [
      {
        tag: 'Guides',
        title: 'Apex Legends Cheats: Compare Available Products and Features',
        slug: 'apex-legends-cheats-compare-available-products-and-features',
        image: '/images/blog/apex-legends-cheats-article-tier-comparison-table.webp',
        imageAlt:
          'Tier comparison table for Apex Legends cheats Lite Pro Elite and utilities on PC',
        desc: 'Side-by-side look at Lite, Pro, Elite and utilities—using the same module lists as the product pages.',
        date: 'Nov 6, 2026',
        readTime: '12 min read',
      },
      {
        tag: 'Guides',
        title: 'Apex Legends Cheats Pricing: Compare Plans and Subscription Options',
        slug: 'apex-legends-cheats-pricing-compare-plans-subscription-options',
        image: '/images/blog/apex-legends-cheats-article-subscription-patch-banner.webp',
        imageAlt:
          'Subscription renewal calendar cue for Apex Legends cheats plan comparison',
        desc: 'What this site shows about pricing and plans—and what you confirm only at checkout.',
        date: 'Nov 5, 2026',
        readTime: '9 min read',
      },
      {
        tag: 'Guides',
        title: 'Best Apex Legends Cheats: Product Comparison and Buying Guide',
        slug: 'best-apex-legends-cheats-product-comparison-buying-guide',
        image: '/images/blog/apex-legends-cheats-article-secure-checkout-flow.webp',
        imageAlt:
          'Secure checkout screen for buying Apex Legends cheats with order email ready',
        desc: 'A practical buying guide: match goals to tiers, verify status, and use official pages—not forum rumors.',
        date: 'Nov 4, 2026',
        readTime: '11 min read',
      },
      {
        tag: 'Features',
        title: 'Apex Legends Aimbot: Features, Options and Pricing',
        slug: 'apex-legends-aimbot-features-options-pricing',
        image: '/images/blog/apex-legends-cheats-carousel-aim-scripts-combat.webp',
        imageAlt:
          'Combat aim script panel from Apex Legends cheats Pro tier feature preview',
        desc: 'How aim assist and script modules are described on Pro and Elite—without inventing slider values or prices.',
        date: 'Nov 3, 2026',
        readTime: '10 min read',
      },
      {
        tag: 'Features',
        title: 'Apex Legends ESP: Available Features and Product Comparison',
        slug: 'apex-legends-esp-available-features-product-comparison',
        image: '/images/blog/apex-legends-cheats-carousel-map-terrain-esp.webp',
        imageAlt:
          'Terrain map overlay example for Apex Legends cheats ESP minimap awareness',
        desc: 'ESP and minimap overlays as listed on Lite through Elite—compare without overlapping the standalone feature page.',
        date: 'Nov 2, 2026',
        readTime: '10 min read',
      },
      {
        tag: 'Features',
        title: 'Apex Legends Wallhack: Product Features and Pricing Guide',
        slug: 'apex-legends-wallhack-product-features-pricing-guide',
        image: '/images/blog/apex-legends-cheats-carousel-fov-positioning.webp',
        imageAlt:
          'Wider FOV stance shot illustrating Apex Legends cheats wallhack vision reads',
        desc: 'Wallhack-style vision as part of the ESP stack—tied to Lite, Pro and Elite lists.',
        date: 'Nov 1, 2026',
        readTime: '8 min read',
      },
      {
        tag: 'Features',
        title: 'Apex Legends Triggerbot: Features and Available Options',
        slug: 'apex-legends-triggerbot-features-available-options',
        image: '/images/blog/apex-legends-cheats-carousel-finishers-elimination.webp',
        imageAlt:
          'Knockdown finisher frame tied to Apex Legends cheats trigger assist modules',
        desc: 'Trigger-style firing assists live inside the script modules Pro and Elite list—verify names on the product page.',
        date: 'Oct 31, 2026',
        readTime: '8 min read',
      },
      {
        tag: 'Features',
        title: 'Apex Legends Radar: Compare Available Product Features',
        slug: 'apex-legends-radar-compare-available-product-features',
        image: '/images/blog/apex-legends-cheats-carousel-squad-esp-tags.webp',
        imageAlt:
          'Squad nameplates on radar style HUD using Apex Legends cheats overlay suite',
        desc: 'Minimap and positional overlays compared to the full ESP list on each tier.',
        date: 'Oct 30, 2026',
        readTime: '8 min read',
      },
      {
        tag: 'Guides',
        title: 'Apex Legends Cheat Subscription Plans: Daily, Weekly and Monthly Options',
        slug: 'apex-legends-cheat-subscription-plans-daily-weekly-monthly-options',
        image: '/images/blog/apex-legends-cheats-article-subscription-patch-banner.webp',
        imageAlt:
          'Subscription renewal reminder graphic for Apex Legends cheats storefront plans',
        desc: 'How to read subscription length when daily, weekly or monthly labels appear at checkout.',
        date: 'Oct 29, 2026',
        readTime: '7 min read',
      },
      {
        tag: 'Setup',
        title: 'Apex Legends Cheats for PC: Compatibility and Requirements',
        slug: 'apex-legends-cheats-for-pc-compatibility-requirements',
        image: '/images/blog/apex-legends-cheats-article-pc-client-setup.webp',
        imageAlt:
          'EA app and Steam launcher view for Apex Legends cheats Windows PC setup',
        desc: 'Windows, Steam, EA app and patch expectations straight from the product requirement blocks.',
        date: 'Oct 28, 2026',
        readTime: '9 min read',
      },
      {
        tag: 'Guides',
        title: 'Apex Legends Cheat Bundles: Compare Features and Included Options',
        slug: 'apex-legends-cheat-bundles-compare-features-included-options',
        image: '/images/blog/apex-legends-cheats-article-elite-bundle-modules.webp',
        imageAlt:
          'Elite bundle module tiles listing Apex Legends cheats automation extras',
        desc: 'How “bundles” map to Lite, Pro, Elite and optional utilities on the same hub.',
        date: 'Oct 27, 2026',
        readTime: '8 min read',
      },
      {
        tag: 'Guides',
        title: 'Apex Legends Cheat Purchase Guide: Payment, Delivery and Access',
        slug: 'apex-legends-cheat-purchase-guide-payment-delivery-access',
        image: '/images/blog/apex-legends-cheats-article-secure-checkout-flow.webp',
        imageAlt:
          'Portal access email preview after Apex Legends cheats purchase completes',
        desc: 'What the site states about checkout, portal delivery and support—aligned with Terms & Conditions.',
        date: 'Oct 26, 2026',
        readTime: '9 min read',
      },
      {
        tag: 'Guides',
        title: 'Apex Legends Cheat Comparison: Features, Pricing and Requirements',
        slug: 'apex-legends-cheat-comparison-features-pricing-requirements',
        image: '/images/blog/apex-legends-cheats-article-tier-comparison-table.webp',
        imageAlt:
          'Feature checklist graphic comparing Apex Legends cheats Lite Pro and Elite tiers',
        desc: 'One checklist that points back to feature lists, pricing page and PC requirements.',
        date: 'Oct 25, 2026',
        readTime: '10 min read',
      },
      {
        tag: 'Updates',
        title: 'Apex Legends Cheat Updates: Current Version and Compatibility Information',
        slug: 'apex-legends-cheat-updates-current-version-compatibility',
        image: '/images/blog/apex-legends-cheats-article-subscription-patch-banner.webp',
        imageAlt:
          'Loader status ribbon reminding Apex Legends cheats users to verify Cipher patches',
        desc: 'How to read status, rebuild after patches, and stay aligned with Season 31.',
        date: 'Oct 24, 2026',
        readTime: '9 min read',
      },
      {
        tag: 'Guides',
        title: 'Apex Legends Product Guide: Choosing Between Available Cheat Options',
        slug: 'apex-legends-product-guide-choosing-between-available-cheat-options',
        image: '/images/blog/apex-legends-cheats-article-tier-comparison-table.webp',
        imageAlt:
          'Flowchart art for choosing Apex Legends cheats awareness or script heavy builds',
        desc: 'Decision paths between Lite, Pro, Elite and utilities—links to comparisons and FAQs.',
        date: 'Oct 23, 2026',
        readTime: '10 min read',
      },
    ],
  },
  toolkit: {
    eyebrow: 'Software',
    title: 'Organized, easy to configure',
    subtitle: 'Modules stay grouped so you can tune mid-match without digging through menus.',
    items: [
      { num: '01', label: 'Scripts', title: 'Chains that match your loadout', desc: 'Auto Combo, movement assist, Smart Cast and Delay Setting in one tab.' },
      { num: '02', label: 'Vision', title: 'ESP that stays readable', desc: 'Filter distance, squad colors and minimap density from the portal.' },
      { num: '03', label: 'Minimap', title: 'Macro reads on lock', desc: 'Overlay cues and ring timing context on a compact HUD.' },
      { num: '04', label: 'Legends', title: 'Per-legend script slots', desc: 'Save movement and gun profiles and swap with hotkeys.' },
      { num: '05', label: 'Automation', title: 'Elite-only utilities', desc: 'Farm bot, loot routing assists and finish tools where listed on Elite.' },
      { num: '06', label: 'Profiles', title: 'Configs for each mode', desc: 'Separate ranked, mixtape and firing-range presets with cloud backup.' },
    ],
  },
  workflow: {
    eyebrow: 'How it works',
    badge: '4 easy steps',
    titleBefore: 'From status check to',
    titleHighlight: 'saved profile.',
    subtitle: 'A straight path from purchase to an Apex Legends profile you can reuse every session.',
    ctaLabel: 'View products',
    ctaHref: productBase,
    ctaSecondary: 'Setup FAQ',
    ctaSecondaryHref: '/faq/',
    items: [
      {
        num: '01',
        phase: 'Before purchase',
        title: 'Check build status',
        desc: 'Read the live banner on apexlegendcheats.com before you buy or launch.',
      },
      {
        num: '02',
        phase: 'Checkout',
        title: 'Choose your tier',
        desc: 'Pick Lite, Pro or Elite—the access level that matches your playlist goals.',
      },
      {
        num: '03',
        phase: 'Loader',
        title: 'Launch & configure',
        desc: 'Download from the portal, enable modules, and tune delays in firing range.',
      },
      {
        num: '04',
        phase: 'In-game',
        title: 'Save your profile',
        desc: 'When settings feel right, save ranked and casual presets to the cloud.',
      },
    ],
  },
  fieldNotes: {
    eyebrow: 'Field notes',
    title: 'Built for how Apex plays.',
    items: [
      { num: '01', title: 'Patch-day ready', desc: 'Build notes land in Discord and the portal—read them before ranked.' },
      { num: '02', title: 'Conservative defaults', desc: 'Start with safe delays and ESP range—tune up after stable sessions.' },
      { num: '03', title: 'Real operator support', desc: 'Stuck on install or legends configs? Staff walk you through live.' },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'Support for Apex Legends cheats & utilities',
    subtitle: 'Let us know how we can help.',
    channels: [
      {
        icon: 'users',
        title: 'Chat before checkout',
        desc: 'Speak to our team about tiers and access.',
        linkLabel: 'Start checkout',
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        icon: 'navFaq',
        title: 'Read the FAQ',
        desc: 'Compatibility, bans and setup—before you buy.',
        linkLabel: 'View all FAQ',
        href: '/faq/',
      },
      {
        icon: 'clock',
        title: 'Live operators',
        desc: 'Discord engineers on shift 24/7.',
        linkLabel: 'Join Discord',
        href: DISCORD_INVITE_URL,
      },
    ],
    ticketTitle: 'Include in your ticket',
    ticketItems: [
      { title: 'Order email', desc: 'The address used at checkout on apexlegendcheats.com or via our secure checkout.' },
      { title: 'Platform', desc: 'Steam or EA app on Windows 10 or 11—and your Apex Legends client version.' },
      { title: 'Error detail', desc: 'Screenshot or exact message from the loader or the game.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers before checkout.',
    subtitle: 'Compatibility, bans and access—no vague promises.',
    items: [
      {
        num: '01',
        q: 'Which Apex Legends products are available on ApexLegendCheats.com?',
        a: 'Lite, Pro, Elite cheat tiers plus HWID Spoofer, UGC and Skin Changer—each product page lists the modules included.',
      },
      {
        num: '02',
        q: 'Are the products compatible with Apex Legends Season 31: Cipher?',
        a: 'Check Cipher patch notes, then the homepage status banner and Discord #status before you launch—compatibility follows the build staff mark online.',
      },
      {
        num: '03',
        q: 'Does the product support the Steam version of Apex Legends?',
        a: 'Yes—Windows Steam builds are in scope when the live status shows an online loader.',
      },
      {
        num: '04',
        q: 'Does the product support the EA app version of Apex Legends?',
        a: 'Yes—the same Windows requirements cover the EA app; follow the portal launch order.',
      },
      {
        num: '05',
        q: 'Which Windows versions are supported?',
        a: '64-bit Windows 10 and Windows 11 as printed on each product page.',
      },
      {
        num: '06',
        q: 'Are all Apex Legends game modes supported?',
        a: 'Standard PC playlists are expected; experimental LTMs can change—test in firing range or casual after hotfixes.',
      },
    ],
  },
  footer: {
    tagline: 'Apex Legends cheats — aim assist, ESP and tools for PC. apexlegendcheats.com',
    explore: 'Explore',
    exploreLinks: [
      { href: '/#features', label: 'Feature overview', ariaLabel: 'Features', scrollTarget: 'features' },
      { href: '/#products', label: 'Product tiers', ariaLabel: 'Products', scrollTarget: 'products' },
      { href: '/pricing/', label: 'Pricing & subscriptions', ariaLabel: 'Pricing' },
      { href: '/features/', label: 'Feature list by tier', ariaLabel: 'Feature list' },
      { href: '/blog/', label: 'Read guides', ariaLabel: 'Blog' },
      { href: '/#setup-guide', label: 'Setup steps', ariaLabel: 'Setup guide', scrollTarget: 'setup-guide' },
      { href: '/#blog', label: 'Articles & FAQ', ariaLabel: 'Articles and FAQ', scrollTarget: 'blog' },
      { href: '/#faq', label: 'Pre-purchase answers', ariaLabel: 'FAQ section', scrollTarget: 'faq' },
    ],
    support: 'Support',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'About ApexLegendCheats — PC guides & tools',
      description:
        'Tier comparisons, utilities, patch notes and support channels for Apex Legends on Windows—published on apexlegendcheats.com.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            'ApexLegendCheats is a PC-focused resource for Apex Legends players exploring aim assist, ESP, extended view and Skin Changer workflows. We publish tier comparisons, setup guides, and live status notes so you can compare Apex Legends cheats before checkout.',
            'Editorial pages are written in-house; tier module lists and pricing always follow the live product pages and checkout flow.',
            'Game names are used for identification only.',
          ],
        },
        {
          heading: 'What we publish',
          paragraphs: [
            'Our site covers Lite, Pro, and Elite cheat tiers, HWID utilities, Skin Changer and account recovery workflows. Blog articles explain conservative configs, patch-day checks, and anti-cheat update behavior.',
            'Content is updated when patches land or when loader modules shift. Check the homepage status banner and Discord #status before every session.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'Questions about compatibility, loader errors, or checkout are handled through Discord and email support. Include your order email, client (Steam or EA app), and Windows version when opening a ticket.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      description:
        'How ApexLegendCheats handles analytics, cookies, and contact data when you use apexlegendcheats.com.',
      sections: [
        {
          heading: 'Information we collect',
          paragraphs: [
            'We may collect standard web analytics such as page views, device type, browser, and approximate region through Google Analytics when enabled. Checkout and license delivery happen on external checkout pages—we do not store payment card data on apexlegendcheats.com.',
          ],
        },
        {
          heading: 'How we use data',
          paragraphs: [
            'Analytics help us understand which guides and product pages are useful so we can improve content and fix broken links. Support tickets may retain the email address and message content you provide until the issue is resolved.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use minimal cookies required for analytics. You can block cookies in your browser settings; core site content remains accessible without them.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For privacy questions, use the options on the Support page. Purchase and refund rules are in our Terms & Conditions.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      description:
        'Purchase, license, refund, and use terms for ApexLegendCheats products and apexlegendcheats.com.',
      sections: [
        {
          heading: 'Agreement',
          paragraphs: [
            'Last updated: November 2026. By using apexlegendcheats.com or completing checkout for any product listed here, you agree to these Terms & Conditions and our Privacy Policy.',
          ],
        },
        {
          heading: 'What you purchase',
          paragraphs: [
            'We sell access to Apex Legends cheat tiers (Lite, Pro, Elite) and utility tools (HWID Spoofer, UGC, Skin Changer / Unlock All) delivered through an operator portal and loader for Windows with Steam or the EA app.',
            'Feature lists on each product page describe what is included at the time of purchase. Modules can change when Apex Legends or anti-cheat systems update.',
          ],
        },
        {
          heading: 'Checkout and delivery',
          paragraphs: [
            'Payment and license delivery run on external checkout pages. apexlegendcheats.com does not process or store payment card numbers.',
            'After purchase, use the operator portal linked from your order flow to download the current loader and setup guide before launching Apex Legends.',
          ],
        },
        {
          heading: 'License use',
          paragraphs: [
            'Licenses are for your personal use only. Do not share loader files, portal logins, or license keys. HWID and device limits depend on your tier and are enforced in the portal.',
          ],
        },
        {
          heading: 'Refunds and purchases',
          paragraphs: [
            'All sales are final once checkout completes. We do not refund change-of-mind purchases, account bans, anti-cheat penalties, or issues caused by ignoring setup guides or running modules while the status banner shows offline.',
            'If the product does not work as described on a supported setup—Apex Legends on Windows 10/11 via Steam or the EA app, current loader from the portal, and the live status banner showing online when you started—contact us through the Support page. Include your order email, Windows version, game build, and screenshots or exact error text from the loader.',
            'We may, at our discretion, offer a fix, replacement access, or partial/full refund when we confirm a fault on our side. We are not obligated to approve every request.',
          ],
        },
        {
          heading: 'Availability and risk',
          paragraphs: [
            'Third-party tools for Apex Legends can conflict with game updates and anti-cheat systems. You use this software at your own risk, including possible account action.',
            'Check the homepage status banner before every session. Do not queue ranked while modules are offline or misaligned after a patch.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the revised terms.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For terms, billing, or loader questions, use the buttons on the Support page. See also our Privacy Policy for how we handle site data.',
          ],
        },
      ],
    },
    support: {
      title: 'ApexLegendCheats Support',
      description:
        'Get support for loader, HWID, and checkout questions at apexlegendcheats.com.',
    },
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheats: 'Try Now',
    browseCheatsMobile: 'Start checkout',
    homeAria: 'ApexLegendCheats home',
    checkoutAria: 'Start checkout',
    discordAria: 'Join ApexLegendCheats on Discord',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
  },
};
