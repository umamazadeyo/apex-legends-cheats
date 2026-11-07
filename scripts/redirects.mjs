/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/apex-legends-cheats/'],
  ['/cheats/', '/products/apex-legends-cheats/'],
  ['/cheats/lite', '/products/apex-legends-cheats/lite/'],
  ['/cheats/lite/', '/products/apex-legends-cheats/lite/'],
  ['/cheats/pro', '/products/apex-legends-cheats/pro/'],
  ['/cheats/pro/', '/products/apex-legends-cheats/pro/'],
  ['/cheats/elite', '/products/apex-legends-cheats/elite/'],
  ['/cheats/elite/', '/products/apex-legends-cheats/elite/'],
  ['/cheats/compare', '/blog/best-apex-legends-cheats-product-comparison-buying-guide/'],
  ['/cheats/compare/', '/blog/best-apex-legends-cheats-product-comparison-buying-guide/'],
  ['/products/dota-2-cheats/utilities', '/products/apex-legends-cheats/utilities/'],
  ['/products/dota-2-cheats/utilities/', '/products/apex-legends-cheats/utilities/'],
  ['/products/dota-2-cheats', '/products/apex-legends-cheats/'],
  ['/products/dota-2-cheats/', '/products/apex-legends-cheats/'],
  ['/products/dota-2-cheats/lite', '/products/apex-legends-cheats/lite/'],
  ['/products/dota-2-cheats/lite/', '/products/apex-legends-cheats/lite/'],
  ['/products/dota-2-cheats/pro', '/products/apex-legends-cheats/pro/'],
  ['/products/dota-2-cheats/pro/', '/products/apex-legends-cheats/pro/'],
  ['/products/dota-2-cheats/elite', '/products/apex-legends-cheats/elite/'],
  ['/products/dota-2-cheats/elite/', '/products/apex-legends-cheats/elite/'],
  ['/products/dota-2-cheats/hwid-spoofer', '/products/apex-legends-cheats/hwid-spoofer/'],
  ['/products/dota-2-cheats/hwid-spoofer/', '/products/apex-legends-cheats/hwid-spoofer/'],
  ['/products/dota-2-cheats/ugc', '/products/apex-legends-cheats/ugc/'],
  ['/products/dota-2-cheats/ugc/', '/products/apex-legends-cheats/ugc/'],
  ['/products/dota-2-cheats/unlock-all', '/products/apex-legends-cheats/unlock-all/'],
  ['/products/dota-2-cheats/unlock-all/', '/products/apex-legends-cheats/unlock-all/'],
  ['/products/apex-legends-cheats/utilities', '/products/apex-legends-cheats/utilities/'],
  ['/products/apex-legends-cheats', '/products/apex-legends-cheats/'],
  ['/products/dota-2-cheats/account-recovery', '/products/apex-legends-cheats/ugc/'],
  ['/products/dota-2-cheats/account-recovery/', '/products/apex-legends-cheats/ugc/'],
  ['/blog/apex-legends-lite-vs-pro', '/blog/best-apex-legends-cheats-product-comparison-buying-guide/'],
  ['/blog/apex-legends-lite-vs-pro/', '/blog/best-apex-legends-cheats-product-comparison-buying-guide/'],
  ['/blog/apex-legends-cheat-features-guide', '/blog/apex-legends-cheats-compare-available-products-and-features/'],
  ['/blog/apex-legends-cheat-features-guide/', '/blog/apex-legends-cheats-compare-available-products-and-features/'],
  ['/blog/how-to-buy-apex-legends-cheats-2026', '/blog/apex-legends-cheat-purchase-guide-payment-delivery-access/'],
  ['/blog/how-to-buy-apex-legends-cheats-2026/', '/blog/apex-legends-cheat-purchase-guide-payment-delivery-access/'],
  ['/blog/easy-anti-cheat-patch-checklist', '/blog/apex-legends-cheat-updates-current-version-compatibility/'],
  ['/blog/easy-anti-cheat-patch-checklist/', '/blog/apex-legends-cheat-updates-current-version-compatibility/'],
  ['/blog/apex-legends-ea-app-steam-loader', '/blog/apex-legends-cheats-for-pc-compatibility-requirements/'],
  ['/blog/apex-legends-ea-app-steam-loader/', '/blog/apex-legends-cheats-for-pc-compatibility-requirements/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
