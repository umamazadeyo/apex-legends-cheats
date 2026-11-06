/** Affiliate checkout destinations (zadeyo.com). */
export const CHECKOUT_URLS = {
  apexLegends: 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fapex-legends',
  skinChanger: 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fskin-changer',
  hwidSpoofer: 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fhwid-spoofer',
  ugc: 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fugc',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/apex-legends', CHECKOUT_URLS.apexLegends],
  ['/go/apex-legends/', CHECKOUT_URLS.apexLegends],
  ['/go/dota-2', CHECKOUT_URLS.apexLegends],
  ['/go/dota-2/', CHECKOUT_URLS.apexLegends],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
