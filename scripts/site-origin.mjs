/** Node/build scripts — same semantics as src/config/public-site-origin.ts */
import { PRODUCTION_SITE_ORIGIN, getSitemapSiteOrigin } from './production-site-origin.mjs';

export { PRODUCTION_SITE_ORIGIN, getSitemapSiteOrigin };

export function getPublicSiteOrigin() {
  const raw = process.env.PUBLIC_SITE_ORIGIN?.trim();
  const origin = raw || PRODUCTION_SITE_ORIGIN;
  return origin.replace(/\/+$/, '');
}

/** Force sitemap loc URLs to the production origin (never workers.dev or preview hosts). */
export function normalizeSitemapXmlUrls(xml) {
  return xml.replace(/<loc>(https?:\/\/[^<]+)<\/loc>/g, (match, url) => {
    try {
      const parsed = new URL(url);
      if (parsed.origin === PRODUCTION_SITE_ORIGIN) return match;
      return `<loc>${PRODUCTION_SITE_ORIGIN}${parsed.pathname}${parsed.search}</loc>`;
    } catch {
      return match;
    }
  });
}
