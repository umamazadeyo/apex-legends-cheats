/**
 * Cloudflare Worker in front of static assets — adds X-Robots-Tag on *.workers.dev only.
 * Canonicals, sitemaps, and robots always reference https://apexlegendcheats.com (never workers.dev).
 */

const CHECKOUT_REDIRECTS = new Map([
  ['/go/apex-legends', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fapex-legends'],
  ['/go/apex-legends/', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fapex-legends'],
  ['/go/dota-2', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fapex-legends'],
  ['/go/dota-2/', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fapex-legends'],
  ['/go/skin-changer', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fskin-changer'],
  ['/go/skin-changer/', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fskin-changer'],
  ['/go/hwid-spoofer', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fhwid-spoofer'],
  ['/go/hwid-spoofer/', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fhwid-spoofer'],
  ['/go/ugc', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fugc'],
  ['/go/ugc/', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fugc'],
]);

const PRODUCTION_ORIGIN = 'https://apexlegendcheats.com';

const INDEXABLE_MEDIA = new Set([
  'text/html',
  'application/xhtml+xml',
  'application/xml',
  'text/xml',
  'application/rss+xml',
  'application/atom+xml',
]);

function isWorkersDev(hostname) {
  const host = hostname.split(':')[0].toLowerCase();
  return host === 'workers.dev' || host.endsWith('.workers.dev');
}

function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_REDIRECTS.get(pathname);
  if (direct) return direct;
  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_REDIRECTS.get(`${pathname}/`) ?? null;
  }
  return null;
}

function isIndexableMime(contentType) {
  if (!contentType) return false;
  const base = contentType.split(';')[0]?.trim().toLowerCase() ?? '';
  return INDEXABLE_MEDIA.has(base);
}

function pathLooksIndexable(pathname) {
  if (pathname === '/robots.txt') return false;
  if (/\.(webp|png|jpe?g|gif|svg|ico|css|js|mjs|woff2?|map)$/i.test(pathname)) return false;
  if (pathname.endsWith('.xml') || pathname.endsWith('.html')) return true;
  if (pathname.endsWith('/')) return true;
  return !pathname.includes('.');
}

function xmlContentType(pathname) {
  if (pathname.endsWith('.xml')) return 'application/xml; charset=utf-8';
  return null;
}

/** Preview host: same Disallow rules; official-domain sitemap URLs only. */
function productionRobotsTxt() {
  return `User-agent: *
Allow: /

Disallow: /go/

Sitemap: ${PRODUCTION_ORIGIN}/sitemap.xml
Sitemap: ${PRODUCTION_ORIGIN}/sitemap-images.xml

# RSS: ${PRODUCTION_ORIGIN}/rss.xml
`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const checkoutTarget = resolveCheckoutPathRedirect(url.pathname);
    if (checkoutTarget) {
      const dest = new URL(checkoutTarget);
      url.searchParams.forEach((value, key) => {
        dest.searchParams.set(key, value);
      });
      return Response.redirect(dest.toString(), 302);
    }

    if (url.pathname === '/robots.txt' && isWorkersDev(url.hostname)) {
      return new Response(productionRobotsTxt(), {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const response = await env.SITE_ASSETS.fetch(request);

    const headers = new Headers(response.headers);
    const forcedXml = xmlContentType(url.pathname);
    if (forcedXml) {
      headers.set('Content-Type', forcedXml);
    }

    if (!isWorkersDev(url.hostname)) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    if (
      url.pathname !== '/robots.txt' &&
      (isIndexableMime(headers.get('content-type')) || pathLooksIndexable(url.pathname))
    ) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
